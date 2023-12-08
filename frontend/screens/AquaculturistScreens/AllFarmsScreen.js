import React, { useState, useEffect } from "react";
import { Alert, ScrollViewComponent } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { FlatList } from "react-native";
import filter from "lodash.filter";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

import LoadingIndicator from "../LoadingIndicatorScreen";

export default function AllFarmsScreen() {
  const navigation = useNavigation();

  const [allFarmData, setAllFarmData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllFarmData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/districtAquaCulturist/getAllAquaFarmDetails`
        );
        setAllFarmData(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching farm data:", error);
        setIsLoading(false);
      }
    }

    fetchAllFarmData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleSearch = (query) => {
    setSearchText(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(allFarmData, (farms) => {
      return contains(farms, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name }, query) => {
    const formattedFarmName = name.toLowerCase();
    return formattedFarmName.includes(query);
  };

  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
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
                All Aquaculture Farms
              </Text>
              {/* <View className="mt-[4vh] mx-auto" style={{ opacity: 0.5 }}>
                <Image
                  source={require("../../assets/farms/farms.png")}
                  className=" w-[90vw] h-[15vh]  mt-[0.5vh] ml-[0.5vw] rounded-[10px] "
                />
              </View> */}
              <TextInput
                style={{ height: 50, borderColor: "gray", borderWidth: 1 }}
                className="w-[75vw] mt-5 mx-auto rounded-[15px] p-4 mb-4 bg-[#EBEEF9] text-black"
                onChangeText={(query) => handleSearch(query)}
                value={searchText}
                placeholder="Search by Farm Name"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View className="mt-[33vh] mx-auto h-[55vh]">
            {/* Loop through allFarmData and display farm details */}
            <FlatList
              data={data}
              keyExtractor={(farm) => farm._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MainFarmScreen", {
                      farmId: item._id,
                      farmName: item.name,
                      directedFarm: "allFarmsPage",
                    })
                  }
                  className="w-[82vw] h-[auto] pb-[2vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
                >
                  <View key={item._id}>
                    <View className="w-[auto] h-[25px] ml-[5vw] mt-[4vw] flex-row ">
                      <Text className="text-[18px] font-bold text-[#5A73F4]">
                        {item.name}
                      </Text>
                    </View>

                    <View className="flex mt-[1vw] ml-[10vw]">
                      <Text className=" text-[15px] flex-auto mt-[1vw]">
                        Location : {item.location}
                      </Text>
                      {item.stock && (
                        <Text className=" text-[15px] flex-auto mt-[1vw] ">
                          Total Stock : {item.stock}
                        </Text>
                      )}
                      {!item.stock && (
                        <Text className=" text-[15px] flex-auto mt-[1vw] ">
                          No Stock available
                        </Text>
                      )}
                      {item.stock && (
                        <Text className=" text-[15px] flex-auto mt-[1vw]">
                          Last stock update :{" "}
                          {`${formatDate(item.stockingDates)}`}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
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
  farmContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  farmName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  farmAddress: {
    fontSize: 16,
    color: "#666",
  },
});
