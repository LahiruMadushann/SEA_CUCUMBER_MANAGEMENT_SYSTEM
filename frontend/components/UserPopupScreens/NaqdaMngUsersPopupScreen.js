import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NaqdaMngUsersPopupScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { state } = useAuth();
  // Access the token
  const token = state.token;

  const decodedToken = jwtDecode(token);

  // Access payload data from the decoded token
  const { farmId: db_farmId, farmName: db_farmName } = decodedToken;

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
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../../assets/options.png")}
          className=" w-[24.21875px] h-[25px] ml-[70vw]"
        />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu} className="ml-[50vw] ">
          <TouchableOpacity
            onPress={() => navigation.navigate("FarmRegisterScreen")}
          >
            <Text className="mx-[1vw]">Register Farms </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AllFarmsScreen")}
          >
            <Text className="mx-[1vw]">Enter News </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("EnterSeaCucumberRatesScreen")}
          >
            <Text className="mx-[1vw]">Enter Rates </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAdsScreen")}
          >
            <Text className="mx-[1vw]">Enter Rules and Regulations </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdatePasswordScreen")}
          >
            <Text className="mx-[1vw]">Update Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateUserScreen")}
          >
            <Text className="mx-[1vw]">Update Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text className="mx-[1vw]">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#fff",
    padding: 10,

    zIndex: 999,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    top: 15,
    left: 30,
  },
});
