import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {WebClient} from '@modules/web-client/WebClient';
import {OAuth2Context} from '@environment/OAuth2Context';

import Colors from '@src/styles/Colors';
import { homeStyles, loginStyles } from '@src/styles/General';
import { Navbar } from './Navbar';

export default function UploadScreen() {

  const [nameS, setNameS]= useState('');
  const [genere, setGenere] = useState();
  const [minute, setMinute]= useState('');
  const [second, setSecond]= useState('');
  const [result, setResult] = useState<Array<DocumentPickerResponse> | undefined>();

  // Image file
  const [state, setState] = useState([
    {filePath: ''},
    {fileData: '../resource/img/user.png'},
    {fileUri: ''},
  ]);
  const [base64Photo, setBase64Photo] = useState('');
  const [profile, setProfile] = useState(false);

  // Music function
  const web_client = new WebClient();
  const {authorization} = useContext(OAuth2Context);
  async function chooseFile() {
    // Pick a single file
    try {
      const res: DocumentPickerResponse = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      });
      console.log(res);
      setResult(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  // Image select
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

  const chosseFoto = () => {
    if (!profile) {
      return (
        <Image
          style={uploadStyle.image}
          source={require('@assets/favicon.png')}
        />
      );
    } else {
      return (
        <Image
          source={{uri: state.fileUri}}
          style={uploadStyle.image}
        />
      );
    }
  };

  const data = () => {
    console.log('foto', base64Photo);
    if (nameS == '') {
      ToastAndroid.showWithGravity(
        'Ingrese un nombre de cancion',
        ToastAndroid.LONG,
        5000
      );
    }if (parseInt(minute) < 0 || parseInt(second) < 0){
      ToastAndroid.showWithGravity(
        'Ingrese los minutos y segundos de duracion de su cancnion',
        ToastAndroid.LONG,
        5000
      );
    }else{
      const data = new FormData();
      data.append('title', nameS);
      data.append('genreId', genere);
      data.append('duration', (parseInt(minute)* 60) + parseInt(second));
      data.append('photo', base64Photo); // you can append anyone.
      data.append('file', {
        uri: result.uri,
        type: result.type,
        name: result.name,
      });
      web_client
        .post('/v1/storage/upload', data, undefined, {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + authorization.access_token,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          throw error;
        });
    }

  }

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
      <ScrollView>
        <View style={homeStyles.container}>
          <View style={homeStyles.Header}>
            <Text style={[homeStyles.headerTitle, {marginRight: '45%'}]}>
              Upload Song
            </Text>
          </View>
          <View style={uploadStyle.mainContainer}>
            <Text style={uploadStyle.title}>Track Information</Text>
            <TextInput
              keyboardType="default"
              placeholder="Nombre de Cancion"
              placeholderTextColor={Colors.ACCENT}
              style={uploadStyle.inputContainers}
              value={nameS}
              onChangeText={setNameS}
            />

            <Picker
              selectedValue={genere}
              itemStyle={{backgroundColor: Colors.PRIMARY,}}
              style={uploadStyle.inputContainers}
              onValueChange={(itemValue, itemIndex) =>
                setGenere(itemValue)
              }>
              <Picker.Item style={uploadStyle.selectContainers} label="Rock" value="1" />
              <Picker.Item style={uploadStyle.selectContainers} label="Pop" value="2" />
              <Picker.Item style={uploadStyle.selectContainers} label="Rap" value="3" />
              <Picker.Item style={uploadStyle.selectContainers} label="Electronica" value="4" />
              <Picker.Item style={uploadStyle.selectContainers} label="Metal" value="5" />
              <Picker.Item style={uploadStyle.selectContainers} label="Salsa" value="6" />
              <Picker.Item style={uploadStyle.selectContainers} label="Reggaeton" value="7" />
              <Picker.Item style={uploadStyle.selectContainers} label="Banda" value="8" />
            </Picker>

            <View style={{flexDirection: 'row',}}>
              <TextInput
                keyboardType='default'
                placeholder='Minutos'
                style={[uploadStyle.inputContainers, {width: 150, marginRight: 50,}]}
                placeholderTextColor={Colors.ACCENT}
                value={minute}
                onChangeText={setMinute}
              />
              <TextInput
                placeholder='Segundos'
                keyboardType='default'
                style={[uploadStyle.inputContainers, {width: 150,}]}
                placeholderTextColor={Colors.ACCENT}
                value={second}
                onChangeText={setSecond}
              />
            </View>

            <View style={uploadStyle.imageContainer}>
              {chosseFoto()}
              <TouchableOpacity 
                style={uploadStyle.inputImage}
                onPress={imageGalleryLaunch}
              >
                <Text style={uploadStyle.text}>Seleccionar Foto</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={[uploadStyle.text, {fontSize: 20,}]}>Seleccionar Cancion: </Text>
              <TouchableOpacity
                style={{marginRight: '35%', marginTop: 7,}}
                onPress={chooseFile}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={30}
                    color={Colors.PRIMARY}
                  />
              </TouchableOpacity>
            </View>

          </View>
          <View style={{alignItems: 'center', marginTop: 35,}}>
            <TouchableOpacity 
              style={[loginStyles.btnTransparent, {padding: 10, width: 180, alignItems: 'center',}]}
              onPress={data}
            >
              <Text style={{color: Colors.GRAY5, fontSize: 18}}>Subir cancion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </>
  );
}

const uploadStyle = StyleSheet.create({
  mainContainer: {
    marginLeft: 25,
    marginTop: 30,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.GRAY4,
  },

  inputContainers: {
    width: 350,
    borderBottomWidth: 2,
    borderColor: Colors.ACCENT,
    marginTop: 15,
    color: Colors.ACCENT,
    fontSize: 18,
  },

  selectContainers: {
    width: 350,
    borderBottomWidth: 2,
    borderColor: Colors.PRIMARY,
    marginTop: 15,
    color: Colors.PRIMARY,
    fontSize: 18,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  image: {
    width: 200,
    height: 200,
  },

  inputImage: {
    marginRight: 60,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 40,
    width: 150,
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },

  text: {
    color: Colors.GRAY5,
    marginVertical: 8,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
});
