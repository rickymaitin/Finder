import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableHighlight,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendPushNotification } from '../services/notificationService'; // Import your notification service
import { doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';


const UserProfileScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  console.log('User Profile Image URI:', user.profileImage);
  

  const handleInterviewPress = () => {
    setModalVisible(true);
  };

  const handleModalOption = (option) => {
    if (option === 'Set up Interview') {
      // Assuming you have a separate InterviewSetupScreen where users select details
      navigation.navigate('InterviewSetupScreen', { otherUser: user });
      setModalVisible(false); // Close the modal after navigation
    } else if (option === 'Phone Call') {
      // Handle phone call setup logic here
      // For example: initiate a phone call function or navigate to a phone call setup screen
      setModalVisible(false); // Close the modal for phone call option } else if (option === 'Phone Call') {
        // Check if the user's phone number is available
        if (user.phoneNumber) {
          const phoneNumber = user.phoneNumber;
          const phoneLink = `tel:${phoneNumber}`;
          
          // Use Linking.openURL with the phoneLink to open the phone app
          Linking.openURL(phoneLink)
            .catch((error) => console.error('Error opening phone app:', error));
        } else {
          console.log('No phone number available');
        }
      } else if (option === 'Email') {
        // Check if the user's email is available
        if (user.email) {
          const emailAddress = user.email;
          const emailLink = `mailto:${emailAddress}`;
          
          // Use Linking.openURL with the emailLink to open the email app
          Linking.openURL(emailLink)
            .catch((error) => console.error('Error opening email app:', error));
        } else {
          console.log('No email address available');
        }
        setModalVisible(false); // Close the modal for email option
    } else {
      // Handle other options as needed
      console.log('Selected Option:', option);
      setModalVisible(false); // Close the modal for other options
    }
  };
  

  const handleHirePress = async () => {
    const notificationToken = user.notificationToken; // Replace with the actual token from the other user

    if (notificationToken) {
      try {
        await sendPushNotification(notificationToken, 'You received a hire request!');
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }

    navigation.navigate('HireConfirmationScreen', { otherUser: user, isUserHiring: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileBio}>{user.bio}</Text>

          {/* Location */}
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailText}>{user.location}</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Contact Information:</Text>
            <Text style={styles.detailText}>email :{user.email}</Text>
            <Text style={styles.detailText}>contact number:{user.phoneNumber}</Text>
          </View>

          {/* Job Details */}
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Specialty:</Text>
            <Text style={styles.detailText}>Specialty: Plumbing</Text>
            <Text style={styles.detailText}>Experience: {user.skills}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleHirePress}>
              <Text style={styles.buttonText}>Hire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleInterviewPress}>
              <Text style={styles.buttonText}>Interview</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableHighlight
                    style={{ ...styles.optionButton, backgroundColor: '#27ae60' }}
                    onPress={() => handleModalOption('Set up Interview')}
                  >
                    <Text style={styles.optionText}>Set up Interview</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.optionButton, backgroundColor: '#3498db' }}
                    onPress={() => handleModalOption('Phone Call')}
                  >
                    <Text style={styles.optionText}>Phone Call</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.optionButton, backgroundColor: '#e74c3c' }}
                    onPress={() => handleModalOption('Email')}
                  >
                    <Text style={styles.optionText}>Email</Text>
                  </TouchableHighlight>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Change the background color as per your preference
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#27ae60',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  profileBio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  detailContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  button: {
    borderColor: '#27ae60',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: '#27ae60',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  optionButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  cancelText: {
    marginTop: 15,
    fontSize: 16,
    color: '#27ae60',
  },
});

export default UserProfileScreen;
