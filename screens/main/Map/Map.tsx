import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native'; // Import the NavigationContainer
import {SafeAreaView} from 'react-native-safe-area-context';
import Footer from '../../../components/Footer/Footer';
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Map = ({navigation}: RouterProps) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text>Map Content</Text>
      </SafeAreaView>
      <Footer navigation={navigation} />
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
