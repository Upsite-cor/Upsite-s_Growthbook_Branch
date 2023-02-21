import React, { useContext, useState } from 'react'
import Button from '../../components/button/Button.component'
import Container from '../../components/layout/container/Container.component'
import auth from '@react-native-firebase/auth';
import BackHeader from '../../components/navigation/organisms/BackHeader';
import { UserContext } from '../../navigators/Application';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography } from '../../styles/theme.style';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import CourseCardStylesheet from "../../components/home/courseCardv2/CourseCardv2.component.style";
import errorImage from '../../assets/images/errorImage.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import Field from '../../components/form/Field.component';
import { getCredentialsForUser } from '../../utils';
import Apple from '../../authProviders/Apple';
import Google from '../../authProviders/Google';
import Facebook from '../../authProviders/Facebook';
import firestore from '@react-native-firebase/firestore';

const ImageShower = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  const handleLoaded = () => {
    // setIsLoading(false);
  };
  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (<View style={[CourseCardStylesheet.imageContainer, { borderRadius: 50 }]}>
    {isLoading && <ActivityIndicator style={CourseCardStylesheet.activityLoader} />}
    {!isError && <Image onError={handleError} onLoadEnd={handleLoaded} style={[CourseCardStylesheet.image, { borderRadius: 50 }]} source={{ uri: src }} />}
    {isError && <Image style={[CourseCardStylesheet.image, { borderRadius: 50 }]} source={errorImage} />}
  </View>)
}

const Profile = () => {
  const passwordValidationSchema = yup.object().shape({
    existingPassword: yup.string(),
    password: yup.string()
      .required('Please enter a new password')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string()
      .required('Please confirm your new password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const signupValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .min(3, ({ min }) => `Name must be at least ${min} characters`)
      .required('Name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    // password: yup
    //   .string()
    //   .min(8, ({min}) => `Password must be at least ${min} characters`)
    //   .required('Password is required'),
  });
  const user = useContext(UserContext);
  const intialPassValue = { existingPassword: '', password: '', confirmPassword: '' };
  const dispatch = useDispatch();

  const uploadProfilePicture = async (uri) => {
    dispatch(showLoader());
    try {
      const currentUser = user;
      const storageRef = storage().ref(`/users/${currentUser.uid}/profile_picture.jpg`);
      await storageRef.putFile(uri);
      const downloadURL = await storageRef.getDownloadURL();
      // update user profile with new profile picture URL
      await currentUser.updateProfile({
        photoURL: downloadURL,
      });
      await currentUser.reload();
    } catch (e) {
      Alert.alert("An error occured", e.message);
    }
    dispatch(hideLoader());
  };

  const handleUpdatePicture = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // setImageURI(response.uri);
        // call the uploadProfilePicture function to upload the image to Firebase Storage and update the user's profile
        uploadProfilePicture(response.assets[0].uri);
      }
    });
  }
  const deleteAccount = async (pass) =>{
    dispatch(showLoader());

    var existingCredential = getCredentialsForUser(user, pass);
    try {
      await user.reauthenticateWithCredential(existingCredential);
    }
    catch(e){
      Alert.e("Incorrect password entered");
      return;
    }
  
    const quizAttemptRef = firestore().collection("quizAttempts").where("userId", "==", user.uid);
    const progressRef = firestore().collection("progress").where("userId", "==", user.uid);
    const coursesRef = firestore().collection('courses');
    const courseQuery = coursesRef.where('enrollments', 'array-contains', user.uid);
    
    const batch = firestore().batch();
  
    const quizAttemptSnapshot = await quizAttemptRef.get();
    const progressSnapshot = await progressRef.get();
    const coursesSnapshot = await courseQuery.get();
  
    quizAttemptSnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });
  
    progressSnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });
  
    coursesSnapshot.forEach((courseDoc) => {
      const courseRef = coursesRef.doc(courseDoc.id);
      batch.update(courseRef, {
        enrollments: firestore.FieldValue.arrayRemove(user.uid),
      });
    });
  
    try {
      await batch.commit();
      await user.delete();
      console.log('Batch write operation completed successfully.');
    } catch (error) {
      console.log('Transaction failed: ', error);
    }
  
    dispatch(hideLoader());
  }
  
  
  const updatePassword = async (values, resetForm) => {
    dispatch(showLoader());
    try {
      if (user.providerData.map(provider => provider.providerId).includes("password")) {
        var existingCredential = getCredentialsForUser(user, values.existingPassword);
        try {
          await user.reauthenticateWithCredential(existingCredential);
          await user.updatePassword(values.password);
          await user.reload();
        } catch (e) {
          Alert.alert("Password not updated", "Incorrect existing password");
        }


      } else {
        var existingCredential = getCredentialsForUser(user);
        await user.reauthenticateWithCredential(existingCredential);
        // console.log("Umer", existingCredential);
        const credential = auth.EmailAuthProvider.credential(user.email, values.password);
        await user.linkWithCredential(credential);
        await user.reload();
      }
    } catch (E) {
      Alert.alert("An error occured", E.message);
    }
    resetForm(intialPassValue);
    dispatch(hideLoader());
  }
  resetPassword = async (value)=>{
    dispatch(showLoader());
    try{
      await auth().sendPasswordResetEmail(value);
      Alert.alert("Check your email", "An email was sent to your email address to reset your password");
      await auth().signOut();
    }catch(e){
      Alert.alert("An error occurred", "Invalid/Incorrect email address added.");
    }
    dispatch(hideLoader());
  }
  const handleCreate = async values => {
    dispatch(showLoader());
    await user.updateEmail(values.email);
    await user.updateProfile({ displayName: values.fullName });
    await user.reload();
    dispatch(hideLoader());
  }
  return (
    <>
      <Container isScrollable={false}>
        <BackHeader type="text" text={"Profile"} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={{ margin: 16 }}>
              <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                <TouchableOpacity onPress={handleUpdatePicture} style={{ flex: 1 }}>
                  {
                    !user.photoURL && <View style={{ backgroundColor: colors.general.BRAND, justifyContent: "center", alignItems: "center", borderRadius: 50, width: 100, height: 100 }}>
                      <Text style={{ color: "white", fontWeight: 600 }}>{user.displayName
                        ? user.displayName.substring(0, 2).toUpperCase()
                        : user.email
                          ? user.email.substring(0, 2).toUpperCase()
                          : 'A'}</Text>
                    </View>
                  }
                  {
                    user.photoURL && <View style={{ width: "100%", height: "100%", borderRadius: 50 }}>
                      <ImageShower src={user.photoURL} />
                    </View>
                  }
                </TouchableOpacity>
                <View style={{ justifyContent: "center", flex: 1, alignItems: "center", marginVertical: 15 }}>
                  <Text style={{ fontWeight: 600, fontSize: 24, fontFamily: typography.fontFamilies.PRIMARY, color: colors.font.PRIMARY }}>{user.displayName}</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: '#D3D3D3',
                    borderBottomWidth: 1,

                    width: '100%',
                    // marginVertical:,
                  }}
                />
                <View style={{ justifyContent: "flex-start", width: "100%", marginVertical: 10 }}>
                  <Text style={{ fontWeight: 400, fontSize: 16, fontFamily: typography.fontFamilies.PRIMARY, color: colors.font.PRIMARY }}>Basic Info</Text>
                  <Formik
                    validationSchema={signupValidationSchema}
                    initialValues={{ fullName: user.displayName ?? '', email: user.email }}
                    onSubmit={handleCreate}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      isValid,
                    }) => (
                      <>
                        <Field
                          name="fullName"
                          placeholder="Full Name"
                          style={styles.textInput}
                          error={errors.fullName}
                          onChangeText={handleChange('fullName')}
                          onBlur={handleBlur('fullName')}
                          value={values.fullName}
                        />
                        <Field
                          type="email"
                          name="email"
                          error={errors.email}
                          placeholder="Email"
                          style={styles.textInput}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                        {/* <View>
                  <Field
                    name="password"
                    error={errors.password}
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                </View> */}
                        <Button onPress={handleSubmit} title="Save" />
                      </>
                    )}
                  </Formik>
                </View>
                <View
                  style={{
                    borderBottomColor: '#D3D3D3',
                    borderBottomWidth: 1,

                    width: '100%',
                    // marginVertical:,
                  }}
                />
               {user.providerData.map(provider => provider.providerId).includes("password")
                &&  <View style={{ justifyContent: "flex-start", width: "100%", marginVertical: 10 }}>
                <Text style={{ fontWeight: 400, fontSize: 16, fontFamily: typography.fontFamilies.PRIMARY, color: colors.font.PRIMARY }}>Update Password</Text>
                <Formik
                  initialValues={intialPassValue}
                  onSubmit={(values, { resetForm }) => {
                    updatePassword(values, resetForm)
                  }}
                  validationSchema={passwordValidationSchema}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                  }) => (
                    <>
                      {user.providerData.map(provider => provider.providerId).includes("password") && <Field
                        name="existingPassword"
                        error={errors.existingPassword}
                        placeholder="Existing Password"
                        style={styles.textInput}
                        onChangeText={handleChange('existingPassword')}
                        onBlur={handleBlur('existingPassword')}
                        value={values.existingPassword}
                        secureTextEntry
                      />}
                      <Field
                        secureTextEntry
                        name="password"
                        placeholder="New Password"
                        style={styles.textInput}
                        error={errors.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                      <Field
                        secureTextEntry
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        style={styles.textInput}
                        error={errors.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      {/* <View>
               
              </View> */}
                      <Button onPress={handleSubmit} title="Update Password" />
                    </>
                  )}
                </Formik>
              </View>
               }
              </View>
              <View
                  style={{
                    borderBottomColor: '#D3D3D3',
                    borderBottomWidth: 1,

                    width: '100%',
                    // marginVertical:,
                  }}
                />
                 <View style={{ justifyContent: "flex-start", width: "100%", marginVertical: 10, gap:10 }}>
                  <Text style={{ fontWeight: 400, fontSize: 16, fontFamily: typography.fontFamilies.PRIMARY, color: colors.font.PRIMARY }}>Social Login</Text>
                  <Apple />
                  <Google />
                  <Facebook />
                </View>
                <Button onPress={()=>{
                  Alert.alert("Are you sure you want to delete your account?","This action cannot be undone.", [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Delete", style:"destructive", onPress: ()=>{
                    if (user.providerData.map(provider => provider.providerId).includes("password")) {
                        Alert.prompt("Confirm your identity",'Login Credentials', [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Confirm", style:"destructive", onPress: (value)=>{
                          if(value.login!=user.email){
                            Alert.alert("Incorrect Email Address");
                          }else{
                            deleteAccount(value.password)
                          }
                        }}], "login-password","","secure-text")
                    }else{
                      Alert.prompt("Reset your passowrd", "Your account was created using a social login. Please enter your email addresss to reset the password.", [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Confirm", style:"destructive", onPress: (value)=>{
                        resetPassword(value)
                      }}],"plain-text", "", "email-address")
                    }
                  }}])
                }} title="Delete Account"></Button>
              <Button type="outline" title={"Log out"} onPress={() => auth()
                .signOut()
                .then(() => console.log('User signed out!'))}></Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* <Button title="Logout" ></Button> */}
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  //Header
  imageContainer: {
    alignItems: 'center',
    marginTop: 45,
    maxHeight: 45,
  },
  logo: {
    maxWidth: 218,
    maxHeight: 45,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  textContent: {
    textAlign: 'center',
  },

  //Social Login
  provider: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    height: 50,
  },
  textInput: {
    marginVertical: 5
  },
  providerContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  providerText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 20,
  },
  forgot: {
    alignItems: 'flex-end',
  },
});

export default Profile