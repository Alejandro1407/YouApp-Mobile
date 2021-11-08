import {Dimensions, StyleSheet} from 'react-native';
import Colors from './Colors';

const {width, height} = Dimensions.get('screen');

const splashStyles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  animated_text: {
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
    fontSize: 24,
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  animated_text_margin: {
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
    fontSize: 24,
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginTop: 28,
  },
  animated_image: {
    width: 166,
    height: 166,
    marginTop: 164,
  },
});

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  logo: {
    paddingTop: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  txtTittle: {
    marginTop: 15,
    fontSize: 28,
    color: Colors.PRIMARY,
    fontWeight: '900',
  },
  btnMain: {
    textAlign: 'center',
    width: 280,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.ACCENT,
    borderRadius: 60,
  },

  btnTransparent: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: Colors.ACCENT,
    width: 280,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 60,
  },

  btntxt: {
    textAlign: 'center',
    fontSize: 17,
    color: Colors.WHITE,
    fontFamily: 'Poppins-Bold',
    marginLeft: 15,
  },

  txtTransparent: {
    color: Colors.ACCENT,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-Light',
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

const modalStyles = StyleSheet.create({
  vistaModal: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  Modal: {
    backgroundColor: Colors.BACKGROUND,
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1,
  },
  button1: {
    width: 250,
    height: 60,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderColor: Colors.ACCENT,
    borderWidth: 2,
    borderRadius: 60,
  },
  button2: {
    width: 100,
    height: 40,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 60,
  },
  button3: {
    width: 100,
    height: 40,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    borderColor: Colors.BORDER,
    borderWidth: 2,
    borderRadius: 60,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
    width: 250,
    color: Colors.PRIMARY,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.BAKCGROUND1,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    width: width,
    height: height,
  },

  Header: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
  },

  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginLeft: 24,
    color: Colors.PRIMARY,
  },

  Exit: {
    marginLeft: '55%',
    marginTop: 6,
  },

  inputSearch: {
    flexDirection: 'row',
    backgroundColor: Colors.INPUTSER,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.INPUTSER,
    marginHorizontal: 24,
    marginTop: 20,
    width: width * 0.9,
    height: height * 0.05,
  },
  iconSearch: {
    marginTop: 7,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    color: Colors.GRAY3,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    width: width * 0.9,
  },

  playBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginTop: 20,
    marginRight: 30,
  },

  playText: {
    color: Colors.GRAY5,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },

  palyArrow: {
    marginTop: 9,
  },
  playlistBoxes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  searchBoxes: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  playlistTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.GRAY5,
    marginTop: 12,
  },

  playlistText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.GRAY5,
    marginTop: 4,
  },

  favIcon: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: Colors.INPUTSER,
    marginLeft: 24,
    marginRight: 12,
  },

  favTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.GRAY5,
    marginTop: 12,
  },

  favSubTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.GRAY5,
    marginTop: 4,
  },
});

const musicStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#220037',
  },

  maiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },

  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.ACCENT,
  },

  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: Colors.ACCENT,
  },

  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },

  progressLabelContainer: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ProgressLabelTxt: {
    color: Colors.GRAY5,
  },

  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  bottomContainer: {
    borderTopColor: Colors.GRAY2,
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 10,
  },

  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export {
  loginStyles,
  splashStyles,
  modalStyles,
  homeStyles,
  musicStyles,
  modalStyles,
};
