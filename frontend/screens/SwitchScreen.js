import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const data = [
    { id: 1, title: 'A Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 2, title: 'B Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 3, title: 'C Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 4, title: 'D Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 5, title: 'E Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 6, title: 'F Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 7, title: 'G Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 8, title: 'H Select', image: 'seaCucumberA.png', detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
];

const images = {
    'seaCucumberA.png': require('../assets/knowledge_center/seaCucumberA.png'),

};

export default function SwitchScreen() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    ;
    const handleSearch = text => {
        setSearchText(text);
        const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    };

    return (
        <ScrollView className="bg-[#fff]">
            <View className="">
                <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">

                    <View className="flex-row mt-[60vh]">
                        <View className=" ml-[4vw]">
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Aquaculture')}
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

                    <View className="mt-[6vh]">
                        <Text className="text-[22px] text-center font-bold text-[#FFFFFF]">Knowledge Center</Text>
                    </View>



                    <TextInput
                        style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                        className="w-[63vw] mx-auto rounded-[20px] p-4 mt-[10vw] bg-[#fff] text-black	 "
                        onChangeText={handleSearch}
                        value={searchText}
                        placeholder="Search"
                    />
                </View>
                <View className="mt-[54vh]">

                    {filteredData.map(item => (
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('#')}
                            className="w-[92vw] h-[22.5vh] rounded-[30px] mx-[6.7vw]">
                            <View key={item.id} className="flex-row  mb-[5vw]">
                                <View>
                                    {item.image && (

                                        <Image source={images[item.image]} className=" w-[134px] h-[135px]  mt-[21px] rounded-l-2xl" />

                                    )}
                                </View>
                                <View className="mt-[5vw] w-[220px] h-[135px]  bg-[#FFFFFF] shadow-lg shadow-gray-700 rounded-r-2xl	px-3 py-8">
                                    <Text className="text-[22px] mt-[] font-bold text-[#000000]">{item.title}</Text>
                                    <Text className="text-[12px] text-[#000000]"> {item.detail} </Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </View>
        </ScrollView>
    )
}
