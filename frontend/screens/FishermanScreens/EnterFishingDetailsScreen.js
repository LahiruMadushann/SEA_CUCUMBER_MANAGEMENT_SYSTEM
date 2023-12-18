import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const { state } = useAuth();
  const token = state.token;
  const decodedToken = jwtDecode(token);

  const { _id: db_id } = decodedToken;

  const [speciesType, setSpeciesType] = useState("");
  const [numOfSpecies, setNumOfSpecies] = useState("");
  const [fishingArea, setFishingArea] = useState("");
  const [buyer, setBuyer] = useState("");
  const [buyingPrice, setbuyingPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);

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
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    if (
      speciesType == "" ||
      numOfSpecies == "" ||
      fishingArea == "" ||
      buyer == "" ||
      buyingPrice == ""
    ) {
      Alert.alert("Empty Field", "Please fill all the fields");
    }

    const formData = new FormData();
    formData.append("userId", db_id);
    formData.append("speciesType", speciesType);
    formData.append("numOfSpecies", numOfSpecies);
    formData.append("fishingArea", fishingArea);
    formData.append("buyer", buyer);
    formData.append("buyingPrice", buyingPrice);
    formData.append("date", date.toISOString());
    formData.append("fishingImage", {
      uri: image,
      type: "image/jpeg",
      name: "profile.jpg",
    });

    const insertUrl = `${BASE_URL}/fisherman/enterFishingDetails`;

    try {
      const response = await axios.post(insertUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Backend response:", response.data);

      if (response.data.success) {
        console.log("Backend response:", response.data);

        Alert.alert("Success", "Catch details entered Successfully");

        setSpeciesType("");
        setNumOfSpecies("");
        setFishingArea("");
        setBuyer("");
        setbuyingPrice("");
        setDate(new Date());
        setImage("");
        //navigation.navigate("UserProfileMainScreen");
      } else {
        Alert.alert(
          "Unsuccessful",
          "Catch details were not saved successfully"
        );
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
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
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Enter Catch Details
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

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={numOfSpecies}
                onChangeText={setNumOfSpecies}
                placeholder="Number of Species"
                keyboardType="numeric"
                required
              />

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={fishingArea}
                onChangeText={setFishingArea}
                placeholder="Fishering Area"
                required
              />

              <TextInput
                className="border-b border-[#00000040] text-gray-700 w-64 mb-5 mx-auto"
                value={buyingPrice}
                onChangeText={setbuyingPrice}
                placeholder="Buying Price. Ex - (Rs.5000)"
                keyboardType="numeric"
                required
              />

              <View style={styles.fieldContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={buyer}
                  onValueChange={(itemValue) => setBuyer(itemValue)}
                >
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Buyer"
                    value=""
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Processor"
                    value="Processor"
                  />
                  <Picker.Item
                    style={styles.pickerItem}
                    label="Farmer"
                    value="Farmer"
                  />
                </Picker>
              </View>

              <View style={styles.fieldContainer}>
                <Text className=" text-[15px] ml-[4vw]">Select Date: </Text>
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
                  <Text style={styles.pickImageText}>Pick Image</Text>
                </TouchableOpacity>
              </View>
              {image && (
                <Image
                  className="mt-[3vh] mx-auto rounded-[15px]"
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}

              {/* <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={date}
                onChangeText={setDate}
                placeholder="Date (2023-11-05)"
                required
              /> */}
            </View>

            <View className="mt-[2vh] mb-[5vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleUpdate}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  + New Catch
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
    marginLeft: 50,
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
    width: 150,
    color: "gray",
  },

  pickerItem: {
    fontSize: 15,
  },
});
