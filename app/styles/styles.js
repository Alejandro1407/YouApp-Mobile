import { StyleSheet } from "react-native";
import colors from "./colors";

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.BGPRIMARY
    },

    logo: {
        paddingTop: 50,
        alignItems: 'center',
    },

    btnMain: {
        width: 280,
        marginTop:40,
        marginBottom: 20,
        backgroundColor: colors.BLUE2,
        borderRadius: 60
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: colors.BLUE2,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.WHITE,
        fontFamily: 'Poppins-Bold',
        marginLeft: 15
    },

    txtTransparent: {
        color: colors.BLUE2,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    }
})

export { loginStyles, splashStyles }