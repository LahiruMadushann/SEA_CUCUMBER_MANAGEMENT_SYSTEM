import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/apiConfig";
import axios from "axios";

//import { WebView } from "react-native-webview";
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FarmPopupScreen from "../../components/FarmPopupScreen";
import FooterBar from "../../components/FooterBar";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";
import { decode as base64decode } from "base-64";
global.atob = base64decode;

export default function MainFarmScreen() {
  const route = useRoute(); // Get the route object
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || "";
  const farmName = route.params?.farmName || "";

  const directedFarm = route.params?.directedFarm || "";

  const updateScreen = route.params?.updateScreen || "";

  const { state } = useAuth();

  const token = state.token;
  // const decodedToken = jwtDecode(token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const { role: db_role } = decodedToken;
  // console.log(db_role);

  let haveFarmAccess;
  let haveCallAccess;

  if (db_role == "Exporter" || db_role == "Assistant Director") {
    haveFarmAccess = false;
  } else {
    haveFarmAccess = true;
  }

  if (db_role == "Exporter") {
    haveCallAccess = true;
  } else {
    haveCallAccess = false;
  }

  // console.log("Update Screen : ", updateScreen);

  const [farmData, setFarmData] = useState([]);
  const [allStockData, setAllStockData] = useState([]);

  useEffect(() => {
    console.log("useEffect is running");
    async function fetchFarmData() {
      try {
        const response = await axios.post(`${BASE_URL}/districtAquaCulturist/getAquaFarmDetails`, { farmId: farmId });
        setFarmData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    }

    async function fetchStockData() {
      try {
        const response = await axios.post(`${BASE_URL}/districtAquaCulturist/getFarmingDetailsOfSingleFarm`, { farmId: farmId });
        setAllStockData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    fetchFarmData();
    fetchStockData();
  }, [farmId]);

  console.log("Farm Data :", farmData);

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

  const {
    _id: db_farmId,
    name: db_name,
    licenseNo: db_licenseNo,
    validity: db_validity,
    location: db_location,
    extend: db_extend,
    gpsCoordinatesOne: db_gpsCoordinatesOne,
    gpsCoordinatesTwo: db_gpsCoordinatesTwo,
    gpsCoordinatesThree: db_gpsCoordinatesThree,
    gpsCoordinatesFour: db_gpsCoordinatesFour,
    farmInternal: db_farmInternal,
    establishmentDate: db_establishmentDate,
    contactNo: db_contactNo,
    picture: db_picture,
  } = farmData;

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/farm-pics`;
  const profilePicUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_picture}`;

  // console.log(profilePicUrl);

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
                  {!directedFarm && (
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfileMainScreen")}>
                      <View className="flex m-[auto] ">
                        <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                      </View>
                    </TouchableOpacity>
                  )}
                  {directedFarm == "allFarmsPage" && (
                    <TouchableOpacity onPress={() => navigation.navigate("AllFarmsScreen")}>
                      <View className="flex m-[auto] ">
                        <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                {haveFarmAccess && (
                  <View className="flex m-[auto] absolute ml-[80vw]">
                    <FarmPopupScreen farmId={db_farmId} farmName={db_name} />
                  </View>
                )}
              </View>

              <Text style={{ zIndex: -1 }} className="text-center text-[#fff] font-bold text-[22px] mt-[1vw] fixed">
                Aquaculture Farm
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <Text className="text-center text-[22px] font-bold text-[#000000A6]">{farmData.name}</Text>

            <View className="mt-[1vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
              <Image source={{ uri: profilePicUrl }} className=" w-[80vw] h-[25.5vh]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] " />
            </View>

            {/* <View>
              <WebView
                source={{
                  html: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d158593.503734646!2d80.01017143727412!3d9.628194039152763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1693728427746!5m2!1sen!2slk" width="100%" height="500" style="border:0;" allowfullscreen="yes" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                }}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  width: "80%",
                  height: 200,
                }}
              />
            </View> */}

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
                  <Text className="text-[13px] font-bold text-[#000000A6]">Aqua Farm Name</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_name}</Text>
                </View>

                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Contact No</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_contactNo}</Text>
                </View>

                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">License No</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_licenseNo}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Validity</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_validity}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Location</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_location}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Extend</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_extend}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">GPS Coordinates</Text>
                  <Text className="text-[13px] text-[#000000A6]">
                    {db_gpsCoordinatesOne}
                    {"\n"}
                    {db_gpsCoordinatesTwo}
                    {"\n"}
                    {db_gpsCoordinatesThree}
                    {"\n"}
                    {db_gpsCoordinatesFour}
                  </Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Farm Internal</Text>
                  <Text className="text-[13px] text-[#000000A6]">{db_farmInternal}</Text>
                </View>
                <View className="ml-[16vw] mt-[1.8vh]">
                  <Text className="text-[13px] font-bold text-[#000000A6]">Establishment Date</Text>
                  <Text className="text-[13px] text-[#000000A6]">{`${formatDate(db_establishmentDate)}`}</Text>
                </View>
              </View>
            )}
            {status === "Stock" && (
              <View className="flex-col py-[2.5vw]">
                <View className="mt-[0vh]">
                  {/* Table */}
                  <FlatList
                    data={[...allStockData].slice(0, 10)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ViewIndividualFarmingRecScreen", {
                            farmId: farmId,
                            farmName: farmName,
                            farmingId: item._id,
                          })
                        }
                      >
                        <TableRow label={formatDate(item.stockingDates)} value={`${item.stock} Kg`} />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                </View>
              </View>
            )}
          </View>
          {haveCallAccess && (
            <View className="mt-[2vh] mb-[4vh]">
              <TouchableOpacity
                className="bg-[#5A73F4] rounded-[2px] shadow-lg shadow-gray-700 w-[25vw] mx-auto justify-center py-[5px] px-[10px]"
                onPress={() => Linking.openURL("tel:" + db_contactNo)}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">Call Now</Text>
              </TouchableOpacity>
            </View>
          )}
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
