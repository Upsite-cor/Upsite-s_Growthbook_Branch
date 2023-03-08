import React from 'react'
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/buttons/Button.component';
import TermOfService from '../../components/footers/TermsOfService.component';
import Form from '../../components/forms/Form.component';
import AuthHeader from '../../components/headers/AuthHeader.component';
import Container from '../../components/layout/Container2.component';
import { errorMessages } from '../../constants/errorCode';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import Auth from '../../services/auth/Auth.service';
import { layout } from '../../styles/theme.style';
import Alert from '../../utils/alert';
import LoginValidator from '../../forms/validators/auth/Login.validator';

const LoginEmail = ({navigation}) =>{
  const title = "Login to your account.";
  const loginValidationSchema = LoginValidator();
  const dispatch = useDispatch();
  var initialValue = {email: '', password: ''};

  const ForgotComponent = () =>{
    return (
      <Button
      onPress={()=> {navigation.navigate("forgot")}}
      containerStyle={{alignItems: 'flex-end', marginTop:-10}}
        type="outline">
          Forgot your password?
        </Button>
    )
  }
  const fields = [
    {
      name: "email",
      placeholder: "Email",
      type: "email"
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      component: ForgotComponent
    }
  ];
  const handleLogin = async values => {
    if (!values?.email || !values?.password) {
      return;
    }
    try {
      dispatch(showLoader());
      await Auth.Login(values?.email, values?.password);
    } catch (error) {
      Alert.notify(
        errorMessages.loginError,
        error.code? errorMessages[error.code] ?? error?.message ?? errorMessages.unknownError : errorMessages.unknownError   
      );
    }finally{
      dispatch(hideLoader());
    }
  };
  return(
    <Container>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: layout.padding.HORIZONTAL }}>
        <View style={{ flex: 1 }}>
          <AuthHeader title={title} />
          <View style={{ marginTop: layout.margin.VERTICAL }}>
          <Form handleSubmit={handleLogin} fields={fields} buttonTitle="Login" initalValues={initialValue} validationSchema={loginValidationSchema} />
          <Button
          onPress={() => navigation.replace('signUp')}
          style={{ marginTop: layout.margin.NEIGHBORS }}
          type={'outline'}>
            New to Growthboook? Create Account
          </Button>
          </View>
        </View>
        <View style={{ flex: 0, marginVertical: layout.margin.VERTICAL, paddingHorizontal: layout.padding.HORIZONTAL * 2 }}>
          <TermOfService />
        </View>
      </View>
    </Container>
  )
};

export default LoginEmail;