import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/apiConfig";
import { LogBox } from "react-native";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";
import { decode as base64decode } from "base-64";
global.atob = base64decode;
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

import LoadingIndicator from "../LoadingIndicatorScreen";

export default function ViewAllFishingRecordsScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useAuth();
  const token = state.token;
  // const decodedToken = jwtDecode(token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const route = useRoute();

  const { _id: db_id, firstName: db_firstName, lastName: db_lastName, role: db_role } = decodedToken;

  const [allFishingData, setAllFishingData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchFishingDetails() {
      try {
        const response = await axios.post(`${BASE_URL}/fisherman/getFishingDetailsByFisherman`, { fishermanId: db_id });
        setAllFishingData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Fishing data:", error);
        setIsLoading(false);
      }
    }

    fetchFishingDetails();
  }, [db_id]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  console.log(allFishingData);

  const TableRow = ({ label, value }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={styles.tableValue}>{value}</Text>
    </View>
  );

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity onPress={() => navigation.navigate("UserProfileMainScreen")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-center text-[#fff]  text-[18px] mt-[10vw] fixed">
                View {db_firstName} {db_lastName}
              </Text>
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">Fishing Records</Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            {/* Table */}
            <FlatList
              data={[...allFishingData]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewSingleFishingRecScreen", {
                      fishingId: item._id,
                    })
                  }
                >
                  <TableRow
                    label={formatDate(item.date)}
                    value={
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>{`${item.speciesType} - ${item.numOfSpecies}Kg`}</Text>
                      </View>
                    }
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
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
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00000040",
  },
  tableLabel: {
    fontSize: 14,
    color: "gray",
  },
  tableValue: {
    fontSize: 14,
    color: "black",
  },
});
