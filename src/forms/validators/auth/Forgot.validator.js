import * as yup from 'yup';
const ForgotValidator = () =>{
    return yup.object().shape({
        email: yup
          .string()
          .email('Please enter valid email')
          .required('Email Address is Required')
      });    
}

export default ForgotValidator;