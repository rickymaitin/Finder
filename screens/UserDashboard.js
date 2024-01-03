import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDashboard = () => {
  // Mock data for user's history of successful hires
  const [successfulHires, setSuccessfulHires] = useState([
    {
      id: 1,
      hirer: 'John Doe',
      amount: 100,
      date: '2023-11-10',
      service: 'Plumbing',
    },
    {
      id: 2,
      hirer: 'Jane Smith',
      amount: 150,
      date: '2023-11-15',
      service: 'Electrician',
    },
    // Add more successful hire data
  ]);

  // Mock data for upcoming jobs
  const [upcomingJobs, setUpcomingJobs] = useState([
    {
      id: 1,
      location: '123 Main St, Cityville',
      title: 'Plumbing Repairs',
    },
    {
      id: 2,
      location: '456 Elm St, Townsville',
      title: 'Electrical Installation',
    },
    // Add more upcoming job data
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Dashboard</Text>
        <Text style={styles.historyTitle}>Successful Hires:</Text>
        {successfulHires.map((hire) => (
          <View key={hire.id} style={styles.successfulHire}>
            <Text style={styles.hireDate}>Date: {hire.date}</Text>
            <Text style={styles.hirerName}>Hirer: {hire.hirer}</Text>
            <Text style={styles.hireService}>Service: {hire.service}</Text>
            <Text style={styles.hireAmount}>Amount: R{hire.amount}</Text>
          </View>
        ))}
        <Text style={styles.upcomingJobsTitle}>Upcoming Jobs:</Text>
        {upcomingJobs.map((job) => (
          <View key={job.id} style={styles.upcomingJob}>
            <Text style={styles.jobLocation}>Location: {job.location}</Text>
            <Text style={styles.jobTitle}>Job Title: {job.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '90%',
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  successfulHire: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  hireDate: {
    fontSize: 16,
  },
  hirerName: {
    fontSize: 16,
  },
  hireService: {
    fontSize: 16,
  },
  hireAmount: {
    fontSize: 16,
  },
  upcomingJobsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  upcomingJob: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  jobLocation: {
    fontSize: 16,
  },
  jobTitle: {
    fontSize: 16,
  },
});

export default UserDashboard;
