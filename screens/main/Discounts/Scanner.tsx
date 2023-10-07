import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getIdByEmail} from '../../../database/Usuaris/Usuaris';
import {FIREBASE_AUTH} from '../../../config/Firebase';
import {addDiscountUser} from '../../../database/UsuarisDescomptes/UsuarisDescomptes';
// @ts-ignore
import CryptoJS from 'react-native-crypto-js';

function getDateAsString(): string {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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

// Define an interface to describe the structure of the event object
interface RouterProps {
    navigation: NavigationProp<any, any>;
}

function decryptText(ciphertext: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, getDateAsString());
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

const Scanner = ({navigation}: RouterProps) => {
    const handleQRCodeRead = async (event: any) => {
        try {
            if (event.data) {
                // If event.data is available, navigate back to "Discounts" component
                await addDiscountUser(await getId(), event.data); // Add "await" here
                console.log('QR Code Data:', event.data);
                const discount = decryptText(event.data);
                console.log(discount)

                navigation.navigate('Discounts');
            }
        } catch (error) {
            console.error('Error reading QR code:', error);
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
