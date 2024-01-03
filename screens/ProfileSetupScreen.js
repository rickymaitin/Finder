import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc,addDoc,collection } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import {auth, database } from '../config/firebase';

const ProfileSetupScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params?.user;

  const [currentStep, setCurrentStep] = useState(1);


  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [education, setEducation] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');
  const [minPay, setMinPay] = useState('');

  const moveToNextStep = () => {
    // Logic to move to the next step (updating state, etc.)
    setCurrentStep(currentStep + 1);
  };

  const[ categories, setCategories] = useState([
    'Plumbing',
    'Electrician',
    'Carpenter',
    'Painter',
    'Helper',
    'Car Wash',
    'Hair Booking',
    'House Cleaning',
    'Car Detailing',
    'Gardening',
    'Moving',
    'Photography',
    'Web Development',
    'Pet Care',
    'Hair and Barber',
    'Message Therapy',
    'Nail Services',
    'Personal Trainer',
    'Event Planner',
    'Tutor',
    'Music Lessons',
    'Repair Man',
    'Technician',
    
    'Catering',
    'Party Hire',


  ]);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!user) {
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [navigation, user]);

  const [name, setName] = useState('');
  const [profileImageUri, setProfileImageUri] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (route.params?.category) {
      const categoryToFilter = route.params.category;
      setSelectedCategory(categoryToFilter);
    }
  }, [route.params?.category]);

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    toggleCategoryModal();
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setProfileImageUri(selectedAsset.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleProfileSetup = async () => {
    try {
      if (user) {
        const userUid = user.uid;
        const userRef = doc(database, 'users', userUid);

        await updateDoc(userRef, {
          name,
          profileImage: profileImageUri || 'default_profile_image_uri',
          category: selectedCategory,
          location,
        bio,
        skills,
        socialMedia,
        portfolio,
        education,
        availability,
        languages,
        minPay,
        email,
        phoneNumber,
        profileSetupComplete: true,
        });
        console.log('Profile setup complete:', userRef.id);

        navigation.navigate('ProfileScreen', 'UserListScreen', {
          user: {
            uid: user.uid,
            name,
            profileImage: profileImageUri || 'default_profile_image_uri',
            category: selectedCategory,
            location,
        bio,
        skills,
        socialMedia,
        portfolio,
        education,
        availability,
        languages,
        minPay,
        email,
        phoneNumber,
          },
        });
      } else {
        console.log('User is null');
      }
    } catch (error) {
      console.error('Error setting up user profile:', error);
    }
  };
  // Inside your code where you're handling profile setup
const testProfileSetupComplete = async () => {
  try {
    if (user) {
      const userUid = user.uid;
      const userRef = doc(database, 'users', userUid);

      await updateDoc(userRef, {
        profileSetupComplete: true, // Update only the profileSetupComplete field
      });

      console.log('Profile setup complete:', userRef.id); // Log to confirm the update

      // Check if the document reflects the change in Firestore console or logs
    } else {
      console.log('User is null');
    }
  } catch (error) {
    console.error('Error updating profileSetupComplete:', error);
  }
};

// Call this function separately, perhaps triggered by a button press or an isolated test scenario


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.inputLabel}>Location</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter your location here"
    value={location}
    onChangeText={(text) => setLocation(text)}
  />

  <Text style={styles.inputLabel}>Bio/Description</Text>
  <TextInput
    style={styles.input}
    placeholder="Write a brief bio or description"
    value={bio}
    onChangeText={(text) => setBio(text)}
    multiline={true} // Allow multiline input for a description
    numberOfLines={4} // Adjust the number of visible lines
  />
  

  <Text style={styles.inputLabel}>Skills/Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Please dont be shy to write all your skills and experties down"
        value={skills}
        onChangeText={(text) => setSkills(text)}
      />
      <Text style={styles.inputLabel}>Social Media</Text>
        <TextInput
        style={styles.input}
        placeholder="place links to your social media pages"
        value={socialMedia}
        onChangeText={(text) => setSocialMedia(text)}
      />
      <Text style={styles.inputLabel}>Education</Text>

      <TextInput
        style={styles.input}
        placeholder="All Education e.g degree in advertising"
        value={education}
        onChangeText={(text) => setEducation(text)}
      />
      <Text style={styles.inputLabel}>Working Hours</Text>

      <TextInput
        style={styles.input}
        placeholder="Let others know which Hours you work within"
        value={availability}
        onChangeText={(text) => setAvailability(text)}
      />
      <Text style={styles.inputLabel}>Languages</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g English"
        value={languages}
        onChangeText={(text) => setLanguages(text)}
      />
      <Text style={styles.inputLabel}>Set call out fee</Text>
      
<TextInput
  style={styles.input}
  placeholder="E.g R50"
  value={minPay}
  onChangeText={(text) => setMinPay(text)}
/>
<Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address" // Set keyboard type to email address
          />
          
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad" // Set keyboard type to phone number
          />

      </View>
     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <TouchableOpacity style={styles.categorySelector} onPress={toggleCategoryModal}>
          <Text style={styles.categorySelectorText}>
            {selectedCategory ? selectedCategory : 'Select Category'}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCategoryModalVisible}
          onRequestClose={toggleCategoryModal}
        >
           <ScrollView style={styles.categoryModal} contentContainerStyle={styles.modalContent}>
          <View style={{ flex: 1 }}>
          {categories.map((category, index) => (
        <TouchableOpacity
        key={`${category}_${index}`}
          style={styles.categoryOption}
          onPress={() => selectCategory(category)}
        >
          <Text style={styles.categoryOptionText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Image</Text>
        <TouchableOpacity style={styles.profileImageContainer} onPress={openImagePicker}>
          <Image
            source={{ uri: profileImageUri || 'default_profile_image_uri' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      </View>

      <TouchableOpacity style={styles.setupButton} onPress={handleProfileSetup}>
        <Text style={styles.setupButtonText}>Complete Setup</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020', // Light background color for the screen
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    minHeight: 30,
    paddingVertical: 10,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categorySelector: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
  },
  categorySelectorText: {
    fontSize: 18,
  },
  categoryModal: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '50%',
    borderTopLeftRadius: 20, // Apply border radius to top corners
    borderTopRightRadius: 20,
    overflow: 'hidden', // Hide overflowing content
    
    

  },
  categoryOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  categoryOptionText: {
    fontSize: 18,
    color: '#333',
  },
  profileImageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'black',
  },
  nameInput: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
  },
  setupButton: {
    marginTop: 40,
    backgroundColor: '#f57c00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  setupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#EAEAEA', // Light gray for input backgrounds
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#333',
  },
  inputLabel: {
    marginBottom: 5,
    color: '#666', // Color for the label text
    fontSize: 16,
  },
});

export default ProfileSetupScreen;
