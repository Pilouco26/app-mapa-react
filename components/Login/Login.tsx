import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FIREBASE_AUTH} from '../../config/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import Modal from '../modal/ModalText';
import {NavigationProp} from '@react-navigation/native';
import {Styles} from './Styles';
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({navigation}: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false); // State for keyboard visibility
  const [error, setError] = useState<string>(''); // State for error message

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
      setError("L'usuari o la contrasenya no es correcta!"); // Set the error message
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Inicía Sessió</Text>
      <Image source={require('../../pictures/logo3.png')} style={Styles.logo} />
      <TextInput
        value={email}
        style={Styles.input}
        placeholder="Mail"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        style={Styles.input}
        placeholder="Contrasenya"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={Styles.mainButton} onPress={() => signIn()}>
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {error && <Modal error={error} />}
          {/* Conditionally render the "Sign Up" button */}
          {!keyboardVisible && (
            <TouchableOpacity
              style={Styles.button}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={Styles.buttonText}>Crear Compte</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default Login;
