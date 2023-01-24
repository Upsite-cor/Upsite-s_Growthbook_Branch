import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import Logo from '../../assets/images/growthbookLogo-2.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';
import { Header,TermOfService } from './Login';
import FormField from '../../components/form/field/FormField.component';


const LoginWithEmail = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const form = {
        email: email,
        password: password
    }
  return (
    <View style={{flex: 1}}>
      <Container>
        <Header title={"Login to your account."}></Header>
        <View style={{gap: 15, marginTop: 55}}>
            <FormField value={email} valueChanged={(event)=> setEmail(event)} ></FormField>
        </View>
        <Button title={"Login"}/>
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

export default LoginWithEmail;