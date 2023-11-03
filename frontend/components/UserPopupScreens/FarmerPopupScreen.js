import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UserPopupScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { state } = useAuth();

  const token = state.token;
  const decodedToken = jwtDecode(token);

  const {
    farmId: db_farmId,
    farmName: db_farmName,
    accountStatus: db_accountStatus,
  } = decodedToken;

  // Logout Functionalities
  const { dispatch } = useAuth();

  const handleLogout = async () => {
    // Clear the token by dispatching the CLEAR_TOKEN action
    dispatch({ type: "CLEAR_TOKEN" });

    navigation.navigate("MainBoard");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" " style={{ zIndex: 999 }}>
      <View className="ml-[80vw]">
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require("../../assets/options.png")}
            className=" w-[24.21875px] h-[28px]"
          />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={styles.menu} className="ml-[50vw] ">
          {db_accountStatus == "Active" && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MainFarmScreen", {
                  farmId: db_farmId,
                  farmName: db_farmName,
                })
              }
            >
              <View style={styles.tab}>
                <Text className="mx-[1vw]">Farm </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdatePasswordScreen")}
          >
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Update Password</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateUserScreen")}
          >
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Update Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Logout</Text>
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
    left: 15,
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
