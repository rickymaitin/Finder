import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import colors from "../colors";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import Drawer from '../components/Drawer';

// Import your images here
import hair from "../assets/hair.png";
import plumber from "../assets/plumber.png";
import cleaner from "../assets/cleaner.png";
import painter from "../assets/painter.png";
import arrands from "../assets/arrands.webp";
import carr from "../assets/carr.png";
import internet from "../assets/internet.png";
import sent from "../assets/sent.png";
import gardening from "../assets/gardening.png";
import profileImage from "../assets/profileImage.jpg";
import camera from "../assets/camera.png";
import carservice from "../assets/carservice.png";
import coding from "../assets/coding.png";
import gardener from "../assets/gardener.png";
import movingtruck from "../assets/movingtruck.png";
import oosouji from "../assets/oosouji.png"; 
import paintroller from "../assets/paintroller.png";
import play from "../assets/play.png";
import technician from "../assets/technician.png";
import massage from "../assets/massage.png";
import dog from "../assets/dog.png";
import nailpolish from "../assets/nailpolish.png";
import hairdresser from "../assets/hairdresser.png";
import dumbbell from "../assets/dumbbell.png";
import planner from "../assets/planner.png";
import tutor from "../assets/tutor.png";
import mirrorball from "../assets/mirrorball.png";
import catering from "../assets/catering.png";
import carpenter from "../assets/carpenter.png";

// Define your Drawer component




const cardSize = 80; // Updated card size
const cardGap = 10; // Gap size between the cards

const Home = () => {
  const [userData, setUserData] = useState({
    name: 'Loading...',
    profileImage: 'default_profile_image_uri',
    // Add other initial values as needed
  });

  useEffect(() => {
    const getUserDataFromFirestore = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('User is not authenticated');
          return;
        }
        const userUid = user.uid;
        console.log('User UID:', userUid);
        const userRef = doc(database, 'users', userUid);
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

    getUserDataFromFirestore();
  }, []);
  
  const servicesWelcome = [
    { id: 1, title: "Helper", image: cleaner },
    { id: 2, title: "Car Wash", image: carr },
    { id: 3, title: "Plumbing", image: plumber },
    { id: 4, title: "Hair Booking", image: hair },
  ];

  const servicesHome = [
    { id: 5, title: "House Cleaning", image: oosouji },
    { id: 6, title: "Painter", image: paintroller },
    { id: 7, title: "Handyman", image: plumber },
    { id: 8, title: "Car Detailing", image: carservice },
    { id: 9, title: "Gardening", image: gardener },
    { id: 10, title: "Moving", image: movingtruck },
  ];

  const servicesOnTheGo = [
    { id: 11, title: "Photography", image: camera },
    { id: 12, title: "Web Development", image: coding },
  ];

  const personalcare = [
    { id: 15, title: "Pet Care", image: dog },
    { id: 16, title: "Hair and Barber", image: hairdresser },
    { id: 17, title: "Massage Therapy", image: massage },
    { id: 18, title: "Nail Services", image: nailpolish },
    { id: 19, title: "Personal Trainer", image: dumbbell },
    { id: 20, title: "Event Planner", image: planner },
  ];

  const educationandacademices = [
    { id: 21, title: "Tutor", image: tutor },
    { id: 13, title: "Music Lessons", image: play },
  ];

  const Businessandpro = [
    { id: 22, title: "Repair Man", image: technician },
    { id: 14, title: "Technician", image: technician },
    { id: 23, title: "Carptener", image: carpenter },
    { id: 24, title: "Catering", image: catering },
    { id: 25, title: "Party Hire", image: mirrorball },
  ];

  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  const handleServiceClick = (service) => {
    navigation.navigate("UserListScreen", { serviceTitle: service.title, category: service.title });
  };

  const handleLogout = () => {
    signOut(auth) // Call the signOut function
      .then(() => {
        // You can navigate to the login or authentication screen after logging out
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleNavigate = (screenName) => {
    if (screenName === "ChatScreen") {
      navigation.navigate(screenName); // Navigate to "ChatScreen"
    }
    setIsMenuOpen(false); // Close the menu after navigation
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuButtonText}>==</Text>
      </TouchableOpacity>
      
        <Text style={styles.areaText}>Finder</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      

      {/* Welcome Section */}
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Discover Our Services:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {servicesWelcome.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Home Section */}
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionHeading}>Home Service:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {servicesHome.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* School Section */}
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionHeading}>Creative and Digital Service:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {servicesOnTheGo.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add more card sections here, as needed */}
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionHeading}>Personal Care and Wellness:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {personalcare.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionHeading}>Education and Academics:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {educationandacademices.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.sectionHeading}>Business and Professional Services:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardSize + cardGap}
          decelerationRate="fast"
          scrollEventThrottle={16}
        >
          {Businessandpro.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServiceClick(service)}
            >
              <View style={styles.serviceCard}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Drawer
        navigation={navigation}
        handleNavigate={handleNavigate}
        drawerOpen={drawerOpen}
        onClose={closeDrawer}
      />


    
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 27,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  areaText: {
    fontFamily: 'Roboto',
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profile:{
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headingContainer: {
    alignItems: "flex-start", // Align to the left
    paddingVertical: 16,
    marginLeft: 16, // Add left margin
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray, // Change to your preferred color
    marginBottom: 4, // Add some spacing between headings
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  serviceCard: {
    width: cardSize,
    height: cardSize,
    borderRadius: 8,
    marginRight: cardGap,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderColor:"#000"
  },
  serviceImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 12,
    textAlign: "center",
  },

  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 120,
    marginBottom: 50,
  },
  

  logoutButton: {
    padding: 8,
  },
});

export default Home;
 


