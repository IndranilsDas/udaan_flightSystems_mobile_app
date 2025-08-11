import { View, Text,Image,SafeAreaView,TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/libs/auth-context'
import { useRouter,Link } from 'expo-router';

export default function page() {
  const router = useRouter()
  const {user, logout} = useAuth()
  useEffect(()=>{
  if (!user){
  router.push('/(tabs)/users/login/page')
  }
  },[])

  function startForm(){
    router.push('/(tabs)/forms/start_form/page')
  }

  return (
    <SafeAreaView className='flex flex-col h-full items-center justify-center bg-white'>
          <View className='flex flex-col w-5/6 h-3/4 gap-4 items-center justify-center'>
            <Image
              source={require('../../../assets/images/PFEPL.png')}
              className='h-20 w-24'
            />
            <Text className='text-3xl text-black py-4 font-semibold'>Welcome !</Text>
            <View className='h-1/4 flex flex-col w-full justify-center items-center gap-10'>
              <TouchableOpacity className='p-3 w-3/4 border rounded-lg items-center' onPress={startForm}>
              <Text>Fill flight details</Text>
              </TouchableOpacity>
              <TouchableOpacity className='p-3 w-1/4 border rounded-lg items-center' onPress={logout}>
              <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
  )
}