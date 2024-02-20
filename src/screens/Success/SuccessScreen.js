import React from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen =()=> {
  const navigation = useNavigation();
  const navigationOptions = () => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    },
    headerLeft: <View />
  });
 const onPressArrow = () => {
  Toast.showWithGravity(
    'Welcome to home',
    Toast.LONG,
    Toast.BOTTOM,
  );
    navigation.navigate('Home');
  };

    return (
      <ImageBackground
        source={require('../../../assets/images/logBackground.png')}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainTxt}>You are ready to go!</Text>
          <Text style={styles.secTxt}>
            Thanks for taking your time to create account with us. Now this is the fun part, let's
            explore the app.
          </Text>
        </View>
        <TouchableHighlight style={styles.arrowContainer} onPress={() =>{
        onPressArrow()
        }}>
          <Image style={styles.arrow} source={require('../../../assets/icons/rightArrow.png')} />
        </TouchableHighlight>
      </ImageBackground>
    );
  }
export default SuccessScreen;