import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import Logo from '../../assets/images/growthbookLogo-2.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';
import {Header, TermOfService} from './Login';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import Field from '../../components/form/Field.component';
import {errorMessages} from '../../constants/errorCode';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../features/loader/loaderSlice';
import * as yup from 'yup';

const Forgot = ({navigation}) => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required')
  });

  const dispatch = useDispatch();

  const handleLogin = async values => {
    if (!values?.email) {
      return;
    }

    try {
      dispatch(showLoader());
      await auth().sendPasswordResetEmail(values.email)
        .then(() => {
          dispatch(hideLoader());
          navigation.goBack();
        });
    } catch (e) {
      dispatch(hideLoader());
      console.log(e);
      const error = e;
      Alert.alert(
        'Login Error',
        errorMessages[error.code ?? 'unknownError'],
        'Ok',
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      <Container>
        <Header title={'Reset your password.'}></Header>
        <View style={{gap: 15, marginTop: 55}}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                 <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    error={errors.email}
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                <Button onPress={handleSubmit} title="Reset" />
              </>
            )}
          </Formik>
        </View>
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
  forgot: {
    alignItems: 'flex-end',
  },
});

export default Forgot;
