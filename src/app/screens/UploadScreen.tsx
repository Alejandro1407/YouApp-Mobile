import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard
} from 'react-native';

import Colors from '@src/styles/Colors';
import {homeStyles} from '@src/styles/General';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Navbar } from './Navbar';

export default function UploadScreen() {

  const [nameS, setNameS]= useState('');
  const [nameArt, setNameArt]= useState('');
  const [minute, setMinute]= useState('');
  const [second, setSecond]= useState('');
  const [duration, setDuration]= useState(null);

  // Image file
  const [state, setState] = useState([
    {filePath: ''},
    {fileData: '../resource/img/user.png'},
    {fileUri: ''},
  ]);
  const [base64Photo, setBase64Photo] = useState('');
  const [profile, setProfile] = useState(false);
  // Document Music
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  // Music function

  async function chooseFile() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res.file
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
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
    const duration = (parseInt(minute)* 60) + parseInt(second);
    console.log("Cancion", nameS);
    console.log("Artista", nameArt);
    console.log("Minuto",  parseInt(minute));
    console.log("Segundo", parseInt(second));
    console.log("Duracion", duration );
    console.log("Imagen base64: ", base64Photo);
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.BACKGROUND} />
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
          <TextInput
            keyboardType="default"
            placeholder="Nombre del artista"
            placeholderTextColor={Colors.ACCENT}
            style={uploadStyle.inputContainers}
            value={nameArt}
            onChangeText={setNameArt}
          />

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

          <View style={{marginTop: 15}}>
            <TouchableOpacity
              style={uploadStyle.inputImage}
              onPress={chooseFile}>
              <Text style={uploadStyle.text}>Seleccionar Cancion</Text>
            </TouchableOpacity>
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
        </View>
        <View>
          <TouchableOpacity 
            style={{alignItems: 'center', marginTop: 15,}}
            onPress={data}
          >
            <Text style={{color: Colors.GRAY5, fontSize: 18}}>DATA</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
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
    fontSize: 16,
  },
});
