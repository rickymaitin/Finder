import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, getDoc,doc, query, where } from 'firebase/firestore';
import { auth, database } from '../config/firebase';




const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params?.user;
  const userName = user?.name || 'No Name';
  const profileImageUri = user?.profileImage || 'default_profile_image_uri';
  const userUid = user?.uid || null;
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [education, setEducation] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');
  const [minPay, setMinPay] = useState('');
    const [notificationEnabled, setNotificationEnabled] = useState(false);




  const [userData, setUserData] = useState({
    name: 'Loading...',
    profileImage: 'default_profile_image_uri',
    location,
    bio,
    skills,
    socialMedia,
    portfolio,
    education,
    availability,
    languages,
    minPay,
  });

  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [arrivalTime, setArrivalTime] = useState('');
  

  const handleEditProfile = () => {
    navigation.navigate('EditProfileView', { user:userData });
  };

  const handleNavigateToDashboard =() => {
    navigation.navigate('UserDashboard');

  };

 

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work.');
        }
      }
    })();
  }, []);

  const saveUserDataToFirestore = async (userData) => {
    try {
      if (!userUid) {
        console.error('User not authenticated.');
        return;
      }

      const userRef = collection(database, 'users');
      await addDoc(userRef, {
        userId: userUid,
        ...userData,
      });
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };

  const getUserDataFromFirestore = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        console.log('User is not authenticated');
        return;
      }
  
      const userUid = user.uid;
      console.log('User UID:', userUid);
  
      const userRef = doc(database, 'users', userUid); // Reference the user's document by UID
      console.log('User reference path:', userRef.path);
  
      const docSnapshot = await getDoc(userRef);
  
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        console.log('User data retrieved:', userData);
        setUserData(userData);
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting user data from Firestore:', error);
    }
  };
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching user data...');
    getUserDataFromFirestore()
      .then((data) => {
        if (data) {
          console.log('User Data:', data);
          console.log('User Name:', data.name);
          console.log('Profile Image:', data.profileImage);
          setUserData(data);
        } else {
          console.log('No user data found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data from Firestore:', error);
        setLoading(false);
      });
  }, []);
  
  const handleHirePress = () => {
    console.log('hire button pressed');
    setModalVisible(true);
  };

  const handleConfirmHire = () => {
    setModalVisible(false);
    // Handle the hiring action with arrivalTime and location here
  };

  const handleCancelHire = () => {
    setModalVisible(false);
    // Handle the cancellation action here
  };

   // Function to toggle notifications
   const toggleNotifications = async () => {
    try {
      // Assuming 'database' is your Firestore instance
      const userRef = doc(database, 'users', userUid); // Reference the user's document by UID
  
      // Update the 'notificationEnabled' field in Firestore
      await updateDoc(userRef, {
        notificationEnabled: !notificationEnabled, // Toggle the value in the database
      });
  
      // Update the state to reflect the change locally
      setNotificationEnabled(!notificationEnabled);
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  };

  // Function to handle account preferences
  const handleAccountPreference = () => {
    // Your logic to manage account preferences here
    // Navigate to account preferences or perform specific actions
  };

  const renderItem = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionContent}>{item.content}</Text>
      <Text style={styles.sectionTitle}>{item.subTitle}</Text>
      <Text style={styles.sectionDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.headerText}>Settings</Text>
      </TouchableOpacity>
      <View style={styles.section}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: userData.profileImage }} // Replace with the user's profile image URI
          style={styles.profileImage}
          resizeMode="cover" // Adjust the resizeMode as needed
        />
      </View>
        <Text style={styles.heading}>User</Text>
        <Text style={styles.profileName}>{userData.name || 'No Name'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}> My Qualifications</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Qualifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Preferences</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Edit your name</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Name</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Developer</Text>
        <Text>Ricklane Maitin</Text>
        <Text>
          I am a full stack developer with a passion for creating engaging web & mobile applications and backend systems.
          contact me at maitinricklane@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Adjust the border radius to make it circular
  },
});

export default ProfileScreen;

