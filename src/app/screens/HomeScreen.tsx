import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class HomeScreen extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={{backgroundColor: 'red'}}> Wenas </Text>
            </View>
        )
    }
}
