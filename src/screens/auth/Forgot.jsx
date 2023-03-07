
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../components/buttons/Button2.component";
import TermOfService from "../../components/footers/TermsOfService.component";
import Form from "../../components/forms/Form.component";
import AuthHeader from "../../components/headers/AuthHeader.component";
import Container from "../../components/layout/Container2.component";
import { errorMessages } from "../../constants/errorCode";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import Auth from "../../services/auth/Auth.service";
import { layout } from "../../styles/theme.style";
import Alert from "../../utils/alert";
import ForgotValidator from "../../validators/auth/Forgot.validator";

const Forgot = ({navigation}) =>{
  const title = "Reset your password.";
  const forgotPasswordValidationScheme = ForgotValidator();
  const dispatch = useDispatch();
  const initialValue = {email: ''};
  const fields = [
    {
      name:"email",
      type:"email",
      placeholder: "Email"
    }
  ]

  const handleForgot = async values => {
    if (!values?.email) {
      return;
    }
    try {
      dispatch(showLoader());
      await Auth.Reset(values.email);
      navigation.goBack();
      Alert.notify(
        errorMessages.passwordResetEmailSent,
        errorMessages.passwordResetEmailSentMessage
      );
    } catch (error) {
      Alert.notify(
        errorMessages.resetPasswordError,
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
            <Form  handleSubmit={handleForgot} fields={fields} buttonTitle="Reset" initalValues={initialValue} validationSchema={forgotPasswordValidationScheme} />
            <Button onPress={() => navigation.replace('login')}
                        style={{ marginTop: layout.gap.NEIGHBORS }}
                        type={'outline'}>
                        Want to go back? Click here to login
                    </Button>

          </View>
        </View>
        <View style={{ flex: 0, marginVertical: layout.margin.VERTICAL, paddingHorizontal: layout.padding.HORIZONTAL * 2 }}>
          <TermOfService />
        </View>
      </View>
    </Container>
  );
};

export default Forgot;