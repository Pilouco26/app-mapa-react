import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../config/Firebase';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({navigation}: RouterProps) => { 
  return (
    <View>
      <Button onPress={() => navigation.navigate('footer')} title="Open" />
      <Button onPress={() =>FIREBASE_AUTH.signOut()} title="LogOut" />

    </View>
  )
}

export default List