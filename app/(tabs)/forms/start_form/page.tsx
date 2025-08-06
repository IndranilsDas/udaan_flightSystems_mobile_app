import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Page() {
  const router = useRouter();

  const [empID, setEmpID] = useState('');
  const [droneID, setDroneID] = useState('');
  const [batteryID, setBatteryID] = useState('');
  const [startVoltage, setStartVoltage] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dropdown data from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get('http://192.168.0.26/flightsystem/getprojectdetails.php');

        // Format your data here: Must contain label and value
        const formatted = response.data.map((item: { project_name: string; project_id: string }) => ({
          label: item.project_name,   // change this according to your actual key
          value: item.project_id,     // change this too
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

  const handleSubmit = () => {
    // Optional: Post to API
    // console.log({ empID, droneID, batteryID, startVoltage, selectedProject: value });
    router.push('/(tabs)/forms/end_form/page');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="w-5/6 h-screen items-center justify-center gap-4">
          <Text className="text-3xl font-semibold">START FLIGHT</Text>
          <View className="w-full h-3/5 justify-center gap-3">
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
                placeholderStyle={{ fontSize: 16, color: 'black' }}
                selectedTextStyle={{ fontSize: 16, color: 'black' }}
                data={projects}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Project' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            )}

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
