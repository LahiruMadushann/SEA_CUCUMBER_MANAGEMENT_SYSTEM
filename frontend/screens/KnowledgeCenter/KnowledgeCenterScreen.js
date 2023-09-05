import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
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

export default function KnowledgeCenterScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const [searchText, setSearchText] = useState("");

  const [allSpeciesData, setAllSpeciesData] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    async function fetchAllSpeciesData() {
      try {
        const response = await axios.get(`${BASE_URL}/user/getAllSpeciesData`);
        setAllSpeciesData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Species data:", error);
      }
    }

    fetchAllSpeciesData();
  }, []);

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/seacucumber-pics`;

  console.log(allSpeciesData);

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
                Knowledge Center
              </Text>
            </View>

            <TextInput
              style={{ height: 50, borderColor: "gray", borderWidth: 1 }}
              className="w-[63vw] mx-auto rounded-[20px] p-4 mt-[10vw] bg-[#fff] text-black	 "
              onChangeText={handleSearch}
              value={searchText}
              placeholder="Search"
            />
          </View>

          <View className="mt-[45vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}
            {allSpeciesData.map((species) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("KCIndividualSpecies", {
                    id: species._id,
                  })
                }
                className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
              >
                <View key={species._id}>
                  <View className="w-[auto] h-[25px] ml-[5vw] mt-[4vw] flex-row ">
                    <Text className="text-[15px] font-bold text-[#0000FF]">
                      {species.scientificName}
                    </Text>
                  </View>

                  <View className="flex-row mt-[0vw] mr-[5vw] mb-[5vw]">
                    <Image
                      source={{
                        uri: `${BASE_URL_FOR_PROFILE_PICS}/${species.seaCucumberImages}`,
                      }}
                      className=" w-[80px] h-[80px] ml-[2vw] bg-[#FFFFFF] rounded-full my-[auto] shadow-lg shadow-gray-800"
                    />

                    <View className="flex-auto mt-[1vw] ml-[3vw]">
                      <Text className="text-[12px] flex-auto mt-[0vw]">
                        Species Type : {species.speciesType}
                      </Text>
                      <Text className=" text-[10px] flex-auto mt-[1vw]">
                        Description :{" "}
                        {species.description.slice(
                          0,
                          species.description.length / 2
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
