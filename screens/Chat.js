import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat({ otherUserId }) {
  const [messages, setMessages] = useState([]);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (!userId || !otherUserId) return;

    const chatRoomId = [userId, otherUserId].sort().join('_');
    const chatRef = collection(database, 'chats');
    const q = query(
      chatRef,
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const retrievedMessages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.chatRoomId === chatRoomId) {
          retrievedMessages.push({
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
            },
          });
        }
      });
      setMessages(retrievedMessages.reverse());
    });

    return unsubscribe;
  }, [userId, otherUserId]);

  const sendMessage = async (newMessages = []) => {
    const chatRoomId = [userId, otherUserId].sort().join('_');

    const message = newMessages[0];
    const { text, createdAt, user } = message;

    try {
      await addDoc(collection(database, 'chats'), {
        text,
        createdAt,
        user,
        chatRoomId,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!otherUserId) {
    return null; // If otherUserId is not set, don't render the chat interface
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessage(newMessages)}
      user={{
        _id: userId,
      }}
    />
  );
};
