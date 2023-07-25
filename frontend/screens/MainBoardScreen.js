import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import PopupScreen from '../components/PopupScreen'
import FooterBar from '../components/FooterBar'

export default function MainBoardScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView className="flex-grow bg-white">
            <SafeAreaView >

                {/* <StatusBar barStyle="dark-content" /> */}

                <View className="absolute w-[213vw] h-[75vh] left-[-57vw] top-[-15vh] bg-[#5A73F3]  rounded-b-full ">
                    <View className="flex-row mt-[-74vw]">

                        <View className="mt-[112vw]">
                            <TouchableOpacity
                                onPress={() => navigation.navigate('UserProfile')}
                            >
                                <View className="flex m-[auto] ">
                                    <Image source={require('../assets/profile.png')} className=" w-[24.21875px] h-[24.21875px] ml-[68vw]" />

                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className="mt-[113vw]">

                            <View className="flex m-[auto] absolute ">
                                <PopupScreen />
                            </View>

                        </View>
                    </View>

                    <View>
                        <Text className="text-center text-[5.6vw] text-[#ffff] font-bold mt-[10vw] ">Main Board</Text>
                    </View>
                </View>
                <View className="mt-[35vw] mx-auto" >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FishStart')}
                        className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 ">
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

                <View className="mt-[6vw] mx-auto">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Aquaculture')}
                        className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 ">
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

                <View className="mt-[6vw] mx-auto">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Knowledge')}
                        className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
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
                            <View className="w-[73vw] h-[8vh]  ">
                                <Text className="bg-[#5A73F3] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-[1vw] mx-auto">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}

                        >
                            <View className="w-[73vw] h-[8vh]  ">
                                <Text className="bg-[#5A73F3] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-[4vh]">
                    <FooterBar />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}