import { View, Text,SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function page() {

  const [empID, setEmpID] = React.useState('');
  const [droneID, setDroneID] = React.useState('');
  const [batteryID, setBatteryID] = React.useState('');
  const [startVoltage, setStartVoltage] = React.useState('');

  return (
    <SafeAreaView className='flex flex-col h-full justify-center items-center'>
      <View className='flex flex-col w-5/6 h-screen justify-center items-center gap-4'>
      <Text className='text-3xl font-semibold'>START FLIGHT</Text>
      <View className='flex flex-col justify-center h-3/5 w-full gap-3'>
        <TextInput value={} onChangeText={} placeholder='select Project' className='border-b-2 w-full'/>
        <TextInput value={empID} onChangeText={setEmpID} placeholder='Employee ID :' className='border-b-2 w-full'/>
        <TextInput value={droneID} onChangeText={setDroneID} placeholder='Drone ID :' className='border-b-2 w-full'/>
        <TextInput value={batteryID} onChangeText={setBatteryID} placeholder='Battery ID :' className='border-b-2 w-full'/>
        <TextInput value={startVoltage} onChangeText={setStartVoltage} placeholder='Start Voltage in Volts :' className='border-b-2 w-full'/>
      </View>
      <TouchableOpacity className='p-3 w-3/4 border rounded-full items-center'>
        <Text>Submit</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}