import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'

export default class page extends Component {
  render() {
    return (
      <View className='flex flex-col h-full items-center justify-center'>
        <View className='flex flex-col w-3/4 h-3/4 justify-center items-center'>
        <Image source={require('../../../../assets/images/PFEPL.png')} className='h-2/7 w-2/7'></Image>
        <Text className=''>Login</Text>
        </View>
      </View>
    )
  }
}