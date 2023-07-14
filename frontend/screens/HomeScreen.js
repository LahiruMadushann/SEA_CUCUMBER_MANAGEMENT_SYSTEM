import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import { StatusBar } from 'expo-status-bar';
import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation } from '@react-navigation/native';
import CheckBox from "expo-checkbox";

export default function HomeScreen() {
    const [agree, setAgree] = useState(false);
    const styles = StyleSheet.create({



        button: {
            backgroundColor: '#3B4DF6',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 30,
            width: 242,
            height: 50
        },
        buttonDisabled: {
            backgroundColor: '#ddd',
        },

    });
    const navigation = useNavigation();

    return (
        <ScrollView className="flex-grow bg-white">
        <SafeAreaView >
            {/* <StatusBar barStyle="dark-content" /> */}


            <View className="absolute w-[854px] h-[132vw] left-[-232px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
                <View className="flex-row mt-[-66vw]">

                    <View className="mt-[111vw]">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('UserProfile')}
                        >
                            <View className="flex m-[auto] ">
                                <Image source={require('../assets/profile.png')} className=" w-[24.21875px] h-[24.21875px] ml-[68vw]" />

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-[112vw]">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AquaRegister')}
                        >
                            <View className="flex m-[auto] ">
                                <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] ml-[70vw]" />

                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
                <View className="flex-1 justify-center items-center mt-[-8vw]" >
                    <Image source={require('../assets/startImage.png')} className="w-[259px] h-[191px] center" />
                </View>
            </View>

            <View className="mt-[107vw]">
                <Text className="text-center text-[#000000CC] text-[22px] font-bold">Sea Cucumber{"\n"} Animal</Text>
            </View>

            {/* <Image source={require('../assets/icon.png')} style={{width: 100}} /> */}



            <View className="flex-row items-center mb-5">
                <CheckBox
                    value={agree}
                    onValueChange={() => setAgree(!agree)}
                    color={agree ? '#4630EB' : undefined}
                    className="w-3 h-3 mx-auto "
                />
                <Text className="text-[12px] mb-[10px] mx-auto mt-2 ml-[-18.5vw] ">
                    I accept all the rights and regulations
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.button, !agree && styles.buttonDisabled]}
                onPress={() => { navigation.navigate('MainBoard') }}
                disabled={!agree}
                className="mx-auto"
            >
                <Text className="text-center text-[5vw] font-bold text-[#FFFFFF]  py-1 px-12 ">Get Start</Text>
            </TouchableOpacity>


        </SafeAreaView>
        </ScrollView>


    )
}