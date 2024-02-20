import React,{useNavigation} from 'react';
import {Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import { connect } from 'react-redux';
import api from '../../../Api';
import Menu from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuBtn from '../../../assets/icons/menu.png';
// import Userphoto from '../../../assets/icons/userphoto.png';
const data=[];
const user='';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // const navigation = useNavigation();
    return {
      headerStyle: {
        backgroundColor: '#ECECEC',
        elevation: 0,
        height: 80,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.photoContainer}>
          <Image style={styles.userPhoto} source={{ uri:global.user ? global.media_url+global.user : global.default_user}} />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      stepsDone: 7000,
      Weight: 85,
      stepsGoal: 10000,
      nutrition: [],
      macroNutrients: {
        proteinDone: 100,
        proteinGoal: 260,
        carbDone: 60,
        carbGoal: 500,
        fatDone: 20,
        fatGoal: 750
      }
    };
  }
 
 _loginCheck = async () => {
    const userToken = await AsyncStorage.getItem('loginData');
      var data=JSON.parse(userToken);
      if(data != null){
        this.setData(data);
        this.getd();
      }else{
    }
  };

  setData(data){ //console.warn(data); 
     this.props.userNameSend(data.username);
     global.userdata = data;
     var user_id=data.uid;
     fetch(global.api_url+'user/get_profile?id='+user_id,{
        method:"GET"
      })
        .then((response) => response.json())
        .then((responseJson) => {//console.warn(responseJson.data[0]);
            data=responseJson.data[0];
            global.user=responseJson.data[0].profile;
            this.setState({
              data: responseJson.data[0],
            })
             this.props.navigation.setParams({
             })    
        })
       .catch((error) => {
          console.error(error);
       });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      userPhoto: this.props.userPhoto,
    });
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._loginCheck();
    });

  }
  getd=async ()=>{
     var res = await api.getdata('user/get_neutrition/'+global.userdata.uid);
     if(res){
        if(res.length > 0){
          this.setState({nutrition: res});
          this.setdata(res);
        }
     }
  } 
  setdata=(res)=>{
    var protein = 0;
    var carbs = 0;
    var fat = 0;
    var calories = 0;
    res.forEach((r)=>{
      r.foods.forEach((f)=>{
        console.warn(f);
        protein+=parseInt(f.protein);
        carbs+=parseInt(f.carbs);
        fat+=parseInt(f.fat);
        calories+=parseInt(f.calories);
      })
    })
    this.setState({macroNutrients: {'proteinDone': protein, 'carbDone': carbs, 'fatDone': fat,proteinGoal: 260,carbGoal: 500,fatGoal: 750}});
    //console.error(this.state.macroNutrients);
  }
  onPressNutrition = () => {

    this.props.navigation.navigate('Nutrition', {
      macroNutrients: this.state.macroNutrients
    });
  };
 onPressBmiGraph = () => {
    this.props.navigation.navigate('BmiGraph', {
    });
  };

  onPressSteps = () => {
    let stepsDone = this.state.stepsDone;
    let stepsGoal = this.state.stepsGoal;
    this.props.navigation.navigate('Steps', { stepsDone, stepsGoal });
  };

  onPressDetailsText = () => {
    console.log("done")
  };

  getCaloriesDone = () => {
    var calories = 0;
    this.props.nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories;
      });
    });
    return calories;
  };
  render() {
    const caloriesDone = this.getCaloriesDone();
    return (
      <View style={styles.container}>
         <View style={{padding:20,flexDirection:"row",justifyContent:"space-between"}}>
          <TouchableOpacity  onPress={() => {
            this.props.navigation.openDrawer();
          }}>
            <Image source={MenuBtn} style={{height:30,width:30}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile')} style={styles.photoContainer}>
            <Image style={styles.userPhoto} source={{ uri:global.user ? global.media_url+global.user : 'https://cdn-icons-png.freepik.com/256/3237/3237472.png'}} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.boldText}>{this.props.userName} , Good morning, {this.state.data.username}</Text>
          <Text style={styles.normalText}>
            Eat the right amount of food and stay hydrated through the day
          </Text>
         <View style={styles.rowContainer}>
          <TouchableOpacity
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.onPressDetailsText()}
          >
            <Text style={styles.detailText}> Your Weight: 84kg</Text>
          </TouchableOpacity>
        <TouchableOpacity
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.onPressDetailsText()}
          >
            <Text style={styles.detailText}> Your BMI: 23.2</Text>
          </TouchableOpacity>
        </View>
        </View>
      <ScrollView scrollEnabled style={{bottom:40,marginBottom:-40}}>
       <TouchableOpacity
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => {
             this.props.navigation.navigate('BmiGraph')}}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/bmi.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Weight & BMI</Text>
                  <Text style={styles.secText}>
                    {caloriesDone} kg / {this.props.BmiGraph} 
                  </Text>
                </View>
                <View
                  style={
                    caloriesDone > this.props.nutritionGoal
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      caloriesDone > this.props.nutritionGoal
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {caloriesDone > this.props.nutritionGoal ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    caloriesDone <= this.props.nutritionGoal
                      ? {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (caloriesDone / this.props.nutritionGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar1}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar3}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.onPressNutrition()}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorFood.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Nutrition</Text>
                  <Text style={styles.secText}>
                    {caloriesDone} cal / {this.props.nutritionGoal} cal
                  </Text>
                </View>
                <View
                  style={
                    caloriesDone > this.props.nutritionGoal
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      caloriesDone > this.props.nutritionGoal
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {caloriesDone > this.props.nutritionGoal ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    caloriesDone <= this.props.nutritionGoal
                      ? {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (caloriesDone / this.props.nutritionGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar1}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar3}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.props.navigation.navigate('Water')}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorWater.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Water</Text>
                  <Text style={styles.secText}>
                    {' '}
                    {this.props.waterDone} / {this.props.waterGoal} glasses
                  </Text>
                </View>
                <View
                  style={
                    this.props.waterDone <= this.props.waterGoal / 2
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      this.props.waterDone <= this.props.waterGoal / 2
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {this.props.waterDone <= this.props.waterGoal / 2 ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    this.props.waterDone <= this.props.waterGoal
                      ? {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (this.props.waterDone / this.props.waterGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar3}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar1}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.onPressSteps()}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorWalk.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Daily Steps</Text>
                  <Text style={styles.secText}>
                    {this.state.stepsDone} steps / {this.state.stepsGoal} steps
                  </Text>
                </View>
                <View
                  style={
                    this.state.stepsDone <= this.state.stepsGoal / 2
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      this.state.stepsDone <= this.state.stepsGoal / 2
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {' '}
                    {this.state.stepsDone <= this.state.stepsGoal / 2 ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    this.state.stepsDone <= this.state.stepsGoal
                      ? {
                          height: 12,
                          width: 2,
                          borderRadius: 8,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (this.state.stepsDone / this.state.stepsGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          borderRadius: 8,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar3}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar1}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    waterDone: state.water.waterDone,
    waterGoal: state.water.waterGoal,
    nutritionGoal: state.nutrition.nutritionGoal,
    nutrition: state.nutrition.nutrition,
    userName: state.registration.userName,
    userPhoto: state.registration.userPhoto
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userNameSend:(userName) => dispatch({type:'send',userName:userName}) ,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
 )(HomeScreen);
