import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; // Import the NavigationContainer
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Map = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text>Map Content</Text>
      </SafeAreaView>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
