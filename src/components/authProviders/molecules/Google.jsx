import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect,useState } from 'react'
import auth from '@react-native-firebase/auth';
import SocialLoginProvider from '../atoms/SocialLoginButton';
import { errorMessages } from '../../../constants/errorCode';
import { UserContext } from '../../../navigators/Application';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../redux/features/loader/loaderSlice';
import { useSocialAuth } from '../../../hooks/auth/useSocialAuth';
import { Constants } from '../../../constants/constants';
import Alert from '../../../utils/alert';


const PROVIDER_ID = 'google.com';

const Google = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId: require('../../../../android/app/google-services.json').webClientId,
    });
  }, []);

  const {isOnlyProvider, title, variant} = useSocialAuth(PROVIDER_ID);
  if(isOnlyProvider){
    return null;
  }

  const handleLogin = async () =>{
    if (!loading) {
      dispatch(showLoader());
      setLoading(true);
    try{
      if (variant === Constants.SOCIAL_VARIANT_UNLINK && user) {
        await user.unlink(PROVIDER_ID);
        await user.reload();
      }
      else{
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();
          const {accessToken, idToken} = await GoogleSignin.getTokens();
          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          if (variant === Constants.SOCIAL_VARIANT_LINK && user) {
            await user.linkWithCredential(credential);
            await user.reload();
          } else if (variant === Constants.SOCIAL_VARIANT_SIGNIN) {
            await auth().signInWithCredential(credential);
          }
        }
      
    }
    catch(error){
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
        case '-1':
          return Alert.notify(
            errorMessages.googleAuthErrorTitle,
            errorMessages.googleAuthCancelled
          );
        case statusCodes.IN_PROGRESS:
          return Alert.notify(
            errorMessages.googleAuthErrorTitle,
            errorMessages.googleAuthInProgress
          );
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return Alert.notify(
            errorMessages.googleAuthErrorTitle,
            errorMessages.googleAuthPlayServices
          );
        default:
          switch (error.message) {
            case 'DEVELOPER_ERROR':
              console.info(
                'Developer error during Google Auth, check: ' +
                  'https://github.com/react-native-google-signin/google-signin/blob/f21dd95a090f4f529748473e20515d6fc66db6bb/example/README.md#developer_error-or-code-10-on-android',
              );
              return Alert.notify(
                errorMessages.googleAuthErrorTitle,
                errorMessages.googleAuthConfigError
              );
            default:
              return Alert.notify(
                errorMessages.googleAuthErrorTitle,
                error.code? errorMessages[error.code] ?? error?.message ?? errorMessages.unknownError : errorMessages.unknownError
              );
          }
        }
      }finally{
        setLoading(false);
        dispatch(hideLoader());
      }
    }
  }

    return (
        <SocialLoginProvider
        title={title}
        loading={loading}
        onPress={handleLogin}
        type={"google"}></SocialLoginProvider>
      )
}

export default Google