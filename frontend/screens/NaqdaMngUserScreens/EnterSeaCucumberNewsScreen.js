import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/apiConfig";
import axios from "axios";
import { Alert } from "react-native";

//Token DATA
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library
import { decode as base64decode } from "base-64";
global.atob = base64decode;

import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import FooterBar from "../../components/FooterBar";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function EnterSeaCucumberNewsScreen() {
  const { state } = useAuth();
  const token = state.token;
  //const decodedToken = jwtDecode(token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const { _id: db_id, firstName: db_firstName, lastName: db_lastName, role: db_role } = decodedToken;

  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [postedTo, setPostedTo] = useState("");

  const handleSeaCucumberRates = async () => {
    if (title == "" || description == "" || type == "" || postedTo == "") {
      Alert.alert("Empty Field", "Please fill all the fields");
    }

    const insertData = {
      userId: db_id,
      title: title,
      description: description,
      type: type,
      postedTo: postedTo,
    };
    const insertUrl = `${BASE_URL}/farmMngUsers/enterNews`;

    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Sea cucumber News", response.data.message);

          navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("SeaCucumber News enter Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error occured while entering Seacucumber News:", error);
        Alert.alert("Error", "Error occured while entering Seacucumber News");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[218vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="mt-[100vw] ml-[4vw]">
                <TouchableOpacity onPress={() => navigation.navigate("UserProfileMainScreen")}>
                  <View className="flex m-[auto] ">
                    <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-auto h-[48px] mt-[5.7475vw] mx-auto">
              <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">Sea Cucumber News</Text>
            </View>
          </View>

          <View className="p-4 mx-auto w-[80vw] h-[auto] mb-[-28vw] mt-[60vw] rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
            <Text className="text-lg font-bold mb-4">Enter News</Text>

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
                multiline
                numberOfLines={2}
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <Picker style={styles.picker} selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
                <Picker.Item label="News Type" value="" />
                <Picker.Item label="News" value="News" />
                <Picker.Item label="Rules and Regulations" value="RulesAndRegulations" />
              </Picker>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <Picker style={styles.picker} selectedValue={postedTo} onValueChange={(itemValue) => setPostedTo(itemValue)}>
                <Picker.Item label="Post To" value="" />
                <Picker.Item label="Farmer" value="Farmer" />
                <Picker.Item label="District Aquaculturist" value="District Aquaculturist" />
                <Picker.Item label="Exporter" value="Exporter" />
                <Picker.Item label="Processor" value="Processor" />
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
              <Text className="text-[#fff] text-[18px] font-bold text-center">Post News</Text>
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
    width: 250,
    color: "gray",
  },
});
