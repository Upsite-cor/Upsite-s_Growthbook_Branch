import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../screens/course/Search';
import { colors } from '../styles/theme.style';
import LearnScreen from '../screens/course/Learn';
import Profile from '../screens/course/Profile';
import Home from '../screens/course/Home';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{headerShown: false, tabBarActiveTintColor: colors.general.BRAND, tabBarInactiveTintColor:"#ABABAB"}}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
        component={Home}
      />
       <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="search" size={size} color={color} />;
          },
        }}
        component={Search}
      />
      <Tab.Screen
        name="Learn"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="book" size={size} color={color} />;
          },
        }}
        component={LearnScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="user" size={size} color={color} />;
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
