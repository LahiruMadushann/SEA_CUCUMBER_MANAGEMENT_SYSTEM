import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/config";
import axios from "axios";
import { Alert } from "react-native";

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
import { useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import FooterBar from "../../components/FooterBar";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function FarmRegisterScreen() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [validity, setValidity] = useState("");
  const [location, setLocation] = useState("");
  const [extend, setExtend] = useState("");
  const [gpsCoordinatesOne, setGpsCoordinatesOne] = useState("");
  const [gpsCoordinatesTwo, setGpsCoordinatesTwo] = useState("");
  const [gpsCoordinatesThree, setGpsCoordinatesThree] = useState("");
  const [gpsCoordinatesFour, setGpsCoordinatesFour] = useState("");
  const [farmInternal, setFarmInternal] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");

  const [image, setImage] = useState(null); // Use state for selected image

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

  const handleRegistration = async () => {
    if (
      name == "" ||
      contactNo == "" ||
      licenseNo == "" ||
      validity == "" ||
      location == "" ||
      extend == "" ||
      gpsCoordinatesOne == "" ||
      gpsCoordinatesTwo == "" ||
      gpsCoordinatesThree == "" ||
      gpsCoordinatesFour == "" ||
      farmInternal == "" ||
      establishmentDate == "" ||
      image == ""
    ) {
      Alert.alert("Empty Field", "Please fill all the fields");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactNo", contactNo);
    formData.append("licenseNo", licenseNo);
    formData.append("validity", validity);
    formData.append("location", location);
    formData.append("extend", extend);
    formData.append("gpsCoordinatesOne", gpsCoordinatesOne);
    formData.append("gpsCoordinatesTwo", gpsCoordinatesTwo);
    formData.append("gpsCoordinatesThree", gpsCoordinatesThree);
    formData.append("gpsCoordinatesFour", gpsCoordinatesFour);
    formData.append("farmInternal", farmInternal);
    formData.append("establishmentDate", establishmentDate);
    formData.append("picture", {
      uri: image,
      type: "image/jpeg", // Change to the appropriate MIME type if needed
      name: "profile.jpg", // Change to the desired file name
    });

    console.log(formData);

    const backendUrl = `${BASE_URL}/farmMngUsers/farmRegistration`; // Replace with your actual backend URL
    try {
      const response = await axios.post(backendUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Registration", response.data.message);

      navigation.navigate("UserProfileMainScreen");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

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
          <View className="absolute w-[218vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="mt-[100vw] ml-[4vw]">
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

            <View className="w-auto h-[48px] mt-[5.7475vw] mx-auto">
              <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">
                Farmer Registration
              </Text>
            </View>
          </View>

          <View className="p-4 mx-auto w-[80vw] h-[auto] mb-[-28vw] mt-[60vw] rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
            <Text className="text-lg font-bold mb-4">Farm Details</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={name}
                onChangeText={setName}
                placeholder="Farm Name"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={contactNo}
                onChangeText={setContactNo}
                placeholder="Contact No"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={licenseNo}
                onChangeText={setLicenseNo}
                placeholder="License No"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={validity}
                onChangeText={setValidity}
                placeholder="Validity"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={location}
                onChangeText={setLocation}
                placeholder="Location"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={extend}
                onChangeText={setExtend}
                placeholder="Extend"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={gpsCoordinatesOne}
                onChangeText={setGpsCoordinatesOne}
                placeholder="First Point GPS Coordinates"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={gpsCoordinatesTwo}
                onChangeText={setGpsCoordinatesTwo}
                placeholder="Second Point GPS Coordinates"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={gpsCoordinatesThree}
                onChangeText={setGpsCoordinatesThree}
                placeholder="Third Point GPS Coordinates"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={gpsCoordinatesFour}
                onChangeText={setGpsCoordinatesFour}
                placeholder="Fourth Point GPS Coordinates"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={farmInternal}
                onChangeText={setFarmInternal}
                placeholder="Farm Internal"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={establishmentDate}
                onChangeText={setEstablishmentDate}
                placeholder="Establishment Date"
                required
              />
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
                style={{ width: 250, height: 150 }}
              />
            )}
          </View>
          <View className="mt-[20vh] mb-[5vh]">
            <TouchableOpacity
              className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
              onPress={handleRegistration}
            >
              <Text className="text-[#fff] text-[18px] font-bold text-center">
                Register Farm
              </Text>
            </TouchableOpacity>
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
  },
});
