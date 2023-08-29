import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer, NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FIREBASE_AUTH} from '../../config/Firebase';
import Map from '../../screens/main/Map/Map';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const InsideStack = createNativeStackNavigator();


function InsideLayout({ navigation }: RouterProps ) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="footer">
        {(props) => <Footer {...props} navigation={navigation} />}
      </InsideStack.Screen>
      <InsideStack.Screen name="Map" component={Map} />
    </InsideStack.Navigator>
  );
}


const Footer = ({navigation}: RouterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={styles.link}>
        <Text>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Friends')}
        style={styles.link}>
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Discounts')}
        style={styles.link}>
        <Text>Discounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => FIREBASE_AUTH.signOut()}
        style={styles.link}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the footer at the bottom
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f0f0f0',
  },
  link: {
    padding: 10,
  },
});

export default Footer;
