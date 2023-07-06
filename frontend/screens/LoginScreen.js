import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View className="absolute w-[634px] h-[340px] left-[-132px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="ml-4">
                        <Image source={require('../assets/main_board/arrow.png')} className="w-[24.22px] h-[24.22px] center" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[166px]">Login</Text>
                </View>
            </SafeAreaView>
            <View className="mt-[167px] form space-y-2">
                <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl w-64 ml-[188px] mb-3"
                    value=""
                    placeholder="Enter Email here"
                />

                <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl w-64 ml-[188px] mb-3"
                    value=""
                    placeholder="Enter Password here"
                />
            </View>
        </View>
    )
}