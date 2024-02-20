import React, { useState } from 'react';
import { View, Text,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import { useNavigation } from '@react-navigation/native';

const DrawerContainer =()=> {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [username, setusername] = useState('');
  
  const intervalFun =()=>{
    setInterval(() => {loginCheck()}, 1000);
  }  
  
const goto=(s)=>{
    if(s=='Home'){
      AsyncStorage.clear();
      global.user='';
      navigation.navigate(s);
      // navigation.closeDrawer();
    }else{
      navigation.navigate(s);
    }
  }

const loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      var data=JSON.parse(userToken);
      if(data != null){
        setData(data);
        //this.props.navigation.navigate('Home');
      }else{
        //this.props.navigation.navigate('Landing');
    }
  };

 const setData=(data)=>{ //console.warn(data); 
     var user_id=data.uid;
     fetch(global.api_url+'user/get_profile?id='+user_id,{
        method:"GET"
      })
        .then((response) => response.json())
        .then((responseJson) => {//console.warn(responseJson.data[0].profile);
          setdata(responseJson.data[0]);
        })
       .catch((error) => {
          console.error(error);
       });
  }

    return (
      <View style={styles.content}>
        <View style={styles.header}>
          <Image style={styles.img} source={{uri:data.profile ? global.media_url+data.profile : 'https://cdn-icons-png.freepik.com/256/3237/3237472.png'}} />
          <Text style={styles.txt}>{data.username ? data.username : 'User Name'}</Text>
          <Text style={styles.txts}>{data.email ? data.email : 'mail here'}</Text>
        </View>

        <View style={styles.container}>
          <MenuButton
            title="Home"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              goto('Home');
              navigation.navigate('Home')
            }}
          />
          <MenuButton
            title="Photo Album"
            source={require('../../../assets/icons/album3.png')}
            onPress={() => {
              goto('PhotoAlbum')
            }}
          />
          <MenuButton
            title="Community"
            source={require('../../../assets/icons/community.png')}
            onPress={() => {
              goto('Community')
            }}
          />
          <MenuButton
            title="Blogs"
            source={require('../../../assets/icons/articles.png')}
            onPress={() => {
              goto('Article')
            }}
          />

          <MenuButton
            title="Notifications"
            source={require('../../../assets/icons/notifications.png')}
            onPress={() => {
              goto('Notifications')
            }}
          />
          <MenuButton
            title="Settings"
            source={require('../../../assets/icons/settings.png')}
            onPress={() => {
              goto('Settings')
            }}
          />
         
          <MenuButton
            title="Clinic Schedule"
            source={require('../../../assets/icons/schedule.png')}
            onPress={() => {
              goto('Calendar')
            }}
          />
          <MenuButton
            title="Contact Us"
            source={require('../../../assets/icons/contact.png')}
            onPress={() => {
              goto('Contact')
            }}
          />
          <MenuButton
            title="Logout"
            source={require('../../../assets/icons/logout.png')}
            onPress={() => {
              goto('Landing');
              }}
          />
        </View>
      </View>
    );
}

export default DrawerContainer;

// DrawerContainer.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired
//   })
// };
