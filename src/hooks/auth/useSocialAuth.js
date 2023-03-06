import { Constants } from "../../constants/constants";

const { useContext } = require("react")
const { UserContext } = require("../../navigators/Application")

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

const useSocialAuth = (providerId) =>{
    const user = useContext(UserContext);
    let variant = Constants.SOCIAL_VARIANT_SIGNIN;
    let providers = [];
    if(user){
        providers = user.providerData.map(provider => provider.providerId);
    }
    const isProvider = providers.includes(providerId);
    const isOnlyProvider = providers.length === 1 && isProvider;
    if (user) {
        variant = isProvider ? Constants.SOCIAL_VARIANT_UNLINK : Constants.SOCIAL_VARIANT_LINK;
    }
      return {
        variant,
        title: `${providerTitles[variant]} ${providerNames[providerId]}`,
        isOnlyProvider,
      };
}

export {useSocialAuth}