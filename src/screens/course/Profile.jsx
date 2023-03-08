import auth from '@react-native-firebase/auth';
import React, { useContext } from "react";
import { Alert as NativeAlert, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import prompt from 'react-native-prompt-android';
import { useDispatch } from "react-redux";
import SocialLogin from "../../components/authProviders/organisms/SocialLogin.component";
import Button from "../../components/buttons/Button.component";
import Form from "../../components/forms/Form.component";
import BackHeader from "../../components/headers/BackHeader.component";
import ContentHeader from "../../components/headers/ContentHeader.component";
import Container from "../../components/layout/Container2.component";
import ImageWrapper from "../../components/wrappers/ImageWrapper.component";
import { errorMessages } from '../../constants/errorCode';
import { hideLoader, showLoader } from "../../redux/features/loader/loaderSlice";
import ProfileForm from '../../forms/Profile.form';
import { UserContext } from "../../navigators/Application";
import Auth from '../../services/auth/Auth.service';
import { ProfileService } from "../../services/auth/Profile.service";
import { colors, layout, typography } from "../../styles/theme.style";
import { getCredentialsForUser } from "../../utils";
import Alert from "../../utils/alert";
import ChangePasswordForm from '../../forms/ChangePassword.form';
import LineBreak from '../../components/layout/LineBreak.component';

const Profile = () => {
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const [profileFormInitialValue, profileValidator, profileFields] = ProfileForm(user);
  const [passwordFormInitialValue, passwordValidator, passwordFields] = ChangePasswordForm();
  const deleteAccount = async (pass) =>{
    try{
      dispatch(showLoader());
      var existingCredential = getCredentialsForUser(user, pass);
      try {
        await user.reauthenticateWithCredential(existingCredential);
      }
      catch(error){
        throw new Error("Incorrect password entered");
      }
      await Auth.deleteAccount(user);
    }catch(error){
      Alert.notify("An error occured", error.message);
    }finally{
      dispatch(hideLoader());
    }
  }
  const handleForgot = async email => {
    if (!email) {
      return;
    }
    try {
      dispatch(showLoader());
      await Auth.Reset(email);
      Alert.notify(
        errorMessages.passwordResetEmailSent,
        errorMessages.passwordResetEmailSentMessage
      );
      await auth().signOut();
    } catch (error) {
      Alert.notify(
        errorMessages.resetPasswordError,
        error.code? errorMessages[error.code] ?? error?.message ?? errorMessages.unknownError : errorMessages.unknownError 
      );
    }finally{
      dispatch(hideLoader());
    }
  };
  const reAuthenticateToDelete = () =>{
    if (user.providerData.map(provider => provider.providerId).includes("password")) {
      if(Platform.OS =="ios"){
        NativeAlert.prompt("Confirm your identity",'Login Credentials', [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Confirm", style:"destructive", onPress: (value)=>{
          if(value.login!=user.email){
            NativeAlert.alert("Incorrect Email Address");
          }else{
            deleteAccount(value.password)
          }
        }}], "login-password","","secure-text")
      }else{
        prompt(
          "Confirm your identity",
          'Please enter your current password.',
          [
           {text: 'Cancel',style: 'cancel'},
           {text: 'OK', onPress: password =>  deleteAccount(password)},
          ],
          {
              type: 'secure-text',
              cancelable: false,
              defaultValue: '',
              placeholder: 'Password'
          }
      );
      }
    }else{
      if(Platform.OS=="ios"){
        NativeAlert.prompt(
          'Reset your password',
          'Your account was created using a social login. Please enter your email address to reset the password.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: (email) => handleForgot(email) },
          ],
          'plain-text',
          '',
          'email-address'
        );
      }else{
        prompt(
          'Reset your password',
          'Your account was created using a social login. Please enter your email address to reset the password.',
          [
           {text: 'Cancel',style: 'cancel'},
           {text: 'OK', onPress: email => handleForgot(email)},
          ],
          {
              type: 'email-address',
              cancelable: false,
              defaultValue: '',
              placeholder: 'Email Address'
          }
      );
      }
     
    }
  }
  const confirmDeleteAccount = () =>{
    NativeAlert.alert("Are you sure you want to delete your account?","This action cannot be undone.", [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Delete", style:"destructive", onPress: ()=> reAuthenticateToDelete()}])
  }
  const uploadProfilePicture = async (uri) => {
    try {
      dispatch(showLoader());
      var downloadURL = await ProfileService.uploadProfilePic(uri, user.uid);
      await user.updateProfile({
        photoURL: downloadURL,
      });
      await user.reload();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
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
  const getShortName = () => {
    return user.displayName
      ? user.displayName.substring(0, 2).toUpperCase()
      : user.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'A';
  }
  const _renderProfilePicture = () => {
    return (
      <TouchableOpacity onPress={handleUpdatePicture} style={styles.imagePicker}>
        {
          !user.photoURL && <View style={styles.textImage}>
            <Text style={styles.textImagetext}>{getShortName()}</Text>
          </View>
        }
        {user.photoURL && <ImageWrapper spinnerStyle={styles.activityLoader} imageStyle={styles.image} errorImageStyle={styles.image} src={user.photoURL} />
        }
      </TouchableOpacity>
    )
  };
  const handleProfileUpdate = async values => {
    dispatch(showLoader());
    await user.updateEmail(values.email);
    await user.updateProfile({ displayName: values.fullName });
    await user.reload();
    dispatch(hideLoader());
  }
  const updatePassword = async (values, resetForm) => {
    try {
      dispatch(showLoader());
      if (user.providerData.map(provider => provider.providerId).includes("password")) {
        var existingCredential = getCredentialsForUser(user, values.existingPassword);
        try {
          await user.reauthenticateWithCredential(existingCredential);
          await user.updatePassword(values.password);
          await user.reload();
          resetForm(passwordFormInitialValue);
        } catch (e) {
          Alert.notify("Password not updated", "Incorrect existing password");
        }
      }
      // else {
      //   var existingCredential = getCredentialsForUser(user);
      //   await user.reauthenticateWithCredential(existingCredential);
      //   // console.log("Umer", existingCredential);
      //   const credential = auth.EmailAuthProvider.credential(user.email, values.password);
      //   await user.linkWithCredential(credential);
      //   await user.reload();
      // }
    } catch (E) {
      Alert.notify("An error occured", E.message);
    } finally {
      dispatch(hideLoader());
    }
  }

  return (
    <Container>
      <View style={{ flex: 1, gap: layout.gap.NEIGHBORS }}>
        <BackHeader type="text" text={"Profile"} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {_renderProfilePicture()}
        </View>
        <View style={{ paddingHorizontal: layout.padding.HORIZONTAL, gap: layout.gap.NEIGHBORS }}>
          <Text style={styles.fullName}>{user.displayName}</Text>
          <LineBreak type={"continuous"}/>
          <ContentHeader title={'Basic Info'}>
            <Form handleSubmit={handleProfileUpdate} buttonTitle={"Update Profile"} fields={profileFields} initalValues={profileFormInitialValue} validationSchema={profileValidator} />
          </ContentHeader>

          {user.providerData.map(provider => provider.providerId).includes("password") && <>
          <LineBreak type={"continuous"}/>
            <ContentHeader title={'Password'}>
              <Form handleSubmit={updatePassword} buttonTitle={"Update Password"} fields={passwordFields} initalValues={passwordFormInitialValue} validationSchema={passwordValidator} />
            </ContentHeader>
          </>}
          <LineBreak type={"continuous"}/>
          <ContentHeader title={'Social Logins'}>
            <SocialLogin />
          </ContentHeader>
          <LineBreak type={"continuous"}/>
          <Button onPress={confirmDeleteAccount}>Delete Account</Button>
          <Button type="outline" onPress={() => auth()
            .signOut()
            .then(() => console.log('User signed out!'))}>
            Log out
          </Button>
        </View>
      </View>
    </Container>
  );
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    fullName: {
      fontWeight: typography.fontWights.SEMI_BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      fontFamily: typography.fontFamilies.PRIMARY,
      color: colors.font.PRIMARY,
      textAlign: "center"
    },
    imagePicker: {
      borderRadius: 50,
      width: 100,
      height: 100
    },
    textImagetext: {
      fontFamily: typography.fontFamilies.PRIMARY,
      color: colors.font.SECONDARY,
      fontWeight: typography.fontWights.SEMI_BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_CAPTION / fontScale
    },
    textImage: {
      backgroundColor: colors.general.BRAND,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      borderRadius: 50,
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: 50,
    },
    activityLoader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
}

export default Profile;