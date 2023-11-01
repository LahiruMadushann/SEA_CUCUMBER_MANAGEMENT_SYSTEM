import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

export default function MainFisheriesScreen() {
  const navigation = useNavigation();

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
                    onPress={() => navigation.navigate("MainBoard")}
                  >
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../assets/main_board/arrow.png")}
                        className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="ml-[70vw]">
                  <TouchableOpacity
                  //onPress={()}
                  >
                    <Image
                      source={require("../assets/info.png")}
                      className=" w-[25px] h-[25px] ml-[0vw]"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
                Welcome to Fisheries Section
              </Text>
            </View>
          </View>

          <View className="mt-[36vh] mb-[2vh]">
            <View className="mt-[1vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
              <Image
                source={require("../assets/aquaculture/fish.png")}
                className=" w-[80vw] h-[25.5vh]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
              />
            </View>
            <Text className="text-center text-[15px] mt-[5vh] font-bold text-[#000000A6]">
              Sea cucumber fisheries
            </Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
              Sea cucumbers are usually harvested from the sea floor, either by
              hand or using tools like tongs or hooks. Harvesting methods should
              be sustainable to avoid overexploitation and damage to the marine
              ecosystem.
            </Text>

            <Text className="text-left text-[15px] mt-[5vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
              Why you should use this app?
            </Text>

            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
              Fishermen can log their catch data directly in the app, recording
              details such as species, quantity, size, and location. This
              contributes to accurate stock assessment and management.
            </Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
              Users can contribute to the monitoring of marine ecosystem health
              by reporting unusual trends, ecological shifts, or other
              observations that might impact sea cucumber populations.
            </Text>

            <Text className="text-left text-[15px] mt-[5vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
              Benefits of using this app
            </Text>

            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
              Researchers and marine biologists can collaborate with fishermen
              by sharing data and observations. This information exchange can
              contribute to scientific understanding and conservation efforts.
            </Text>
          </View>
        </ScrollView>
        <View>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  btnTab: {
    flexDirection: "row",

    justifyContent: "center",

    fontWeight: "bold",
    color: "#3644C5",
    textAlign: "center",
    fontSize: 14,
    paddingLeft: 31,
    paddingRight: 31,
    paddingTop: 5,
    paddingBottom: 5,

    borderRadius: 8,
    borderBottomRightRadius: 0,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#3644C5",
  },
  textTabActive: {
    color: "#fff",
  },
  itemContainer: {},
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemStatus: {
    backgroundColor: "green",
    paddingHorizontal: 6,
    justifyContent: "center",
    right: 12,
  },
});
