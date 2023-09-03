import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FarmPopupScreen({ farmId, farmName }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" " style={{ zIndex: 999 }}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../assets/options.png")}
          className=" w-[24.21875px] h-[28px] ml-[70vw]"
        />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu} className="ml-[40vw] ">
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <View style={styles.tab}>
              <Text className="mx-[1vw]">Register</Text>
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
