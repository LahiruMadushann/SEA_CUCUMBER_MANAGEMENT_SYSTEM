import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FooterBar from '../components/FooterBar';

export default function AquacultureStartupScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView className="flex-grow bg-white">
            <SafeAreaView >
                <View className="absolute w-[162vw] h-[108vh] left-[-130px] top-[-114px] bg-[#5A73F3]  rounded-b-full ">


                    <TouchableOpacity
                        onPress={() => navigation.navigate('AquaStart')}
                    >
                        <View className="flex m-[auto] ">
                            <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] mt-[39vw] ml-[334px]" />

                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text className="text-center text-[26px] text-[#ffff] font-bold mt-[12vw] mb-[35px]">Aquaculture</Text>
                    </View>
                    <View className=" flex m-auto">
                        <Image source={require('../assets/fisheries/fishDoc.png')} className=" w-[254px] h-[245px]  mt-[1vw]" />
                    </View>
                    <View>
                        <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[2vw] ">No Data</Text>
                    </View>
                    <View className="flex m-auto">
                        <Image source={require('../assets/fisheries/upArrow.png')} className=" w-[35px] h-[19px] mt-[54px] " />
                    </View>

                </View>
                <View className="mt-[150vw]">
                    <Text className="text-[15px] text-center text-[#0013C087] font-bold ">Swipe up for visiting Dashboad</Text>
                    <Text className="text-center text-[#5A73F3] ">----------------------------------</Text>
                </View>
                <View className="mt-[4vh]">
                    <FooterBar />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
