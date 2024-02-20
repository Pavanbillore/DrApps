import React, { useState } from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { profileIcons } from '../../data/dataArrays';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
const ProfilePictureScreen = () => {
  const navigation = useNavigation();
  const [iconId, seticonId] = useState(-1);
  const [customPhoto, setcustomPhoto] = useState(-1);
  const [image, setimage] = useState(''); 

  // function mapDispatchToProps(dispatch) {
  //   return {
  //     addUserPhoto: photo => dispatch({ type: 'ADD_USERPHOTO', photo })
  //   };
  // }
  const onPressCard = (item) => {
    seticonId(item.id);
    setimage(item.uri);
  };

  const onPressText = () => {};

  const renderCard = (item) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressCard(item)}
      style={iconId == item.id ? styles.selectedCardContainer : styles.cardContainer}
    >
      <Image style={styles.cardImg} source={{ uri: item.url }} />
    </TouchableHighlight>
  );

  const onPressButton = () => {
    if(image){
      global.signupData={
        email:global.signupData.email,
        password:global.signupData.password,
        image:image
      };
      navigation.navigate('Gender');
      // addUserPhoto(
      //   'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357'
      // );
    }else{
      Toast.showWithGravity(
        'Please select default profile !',
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
        <ScrollView
          horizontal={true}
          style={styles.carouselContainer}
          showsHorizontalScrollIndicator={false}
        >
          {profileIcons.map(item => renderCard(item))}
        </ScrollView>

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Profile Picture</Text>
          <Text style={styles.secText}>
            You can select photo from one of this emoji or add your own photo as profile picture
          </Text>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() =>onPressText()}
          >
            <Text style={styles.customText}>Add Custom Photo</Text>
          </TouchableHighlight>
        </View>
        <ContinueButton onPress={()=>{
           navigation.navigate('Gender');
          //  onPressButton
          }}
           />
      </ScrollView>
    );
  }



// export default connect(
//   null,
//   mapDispatchToProps
// )(ProfilePictureScreen);
export default ProfilePictureScreen;
