import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect,useState } from 'react'
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import SocialLoginProvider from '../components/authProviders/SocialLoginProvider';
import { errorMessages } from '../constants/errorCode';
import { UserContext } from '../navigators/Application';
import { getProviderButtonTitle } from '../utils';


const PROVIDER_ID = 'google.com';

const Google = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  const {isOnlyProvider, title, variant} = getProviderButtonTitle(
    user,
    PROVIDER_ID,
  );

  const handleLogin = async () =>{
    if (!loading) {
      setLoading(true);
    try{
      if (variant === 'UNLINK' && user) {
        await user.unlink(PROVIDER_ID);
        await user.reload();}else{
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();
          const {accessToken, idToken} = await GoogleSignin.getTokens();
          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          if (variant === 'LINK' && user) {
            await user.linkWithCredential(credential);
            await user.reload();
          } else if (variant === 'SIGN_IN') {
            await auth().signInWithCredential(credential);
          }
        }
      
    }
    catch(e){
      const error = e;
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
        case '-1':
          return Alert.alert(
            errorMessages["googleAuthErrorTitle"],
            errorMessages["googleAuthCancelled"],
            "Ok",
          );
        case statusCodes.IN_PROGRESS:
          return Alert.alert(
            errorMessages["googleAuthErrorTitle"],
            errorMessages["googleAuthInProgress"],
            "Ok",
          );
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return Alert.alert(
            errorMessages["googleAuthErrorTitle"],
            errorMessages["googleAuthPlayServices"],
            "Ok",
          );
        default:
          switch (error.message) {
            case 'DEVELOPER_ERROR':
              console.info(
                'Developer error during Google Auth, check: ' +
                  'https://github.com/react-native-google-signin/google-signin/blob/f21dd95a090f4f529748473e20515d6fc66db6bb/example/README.md#developer_error-or-code-10-on-android',
              );
              return Alert.alert(
                errorMessages["googleAuthErrorTitle"],
                errorMessages["googleAuthConfigError"],
                "Ok",
              );
            default:
              // TODO get catalog of all errors and translate them
              return Alert.alert(
                errorMessages["googleAuthErrorTitle"],
                errorMessages[error.code] ?? error.message ,
                "Ok",
              );
          }
        }
      }
      setLoading(false);

    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      // TODO: Get your web client id from firebase console --> Project Settings --> Auth --> Google Sign-in
      webClientId: require('../../android/app/google-services.json').webClientId,
    });
  }, []);
    return (
        <SocialLoginProvider
        title={title}
        loading={loading}
        onPress={handleLogin}
        type={"google"}></SocialLoginProvider>
      )
}

export default Google