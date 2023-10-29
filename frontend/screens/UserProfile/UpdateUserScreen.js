import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

//Token DATA
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library

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
import { useNavigation } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";
import BASE_URL from "../../apiConfig/config";

export default function UpdateUserScreen() {
  const navigation = useNavigation();

  const { state, dispatch } = useAuth();
  // Access the token
  const token = state.token;
  // Decode the token
  const decodedToken = jwtDecode(token);

  const {
    _id: db_id,
    age: db_age,
    gender: db_gender,
    email: db_email,
    nicNo: db_nic,
    firstName: db_firstName,
    lastName: db_lastName,
    contactNo: db_contactNo,
    address: db_address,
    town: db_town,
    province: db_province,
    country: db_country,

    // farmId: db_farmId,
    // farmName: db_farmName,
    // accountStatus: db_accountStatus,
  } = decodedToken;

  const [firstName, setFirstName] = useState(db_firstName);
  const [lastName, setLastName] = useState(db_lastName);
  const [age, setAge] = useState(db_age);
  const [gender, setGender] = useState(db_gender);
  const [email, setEmail] = useState(db_email);
  const [nicNo, setNicNo] = useState(db_nic);
  const [contactNo, setContactNo] = useState(db_contactNo);
  const [address, setAddress] = useState(db_address);
  const [town, setTown] = useState(db_town);
  const [province, setProvince] = useState(db_province);
  const [country, setCountry] = useState(db_country);

  const handleUpdateDetails = () => {
    // Create a data object to send to the backend
    const userData = {
      userId: db_id,
      age: age,
      gender: gender,
      email: email,
      nicNo: nicNo,
      firstName: firstName,
      lastName: lastName,
      contactNo: contactNo,
      address: address,
      town: town,
      province: province,
      country: country,
    };

    // Replace with your backend URL
    const backendUrl = `${BASE_URL}/user/update`;

    // Send a POST request to update the password
    axios
      .put(backendUrl, userData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert(
            "User Details",
            "Your details has been updated successfully."
          );

          let updatedtoken = response.data.data;

          // Updating the Token
          dispatch({ type: "SET_TOKEN", payload: updatedtoken });

          console.log("UpdatedToken: ", updatedtoken);
          // Optionally, navigate to another screen after successful password update
          navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("Update Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating details:", error);
        Alert.alert("Error", "An error occurred while updating the details.");
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
                Update Details
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View className="mt-[6vh]">
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={firstName}
                onChangeText={setFirstName}
                placeholder={"FirstName"}
                required
              />

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={lastName}
                onChangeText={setLastName}
                placeholder="LastName"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={age.toString()}
                onChangeText={(text) => setAge(text)}
                placeholder="Age"
                keyboardType="numeric"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={gender}
                onChangeText={setGender}
                placeholder="Gender"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={nicNo}
                onChangeText={setNicNo}
                placeholder="NIC"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={contactNo}
                onChangeText={setContactNo}
                placeholder="ContactNo"
                keyboardType="numeric"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={town}
                onChangeText={setTown}
                placeholder="Town"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={province}
                onChangeText={setProvince}
                placeholder="Province"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={country}
                onChangeText={setCountry}
                placeholder="Country"
                required
              />
            </View>

            <View className="mt-[2vh] mb-[4vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleUpdateDetails}
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
