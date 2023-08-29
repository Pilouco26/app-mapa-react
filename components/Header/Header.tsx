import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Header() {
  const navigation = useNavigation<any>();

  const navigateToLogin = (): void => {
    if (navigation.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigation.navigate("Login");
    } else {
      console.log(navigation);
    }
  };

  // Other code for your header component

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={navigateToLogin} style={styles.link}>
        <Text>Login</Text>
      </TouchableOpacity>
      {/* Other links */}
    </View>
  );
}

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

export default Header;
