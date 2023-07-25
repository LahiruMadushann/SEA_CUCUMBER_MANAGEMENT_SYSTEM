import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CheckBox from "expo-checkbox";
import FooterBar from '../components/FooterBar';
export default function UserProfileScreen() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [town, setTown] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  return (
    <ScrollView className="flex-grow bg-white ">

      <View className="absolute w-[218vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">

        <View className="flex-row ml-[70vw]">

          <View className="mt-[101vw] ">
            <TouchableOpacity
              onPress={() => navigation.navigate('MainBoard')}
            >
              <View className="flex m-[auto] ">
                <Image source={require('../assets/main_board/arrow.png')} className=" w-[10.09216px] h-[15.62988px] " />

              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-[101.5vw] ml-[76vw]">
            <TouchableOpacity
              onPress={() => navigation.navigate('AquaRegister')}
            >
              <View className="flex m-[auto] ">
                <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] " />

              </View>
            </TouchableOpacity>
          </View>


        </View>

        {/* User Profile  */}
        <View className="flex-row">

          <View className="mt-[6vw] ml-[80vw]">
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <View className="flex m-[auto] ">

                <Image source={require('../assets/user/user.png')} className=" w-[61px] h-[61px] " />

              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-[4vw] ml-[5vw]">

            <View className="flex m-[auto] ">
              <Text className="text-[3.5vw] text-[#FFFFFF] ">User Profile</Text>
              <Text className="text-[5vw] text-[#FFFFFF] font-bold">Lahiru Madushanka</Text>

            </View>

          </View>


        </View>
        {/* ----------------------------------------- */}
      </View>


      {/* Details Section */}


      <View className="flex-row mt-[66vw] ml-[18vw]">

        <View className=" ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/email.png')} className=" w-[17px] h-[15px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Email</Text>
          <Text className="text-[3.5vw] font-light">lahirumadushandl@gmail.com</Text>
        </View>

      </View>

      <View className="flex-row mt-[10vw] ml-[18vw]">

        <View className=" ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/address.png')} className=" w-[16px] h-[18px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Address</Text>
          <Text className="text-[3.5vw] font-light">Madiha , Matara, Sri Lanka</Text>
        </View>

      </View>

      <View className="flex-row mt-[10vw] ml-[18vw]">

        <View className=" ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/phone.png')} className=" w-[12px] h-[18px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Telephone No</Text>
          <Text className="text-[3.5vw] font-light">+94765259905</Text>
        </View>

      </View>

      <View className="flex-row mt-[10vw] ml-[18vw]">

        <View className=" ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/gender.png')} className=" w-[16px] h-[19px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Gender</Text>
          <Text className="text-[3.5vw] font-light">Male</Text>
        </View>

      </View>

      <View className="flex-row mt-[10vw] ml-[18vw]">

        <View className=" ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/birthday.png')} className=" w-[16px] h-[18px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Age</Text>
          <Text className="text-[3.5vw] font-light">25 years old</Text>
        </View>

      </View>

      <View className="flex-row mt-[10vw] ml-[18vw]">

        <View className="mb-[12vw] ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex m-[auto] ">

              <Image source={require('../assets/user/job.png')} className=" w-[16px] h-[18px] " />

            </View>
          </TouchableOpacity>
        </View>

        <View className="flex ml-[6vw] mt-[-1vw] ">
          <Text className="text-[4vw] font-bold  ">Job</Text>
          <Text className="text-[3.5vw] font-light">Student</Text>
        </View>

      </View>
      <View className="mt-[4vh]">
        <FooterBar />
      </View>
    </ScrollView>
  );
}
