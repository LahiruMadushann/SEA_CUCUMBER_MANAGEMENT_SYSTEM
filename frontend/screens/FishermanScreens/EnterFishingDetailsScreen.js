import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

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

export default function EnterFishingDetailsScreen() {
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
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Enter Catch Details
              </Text>
            </View>
          </View>

          <View className="mt-[30vh]">
            <View className="mt-[6vh]">
              <View style={styles.fieldContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={stockingDates}
                  onValueChange={(itemValue) => setStockingDates(itemValue)}
                >
                  <Picker.Item label="Species Type" value="" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                </Picker>
              </View>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={stockingDates}
                onChangeText={setStockingDates}
                placeholder="Weight in Kg"
                required
              />

              <View style={styles.fieldContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={stockingDates}
                  onValueChange={(itemValue) => setStockingDates(itemValue)}
                >
                  <Picker.Item label="Location" value="" />
                  <Picker.Item label="Individual" value="individual" />
                  <Picker.Item label="Group" value="group" />
                </Picker>
              </View>

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

const styles = StyleSheet.create({
  pickImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  pickImageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pickImageText: {
    color: "white",
    fontWeight: "bold",
  },

  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 52,
  },

  requiredLabel: {
    color: "red",
    marginBottom: 15,
  },
  textField: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#00000040",
    color: "gray",
    width: 200,
    paddingBottom: 3,
  },

  picker: {
    width: 200,
    color: "gray",
  },
});
