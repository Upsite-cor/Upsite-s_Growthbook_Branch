import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioApp from '../screens/mainApp/AudioApp';
import CourseDetailv2 from '../screens/mainApp/courseDetail/CourseDetailv2';
import CourseNavigation from '../screens/mainApp/CourseNavigation';
import MainNavigation from './Main';

const Stack = createNativeStackNavigator();

const MainStack = () =>{
    return (
        <Stack.Navigator  initialRouteName="home">
          <Stack.Screen
            name="home"
            component={MainNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="course"
            options={{headerShown: false, tabBarVisible: false}}
            component={CourseDetailv2}
          />
           <Stack.Screen
            name="courseNavigation"
            options={{headerShown: false, tabBarVisible: false}}
            component={CourseNavigation}
          />
            <Stack.Screen
            name="audioPlayer"
            options={{headerShown: false, tabBarVisible: false}}
            component={AudioApp}
          />
        </Stack.Navigator>
      );
};

export default MainStack;  