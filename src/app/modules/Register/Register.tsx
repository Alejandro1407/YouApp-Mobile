import React, { Component, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StatusBar, Image, Button, StyleSheet, Modal, ScrollView} from "react-native";
import { loginStyles } from "@src/styles/General";
import MyTextInput from "@src/styles/MyTextInput";
import InputBox from "@src/styles/InputBox";
import { Icon } from "react-native-elements";
import colors from "@src/styles/Colors";
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function RegisterScreen(props:any){
    const [state, setState] = useState([
        {filePath: ''},
        {fileData: '../resource/img/user.png'},
        {fileUri: ''}
    ])
    const [datevisiblity, setDatevisibility] = useState(false);
    const [fecha, setFecha] = useState('');
    const {navigation} = props;
    const [foto, setFoto] = useState(false);
    const [profile, setProfile] = useState(false);

    const showFoto = () => {
        setFoto(true);
    }
    const hideFoto = () => {
        setFoto(false);
    }
    const showModal = () =>{
        setDatevisibility(true);
    }
    const hideModal = () =>{
        setDatevisibility(false);
    }
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        setFecha(date.toLocaleDateString('es-ES', opciones));
        hideModal();
    };

    const cameraLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        launchCamera(options, (res) => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res));
                setState({
                    filePath: res,
                    fileData: res.data,
                    fileUri: res.assets[0].uri
                });
                setProfile(true);
            }
        });
    }
    
      const imageGalleryLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        launchImageLibrary(options, (res) => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res.assets[0].uri };
                console.log('response', JSON.stringify(res));
                setState({
                    filePath: res,
                    fileData: res.data,
                    fileUri: res.assets[0].uri
                });
                setProfile(true);
                console.log("La imagen es " + res.assets[0].data)
            }
        });
    }
    
    const profileFoto = () => {
        if(!profile){
            return(
                <Icon name='user-circle' color={colors.ACCENT} type='font-awesome' size={100}/>
            );
        }
        else{
            return(
                <Image
                    source={{ uri: state.fileUri}}
                    style={{ width: 100, height: 100, borderRadius:100}}
                />
            );
        }
    }

    const chosseFoto = () => {
        if(!profile){
            return(
                <Icon name='user-circle' color={colors.GRAY1} type='font-awesome' size={200}/>
            );
        }
        else{
            return(
                <Image
                    source={{ uri: state.fileUri}}
                    style={{ width: 200, height: 200, borderRadius:100}}
                />
            );
        }
    }

    const start = {x: 0, y: 0};
    const end = {x: 1, y: 0};

    return(
        <>
            <Modal transparent={true} animationType="slide" visible={foto} onRequestClose={() => {
                alert('Modal has been closed.')
            }} >
                <View style={styles.vistaModal}>
                    <View style={styles.Modal}>
                        <Text style={styles.titulo}>
                            Cambiar foto de perfil
                        </Text>
                        <View style={{alignItems: 'center', margin: 25, width:200}}>
                            {chosseFoto()}
                        </View>
                        <TouchableOpacity onPress={cameraLaunch} style={styles.button}  >
                            <Text style={styles.buttonText}>Tomar una foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={imageGalleryLaunch} style={styles.button}  >
                            <Text style={styles.buttonText}>Escoger una imagen de la galeria</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={hideFoto} style={styles.button2}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setProfile(true);
                                    hideFoto()
                                }} style={styles.button3}
                            >
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <View style={[loginStyles.container, {padding: 50,}]}>
                    <Text style={{color: colors.PRIMARY, fontSize: 25, marginBottom:25}}>
                        Crea una cuenta...
                    </Text>
                    <TouchableOpacity onPress={showFoto}>
                        <View>
                            {profileFoto()}
                        </View>
                    </TouchableOpacity> 
                    <InputBox keyboardType='default' placeholder='Nombre' image='user' />
                    <InputBox keyboardType='default' placeholder='Apellido' image='user'/>
                    <InputBox keyboardType='email-address' placeholder='Correo' image='envelope-o' />
                    <InputBox keyboardType='default' placeholder='Nombre de usuario' image='user-circle-o' />
                    <InputBox keyboardType={null} placeholder='Ingrese su contraseña' image='lock' secureTextEntry={true} />
                    <InputBox keyboardType={null} placeholder='Confirme contraseña' image='lock' secureTextEntry={true} />
                    <TouchableOpacity style={{width: 300}} onPress={showModal}>
                        <InputBox
                            editable={false}
                            placeholder='Fecha de nacimiento'
                            image='calendar'
                            value={fecha}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={datevisiblity}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideModal}
                        locale='es_ES'
                    />
                    <View style={loginStyles.btnMain}>
                        <TouchableOpacity>
                            <LinearGradient start={start} end={end} 
                            style={{
                                flexDirection: 'row', 
                                padding:15,
                                borderRadius: 60
                            }} 
                            colors={colors.LINEARGRADIENT1}
                            >
                                <Image source={require('@assets/add.png')} tintColor={colors.GRAY5}
                                    style={{
                                    width: 32,
                                    height: 32,
                                    marginLeft: 40

                                    }}
                                />
                                <Text style={loginStyles.btntxt}>Registrarse</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        color: colors.GRAY1
    },
    date:{
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 12,
        color: colors.ACCENT,
        fontFamily: "Poppins-Light",
        borderBottomColor: colors.ACCENT,
        borderBottomWidth: 2,
    },
    vistaModal:{
        backgroundColor: '#000000aa',
        flex: 1,
    },
    Modal:{
        backgroundColor: '#fff',
        margin: 50,
        padding: 40,
        borderRadius: 10,
        flex: 1,
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12    
    },
    button2: {
        width: 100,
        height: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin:12    
    },
    button3: {
        width: 100,
        height: 40,
        backgroundColor: '#00cb34',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin:12    
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
    titulo:{
        fontWeight: 'bold',
        fontSize:24,
        marginVertical:10,
        width: 250
    },
})