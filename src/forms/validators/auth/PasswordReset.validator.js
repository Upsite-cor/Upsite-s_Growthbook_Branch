import * as yup from 'yup';
const PasswordResetValidator =() =>{
    return yup.object().shape({
        existingPassword: yup.string(),
        password: yup.string()
          .required('Please enter a new password')
          .min(8, 'Password must be at least 8 characters long'),
        confirmPassword: yup.string()
          .required('Please confirm your new password')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
      });
}
export default PasswordResetValidator;