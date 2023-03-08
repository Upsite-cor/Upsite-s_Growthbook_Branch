import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../components/buttons/Button2.component";
import TermOfService from "../../components/footers/TermsOfService.component";
import Form from "../../components/forms/Form.component";
import AuthHeader from "../../components/headers/AuthHeader.component";
import Container from "../../components/layout/Container2.component";
import { errorMessages } from "../../constants/errorCode";
import { showLoader } from "../../features/loader/loaderSlice";
import Auth from "../../services/auth/Auth.service";
import { layout } from "../../styles/theme.style";
import Alert from "../../utils/alert";
import { SignupValidator } from "../../forms/validators/auth/Signup.validator";

const Signup = ({ navigation }) => {
  const title = "Create new account";
  const signupValidationSchema = SignupValidator();
  const dispatch = useDispatch();
  var initialValue = { fullName: '', email: '', password: '' };
  const fields = [
    {
      name: "fullName",
      placeholder: "Full Name",
      type: "text"
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email"
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password"
    }
  ];
  const handleCreate = async values => {
    try {
      dispatch(showLoader());
      await Auth.Create( values.email, values.password, values.fullName);
    } catch (error) {
      Alert.notify(
        errorMessages.createAccountError,
        error.code? errorMessages[error.code] ?? error?.message ?? errorMessages.unknownError : errorMessages.unknownError
      );
    }
    finally{
      dispatch(hideLoader());
    }
  };
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: layout.padding.HORIZONTAL }}>
        <View style={{ flex: 1 }}>
          <AuthHeader title={title} />
          <View style={{ marginTop: layout.margin.VERTICAL }}>
            <Form  handleSubmit={handleCreate} fields={fields} buttonTitle="Create New Account" initalValues={initialValue} validationSchema={signupValidationSchema} />
            <Button
              onPress={() => navigation.replace('login')}
              style={{ marginTop: layout.margin.NEIGHBORS }}
              type={'outline'}>
              Already have an account? Click here to login
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

export default Signup;