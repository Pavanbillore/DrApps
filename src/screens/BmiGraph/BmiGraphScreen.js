import React, { useEffect, useState } from 'react';
import {Platform,ActivityIndicator,Text, View,TouchableOpacity,Dimensions,TextInput, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';
import GoalAchievedScreen from '../GoalAchieved/GoalAchievedScreen';
import {Line,Chart} from 'react-native-responsive-linechart';

import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

const BmiGraphScreen = () => {
  const navigation = useNavigation();
  const { widths, heights } = Dimensions.get('window');
  const SCREEN_WIDTH = widths < heights ? widths : heights;
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const [checked, setchecked] = useState(true);   
  const [checked2, setchecked2] = useState(false);
  const [checked3, setchecked3] = useState(false);
  const [unchecked, setunchecked] = useState(false);
  const [Overweight, setOverweight] = useState('');
  const [weight, setweight] = useState('');
  const [height, setheight] = useState('');
  const [bmi, setbmi] = useState('');
  const [goal_bmi, setgoal_bmi] = useState('');
  const [goal_weight, setgoal_weight] = useState('');
  const [loader, setloader] = useState(false);
  const [data, setdata] = useState([]);
  const [dates, setdates] = useState(['21 jan', '22 jan', '23 jan', '24 jan','25 jan',]);
  const [datas, setdatas] = useState([100,12,0,0,0,0,0]);

  useEffect(()=>{
    getd();
  },[])

  const getd=async ()=>{
     var res = await api.getdata('user/get_health/'+global.userdata.uid);
     if(res){
        //this.setState({dates: res.dates, datas: res.datas});
        console.log(res);
     }
  }

 const uploadFile=()=> {
    // first set the isButtonDisabled to true
      setisButtonDisabled(true)
    // then do your thing
  }

// const _loginCheck = async () => {
//     const userToken = await AsyncStorage.getItem('loginData');
//       var data=JSON.parse(userToken);
//       if(data){
//          //console.warn(data.uid);
//          setdata(data);
//          //console.warn(this.state.data.uid);
//       }
//   };

 const submit = () => {
   if(weight && height && bmi && goal_bmi && goal_weight){
     setloader(true);
     var data = new FormData();     
      data.append("uid", data.uid);
      data.append("weight", weight);
      data.append("height", height);
      data.append("bmi", bmi);
      data.append("goal_bmi", goal_bmi);
      data.append("goal_weight", goal_weight);

     try {
      fetch(global.api_url+'user/add_health_data', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
      .then((response) => response.json())
      .then((responseJson) => {
          setloader(false);
          setvisibleModal(false);
          if(responseJson.status == 1){//console.error(responseJson.user_data[0]);
            setweight('')
            setheight('')
            setbmi('')
            setgoal_bmi('')
            setgoal_weight('')
            Toast.showWithGravity(
              'Data Added Succesffuly !',
              Toast.LONG,
              Toast.BOTTOM,
            );
          }else{
            Toast.showWithGravity(
              'Something Went Wrong !',
              Toast.LONG,
              Toast.BOTTOM,
            );
         }
       })}
      catch (e) {
        setloader(false);
        Toast.showWithGravity(
          'Something Went Wrong..',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    }else{
      Toast.showWithGravity(
        'Please Write Something.',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }
  }

   const navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: '#7265E3',
        elevation: 0,
        height: 30,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.backIcon} source={require('../../../assets/icons/left_arrow.png')} />
        </TouchableOpacity>
      )
    };
  };

  const lineChartConfig = [{
    interpolation: 'spline',
    area: {
      gradientFrom: 'orange',
      gradientFromOpacity: 1,
      gradientTo: 'orange',
      gradientToOpacity: 0.4
    },
    line: {
      strokeColor: 'orange',
      strokeWidth: 2
    },
    grid: { visible: false }
  }];
  
  const lineChartData =  [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
   return (
      <ScrollView style={styles.container}>
          <Text style={styles.title1}>My Weight Goal & Bmi</Text>
        <View style={styles.titleContainer}>
            <View style={styles.checkboxContainer}>
               <View style={styles.check2}>
                  <Text style={styles.mainText}>My Weight: </Text>
               </View>
              <View style={styles.check1}>
                  <TextInput style={styles.inputs}
                  placeholder=" "
                  underlineColorAndroid='transparent'
                  keyboardType={Platform.OS ==='android' ? 'Number' : 'numeric' }
                  value={weight}
                  onChangeText={weight => setweight(weight)}/>
              </View>
            </View>

            <View style={styles.checkboxContainer}>
                <View style={styles.check2}>
                   <Text style={styles.mainText}>My Height: </Text>
                </View>
                <View style={styles.check1}>
                  <TextInput style={styles.inputs}
                  placeholder=""
                  underlineColorAndroid='transparent'
                  keyboardType={Platform.OS ==='android' ? 'Number' : 'numeric' }
                  value={height}
                  onChangeText={height => setheight(height)}/>
                </View>
           </View>

            <View style={styles.checkboxContainer}>
                <View style={styles.check2}>
                   <Text style={styles.mainText}>My BMI: </Text>
                 </View>
                 <View style={styles.check1}>
                 <TextInput style={styles.inputs}
                    placeholder=""
                    underlineColorAndroid='transparent'
                    keyboardType={Platform.OS ==='android' ? 'Number' : 'numeric' }
                    value={bmi}
                    onChangeText={bmi => setbmi(bmi)}/>
                  </View>
            </View>

           <View style={styles.checkboxContainer}>
                <View style={styles.check2}>
                   <Text style={styles.mainText}>My Goal BMI: </Text>
                 </View>
                 <View style={styles.check1}>
                 <TextInput style={styles.inputs}
                    placeholder=""
                    underlineColorAndroid='transparent'
                    keyboardType={Platform.OS ==='android' ? 'Number' : 'numeric' }
                    value={goal_bmi}
                    onChangeText={goal_bmi => setgoal_bmi(goal_bmi)}/>
                  </View>
            </View>
          <View style={styles.checkboxContainer}>
                <View style={styles.check2}>
                   <Text style={styles.mainText}>My Goal Weight: </Text>
                 </View>
                 <View style={styles.check1}>
                 <TextInput style={styles.inputs}
                    placeholder=""
                    underlineColorAndroid='transparent'
                    keyboardType={Platform.OS ==='android' ? 'Number' : 'numeric' }
                    value={goal_weight}
                    onChangeText={goal_weight => setgoal_weight(goal_weight)}/>
                  </View>
            </View>

              <TouchableOpacity  activeOpacity={0.5} style={{marginTop:15,borderRadius:100,width:'90%',backgroundColor:'#7265E3',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                {loader ?
                 <ActivityIndicator size="large" color="white" /> 
                 :
                 <Text style={{textAlign:'center',color:'white',padding:10}}>Save</Text> 
                }
              </TouchableOpacity>

        </View>          

          <Text style={styles.title2}> BMI </Text>
       
      <View style={styles.titleContainer}>
         <View style={styles.checkboxContainer}>
            <View style={styles.check2}>
               <Text style={styles.mainText}> 30 or more </Text>
            </View>
           <TouchableOpacity  style={styles.checkview1}>
            <Text style={styles.date2}> Obese</Text>
           </TouchableOpacity>

       
      </View>
       
       <View style={styles.checkboxContainer}>
          <View style={styles.check2}>
             <Text style={styles.mainText}> 25-30 </Text>
          </View>
           <TouchableOpacity onPress={() => setOverweight('Overweight')} style={styles.checkview}>
            <Text style={styles.date}>
             Overweight  </Text>
         </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
         <View style={styles.check2}>
            <Text style={styles.mainText}> 18.5-25 </Text>
         </View>
        <TouchableOpacity style={styles.checkview1}>
       <Text 
            onPress={() => uploadFile()}
            disabled={isButtonDisabled}
            style={styles.date2}>  Healthy  </Text>
         </TouchableOpacity>
      </View>

       <View style={styles.checkboxContainer}>
          <View style={styles.check2}>
             <Text style={styles.mainText}> less than 18.5 </Text>
          </View>
           <TouchableOpacity style={styles.checkview1}>
           <Text 
                  onPress={() => uploadFile()}
                  disabled={isButtonDisabled} style={styles.date2}>  Underweight  </Text>
           </TouchableOpacity>
       </View>
   </View>

       <View style={styles.statisticContainer}>
          <Text style={styles.statisticTxt}>Statistic</Text>
          <Line
            style={{
              width: SCREEN_WIDTH - 10,
              height: 220,
              alignSelf: 'center',
              justifyContent: 'center',
              marginLeft: 20,
              marginRight: 20
            }}
            config={lineChartConfig}
            data={datas}
          />
        </View>
      </ScrollView>
    );
  }

export default BmiGraphScreen;


