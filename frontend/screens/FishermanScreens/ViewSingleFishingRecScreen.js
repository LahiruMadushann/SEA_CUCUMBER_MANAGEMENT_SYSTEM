import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { Alert } from "react-native";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function ViewSingleFishingRecScreen() {
  const navigation = useNavigation();
  const { state } = useAuth();
  const token = state.token;
  const decodedToken = jwtDecode(token);

  const [isLoading, setIsLoading] = useState(false);

  const {
    _id: db_id,
    firstName: db_firstName,
    lastName: db_lastName,
    role: db_role,
  } = decodedToken;

  // let backNav;
  // if (db_role == "Exporter") {
  //   backNav = "SingleProcessorScreen";
  // } else if (db_role == "Processor") {
  //   backNav = "ViewProcessedRecordsScreen";
  // }

  // console.log(backNav);

  const route = useRoute();
  // Access the recordId parameter from route.params
  const fishingId = route.params?.fishingId || "";

  console.log("Fishing ID", fishingId);

  const [singleFishingDetails, setSingleFishingDetails] = useState([]);

  const handleDelete = async () => {
    Alert.alert(
      "Are you sure?",
      "Once you delete the record , you won't be able to recover it.",
      [
        {
          text: "Delete Record",
          onPress: () => {
            const recordData = {
              fishingId: fishingId,
            };
            const backendUrl = `${BASE_URL}/fisherman/deleteFishingDetails`;

            axios
              .post(backendUrl, recordData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Record Deleted", response.data.message);

                  navigation.navigate("ViewAllFishingRecordsScreen");
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

  useEffect(() => {
    setIsLoading(true);
    async function fetchSingleFishingDetails() {
      try {
        const response = await axios.post(
          `${BASE_URL}/fisherman/getSingleFishingDetails`,
          { fishingId: fishingId }
        );
        setSingleFishingDetails(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    }

    fetchSingleFishingDetails();
  }, [fishingId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    speciesType: db_speciesType,
    numOfSpecies: db_numOfSpecies,
    fishingArea: db_fishingArea,
    buyer: db_buyer,
    buyingPrice: db_buyingPrice,
    date: db_date,
    fishingImage: db_fishingImage,
  } = singleFishingDetails.length > 0 ? singleFishingDetails[0] : {};

  const BASE_URL_FOR_STOCK_PICS = `${BASE_URL}/fishingStock-pics`;
  const stockImageUrl = `${BASE_URL_FOR_STOCK_PICS}/${db_fishingImage}`;

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
                      navigation.navigate("ViewAllFishingRecordsScreen")
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
                Processed Records
              </Text>
              <Text className="text-center text-[#fff]  text-[18px] mt-[2vw] fixed">
                {db_firstName} {db_lastName}
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
                { label: "Spieces Type", value: `${db_speciesType}` },
                { label: "Number of Species", value: `${db_numOfSpecies}` },
                { label: "Fishing Area", value: `${db_fishingArea}` },
                {
                  label: "Buyer",
                  value: `${db_buyer}`,
                },
                {
                  label: "Buying Price",
                  value: `Rs. ${db_buyingPrice}`,
                },
              ]}
              renderItem={({ item }) => (
                <TableRow label={item.label} value={item.value} />
              )}
              keyExtractor={(item) => item.label}
            />
          </View>
          <View className="flex m-[auto] mt-[2vh]">
            <Image
              source={{ uri: stockImageUrl }}
              className=" w-[80vw] h-[30vh] rounded-[2px] bg-[#FFFFFF] shadow-lg shadow-gray-800"
            />
          </View>
          <View className="flex-row mb-[2vh] mr-[5vw] mt-[5vw] justify-end">
            <TouchableOpacity
              className="bg-[#D23434] rounded-[5px] w-[40vw] py-[5px] px-[10px] shadow-sm shadow-gray-700"
              onPress={handleDelete}
            >
              <Text className="text-[#fff] text-[15px] font-bold text-center">
                Delete Record
              </Text>
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
