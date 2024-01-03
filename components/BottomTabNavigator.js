import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import UserDashboard from '../screens/UserDashboard';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UserDashboard" component={UserDashboard} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
