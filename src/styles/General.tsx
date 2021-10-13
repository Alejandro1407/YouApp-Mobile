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
  }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.BACKGROUND
  },

  logo: {
      paddingTop: 50,
      alignItems: 'center',
      marginBottom: 40
  },

  txtTittle: {
      marginTop: 15,
      fontSize: 20,
      color: Colors.PRIMARY,
      fontWeight: "900",
  },

  btnMain: {
      width: 280,
      marginTop:40,
      marginBottom: 20,
      backgroundColor: Colors.ACCENT,
      borderRadius: 60
  },

  btnTransparent: {
      backgroundColor: 'rgba(52, 52, 52, 0)',
      borderColor: Colors.ACCENT,
      width: 280,
      borderWidth: 2,
      marginBottom: 20,
      borderRadius: 60
  },

  btntxt: {
      textAlign: 'center',
      fontSize: 17,
      color: Colors.WHITE,
      fontFamily: 'Poppins-Bold',
      marginLeft: 15
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
    borderRadius: 5
  },
})

export { loginStyles, splashStyles }
