import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { LogBox } from "react-native";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

import filter from "lodash.filter";
import { FlatList } from "react-native";

import LoadingIndicator from "../LoadingIndicatorScreen";

export default function KnowledgeCenterScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");

  const [allSpeciesData, setAllSpeciesData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllSpeciesData() {
      try {
        const response = await axios.get(`${BASE_URL}/user/getAllSpeciesData`);
        setAllSpeciesData(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchAllSpeciesData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/seacucumber-pics`;

  const handleSearch = (query) => {
    setSearchText(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(allSpeciesData, (species) => {
      return contains(species, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ scientificName, speciesType }, query) => {
    if (scientificName.includes(query) || speciesType.includes(query)) {
      return true;
    }
    return false;
  };

  //console.log(allSpeciesData);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="flex-grow bg-white "
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row mt-[60vh]">
              <View className=" ml-[4vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("KnowledgeMain")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/main_board/arrow.png")}
                      className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-[6vh]">
              <Text className="text-[22px] text-center font-bold text-[#FFFFFF]">
                Sea Cucumber Species
              </Text>
            </View>

            <TextInput
              style={{ height: 50, borderColor: "gray", borderWidth: 1 }}
              className="w-[75vw] mx-auto rounded-[15px] p-4 mt-[10vw] bg-[#fff] text-black"
              onChangeText={(query) => handleSearch(query)}
              value={searchText}
              placeholder="Search"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="mt-[40vh] mx-auto">
            <FlatList
              data={data}
              keyExtractor={(species) => species._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("KCIndividualSpecies", {
                      id: item._id,
                    })
                  }
                  className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
                >
                  <View className="flex-row mt-[3vw] mr-[5vw] mb-[3vw]">
                    <Image
                      source={{
                        uri: `${BASE_URL_FOR_PROFILE_PICS}/${item.seaCucumberImages}`,
                      }}
                      className=" w-[60px] h-[60px] ml-[2vw] bg-[#FFFFFF] rounded-full my-[auto] shadow-lg shadow-gray-800"
                    />

                    <View className="flex-auto ml-[3vw] my-[auto]">
                      <Text className="text-[15px] font-bold text-[#0000FF]">
                        {item.scientificName}
                      </Text>
                      <Text className="text-[12px] flex-auto">
                        Species Type : {item.speciesType}
                      </Text>
                      {/* <Text className=" text-[10px] flex-auto mt-[1vw]">
                        Description :{" "}
                        {item.description.slice(0, item.description.length / 2)}
                      </Text> */}
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
