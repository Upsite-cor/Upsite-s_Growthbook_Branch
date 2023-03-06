import React, { useContext, useState } from 'react'
import SocialLoginProvider from '../atoms/SocialLoginButton';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { errorMessages } from '../../../constants/errorCode';
import { UserContext } from '../../../navigators/Application';
import { useSocialAuth } from '../../../hooks/auth/useSocialAuth';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../features/loader/loaderSlice';
import Alert from '../../../utils/alert';
import { Constants } from '../../../constants/constants';

const PROVIDER_ID = 'facebook.com';

const Facebook = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const dispatch = useDispatch();

  const { isOnlyProvider, title, variant } = useSocialAuth(PROVIDER_ID);
  if(isOnlyProvider){
    return null;
  }

  const handleLogin = async () => {
    if (!loading) {
      dispatch(showLoader());
      setLoading(true);
      try {
        if (variant === Constants.SOCIAL_VARIANT_UNLINK && user) {
          await user.unlink(PROVIDER_ID);
          await user.reload();
        } else {
          const { isCancelled } = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);
          if (isCancelled) {
            Alert.notify(errorMessages.facebookAuthErrorTitle, errorMessages.facebookAuthCancelled);
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error("We did not obtain an access token from Facebook.");
            }
            const { accessToken } = result;
            const credential =
              auth.FacebookAuthProvider.credential(accessToken);

              if (variant === Constants.SOCIAL_VARIANT_LINK && user) {
                await user.linkWithCredential(credential);
                await user.reload();
              } else if (variant === Constants.SOCIAL_VARIANT_SIGNIN) {
                await auth().signInWithCredential(credential);
              }
          }
        }
      }
      catch (error) {
        Alert.notify(
          errorMessages.facebookAuthErrorTitle,
          error.code? errorMessages[error.code] ?? error?.message ?? errorMessages.unknownError : errorMessages.unknownError
        );
      }
      finally{
        setLoading(false);
        dispatch(hideLoader());
      }
    }
  };
  return (
    <SocialLoginProvider
      onPress={handleLogin}
      title={title}
      loading={loading}
      type={"facebook"}></SocialLoginProvider>
  )
}

export default Facebook;