import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigation';
import BottmTabs from './BottomTabs';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
const Drawer = createDrawerNavigator();
const DrawerTabs = () => {
  const isLoggedIn = true;
  return (
    <Drawer.Navigator
          screenOptions={{headerShown: false}}
          drawerContent={props => <DrawerContainer {...props} />}>
          <Drawer.Screen name="AppNavigator" component={AppNavigator} />
    </Drawer.Navigator>
          );
    }

export default DrawerTabs;