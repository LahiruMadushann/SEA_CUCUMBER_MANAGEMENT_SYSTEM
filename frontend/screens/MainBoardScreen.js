import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export default function MainBoardScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView >
            {/* <StatusBar barStyle="dark-content" /> */}
            <View className="absolute w-[854px] h-[499px] left-[-232px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
                <View>
                    <Image source={require('../assets/main_board/arrow.png')} className="w-[24.22px] h-[24.22px] center" />
                </View>
                <View>
                    <Text className="text-center text-[5.6vw] text-[#ffff] font-bold mt-[42vw]">Main Board</Text>
                </View>
            </View>
            <View className="mt-[26vw] mx-auto" >
                <TouchableOpacity
                    onPress={() => navigation.navigate('FishStart')}
                    className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/fishing.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-45px] ml-24">Fisheries</Text>
                        <Text className="text-center text-[12px] mt-1 ml-[24vw] mr-8 flex-auto ">Lorem Ipsum is 
                            simply 
                        </Text>
                        <Text className="text-center text-left text-[12px] mt-[-1vw] ml-[9.8vw] mr-8 flex-auto ">dummy text of the printing and typesetting industry. </Text>

                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-[8vw] mx-auto">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Aquaculture')}
                    className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/farming.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-45px] ml-24">Farming</Text>
                        <Text className="text-center text-[12px] mt-1 ml-[31.2vw] mr-8 flex-auto ">Lorem Ipsum is 
                            simply 
                        </Text>
                        <Text className="text-center text-left text-[12px] mt-[-1vw] ml-[9.8vw] mr-8 flex-auto ">dummy text of the printing and typesetting industry. </Text>

                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-[8vw] mx-auto">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF]  ">
                    <View className="flex ">
                        <Image source={require('../assets/main_board/knowledge.png')} className="w-[73px] h-[55px] ml-[39px] mt-[21px]" />
                        <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-45px] ml-24">Knowledge</Text>
                        <Text className="text-center text-[12px] mt-1 ml-[30vw] mr-8 flex-auto ">Lorem Ipsum is 
                            simply 
                        </Text>
                        <Text className="text-center text-left text-[12px] mt-[-1vw] ml-[9.8vw] mr-8 flex-auto ">dummy text of the printing and typesetting industry. </Text>

                    </View>
                </TouchableOpacity>
                <View className="mt-[5vw] mx-auto">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}

                    >
                        <View className="w-[275px] h-[46px]  ">
                            <Text className="bg-[#5A73F3] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mt-[2vw] mx-auto">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}

                    >
                        <View className="w-[275px] h-[46px]  ">
                            <Text className="bg-[#5A73F3] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    )
}