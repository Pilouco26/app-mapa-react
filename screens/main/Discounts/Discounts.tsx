import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {DiscountsList} from './DiscountsList';
import Footer from '../../../components/Footer/Footer';
import {NavigationProp} from '@react-navigation/native';
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Discounts = ({navigation}: RouterProps) => {
  return (
    <View style={styles.container}>
      <DiscountsList ></DiscountsList>
      <Footer navigation={navigation}></Footer>
    </View>
  );
};

export default Discounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
