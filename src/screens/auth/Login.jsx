import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import Logo from '../../assets/images/growthbookLogo-2.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';

const Header = ({title}) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>
         {title}
        </Text>
      </View>
    </>
  );
};

const SocialLoginProvider = ({type}) => {
  const icons = {
    apple: 'apple',
    google: 'google',
    facebook: 'facebook-square',
  };
  const colors = {
    apple: '#1f1f1f',
    google: '#808080',
    facebook: '#1877F2',
  };
  Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <TouchableOpacity style={[styles.provider, {borderColor: colors[type]}]}>
      <View style={styles.providerContainer}>
        <Icon size={30} color={colors[type]} name={icons[type]} />
        <Text style={[styles.providerText, {color: colors[type]}]}>
          Continue with {Capitalize(type)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LineBreak = () => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 20 , alignItems: 'center'}}>
      <View
        style={{flex: 1, height: 1, backgroundColor: colors.general.BRAND}}
      />
      <View>
        <Text
          style={{
            width: 50,
            color: colors.font.BRAND,
            textAlign: 'center',
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: 700,
          }}>
          OR
        </Text>
      </View>
      <View
        style={{flex: 1, height: 1, backgroundColor: colors.general.BRAND}}
      />
    </View>
  );
};

const TermOfService = () => {
  return (
    <View
      style={{
        marginBottom: 100,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: typography.fontFamilies.PRIMARY,
          fontSize: 16,
          fontWeight: 400,
        }}>
        By using our services you are agreeing to our{' '}
        <Text style={{color: colors.font.BRAND, fontWeight: 700}}>Terms</Text>{' '}
        and{' '}
        <Text style={{color: colors.font.BRAND, fontWeight: 700}}>
          Privacy Statement
        </Text>
      </Text>
    </View>
  );
};

const Login = () => {
  const providers = ['apple', 'google', 'facebook'];
  return (
    <View style={{flex: 1}}>
      <Container>
        <Header title={"All growth begins with planting a simple seed…"}></Header>
        <View style={{gap: 15, marginTop: 55}}>
          {providers.map((provider, index) => (
            <SocialLoginProvider
              key={index}
              type={provider}></SocialLoginProvider>
          ))}
        </View>
        <LineBreak />
        <Button title={"Login with Email"}/>
        <Button style={{marginTop: 15}} title={"New to Growthboook? Create Account"} type={"outline"}/>
      </Container>
      <TermOfService />
    </View>
  );
};

const styles = StyleSheet.create({
  //Header
  imageContainer: {
    alignItems: 'center',
    marginTop: 45,
    maxHeight: 45,
  },
  logo: {
    maxWidth: 218,
    maxHeight: 45,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  textContent: {
    textAlign: 'center',
  },

  //Social Login
  provider: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    height: 50,
  },
  providerContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  providerText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 20,
  },
});

export default Login;
export {LineBreak, TermOfService, Header}