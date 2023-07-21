import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PopupScreen from '../components/PopupScreen';
import FooterBar from '../components/FooterBar';
import { notifications } from '../components/Notification';

export default function NotificationScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView className="bg-[#fff]">
            <SafeAreaView>

                <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
                    <View className="mt-[58vh] ">
                        <View className="flex-row ">
                            <View className=" ml-[4vw]">
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MainBoard')}
                                >
                                    <View className="flex m-[auto] ">
                                        <Image source={require('../assets/main_board/arrow.png')} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View className=" ml-[11vw]">
                                <View className="flex m-[auto] absolute ">
                                    <PopupScreen />
                                </View>
                            </View>
                        </View>

                        <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">Notification</Text>
                        <View className="mt-[4vh] mx-auto">
                            <Image source={require('../assets/notification/notMain.png')} className=" w-[158px] h-[129px]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] " />
                        </View>
                    </View>
                </View>
                <View className="mt-[50vh] mx-auto">
                    {notifications}
                </View>

                <View className="mt-[4vh]">
                    <FooterBar />
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}
