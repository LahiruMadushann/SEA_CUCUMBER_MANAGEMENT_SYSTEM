import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View>
            <View className="absolute w-[149.2vw] h-[35vh] inset-x-[-104px] top-[-22px] bg-[#0013C0]  rounded-b-full ">
              <View className="flex-row">
                <View className="ml-[42vw] mt-[10vh]">
                  <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] " />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row mt-[30px] mx-auto">
                <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
                  <View className="ml-7 w-[78px] h-[73px] ">
                    <Image source={require("../assets/register/Register.png")} className="w-[78px] h-[73px] center" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
                  <View className=" w-[226px] h-[48px] mt-[15px]">
                    <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">Register Panel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/*REGISTER AS A FARMER */}
            <View className="mx-auto self-center mt-[54vw] ">
              <TouchableOpacity
                onPress={() => navigation.navigate("FarmerRegister")}
                className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
              >
                <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
                  <Text className="text-[15px] font-bold text-[#000000A6]">Register as a</Text>
                </View>

                <View className="flex ">
                  <Image source={require("../assets/main_board/fishing.png")} className="w-[73px] h-[55px] ml-[39px] mt-[4px]" />
                  <Text className="text-right mr-[45px] text-[18px] font-bold flex-auto mt-[-65px] ml-[15px]">Farmer</Text>
                  <Text className=" text-[10px] mt-[4px] ml-[130px] mr-8 text-justify flex-auto ">
                    Become a farmer by registering to engage in aquaculture, accessing information on best practices, and connecting with a supportive
                    community of like-minded individuals.
                  </Text>
                </View>
              </TouchableOpacity>

              {/*REGISTER AS A FISHERMAN */}
              <TouchableOpacity
                onPress={() => navigation.navigate("FishermanRegisterScreen")}
                className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700"
              >
                <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
                  <Text className="text-[15px] font-bold text-[#000000A6]">Register as a</Text>
                </View>
                <View className="flex ">
                  <Image source={require("../assets/register/scuba.png")} className="w-[73px] h-[55px] ml-[39px] mt-[4px]" />
                  <Text className="text-right mr-[45px] text-[18px] font-bold flex-auto mt-[-65px] ml-[83px]">Fisherman</Text>
                  <Text className="text-[10px] mt-[4px] ml-[130px] text-justify mr-8 flex-auto">
                    Join as a fisherman to access tools, resources, and a collaborative community for optimizing fishing activities and promoting
                    sustainable practices.
                  </Text>
                </View>
              </TouchableOpacity>

              {/*REGISTER AS A EXPORTER */}
              <TouchableOpacity
                onPress={() => navigation.navigate("ExporterRegister")}
                className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700 pb-2"
              >
                <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
                  <Text className="text-[15px] font-bold text-[#000000A6]">Register as a</Text>
                </View>
                <View className="flex ">
                  <Image source={require("../assets/main_board/farming.png")} className="w-[73px] h-[55px] ml-[39px] mt-[4px]" />
                  <Text className="text-right mr-[45px] text-[18px] font-bold flex-auto mt-[-65px] ml-8">Exporter</Text>
                  <Text className="text-[10px] mt-[4px] ml-[130px] text-justify mr-8 flex-auto">
                    Register as an exporter to oversee international distribution processes and ensure compliance with global standards.
                  </Text>
                </View>
              </TouchableOpacity>

              {/*REGISTER AS A FISH PROCESSOR */}
              <TouchableOpacity
                onPress={() => navigation.navigate("ProcessorRegisterScreen")}
                className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700 mb-[12vw]"
              >
                <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
                  <Text className="text-[15px] font-bold text-[#000000A6]">Register as a</Text>
                </View>
                <View className="flex ">
                  <Image source={require("../assets/register/processors.png")} className="w-[80px] h-[60px] ml-[39px] mt-[10px]" />
                  <Text className="text-right mr-[45px] text-[18px] font-bold flex-auto mt-[-75px] ml-[83px]">Processor</Text>
                  <Text className="text-[10px] mt-[4px] ml-[130px] text-justify mr-8 flex-auto">
                    Register as a processor to gain insights, tools, and guidelines for efficiently transforming raw marine products into high-quality
                    goods ready for the market.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
