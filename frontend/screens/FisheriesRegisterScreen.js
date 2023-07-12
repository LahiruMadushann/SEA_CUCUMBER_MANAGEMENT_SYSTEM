import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CheckBox from "expo-checkbox";
export default function FisheriesRegisterScreen() {
    const navigation = useNavigation();
    const [agree, setAgree] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [town, setTown] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    return (
        <ScrollView className="flex-grow bg-white">

            <View className="absolute w-[218vw] h-[80vh] left-[-232px] top-[-392px] bg-[#0013C0]  rounded-b-full ">

                <View className="flex-row">

                    <View className="mt-[112vw]">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                        >
                            <View className="flex m-[auto] ">
                                <Image source={require('../assets/main_board/arrow.png')} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-[112vw]">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AquaRegister')}
                        >
                            <View className="flex m-[auto] ">
                                <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] ml-[280px]" />

                            </View>
                        </TouchableOpacity>
                    </View>


                </View>


                <View className="w-[226px] h-[48px] mt-[44.97px] mx-auto">
                    <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">Aquaculture</Text>

                </View>
            </View>


            <View className="p-4 mx-auto mt-[60vw]">
                <Text className="text-lg font-bold mb-4" >Registration Form</Text>
                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                />
                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter Password"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Re-Enter Password"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={addressLine1}
                    onChangeText={setAddressLine1}
                    placeholder="Address Line1"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={addressLine2}
                    onChangeText={setAddressLine2}
                    placeholder="Address Line2"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={town}
                    onChangeText={setTown}
                    placeholder="Town"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={province}
                    onChangeText={setProvince}
                    placeholder="Province"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Country"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Telephone Number"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={gender}
                    onChangeText={setGender}
                    placeholder="Gender"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={age}
                    onChangeText={setAge}
                    placeholder="Country"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={town}
                    onChangeText={setTown}
                    placeholder="Town"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={province}
                    onChangeText={setProvince}
                    placeholder="Province"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Country"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Telephone Number"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={gender}
                    onChangeText={setGender}
                    placeholder="Gender"
                />

                <TextInput
                    className="border-b border-[#00000040] text-gray-700  w-64  mb-3"
                    value={age}
                    onChangeText={setAge}
                    placeholder="Country"
                />
            </View>
        </ScrollView>
    );
}
