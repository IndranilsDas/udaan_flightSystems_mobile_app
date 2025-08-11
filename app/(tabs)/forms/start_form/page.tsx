import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import axios from 'axios';
import {db} from '../../../../db';
import { useAuth } from '../../../../libs/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
  const router = useRouter();
  const [empID, setEmpID] = useState('');
  const [droneID, setDroneID] = useState('');
  const [batteryID, setBatteryID] = useState('');
  const [startVoltage, setStartVoltage] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject,SetSelectedProject] = useState('')
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  // Fetch dropdown data from API
  
  async function postIntoLocalDb() {
  try {
    const result = await db.runAsync(
      `INSERT INTO flightData 
        (empId, projectName, droneId, batteryId, startVoltage, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user?.empID ?? '',    // empId
        value ?? '',// projectName
        droneID ?? '',        // droneId
        batteryID ?? '',      // batteryId
        startVoltage ?? '',   // startVoltage
        "pending"             // status
      ]
    );
    console.log("✅ Start form data saved locally with status = pending");
    const obj_id = JSON.stringify(result.lastInsertRowId)
    await AsyncStorage.setItem('last_obj_id', obj_id);
  } catch (error) {
    console.error("❌ Error inserting into local DB:", error);
  }
}

  useEffect(()=>{
    if (!user){
      router.replace('/(tabs)/users/login/page')
    }else{setEmpID(user.empID)}
  },[])


  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get('http://192.168.0.26/flightsystem/getprojectdetails.php');

        // Format your data here: Must contain label and value
        const formatted = response.data.map((item: { project_name: string; project_id: string }) => ({
          label: item.project_name,   // change this according to your actual key
          value: item.project_name,     // change this too
        }));

        setProjects(formatted);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching projects:', error.message);
        } else {
          console.error('Error fetching projects:', error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

const handleSubmit = async () => {
  await postIntoLocalDb();
  router.push('/(tabs)/forms/end_form/page');
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="w-5/6 h-screen items-center justify-center gap-4">
          <Text className="text-3xl font-semibold">Start flight</Text>
          <View className="w-full h-3/5 justify-center gap-5">
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Dropdown
                style={{
                  height: 50,
                  borderColor: isFocus ? 'blue' : 'gray',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                placeholderStyle={{ fontSize: 16, color: 'black',textAlign:'center' }}
                selectedTextStyle={{ fontSize: 16, color: 'black',textAlign:'center' }}
                data={projects}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? '---Select Project---' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                SetSelectedProject(item.value); // ✅ updates your state
                setIsFocus(false);
              }}
              />
            )}

            <TextInput
              value={empID}
              onChangeText={setEmpID}
              placeholder="Employee ID :"
              className="w-full text-base text-black bg-gray-300 border rounded-lg placeholder:px-4"
              editable={false}
            />
            <TextInput
              value={droneID}
              onChangeText={setDroneID}
              placeholder="Drone ID :"
              className="border-b-2 w-full text-base text-black rounded-lg placeholder:px-4"
            />
            <TextInput
              value={batteryID}
              onChangeText={setBatteryID}
              placeholder="Battery ID :"
              className="border-b-2 w-full text-base text-black rounded-lg placeholder:px-4"
            />
            <TextInput
              value={startVoltage}
              onChangeText={setStartVoltage}
              placeholder="Start Voltage in Volts :"
              className="border-b-2 w-full text-base text-black rounded-lg placeholder:px-4"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity onPress={handleSubmit} className="p-3 w-3/4 border rounded-full items-center text-black">
            <Text className="text-black">Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}