import {View, Text, StyleSheet, PermissionsAndroid, Button} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native'; // Import the NavigationContainer
import {SafeAreaView} from 'react-native-safe-area-context';
import Footer from '../../../components/Footer/Footer';
import {FIREBASE_AUTH} from '../../../config/Firebase';
import {getIdByEmail, getNameByEmail} from '../../../database/Usuaris/Usuaris';
import Mapbox from '@rnmapbox/maps';
const token =
  'sk.eyJ1IjoibWxvcGVzMSIsImEiOiJjbG03enN5d3MwMHNjM2VvNXVxMDhlZmZrIn0.LrT7dbhCUzlT30SfM5dM0w';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);

export const user = {
  username: 'NOT_LOADED',
  number: -1,
};
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const requestCameraPermission = async () => {
  try {

    const vibrateGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'App Vibration Permission',
        message: 'App needs access to vibrate for certain features.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );



    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
    
    if (vibrateGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the vibration');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Map = ({navigation}: RouterProps) => {
  useEffect(() => {
    if (user.username === 'NOT_LOADED') fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Footer navigation={navigation} />
      <Button title="request permissions" onPress={requestCameraPermission} />
    </View>
  );
};

async function fetchData() {
  user.username = await getName();

  user.number = await getId();
}

async function getName() {
  try {
    const email = FIREBASE_AUTH.currentUser?.email;
    if (email) {
      const name = await getNameByEmail(email);
      return name;
    }
    return '';
  } catch (error) {
    console.error('Error fetching name:', error);
    return '';
  }
}
async function getId() {
  try {
    const email = FIREBASE_AUTH.currentUser?.email;
    if (email) {
      const id = await getIdByEmail(email);
      return id;
    }
    return '';
  } catch (error) {
    console.error('Error fetching name:', error);
    return '';
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

export default Map;
