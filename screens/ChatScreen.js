import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const chatRef = collection(database, 'chats');
    
    // Query chats where the current user is a participant
    const q = query(chatRef, where('participants', 'array-contains', userId));

    const fetchChats = async () => {
      const chatData = [];
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const chat = {
          chatId: doc.id,
          participants: doc.data().participants,
          // Add more chat details as needed
        };
        chatData.push(chat);
      });

      setChats(chatData);
    };

    fetchChats();
  }, []);

  const navigateToChat = (chatId, otherUserId) => {
    // Navigate to the chat screen and pass the chat ID and the other user's ID
    navigation.navigate('Chat', { chatId, otherUserId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chats</Text>
      <ScrollView style={styles.scrollView}>
        {chats.map((chat) => {
          // Extract the ID of the other participant in the chat
          const otherUserId = chat.participants.find(id => id !== auth.currentUser?.uid);
          if (!otherUserId) return null; // Skip if no other user ID found

          // Fetch details of the other participant
          const userRef = database.collection('users').doc(otherUserId);
          userRef.get().then((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              return (
                <TouchableOpacity
                  key={otherUserId}
                  onPress={() => navigateToChat(chat.chatId, otherUserId)}
                  style={styles.userContainer}
                >
                  <Image
                    source={{ uri: userData.profileImage }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.userName}>{userData.name}</Text>
                  {/* Add more user details or icons as needed */}
                </TouchableOpacity>
              );
            }
            return null;
          });
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
  // Add more styles as needed for user details or icons
});

export default ChatScreen;
