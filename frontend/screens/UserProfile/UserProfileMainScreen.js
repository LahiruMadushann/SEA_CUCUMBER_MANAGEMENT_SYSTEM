import React, { useState } from "react";
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
import NaqdaMngUsersPopupScreen from "../../components/UserPopupScreens/NaqdaMngUsersPopupScreen";
import FarmerPopupScreen from "../../components/UserPopupScreens/FarmerPopupScreen";
import ExporterPopupScreen from "../../components/UserPopupScreens/ExporterPopupScreen";
import AquaculturistPopupScreen from "../../components/UserPopupScreens/AquaculturistPopupScreen";
import FooterBar from "../../components/FooterBar";

export default function UserProfileMainScreen() {
  const navigation = useNavigation();

  const { state } = useAuth();
  // Access the token
  const token = state.token;
  // Decode the token
  const decodedToken = jwtDecode(token);

  // Access payload data from the decoded token
  const {
    _id: db_id,
    username: db_username,
    role: db_role,
    age: db_age,
    gender: db_gender,
    email: db_email,
    firstName: db_firstName,
    lastName: db_lastName,
    contactNo: db_contactNo,
    address: db_address,
    town: db_town,
    province: db_province,
    country: db_country,
    farmId: db_farmId,
    farmName: db_farmName,
    accountStatus: db_accountStatus,
    profilepic: db_profilepic,
    createdAt: db_createdAt,
  } = decodedToken;

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
            <View className="flex-row ml-[70vw]">
              <View className="mt-[110vw] ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("MainBoard")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/main_board/arrow.png")}
                      className=" w-[10.09216px] h-[15.62988px] "
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex m-[auto] absolute mt-[132vw]">
                {db_role === "Exporter" ? (
                  <ExporterPopupScreen />
                ) : db_role === "Farmer" ? (
                  <FarmerPopupScreen />
                ) : db_role === "District Aquaculturist" ? (
                  <AquaculturistPopupScreen />
                ) : db_role === "AssitantDirector" ||
                  "DirectorGeneral" ||
                  "Chairman" ? (
                  <NaqdaMngUsersPopupScreen />
                ) : null}
              </View>
            </View>

            {/* User Profile  */}
            <View className="flex-row">
              <View className="mt-[6vw] ml-[80vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateProfilePicScreen")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/user.png")}
                      className=" w-[61px] h-[61px] "
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="mt-[4vw] ml-[5vw]">
                <View className="flex m-[auto] ">
                  <Text className="text-[3.5vw] text-[#FFFFFF] ">
                    User Profile
                  </Text>
                  <Text className="text-[5vw] text-[#FFFFFF] font-bold">
                    {db_username}
                  </Text>
                </View>
              </View>
            </View>
            {/* ----------------------------------------- */}
          </View>

          {/* Details Section */}

          <View className="flex-row mt-[66vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/email.png")}
                    className=" w-[17px] h-[15px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Email</Text>
              <Text className="text-[3.5vw] font-light">{db_email}</Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/name.png")}
                    className=" w-[16px] h-[18px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Name</Text>
              <Text className="text-[3.5vw] font-light">
                {db_firstName} {db_lastName}
              </Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/job.png")}
                    className=" w-[16px] h-[18px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Role</Text>
              <Text className="text-[3.5vw] font-light">{db_role}</Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/gender.png")}
                    className=" w-[16px] h-[19px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Gender</Text>
              <Text className="text-[3.5vw] font-light">{db_gender}</Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/birthday.png")}
                    className=" w-[16px] h-[18px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Age</Text>
              <Text className="text-[3.5vw] font-light">
                {db_age} years old
              </Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/phone.png")}
                    className=" w-[12px] h-[18px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Telephone No</Text>
              <Text className="text-[3.5vw] font-light">+94765259905</Text>
            </View>
          </View>

          <View className="flex-row mt-[10vw] ml-[18vw]">
            <View className=" ">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../../assets/user/address.png")}
                    className=" w-[16px] h-[18px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw]  mb-[5vw]">
              <Text className="text-[4vw] font-bold  ">Address</Text>
              <Text className="text-[3.5vw] font-light">
                {db_address}, {db_town},{"\n"}
                {db_province},{"\n"}
                {db_country}
              </Text>
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
