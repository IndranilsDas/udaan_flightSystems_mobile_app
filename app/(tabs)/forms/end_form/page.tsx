import { View, Text,SafeAreaView, TextInput,TouchableOpacity,Modal } from 'react-native'
import React, { useEffect } from 'react'
import { db } from '@/db';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function page() {

  const [empID, setEmpID] = React.useState('');
  const [endVoltage, setEndVoltage] = React.useState('');
  const [flightTime, setFlightTime] = React.useState('');
  const [flightArea, setFlightArea] = React.useState('');
  const [remarks, setRemarks] = React.useState('');
  const [pendingObjID , SetPendingObjID] = React.useState('')
  const [pending, SetPending] = React.useState(false)
  const [continuing , SetContinue] = React.useState(false)

  console.log("empID : ", empID, 'endVoltage : ', endVoltage, 'flightTime : ', flightTime, 'flightArea : ', flightArea, 'remarks : ', remarks);
  
  async function updateEndFlightData() {
  try {
    // Get the stored ID
    if (!pendingObjID || !continuing) throw new Error("No stored flight ID found");

    const id = pendingObjID

    // Update the row in DB
    await db.runAsync(
      `UPDATE flightData 
       SET endVoltage = ?, flightTime = ?, flightArea = ?, remarks = ?,status = ?
       WHERE id = ?`,
      [endVoltage, flightTime, flightArea, remarks, "Completed", id]
    );

    console.log(`✅ Flight data updated for ID ${id}`);
  } catch (error) {
    console.error("❌ Error updating flight data:", error);
  }
}
  
  useEffect(()=>{
    async function getLastObject(){
    const last_obj = await AsyncStorage.getItem('last_obj_id');
    const rows = await db.getAllAsync(
      `SELECT * FROM flightData WHERE id = ?`,
      [last_obj]
    );

    if (rows.length > 0) {
      const row = rows[0] as { status?: string };
      console.log("📦 Inserted Row:", row);
      console.log("🔍 Status is:", row.status);
      if (row.status === "pending"){
        SetPending(true)
        SetContinue(true)
        SetPendingObjID(last_obj ?? '')
        setTimeout(() => {
          SetPending(false)
        }, 2000);
      }
    }
  };
  getLastObject();
  },[])
  return (
    <SafeAreaView className='flex flex-col h-full justify-center items-center bg-white'>
      <View className='flex flex-col w-5/6 h-screen justify-center items-center gap-4'>
      <Text className='text-3xl font-semibold'>END FLIGHT</Text>
      <View className='flex flex-col justify-center h-3/5 w-full gap-5'>
        <TextInput value={endVoltage} onChangeText={setEndVoltage} placeholder='End Voltage in Volts :' className='border-b-2 w-full'/>
        <TextInput value={flightTime} onChangeText={setFlightTime} placeholder='Flight time in minutes :' className='border-b-2 w-full'/>
        <TextInput value={flightArea} onChangeText={setFlightArea} placeholder='Flight area in sq/km :' className='border-b-2 w-full'/>
        <TextInput value={remarks} onChangeText={setRemarks} placeholder='Remarks :' className='border-b-2 w-full'/>
      </View>
      <TouchableOpacity className='p-3 w-3/4 border rounded-full items-center' onPress={updateEndFlightData}>
              <Text>Submit</Text>
      </TouchableOpacity>
      <Modal visible={pending} transparent animationType='fade'>
                      <View className='flex-1 justify-center items-center bg-black/50'>
                        <View className='bg-white px-6 py-4 rounded-xl shadow-md'>
                          <Text className='text-gray-700 text-lg font-semibold'>
                            Continuing..!
                          </Text>
                        </View>
                      </View>
                    </Modal>
      </View>
    </SafeAreaView>
  )
}