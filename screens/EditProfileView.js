import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc,updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditProfileView = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params?.user;
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(''); // Use profileImage consistently
  const [focusedInput, setFocusedInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');

 

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setProfileImage(user.profileImage || null); // Use profileImage consistently
      setBio(user.bio || ''); // Set initial value for bio
      setSkills(user.skills || ''); // Use profileImage consistently
    }
    setLoading(false);
  }, [user]);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('selected Image:', result.assets[0].uri);
        setProfileImage(result.assets[0].uri); // Use profileImage consistently
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        console.error('User not authenticated.');
        return;
      }
  
      const profileRef = doc(database, 'users', user.uid);
  
      const updatedProfile = {
        name,
        profileImage,
        bio,
        skills,
        education,
        availability,
        languages,
      };
  
      // Clean up undefined or empty fields
      Object.keys(updatedProfile).forEach((key) => {
        if (updatedProfile[key] === undefined || updatedProfile[key] === '') {
          delete updatedProfile[key];
        }
      });
  
      console.log('Updated Profile:', updatedProfile);
  
      await setDoc(profileRef, updatedProfile, { merge: true });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  
  
  
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: profileImage || 'default_profile_image_uri' }}
        />
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={handleImagePicker}
        >
          <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'name' && styles.focusedInput,
          ]}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput('')}
        />
        {/* Add other fields similar to the 'Name' field */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'bio' && styles.focusedInput,
          ]}
          placeholder="Enter your bio"
          value={bio}
          onChangeText={setBio}
          onFocus={() => setFocusedInput('bio')}
          onBlur={() => setFocusedInput('')}
        />
        <Text style={styles.label}>Skills</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'skills' && styles.focusedInput,
          ]}
          placeholder="Enter your skills"
          value={skills}
          onChangeText={setSkills}
          onFocus={() => setFocusedInput('skills')}
          onBlur={() => setFocusedInput('')}
        />
          <Text style={styles.label}>Education</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'education' && styles.focusedInput,
          ]}
          placeholder="Enter your education"
          value={education}
          onChangeText={setEducation}
          onFocus={() => setFocusedInput('education')}
          onBlur={() => setFocusedInput('')}
        />
        <Text style={styles.label}>Availability</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'availability' && styles.focusedInput,
          ]}
          placeholder="Enter your availability"
          value={availability}
          onChangeText={setAvailability}
          onFocus={() => setFocusedInput('availability')}
          onBlur={() => setFocusedInput('')}
        />
        <Text style={styles.label}>Languages</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'languages' && styles.focusedInput,
          ]}
          placeholder="Enter your languages"
          value={languages}
          onChangeText={setLanguages}
          onFocus={() => setFocusedInput('languages')}
          onBlur={() => setFocusedInput('')}
        />
        {/* Add more fields as needed */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  form: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileView;
