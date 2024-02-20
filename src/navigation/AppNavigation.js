/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import BmiGraphScreen from '../screens/BmiGraph/BmiGraphScreen';
import LandingScreen from '../screens/Landing/LandingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PhotoAlbumScreen from '../screens/PhotoAlbum/PhotoAlbumScreen';
import ArticleScreen from '../screens/Article/ArticleScreen';
import WeightGraphScreen from '../screens/WeightGraph/WeightGraphScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen';
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen';
import PasswordScreen from '../screens/Password/PasswordScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import ContactScreen from '../screens/Contact/ContactScreen';
import AboutUsScreen from '../screens/Contact/AboutUsScreen';
import GenderScreen from '../screens/Gender/GenderScreen';
import InterestsScreen from '../screens/Interests/InterestsScreen';
import ProfilePictureScreen from '../screens/ProfilePicture/ProfilePictureScreen';
import WaterScreen from '../screens/Water/WaterScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import AddCommunityScreen from '../screens/Community/AddCommunityScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import CommentScreen from '../screens/Comment/CommentScreen';
import CreatePostScreen from '../screens/CreatePost/CreatePostScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CreateCommentScreen from '../screens/CreateComment/CreateCommentScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreeen';
import GoalAchievedScreen from '../screens/GoalAchieved/GoalAchievedScreen';
import NutritionScreen from '../screens/Nutrition/NutritionScreen';
import StepsScreen from '../screens/Steps/StepsScreen';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import SuccessScreen from '../screens/Success/SuccessScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import BottmTabs from './BottomTabs';
import Menu from 'react-native-vector-icons/AntDesign';
console.disableYellowBox = false;
global.user='';
global.default_user='http://curveinfotech.com/Bank/uploads/default_user.png';
global.api_url = 'https://curveinfotech.com/Bank/mobile_api/';
global.media_url = 'https://curveinfotech.com/Bank/uploads/';
global.appname = '';
global.signupData=[];
global.userData = {};

global.getrighttime = (t) => {
   var time = new Date(t+' UTC');
   var am = time.getHours() > '12' ? 'pm' : 'am';
   var hr = time.getHours() > '12' ? time.getHours()-12 : time.getHours();
   var min = time.getMinutes() > '10' ? time.getMinutes() : '0'+time.getMinutes();
   return (time.getMonth()+1)+'/'+time.getDate()+'/'+time.getFullYear()+' '+hr+':'+min+' '+am;
};
global.getrightdate = (t) => {
   var time = new Date(t+' UTC');
   var am = time.getHours() > '12' ? 'pm' : 'am';
   var hr = time.getHours() > '12' ? time.getHours()-12 : time.getHours();
   var min = time.getMinutes() > '10' ? time.getMinutes() : '0'+time.getMinutes();
   return (time.getMonth()+1)+'/'+time.getDate()+'/'+time.getFullYear();
};
global.getColor = {backgroundColor: "#081349",} ;

const AppNavigator = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Landing">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="AddCommunity" component={AddCommunityScreen} />
      <Stack.Screen name="PhotoAlbum" component={PhotoAlbumScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="BmiGraph" component={BmiGraphScreen} />
      <Stack.Screen name="Water" component={WaterScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="WeightGraph" component={WeightGraphScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="CreateComment" component={CreateCommentScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="GoalAchieved" component={GoalAchievedScreen} />
      <Stack.Screen name="Nutrition" component={NutritionScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Steps" component={StepsScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Email" component={EmailAdressScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="FingerPrint" component={FingerPrintScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
    </Stack.Navigator>

  );
}

export default AppNavigator;
