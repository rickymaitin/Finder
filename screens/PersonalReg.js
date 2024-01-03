import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const light = require("../assets/light.png");

export default function PersonalReg({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Function to handle user signup
  const signUp = async () => {
    try {
      // Register the user with Firebase Authentication (email/password, etc.)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        // Get the user's UID
        const userUid = userCredential.user.uid;

        // Create a reference to the "users" collection and add the user profile data
        const userRef = doc(database, 'users', userUid);
        await setDoc(userRef, {
          name, // Include the user's name
          // You can initialize this to null or a default value
          profileSetupComplete: false, // Initialize the profile setup status as false
          // Add other profile data as needed
        });

        console.log('User object before navigating:', userCredential.user);
        navigation.navigate('ProfileSetupScreen', { user: userCredential.user }); // Pass the user object, not userCredential
        console.log('User signed up and profile document created successfully');

        console.log('Received user object in ProfileSetupScreen:',userCredential);
        console.log('User signed up and profile document created successfully');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert("Signup error", error.message); // Display an error message
    }
  };

  return (
    <View style={styles.container}>
      <Image source={light} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="words"
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
       <TouchableOpacity
        style={styles.button}
        onPress={signUp}
        activeOpacity={0.9} // Set the opacity for button press
      >
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Sign Up</Text>
      </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#999",
    alignSelf: "center",
    paddingBottom: 24,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
    color: '#999',
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '77%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#999',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    elevation: 8,
  },
  
});
