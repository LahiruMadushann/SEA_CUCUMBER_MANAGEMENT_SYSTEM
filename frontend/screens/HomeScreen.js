import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Icon from "react-native-feather";
import { StatusBar } from 'expo-status-bar';
import LinearGradient from 'react-native-linear-gradient'

export default function HomeScreen() {
    return (

        <SafeAreaView >
            <StatusBar barStyle="dark-content" />
            <View className="absolute w-[854px] h-[499px] left-[-232px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-3">
                    {/* <Icon.Search height="25" width="25" stroke="gray" /> */}
                
                </View>
            </View>
            <Text>HomeScreen</Text>
            <View className="mt-[405px]">
                <Text className="text-center text-[22px] font-bold">Sea Cucumber Animal</Text>
            </View>
        </SafeAreaView>
        

    )
}