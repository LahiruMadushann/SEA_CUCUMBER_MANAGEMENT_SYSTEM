import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const listTab = [
    {
        status: 'Add'
    },
    {
        status: 'Sell'
    }
]



export default function UpdateDataScreen() {
    const navigation = useNavigation();
    const [status, setStatus] = useState('Add')

    const [addFormData, setAddFormData] = useState({
        farmName: '',
        weight: '',
        date: '',
        updater: '',
        userName: '',
        password: ''
    });

    const setStatusFilter = status => {
        if (status === 'Add') {
            setStatus('Add')
        } else {
            setStatus('Sell')
        }

    }

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
        <SafeAreaView>
            <ScrollView>
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
                        <Text className="text-center text-[#fff] font-bold text-[16px] mt-[10vw]">Update Data</Text>
                        <Text className="text-center text-[#fff] font-bold text-[26px] mt-[vw]">Fisheries</Text>
                    </View>
                </View>

                <View className="mt-[36vh]">
                    <Text className="text-center text-[22px] font-bold text-[#000000A6] mb-[4vh]">First Fish Farming</Text>

                    <View style={styles.listTab}>
                        {listTab.map(e => (
                            <TouchableOpacity
                                style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                                className="mx-[2vw] w-[164px] h-[30px] "
                                onPress={() => setStatusFilter(e.status)}
                            >
                                <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>
                                    {e.status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {status === 'Add' && (
                        <View className="mx-auto">
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.farmName}
                                onChangeText={text => handleAddFormChange('farmName', text)}
                                placeholder='Name of the Fish'
                            />
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.weight}
                                onChangeText={text => handleAddFormChange('weight', text)}
                                placeholder='Weight'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.date}
                                onChangeText={text => handleAddFormChange('date', text)}
                                placeholder='Date'
                            />
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.updater}
                                onChangeText={text => handleAddFormChange('updater', text)}
                                placeholder='Name of the updater'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.userName}
                                onChangeText={text => handleAddFormChange('userName', text)}
                                placeholder='User Name'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.password}
                                onChangeText={text => handleAddFormChange('password', text)}
                                placeholder='Password'
                            />
                            <View className="mb-4 mt-4 mx-auto">
                                <TouchableOpacity
                                    className="rounded-[15px] w-[65vw] h-[6.2vh] p-2 bg-blue-800 justify-center items-center"
                                    onPress={handleAddFormSubmit}
                                >
                                    <Text className="text-[18px] text-[#fff] font-bold" >Update</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}

                    {status === 'Sell' && (

                        <View className="mx-auto">
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.farmName}
                                onChangeText={text => handleAddFormChange('farmName', text)}
                                placeholder='Name of the Fish'
                            />
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.weight}
                                onChangeText={text => handleAddFormChange('weight', text)}
                                placeholder='Weight'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.date}
                                onChangeText={text => handleAddFormChange('date', text)}
                                placeholder='Date'
                            />
                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.updater}
                                onChangeText={text => handleAddFormChange('updater', text)}
                                placeholder='Name of the updater'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.userName}
                                onChangeText={text => handleAddFormChange('userName', text)}
                                placeholder='User Name'
                            />

                            <TextInput
                                className="border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                                value={addFormData.password}
                                onChangeText={text => handleAddFormChange('password', text)}
                                placeholder='Password'
                            />
                            <View className="mb-4 mt-4 mx-auto">
                                <TouchableOpacity
                                    className="rounded-[15px] w-[65vw] h-[6.2vh] p-2 bg-blue-800 justify-center items-center"
                                    onPress={handleAddFormSubmit}
                                >
                                    <Text className="text-[18px] text-[#fff] font-bold" >Sell</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
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
