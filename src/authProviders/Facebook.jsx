import React, { useContext, useState } from 'react'
import { Alert } from 'react-native';
import SocialLoginProvider from '../components/authProviders/SocialLoginProvider';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import { errorMessages } from '../constants/errorCode';
import { UserContext } from '../navigators/Application';

const PROVIDER_ID = 'facebook.com';

const Facebook = () => {
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext);

    const handleLogin = async () =>{
        if (!loading) {
            setLoading(true);
        try{
          const {isCancelled} = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);
          if (isCancelled) {
            setLoading(false);
            Alert.alert( errorMessages["facebookAuthErrorTitle"], errorMessages["facebookAuthCancelled"]);
          }else{
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error("We did not obtain an access token from Facebook.");
            }
            const {accessToken} = result;
            const credential =
              auth.FacebookAuthProvider.credential(accessToken);

            await auth().signInWithCredential(credential);
          }
        }
        catch (error) {
          setLoading(false);
          Alert.alert(
            errorMessages["facebookAuthErrorTitle"],
            errorMessages[error.code] ?? error.message
          );
        }
      }
    };
  return (
    <SocialLoginProvider
    onPress={handleLogin}
    loading={loading}
    type={"facebook"}></SocialLoginProvider>
  )
}

export default Facebook;