import auth from '@react-native-firebase/auth';
import React, { useContext, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import SocialLogin from "../../components/authProviders/organisms/SocialLogin.component";
import Button from "../../components/buttons/Button2.component";
import Form from "../../components/forms/Form.component";
import BackHeader from "../../components/headers/BackHeader.component";
import ContentHeader from "../../components/headers/ContentHeader.component";
import Container from "../../components/layout/Container2.component";
import ImageWrapper from "../../components/wrappers/ImageWrapper.component";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { UserContext } from "../../navigators/Application";
import { ProfileService } from "../../services/auth/Profile.service";
import { colors, layout, typography } from "../../styles/theme.style";
import { getCredentialsForUser } from "../../utils";
import Alert from "../../utils/alert";
import { Alert as NativeAlert } from 'react-native';
import PasswordResetValidator from "../../validators/auth/PasswordReset.validator";
import ProfileValidator from "../../validators/auth/Profile.validator";

const LineBreak = () => {
  return (
    <View
      style={{
        borderBottomColor: colors.general.BACKGROUND,
        borderBottomWidth: 1,
        width: '100%',
      }}
    />
  )
}

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useContext(UserContext);
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const dispatch = useDispatch();
  const profileFormInitialValue = { fullName: user.displayName ?? '', email: user.email };
  const passwordFormInitialValue = { existingPassword: '', password: '', confirmPassword: '' };
  const profileValidator = ProfileValidator();
  const passwordValidator = PasswordResetValidator();
  const profileFields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email"
    }
  ];
  const passwordFields = [
    {
      name: "existingPassword",
      type: "password",
      placeholder: "Existing Password",
      condition: user.providerData.map(provider => provider.providerId).includes("password")
    },
    {
      name: "password",
      type: "password",
      placeholder: "New Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm New Password",
    }
  ]
  const reAuthenticateToDelete = () =>{
    if (user.providerData.map(provider => provider.providerId).includes("password")) {
      NativeAlert.prompt("Confirm your identity",'Login Credentials', [{text:"Cancel",isPreferred: true, style:"cancel"},{text:"Confirm", style:"destructive", onPress: (value)=>{
          if(value.login!=user.email){
            NativeAlert.alert("Incorrect Email Address");
          }else{
            deleteAccount(value.password)
          }
        }}], "login-password","","secure-text")
    }else{
      if(Platform.OS=="ios"){
        NativeAlert.prompt(
          'Reset your password',
          'Your account was created using a social login. Please enter your email address to reset the password.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: (value) => resetPassword(value) },
          ],
          'plain-text',
          '',
          'email-address'
        );
      }else{
        NativeAlert.alert(
          'Login',
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            },
          ],
          { 
            content: (
              <View>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            )
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
          <LineBreak />
          <ContentHeader title={'Basic Info'}>
            <Form handleSubmit={handleProfileUpdate} buttonTitle={"Update Profile"} fields={profileFields} initalValues={profileFormInitialValue} validationSchema={profileValidator} />
          </ContentHeader>

          {user.providerData.map(provider => provider.providerId).includes("password") && <>
            <LineBreak />
            <ContentHeader title={'Password'}>
              <Form handleSubmit={updatePassword} buttonTitle={"Update Password"} fields={passwordFields} initalValues={passwordFormInitialValue} validationSchema={passwordValidator} />
            </ContentHeader>
          </>}
          <LineBreak />
          <ContentHeader title={'Social Logins'}>
            <SocialLogin />
          </ContentHeader>
          <LineBreak />
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