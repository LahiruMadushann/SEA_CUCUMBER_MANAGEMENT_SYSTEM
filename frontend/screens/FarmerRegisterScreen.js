import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import FooterBar from "../components/FooterBar";



export default function FisheriesRegisterScreen() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [farmName, setFarmName] = useState("");
  const [password, setPassword] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [profilepic, setprofilepic] = useState("");

 

  return (
    <ScrollView className="flex-grow bg-white ">
      <View className="absolute w-[218vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
        <View className="flex-row">
          <View className="mt-[100vw] ml-[4vw]">
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <View className="flex m-[auto] ">
                <Image
                  source={require("../assets/main_board/arrow.png")}
                  className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-[101.5vw] ml-[11vw]">
            <TouchableOpacity
              onPress={() => navigation.navigate("AquaRegister")}
            >
              <View className="flex m-[auto] ">
                <Image
                  source={require("../assets/fisheries/dotIcon.png")}
                  className=" w-[24.21875px] h-[7.03125px] ml-[280px]"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-auto h-[48px] mt-[5.7475vw] mx-auto">
          <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">
            Farmer Registration
          </Text>
        </View>
      </View>

      <View className="p-4 mx-auto w-[80vw] h-[100vh] mb-[-28vw] mt-[60vw] rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
        <Text className="text-lg font-bold mb-4">Login Details</Text>

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={password}
          onChange={e => setPassword(e.target.valueOf)}
          placeholder="Enter Password"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={password}
          onChangeText={setPassword}
          placeholder="Re-Enter Password"
        />

        <Text className="text-lg font-bold mb-4 mt-5">Personal Details</Text>

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={gender}
          onChangeText={setGender}
          placeholder="Gender"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={age}
          onChangeText={setAge}
          placeholder="Age"
        />
        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={addressLine}
          onChangeText={setAddressLine}
          placeholder="Address"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={town}
          onChangeText={setTown}
          placeholder="Town"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={province}
          onChangeText={setProvince}
          placeholder="Province"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={country}
          onChangeText={setCountry}
          placeholder="Country"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Telephone Number"
        />

        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={profilepic}
          onChangeText={setprofilepic}
          placeholder="Select Picture"
        />
      </View>

      <View className="p-4 mx-auto w-[80vw] mt-[25vw]  rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-[25px] ">
        <Text className="text-lg font-bold mb-4">Farm Details</Text>
        <TextInput
          className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
          value={farmName}
          onChangeText={setFarmName}
          placeholder="Farm Name"
        />
      </View>
      <View>
        <TouchableOpacity
          className="rounded-[15px] w-[65vw] h-[6.2vh] p-2 bg-blue-800 justify-center items-center"
          oonPress={() => {
            // Call the registerFarmer function here
            changePassword();
          }}
        >
          <Text className="text-[18px] text-[#fff] font-bold">Submit</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-[4vh]">
      {/* registerFarmer */}
        <FooterBar />
      </View>
    </ScrollView>
  );
}
