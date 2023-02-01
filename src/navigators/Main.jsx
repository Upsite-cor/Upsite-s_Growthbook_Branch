import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/mainApp/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../screens/mainApp/Search';
import { colors } from '../styles/theme.style';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{headerShown: false, tabBarActiveTintColor: colors.general.BRAND, tabBarInactiveTintColor:"#ABABAB"}}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
        component={HomeScreen}
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
        component={Search}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return <Icon name="user" size={size} color={color} />;
          },
        }}
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
