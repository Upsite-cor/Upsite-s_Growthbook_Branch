import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import Logo from '../../assets/images/growthbookLogo-2.png';
import {colors, typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';
import Facebook from '../../authProviders/Facebook';
import Google from '../../authProviders/Google';
import Apple from '../../authProviders/Apple';

const Header = ({title}) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>{title}</Text>
      </View>
    </>
  );
};

const LineBreak = () => {
  return (
    <View
      style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center'}}>
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

const Login = ({navigation}) => {
  const providers = ['apple', 'google', 'facebook'];
  return (
    <View style={{flex: 1}}>
      <Container>
        <Header
          title={'All growth begins with planting a simple seed…'}></Header>
        <View style={{gap: 15, marginTop: 55}}>
          {providers.map((provider, index) => {
            if (provider == 'facebook') {
              return <Facebook key={index} />;
            }
            if (provider == 'google') {
              return <Google key={index} />;
            }
            if (provider == 'apple') {
              return <Apple key={index} />;
            }
          })}
        </View>
        <LineBreak />
        <Button
          onPress={() => navigation.replace('loginEmail')}
          title={'Login with Email'}
        />
        <Button
        onPress={() => navigation.replace('signUp')}
          style={{marginTop: 15}}
          title={'New to Growthboook? Create Account'}
          type={'outline'}
        />
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
});

export default Login;
export {LineBreak, TermOfService, Header};
