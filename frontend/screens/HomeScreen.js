import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import { StatusBar } from 'expo-status-bar';
import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'I accept all the rights and regulations',
            value: 'accept '
        },

    ]), []);

    const [selectedId, setSelectedId] = useState();
    return (

        <SafeAreaView >
            <StatusBar barStyle="dark-content" />


            <View className="absolute w-[854px] h-[499px] left-[-232px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
                <View>
                    <Image source={require('../assets/profile.png')} className="w-[24.22px] h-[24.22px] center" />
                </View>
                <View className="flex-1 justify-center items-center mt-[104px]" >
                    <Image source={require('../assets/startImage.png')} className="w-[259px] h-[191px] center" />
                </View>
            </View>

            <View className="mt-[410px]">
                <Text className="text-center text-[22px] font-bold">Sea Cucumber{"\n"} Animal</Text>
            </View>
            <View className="mt-9 mb-[13] font-[10px]">
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MainBoard')}
                    className="w-[242px] rounded-[30px] bg-[#3B4DF6]  mx-[64px]">
                    <Text className="text-center text-[20px] font-bold text-[#FFFFFF]  py-4 px-12 ">
                        Get Start
                    </Text>
                </TouchableOpacity>
                {/* <Image source={require('../assets/icon.png')} style={{width: 100}} /> */}

            </View>
            <View className="center" >
                <Icon.MapPin height="20" width="20" stroke="gray" />
            </View>

        </SafeAreaView>


    )
}