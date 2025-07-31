import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { AntDesign } from '@expo/vector-icons'

export default function Page() {
  const [empID, setEmpID] = React.useState('')
  const [droneID, setDroneID] = React.useState('')
  const [batteryID, setBatteryID] = React.useState('')
  const [startVoltage, setStartVoltage] = React.useState('')
  const [value, setValue] = React.useState(null)
  const [isFocus, setIsFocus] = React.useState(false)

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ]

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="w-5/6 h-screen items-center justify-center gap-4">
        <Text className="text-3xl font-semibold">START FLIGHT</Text>
        <View className="w-full h-3/5 justify-center gap-3">

          <Dropdown
            style={{
              height: 50,
              borderColor: isFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
              outline: 'none',
            }}
            placeholderStyle={{ fontSize: 16, color: 'black' }}
            selectedTextStyle={{ fontSize: 16, color: 'black' }}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Project' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value)
              setIsFocus(false)
            }}/>
          <TextInput
            value={empID}
            onChangeText={setEmpID}
            placeholder="Employee ID :"
            className="border-b-2 w-full text-base text-black"
          />
          <TextInput
            value={droneID}
            onChangeText={setDroneID}
            placeholder="Drone ID :"
            className="border-b-2 w-full text-base text-black"
          />
          <TextInput
            value={batteryID}
            onChangeText={setBatteryID}
            placeholder="Battery ID :"
            className="border-b-2 w-full text-base text-black"
          />
          <TextInput
            value={startVoltage}
            onChangeText={setStartVoltage}
            placeholder="Start Voltage in Volts :"
            className="border-b-2 w-full text-base text-black"
          />
        </View>

        <TouchableOpacity className="p-3 w-3/4 border rounded-full items-center bg-blue-500">
          <Text className="text-white font-semibold">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
