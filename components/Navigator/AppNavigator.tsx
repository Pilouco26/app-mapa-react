import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';// Replace with your actual screen component
import React from 'react'; // Import the React object

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      {/* Other screens */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
