// App.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/Firebase';
import Map from './screens/main/Map/Map';
import Friends from './screens/main/Friends/Friends';
import Discounts from './screens/main/Discounts/Discounts';

const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="footer" component={Footer} options={{ headerShown: false }} />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Discounts" component={Discounts} />
    </Stack.Navigator>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {user ? (
          <Stack.Screen
            name="Home"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
