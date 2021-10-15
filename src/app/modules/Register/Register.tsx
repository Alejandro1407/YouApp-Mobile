/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import {loginStyles} from '@src/styles/General';
import InputBox from '@src/styles/InputBox';
import {Icon} from 'react-native-elements';
import colors from '@src/styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {YouAppPrincipal} from '@src/app/models/YouAppPrincipal';
import {WebClient} from '../web-client/web-client';

export default function RegisterScreen(props: any) {
  const [state, setState] = useState([
    {filePath: ''},
    {fileData: '../resource/img/user.png'},
    {fileUri: ''},
  ]);
  const [datevisiblity, setDatevisibility] = useState(false);
  //Datos a enviar
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [fecha, setFecha] = useState('');
  const [base64Photo,setBase64Photo] = useState('');
  const {navigation} = props;
  const [foto, setFoto] = useState(false);
  const [profile, setProfile] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);

  const showFoto = () => {
    setFoto(true);
  };
  const hideFoto = () => {
    setFoto(false);
  };
  const showModal = () => {
    setDatevisibility(true);
  };
  const hideModal = () => {
    setDatevisibility(false);
  };
  const confirmarFecha = date => {
    setFecha(date.toISOString().split('T')[0]);
    hideModal();
  };

  const register = () => {
    let payload: YouAppPrincipal = {
      nombres: nombre,
      apellidos: apellido,
      email: correo,
      birthday: fecha,
      password: password,
      photo: selectedPhoto === true ? base64Photo : '',
      username: user,
    };
    console.log(payload);
    WebClient.getInstance()
      .post('http://auth-server:8083/v1/auth/register', JSON.stringify(payload))
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const cameraLaunch = () => {
    let options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
      cameraType: 'front',
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        console.warn('Image capture has been cancelled');
      } else {
        setState({
          filePath: res.assets[0].fileName,
          base64: res.assets[0].base64,
          fileUri: res.assets[0].uri,
        });
        setBase64Photo(res.assets[0].base64);
        setProfile(true);
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setState({
          filePath: res.assets[0].fileName,
          base64: res.assets[0].base64,
          fileUri: res.assets[0].uri,
        });
        setBase64Photo(res.assets[0].base64);
        setProfile(true);
      }
    });
  };

  const profileFoto = () => {
    if (!selectedPhoto) {
      return (
        <Icon
          name="user-circle"
          color={colors.ACCENT}
          type="font-awesome"
          size={100}
        />
      );
    } else {
      return (
        <Image
          source={{uri: state.fileUri}}
          style={{width: 100, height: 100, borderRadius: 100}}
        />
      );
    }
  };

  const chosseFoto = () => {
    if (!profile) {
      return (
        <Icon
          name="user-circle"
          color={colors.GRAY1}
          type="font-awesome"
          size={200}
        />
      );
    } else {
      return (
        <Image
          source={{uri: state.fileUri}}
          style={{width: 200, height: 200, borderRadius: 100}}
        />
      );
    }
  };

  const start = {x: 0, y: 0};
  const end = {x: 1, y: 0};

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={foto}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.titulo}>Cambiar foto de perfil</Text>
            <View style={{alignItems: 'center', margin: 25, width: 200}}>
              {chosseFoto()}
            </View>
            <TouchableOpacity onPress={cameraLaunch} style={styles.button}>
              <Text style={styles.buttonText}>Tomar una foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={imageGalleryLaunch}
              style={styles.button}>
              <Text style={styles.buttonText}>
                Escoger una imagen de la galeria
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={hideFoto} style={styles.button2}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPhoto(true);
                  hideFoto();
                }}
                style={styles.button3}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={[loginStyles.container, {padding: 50}]}>
          <Text style={{color: colors.PRIMARY, fontSize: 25, marginBottom: 25}}>
            Crea una cuenta...
          </Text>
          <TouchableOpacity onPress={showFoto}>
            <View>{profileFoto()}</View>
          </TouchableOpacity>
          <InputBox
            keyboardType="default"
            placeholder="Nombre"
            image="user"
            value={nombre}
            onChangeText={(name: string) => setNombre(name)}
          />
          <InputBox
            keyboardType="default"
            placeholder="Apellido"
            image="user"
            value={apellido}
            onChangeText={(lastname: string) => setApellido(lastname)}
          />
          <InputBox
            keyboardType="email-address"
            placeholder="Correo"
            image="envelope-o"
            value={correo}
            onChangeText={(email: string) => setCorreo(email)}
          />
          <InputBox
            keyboardType="default"
            placeholder="Nombre de usuario"
            image="user-circle-o"
            value={user}
            onChangeText={(userName: string) => setUser(userName)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Ingrese su contraseña"
            image="lock"
            secureTextEntry={true}
            value={password}
            onChangeText={(pass: string) => setPassword(pass)}
          />
          <InputBox
            keyboardType={null}
            placeholder="Confirme contraseña"
            image="lock"
            secureTextEntry={true}
            value={passwordC}
            onChangeText={(pass2: string) => setPasswordC(pass2)}
          />
          <TouchableOpacity style={{width: 300}} onPress={showModal}>
            <InputBox
              editable={false}
              placeholder="Fecha de nacimiento"
              image="calendar"
              value={fecha}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={datevisiblity}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideModal}
            locale="es_ES"
          />
          <View style={loginStyles.btnMain}>
            <TouchableOpacity onPress={register}>
              <LinearGradient
                start={start}
                end={end}
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  borderRadius: 60,
                }}
                colors={colors.LINEARGRADIENT1}>
                <Image
                  source={require('@assets/add.png')}
                  tintColor={colors.GRAY5}
                  style={{
                    width: 32,
                    height: 32,
                    marginLeft: 40,
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
    color: colors.GRAY1,
  },
  date: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 12,
    color: colors.ACCENT,
    fontFamily: 'Poppins-Light',
    borderBottomColor: colors.ACCENT,
    borderBottomWidth: 2,
  },
  vistaModal: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  Modal: {
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
    marginBottom: 12,
  },
  button2: {
    width: 100,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 12,
  },
  button3: {
    width: 100,
    height: 40,
    backgroundColor: '#00cb34',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 12,
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
  },
});
