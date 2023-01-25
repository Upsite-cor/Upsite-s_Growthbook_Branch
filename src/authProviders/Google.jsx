import React from 'react'
import SocialLoginProvider from '../components/authProviders/SocialLoginProvider';

const Google = () => {
    return (
        <SocialLoginProvider
        type={"google"}></SocialLoginProvider>
      )
}

export default Google