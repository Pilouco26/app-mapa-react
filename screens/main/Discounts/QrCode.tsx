import {View} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const QrCode = () => {
  return (
    <View>
      <QRCode value="http://awesome.link.qr" />
    </View>
  );
};

export default QrCode;
