import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FIREBASE_AUTH} from '../../config/Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false); // State for keyboard visibility
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    // Add event listeners for keyboard visibility
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicía Sessió</Text>
      <Image source={require('../../pictures/logo3.png')} style={styles.logo} />
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Mail"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        style={styles.input}
        placeholder="Contrasenya"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.mainButton} onPress={() => signIn()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Conditionally render the "Sign Up" button */}
          {!keyboardVisible && (
            <TouchableOpacity style={styles.button} onPress={() => signUp()}>
              <Text style={styles.buttonText}>Crear Compte</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
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
