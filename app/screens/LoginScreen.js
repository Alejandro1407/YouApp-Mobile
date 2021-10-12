import React, { Component, useState } from "react";
import { Text, View, TouchableOpacity, StatusBar, Image } from "react-native";
import { loginStyles } from "@styles/styles";
import MyTextInput from "@components/MyTextInput";
import colors from "../styles/colors";

export default function LoginScreen (){

    const [hidePassword, setHidePassword] = useState(false);
    return(
        <View style={[loginStyles.container, {padding: 50}]}>
            <StatusBar backgroundColor={colors.BLUE} translucent={true}/>
            <View style={loginStyles.logo}>
                <Image source={require('@resource/img/nota-musical.png')} tintColor={colors.TXTSECONDARY} style={{ height:100, width: 100 }}/>
            </View>
            <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'/>
            <MyTextInput keyboardType='text' placeholder='Nombre' image='users'/>
            <View style={loginStyles.btnMain}>
                <TouchableOpacity style={{flexDirection: 'row', padding:15}}>
                    <Image source={require('@resource/img/iniciar-sesion.png')} style={{
                        width: 32,
                        height: 32,
                        marginLeft: 40
                        }}/>
                    <Text style={loginStyles.btntxt}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
            <View style={loginStyles.btnTransparent}>
                <TouchableOpacity style={{flexDirection: 'row', padding:15}}>
                    <Image source={require('@resource/img/google.png')} style={{
                        width: 32,
                        height: 32,
                        marginLeft: 30
                        }}/>
                    <Text style={loginStyles.btntxt}>Iniciar con Goole</Text>
                </TouchableOpacity>
            </View>
            <View style={loginStyles.btnTransparent}>
                <TouchableOpacity style={{flexDirection: 'row', padding:15}}>
                    <Image source={require('@resource/img/add.png')} tintColor={colors.TXTTITLE}  style={{
                        width: 32,
                        height: 32,
                        marginLeft: 50
                        }}/>
                    <Text style={loginStyles.btntxt}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text style={[loginStyles.txtTransparent, {textDecorationLine: 'underline'}]}>Olvide mi Contraseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}