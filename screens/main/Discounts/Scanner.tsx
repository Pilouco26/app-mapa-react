'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BarCodeReadEvent } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner: React.FC = () => {
  // Define a function to handle the data read from the QR code
  const handleQRCodeRead = (e: String) => {
    // e.data contains the data read from the QR code
    console.log('QR Code Data:',e);
    // You can add your logic here to handle the QR code data
  };

  return (
    <QRCodeScanner
      onRead={handleQRCodeRead} // Pass the handleQRCodeRead function here
      topContent={
        <Text style={styles.centerText}>
          Scaneja el codi Qr del restaurant per obtenir els descomptes de{' '}
          <Text style={styles.textBold}>pizzeria Alfredo</Text>.
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
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;
