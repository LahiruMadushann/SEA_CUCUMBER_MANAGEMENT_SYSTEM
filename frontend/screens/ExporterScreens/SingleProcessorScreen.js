import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/config";
import axios from "axios";

import { WebView } from "react-native-webview";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import FarmPopupScreen from "../../components/FarmPopupScreen";
import FooterBar from "../../components/FooterBar";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

export default function SingleProcessorScreen() {
  const route = useRoute();

  const processorId = route.params?.processorId || "";

  const { state } = useAuth();

  const token = state.token;
  const decodedToken = jwtDecode(token);

  const { role: db_role } = decodedToken;
  console.log(db_role);

  let haveFarmAccess;

  if (db_role == "Exporter") {
    haveFarmAccess = false;
  } else {
    haveFarmAccess = true;
  }

  const [processorDetails, setProcessorDetails] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    async function fetchProcessorDetails() {
      try {
        const response = await axios.post(
          `${BASE_URL}/exporter/getIndividualProcessorDetails`,
          { userId: processorId }
        );
        console.log("Response: ", response.data.data);
        setProcessorDetails(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching farm data:", error.message);
        console.log("asdasd", error.message);
      }
    }

    // async function fetchStockData() {
    //   try {
    //     const response = await axios.post(
    //       `${BASE_URL}/districtAquaCulturist/getAquaFarmingDetails`,
    //       { processorId: processorId }
    //     );
    //     setStockData(response.data.data); // Update state with fetched data
    //   } catch (error) {
    //     console.error("Error fetching stock data:", error);
    //   }
    // }

    fetchProcessorDetails();
    // fetchStockData();
  }, [processorId]);

  // console.log(farmData);
  // console.log(stockData);
  console.log("Processor ID: " + processorId);

  // const {
  //   stock: db_stock,
  //   stockingDates: db_stockingDates,
  //   hatchery: db_hatchery,
  //   hatcheryBatch: db_hatcheryBatch,
  //   harvest: db_harvest,
  //   size: db_size,
  //   survival: db_survival,
  //   diseases: db_diseases,
  //   date: db_date,
  // } = stockData.length > 0 ? stockData[0] : {};

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

  // const BASE_URL_FOR_PROFILE_PICS = "http://192.168.43.75:3000/farm-pics";
  // const profilePicUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_picture}`;

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
  const [datalist, setDatalist] = useState(
    data.filter((e) => e.status === "Detail")
  );

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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[60vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]" style={{ zIndex: -1 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AllProcessorsScreen")}
                  >
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../../assets/main_board/arrow.png")}
                        className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* <View className="flex m-[auto] absolute ml-[80vw]">
                  <FarmPopupScreen farmId={db_farmId} farmName={db_name} />
                </View> */}
              </View>

              <Text
                style={{ zIndex: -1 }}
                className="text-center text-[#fff] font-bold text-[22px] mt-[1vw] fixed"
              >
                Processor
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <Text className="text-center text-[22px] font-bold text-[#000000A6]">
              {processorDetails.firstName}
            </Text>

            {/* <View className="mt-[1vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
              <Image
                source={{ uri: profilePicUrl }}
                className=" w-[80vw] h-[25.5vh]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
              />
            </View> */}

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

            {/* Display Details or Stock Info based on the selected tab */}
            {status === "Detail" && (
              <View className="flex-col py-[2.5vw]">
                <View className="ml-[16vw]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Name
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname} {db_lname}
                  </Text>
                </View>

                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Contact No
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_contactNo}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Email
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_email}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Address
                  </Text>
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
                <View className="ml-[16vw]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Stock
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>

                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Stocking Dates
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Hatchery
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Hatchery Batch
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Harvest
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Size
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Survival
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Diseases
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">
                    Date
                  </Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_fname}
                  </Text>
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
});
