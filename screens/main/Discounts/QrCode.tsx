import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
// @ts-ignore
import CryptoJS from 'react-native-crypto-js';


function encryptTextToQRCode(text: string): string {
    const encryptedText = CryptoJS.AES.encrypt(text, 'america').toString();
    return encryptedText;
}


const QrCode = ({route}: any) => {
    const text = route.params ? route.params.item : null;
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

    useEffect(() => {
        if (text) {
            // Call the encryptTextToQRCode function to generate the QR code
            const encryptedText = encryptTextToQRCode(text);
            setQrCodeValue(encryptedText);
        }
    }, [text]);

    return (
        <View style={styles.container}>
            {qrCodeValue && (
                <QRCode
                    value={qrCodeValue}
                    size={300} // Set the size to the width of the screen
                />
            )}
        </View>
    );
};

export default QrCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
