import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';




const HireConfirmationScreen = ({ route }) => {
  const { otherUser } = route.params;
  const [chosenDate, setChosenDate] = useState('');
  const [chosenTime, setChosenTime] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [acceptanceConfirmed, setAcceptanceConfirmed] = useState(false);



  const handleConfirmHire = () => {
    // Assuming job details are available in your component state
    
  };



  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePill}>
          <Image source={{ uri: otherUser.profileImage }} style={styles.profileImage} />
          <Text style={styles.userName}>{otherUser.name}</Text>
        </View>
      </View>

      {/* Additional Inputs */}
      <View style={styles.inputContainer}>
        {/* Service Details */}
        <Text style={styles.label}>Service Details:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type of service requested"
          value={serviceDetails}
          onChangeText={(text) => setServiceDetails(text)}
        />

        {/* Location */}
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Address or specific instructions"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        {/* Duration */}
        <Text style={styles.label}>Duration:</Text>
        <TextInput
          style={styles.input}
          placeholder="Estimated duration or start/end time"
          value={duration}
          onChangeText={(text) => setDuration(text)}
        />

        {/* Service Description */}
        <Text style={styles.label}>Service Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Additional details or instructions"
          value={serviceDescription}
          onChangeText={(text) => setServiceDescription(text)}
          multiline={true}
          numberOfLines={4}
        />

        {/* Acceptance Confirmation */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmHire}
        >
          <Text style={styles.confirmButtonText}>
            {acceptanceConfirmed ? 'Confirmed ✓' : 'Confirm Hire'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  profilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: '#f57c00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  confirmButtonConfirmed: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HireConfirmationScreen;
