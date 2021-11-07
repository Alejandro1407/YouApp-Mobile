import React, {Component, useEffect} from 'react';
import { Text, View, StatusBar, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Colors from '@src/styles/Colors';
import { homeStyles } from '@src/styles/General';
import colors from '@src/styles/Colors';

import DocumentPicker, { DirectoryPickerResponse, DocumentPickerResponse, isInProgress, types } from 'react-native-document-picker'



export default function UploadScreen () {
    
    const [result, setResult] = React.useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null >()

    useEffect(() => {
        console.log(JSON.stringify(result, null, 2))
    }, [result]);

    
    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }


    return(
        <>
            <StatusBar backgroundColor={Colors.BACKGROUND} />
            <View style={homeStyles.container}>
                <View style={homeStyles.Header}>
                    <Text style={[homeStyles.headerTitle, { marginRight: '45%'}]}>Upload Song</Text>
                </View>
                <View style={uploadStyle.mainContainer}>
                    <Text style={uploadStyle.title}>Track Information</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Nombre de Cancion'
                        placeholderTextColor={Colors.ACCENT}
                        style={ uploadStyle.inputContainers }
                    />
                    <TextInput
                        keyboardType='default'
                        placeholder='Nombre del artista'
                        placeholderTextColor={Colors.ACCENT}
                        style={ uploadStyle.inputContainers }
                    />

                    <View style={uploadStyle.imageContainer}>
                        <Image style={uploadStyle.image} source={require('@assets/no-image.png')}/>
                        <TouchableOpacity style={uploadStyle.inputImage}>
                            <Text style={uploadStyle.text}>Seleccionar Foto</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 15,}}>
                        <TouchableOpacity style={uploadStyle.inputImage} 
                                          onPress={() => {
                                              DocumentPicker.pick({
                                                  type: types.audio,
                                              })
                                                .then(setResult)
                                                .catch(handleError)
                                          }}>
                            <Text style={uploadStyle.text}>Seleccionar Cancion</Text>
                            <Text style={{color: colors.GRAY5, fontSize: 18,}} selectable>Result: {JSON.stringify(result, null, 2)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
    
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
        color: Colors.GRAY4
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
    }
    
});