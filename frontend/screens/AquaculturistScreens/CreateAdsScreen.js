import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library
import { useAuth } from "../../auth/AuthContext";

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

export default function CreateAdsScreen() {
  const navigation = useNavigation();

  const { state } = useAuth();
  // Access the token
  const token = state.token;

  // Decode the token
  const decodedToken = jwtDecode(token);

  // Access payload data from the decoded token
  const { _id: db_id } = decodedToken;

  const route = useRoute(); // Get the route object
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || ""; // Default value if parameter is not available

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateAd = () => {
    if (
      type == "" ||
      title == "" ||
      description == "" ||
      contactNo == "" ||
      address == "" ||
      email == ""
    ) {
      Alert.alert("Invalid Inputs", "Please fill all the fields");
    }

    const insertData = {
      type: type,
      title: title,
      description: description,
      contactNo: contactNo,
      address: address,
      email: email,
      postedById: db_id,
    };
    const createAdUrl = `${BASE_URL}/districtAquaCulturist/createAdvertisement`;

    // Make a PUT or POST request to update the data
    axios
      .post(createAdUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert(
            "Advertisement",
            "Advertisement has be created Successfully."
          );
          navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("Ad Creation Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error creating ad:", error);
        Alert.alert(
          "Error",
          "An error occurred while creating the advertisement."
        );
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
              <Text className="text-center text-[#fff]  text-[18px] mt-[10vw] fixed">
                Create Advertisement
              </Text>
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Vacancies | Promotions
              </Text>
            </View>
          </View>

          <View className="mt-[30vh]">
            <View className="mt-[6vh]">
              <View
                className="text-gray-700 w-auto mx-auto"
                style={styles.fieldContainer}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={type}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  <Picker.Item label="Select Ad Type" value="" />
                  <Picker.Item label="Vacancy" value="vacancy" />
                  <Picker.Item label="Promotion" value="promotion" />
                </Picker>
              </View>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                required
                multiline
                numberOfLines={4}
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={contactNo}
                onChangeText={setContactNo}
                placeholder="Contact No"
                keyboardType="numeric"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                required
              />
            </View>

            <View className="mt-[2vh] mb-[5vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleCreateAd}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  Create Ad
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
