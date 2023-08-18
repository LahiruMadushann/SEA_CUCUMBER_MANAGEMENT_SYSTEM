import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

export default function UpdateFarmingScreen() {
  const navigation = useNavigation();

  const route = useRoute(); // Get the route object
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || ""; // Default value if parameter is not available

  const [stock, setStock] = useState("");
  const [stockingDates, setStockingDates] = useState("");
  const [hatchery, setHatchery] = useState("");
  const [hatcheryBatch, setHatcheryBatch] = useState("");
  const [harvest, setHarvest] = useState("");
  const [size, setSize] = useState("");
  const [survival, setSurvival] = useState("");
  const [diseases, setDiseases] = useState("");
  const [date, setDate] = useState("");

  const handleUpdate = () => {
    const insertData = {
      farmId: farmId,
      stock: stock,
      stockingDates: stockingDates,
      hatchery: hatchery,
      hatcheryBatch: hatcheryBatch,
      harvest: harvest,
      size: size,
      survival: survival,
      diseases: diseases,
      date: date,
    };
    const insertUrl = `${BASE_URL}/districtAquaCulturist/insertFarmingDetails`;

    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert(
            "Stock Details",
            "Stock details has been updated Inserted."
          );
          // Optionally, navigate to another screen after successful password update
          // navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("Stock Update Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating stock:", error);
        Alert.alert("Error", "An error occurred while updating the stock.");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MainFarmScreen")}
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
              <Text className="text-center text-[#fff]  text-[18px] mt-[10vw] fixed">
                Update Details
              </Text>
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Stock
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View className="mt-[6vh]">
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={stock}
                onChangeText={setStock}
                placeholder="Stock"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={stockingDates}
                onChangeText={setStockingDates}
                placeholder="Stocking Dates"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={hatchery}
                onChangeText={setHatchery}
                placeholder="Hatchery"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={hatcheryBatch}
                onChangeText={setHatcheryBatch}
                placeholder="Hatchery Batch"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={harvest}
                onChangeText={setHarvest}
                placeholder="Harvest"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={size}
                onChangeText={setSize}
                placeholder="Size"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={survival}
                onChangeText={setSurvival}
                placeholder="Survival"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={diseases}
                onChangeText={setDiseases}
                placeholder="Diseases"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={date}
                onChangeText={setDate}
                placeholder="Date (2023-11-05)"
                required
              />
            </View>

            <View className="mt-[2vh] mb-[5vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleUpdate}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}