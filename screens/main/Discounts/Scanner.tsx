import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getIdByEmail} from '../../../database/Usuaris/Usuaris';
import {FIREBASE_AUTH} from '../../../config/Firebase';
import {addDiscountUser} from '../../../database/UsuarisDescomptes/UsuarisDescomptes';

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
// Define an interface to describe the structure of the event object
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Scanner = ({navigation}: RouterProps) => {
  const handleQRCodeRead = async (event: any) => {
    if (event.data) {
      // If event.data is available, navigate back to "Discounts" component
      await addDiscountUser(await getId(), event.data); // Add "await" here
      navigation.navigate('Discounts');
    }
  };

  return (
    <QRCodeScanner
      onRead={handleQRCodeRead}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Test scanner</Text>{' '}
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0, 122, 255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;
