import { StyleSheet } from 'react-native';
import { post } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    fontFamily: 'Rubik'
  },
  icon:{
    height: 75,
    width: 90,
    padding:10,
    margin:5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backIcon:{
    width: 25,
    height: 25,
    margin: 10,
    alignSelf: 'center'
  },
cardImg: {
    width: 170,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor:'#7265E3',
    borderWidth:1,
    margin:0
  },
    dailystepview: {
    margin:0,
    padding:1,
    width: '100%',
    //flexDirection:'row',
    //justifyContent: 'center',
    //alignSelf: 'center',
    backgroundColor:'#ffffff',
    borderRadius:0,
    shadowColor: "#00b5ec",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 0.35,
    elevation: 5,
  },
  filter:{
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign:'center',
    margin:8,
  },
  steps:{
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection:'row',
    marginBottom:5,
 },
 inputs:{
    width:120,
    height:40,
    textAlign:'center',
    marginBottom:0,
    borderColor: '#300391',
    borderWidth: 2,
    flex:1,
  },
  check1: {
    width: '30%',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  check2: {
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin:5,
  },
 colm11:{
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin:1,
 },
colm1:{
    width: '30%',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    margin:1,
  },
colmlist:{
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection:'row',
    marginBottom:5,
    borderBottomWidth:2,
    borderBottomColor:'#c1c1c1',
},
 label: {
    margin:8,
    padding:8,
    fontSize: 13,
    color: '#fff',
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    borderWidth:1,
    width:170,
    backgroundColor:'#300391',
    borderRadius:5,
    textAlign:'center',
  },
takepic:{
   textAlign:'center',
   fontSize: 19,
   color: '#000000',
},
date:{
   fontWeight: '800',
   textAlign:'center',
   fontSize: 17,
   margin:2,
   color: '#2d3142',
 },
 share:{
   textAlign:'center',
   fontSize: 14,
   color: '#0a12fc',
   width:300,
 },
 take:{
   textAlign:'center',
   fontSize: 15,
   justifyContent: 'center',
   alignSelf: 'center',
   color: '#0a12fc',
   borderBottomColor:'#0a12fc',
   borderBottomWidth:2,
   width:190,
 },
add:{
   fontWeight: 'bold',
   textAlign:'center',
   fontSize: 12,
   color: '#2d3142',
 },
text:{
   fontWeight: 'bold',
   margin:4,
   textAlign:'center',
   fontSize: 15,
   color: '#2d3142',
},
request:{
  margin:8,
  padding:8,
  fontSize: 15,
  color: '#fff',
  borderColor: '#ffffff',
  justifyContent: 'center',
  alignSelf: 'center',
  fontWeight: 'bold',
  borderWidth:1,
  backgroundColor:'#7265E3',
  borderRadius:5,
  textAlign:'center',
  width:250,
},
only:{
   textAlign:'center',
   fontSize: 14,
   width:330,
   color: '#9facbf',
   margin:8,
},

});

export default styles;
