import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

export default function AllFarmsScreen() {
  const navigation = useNavigation();

  const [allFarmData, setAllFarmData] = useState([]);

  useEffect(() => {
    async function fetchAllFarmData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/districtAquaCulturist/getAllAquaFarmDetails`
        );
        setAllFarmData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    }

    fetchAllFarmData();
  }, []);

  console.log(allFarmData);

  return (
    <ScrollView className="bg-[#fff]">
      <SafeAreaView>
        <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
          <View className="mt-[58vh] ">
            <View className="flex-row ">
              <View className=" ml-[4vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserProfileMainScreen")}
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

            <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
              All Aquaculture Farms
            </Text>
            <View className="mt-[4vh] mx-auto">
              <Image
                source={require("../../assets/farms/allfarms.png")}
                className=" w-[100px] h-[100px]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
              />
            </View>
          </View>
        </View>
        <View className="mt-[45vh] mx-auto">
          {/* Loop through allFarmData and display farm details */}
          {allFarmData.map((farm) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MainFarmScreen", {
                  farmId: farm._id,
                  farmName: farm.name,
                  directedFarm: "allFarmsPage"
                })
              }
              className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
            >
              <View key={farm._id}>
                <View className="w-[auto] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
                  <Text className="text-[16px] font-bold text-[#000000A6] ml-[17vw]">
                    {farm.name}
                  </Text>
                </View>

                <View className="flex ml-[2.5vw] mt-[1vw]">
                  <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
                    Total Stock
                  </Text>
                  <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
                    Location {farm.address}
                  </Text>
                  <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
                    Updated Date
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-[4vh]">
          <FooterBar />
        </View>
      </SafeAreaView>
    </ScrollView>
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
