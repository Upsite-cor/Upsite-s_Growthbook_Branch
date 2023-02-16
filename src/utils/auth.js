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

// type ProviderID = 'google.com' | 'facebook.com' | 'apple.com';

const providerNames = {
  'google.com': 'Google',
  'facebook.com': 'Facebook',
  'apple.com': 'Apple',
};

const providerTitles= {
  SIGN_IN: 'Continue with',
  LINK: 'Sign in with',
  UNLINK: 'Disconnect',
};

/**
 * Return array of user auth providers
 */
export function getProviders(user){
  if (user) {
    return user.providerData.map(provider => provider.providerId);
  }

  return [];
}

export function getProviderButtonTitle(
  user,
  providerID
) {
  const providers = getProviders(user);
  const isProvider = providers.includes(providerID);
  const isOnlyProvider = providers.length === 1 && isProvider;
  let variant = 'SIGN_IN';

  if (user) {
    variant = isProvider ? 'UNLINK' : 'LINK';
  }

  return {
    variant,
    title: `${providerTitles[variant]} ${providerNames[providerID]}`,
    isOnlyProvider,
  };
}