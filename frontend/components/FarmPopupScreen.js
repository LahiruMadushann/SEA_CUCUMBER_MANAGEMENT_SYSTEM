import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Alert } from "react-native";
import BASE_URL from "../apiConfig/config";
import axios from "axios";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FarmPopupScreen({ farmId, farmName }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Are you sure?",
      "Once you delete the farm, you won't be able to recover it.",
      [
        {
          text: "Delete Farm",
          onPress: () => {
            const userData = {
              farmId: farmId,
            };
            console.log("FarmID: ", farmId);
            const backendUrl = `${BASE_URL}/districtAquaCulturist/deleteFarmDetails`;

            axios
              .post(backendUrl, userData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Farm Deleted", response.data.message);

                  navigation.navigate("UserProfileMainScreen");
                } else {
                  Alert.alert("UnSuccessful", response.data.message);
                }
              })
              .catch((error) => {
                console.error("Error Deleting Farm:", error);
                Alert.alert(
                  "Error",
                  "An error occurred while deleting the farm."
                );
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

  return (
    <View className=" " style={{ zIndex: 999 }}>
      <View className="ml-[80vw]">
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require("../assets/options.png")}
            className=" w-[24.21875px] h-[28px]"
          />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={styles.menu} className="ml-[40vw] ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateFarmScreen", {
                farmId: farmId,
                farmName: farmName,
              })
            }
          >
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Update Farm </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateFarmingScreen", { farmId: farmId })
            }
          >
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Update Stock Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewFarmingRecordsScreen", {
                farmId: farmId,
                farmName: farmName,
              })
            }
          >
            <View style={styles.tab}>
              <Text className="mx-[1vw]">View Records</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Delete Farm</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    top: 20,
    left: 38,
  },

  tab: {
    padding: 5,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
});
