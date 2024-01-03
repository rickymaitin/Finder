import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const SplashScreen = () => {
  const navigation = useNavigation();

  const handlePersonalPress = () => {
    navigation.navigate('PersonalReg');
  };

  const handleLogin = () => {
    // Handle the login action here
    console.log("User logged in");
    // You can navigate to the login screen or any other screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require ('../assets/light.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Welcome to Finder</Text>
      <TouchableOpacity style={styles.cardContainer} onPress={handlePersonalPress}>
        
        <Text style={styles.cardTitle}>Personal</Text>
        <Text style={styles.cardDescription}>Register as a personal user</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Already have an account?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue with Login</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Adjust to fit the screen width
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 290,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text:{
    fontSize: 12,
    marginBottom: 20,
    color: '#f57c00',
    textTransform: 'uppercase',
    letterSpacing: 1.5,

  },
  cardContainer: {
    width: 300,
    height: 135,
    backgroundColor: '#999',
    borderRadius: 12,
    padding: 20,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#999',
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 15,
  },
});

export default SplashScreen;
