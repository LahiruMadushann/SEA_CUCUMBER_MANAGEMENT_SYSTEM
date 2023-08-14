import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

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
import { useNavigation } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

export default function ViewFarmingRecordsScreen() {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const TableRow = ({ label, value }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={styles.tableValue}>{value}</Text>
    </View>
  );

  // const handleUpdatePassword = () => {
  //   // Check if new password and confirm new password match
  //   if (newPassword !== confirmNewPassword) {
  //     Alert.alert("Password Mismatch", "New passwords do not match.");
  //     return;
  //   }

  //   // Create a data object to send to the backend
  //   const userData = {
  //     userId: db_id,
  //     oldpassword: oldPassword,
  //     newPassword: newPassword,
  //     confirmPassword: confirmNewPassword,
  //   };

  //   // Replace with your backend URL
  //   const backendUrl = "http://192.168.43.75:3000/farmer/changePassword";

  //   // Send a POST request to update the password
  //   axios
  //     .post(backendUrl, userData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         Alert.alert(
  //           "Password Updated",
  //           "Your password has been updated successfully."
  //         );
  //         // Optionally, navigate to another screen after successful password update
  //         // navigation.navigate("UserProfileMainScreen");
  //       } else {
  //         Alert.alert("Update Failed", response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating password:", error);
  //       Alert.alert("Error", "An error occurred while updating the password.");
  //     });
  // };

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
                    onPress={() => navigation.navigate("MainFarmScreen")}
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
              <Text className="text-center text-[#fff]  text-[18px] mt-[10vw] fixed">
                View
              </Text>
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Farming Records
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            {/* Table */}
            <FlatList
              data={[
                { label: "DATE", value: "TOTAL STOCK" },
                { label: "2023-07-05", value: "55Kg" },
                { label: "2023-06-12", value: "60Kg" },
                { label: "2023-05-12", value: "70Kg" },
                { label: "2023-04-11", value: "56Kg" },
                { label: "2023-03-18", value: "40Kg" },
                { label: "2023-02-13", value: "65Kg" },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewIndividualFarmingRecScreen")
                  }
                >
                  <TableRow label={item.label} value={item.value} />
                </TouchableOpacity>
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
