import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = () => {
  // Define a function to handle the data read from the QR code
  const onSuccess = (e: any) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
    console.log(onSuccess)
  };

  return (
    <QRCodeScanner
      onRead={onSuccess.bind(this)}
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
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;
