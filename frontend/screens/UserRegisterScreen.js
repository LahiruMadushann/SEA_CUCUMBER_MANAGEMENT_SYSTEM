import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CheckBox from "expo-checkbox";
export default function UserRegisterScreen() {
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


    const styles = StyleSheet.create({

        button: {
            backgroundColor: '#4630EB',
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 15,
            width: 261,
            height: 34
        },
        buttonDisabled: {
            backgroundColor: '#ddd',
        },

    });

    return (
        <View className="bg-[#FFFFFF]">
            <View className="absolute w-[854px] h-[599px] left-[-232px] top-[-392px] bg-[#0013C0]  rounded-b-full ">
                <SafeAreaView className="flex ">
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
                        <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">Fisheries</Text>

                    </View>

                    <View className="mx-auto mt-[52px] ">
                        <ScrollView >
                            <View className="p-4">
                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First Name"
                                />
                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last Name"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter Password"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Re-Enter Password"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={addressLine1}
                                    onChangeText={setAddressLine1}
                                    placeholder="Address Line1"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={addressLine2}
                                    onChangeText={setAddressLine2}
                                    placeholder="Address Line2"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={town}
                                    onChangeText={setTown}
                                    placeholder="Town"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={province}
                                    onChangeText={setProvince}
                                    placeholder="Province"
                                />

                                <TextInput
                                    className="border-b border-[#00000040] text-gray-700  w-68  mb-3"
                                    value={country}
                                    onChangeText={setCountry}
                                    placeholder="Country"
                                />

                                {/* <TextInput
                                    className="border-b text-gray-700  w-64  mb-3"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholder="Telephone Number"
                                /> */}

                                {/* <TextInput
                                    className="border-b text-gray-700  w-64  mb-3"
                                    value={gender}
                                    onChangeText={setGender}
                                    placeholder="Gender"
                                /> */}

                                {/* <TextInput
                                    className="border-b text-gray-700  w-64  mb-3"
                                    value={age}
                                    onChangeText={setAge}
                                    placeholder="Country"
                                /> */}
                                <View className="flex-row items-center mb-5">
                                    <CheckBox
                                        value={agree}
                                        onValueChange={() => setAgree(!agree)}
                                        color={agree ? '#4630EB' : undefined}
                                        className="w-3 h-3 mx-auto "
                                    />
                                    <Text className="text-[12px] mb-[10px] mx-auto mt-2 ml-[-6px] ">
                                    I accept all the rights and regulations
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.button, !agree && styles.buttonDisabled]}
                                    onPress={() => { }}
                                    disabled={!agree}
                                    className="mx-auto"
                                >
                                    <Text className="text-white text-[16px] h-[19px] font-bold mt-[-10] text-center">Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>

            </View>

        </View>
    )
}
