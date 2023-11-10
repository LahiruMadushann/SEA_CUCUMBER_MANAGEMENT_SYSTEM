import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { LogBox } from "react-native";
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
import ProcessorPopupScreen from "../../components/UserPopupScreens/ProcessorPopupScreen";
import FishermanPopupScreen from "../../components/UserPopupScreens/FishermanPopupScreen";
import FooterBar from "../../components/FooterBar";

export default function UserProfileMainScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const { state, dispatch } = useAuth();
  // Access the token
  const token = state.token;

  console.log(token);

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
    nicNo: db_nicNo,
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
    accountType: accountType,
    profilepic: db_profilepic,
    createdAt: db_createdAt,
    fisheriesArea: fisheriesArea,
    divingLicenseNo: divingLicenseNo,
    fisheriesRegNo: fisheriesRegNo,
    boatRegNo: boatRegNo,
    idCard: idCard,
    companyName: companyName,
    processorRegNo: processorRegNo,
  } = decodedToken;

  console.log(accountType);

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/profile-pics`;
  const profilePicUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_profilepic}`;

  const handleDelete = async () => {
    // Clear the token by dispatching the CLEAR_TOKEN action

    Alert.alert(
      "Are you sure?",
      "Once you delete your account, you won't be able to recover it.",
      [
        {
          text: "Delete Account",
          onPress: () => {
            // Add your delete account logic here
            const userData = {
              userId: db_id,
            };
            const backendUrl = `${BASE_URL}/user/deleteAccount`;

            axios
              .post(backendUrl, userData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Account Deleted", response.data.message);

                  navigation.navigate("MainBoard");
                  dispatch({ type: "CLEAR_TOKEN" });
                } else {
                  Alert.alert("UnSuccessful", response.data.message);
                }
              })
              .catch((error) => {
                console.error("Error Deleting Account:", error);
                Alert.alert(
                  "Error",
                  "An error occurred while deleting the account."
                );
              });

            console.log("Delete Pressed");
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
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
            <View className="flex-row ml-[70vw]">
              <View className="mt-[110vw] ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("MainBoard")}
                >
                  <View className="flex m-[auto] ">
                    {/* <Image
                      source={require("../../assets/main_board/arrow.png")}
                      className=" w-[10.09216px] h-[15.62988px] "
                      style={{ zIndex: 2 }}
                    /> */}
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex m-[auto] absolute mt-[110vw]">
                {db_role === "Exporter" ? (
                  <ExporterPopupScreen />
                ) : db_role === "Farmer" ? (
                  <FarmerPopupScreen />
                ) : db_role === "District Aquaculturist" ? (
                  <AquaculturistPopupScreen />
                ) : db_role === "Processor" ? (
                  <ProcessorPopupScreen />
                ) : db_role === "Fisherman" ? (
                  <FishermanPopupScreen />
                ) : db_role === "Assistant Director" ||
                  "DirectorGeneral" ||
                  "Minister" ||
                  "Chairman" ? (
                  <NaqdaMngUsersPopupScreen />
                ) : null}
              </View>
            </View>

            {/* User Profile  */}
            <View className="flex-row" style={{ zIndex: -1 }}>
              <View className="mt-[6vw] ml-[80vw] ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateProfilePicScreen")}
                >
                  <View className="flex m-[auto]">
                    <Image
                      source={{ uri: profilePicUrl }}
                      className=" w-[61px] h-[61px] rounded-full bg-[#FFFFFF] shadow-lg shadow-gray-800"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="mt-[4vh] ml-[5vw]">
                <View className="flex m-[auto] ">
                  <Text className="text-[3.5vw] text-[#FFFFFF] ">
                    User Profile ({db_role})
                  </Text>
                  <Text className="text-[5vw] text-[#FFFFFF] font-bold">
                    {db_username}
                  </Text>
                  <View className="mt-[3vw]">
                    {db_accountStatus == "Inactive" ? (
                      <Image
                        source={require("../../assets/user/inactive.png")}
                        style={{ width: 15, height: 15 }}
                        className="rounded-full bg-[#FFFFFF]"
                      />
                    ) : db_accountStatus == "Active" ? (
                      <Image
                        source={require("../../assets/user/active.png")}
                        style={{ width: 15, height: 15 }}
                        className="rounded-full bg-[#FFFFFF]"
                      />
                    ) : null}
                    <Text
                      className="text-[4vw] ml-[5vw] mt-[-5vw] text-[#FFFFFF]"
                      style={{ fontStyle: "italic" }}
                    >
                      {db_accountStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* ----------------------------------------- */}
          </View>

          {/* Details Section */}

          <View className="flex-row mt-[66vw] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/user.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Name</Text>
              <Text className="text-[3.5vw] font-light">
                {db_firstName} {db_lastName}
              </Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/accountType.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Account Type</Text>
              {accountType === "individual" ? (
                <Text className="text-[3.5vw] font-light">
                  Individual Account
                </Text>
              ) : accountType === "group" ? (
                <Text className="text-[3.5vw] font-light">Group Account</Text>
              ) : accountType == null ? (
                <Text className="text-[3.5vw] font-light">
                  {db_role} Account
                </Text>
              ) : null}
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/email.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Email</Text>
              <Text className="text-[3.5vw] font-light">{db_email}</Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/role.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Role</Text>
              <Text className="text-[3.5vw] font-light">{db_role}</Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/nic.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">NIC No</Text>
              <Text className="text-[3.5vw] font-light">{db_nicNo}</Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/gender.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Gender</Text>
              <Text className="text-[3.5vw] font-light">{db_gender}</Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/birthday.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Age</Text>
              <Text className="text-[3.5vw] font-light">
                {db_age} years old
              </Text>
            </View>
          </View>

          <View className="flex-row mt-[3vh] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/phone.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw] ">
              <Text className="text-[4vw] font-bold  ">Telephone No</Text>
              <Text className="text-[3.5vw] font-light">{db_contactNo}</Text>
            </View>
          </View>

          <View className="flex-row mt-[8vw] ml-[18vw]">
            <View className=" ">
              <View className="flex m-[auto] ">
                <Image
                  source={require("../../assets/user/address.png")}
                  className=" w-[30px] h-[30px] "
                />
              </View>
            </View>

            <View className="flex ml-[6vw] mt-[-1vw]">
              <Text className="text-[4vw] font-bold">Address</Text>
              <Text className="text-[3.5vw] font-light">
                {db_address}, {db_town},{"\n"}
                {db_province},{"\n"}
                {db_country}
              </Text>
            </View>
          </View>

          {/* IF ROLE IS FISHERMEN DISPLAY THE BELOW CONTENT */}

          {db_role == "Fisherman" ? (
            <View className="mt-[5vh]">
              <Text className="text-[5vw] color-[#5A73F4] font-bold mx-[auto]">
                Fisheries Details
              </Text>

              <View className="flex-row mt-[3vh] ml-[15vw]">
                <View className=" ">
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/bullet.png")}
                      className=" w-[30px] h-[30px] "
                    />
                  </View>
                </View>

                <View className="flex ml-[2vw] mt-[-1vw] ">
                  <Text className="text-[4vw] font-bold  ">Id Card</Text>
                  <Text className="text-[3.5vw] font-light">{idCard}</Text>
                </View>
              </View>

              <View className="flex-row mt-[3vh] ml-[15vw]">
                <View className=" ">
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/bullet.png")}
                      className=" w-[30px] h-[30px] "
                    />
                  </View>
                </View>

                <View className="flex ml-[2vw] mt-[-1vw] ">
                  <Text className="text-[4vw] font-bold  ">
                    Diving License No
                  </Text>
                  <Text className="text-[3.5vw] font-light">
                    {divingLicenseNo}
                  </Text>
                </View>
              </View>

              {fisheriesRegNo && (
                <View className="flex-row mt-[3vh] ml-[15vw]">
                  <View className=" ">
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../../assets/user/bullet.png")}
                        className=" w-[30px] h-[30px] "
                      />
                    </View>
                  </View>

                  <View className="flex ml-[2vw] mt-[-1vw] ">
                    <Text className="text-[4vw] font-bold  ">
                      Fishing Registration No
                    </Text>
                    <Text className="text-[3.5vw] font-light">
                      {fisheriesRegNo}
                    </Text>
                  </View>
                </View>
              )}

              {boatRegNo && (
                <View className="flex-row mt-[3vh] ml-[15vw]">
                  <View className=" ">
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../../assets/user/bullet.png")}
                        className=" w-[30px] h-[30px] "
                      />
                    </View>
                  </View>

                  <View className="flex ml-[2vw] mt-[-1vw] ">
                    <Text className="text-[4vw] font-bold  ">
                      Boat Registration No
                    </Text>
                    <Text className="text-[3.5vw] font-light">{boatRegNo}</Text>
                  </View>
                </View>
              )}

              <View className="flex-row mt-[3vh] ml-[15vw]">
                <View className=" ">
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/bullet.png")}
                      className=" w-[30px] h-[30px] "
                    />
                  </View>
                </View>

                <View className="flex ml-[2vw] mt-[-1vw] ">
                  <Text className="text-[4vw] font-bold  ">Fisheries Area</Text>
                  <Text className="text-[3.5vw] font-light">
                    {fisheriesArea}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* IF ROLE IS PROCESSOR DISPLAY THE BELOW CONTENT */}

          {db_role == "Processor" ? (
            <View className="mt-[5vh]">
              <Text className="text-[5vw] color-[#5A73F4] font-bold mx-[auto]">
                Company Details
              </Text>

              <View className="flex-row mt-[3vh] ml-[15vw]">
                <View className=" ">
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/bullet.png")}
                      className=" w-[30px] h-[30px] "
                    />
                  </View>
                </View>

                <View className="flex ml-[2vw] mt-[-1vw] ">
                  <Text className="text-[4vw] font-bold  ">Company Name</Text>
                  <Text className="text-[3.5vw] font-light">{companyName}</Text>
                </View>
              </View>

              <View className="flex-row mt-[3vh] ml-[15vw]">
                <View className=" ">
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/user/bullet.png")}
                      className=" w-[30px] h-[30px] "
                    />
                  </View>
                </View>

                <View className="flex ml-[2vw] mt-[-1vw] ">
                  <Text className="text-[4vw] font-bold  ">
                    Registration No
                  </Text>
                  <Text className="text-[3.5vw] font-light">
                    {processorRegNo}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View className="flex ml-[6vw]  mt-[5vh] mb-[4vh]">
            <TouchableOpacity
              className="bg-[#D23434] rounded-[5px] w-[40vw] mx-auto justify-center py-[5px] px-[10px] shadow-sm shadow-gray-700"
              onPress={handleDelete}
            >
              <Text className="text-[#fff] text-[18px] font-bold text-center">
                Delete Account
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
