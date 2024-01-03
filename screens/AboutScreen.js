// AboutScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {/* Your image */}
        <Image source={require('../assets/profileImage.jpg')} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        {/* About the app */}
        <Text style={styles.heading}>About the App</Text>
        <Text style={styles.paragraph}>
          [An app designed to facilitate job hiring and job seeking, it's a platform that connects individuals seeking to hire service providers for various tasks—ranging from babysitting to other freelance opportunities. This versatile platform not only assists in finding reliable services but also offers a fantastic avenue for students or individuals seeking employment opportunities to showcase their skills and earn income.

For Employers:

Hassle-Free Hiring: Simplifies the process of finding and hiring skilled individuals for tasks or services.
Quality Services: Connects users with vetted and skilled individuals, ensuring reliable and efficient services.
Diverse Task Pool: Offers a wide range of services—from babysitting, tutoring, to household chores—catering to diverse needs.
For Job Seekers (Students, Unemployed Individuals):

Flexible Opportunities: Provides a platform for students or those unemployed to find flexible job opportunities based on their skills and availability.
Skill Showcase: Enables individuals to showcase their expertise and talents, allowing them to be discovered by potential employers.
Earn While Studying: Allows students to manage their schedules and earn money, striking a balance between academics and work.
Overall, this app serves as a bridge between those seeking services and those providing them. It not only streamlines the hiring process but also empowers individuals, particularly students or those without full-time employment, to leverage their skills and earn income while contributing to the community.]
        </Text>
        {/* Information about contacting you */}
        <Text style={styles.heading}>Contact Information</Text>
        <Text style={styles.paragraph}>
          If you're interested in building apps like this one or have any inquiries, feel free to contact me at: 
          [Maitinricklane@gmail.com]
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify', // Aligns text both left and right, making it more readable
    color: '#333', // Adjusting text color for better readability
  },
});

export default AboutScreen;
