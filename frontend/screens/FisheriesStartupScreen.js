import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function FisheriesStartupScreen() {
    const navigation = useNavigation();
    return (
        <View className="absolute w-[650px] h-[830px] left-[-130px] top-[-114px] bg-[#5A73F3]  rounded-b-full ">
            <SafeAreaView className="flex">

                <TouchableOpacity
                    onPress={() => navigation.navigate('AquaStart')}
                    >
                    <View className="flex m-[auto] ">
                    <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] mt-[163px] ml-[334px]" />

                    </View>
                </TouchableOpacity>
                <View>
                    <Text className="text-center text-[26px] text-[#ffff] font-bold mt-[105.97px] mb-[35px]">Fisheries</Text>
                </View>
                <View className=" flex m-auto">
                    <Image source={require('../assets/fisheries/fishDoc.png')} className=" w-[254px] h-[245px]  mt-[35px]" />
                </View>
                <View>
                    <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[35px] ">No Data</Text>
                </View>
                <View className="flex m-auto">
                    <Image source={require('../assets/fisheries/upArrow.png')} className=" w-[35px] h-[19px] mt-[54px] " />
                </View>
                
            </SafeAreaView>
            <View className="mt-[60px]">
                <Text className="text-[15px] text-center text-[#0013C087] font-bold ">Swipe up for visiting Dashboad</Text>
                <Text className="text-center text-[#5A73F3] ">----------------------------------</Text>
            </View>

        </View>
    )
}
