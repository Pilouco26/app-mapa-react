import {Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '649007846141-chs7g4jboq2ka8p06qc0eb69uh9ukbhn.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (error) {
    // Handle errors here
    console.error('Google Sign-In Error:', error);
  }
}

const Options = () => {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
};

export default Options;
