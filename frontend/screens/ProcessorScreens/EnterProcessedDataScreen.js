import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

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

export default function EnterProcessedDataScreen() {
  const navigation = useNavigation();

  const { state, dispatch } = useAuth();
  // Access the token
  const token = state.token;

  // Decode the token
  const decodedToken = jwtDecode(token);

  const { _id: db_id } = decodedToken;

  const [speciesType, setSpeciesType] = useState("");
  const [collectedFrom, setCollectedFrom] = useState("");
  const [collectedLocation, setCollectedLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); // Update the image state with the selected image URI
    }
  };

  const handleUpdate = async () => {
    if (
      speciesType == "" ||
      collectedFrom == "" ||
      collectedLocation == "" ||
      weight == "" ||
      date == ""
    ) {
      Alert.alert("Empty Field", "Please fill all the fields");
    }

    const formData = new FormData();
    formData.append("processorId", db_id);
    formData.append("speciesType", speciesType);
    formData.append("weight", weight);
    formData.append("collectedFrom", collectedFrom);
    formData.append("collectedLocation", collectedLocation);
    formData.append("date", date.toISOString());
    formData.append("processorStockImages", {
      uri: image,
      type: "image/jpeg",
      name: "stockImage.jpg",
    });

    console.log(formData);

    const insertUrl = `${BASE_URL}/fishProcessers/enterProcessedDetails`;

    try {
      const response = await axios.post(insertUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Backend response:", response.data);

      if (response.data.success) {
        console.log("Backend response:", response.data);

        Alert.alert(
          "Success",
          "Successfully entered Sea cucumber processed details"
        );

        setSpeciesType("");
        setCollectedFrom("");
        setCollectedLocation("");
        setWeight("");
        setDate(new Date());
        setImage("");

        // navigation.navigate("UserProfileMainScreen");
      } else {
        Alert.alert("Fail", response.data.message);
      }
    } catch (error) {
      console.log("To Test");
      console.error("Error", error.message);
      Alert.alert("Error", "Server Error");
    }
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

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
                Processed Sea Cucumber Details
              </Text>
            </View>
          </View>

          <View className="mt-[30vh]">
            <View className="mt-[6vh]">
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={speciesType}
                onChangeText={setSpeciesType}
                placeholder="Species Type"
                required
              />

              <Picker
                selectedValue={collectedFrom}
                onValueChange={(itemValue) => setCollectedFrom(itemValue)}
                style={styles.picker}
              >
                <Picker.Item
                  style={styles.pickerItem}
                  label="Collected From"
                  value=""
                />
                <Picker.Item
                  style={styles.pickerItem}
                  label="Fished"
                  value="fished"
                />
                <Picker.Item
                  style={styles.pickerItem}
                  label="Farmed"
                  value="farmed"
                />
              </Picker>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={collectedLocation}
                onChangeText={setCollectedLocation}
                placeholder="Collected Location"
                required
              />

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight In Kg"
                required
              />

              <View style={styles.fieldContainer}>
                <Text className=" text-[15px]">Select Date: </Text>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text className="text-[#007bff] text-[15px]">
                    {date.toDateString()}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>

              <View style={styles.pickImageContainer}>
                <TouchableOpacity
                  onPress={selectImage}
                  style={styles.pickImageButton}
                >
                  <Text style={styles.pickImageText}>Select Stock Image</Text>
                </TouchableOpacity>
              </View>
              {image && (
                <Image
                  className="mt-[3vh] mx-auto rounded-[15px]"
                  source={{ uri: image }}
                  style={{ width: 300, height: 200 }}
                />
              )}
            </View>

            <View className="mt-[2vh] mb-[5vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] mx-auto justify-center py-[1vh] px-[10vw] items-center mt-[20px]"
                onPress={handleUpdate}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  Add Stock
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
    marginLeft: 70,
    fontSize: 15,
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
    width: 225,
    color: "gray",
    marginLeft: 52,
    fontSize: 10,
    marginTop: -10,
  },

  pickerItem: {
    fontSize: 15,
  },
});
