import {View, StyleSheet, PermissionsAndroid, Button, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native'; // Import the NavigationContainer
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

const requestCameraPermission = async () => {
    try {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'App Vibration Permission',
                message: 'App needs access to vibrate for certain features.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Cool Photo App Camera Permission',
            message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });
    } catch (err) {
        console.warn(err);
    }
};

const Map = ({navigation}: RouterProps) => {
    useEffect(() => {
        if (user.username === 'NOT_LOADED') {
            fetchData();
        }
    }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Content */}

                {/* Main content */}
                <View style={styles.container}>
                    {/* Your main content */}
                    <Button title="request permissions" onPress={requestCameraPermission}/>
                </View>
                {/* Footer */}
                <Footer navigation={navigation}/>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
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
    safeArea: {
        flex: 1, // Ensure the SafeAreaView takes the full screen height
    },
});

export default Map;
