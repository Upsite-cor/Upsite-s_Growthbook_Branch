import * as yup from 'yup';
const ProfileValidator = () =>{
    return yup.object().shape({
        fullName: yup
          .string()
          .min(3, ({ min }) => `Name must be at least ${min} characters`)
          .required('Name is required'),
        email: yup
          .string()
          .email('Please enter valid email')
          .required('Email Address is Required'),
      });
}

export default ProfileValidator;