import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Animated } from 'react-native';

import colors from '../colors';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';






const Drawer = ({ navigation, handleNavigate, drawerOpen, onClose, user }) => {
  const drawerWidth = 650;
  const [userData, setUserData] = useState({
    name: 'loading...',
    profileImage: 'default_profile_image_uri',
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const getUserDataFromFirestore = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('User is not authenticated');
          return;
        }
        const userUid = user.uid;
        const userRef = doc(database, 'users', userUid);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserData(userData);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error getting user data from Firestore:', error);
      }
    };

    getUserDataFromFirestore();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Error logging out: ', error);
      });
  };

  return (
    <Animated.View
      style={[
        styles.drawerContainer,
        {
          transform: [
            {
              translateX: drawerOpen ? 0 : -drawerWidth,
            },
          ],
        },
      ]}
    >
      <View style={styles.header}>
        <Image source={{ uri: userData.profileImage }} style={styles.profile} />
        <Text style={styles.profileName}>{userData.name || 'No Name'}</Text>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
          <Text style={styles.menuItemText}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('ChatScreen')}>
          <Text style={styles.menuItemText}>Chats</Text>
        </TouchableOpacity>

        {/* Add more navigation links as needed */}
        <TouchableOpacity style={styles.menuItem} onPress={() =>  navigation.navigate('HelpSupportScreen')}>
          <Text style={styles.menuItemText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AboutScreen')}>
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Other sections or links as required */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: colors.primary,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.5,
    elevation: 4,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  menuItems: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuItemText: {
    fontSize: 20,
    color: colors.white,
  },
  logoutButton: {
    backgroundColor: colors.primary, // Change background color as needed
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff', // Change text color as needed
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Drawer;