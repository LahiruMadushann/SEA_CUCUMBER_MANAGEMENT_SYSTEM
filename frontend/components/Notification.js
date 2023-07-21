import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from 'react-native';

export const notifications = [];
for (let i = 0; i < 4; i++) {
    notifications.push(
        <TouchableOpacity
            onPress={() => navigation.navigate('FishRegister')}
            className="w-[82vw] h-[12.5vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
        >
            <View className="w-[143px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
                <Image source={require('../assets/notification/calender.png')} className="w-[13px] h-[15px] ml-[10vw]" />
                <Text className="text-[11px] font-bold text-[#000000A6] ml-auto">26th june,2023</Text>
            </View>

            <View className="flex ml-[2.5vw]">
                <Image source={require('../assets/notification/bell.png')} className="w-[18px] h-[20px] ml-[39px] mt-[1vw]" />
                <Text className="text-center text-[11px] font-bold flex-auto mt-[-5vw] ml-[-12vw] ">Today Offers for Fisher-mans</Text>
            </View>
        </TouchableOpacity>
    );
}