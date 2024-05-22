import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/apiConfig";
import axios from "axios";

import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Linking } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";
import { decode as base64decode } from "base-64";
global.atob = base64decode;

export default function SingleProcessorScreen() {
  const route = useRoute();

  const processorId = route.params?.processorId || "";

  const { state } = useAuth();

  const token = state.token;
  //const decodedToken = jwtDecode(token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const { role: db_role } = decodedToken;
  console.log(db_role);

  let haveFarmAccess;

  if (db_role == "Exporter") {
    haveFarmAccess = false;
  } else {
    haveFarmAccess = true;
  }

  const [processorDetails, setProcessorDetails] = useState([]);
  const [processedDetails, setProcessedDetails] = useState([]);

  useEffect(() => {
    async function fetchProcessorDetails() {
      try {
        const response = await axios.post(`${BASE_URL}/exporter/getIndividualProcessorDetails`, { userId: processorId });

        setProcessorDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching farm data:", error.message);
        console.log("asdasd", error.message);
      }
    }

    async function fetchProcessedDetails() {
      try {
        const response = await axios.post(`${BASE_URL}/processer/getProcessedDetails`, { processorId: processorId });
        setProcessedDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    fetchProcessorDetails();
    fetchProcessedDetails();
  }, [processorId]);

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

  console.log("All Procesed Details: -----> ", processedDetails);
  console.log("Processor ID: " + processorId);

  const {
    _id: db_processorId,
    firstName: db_fname,
    lastName: db_lname,
    contactNo: db_contactNo,
    address: db_address,
    town: db_town,
    province: db_province,
    country: db_country,
    email: db_email,
    profilepic: db_profilepic,
  } = processorDetails;

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/profile-pics`;
  const profilePicUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_profilepic}`;

  const listTab = [
    {
      status: "Detail",
    },
    {
      status: "Stock",
    },
  ];

  const data = [];

  const navigation = useNavigation();

  const [status, setStatus] = useState("Detail");
  const [datalist, setDatalist] = useState(data.filter((e) => e.status === "Detail"));

  const setStatusFilter = (status) => {
    if (status === "Detail") {
      setDatalist(data.filter((e) => e.status === "Details"));
    } else if (status === "Stock") {
      setDatalist(data.filter((e) => e.status === "Stock"));
    } else {
      setDatalist(data);
    }

    setStatus(status);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[60vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]" style={{ zIndex: -1 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("AllProcessorsScreen")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={{ zIndex: -1 }} className="text-center text-[#fff] font-bold text-[22px] mt-[1vw] fixed">
                {processorDetails.firstName} {processorDetails.lastName}
                {"\n"}
                (Processor)
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <Image source={{ uri: profilePicUrl }} className=" w-[61px] h-[61px] mx-[auto] rounded-full bg-[#FFFFFF] shadow-lg shadow-gray-800" />

            <View className="mt-[2vh]">
              <TouchableOpacity
                className="bg-[#5A73F4] rounded-[2px] shadow-lg shadow-gray-700 w-[25vw] mx-auto justify-center py-[5px] px-[10px]"
                onPress={() => Linking.openURL("tel:" + db_contactNo)}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">Call Now</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-[-32vh]" style={styles.listTab}>
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                  className="mx-[2vw] w-[164px] h-[30px] mt-[36vh]"
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>{e.status}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Display Details or Stock Info based on the selected tab */}
            {status === "Detail" && (
              <View className="flex-col py-[2.5vw]">
                <View className="ml-[16vw]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Name</Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname} {db_lname}
                  </Text>
                </View>

                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Contact No</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_contactNo}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Email</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_email}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Address</Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_address} {db_town},{"\n"}
                    {db_province},{"\n"}
                    {db_country}
                  </Text>
                </View>
              </View>
            )}
            {status === "Stock" && (
              <View className="flex-col py-[2.5vw]">
                <View className="mt-[2vh]">
                  <View className="flex-row mx-[auto] text-[#000] text-[12px] mb-[4vw]">
                    <Image
                      source={require("../../assets/processor/farmed.png")}
                      style={{ width: 10, height: 10, marginRight: 5 }}
                      className="flex my-[auto]"
                    />
                    <Text className="flex text-center text-[#000] text-[12px]">Farm collected</Text>

                    <Image
                      source={require("../../assets/processor/fished.png")}
                      style={{ width: 10, height: 10, marginRight: 5 }}
                      className="flex ml-[2vw] my-[auto]"
                    />
                    <Text className="flex text-center text-[#000] text-[12px]">Wild Collected</Text>
                  </View>
                  {/* Table */}
                  <FlatList
                    data={[...processedDetails].slice(0, 10)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ViewSingleProcessedRecScreen", {
                            recordId: item._id,
                          })
                        }
                      >
                        <TableRow
                          label={formatDate(item.date)}
                          value={
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {item.collectedFrom === "farmed" ? (
                                <Image
                                  source={require("../../assets/processor/farmed.png")}
                                  style={{
                                    width: 10,
                                    height: 10,
                                    marginRight: 5,
                                  }}
                                />
                              ) : item.collectedFrom === "fished" ? (
                                <Image
                                  source={require("../../assets/processor/fished.png")}
                                  style={{
                                    width: 10,
                                    height: 10,
                                    marginRight: 5,
                                  }}
                                />
                              ) : null}

                              <Text>{`${item.speciesType} - ${item.weight}Kg`}</Text>
                            </View>
                          }
                        />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                </View>
              </View>
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

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#00000040",
  },
  tableLabel: {
    fontSize: 12,
    color: "gray",
  },
  tableValue: {
    fontSize: 12,
    color: "black",
  },
});
