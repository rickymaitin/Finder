import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity, // Make sure TouchableOpacity is imported
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  RefreshControl,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { auth, database } from '../config/firebase';


const UserListScreen = ({ route }) => {
  const {user} = route.params;
  const selectedCategory = route.params?.category;
  const navigation = useNavigation();
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const [searchText, setSearchText] = useState('');
  const profileImageUri = user?.profileImage || 'default_profile_image_uri';
  const [sortedBy, setSortedBy] = useState('name'); // Default sorting by name
  const [showOnline, setShowOnline] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [userGroupsModalVisible, setUserGroupsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStatus, setUserStatus] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [userData, setUserData] = useState({
    name: 'loading...',
    profileImage: 'default_profile_image_uri',
  });
  const userUID = auth.currentUser?.uid; // Retrieve logged-in user's UID
  const usersCollectionRef = collection(database,'users');
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'users'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const updatedImageData = change.doc.data().profileImage;
  
          // Example: Handle status updates
          const updatedStatus = updatedUserData.status;
          // Update UI or perform actions based on the updated status
  
          // Example: Handle name updates
          const updatedName = updatedUserData.name;
          // Update UI or perform actions based on the updated name
  
          // Similarly, handle other fields as needed
  
          // Update your app's state or trigger a re-render with the new user data
          // This can involve setting state variables that control the UI
          // Example: 
          // setUserData(updatedUserData);
        }
      });
    });
  
    return () => {
      unsubscribe(); // Cleanup function: unsubscribe from the listener when unmounting the component
    };
  }, []);
  


  useEffect(() => {
    const updateContainerWidth = () => {
      setContainerWidth(Dimensions.get('window').width);
    };
  
    Dimensions.addEventListener('change', updateContainerWidth);
  
    return () => {
      // Cleanup function for removing event listener
      // React Native might handle the cleanup internally
      setContainerWidth(Dimensions.get('window').width);
    };
  }, []);
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(database, 'users'), where('category', '==', selectedCategory));
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== userUID) { // Exclude the logged-in user's profile
            users.push(doc.data());
          }
        });

        setUserData(users);
        console.log('Users in the selected category:', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (userUID) {
      fetchUsers();
    }
  }, [selectedCategory, userUID]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulated API call to refresh the user list
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleUserPress = (user) => {
    console.log('User pressed:', user); // Check if the user object is correctly passed
  
    // Log the navigation object to ensure it exists and contains the navigate function
    console.log('Navigation:', navigation);
  
    setSelectedUser(user);
    setUserStatus(user.status);
  
    // Try accessing the navigate function directly to see if it's available
    if (navigation && navigation.navigate) {
      console.log('Navigating to UserProfileScreen...');
      navigation.navigate('UserProfileScreen', { user });
    } else {
      console.error('Navigation object or navigate function does not exist.');
    }
  };
  const handleStatusUpdate = () => {
    // Update user's status
    // Simulated API call
    const updatedUserData = userData.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, status: userStatus };
      }
      return user;
    });
    setUserData(updatedUserData);
    setUserStatus('');
    setSelectedUser(null);
    setUserGroupsModalVisible(false);
  };
  const handleNavigationToProfile = (user) => {
    // Access the navigation object and navigate to UserProfileScreen
    if (navigation && navigation.navigate) {
      console.log('Navigating to UserProfileScreen...');
      navigation.navigate('UserProfileScreen', { user });
    } else {
      console.error('Navigation object or navigate function does not exist.');
    }
  };
  

  const handleBlockUser = (user) => {
    // Add or remove the user from the blocked list
    const isBlocked = blockedUsers.some((blockedUser) => blockedUser.id === user.id);
    if (isBlocked) {
      const updatedBlockedUsers = blockedUsers.filter((blockedUser) => blockedUser.id !== user.id);
      setBlockedUsers(updatedBlockedUsers);
    } else {
      setBlockedUsers([...blockedUsers, user]);
    }
  };
 

  const handleBack =() => {
    navigation.goBack();
  };
  


  const renderItem = ({ item, index }) => {
    if (item.id === userUID) {
      return null; // Skip rendering the logged-in user's profile
    }

    const isMatch =
    (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.status && item.status.toLowerCase().includes(searchText.toLowerCase()));

    const shouldDisplay = !showOnline || (showOnline && item.online);

    if (isMatch && shouldDisplay) {
      console.log('Profile Image URI:', item.profileImage);
      return (
        <TouchableOpacity key={`item-${index}`} style={styles.cardContainer}>
          <View key={`${item.id}-view`} style={styles.card}>
            <View key={`${item.id}-avatar`} style={styles.avatarContainer}>
              {item.profileImage ? (
               <Image
               key={`${item.id}-profileImage`}
               source={{ uri: item.profileImage || 'default_image_URI' }}
               style={styles.avatar}
               onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
             />
             
              ) : (
                <View key={`${item.id}-placeholder`} style={styles.avatarPlaceholder} />
              )}
              {item.online && <View key={`${item.id}-indicator`} style={styles.presenceIndicator} />}
            </View>
            <View key={`${item.id}-details`} style={styles.detailsContainer}>
              <Text key={`${item.id}-name`} style={styles.name}>{item.name}</Text>
              <Text key={`${item.id}-status`} style={styles.status}>{item.status}</Text>
            </View>
            <TouchableOpacity
              key={`${item.id}-profile-button`}
              style={[styles.viewProfileButton, styles.button]}
              onPress={() => handleNavigationToProfile(item)}
            >
              <Text style={styles.viewProfileButtonText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={`${item.id}-block-button`}
              style={[styles.blockButton, styles.button]}
              onPress={() => handleBlockUser(item)}
            >
              <Text style={styles.blockButtonText}>
                {blockedUsers.some((blockedUser) => blockedUser.id === item.id) ? 'Unblock' : 'Block'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  
    return null;
  };




  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
       
        <Text style={styles.headerText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or status"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={styles.filterContainer}>
      <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      alignItems: 'center',
      paddingHorizontal: 16, // Adjust padding as needed
    }}
  >
    <View style={styles.sortFilterContainer}>
      <TouchableOpacity
        style={[styles.sortFilterButton, sortedBy === 'name' && styles.activeSortFilter]}
        onPress={() => setSortedBy('name')}
      >
        <Text style={styles.sortFilterButtonText}>Sort by Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sortFilterButton, sortedBy === 'status' && styles.activeSortFilter]}
        onPress={() => setSortedBy('status')}
      >
        <Text style={styles.sortFilterButtonText}>Sort by Status</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.showOnlineContainer}>
      <TouchableOpacity
        style={[
          styles.sortFilterButton,
          showOnline && styles.activeSortFilter,
          styles.showOnlineButton,
        ]}
        onPress={() => setShowOnline(!showOnline)}
      >
        <Text style={styles.sortFilterButtonText}>Show Online</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>
      <FlatList
        data={userData} // Use the Firestore user data
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          if (item && item.id !== undefined && item.id !== null) {
            return item.id.toString();
          }
          // If item.id is undefined or null, return a unique key using the item's index
          return `item-${index}`;
        }}
        contentContainerStyle={styles.listContentContainer}
        onLayout={(event) => {
          setContainerWidth(event.nativeEvent.layout.width);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={userGroupsModalVisible}
        onRequestClose={() => {
          setUserGroupsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Status</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your status"
              value={userStatus}
              onChangeText={(text) => setUserStatus(text)}
            />
            <Pressable
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setUserGroupsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleStatusUpdate}>
              <Text style={styles.modalButtonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};








const styles = StyleSheet.create({
  // Your existing styles remain the same
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 40, // Add some top padding to separate header from status bar
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
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
  
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20, // Increase border radius for rounded corners
    paddingVertical: 12, // Increase vertical padding for a larger input
    paddingHorizontal: 16, // Adjust horizontal padding as needed
    marginRight: 8, // Reduce right margin for alignment
    marginLeft: 4, // Add left margin for alignment to the left
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20, // Increase padding for better visibility
    backgroundColor: 'transparent', // Set the background to transparent
  },
  sortFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortFilterButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(224, 224, 224, 0.7)',
    marginRight: 12,
    minWidth: 120, // Set a minimum width for buttons to avoid crowding
  },
  activeSortFilter: {
    backgroundColor: '#999',
  },
  sortFilterButtonText: {
    color: 'white',
  },
  showOnlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showOnlineButton: {
    backgroundColor: 'rgba(46, 100, 229, 0.7)', // Adjust the transparency here
  },
  listContentContainer: {
    paddingBottom: 16, // Add some bottom padding to separate the list from the screen edge
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
   
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: '#ff6b6b',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff', // White background
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#ccc', // Sample border color
    borderWidth: 1, // Sample border width
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  presenceIndicator: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  viewProfileButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blockButton: {
    backgroundColor: '#999',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  blockButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4, // Added margin to separate buttons
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom:10,
    fontWeight: 'bold',
    marginTop: 9,

  },

});

export default UserListScreen;
