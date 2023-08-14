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
import FarmPopupScreen from "../../components/FarmPopupScreen";
import UserPopupScreen from "../../components/UserPopupScreen";
import FooterBar from "../../components/FooterBar";

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
    subName: "SeaGem Cucumber Farms",
    status: "Detail",
  },
  {
    name: "Address",
    subName: "123 Ocean Avenue",
    status: "Detail",
  },
  {
    name: "Years Working",
    subName: "5 years",
    status: "Detail",
  },
  {
    name: "licenseNo",
    subName: "FARM2023-001",
    status: "Detail",
  },
  {
    name: "validity",
    subName: "2023-12-31",
    status: "Detail",
  },
  {
    name: "location",
    subName: "Coastal Bay Area",
    status: "Detail",
  },
  {
    name: "extend",
    subName: "10 acres",
    status: "Detail",
  },
  {
    name: "gpsCoordinates",
    subName: "40.7128° N, 74.0060° W",
    status: "Detail",
  },
  {
    name: "farmInternal",
    subName: "Yes",
    status: "Detail",
  },
  {
    name: "establishmentDate",
    subName: "2023-03-15",
    status: "Detail",
  },

  {
    name: "Stock",
    subName: "Holothuria scabra",
    status: "Stock",
  },
  {
    name: "Stocking Date",
    subName: "2023-04-15",
    status: "Stock",
  },
  {
    name: "Hatchery",
    subName: "Sea Cucumber Hatcheries Ltd",
    status: "Stock",
  },
  {
    name: "Hatchery Batch",
    subName: "Batch001",
    status: "Stock",
  },
  {
    name: "Harvest",
    subName: "2023-09-01",
    status: "Stock",
  },
  {
    name: "Size",
    subName: "40Kg",
    status: "Stock",
  },
  {
    name: "Survival",
    subName: "87%",
    status: "Stock",
  },
  {
    name: "Diseases",
    subName: "None",
    status: "Stock",
  },
  {
    name: "Date",
    subName: "75th",
    status: "Stock",
  },
];

export default function MainFarmScreen() {
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
                <View className="flex m-[auto] absolute mt-[10vw] ml-[80vw]">
                  <FarmPopupScreen />
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[1vw] fixed">
                Aquaculture Farm
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <Text className="text-center text-[22px] font-bold text-[#000000A6]">
              SeaGem Cucumber Farms
            </Text>

            <View className="mt-[1vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
              <Image
                source={require("../../assets/farms/mainpic.png")}
                className=" w-[80vw] h-[25.5vh]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
              />
            </View>

            <View className="mt-[-32vh]" style={styles.listTab}>
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.btnTabActive,
                  ]}
                  className="mx-[2vw] w-[164px] h-[30px] mt-[36vh]"
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text
                    style={[
                      styles.textTab,
                      status === e.status && styles.textTabActive,
                    ]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {datalist.map((item, index) => (
              <View key={index} className="flex-row py-[2.5vw]">
                <View className="ml-[16vw] mt-[-1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    {item.name}
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {item.subName}
                  </Text>
                </View>
              </View>
            ))}
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
