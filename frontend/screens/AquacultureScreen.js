import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function AquacultureScreen() {
  const navigation = useNavigation();

  return (
    <View className="absolute w-[634px] h-[340px] left-[-130px] top-[-104px] bg-[#5A73F3]  rounded-b-full ">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-4">
            <Image source={require('../assets/main_board/arrow.png')} className="w-[24.22px] h-[24.22px] center" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[166px]">Aquaculture</Text>
        </View>
      </SafeAreaView>
      <View className="mt-[34vw] form space-y-2">
        <Text className="text-center text-[22px] font-bold text-[#000000A6]">First Fish Farming</Text>
      </View>

      <View className="mx-[41vw] pb-10 flex">
        <Image source={require('../assets/aquaculture/fish.png')} className=" w-[328px] h-[176px]  mt-[21px]" />
      </View>

      <View className="mx-[41vw] flex-1 flex-row">
        <View className="flex-1 items-center justify-center">
          <Text>Column 1</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text>Column 2</Text>
        </View>

      </View>

      <View className="flex-row">

        <TouchableOpacity
          onPress={() => navigation.navigate('MainBoard')}
        >
          <View className="ml-40 w-[164px] h-[30px]">
            <Text className="bg-[#3644C5] font-bold text-[#FFFFFF] text-center text-[14px] px-[31px] py-[5px] rounded-[8px] rounded-br-[0px]">Detail</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MainBoard')}
        >
          <View className=" w-[164px] h-[30px]">
            <Text className=" font-bold text-[#3644C5] text-center text-[14px] px-[31px] py-[5px] ">Stock</Text>

          </View>
        </TouchableOpacity>
      </View>

      <View className="ml-48 mt-4">
        <View>
          <Text className="text-[13px] font-bold text-[#000000A6]">Aqua Farm Name</Text>
          <Text className="text-[13px] text-[#000000A6] mt-0.5">First Fish Farming</Text>
        </View>

        <View className="mt-[13px]">
        <Text className="text-[13px] font-bold text-[#000000A6]">Address</Text>
          <Text className="text-[13px] text-[#000000A6]">Address01</Text>
          <Text className="text-[13px] text-[#000000A6]">Address02</Text>
          <Text className="text-[13px] text-[#000000A6]">Country</Text>
        </View>
      </View>

    </View>



  )
}
