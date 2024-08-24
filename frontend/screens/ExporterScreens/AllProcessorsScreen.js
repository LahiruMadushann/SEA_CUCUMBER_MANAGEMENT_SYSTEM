import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/apiConfig";
import filter from "lodash.filter";

import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

import LoadingIndicator from "../LoadingIndicatorScreen";

export default function AllProcessorsScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [allProcessorsData, setAllProcessorsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllProcessorData() {
      try {
        const response = await axios.get(`${BASE_URL}/exporter/getFishProcessorsDetails`);
        setAllProcessorsData(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching processor data:", error);
        setIsLoading(false);
      }
    }

    fetchAllProcessorData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleSearch = (query) => {
    setSearchText(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(allProcessorsData, (processors) => {
      return contains(processors, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ firstName }, query) => {
    const formattedFarmName = firstName.toLowerCase();
    return formattedFarmName.includes(query);
  };

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/profile-pics`;

  console.log(allProcessorsData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity onPress={() => navigation.navigate("UserProfileMainScreen")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">Processors</Text>
              {/* <View className="mt-[4vh] mx-auto">
                <Image
                  source={require("../../assets/farms/allfarms.png")}
                  className=" w-[100px] h-[100px]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
                />
              </View> */}
            </View>
            <TextInput
              style={{ height: 50, borderColor: "gray", borderWidth: 1 }}
              className="w-[75vw] mt-5 mx-auto rounded-[15px] p-4 mb-4 bg-[#EBEEF9] text-black"
              onChangeText={(query) => handleSearch(query)}
              value={searchText}
              placeholder="Search by Processor Name"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View className="mt-[35vh] h-[55vh] mx-auto">
            {/* Loop through all processor details*/}
            <FlatList
              data={data}
              keyExtractor={(processor) => processor._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleProcessorScreen", {
                      processorId: item._id,
                    })
                  }
                  className="w-[82vw] h-[15vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
                >
                  <View key={item._id}>
                    <View className="w-[auto] h-[25px] ml-[5vw] mt-[4vw] flex-row ">
                      <Text className="text-[18px] font-bold text-[#5A73F4]">
                        {item.firstName} {item.lastName}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 8,
                      }}
                    >
                      <View>
                        <Image
                          source={{
                            uri: `${BASE_URL_FOR_PROFILE_PICS}/${item.profilepic}`,
                          }}
                          className=" w-[61px] h-[61px] rounded-full bg-[#FFFFFF] shadow-lg shadow-gray-800"
                        />
                      </View>
                      <View className=" mt-[1vw] ml-[5vw]">
                        <Text className=" text-[15px] mt-[1vw] ">Contact No: {item.contactNo}</Text>
                        <Text className=" text-[15px] mt-[1vw]">Location : {item.address}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  farmContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  farmName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  farmAddress: {
    fontSize: 16,
    color: "#666",
  },
});
