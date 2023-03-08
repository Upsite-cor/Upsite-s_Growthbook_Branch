import ProfileValidator from "./validators/auth/Profile.validator";

const fields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email"
    }
  ];
const validator = ProfileValidator();
const initialValue = user => {return { fullName: user.displayName ?? '', email: user.email }};
export default ProfileForm = (user) =>{
    return [initialValue(user), validator, fields];
};  