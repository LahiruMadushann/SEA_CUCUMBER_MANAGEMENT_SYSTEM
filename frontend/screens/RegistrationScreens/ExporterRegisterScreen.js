import React, { useState } from "react";
import BASE_URL from "../../apiConfig/config";
import axios from "axios";
import { Alert } from "react-native";
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
import FooterBar from "../../components/FooterBar";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function ExporterRegisterScreen() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [image, setImage] = useState(null); // Use state for selected image

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); // Update the image state with the selected image URI
    }
  };

  const handleRegistration = async () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      nicNo == "" ||
      username == "" ||
      password == "" ||
      confirmPassword == "" ||
      address == "" ||
      town == "" ||
      province == "" ||
      country == "" ||
      phoneNumber == "" ||
      gender == "" ||
      age == ""
    ) {
      Alert.alert("Empty Field", "Please fill all the fields");
    } else if (password != confirmPassword) {
      Alert.alert("Password Mismatch", "Please Enter Matching Passwords");
    } else if (phoneNumber.length != 10) {
      return Alert.alert(
        "Invalid Input",
        "Please enter a valid 10-digit Contact No"
      );
    } else if (!email.includes("@")) {
      return Alert.alert("Invalid Input", "Please enter a valid email address");
    } else if (!/[A-Z]/.test(password)) {
      return Alert.alert(
        "Invalid Input",
        "Password must contain at least one uppercase letter"
      );
    } else if (!/\d/.test(password)) {
      return Alert.alert(
        "Invalid Input",
        "Password must contain at least one digit"
      );
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("nicNo", nicNo);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("town", town);
    formData.append("province", province);
    formData.append("country", country);
    formData.append("contactNo", phoneNumber);
    formData.append("profilepic", {
      uri: image,
      type: "image/jpeg", // Change to the appropriate MIME type if needed
      name: "profile.jpg", // Change to the desired file name
    });

    const backendUrl = `${BASE_URL}/exporter/register`; // Replace with your actual backend URL

    try {
      const response = await axios.post(backendUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success == true) {
        // Handle backend response if needed
        //console.log("Backend response:", response.data);
        Alert.alert(
          "Registration Successful",
          "Please Log in to access your account"
        );
        navigation.navigate("Login");
      }

      if (response.data.success == false) {
        console.log("Backend response:", response.data);
        return Alert.alert("Registration Unsuccessful", response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="flex-grow bg-white "
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[218vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="mt-[100vw] ml-[4vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
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

            <View className="w-auto h-[48px] mt-[5.7475vw] mx-auto">
              <Text className=" font-bold text-[#FFFFFF] ml-[10vw] text-center text-[22px] px-[31px] py-[5px] ">
                Exporter Registration
              </Text>
              <Image
                source={require("../../assets/register/exporter.png")}
                className=" w-[160px] h-[160px] ml-[90px] mt-[0vw]"
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>

          <View className="p-4 mx-auto w-[80vw] h-[auto] mb-[-28vw] mt-[60vw] rounded-[10px] bg-[#FFFFFF] shadow-lg shadow-gray-700  ">
            <Text className="text-lg font-bold mb-4">Login Details</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                required
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute ml-[60vw]"
              >
                <Image
                  source={
                    showPassword
                      ? require("../../assets/login/eye.png")
                      : require("../../assets/login/eye-crossed.png")
                  }
                  className="w-[6vw] mb-[3vh] h-[3vh]"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-Enter Password"
                secureTextEntry={!showConfirmPassword}
                required
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                className="absolute ml-[60vw]"
              >
                <Image
                  source={
                    showConfirmPassword
                      ? require("../../assets/login/eye.png")
                      : require("../../assets/login/eye-crossed.png")
                  }
                  className="w-[6vw] mb-[2vh] h-[3vh]"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-bold mb-4 mt-5">
              Personal Details
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>

              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={email}
                onChangeText={setEmail}
                placeholder="Email (example@gmail.com)"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={nicNo}
                onChangeText={setNicNo}
                placeholder="NIC No"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <Picker
                style={styles.picker}
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item
                  style={styles.pickerItem}
                  label="Select Gender"
                  value=""
                />
                <Picker.Item
                  style={styles.pickerItem}
                  label="Male"
                  value="male"
                />
                <Picker.Item
                  style={styles.pickerItem}
                  label="Female"
                  value="female"
                />
              </Picker>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                keyboardType="numeric"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                required
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={town}
                onChangeText={setTown}
                placeholder="Town"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={province}
                onChangeText={setProvince}
                placeholder="Province"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={country}
                onChangeText={setCountry}
                placeholder="Country"
                required
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.requiredLabel}>*</Text>
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-3 mx-auto"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Telephone Number"
                keyboardType="numeric"
                required
              />
            </View>
            <View style={styles.pickImageContainer}>
              <TouchableOpacity
                onPress={selectImage}
                style={styles.pickImageButton}
              >
                <Text style={styles.pickImageText}>Pick Profile Image</Text>
              </TouchableOpacity>
            </View>
            {image && (
              <Image
                className="mt-[3vh] mx-auto rounded-[15px]"
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View className="mt-[15vh] mb-[3vh]">
            <TouchableOpacity
              className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
              onPress={handleRegistration}
            >
              <Text className="text-[#fff] text-[18px] font-bold text-center">
                Register
              </Text>
            </TouchableOpacity>
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
  pickImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  pickImageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pickImageText: {
    color: "white",
    fontWeight: "bold",
  },

  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  requiredLabel: {
    color: "red",
    marginBottom: 15,
  },
  textField: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#00000040",
    color: "gray",
    width: 200,
    paddingBottom: 3,
  },

  picker: {
    width: 200,
    color: "gray",
  },

  pickerItem: {
    fontSize: 15,
  },
});
