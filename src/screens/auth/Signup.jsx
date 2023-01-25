import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import {typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';
import { Header,TermOfService } from './Login';
import { Formik } from 'formik';
import Field from '../../components/form/Field.component';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import { errorMessages } from '../../constants/errorCode';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const handleCreate = async (values) => {
    try {
      dispatch(showLoader());
      const credential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      credential.user.updateProfile({displayName: values.fullName});
      // credential.user.sendEmailVerification();
      dispatch(hideLoader());
    } catch (e) {
      dispatch(hideLoader());
      const error = e;
      console.log(e);
      Alert.alert(
        errorMessages["createAccountError"],
        errorMessages[error.code ?? 'unknownError']
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      <Container>
        <Header title={"Create new account"}></Header>
        <View style={{gap: 15, marginTop: 55}}>
        <Formik
            initialValues={{ fullName: '', email: '', password: '' }}
            onSubmit={handleCreate}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
               <Field
                  name="fullName"
                  placeholder="Full Name"
                  style={styles.textInput}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
               <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <View>
                <Field
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                </View>
                <Button onPress={handleSubmit} title="Create New Account" />
              </>
            )}
          </Formik>
        </View>
        <Button onPress={() => navigation.replace('login')}  style={{marginTop: 15}} title={"Already have an account? Click here to login"} type={"outline"}/>
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
  forgot:{
    alignItems:"flex-end",
  }
});

export default Signup;