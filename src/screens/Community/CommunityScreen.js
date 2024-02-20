import React, { useState } from 'react';
import { TextInput,Text, View, TouchableHighlight,TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import CreatePostScreen from '../CreatePost/CreatePostScreen';
import { profilePictures } from '../../data/dataArrays';
import styles from './styles';
import styles_popup from './styles_popup';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
const CommunityScreen =()=> {
  const navigation = useNavigation();
  const [visibleModal, setvisibleModal] = useState(null);
  const [userName, setuserName] = useState('Ben Andressen');
  const [posts, setposts] = useState([]);
  const [uid, setuid] = useState('');
  const [loader, setloader] = useState(false);
  const [userPhoto, setuserPhoto] = useState('https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357');
  
  

const loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      var data=JSON.parse(userToken);
      if(data != null){
       community(data);
      }else{
        //navigation.navigate('Landing');
        community(data);
    }
  };


 const community = (data) => {
     var user_id=data.uid;
    setloader(true);
    setuid(user_id);
     try {
      fetch(global.api_url+'user/community', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setloader(false);
        setposts(responseJson.data);
       })}
      catch (e) {
        Toast.showWithGravity('Something Went Wrong.. !',
        Toast.LONG,
        Toast.BOTTOM);
        setloader(false);
      }
  }  

  const toggleModal = () => {
  setvisibleModal(null);
  };

  const renderCard = item => <Image style={styles.cardImg} source={{ uri: item.photo }} />;

  const onPressPostComment=(commentText, postId)=> {
    var posts = posts;
    var comment = {};
    posts.map(post => {
      if (post.id == postId) {
        let id = 0;
        if (post.comments.length != 0) {
          id = post.comments[post.comments.length - 1].id + 1;
        }
        comment = {
          text: commentText,
          authorName: userName,
          authorPhoto: userPhoto,
          time: '15 seconds',
          id: id
        };
      }
    });
    addComment(postId, comment);
  }

 const onPressPostPost =( postText )=> {
    var posts = posts;
    let post = {
      title: postText,
      photoUrl:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357',
      author: userName,
      authorImg: userPhoto,
      time: '15 seconds',
      id: posts[posts.length - 1].id + 1,
      likes: 0,
      liked: false,
      comments: []
    };
    addPost(post);
  };

 const onPressLike = (postId) => {
    addLike(postId);
  };
 
const Like=(cid,i)=> {
    // console.warn(this.state.uid);
    var post = posts;
    if(post[i].like_me == '1'){
      post[i].likes = parseInt(post[i].likes)-1;
      post[i].like_me = '0';
    }else{
      post[i].likes = parseInt(post[i].likes)+1;
      post[i].like_me = '1';
    }
      this.setState({posts: post,});
      var data = new FormData();
      data.append("uid",uid);
      data.append("cid", cid);
     //console.warn(global.api_url+'user/like');

     fetch(global.api_url+'user/like', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
      .then((response) => response.json())
      .then((responseJson) => {console.warn(responseJson);
         if(responseJson.status==1){
          Toast.showWithGravity('Liked !',
          Toast.LONG,
          Toast.BOTTOM);
            //this.props.navigation.navigate('NavScreen4');
          }      
       })
      .catch(function(error) {
       console.warn(error);
      });
   }
 
const going=()=>{
    navigation.navigate('AddCommunity');
  }

 const renderPost = ({ item,index }) => {
    //console.warn(index);
    return (
      <View
        style={styles.postContainer}
      >
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.authorImg} source={{ uri: item.profile ? global.media_url+item.profile : global.default_user}} />
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.authorName}>{item.username}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.postTitle}>{item.name}</Text>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() =>
             navigation.navigate('Comment', {
                userPhoto: item.profile,
                userName: item.username,
                itemId: item.community_id,
                item: item,
                pageName: 'Community',
                onPressPostComment: onPressPostComment.bind(),
                onPressLike: onPressLike.bind()
              })
            }

          > 
            <Image style={styles.postImg} source={{ uri: global.media_url+item.image}} />
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => Like(item.community_id,index)}
            >
            <Image style={styles.icon} source={require('../../../assets/icons/like.png')} />
            </TouchableOpacity>

            <Text style={styles.iconText}>{item.likes}</Text>
            
            <TouchableOpacity
             style={{flexDirection:'row'}}
             onPress={() =>
             navigation.navigate('Comment', {
                userPhoto: item.profile,
                userName: item.username,
                itemId: item.community_id,
                item: item,
                pageName: 'Community',
                onPressPostComment: onPressPostComment.bind(),
                onPressLike: onPressLike.bind()
              })
             }
            > 
              <Image style={styles.icon} source={require('../../../assets/icons/comments.png')} />
              <Text style={styles.iconText}>{item.comments}</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </View>
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <TouchableOpacity
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={going}
          >
          </TouchableOpacity>
        </View>


        <ScrollView
          horizontal={true}
          style={styles.carouselContainer}
          showsHorizontalScrollIndicator={false}
        >
          {profilePictures.map(item => renderCard(item))}
        </ScrollView>
       
       <ScrollView style={{marginTop:20}}>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={posts}
          //renderItem={({item, index}) => this.renderPost(item, index)}
            renderItem={renderPost}
            // extraData={state}
            keyExtractor={(item,index) => `${item.community_id,index}`}
          />

        </View>
      </ScrollView>
      
        <TouchableOpacity onPress={going} style={{position:'absolute',bottom:20,right:20}}>
          <Image style={{width:60,height:60}} source={require('../../../assets/icons/addIcon.png')} />
        </TouchableOpacity>

      </View>
    );
  }

function mapStateToProps(state) {
  return {
    posts: state.community.posts,
    userName: state.registration.userName,
    userPhoto: state.registration.userPhoto
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch({ type: 'ADD_POST', post }),
    addLike: id => dispatch({ type: 'ADD_LIKE', id }),
    addComment: (postId, comment) => dispatch({ type: 'ADD_COMMENT', postId, comment })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityScreen);
