import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { LogBox } from "react-native";
<<<<<<< Updated upstream
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
=======
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from "react-native";
>>>>>>> Stashed changes
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

//import BASE_URL from "../apiConfig/config";

export default function ContactUsScreen() {
  //LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [comment, setComment] = useState("");

  const handleAddFormSubmit = () => {
    if (email == "" || name == "" || contactNo == "" || comment == "") {
      return Alert.alert("Invalid Input", "Please fill all the fields");
    }

    const insertData = {
      name: name,
      email: email,
      contactNo: contactNo,
      comment: comment,
    };

    const insertUrl = `${BASE_URL}/user/contactUs`;

    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
<<<<<<< Updated upstream
          Alert.alert("Success", response.data.message);
=======
>>>>>>> Stashed changes
          setName("");
          setEmail("");
          setContactNo("");
          setComment("");
        } else {
          Alert.alert("Unsuccessful", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending Otp:", error);
        Alert.alert("Error", "An error occurred while sending Message");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[162vw] h-[50vh] left-[-32vw] top-[-20vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="ml-[42vw] mt-[32vh]">
                <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
                  <View className="flex m-[auto] ">
                    <Image source={require("../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] " />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[5vw]">Contact Us</Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View className="mx-auto">
              <TextInput
                className=" text-[15px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <TextInput
                className="text-[15px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />

              <TextInput
                className="text-[15px] border-b border-[#00000040] text-gray-700 p-1 w-[84vw]  mb-3"
                value={contactNo}
                onChangeText={setContactNo}
                placeholder="Telephone No"
                keyboardType="numeric"
              />

              <TextInput
                className="text-[15dpx] border-b border-[#00000040] text-gray-700 p-1 w-[84vw] h-[auto]  mb-3"
                value={comment}
                onChangeText={setComment}
                placeholder="Comment"
                multiline={true}
              />

              <View className="mb-4 mt-4 mx-auto">
                <TouchableOpacity
                  className="rounded-[15px] w-[65vw] h-[6.2vh] p-2 bg-blue-800 justify-center items-center"
                  onPress={handleAddFormSubmit}
                >
                  <Text className="text-[18px] text-[#fff] font-bold">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="border-b-[0.55px] border-b-gray-500 mt-[8vw]" />
          <View className="mt-[2vh] mx-[14vw]">
            <Text className="text-[12px] font-bold mb-[1.5vh]">For more information</Text>
            <View className="mx-[8vw]">
              <View className="flex-row mb-[1.2vh]">
                <View>
                  <Image source={require("../assets/contact/phone.png")} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                </View>
                <View>
                  <Text className="text-[11px] ml-[4vw]">+94765259905</Text>
                </View>
              </View>

              <View className="flex-row mb-[1.2vh] ">
                <View>
                  <Image source={require("../assets/contact/email.png")} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                </View>
                <View>
                  <Text className="text-[11px] ml-[4vw]">seacucumbermanager@gmail.com</Text>
                </View>
              </View>

              <View className="flex-row mb-[3vh] ">
                <View>
                  <Image source={require("../assets/contact/address.png")} className=" w-[12px] h-[10px] mt-[0.4vh]" />
                </View>
                <View>
                  <Text className="text-[11px] ml-[4vw]">Negombo, Sri Lanka</Text>
                </View>
              </View>
            </View>
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
