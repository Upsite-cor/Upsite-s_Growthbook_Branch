import React, { useContext, useState } from 'react'
import {Platform } from 'react-native';
import { errorMessages } from '../../../constants/errorCode';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../../navigators/Application';
import appleAuth from '@invertase/react-native-apple-authentication';
import { getProviderButtonTitle } from '../../../utils';
import SocialLoginProvider from '../atoms/SocialLoginButton';
import { useSocialAuth } from '../../../hooks/auth/useSocialAuth';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../features/loader/loaderSlice';
import { Constants } from '../../../constants/constants';
import Alert from '../../../utils/alert';

const PROVIDER_ID = 'apple.com';  
const Apple = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  if (Platform.OS !== 'ios') {
    return null;
  }

  const {isOnlyProvider, variant,title} = useSocialAuth(PROVIDER_ID);
  if (variant === Constants.SOCIAL_VARIANT_UNLINK && user) {
    return null;
  }

  if(isOnlyProvider){
    return null;
  }

  const handleLogin = async () =>{
    if (!loading) {
      try {
        setLoading(true);
        dispatch(showLoader());
        if (variant === Constants.SOCIAL_VARIANT_UNLINK && user) {
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
        
            if (variant === Constants.SOCIAL_VARIANT_LINK && user) {
              await user.linkWithCredential(credential);
              await user.reload();
            } else if (variant === Constants.SOCIAL_VARIANT_SIGNIN) {
              await auth().signInWithCredential(credential);
            }
          } else {
            Alert.notify(errorMessages.appleAuthErrorTitle, errorMessages.appleAuthErrorMessage);
          }
        }
      } catch (error) {
        if (error.code !== '1001') {
          Alert.notify(errorMessages.appleAuthErrorTitle, error.message ?? errorMessages.unknownError);
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
        onPress={handleLogin}
        loading={loading}
        type={"apple"}></SocialLoginProvider>
      )
}

export default Apple