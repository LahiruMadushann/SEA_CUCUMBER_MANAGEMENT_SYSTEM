import React, { useState } from "react";

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
import { useNavigation } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

const listTab = [
  {
    status: "Detail",
  },
  {
    status: "Stock",
  },
];

const data = [
  {
    name: "Aqua Farm Name",
    subName: "First Fish Fairming",
    status: "Detail",
  },
  {
    name: "Address",
    subName: "Madiha, Matara",
    status: "Detail",
  },
  {
    name: "Owner Name",
    subName: "Lahiru Madushanka",
    status: "Detail",
  },
  {
    name: "Contact Number",
    subName: "+94765259905",
    status: "Detail",
  },
  {
    name: "Stoke",
    subName: "145.25 KG",
    status: "Stock",
  },
  {
    name: "Stoking Date",
    subName: "25th June,2023",
    status: "Stock",
  },
  {
    name: "Hatchery",
    subName: "The first hatchery Sri Lanka",
    status: "Stock",
  },
  {
    name: "Hatchery Batch",
    subName: "75th",
    status: "Stock",
  },
];

export default function KCIndividualSpecies() {
  const navigation = useNavigation();
  const [status, setStatus] = useState("Detail");
  const [datalist, setDatalist] = useState(
    data.filter((e) => e.status === "Detail")
  );
  const setStatusFilter = (status) => {
    if (status === "Detail") {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else if (status === "Stock") {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else {
      setDatalist(data);
    }

    setStatus(status);
  };

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#fff]">
        <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
          <View className="mt-[58vh] ">
            <View className="flex-row ">
              <View className=" ml-[4vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Knowledge_species")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../../assets/main_board/arrow.png")}
                      className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View className=" ml-[11vw]">
                <View className="flex m-[auto] absolute ">
                  <PopupScreen />
                </View>
              </View>
            </View>

            <Text className="text-center text-[#fff] font-bold text-[28px] mt-[10vw] fixed">
              Thelenota ananas
            </Text>
          </View>
        </View>

        <View className="mt-[32vh]">
          <Text className="text-justify text-[15px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            Thelenota ananas (pineapple sea cucumber) is a species of sea
            cucumber characterized by its large size, warm colors, and pointed,
            star-shaped teats covering the entire body, grouped in rows of 2 or
            3, as seen in Figure 1. {"\n"}
            {"\n"}Their body is reddish-orange in color, with the teats slightly
            darker. They are able to reach up to 70 centimeters 28 in in length,
            with a weight of between 3 kg to 6 kg, and have numerous large tube
            feet on the flat ventral side of their body. T. ananas is a slow
            growing organism.
          </Text>

          <View className="mt-[2vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
            <Image
              source={require("../../assets/knowledge_center/species_info.jpg")}
              className=" w-[80vw] h-[25.5vh] mt-[0.5vh] ml-[0.5vw] rounded-[50px] "
            />
          </View>

          <Text className="text-left text-[20px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
            Behavior
          </Text>

          <Text className="text-justify text-[15px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            T. ananas are widely distributed, but tracking these organisms in a
            non-invasive and accurate way is somewhat difficult. Mark and
            recapture methods can be difficult because their bodies are
            extendable, so measuring their body has proven difficult to
            scientists since the numbers are ever-changing. {"\n"}
            {"\n"}The body wall of T. ananas cannot be tagged because it affects
            the growth of the organism, and are later shed off altogether.
            Scratching marks into the body wall induces short-term trauma and
            does not last long enough for mark and recapture efforts. {"\n"}
            {"\n"}These methods all harm T. ananas in some form, so the best
            non-invasive way to track their growth and traveling is through
            photographs.
          </Text>

          <Text className="text-left text-[20px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">
            Parasites
          </Text>

          <Text className="text-justify text-[15px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
            T. ananas acts as a host to parasites identified as small
            siphonostome copepods within the genus Nanaspis. Arthur G. Humes of
            Boston University's Marine Program published research in 1973 that
            identified three new siphonostomes found onT. ananas. {"\n"}
            {"\n"}The research was conducted by collected and isolating T.
            ananas, washing them with 5% ethyl alcohol in sea water, and then
            passing a very fine mesh net through the wash water to collect the
            parasites.
          </Text>
        </View>
        <View className="mt-[4vh] ">
          <FooterBar />
        </View>
      </ScrollView>
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
  pdf: {
    flex: 1,
    width: "100%",
  },
});
