import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import LoginWithEmail from '../screens/auth/LoginEmail';
import Signup from '../screens/auth/Signup';
import Forgot from '../screens/auth/Forgot'
const Stack = createNativeStackNavigator();

const SignedOutStack = () =>{
    return (
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="loginEmail"
            options={{headerShown: false}}
            component={LoginWithEmail}
          />
             <Stack.Screen
            name="forgot"
            options={{headerShown: false}}
            component={Forgot}
          />
          <Stack.Screen
            name="signUp"
            options={{headerShown: false}}
            component={Signup}
          />
        </Stack.Navigator>
      );
};

export default SignedOutStack;  