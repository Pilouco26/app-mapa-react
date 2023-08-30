import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Set the background color to white
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    input: {
      width: '75%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    mainButton: {
      width: '75%',
      height: 50,
      backgroundColor: '#228B22',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      alignSelf: 'center',
    },
    button: {
      width: 100, // Adjust the width as needed
      height: 40, // Adjust the height as needed
      backgroundColor: 'gray', // Choose the color you prefer
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    buttonText: {
      color: 'white', // Text color for the buttons
      fontWeight: 'bold',
    },
    logo: {
      width: 300,
      height: 300,
      marginBottom: 5, // Optional, add spacing below the logo if needed
      alignSelf: 'center',
    },
    title: {
      fontSize: 36,
      marginTop: 20,
      alignSelf: 'center',
      marginBottom: 10,
      fontFamily: 'Cochin',
      fontWeight: 'bold',
      color: '#000000',
    },
  });