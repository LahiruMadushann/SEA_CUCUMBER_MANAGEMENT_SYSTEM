import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View className="absolute w-[634px] h-[340px] left-[-132px] top-[-104px] bg-[#0013C0]  rounded-b-full ">
            <SafeAreaView className="flex ">
                <View className="flex-row justify-start  ">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="ml-4">
                        <Image source={require('../assets/main_board/arrow.png')} className="w-[24.22px] h-[24.22px] center" />
                    </TouchableOpacity>
                </View>
                <View >
                    <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[166px]">Login</Text>
                </View>
            </SafeAreaView>
            <View className="mt-[167px] form space-y-2 mx-auto ">
                <TextInput
                    className="p-4 border-b text-gray-700  w-64  mb-3"
                    value=""
                    placeholder="Enter Email here"
                />

                <TextInput
                    className="p-4 border-b text-gray-700  w-64  mb-3"
                    value=""
                    placeholder="Enter Password here"
                />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('MainBoard')}

            >
                <View className="w-[275px] h-[46px] mx-auto mt-[32px]">
                    <Text className="bg-[#0013C0] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">Login</Text>
                </View>
            </TouchableOpacity>

            <View className="ml-[46.5vw] flex-row mt-[22px]">
                <Text className="text-[#000000BF] text-[14px] ">
                    Forget your Password?
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MainBoard')}

                >

                    <Text className="text-[#0013C0CC] ml-[2vw] text-[14px]">Click here</Text>

                </TouchableOpacity>

            </View>

            <View className="flex-row align-center w-[335px]  mx-[40.5vw] mt-4 " >
                <View className="flex-1 h-px bg-[#0013C080] " />
            </View>


            <View className="ml-[46.5vw] flex-row mt-[22px]">
                <Text className="text-[#000000BF] text-[14px] ">
                    Don't you have account
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MainBoard')}

                >

                    <Text className="text-[#0013C0CC] ml-[2vw] text-[14px]">Sign up</Text>

                </TouchableOpacity>

            </View>

            <View className="ml-[46.5vw] flex-row mt-[12px] mx-auto">
                <Text className="text-[#000000BF] text-[18px]">
                    - or -
                </Text>
            </View>

            <View className="mt-[21px] mx-auto">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Aquaculture')}
                    className="w-[275px] h-[46px] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex-row mt-[13px] mx-auto">
                        <Image source={require('../assets/login/google.png')} className="w-[18px] h-[18.29508px]center" />
                        <Text className="text-center text-4 ml-4 text-[#0013C0CC] ">
                            Continue with Google
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}