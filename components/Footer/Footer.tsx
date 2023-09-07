import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {FIREBASE_AUTH} from '../../config/Firebase';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Footer = ({navigation}: RouterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={styles.link}>
        <Text>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Friends')}
        style={styles.link}>
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Discounts')}
        style={styles.link}>
        <Text>Discounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => FIREBASE_AUTH.signOut()}
        style={styles.link}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.link}>
        <Text>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the footer at the bottom
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f0f0f0',
  },
  link: {
    padding: 10,
  },
});

export default Footer;
