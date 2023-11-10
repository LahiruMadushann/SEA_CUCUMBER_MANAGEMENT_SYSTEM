import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

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

  const { state } = useAuth();
  const token = state.token;
  const decodedToken = jwtDecode(token);

  const {
    _id: db_id,
    firstName: db_firstName,
    lastName: db_lastName,
    role: db_role,
  } = decodedToken;

  let backNav;
  if (db_role == "Exporter") {
    backNav = "MainFarmScreen";
  } else if (db_role == "Farmer" || db_role == "District Aquaculturist") {
    backNav = "ViewFarmingRecordsScreen";
  }

  const route = useRoute();
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || "";
  const farmName = route.params?.farmName || "";
  const farmingId = route.params?.farmingId || "";

  const [singleStockData, setSingleStockData] = useState([]);

  const handleDelete = async () => {
    Alert.alert(
      "Are you sure?",
      "Once you delete the record , you won't be able to recover it.",
      [
        {
          text: "Delete Record",
          onPress: () => {
            const recordData = {
              farmingId: farmingId,
            };
            const backendUrl = `${BASE_URL}/districtAquaCulturist/deleteFarmingStockDetails`;

            axios
              .post(backendUrl, recordData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Record Deleted", response.data.message);

                  navigation.navigate("MainFarmScreen");
                } else {
                  Alert.alert("UnSuccessful", response.data.message);
                }
              })
              .catch((error) => {
                console.error("Server Error:", error);
                Alert.alert("Error", "Server Error");
              });

            console.log("Delete Pressed");
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };
  console.log("role", db_role);

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
                      navigation.navigate(backNav, {
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
                Farming Records{"\n"}
                {farmName}
              </Text>
              <Text className="text-center text-[#fff]  text-[18px] mt-[2vw] fixed">
                Stocking Date : {formatDate(db_stockingDates)}
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            {/* Table */}
            <FlatList
              data={[
                { label: "Stock", value: `${db_stock} kg` },
                { label: "Hatchery", value: `${db_hatchery}` },
                { label: "HatcheryBatch", value: `${db_hatcheryBatch}` },
                { label: "Harvest", value: `${formatDate(db_harvest)}` },
                { label: "Size", value: `${db_size}` },
                { label: "Survival", value: `${db_survival}%` },
                { label: "Diseases", value: `${db_diseases}` },
              ]}
              renderItem={({ item }) => (
                <TableRow label={item.label} value={item.value} />
              )}
              keyExtractor={(item) => item.label}
            />
          </View>
          <View className="flex-row mb-[2vh] mt-[4vh] mr-[5vw] justify-end">
            {["Farmer", "District Aquaculturist"].includes(db_role) && (
              <TouchableOpacity
                className="bg-[#D23434] rounded-[5px] w-[40vw] py-[5px] px-[10px] shadow-sm shadow-gray-700"
                onPress={handleDelete}
              >
                <Text className="text-[#fff] text-[15px] font-bold text-center">
                  Delete Record
                </Text>
              </TouchableOpacity>
            )}
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
