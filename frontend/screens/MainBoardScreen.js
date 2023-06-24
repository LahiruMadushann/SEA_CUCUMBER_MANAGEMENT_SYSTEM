import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function MainBoardScreen() {
    return (
        <SafeAreaView >
            <StatusBar barStyle="dark-content" />
            <View className="absolute w-[854px] h-[499px] left-[-232px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
                <View>
                    <Image source={require('../assets/main_board/arrow.png')} className="w-[24.22px] h-[24.22px] center" />
                </View>
                <View>
                    <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[170px]">Main Board</Text>
                </View>
            </View>
            <View className="mt-[130px] mx-12" >
                <TouchableOpacity
                    className="w-[269px] h-[140px] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/fishing.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[22px] font-bold flex-auto mt-[-45px] ml-24">Fisheries</Text>
                        <Text className="text-center text-[12px] mt-4 ml-[39px] mr-8 flex-auto ">Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry."
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-[24px] mx-12">
                <TouchableOpacity
                    className="w-[269px] h-[140px] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/farming.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[22px] font-bold flex-auto mt-[-45px] ml-24">Farming</Text>
                        <Text className="text-center text-[12px] mt-4 ml-[39px] mr-8 flex-auto ">Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry."
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-[24px] mx-12">
                <TouchableOpacity
                    className="w-[269px] h-[140px] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/knowledge.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[22px] font-bold flex-auto mt-[-45px] ml-24">Knowledge</Text>
                        <Text className="text-center text-[12px] mt-4 ml-[39px] mr-8 flex-auto ">Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry."
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}