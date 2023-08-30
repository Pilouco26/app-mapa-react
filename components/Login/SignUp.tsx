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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import Modal from '../modal/ModalText';
import {NavigationProp} from '@react-navigation/native';
import {Styles} from './Styles';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({navigation}: RouterProps) => {
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
      setError('El email no es compleix amb els requisits!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Crear compte</Text>
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
          <TouchableOpacity style={Styles.mainButton} onPress={() => signUp()}>
            <Text style={Styles.buttonText}>Crear Compte</Text>
          </TouchableOpacity>
          {error && <Modal error={error} />}
          {/* Conditionally render the "Sign Up" button */}
          {!keyboardVisible && (
            <TouchableOpacity
              style={Styles.button}
              onPress={() => navigation.navigate('LogIn')}>
              <Text style={Styles.buttonText}>Inicia Sessió</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default SignUp;
