import {View, Text, StyleSheet} from 'react-native';
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

const Map = ({navigation}: RouterProps) => {
  useEffect(() => {
    console.log('Map');
    if (user.username === 'NOT_LOADED') fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} />
      <Footer navigation={navigation} />
    </View>
  );
};

async function fetchData() {
  console.log('Fetching data');
  user.username = await getName();
  console.log(user.username);
  user.number = await getId();
}

async function getName() {
  try {
    const email = FIREBASE_AUTH.currentUser?.email;
    console.log('email', email);
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
    console.log('email', email);
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
