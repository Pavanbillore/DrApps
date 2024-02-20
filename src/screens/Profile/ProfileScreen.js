import React,{useState} from 'react';
import {ActivityIndicator, Text, View, TouchableHighlight,TouchableOpacity,TextInput, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const ProfileScreen =()=> {
    const navigation = useNavigation();
    const [loader,setloader] = useState(false);
    const [data,setdata] = useState('');
    const [username,setusername] = useState('');
    const [email,setemail] = useState('');
    const [phone,setphone] = useState('');
    const [address,setaddress] = useState('');
    const [uid,setuid] = useState('');

  // const _loginCheck = async () => {
  //   const userToken = await AsyncStorage.getItem('loginData');
  //     var data=JSON.parse(userToken);
  //     if(data != null){
  //       get_profile(data);
  //     }else{
  //       navigation.navigate('Landing');
  //   }
  // };

  const get_profile = (data) => { 
     var user_id=data.uid;
     fetch(global.api_url+'user/get_profile?id='+user_id,{
        method:"GET"
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setuid(responseJson.data[0].uid);;
          setusername(responseJson.data[0].username);
          setemail(responseJson.data[0].email);
          setphone(responseJson.data[0].phone);
          setaddress(responseJson.data[0].address);
        })
       .catch((error) => {
          console.error(error);
       });
  }

  const update = () => {
      setloader(true);
      var data = new FormData();     
      data.append("uid", uid);
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("address",address);
      
      try {
      fetch(global.api_url+'user/edit_profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },

        body: data,
      })
      .then((response) => response.json())
      .then((responseJson) => {//console.warn(responseJson.data[0].address);
         setloader(false);
          if(responseJson.status == 1){
            setusername(responseJson.data[0].username);
            setemail(responseJson.data[0].email);
            setphone(responseJson.data[0].phone);
            setaddress(responseJson.data[0].address);
            Toast.showWithGravity(
              'Profile Updated Succesffuly..',
              Toast.LONG,
              Toast.BOTTOM,
            );
          }else{
            setloader(false);
            Toast.showWithGravity(
              'Change Something..',
              Toast.LONG,
              Toast.BOTTOM,
            );
         }
       })}
      catch (e) {
        Toast.showWithGravity(
          'Something Went Wrong.',
          Toast.LONG,
          Toast.BOTTOM,
        );
          setloader(false);
      }      
  }  

    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
            <Image
              style={styles.proimg}
              source={{uri:global.user ? global.media_url+global.user : 'https://cdn-icons-png.freepik.com/256/3237/3237472.png'}}
            />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.mainText}> {username} </Text>
          <Text style={styles.secText}>{email}</Text>
        </View>
        
          <View style={styles.TextView}>
            <Text style={styles.helpText}>Name:</Text>
             <TextInput
               value={username}  
               onChangeText={ TextInputValue => setusername(TextInputValue)}
               underlineColorAndroid = "transparent"
               placeholder = "Enter your name"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               style={{color:'#000'}}
               />
          </View>

          <View style={styles.TextView}>
            <Text style={styles.helpText}>Email:</Text>
              <TextInput
               value={email}  
               onChangeText={ TextInputValue => setemail(TextInputValue) }
               underlineColorAndroid = "transparent"
               placeholder = "Enter your email"
               placeholderTextColor = "gray"
               style={{color:'#000'}}
               autoCapitalize = "none"
              />
          </View>
       
          <View style={styles.TextView}>
            <Text style={styles.helpText}>Phone:</Text>
              <TextInput
               value={phone}  
               onChangeText={ TextInputValue => setphone(TextInputValue)}
               underlineColorAndroid = "transparent"
               placeholder = "Enter your phone"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               style={{color:'#000'}}
               />
          </View>
         
          <View style={styles.TextView}>
            <Text style={styles.helpText}>Address:</Text>
               <TextInput
               value={address}  
               onChangeText={ TextInputValue => setaddress(TextInputValue) }
               underlineColorAndroid = "transparent"
               placeholder = "Enter your address"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               style={{color:'#000'}}
               />
          </View>
          <TouchableOpacity onPress={()=>{update}} style={styles.btnContainer}>
            {loader ?
              <ActivityIndicator color="white" size="small" />
               :
              <Text style={styles.btnText}>Update</Text>
            }             
          </TouchableOpacity>
      </ScrollView>
    );
}
export default ProfileScreen;

// function mapDispatchToProps(dispatch) {
//   return {
//     addUserHelp: help => dispatch({ type: 'ADD_USERHELP', help })
//   };
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(ProfileScreen);
