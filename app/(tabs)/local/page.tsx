import { db } from '../../../db';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

export default function DebugScreen() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        console.log("📂 DB file in use:", db);
        const result = await db.getAllAsync("SELECT * FROM flightData");
        setRows(result);
      } catch (err) {
        console.error("DB check failed", err);
      }
    })();
  }, []);

  const renderHeader = () => (
    <View className="flex-row border-b border-gray-300 bg-gray-200 py-2 px-1">
      <Text className="w-16 text-sm font-bold">ID</Text>
      <Text className="w-24 text-sm font-bold">Emp ID</Text>
      <Text className="w-32 text-sm font-bold">Project</Text>
      <Text className="w-24 text-sm font-bold">Drone ID</Text>
      <Text className="w-24 text-sm font-bold">Battery ID</Text>
      <Text className="w-24 text-sm font-bold">Start V</Text>
      <Text className="w-24 text-sm font-bold">End V</Text>
      <Text className="w-24 text-sm font-bold">Flight Time</Text>
      <Text className="w-32 text-sm font-bold">Flight Area</Text>
      <Text className="w-40 text-sm font-bold">Remarks</Text>
      <Text className="w-24 text-sm font-bold">Status</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row border-b border-gray-300 py-2 px-1">
      <Text className="w-16 text-sm">{item.id}</Text>
      <Text className="w-24 text-sm">{item.empId}</Text>
      <Text className="w-32 text-sm">{item.projectName}</Text>
      <Text className="w-24 text-sm">{item.droneId}</Text>
      <Text className="w-24 text-sm">{item.batteryId}</Text>
      <Text className="w-24 text-sm">{item.startVoltage}</Text>
      <Text className="w-24 text-sm">{item.endVoltage}</Text>
      <Text className="w-24 text-sm">{item.flightTime}</Text>
      <Text className="w-32 text-sm">{item.flightArea}</Text>
      <Text className="w-40 text-sm">{item.remarks}</Text>
      <Text className="w-24 text-sm">{item.status}</Text>
    </View>
  );

  return (
    <ScrollView horizontal className='bg-white'>
      <View>
        {renderHeader()}
        <FlatList
          data={rows}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
}
