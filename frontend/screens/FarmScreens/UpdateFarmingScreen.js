import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

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
  const [stockingDates, setStockingDates] = useState(new Date());
  const [hatchery, setHatchery] = useState("");
  const [hatcheryBatch, setHatcheryBatch] = useState("");
  const [harvest, setHarvest] = useState(new Date());
  const [size, setSize] = useState("");
  const [survival, setSurvival] = useState("");
  const [diseases, setDiseases] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerHD, setShowDatePickerHD] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setStockingDates(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeHD = (event, selectedDate) => {
    setShowDatePickerHD(Platform.OS === "ios");
    if (selectedDate) {
      setHarvest(selectedDate);
    }
  };

  const showDatepickerHD = () => {
    setShowDatePickerHD(true);
  };

  const handleUpdate = () => {
    const insertData = {
      farmId: farmId,
      stock: stock,
      stockingDates: stockingDates.toISOString(),
      hatchery: hatchery,
      hatcheryBatch: hatcheryBatch,
      harvest: harvest.toISOString(),
      size: size,
      survival: survival,
      diseases: diseases,
    };
    const insertUrl = `${BASE_URL}/districtAquaCulturist/insertFarmingDetails`;

    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Stock Details", "Stock details has been updated.");
          setStock("");
          setStockingDates(new Date());
          setHatchery("");
          setHatcheryBatch("");
          setHarvest(new Date());
          setSize("");
          setSurvival("");
          setDiseases("");
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
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[5vh] fixed">
                Enter Stock Details
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={stock}
                onChangeText={setStock}
                placeholder="Stock (in Kg)"
                required
              />

              <View style={styles.fieldContainer}>
                <Text className=" text-[15px] text-gray-700">
                  Stocking Date:{" "}
                </Text>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text className="text-[#007bff] text-[15px]">
                    {stockingDates.toDateString()}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={stockingDates}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>

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

              <View style={styles.fieldContainer}>
                <Text className=" text-[15px] text-gray-700">
                  Harvest Date:{" "}
                </Text>
                <TouchableOpacity onPress={showDatepickerHD}>
                  <Text className="text-[#007bff] text-[15px]">
                    {harvest.toDateString()}
                  </Text>
                </TouchableOpacity>

                {showDatePickerHD && (
                  <DateTimePicker
                    value={harvest}
                    mode="date"
                    display="default"
                    onChange={onChangeHD}
                  />
                )}
              </View>

              {/* <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={harvest}
                onChangeText={setHarvest}
                placeholder="Harvest"
                required
              /> */}

              <View style={styles.fieldContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={size}
                  onValueChange={(itemValue) => setSize(itemValue)}
                >
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Size of the species"
                    value=""
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Small"
                    value="Small"
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Medium"
                    value="Medium"
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Large"
                    value="Large"
                  />
                </Picker>
              </View>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={survival}
                onChangeText={setSurvival}
                placeholder="Survival Rate"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={diseases}
                onChangeText={setDiseases}
                placeholder="Diseases"
                required
              />
            </View>

            <View className="mt-[2vh] mb-[2vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center"
                onPress={handleUpdate}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  Enter Farming Stock
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
    marginLeft: 68,
    fontSize: 15,
    marginBottom: 10,
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
    width: 210,
    color: "gray",
    fontSize: 10,
    marginTop: -10,
    marginLeft: -16,
  },

  pickerItem: {
    fontSize: 15,
  },
});
