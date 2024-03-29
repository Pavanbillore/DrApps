import React, { useEffect, useState } from 'react';
import { Text, View, TouchableHighlight, Image, Dimensions, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { landingArray } from '../../data/dataArrays';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const LandingScreen = () => {
  const [activeSlide, setactive] = useState(0);
  const navigation = useNavigation();
  const slider1Ref = React.useRef(null);
 const renderImage = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photoUrl }} />
      </View>
    </TouchableHighlight>
  );

 const onPressGetStarted = () => {
    navigation.navigate('Email');
  };

 const onPressLogin = () => {
    navigation.navigate('SignIn');
  };

 const loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      if(userToken){
         navigation.navigate('Home');
      }else{
         navigation.navigate('Landing');
      }
  };
  useEffect(()=>{
    loginCheck();
  },[])
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{landingArray[activeSlide].title}</Text>
          <Text style={styles.description}>{landingArray[activeSlide].description}</Text>
        </View>
        <ScrollView style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={slider1Ref}
              data={landingArray}
              renderItem={renderImage}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => setactive(index)}
            />
            <Pagination
              dotsLength={landingArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref}
              tappableDots={!!slider1Ref}
            />
          </View>
        </ScrollView>
        <View style={styles.logContainer}>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            style={styles.btnContainer}
            onPress={() => onPressGetStarted()}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableHighlight>

          <View style={styles.bottomRowContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressLogin()}
            >
              <Text style={styles.signText}>Sign in</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
export default LandingScreen;