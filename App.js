import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator,AppRegistry } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase'; // Make sure to import auth from your Firebase configuration
import Login from './screens/Login';
import PersonalReg from './screens/PersonalReg';
import Chat from './screens/Chat';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';
import UserListScreen from './screens/UserListScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileView from './screens/EditProfileView';
import ProfileSetupScreen from './screens/ProfileSetupScreen'; 
import UserProfileScreen from './screens/UserProfileScreen';// Import ProfileSetupScreen
import UserDashboard from './screens/UserDashboard';
import HireConfirmationScreen from './screens/HireConfirmationScreen';
import ChatScreen from './screens/ChatScreen';
import InterviewSetupScreen from './screens/InterviewSetupScreen';
import AboutScreen from './screens/AboutScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';







import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { database } from './config/firebase'; // Import the database object








const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='UserListScreen' component={UserListScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='EditProfileView' component={EditProfileView} />
      <Stack.Screen name='ProfileSetupScreen' component={ProfileSetupScreen} />
      <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
      <Stack.Screen name='UserDashboard' component={UserDashboard} />
      <Stack.Screen name='HireConfirmationScreen' component={HireConfirmationScreen} />
      <Stack.Screen name= 'ChatScreen' component={ChatScreen} />
      <Stack.Screen name= 'InterviewSetupScreen' component={InterviewSetupScreen}/>
      <Stack.Screen name='AboutScreen' component={AboutScreen}/>
      <Stack.Screen name ='HelpSupportScreen'component={HelpSupportScreen}/>

    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='PersonalReg' component={PersonalReg} />
    </Stack.Navigator>
  );
}

async function userHasCompletedProfile(user) {
  if (!user) {
    console.log('User is not authenticated');
    return false; // User is not authenticated, so setup is not complete
  }

  try {
    console.log('fetching user data...');
    // Fetch the user's profile data from Firestore
    const userRef = doc(database, 'users', user.uid);
    console.log('userRef:', userRef);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Check if the user's profile data indicates a completed setup
      const userData = userDoc.data();
      console.log('Received user data:', userData);
      if (userData && userData.profileSetupComplete === true) {
        console.log('Profile setup is complete');
        return true;
      } else {
        console.log('Profile setup is not complete');
        return false;
      }
    } else {
      console.log('user document does not exist');
      return false; // User document does not exist, setup is not complete
    }
  } catch (error) {
    console.error('Error checking profile setup:', error);
    return false; // Error occurred, setup is not complete
  }
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        console.log('Authenticated User:', authenticatedUser); // Debugging line
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      },
      (error) => {
        console.error('Authentication Error:', error);
        // Handle the error, e.g., show an error message to the user
        setIsLoading(false);
      }
    );

    // Unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        userHasCompletedProfile(user) ? (
          <>
            <ChatStack />
           
          </>
        ) : (
          <ProfileSetupStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

// Profile Setup Stack
function ProfileSetupStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProfileSetupScreen' component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
AppRegistry.registerComponent("App",() => FINDER);