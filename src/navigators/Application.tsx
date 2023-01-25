import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {createContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/button/Button.component';
import { hideLoader, showLoader } from '../features/loader/loaderSlice';
import {colors} from '../styles/theme.style';
import SignedOutStack from './SignedOutStack';

type User = FirebaseAuthTypes.User | null;
export const UserContext = createContext<User>(null);

const ApplicationNavigator = () => {
  const loader = useSelector(state=> state.loader.showLoader);
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<User>(null);
  const dispatch = useDispatch();

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
      if (initializing && !listenUser) {
        console.log("initlaizeeedd");
        setInitializing(false);
        dispatch(hideLoader())
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
      userListener = auth().onIdTokenChanged(result => {
        setUser(result);
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
          <>
            <Text>Logged in</Text>
            <Button
              title="logout"
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'))
              }></Button>
          </>
        </UserContext.Provider>
      ) : (
        <SignedOutStack />
      )}
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
