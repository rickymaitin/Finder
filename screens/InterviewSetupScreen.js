import React, { useState,useEffect } from 'react';
import { View, Button, Platform, StyleSheet, Text, TextInput,Animated } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const InterviewSetupScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [agenda, setAgenda] = useState('');
  const [participants, setParticipants] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleConfirm = () => {
    // Perform actions with the selected date, time, and other details
    const confirmationMessage = `Interview confirmed for ${participants} on ${date.toLocaleDateString()} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} located at ${location}. Agenda: ${agenda}`;
    setConfirmation(confirmationMessage);
  };


  useEffect(() => {
    let animationTimeout;
    if (confirmation !== '') {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Set a timeout to keep the confirmation visible for a longer duration
      animationTimeout = setTimeout(() => {
        setConfirmation('');
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 8000); // Adjust this time according to how long you want to display the confirmation
    }

    return () => clearTimeout(animationTimeout);
  }, [confirmation, animatedValue]);

  const animatedStyles = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Interview</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setLocation(text)}
        value={location}
        placeholder="Location"
      />

<TextInput
        style={[styles.input, styles.multilineInput]}
        onChangeText={(text) => setAgenda(text)}
        value={agenda}
        placeholder="Agenda"
        multiline={true}
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setParticipants(text)}
        value={participants}
        placeholder="Participants"
      />

      <View style={styles.dateContainer}>
        <Button
          title="Select Date"
          onPress={() => setShowDatePicker(true)}
          color="#27ae60"
        />
        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <Button
          title="Select Time"
          onPress={() => setShowTimePicker(true)}
          color="#3498db"
        />
        {showTimePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={time}
            mode="time"
            display="clock"
            onChange={onTimeChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Interview"
          onPress={handleConfirm}
          color="#e74c3c"
        />
      </View>

      {confirmation !== '' && (
          <Animated.View style={[styles.resultContainer, animatedStyles]}>
          <Text style={styles.resultText}>{confirmation}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  multilineInput: {
    height: 100,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default InterviewSetupScreen;
