import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

import { LogBox } from "react-native";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function ViewIndividualFarmingRecScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || "";
  const farmName = route.params?.farmName || "";
  const farmingId = route.params?.farmingId || "";

  const [singleStockData, setSingleStockData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllStockData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/districtAquaCulturist/getFarmingDetailsFromId`,
          { farmingId: farmingId }
        );
        setSingleStockData(response.data.data); // Update state with fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    }

    fetchAllStockData();
  }, [farmId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    stock: db_stock,
    stockingDates: db_stockingDates,
    hatchery: db_hatchery,
    hatcheryBatch: db_hatcheryBatch,
    harvest: db_harvest,
    size: db_size,
    survival: db_survival,
    diseases: db_diseases,
    date: db_date,
  } = singleStockData.length > 0 ? singleStockData[0] : {};

  console.log(singleStockData);

  const TableRow = ({ label, value }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={styles.tableValue}>{value}</Text>
    </View>
  );

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
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
                    onPress={() =>
                      navigation.navigate("ViewFarmingRecordsScreen", {
                        farmId: farmId,
                        farmName: farmName,
                      })
                    }
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
                Farming Records {farmName}
              </Text>
              <Text className="text-center text-[#fff]  text-[18px] mt-[2vw] fixed">
                Date : {formatDate(db_date)}
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            {/* Table */}
            <FlatList
              data={[
                { label: "Stock", value: `${db_stock}` },
                { label: "StockingDates", value: `${db_stockingDates}` },
                { label: "Hatchery", value: `${db_hatchery}` },
                { label: "HatcheryBatch", value: `${db_hatcheryBatch}` },
                { label: "Harvest", value: `${db_harvest}` },
                { label: "Size", value: `${db_size}` },
                { label: "Survival", value: `${db_survival}` },
                { label: "Diseases", value: `${db_diseases}` },
              ]}
              renderItem={({ item }) => (
                <TableRow label={item.label} value={item.value} />
              )}
              keyExtractor={(item) => item.label}
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
    fontSize: 16,
    color: "gray",
  },
  tableValue: {
    fontSize: 16,
    color: "black",
  },
});
