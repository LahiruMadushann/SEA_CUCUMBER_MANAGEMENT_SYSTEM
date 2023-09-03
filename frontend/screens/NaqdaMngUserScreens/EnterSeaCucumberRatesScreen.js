import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/config";
import axios from "axios";
import { Alert } from "react-native";

//Token DATA
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library

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

export default function EnterSeaCucumberRatesScreen() {
  const { state } = useAuth();
  const token = state.token;
  const decodedToken = jwtDecode(token);

  const {
    _id: db_id,
    firstName: db_firstName,
    lastName: db_lastName,
    role: db_role,
  } = decodedToken;

  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [speciesType, setSpeciesType] = useState("");
  const [rates, setRates] = useState("");
  const [postedTo, setPostedTo] = useState("");

  const handleSeaCucumberRates = async () => {
    if (
      title == "" ||
      description == "" ||
      speciesType == "" ||
      rates == "" ||
      postedTo == ""
    ) {
      Alert.alert("Empty Field", "Please fill all the fields");
    }

    const insertData = {
      userId: db_id,
      title: title,
      description: description,
      speciesType: speciesType,
      rates: rates,
      postedTo: postedTo,
    };
    const insertUrl = `${BASE_URL}/farmMngUsers/enterSeacucumberRates`;

    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Sea cucumber Rates", response.data.message);

          // navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("SeaCucumber rates enter Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error occured while entering Seacucumber Rates:", error);
        Alert.alert("Error", "Error occured while entering Seacucumber Rates");
      });
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
                Sea Cucumber Rates
              </Text>
            </View>
          </View>

          <View className="p-4 mx-auto w-[80vw] h-[auto] mb-[-28vw] mt-[60vw] rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
            <Text className="text-lg font-bold mb-4">Enter Rates</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={speciesType}
                onChangeText={setSpeciesType}
                placeholder="Species Type"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={rates}
                onChangeText={setRates}
                placeholder="Rates"
                keyboardType="numeric"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <Picker
                style={styles.picker}
                selectedValue={postedTo}
                onValueChange={(itemValue) => setPostedTo(itemValue)}
              >
                <Picker.Item label="Post To" value="" />
                <Picker.Item label="Farmer" value="Farmer" />
                <Picker.Item
                  label="District Aquaculturist"
                  value="District Aquaculturist"
                />
                <Picker.Item label="Exporter" value="Exporter" />
                <Picker.Item label="All" value="All" />
              </Picker>
            </View>

            <View style={styles.fieldContainer}>
              <Text className="text-[15px] ml-auto text-right">
                Post By : {db_firstName} {db_lastName}
                {"\n"}
                Role : {db_role}
              </Text>
            </View>
          </View>

          <View className="mt-[20vh] mb-[5vh]">
            <TouchableOpacity
              className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
              onPress={handleSeaCucumberRates}
            >
              <Text className="text-[#fff] text-[18px] font-bold text-center">
                Post Rates
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
