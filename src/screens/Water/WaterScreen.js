import React, { useEffect, useState } from 'react';
import { Text, View, TouchableHighlight,Dimensions, Image, TextInput, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import api from '../../../Api';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const WaterScreen =()=> {
  const navigation = useNavigation();
  const [waterGoal,setwaterGoal] = useState('');
  const [water,setwater] = useState(1);
  const [dates,setdates] = useState([]);
  const [datas,setdatas] = useState([100,12,0,0,0,0,0]);
  const [tareekh,settareekh] = useState([]);
  const [waterDone, setwaterDone] = useState('');

  useEffect(()=>{
    getd()
  })
  
 const getd = async() => {
     var res = await api.getdata('user/get_water/'+global.userdata.uid);
     if(res){
       var data = []; 
       res.datas.forEach((d)=> {data.push(parseInt(d))});
       setwater(res.water);
       setdatas(data);
       setdates(res.dates);
       settareekh(res.tareekh);
       updateWater(parseInt(res.today), parseInt(res.total));
     }
  }
  const increament=async ()=>{
      var res = await api.submitData([], 'user/add_water/'+ global.userdata.uid);
      if(res){
        incrementWater();
      }
    } 
  const decreament=async ()=>{
      var res = await api.submitData([], 'user/delete_water/'+ global.userdata.uid);
      if(res){
        decrementWater();
      }
    } 

 const renderGlass = ({ item }) => {
    return (
      <View style={styles.waterContainer}>
        {item < waterDone ? (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => decreament()}
          >
            <Image style={styles.glass} source={require('../../../assets/icons/fullGlass.png')} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => increament()}
          >
            <View>
              <Image
                style={styles.glass}
                source={require('../../../assets/icons/emptyGlass.png')}
              />
              <Image style={styles.plus} source={require('../../../assets/icons/plus.png')} />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  };

    const waterArray = new Array(waterGoal).fill(null).map((u, i) => i);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You drank <Text style={styles.waterText}>{waterDone ? waterDone : ''} glasses</Text>{' '}
            today
          </Text>
        </View>
        <View style={styles.photoContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={waterArray}
            renderItem={renderGlass}
            // extraData={this.state}
            keyExtractor={item => `${item}`}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{waterDone*50} ml</Text>
            <Text style={styles.secText}>Water Drank</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{waterGoal} glasses</Text>
            <Text style={styles.secText}>Daily goal</Text>
          </View>
        </View>
        <View
          style={
            waterDone <= waterGoal / 2
              ? styles.redContainer
              : styles.greenContainer
          }
        >
          <Text
            style={
              waterDone <= waterGoal / 2 ? styles.redText : styles.greenText
            }
          >
            {waterDone <= waterGoal / 2
              ? 'You didn\'t drink enough water for today.'
              : 'You drank enough water for now.'}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
{/*          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/goodFace.png')}
              />
              <View style={styles.perfromanceText}>
                <Text style={styles.mainText}>Best Performance</Text>
                <Text style={styles.secText}>Monday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>10</Text>
          </View>

          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/badFace.png')}
              />
              <View style={styles.perfromanceTextContainer}>
                <Text style={styles.mainText}>Worst Performance</Text>
                <Text style={styles.secText}>Sunday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>6</Text>
          </View>
*/}
          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
               <View style={styles.check2}>
                   <Text style={styles.mainText}>Set Daily Water Goal:</Text>
               </View>
               <View style={styles.check1}>
                    <TextInput style={styles.inputs}
                    placeholder=" "
                    underlineColorAndroid='transparent'
                    keyboardType='text'
                    value={waterGoal}
                    onChangeText={(waterGoal) => setwaterGoal(waterGoal)}/>
                </View>
             </View>
          </View>
       
        <View style={styles.performanceContainer}>
            <View style={styles.steps}>
               <View style={styles.filter1}>
                  <Text style={styles.setGoal1}>Filter By Date</Text>
                </View>
                <View style={styles.picker}>

                  {/* <Picker
                    style={{ height:40, width: 110, }}
                   >
                    <Picker.Item label="Earliest Date " value="00" />
                    <Picker.Item label="23 june " value="23 june" />
                   </Picker> */}
                </View>
            
                <View style={styles.filter2}>
                  <Text style={styles.setGoal2}> To </Text>
                </View>
                <View style={styles.picker}>
                  {/* <Picker
                    style={{ height: 40, width: 110, }}
                   >    
                    <Picker.Item label="Latest Date " value=" " />
                    <Picker.Item label="21 june " value="21 june" />
                   </Picker> */}
                </View>
           </View>
        </View>

      <View style={styles.performanceContainer}>
       <View style={styles.waterin}>
         <View style={styles.colmlist}>
              <View style={styles.colmview}>
                  <Text style={styles.greenText22}> Date </Text>
               </View>
              <View style={styles.line} />
              <View style={styles.colmview}>
                  <Text style={styles.greenText22}> Water Intake </Text>
               </View>
         </View>
         {dates.map((d, index)=>{
           return(
             <View style={styles.steps}>
                  <View style={styles.colmview}>
                      <Text style={styles.address}> {d} </Text>
                   </View>
                  <View style={styles.line1} />
                  <View style={styles.colmview}>
                      <Text style={styles.address}> {datas[index]} Cups</Text>
                   </View>
             </View>
           )
         })}
  

      </View>
    </View>

        <View style={styles.statisticContainer}>
           <Text style={styles.statisticTxt}>Statistic</Text>
            <LineChart
              data={{
                labels: tareekh,
                datasets: [
                  {
                    data: datas,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16} // from react-native
              height={240}
              yAxisLabel={' '}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#f5bf1d',
                backgroundGradientTo: '#ed800c',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
       </View>
       </View>
      </ScrollView>
    );
  }

// const mapStateToProps = (state) => {
//   return {
//     waterDone: state.water.waterDone,
//     waterGoal: state.water.waterGoal
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     incrementWater: () => dispatch({ type: 'INCREMENT_WATER' }),
//     decrementWater: () => dispatch({ type: 'DECREMENT_WATER' }),
//     updateWater: (waterDone, waterGoal) => dispatch({ type: 'update', waterDone:waterDone, waterGoal: waterGoal }),
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WaterScreen);
export default WaterScreen;
