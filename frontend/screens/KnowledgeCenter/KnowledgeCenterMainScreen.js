import React, { useState } from "react";
import { View, TextInput, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import { SafeAreaView } from "react-native-safe-area-context";

const images = {
  "seaCucumberA.png": require("../../assets/knowledge_center/seaCucumberA.png"),
};

export default function KnowledgeCenterMainScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row mt-[60vh]">
              <View className=" ml-[4vw]">
                <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
                  <View className="flex m-[auto] ">
                    <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-[2vh] mx-auto">
              <Text className="text-[22px] text-center font-bold text-[#FFFFFF]">Knowledge Center</Text>
              <Image
                source={require("../../assets/knowledge_center/knowledge-center.png")}
                className="w-[40vw] h-[120px] mt-[2vh] mb-[1vh] mx-auto"
              />
            </View>
          </View>
          <View className="mt-[80vw] mx-auto">
            <TouchableOpacity
              onPress={() => navigation.navigate("Knowledge_species")}
              className="w-[74vw] h-[auto] rounded-[15px] bg-[#FFFFFF] shadow-lg shadow-gray-700"
            >
              <View className="flex-row mt-[1vh] mb-[1vh] ml-[1vh]">
                <Image source={require("../../assets/knowledge_center/seaCucumber.png")} className="w-[20vw] h-[75px] rounded-[10px] rounded-full" />
                <Text className="text-center text-[5.6vw] font-bold flex-auto my-auto ">Sea cucumber Species</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View className="mt-[10vw] mx-auto">
            <TouchableOpacity
              onPress={() => navigation.navigate("Knowledge_species")}
              className="w-[74vw] h-[15vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
            >
              <View className="flex">
                <Image
                  source={require("../../assets/knowledge_center/videos_icon.jpg")}
                  className="w-[20vw] h-[55px] ml-[39px] mt-[21px] rounded-[10px]"
                />
                <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-55px] ml-24">
                  Sea cucumber {"\n"}Videos
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View className="mt-[10vw] mx-auto flex-auto">
            <TouchableOpacity
              onPress={() => navigation.navigate("ArticlesCategoryScreen")}
              className="w-[74vw] h-[auto] rounded-[15px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
            >
              <View className="flex-row mt-[1vh] mb-[1vh] ml-[1vh]">
                <Image source={require("../../assets/knowledge_center/articles.png")} className="w-[20vw] h-[75px] rounded-[10px] rounded-full" />
                <Text className="text-center text-[5.6vw] font-bold flex-auto my-auto">Articles</Text>
              </View>
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
