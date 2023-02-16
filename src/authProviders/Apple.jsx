import React, { useContext, useState } from 'react'
import { Alert, Platform } from 'react-native';
import SocialLoginProvider from '../components/authProviders/SocialLoginProvider';
import { errorMessages } from '../constants/errorCode';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../navigators/Application';
import appleAuth, {
  AppleButton,
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
import { getProviderButtonTitle } from '../utils';

const PROVIDER_ID = 'apple.com';  
const Apple = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  if (Platform.OS !== 'ios') {
    return null;
  }

  const {isOnlyProvider, variant,title} = getProviderButtonTitle(user, PROVIDER_ID);
  if (variant === 'UNLINK' && user) {
    return null;
  }

  const handleLogin = async () =>{
    if (!loading) {
      setLoading(true);
      try {
        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
          await user.reload();
        } else {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          }); 
        
          const {identityToken, nonce} = appleAuthRequestResponse;
          if (identityToken) {
            const credential = auth.AppleAuthProvider.credential(
              identityToken,
              nonce,
            );
        
            if (variant === 'LINK' && user) {
              await user.linkWithCredential(credential);
              await user.reload();
            } else if (variant === 'SIGN_IN') {
              await auth().signInWithCredential(credential);
            }
          } else {
            Alert.alert(errorMessages["appleAuthErrorTitle"], errorMessages["appleAuthErrorMessage"]);
          }
        }
      } catch (e) {
        console.log(e.message);
        const error = e;
        if (error.code !== '1001') {
          Alert.alert(errorMessages["appleAuthErrorTitle"], error.message);
          // TODO: translate all possible cases - just sending through raw now
        }
      }
      setLoading(false);
    }

  }
  if (isOnlyProvider) {
    return null;
  }
    return (
        <SocialLoginProvider
        title={title}
        onPress={handleLogin}
        loading={loading}
        type={"apple"}></SocialLoginProvider>
      )
}

export default Apple