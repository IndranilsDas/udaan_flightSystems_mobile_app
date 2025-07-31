import { View, Text,SafeAreaView, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

export default function page() {

  const [empID, setEmpID] = React.useState('');
  const [endVoltage, setEndVoltage] = React.useState('');
  const [flightTime, setFlightTime] = React.useState('');
  const [flightArea, setFlightArea] = React.useState('');
  const [remarks, setRemarks] = React.useState('');

  console.log("empID : ", empID, 'endVoltage : ', endVoltage, 'flightTime : ', flightTime, 'flightArea : ', flightArea, 'remarks : ', remarks);

  return (
    <SafeAreaView className='flex flex-col h-full justify-center items-center'>
      <View className='flex flex-col w-5/6 h-screen justify-center items-center gap-4'>
      <Text className='text-3xl font-semibold'>END FLIGHT</Text>
      <View className='flex flex-col justify-center h-3/5 w-full gap-3'>
        <TextInput value={empID} onChangeText={setEmpID} placeholder='Employee ID :' className='border-b-2 w-full'/>
        <TextInput value={endVoltage} onChangeText={setEndVoltage} placeholder='End Voltage in Volts :' className='border-b-2 w-full'/>
        <TextInput value={flightTime} onChangeText={setFlightTime} placeholder='Flight time in minutes :' className='border-b-2 w-full'/>
        <TextInput value={flightArea} onChangeText={setFlightArea} placeholder='Flight area in sq/km :' className='border-b-2 w-full'/>
        <TextInput value={remarks} onChangeText={setRemarks} placeholder='Remarks :' className='border-b-2 w-full'/>
      </View>
      <TouchableOpacity className='p-3 w-3/4 border rounded-full items-center'>
              <Text>Submit</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}