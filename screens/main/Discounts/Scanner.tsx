import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// Define an interface to describe the structure of the event object
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Scanner = ({navigation}: RouterProps) => {
  const handleQRCodeRead = (event: any) => {
    console.log('QR code data:', event.data);
    console.log('Event type:', typeof event.data);

    if (event.data) {
      // If event.data is available, navigate back to "Discounts" component
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
