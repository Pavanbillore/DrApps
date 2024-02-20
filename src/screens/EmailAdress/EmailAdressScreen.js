import React, { useState } from 'react';
import {Dimensions,ActivityIndicator,Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const EmailAdressScreen = () => {
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [email, setemail] = useState('');

  const onPressButton = () => {
    addUserEmail(email);
    navigation.navigate('Password');
  };
  const mapDispatchToProps=(dispatch)=> {
    return {
      addUserEmail: email => dispatch({ type: 'ADD_USEREMAIL', email })
    };
  }

  const signup = async() => {
   // this.props.navigation.navigate('Password');  
    if(email){ 
      setloader(true);
      const data = new FormData();
      data.append('email',email);
       global.signupData={email:email}
  
       try {
       await fetch(global.api_url+'User/email_verify', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
          },
          body: data,
        }).then((response) => response.json())
        .then((res => {
         setloader(true);
          if(res.status==1){
            global.signupData={email:email}
            navigation.navigate('Password');  
          }else{
            Toast.showWithGravity(
              'This User Already Registered !',
              Toast.LONG,
              Toast.BOTTOM,
            );
          }
        }));
      }
      catch (e) {
        Toast.showWithGravity(
          'Something Went Wrong..',
          Toast.LONG,
          Toast.BOTTOM,
        );
        console.log(e)
        setloader(false);
      }
      }else{
        Toast.showWithGravity(
          'All Fields Are Required !',
          Toast.LONG,
          Toast.BOTTOM,
        );
    }
  }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.title}>What is your email address?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={'gray'}
              onChangeText={text => setemail(text)}
              />
          </View>

          {!loader ?
           <ContinueButton onPress={()=>{
            navigation.navigate('Password');  
            // signup
          }} />
           :
           <View style={{paddingTop:5,backgroundColor:'#7265E3',alignSelf:'center',alignItems:'center',width:SCREEN_WIDTH - 100,height:50,borderRadius:60}}>
             <ActivityIndicator size="large" color="white" /> 
           </View>
          }
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }


export default EmailAdressScreen;
