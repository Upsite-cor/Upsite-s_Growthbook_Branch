import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {createContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserId } from '../redux/features/auth/authSlice';
import {colors} from '../styles/theme.style';
import MainStack from './MainStack';
import SignedOutStack from './SignedOutStack';

type User = FirebaseAuthTypes.User | null;
export const UserContext = createContext<User>(null);

const ApplicationNavigator = () => {
  const loader = useSelector(state=> state.loader.showLoader);
  const userId = useSelector(state=> state.auth.userId)
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>(null);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };
  useEffect(() => {
    const authListener = auth().onAuthStateChanged(result => {
      setUser(result);
      dispatch(updateUserId(result?.uid));
      if (initializing && !listenUser) {
        setInitializing(false);
        setListenUser(true);
      }
    });
    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, [initializing, listenUser]);

  /** Listen for user changes */
  useEffect(() => {
    let userListener: () => void;
    
    if (listenUser) {
      // TODO @react-native-firebase/auth provides `onUserChanged` which is this and more.
      // what else can we add and still be web-compatible?
      userListener = auth().onUserChanged(result => {
        setUser(result);
        dispatch(updateUserId(result?.uid));
      });
    }

    return () => {
      if (userListener) {
        userListener();
      }
    };
  }, [listenUser]);

  return (
    <NavigationContainer theme={MyTheme}>
      {loader && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: 9999,
            width: '100%',
            justifyContent: 'center',
            height: '100%',
          }}>
          <ActivityIndicator color={colors.general.BRAND}></ActivityIndicator>
        </View>
      )}
      {user ? (
        <UserContext.Provider value={user}>
          <MainStack></MainStack>
        </UserContext.Provider>
      ) : (
        <SignedOutStack />
      )}
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
