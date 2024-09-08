import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function UploadSuccessScreen() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Home'); 
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-5">
        <View className="bg-blue-100 rounded-lg p-5 items-center mb-7">
          <Text className="text-2xl font-bold text-blue-900 mb-2">Upload Successful!</Text>
          <Text className="text-base text-gray-800 text-center">Your image has been uploaded and is being processed.</Text>
        </View>
        <TouchableOpacity className="bg-blue-900 py-3 px-7 rounded-full" onPress={handleContinue}>
          <Text className="text-white text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
