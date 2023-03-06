import * as yup from 'yup';
const SignupValidator =()=>{
    return yup.object().shape({
        fullName: yup
          .string()
          .min(3, ({min}) => `Name must be at least ${min} characters`)
          .required('Name is required'),
        email: yup
          .string()
          .email('Please enter valid email')
          .required('Email Address is Required'),
        password: yup
          .string()
          .min(8, ({min}) => `Password must be at least ${min} characters`)
          .required('Password is required'),
      });
}

export {SignupValidator};