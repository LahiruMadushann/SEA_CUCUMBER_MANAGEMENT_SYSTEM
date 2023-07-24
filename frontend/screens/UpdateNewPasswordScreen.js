import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PopupScreen from '../components/PopupScreen';
import FooterBar from '../components/FooterBar';


export default function UpdateNewPasswordScreen() {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleUpdatePassword = () => {
        // Update password
    };


    return (
        <SafeAreaView>
            <ScrollView className="bg-[#fff]">
                <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
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

                        <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">New Password</Text>
                    </View>
                </View>

                <View className="mt-[36vh]">

                    <View>
                        <Text className="text-[14px] text-center text-gray-600">You have a Problem?</Text>
                        <Text className="text-[22px] font-bold text-center text-gray-600">Don’t Worry!</Text>
                    </View>

                    <View className="mt-[6vh]">
                        <TextInput
                            className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New Password"
                            secureTextEntry
                        />
                        <TextInput
                            className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                            placeholder="Confirm New Password"
                            secureTextEntry
                        />
                    </View>

                    <View className="mt-[2vh]">
                        <TouchableOpacity
                            className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                            onPress={handleUpdatePassword}
                        >
                            <Text className="text-[#fff] text-[18px] font-bold text-center">Update New Password</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View className="mt-[20vh]">
                    <FooterBar />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

