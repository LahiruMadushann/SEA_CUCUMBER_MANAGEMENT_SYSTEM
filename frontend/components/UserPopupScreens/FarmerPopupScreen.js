import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

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

export default function UserPopupScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const { dispatch } = useAuth(); // Access the dispatch function from the context

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
        <View style={styles.menu} className="ml-[40vw] ">
          <TouchableOpacity
            onPress={() => navigation.navigate("MainFarmScreen")}
          >
            <Text className="mx-[1vw]">Farm </Text>
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
