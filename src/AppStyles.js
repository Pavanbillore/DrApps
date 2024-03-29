import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CONTAINER_HEIGHT = 50;
const SCREEN_WIDTH = width < height ? width : height;

export const logoContainer = StyleSheet.create({
  headerContainer: {
    height: CONTAINER_HEIGHT,
    marginTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    alignSelf: 'center',
    width: 60,
    height: 60
  },
  backIcon: {
    width: 25,
    height: 25
  },
  iconContainer: {
    position: 'absolute',
    left: 25,
    top: 10
  }
});

export const registration = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  }
});

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 100
  },
  title: {
    fontWeight: 'bold',
    color: '#2d3142',
    fontSize: 24,
    textAlign: 'center'
  },
  purpleText: {
    color: '#7265E3'
  },
  mainText: {
    fontSize: 20,
    color: '#2d3142'
  },
  secText: {
    color: '#9c9eb9',
    fontSize: 14
  }
});

export const post = StyleSheet.create({
  postContainer: {
    backgroundColor: '#ffff',
    borderColor: '#ffff',
    borderRadius: 10,
    width: '100%',
    paddingTop: 15,
    padding: 30,
    marginBottom: 10
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  authorImg: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10
  },
  authorName: {
    fontSize: 16,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  date: {
    fontSize: 12,
    color: '#9c9eb9'
  },
  postImg: {
    margin: 10,
    width: '100%',
    height: 250,
    borderRadius: 10,
    alignSelf: 'center'
  },
  postTitle: {
    color: '#2d3142',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    width: 26,
    height: 26
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9c9eb9',
    marginRight: 20,
    marginLeft: 5,
    marginTop: 4
  }
});

export const performance = StyleSheet.create({
  detailsContainer: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffff',
    padding: 10
  },
  performanceContainer: {
    width: '95%',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  performanceContainerBorderless: {
    width: '95%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  performanceRowContainer: {
    flexDirection: 'row'
  },
  performanceIcon: {
    alignSelf: 'center',
    width: 24,
    height: 24,
    marginRight: 20
  },
  performanceTextContainer: {
    alignSelf: 'center'
  }
});
