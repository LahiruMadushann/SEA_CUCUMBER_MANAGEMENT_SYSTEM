import React, { useState } from "react";

import { View, Text, TouchableOpacity, Modal, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MainBoardPopupScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" " style={{ zIndex: 999 }}>
      <View className="ml-[80vw]">
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../assets/options.png")} className=" w-[24.21875px] h-[28px]" />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={styles.menu} className="ml-[50vw] ">
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
          <TouchableOpacity onPress={() => navigation.navigate("FAQScreen")}>
            <View style={styles.tab}>
              <Text className="mx-[1vw]">FAQ</Text>
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
    zIndex: 999,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    top: 20,
    left: 55,
  },

  tab: {
    padding: 5,
    paddingHorizontal: 15,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
});
