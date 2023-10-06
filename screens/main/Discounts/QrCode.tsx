import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {sha256} from 'js-sha256';

function encryptTextToQRCode(text: string): string {
    // Hash the text using SHA-256
    const hashedText = sha256(text);

    return hashedText;
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
                    size={Dimensions.get('window').width} // Set the size to the width of the screen
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
