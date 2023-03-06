import auth from '@react-native-firebase/auth';

export const  getCredentialsForUser =(user,password ="")=>{
  const currentUser = user;

  const providerData = currentUser.providerData;

  const googleProvider = providerData.find(
    (provider) => provider.providerId === auth.GoogleAuthProvider.PROVIDER_ID
  );

  const appleProvider = providerData.find(
    (provider) => provider.providerId === auth.AppleAuthProvider.PROVIDER_ID
  );

  const facebookProvider = providerData.find(
    (provider) => provider.providerId === auth.FacebookAuthProvider.PROVIDER_ID
  );

  const passwordProvider = providerData.find(
    (provider) => provider.providerId === auth.EmailAuthProvider.PROVIDER_ID
  );
  if(passwordProvider) {
    const credential = auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    return credential;
  }
  else if (googleProvider) {
    const credential = auth.GoogleAuthProvider.credential(googleProvider.uid);

    return credential;
  } else if (appleProvider) {
    const credential = auth.AppleAuthProvider.credential(
      appleProvider.uid
    );

    return credential;
  } else if (facebookProvider) {
    const credential = auth.FacebookAuthProvider.credential(
      facebookProvider.uid
    );

    return credential;
  }
}