import { Text, View, Image, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { Component,useState } from 'react'

export default function page() {

  const [empID, SetEmpID] = useState('')
  const [password, setPassword] = useState('')

  console.log("empID : ", empID,'password : ', password)

  return (<SafeAreaView className='flex flex-col h-full items-center justify-center'>
        <View className='flex flex-col w-5/6 h-3/4 gap-4 items-center ring'>
        <Image source={require('../../../../assets/images/PFEPL.png')} className='h-20 w-24'></Image>
        <Text className='text-3xl text-black py-4 font-semibold'>Login</Text>
        <View className='flex flex-col h-1/2 w-full justify-center gap-3'>
        <Text className='text-[1.1rem]'>Employee ID :</Text>
        <TextInput placeholder='Enter Your Employee ID:' value={empID} onChangeText={SetEmpID} className='border placeholder:text-gray-400 placeholder:px-3 border-gray-300 rounded-xl'></TextInput>
        <Text className='text-[1.1rem] pt-2'>Password :</Text>
        <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} className='border placeholder:text-gray-400 placeholder:px-3 border-gray-300 rounded-xl'></TextInput>
        <View className='flex items-center py-6'>
          <TouchableOpacity className='p-3 w-3/4 border rounded-full items-center'>
          <Text>Submit</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
      </SafeAreaView>
  )
}