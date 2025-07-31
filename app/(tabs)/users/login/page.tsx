import { Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

export default function Page() {
  const [empID, setEmpID] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter();

  async function handleLogin() {
    if (password !== '' && empID !== '') {
      if (password === 'password' && empID === 'empid') {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push('/(tabs)/forms/start_form/page');
        }, 2000);
      }
    }
  }

  return (
    <SafeAreaView className='flex flex-col h-full items-center justify-center'>
      <View className='flex flex-col w-5/6 h-3/4 gap-4 items-center'>
        <Image source={require('../../../../assets/images/PFEPL.png')} className='h-20 w-24' />
        <Text className='text-3xl text-black py-4 font-semibold'>Login</Text>
        <View className='flex flex-col h-1/2 w-full justify-center gap-3'>
          <Text className='text-[1.1rem]'>Employee ID :</Text>
          <TextInput
            placeholder='Enter Your Employee ID:'
            value={empID}
            onChangeText={setEmpID}
            className='border placeholder:text-gray-400 placeholder:px-3 border-gray-300 rounded-xl'
          />
          <Text className='text-[1.1rem] pt-2'>Password :</Text>
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className='border placeholder:text-gray-400 placeholder:px-3 border-gray-300 rounded-xl'
          />
          <View className='flex items-center py-6'>
            <TouchableOpacity className='p-3 w-3/4 border rounded-full items-center' onPress={handleLogin}>
              <Text>Submit</Text>
            </TouchableOpacity>
            {success && (
              <Modal visible={success} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                  <View className="bg-white px-6 py-4 rounded-xl shadow-md">
                    <Text className="text-green-700 text-lg font-semibold">
                      Login Successful!
                    </Text>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
