import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Footer = ({navigation}: RouterProps) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Friends')}
                style={styles.link}>
                <Text>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Map')}
                style={styles.link}>
                <Text>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Discounts')}
                style={styles.link}>
                <Text>Discounts</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        justifyContent: 'space-evenly', // Align the footer at the bottom
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#f0f0f0',
    },
    link: {
        marginLeft: 24,
    },
});

export default Footer;
