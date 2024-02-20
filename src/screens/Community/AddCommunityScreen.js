import React from 'react';
import {ActivityIndicator, Text, View, TouchableHighlight,TouchableOpacity,TextInput, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles_form from './styles_form';
// import Toast from '../Toast/Toast';
// import {ImagePicker} from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
//import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';


export default class AddCommunityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      data:[],
      name:'',
      description:'',
      uid:'',
      ImageUrl:null,
      ImageData: null,
      ImageSource: null,
      image: '',
    };
   this._loginCheck()  
 }

  _loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      var data=JSON.parse(userToken);
      if(data != null){
        this.set(data);
      }else{
        // this.props.navigation.navigate('H');
    }
  };
  set(data){ //console.warn(data); 
     var user_id=data.uid;
     this.setState({
        uid: user_id,
     })
  }


  Create = () => {
   if(this.state.name && this.state.description && this.state.ImageUrl){
     this.setState({loader: true})
     var data = new FormData();     
      data.append("uid", this.state.uid);
      data.append("name", this.state.name);
      data.append("description", this.state.description);
      data.append("image",this.state.image);
      try {
      fetch(global.api_url+'user/add_community', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loader: false})
          if(responseJson.status == 1){
            this.setState({name:'',description:'',ImageUrl:null})
            Toast.showWithGravity(
              'Community Added Succesffuly..',
              Toast.LONG,
              Toast.TOP,
            );
            
          }else{
            Toast.showWithGravity(
              'Change Something..',
              Toast.LONG,
              Toast.TOP,
            );
         }
       })}
      catch (e) {
        Toast.showWithGravity(
          'Something Went Wrong..',
          Toast.LONG,
          Toast.TOP,
        );
        this.setState({loader:false})
      }
    }else{
      Toast.showWithGravity(
        'Fill required fields..',
        Toast.LONG,
        Toast.TOP,
      );
    }        
  }  

  selectImage() {
    const options = {
       quality: 1.0,
       maxWidth: 500,
       maxHeight: 500,
       includeBase64: false,
       title: 'Select Photo',
       mediaType: 'photo',
       storageOptions: {
         skipBackup: true,
       }
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let source = response.uri || response.assets?.[0]?.uri;
        console.warn("source",source);
        this.setState({
          ImageSource: source,
          ImageUrl: response.uri,
          ImageData: response.data
        });
        Toast.showWithGravity(
          'Succesffuly Added..',
          Toast.LONG,
          Toast.TOP,
        );
     }
    this.userImage(); 
    
  });    

  }

   userImage = () => {
     fetch('POST', global.api_url+'user/file_uploads', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        {name: 'image', filename: this.state.ImageUrl, type: 'image/png', data: this.state.ImageData},
      ]).then((resp) => {
         var newone= JSON.parse(resp.data);
         if(newone.msg!='no'){
           //console.warn(newone.data);
          this.setState({
            image:newone.data,
          });
          Toast.showWithGravity(
            'Profile Image Updated Successfully !',
            Toast.LONG,
            Toast.TOP,
          );
         }
      }).catch((err) => {
       console.log("cacth error",err);
      })
   }


  render() {
    return (
      <ScrollView style={styles_form.container}>
         <TouchableOpacity onPress={()=>this.selectImage()} style={styles_form.textContainer}>
           {this.state.ImageUrl ==null ?
            <Image
              style={styles_form.proimg}
              source={require('../../../assets/icons/album3.png')}
            />
            :
            <Image
              style={styles_form.proimg}
              source={{uri:this.state.ImageUrl}}
            />
          }
          <Text style={{width:'100%',textAlign:'center',fontSize:20,color:'black'}}>+ Add Photo</Text>
        </TouchableOpacity>

        <View style={{}}>
          <Text style={styles_form.mainText}> </Text>
        </View>
       
          <View style={[styles_form.TextView,{marginTop:20}]}>
             <TextInput
               value={this.state.name}  
               onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) }
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "gray"
               style={{color:"black"}}
               autoCapitalize = "none"/>
          </View>

          <View style={[styles_form.TextView,{height:100}]}>
              <TextInput
               value={this.state.description}  
               onChangeText={ TextInputValue => this.setState({ description : TextInputValue }) }
               underlineColorAndroid = "transparent"
               placeholder = "Description"
               placeholderTextColor = "gray"
               style={{color:"black"}}
               autoCapitalize = "none"/>
          </View>
       
          <TouchableOpacity onPress={this.Create} style={styles_form.btnContainer}>
            {this.state.loader ?
              <ActivityIndicator color="white" size="small" />
               :
              <Text style={styles_form.btnText}>Create</Text>
            }              
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUserHelp: help => dispatch({ type: 'ADD_USERHELP', help })
  };
}
