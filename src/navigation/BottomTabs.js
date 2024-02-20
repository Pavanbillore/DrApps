import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfilePictureScreen from '../screens/ProfilePicture/ProfilePictureScreen';
import LandingScreen from '../screens/Landing/LandingScreen';
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen';
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen';
import PasswordScreen from '../screens/Password/PasswordScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import GenderScreen from '../screens/Gender/GenderScreen';
import InterestsScreen from '../screens/Interests/InterestsScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
const Tab = createMaterialBottomTabNavigator();

const  BottmTabs = () => {
  return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerMode: 'none',
            navigationOptions: {
            headerVisible: false
            }
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ProfilePicture" component={ProfilePictureScreen} />
        <Tab.Screen name="Email" component={EmailAdressScreen} />
        <Tab.Screen name="FingerPrint" component={FingerPrintScreen} />
        <Tab.Screen name="Password" component={PasswordScreen} />
        <Tab.Screen name="Help" component={HelpScreen} />
        <Tab.Screen name="Gender" component={GenderScreen} />
        <Tab.Screen name="Interests" component={InterestsScreen} />
        <Tab.Screen name="SignIn" component={SignInScreen} />
        </Tab.Navigator>
  );
}
export default BottmTabs;