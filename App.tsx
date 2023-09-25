// App.js
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {User, onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './config/Firebase';
import Map from './screens/main/Map/Map';
import Friends from './screens/main/Friends/Friends';
import Discounts from './screens/main/Discounts/Discounts';
import SignUp from './components/Login/SignUp';
import Profile from './screens/secondary/Profile/Profile';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import QrCode from './screens/main/Discounts/QrCode';
import Scanner from './screens/main/Discounts/Scanner';
import { Camera } from 'react-native-vision-camera';
import { PermissionsAndroid } from 'react-native';

const Stack = createNativeStackNavigator();


function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="Footer"
        component={Footer}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Discounts" component={Discounts} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="QrCode" component={QrCode} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
}

function Authentication() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user);
    });
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
          {user ? (
            <Stack.Screen
              name="Home"
              component={InsideLayout}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Authentication}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
