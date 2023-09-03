import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
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
import FooterBar from "../../components/FooterBar";

export default function MainAdvertisementScreen() {
  const navigation = useNavigation();

  const [allAdvertisementData, setAllAdvertisementData] = useState([]);
  const [filterType, setFilterType] = useState("All"); // Default filter is "All"

  useEffect(() => {
    async function fetchAllAdvertisementData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getAllAdvertisements`
        );
        setAllAdvertisementData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      }
    }

    fetchAllAdvertisementData();
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (rawDateTime) => {
    const dateTime = new Date(rawDateTime);
    const hours = dateTime.getUTCHours();
    const minutes = dateTime.getUTCMinutes();
    const seconds = dateTime.getUTCSeconds();

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
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
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MainBoard")}
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
                Advertisements
              </Text>

              <View className="flex w-[auto] mb-[3vw] ml-[59vw] mt-[8vw]">
                <Image
                  source={require("../../assets/notification/advertisement.png")}
                  className=" w-[140px] h-[130px] ml-[5vw] rounded-[10px] "
                />

                <View className=" w-[200px] text-[#0000ff] flex-auto mt-[-33vw] ml-[45vw]">
                  <Button title="All" onPress={() => setFilterType("All")} />
                  <Button
                    title="Promotion"
                    onPress={() => setFilterType("promotion")}
                  />
                  <Button
                    title="Vacancy"
                    onPress={() => setFilterType("vacancy")}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="mt-[50vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}

            {allAdvertisementData.map((advertisement) => {
              if (filterType === "All" || filterType === advertisement.type) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleAdvertisementScreen", {
                        advertisementId: advertisement._id,
                      })
                    }
                    className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
                  >
                    <View className="w-[140px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
                      <Image
                        source={require("../../assets/notification/calender.png")}
                        className="w-[13px] h-[15px] ml-[10vw]"
                      />
                      <Text className="text-[11px] font-bold text-[#000000A6] ml-[2vw]">
                        {`${formatDate(
                          advertisement.createdAt
                        )} at ${formatTime(advertisement.createdAt)}`}
                      </Text>
                    </View>

                    <View className="flex ml-[2.5vw]">
                      <Image
                        source={require("../../assets/notification/bell.png")}
                        className="w-[18px] h-[20px] ml-[9.8vw] mt-[1vw]"
                      />
                      <Text className=" text-[11px] font-bold flex-auto mt-[-5vw] ml-[17vw] mr-[10vw]">
                        {advertisement.title}
                      </Text>
                    </View>

                    {advertisement.type === "promotion" && (
                      <View className="flex mx-[30vw] w-[200px] ml-[45vw] mb-[3vw] mt-[3vw]">
                        <Image
                          source={require("../../assets/notification/promotion.png")}
                          className="w-[15px] h-[18px] ml-[11vw]"
                        />
                        <Text className=" text-[12px] text-[#0000ff] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                          Promotion
                        </Text>
                      </View>
                    )}

                    {advertisement.type === "vacancy" && (
                      <View className="flex mx-[30vw] w-[200px] mb-[3vw] ml-[45vw] mt-[3vw]">
                        <Image
                          source={require("../../assets/notification/vacancy.png")}
                          className="w-[18px] h-[20px] ml-[11vw] mt-[1vw]"
                        />
                        <Text className=" text-[12px] text-[#00ff00] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                          Vacancy
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
              return null; // Do not render if not matching filter type
            })}
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
