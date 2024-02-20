import React,{useState} from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
const PasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setpassword] = useState('');
  const checkCharacters = () => {
    if (password.length < 8) return 1;
    return 0;
  }

  const checkUpperCase = () => {
    if (password.toUpperCase() == password) return 1;
    return 0;
  }

  const checkNumber=()=> {
    return !/\d/.test(password);
  }

  // const mapDispatchToProps=(dispatch)=> {
  //   return {
  //     addUserPassword: password => dispatch({ type: 'ADD_USERPASSWORD', password })
  //   };
  // }
  
  const onPressButton = () => {
    navigation.navigate('FingerPrint');
    // addUserPassword(password);
  };

  const next=() => {
    if(password){ 
       global.signupData={
         email:global.signupData.email,
         password:password,
       };
       //console.warn(global.signupData); 
       navigation.navigate('ProfilePicture'); 
    }else{
      Toast.showWithGravity(
        'All Fields Are Required !!',
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
          <Text style={styles.title}>Now let's set up your password</Text>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={text => setpassword(text)}
                textAlignVertical= 'top'
                placeholderTextColor={'gray'}
                />
            </View>

            <View style={styles.rowContainer}>
              <View style={checkCharacters() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>8+ characters</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={checkUpperCase() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>At least 1 uppercase</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={checkNumber() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>At least 1 number</Text>
            </View>
          </View>
          <ContinueButton
            onPress={()=>{
              navigation.navigate('ProfilePicture'); 
              // next
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

export default PasswordScreen;
// export default connect(
//   null,
//   mapDispatchToProps
// )(PasswordScreen);
