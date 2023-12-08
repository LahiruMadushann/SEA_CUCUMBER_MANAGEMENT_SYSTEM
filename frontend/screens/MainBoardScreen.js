import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";
import MainBoardPopupScreen from "../components/MainBoardPopupScreen";
import BASE_URL from "../apiConfig/config";

import { useAuth } from "../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library

export default function MainBoardScreen() {
  const navigation = useNavigation();
  const { state } = useAuth(); // Access the dispatch function from the context
  const hasToken = state.token;

  let profilePicUrl = "";

  if (hasToken) {
    const decodedToken = jwtDecode(hasToken);

    // Access payload data from the decoded token
    const { profilepic: db_profilepic } = decodedToken;
    console.log("Profile pic: ", db_profilepic);

    const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/profile-pics`;
    profilePicUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_profilepic}`;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          {/* <StatusBar barStyle="dark-content" /> */}

          <View
            className="absolute w-[auto] h-[60vh] left-[-27vw] top-[0vh] bg-[#0013C0] rounded-b-full"
            style={{ zIndex: -1 }}
          >
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("../assets/main_board/main_image.jpg")}
                className="w-[auto] h-[60vh] center rounded-b-full"
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>

          <View className="flex-row mt-[15vw]">
            {hasToken && (
              <View className="mt-[1vw] ml-[10vw]" style={{ zIndex: -1 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserProfileMainScreen")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={{ uri: profilePicUrl }}
                      className=" w-[35px] h-[35px] rounded-full"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {!hasToken && (
              <View className="ml-[8vw]" style={{ zIndex: 1 }}>
                <View className="flex m-[auto]">
                  <MainBoardPopupScreen />
                </View>
              </View>
            )}
          </View>

          <View className="mx-auto" style={{ zIndex: -1 }}>
            <Text className="text-center text-[6vw] text-[#ffff] font-bold mt-[5vw] mb-[10vw]">
              Main Board
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MainFisheriesScreen")}
              className="w-[74vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700"
            >
              <View className="flex ">
                <View>
                  <Image
                    source={require("../assets/main_board/fishing.png")}
                    className="w-[73px] h-[55px] ml-[39px] mt-[35px]"
                  />
                </View>
                <View>
                  <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-60px] ml-[24vw]">
                    Fisheries
                  </Text>
                  <Text className="text-center text-[12px] mt-[-2px] ml-[30vw] flex-auto  mr-5">
                    Navigate the seas sustainably, harvesting ocean treasures to
                    support thriving ecosystems.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("MainAquaFarmScreen")}
              className="w-[74vw] mt-[6vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
            >
              <View className="flex ">
                <Image
                  source={require("../assets/main_board/farming.png")}
                  className="w-[73px] h-[55px] ml-[35px] mt-[35px]"
                />
                <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-60px] ml-24">
                  Farming
                </Text>
                <Text className="text-center text-[12px] mt-[4] ml-[30vw] mr-[9vw] flex-auto">
                  Foster the growth of seacucumbers through ensuring quality and
                  sustainability.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("KnowledgeMain")}
              className="w-[74vw] mt-[6vw] h-[18vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700  "
            >
              <View className="flex ">
                <Image
                  source={require("../assets/main_board/knowledge.png")}
                  className="w-[73px] h-[55px] ml-[39px] mt-[35px]"
                />
                <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-60px] ml-24">
                  Knowledge
                </Text>
                <Text className="text-center text-[12px] mt-1 ml-[30vw] mr-[5vw] flex-auto ">
                  Delve into the world of seacucumbers, gaining insights to
                  enhance your understanding.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
