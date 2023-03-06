import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioApp from '../screens/player/AudioApp';
import CourseDetailv2 from '../screens/mainApp/Course';
import CourseNavigation from '../screens/mainApp/CourseNavigation';
import MainNavigation from './Main';
import LectureViewer from '../screens/mainApp/LectureViewer';
import QuizInfo from '../screens/quiz/QuizInfo';
import QuizAttempt from '../screens/quiz/QuizAttempt';
import CourseListing from '../screens/mainApp/CourseListing';

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
           <Stack.Screen
            name="lectureViewer"
            options={{headerShown: false, tabBarVisible: false}}
            component={LectureViewer}
          />
           <Stack.Screen
            name="quizPlayer"
            options={{headerShown: false,tabBarVisible: false}}
            component={QuizInfo}
          />
           <Stack.Screen
            name="quizAttempt"
            options={{headerShown: false, tabBarVisible: false}}
            component={QuizAttempt}
          />
          <Stack.Screen
            name="courseListing"
            options={{headerShown: false, tabBarVisible: false}}
            component={CourseListing}
          />
        </Stack.Navigator>
      );
};

export default MainStack;  