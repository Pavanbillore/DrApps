import React, { useState } from 'react';
import { Text, View,TouchableOpacity,TextInput, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';
import {ImagePicker,launchImageLibrary} from 'react-native-image-picker';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
const PhotoAlbumScreen =()=> {
  const navigation = useNavigation();
  const [paragraph,setparagraph] = useState('');
  const [image,setimage] = useState('');
  const [uid,setuid] = useState('');
  const [checked,setchecked] = useState(true);
  const [checkedDone,setcheckedDone] = useState('checked');
  const [checked3,setchecked3] = useState(false);
  const [unchecked,setunchecked] = useState(false);
  const [photos,setphotos] = useState([]);
  const [ImageUrl,setImageUrl] = useState(null);
  const [ImageData,setImageData] = useState(null);
  const [ImageSource,setImageSource] = useState(null);
  const [loader,setLoader] = useState(false);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
 const uploadFile=()=> {
    // first set the isButtonDisabled to true
      setisButtonDisabled(true);
    // then do your thing
  }

const _loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      var data=JSON.parse(userToken);
      if(data != null){
        get_photos(data);
      }else{
        // this.props.navigation.navigate('Landing');
    }
  };

  const get_photos = (data) => {
     var user_id=data.uid;
     setLoader(true);
     setuid(user_id);
     try {
      fetch(global.api_url+'user/get_photo/'+data.uid, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {console.warn();
          setphotos(responseJson);
       })}
      catch (e) {
       console.log(e)
      }
  }  

 const selectImage=(type)=> {
    const options = {
       quality: 1.0,
       maxWidth: 500,
       maxHeight: 500,
       title: 'Select Photo',
       mediaType: 'photo',
       storageOptions: {
         skipBackup: true,
       }
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
     else {
        let source = { uri: response.uri };
          //console.log(source);
          setImageSource(source);
          setImageUrl(response.uri);
          setImageData(response.data)
       }
      userImage(type); 
    });    
  }

  const userImage = (type) => {
    //console.log(post_id);
      fetch('POST', global.api_url+'user/album_uploads', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        {name: 'image', filename: ImageUrl, type: 'image/png', data: ImageData},
        {name:'uid',data: uid.toString()},
        {name:'type',data: type},
      ]).then((resp) => {//console.warn(resp);
         var newone= JSON.parse(resp.data);
         if(newone.status === 1){
           //console.warn(newone.data);
           setImageUrl(null);
           setphotos(newone.data);
           Toast.showWithGravity('Album Uploaded Successfully !',
           Toast.LONG,
           Toast.BOTTOM);
         }
      }).catch((err) => {
        console.log(err);
      })
   }
  
   return (
    <View style={styles.container}>
      <ScrollView>
         <View style={styles.dailystepview}>
            <Text style={styles.takepic}>You have yet to take the Photo of the Day! </Text>

             <TouchableOpacity style={styles.filter}>
                <Text style={styles.take}> Take Photo of the day </Text>
              </TouchableOpacity>

              <View style={styles.steps}>
                   <TouchableOpacity onPress={()=>selectImage('front')} style={styles.check2}>
                      <Image style={styles.icon} source={require('../../../assets/icons/side_camera.png')} />  
                      <Text style={styles.date}> Front </Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>selectImage('side')} style={styles.check2}>
                      <Image style={styles.icon} source={require('../../../assets/icons/camera.png')} />  
                      <Text style={styles.date}> Side </Text>
                    </TouchableOpacity>
               </View>

              <View style={{width:'97%',height:50,backgroundColor:'#7265E3',alignSelf:'center',justifyContent:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:15,textAlign:'center',width:'100%'}}> All Albums </Text>
              </View>

               <View style={{flexDirection:'row',width:'100%',flexWrap: 'wrap',marginBottom:30,marginTop:0}}>
                {photos.map((item,i)=>{
                 return(
                    <View  style={{width:'50%',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{textAlign:'center',width:'100%',fontSize:17,marginBottom:5,marginTop:20}}> {item.date} </Text>
                      <TouchableOpacity activeOpacity={0.9} >
                         <Image style={styles.cardImg} source={{ uri: item.photos ? global.media_url+item.photos : global.default_user}} />
                         <Text style={styles.date}> {item.type} </Text>
                      </TouchableOpacity>
                    </View>
                 )})}
               </View>
                {photos.length ==0 && 
                 <Text style={{color:'gray',fontSize:15,fontWeight:'bold',textAlign:'center',marginTop:100,width:'100%'}}>No Photo Uploaded Yet !</Text>
                }  
              <View style={{backgroundColor:'gray',width:'100%',height:0.7}} />

             <View style={styles.steps}>
                <Checkbox
                  status={checked ? checkedDone : 'unchecked'}
                  onPress={() => {
                    // setcheckedDone()
                    setchecked(!checked);
                  }}
                />
                 <Text numberOfLines = {5} style={styles.only}> I have ended my weight-loss journey and it has been verified by the clinic.</Text>
             </View>
           <Text style={styles.only}> * This feature will only be for ObesityDocs patients.</Text>
          </View>
          <AwesomeIcon name='left' size={22} color={'#000'} />
    </ScrollView>
 
  </View>

  );
 }
export default PhotoAlbumScreen;
// export default connect(
//   )(PhotoAlbumScreen);
