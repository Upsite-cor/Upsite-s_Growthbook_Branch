import React, { useContext, useState } from 'react'
import { Alert } from 'react-native';
import SocialLoginProvider from '../components/authProviders/SocialLoginProvider';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { errorMessages } from '../constants/errorCode';
import { UserContext } from '../navigators/Application';
import { getProviderButtonTitle } from '../utils';

const PROVIDER_ID = 'facebook.com';

const Facebook = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  const { isOnlyProvider, title, variant } = getProviderButtonTitle(
    user,
    PROVIDER_ID,
  );
  const handleLogin = async () => {
    if (!loading) {
      setLoading(true);
      try {
        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
          await user.reload();
        } else {
          const { isCancelled } = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);
          if (isCancelled) {
            setLoading(false);
            Alert.alert(errorMessages["facebookAuthErrorTitle"], errorMessages["facebookAuthCancelled"]);
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error("We did not obtain an access token from Facebook.");
            }
            const { accessToken } = result;
            const credential =
              auth.FacebookAuthProvider.credential(accessToken);

              if (variant === 'LINK' && user) {
                await user.linkWithCredential(credential);
                await user.reload();
              } else if (variant === 'SIGN_IN') {
                await auth().signInWithCredential(credential);
              }
          }
        }
      }
      catch (error) {
        setLoading(false);
        Alert.alert(
          errorMessages["facebookAuthErrorTitle"],
          errorMessages[error.code] ?? error.message
        );
      }
      setLoading(true);
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