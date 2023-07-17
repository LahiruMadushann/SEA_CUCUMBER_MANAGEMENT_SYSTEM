import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ContactUsScreen() {
    const navigation = useNavigation();

    const [addFormData, setAddFormData] = useState({
        userName: '',
        email: '',
        telephoneNo: '',
        comment: ''
    });

    const handleAddFormChange = (name, value) => {
        setAddFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleAddFormSubmit = () => {
        // handle form submission here
        console.log(addFormData);
    }

    return (
        <ScrollView className="bg-[#fff]">
            <SafeAreaView >

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
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Switch')}
                                >
                                    <View className="flex m-[auto] ">
                                        <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] ml-[280px]" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw]">Contact Us</Text>
                    </View>
                </View>

                <View className="mt-[36vh]">

                    <View className="mx-auto">
                        <TextInput
                            className=" text-[18px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                            value={addFormData.userName}
                            onChangeText={text => handleAddFormChange('userName', text)}
                            placeholder='User Name'
                        />
                        <TextInput
                            className="text-[18px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                            value={addFormData.email}
                            onChangeText={text => handleAddFormChange('email', text)}
                            placeholder='Email'
                        />

                        <TextInput
                            className="text-[18px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                            value={addFormData.telephoneNo}
                            onChangeText={text => handleAddFormChange('telephoneNo', text)}
                            placeholder='Telephone No'
                        />

                        <TextInput
                            className="text-[18px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw] h-[14vh]  mb-3"
                            value={addFormData.comment}
                            onChangeText={text => handleAddFormChange('comment', text)}
                            placeholder='Comment'
                            multiline={true}
                        />


                        <View className="mb-4 mt-4 mx-auto">
                            <TouchableOpacity
                                className="rounded-[15px] w-[65vw] h-[6.2vh] p-2 bg-blue-800 justify-center items-center"
                                onPress={handleAddFormSubmit}
                            >
                                <Text className="text-[18px] text-[#fff] font-bold" >Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                </View>
                <View className="border-b-[0.55px] border-b-gray-500 mt-[8vw]" />
                <View className="mt-[2vh] mx-[14vw]">
                    <Text className="text-[12px] font-bold mb-[1.5vh]">Sea Cucumber Animal</Text>
                    <View className="mx-[8vw]">
                        <View className="flex-row mb-[1.2vh]">
                            <View>
                                <Image source={require('../assets/contact/phone.png')} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                            </View>
                            <View>
                                <Text className="text-[11px] ml-[4vw]">+94765259905</Text>
                            </View>
                        </View>

                        <View className="flex-row mb-[1.2vh] ">
                            <View>
                                <Image source={require('../assets/contact/email.png')} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                            </View>
                            <View>
                                <Text className="text-[11px] ml-[4vw]">cst19034@std.uwu.ac.lk</Text>
                            </View>
                        </View>

                        <View className="flex-row mb-[3vh] ">
                            <View>
                                <Image source={require('../assets/contact/address.png')} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                            </View>
                            <View>
                                <Text className="text-[11px] ml-[4vw]">Madiha, Matara, Sri Lanka</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center'
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20
    },
    btnTab: {

        flexDirection: 'row',

        justifyContent: 'center',

        fontWeight: 'bold',
        color: '#3644C5',
        textAlign: 'center',
        fontSize: 14,
        paddingLeft: 31,
        paddingRight: 31,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 8,
        borderBottomRightRadius: 0


    },
    textTab: {
        fontSize: 16
    },
    btnTabActive: {
        backgroundColor: '#3644C5'
    },
    textTabActive: {
        color: '#fff'
    },
    itemContainer: {

    },
    itemLogo: {
        padding: 10
    },
    itemImage: {
        width: 50,
        height: 50
    },
    itemBody: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemStatus: {
        backgroundColor: 'green',
        paddingHorizontal: 6,
        justifyContent: 'center',
        right: 12
    }
})
