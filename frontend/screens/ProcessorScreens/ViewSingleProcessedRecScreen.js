import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function ViewSingleProcessedRecScreen() {
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

  const route = useRoute();
  // Access the recordId parameter from route.params
  const recordId = route.params?.recordId || "";

  const [singleProcessedDetails, setSingleProcessedDetails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchSingleProcessedDetails() {
      try {
        const response = await axios.post(
          `${BASE_URL}/processer/getSingleProcessedDetails`,
          { recordId: recordId }
        );
        setSingleProcessedDetails(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    }

    fetchSingleProcessedDetails();
  }, [recordId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    spiecesType: db_spiecesType,
    weight: db_weight,
    receivedFrom: db_receivedFrom,
    date: db_date,
  } = singleProcessedDetails.length > 0 ? singleProcessedDetails[0] : {};

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
                      navigation.navigate("ViewProcessedRecordsScreen")
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
                { label: "spiecesType", value: `${db_spiecesType}` },
                { label: "weight", value: `${db_weight}` },
                { label: "receivedFrom", value: `${db_receivedFrom}` },
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
