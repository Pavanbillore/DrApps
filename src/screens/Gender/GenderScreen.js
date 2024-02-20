import React,{useState} from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
const GenderScreen =()=> {
  const navigation = useNavigation();
  const [gender, setgender] = useState('');
  const onPressButton = () => {
    if(gender){
      global.signupData={
        email:global.signupData.email,
        password:global.signupData.password,
        help:global.signupData.help,
        image:global.signupData.image,
        gender:gender,
      };
      const data = new FormData();
      data.append('email',global.signupData.email);
      data.append('password',global.signupData.password);
     // data.append('help',global.signupData.help);
      data.append('image',global.signupData.image);
      data.append('gender',gender);
      //this.props.navigation.navigate('Success');

      try {
        fetch(global.api_url+'User/signupMain', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data'
          },
          body: data,
        }).then((response) => response.json())
        .then((res => {
          if(res.status==1){//console.error(res.data);
            global.userData = res.data[0];
            navigation.navigate('Success');
            addUserGender(gender);
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
      }

    }else{
      Toast.showWithGravity(
        'Please select your gender !',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }
  };

    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
           navigation.goBack();
          }}
        />
        <View style={styles.middleContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Which one are you?</Text>
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              style={styles.iconContainer}
              onPress={() => setgender('male')}
            >
              <View>
                <Image
                  style={styles.circle}
                  source={
                    gender == 'male'
                      ? require('../../../assets/icons/fullCircle.png')
                      : require('../../../assets/icons/emptyCircle.png')
                  }
                />
                <Image style={styles.icon} source={require('../../../assets/images/male.png')} />
                <Text style={styles.genderText}>Male</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              style={styles.iconContainer}
              onPress={() =>setgender('female')}
            >
              <View>
                <Image
                  style={styles.circle}
                  source={
                    gender == 'female'
                      ? require('../../../assets/icons/fullCircle.png')
                      : require('../../../assets/icons/emptyCircle.png')
                  }
                />
                <Image style={styles.icon} source={require('../../../assets/images/female.png')} />
                <Text style={styles.genderText}>Female</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.secText}>
              To give you a better experience we need to know your gender
            </Text>
          </View>
        </View>
        <ContinueButton
          onPress={() => {
            navigation.navigate('Success');
            // onPressButton();
          }}
        />
      </ScrollView>
    );
}

export default GenderScreen;
// function mapDispatchToProps(dispatch) {
//   return {
//     addUserGender: gender => dispatch({ type: 'ADD_USERGENDER', gender })
//   };
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(GenderScreen);
