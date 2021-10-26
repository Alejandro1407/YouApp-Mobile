import {StyleSheet} from 'react-native';
import Colors from './Colors';

//Estilos para SplashScreen
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
  button: {
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
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  Header: {
    flexDirection: 'row',
    marginTop: 56,
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
    width: 370,
  },

  iconSearch: {
    marginTop: 15,
    marginHorizontal: 17.67,
  },

  textInput: {
    color: Colors.GRAY3,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    width: 275,
  },

  playBox: {
    flexDirection: 'row',
    marginTop: 20,
  },

  playText: {
    marginLeft: 40,
    marginRight: 248,
    color: Colors.GRAY5,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },

  palyArrow: {
    marginTop: 9,
  },

  playlistBoxes: {
    flexDirection: 'row',
    marginTop: 16,
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

export {loginStyles, splashStyles, modalStyles, homeStyles};
