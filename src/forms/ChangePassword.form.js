import PasswordResetValidator from "./validators/auth/PasswordReset.validator";

const fields = [
    {
      name: "existingPassword",
      type: "password",
      placeholder: "Existing Password",
    },
    {
      name: "password",
      type: "password",
      placeholder: "New Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm New Password",
    }
  ]
const validator =  PasswordResetValidator();
const initialValue = () => {return { existingPassword: '', password: '', confirmPassword: '' }};
export default ChangePasswordForm = () =>{
    return [initialValue(), validator, fields];
};  