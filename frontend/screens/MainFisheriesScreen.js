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
import PopupScreen from "../components/PopupScreen";
import FooterBar from "../components/FooterBar";

const listTab = [
  {
    status: "Detail",
  },
  {
    status: "Stock",
  },
];

const data = [
  {
    name: "Aqua Farm Name",
    subName: "First Fish Fairming",
    status: "Detail",
  },
  {
    name: "Address",
    subName: "Madiha, Matara",
    status: "Detail",
  },
  {
    name: "Owner Name",
    subName: "Lahiru Madushanka",
    status: "Detail",
  },
  {
    name: "Contact Number",
    subName: "+94765259905",
    status: "Detail",
  },
  {
    name: "Stoke",
    subName: "145.25 KG",
    status: "Stock",
  },
  {
    name: "Stoking Date",
    subName: "25th June,2023",
    status: "Stock",
  },
  {
    name: "Hatchery",
    subName: "The first hatchery Sri Lanka",
    status: "Stock",
  },
  {
    name: "Hatchery Batch",
    subName: "75th",
    status: "Stock",
  },
];

export default function MainFisheriesScreen() {
  const navigation = useNavigation();
  const [status, setStatus] = useState("Detail");
  const [datalist, setDatalist] = useState(
    data.filter((e) => e.status === "Detail")
  );
  const setStatusFilter = (status) => {
    if (status === "Detail") {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else if (status === "Stock") {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else {
      setDatalist(data);
    }

    setStatus(status);
  };

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#fff]">
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
            </View>

            <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
              Welcome to Fisheries Section
            </Text>
          </View>
        </View>

        <View className="mt-[36vh]">
          <View className="mt-[1vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
            <Image
              source={require("../assets/aquaculture/fish.png")}
              className=" w-[80vw] h-[25.5vh]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
            />
          </View>
          <Text className="text-center text-[22px] mt-[5vh] font-bold text-[#000000A6]">
            Sea cucumber fisheries
          </Text>
          <Text className="text-justify text-[18px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            Sea cucumbers are usually harvested from the sea floor, either by
            hand or using tools like tongs or hooks. Harvesting methods should
            be sustainable to avoid overexploitation and damage to the marine
            ecosystem.
          </Text>

          <Text className="text-left text-[20px] mt-[5vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
            Why you should use this app?
          </Text>

          <Text className="text-justify text-[18px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            Fishermen can log their catch data directly in the app, recording
            details such as species, quantity, size, and location. This
            contributes to accurate stock assessment and management.
          </Text>
          <Text className="text-justify text-[18px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            Users can contribute to the monitoring of marine ecosystem health by
            reporting unusual trends, ecological shifts, or other observations
            that might impact sea cucumber populations.
          </Text>

          <Text className="text-left text-[20px] mt-[5vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
            Benefits of using this app
          </Text>

          <Text className="text-justify text-[18px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            Researchers and marine biologists can collaborate with fishermen by
            sharing data and observations. This information exchange can
            contribute to scientific understanding and conservation efforts.
          </Text>
        </View>
        <View className="mt-[4vh]">
          <FooterBar />
        </View>
      </ScrollView>
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
