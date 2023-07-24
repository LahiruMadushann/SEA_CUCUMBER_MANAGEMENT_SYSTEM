import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import FooterBar from '../components/FooterBar';
import { useNavigation } from '@react-navigation/native';


export default function ForgotPasswordScreen({phoneNumber}) {

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    // Verify OTP
  };


  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState();
  const navigation = useNavigation();


  return (
    <ScrollView className="bg-[#fff]">
      <SafeAreaView>

        <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
          <View className="mt-[58vh] ">
            <View className="flex-row ">
              <View className=" ml-[72vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate('GetANumber')}
                >
                  <View className="flex m-[auto] ">
                    <Image source={require('../assets/main_board/arrow.png')} className=" w-[10.09216px] h-[15.62988px] " />
                  </View>
                </TouchableOpacity>
              </View>

              <View className=" ml-[72vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Switch')}
                >
                  <View className="flex m-[auto] ">
                    <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] " />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw]">Forgot Password</Text>
          </View>
        </View>

        <View className="mt-[40vh]" >
          <View className="mx-[12vw]">
            <Text className="text-[14px] text-[#000000A6]">Phone Verification {phoneNumber}</Text>
            <Text className="text-[24px] font-bold text-[#000000A6]">Enter OTP Code</Text>
            <Text className="text-[14px]">Enter your 4 digit code sent to you at +94 76 525 9905</Text>
            <Text className="text-[14px] text-[#0013C0]">Did you enter the correct Number?</Text>


            <View className="my-[12vh]" style={styles.otpContainer}>
              <View className="border-gray-400 border-b-gray-400 border-[0.5px] border-b-2 w-[38px] h-[57px]" >
                <TextInput
                  className="text-center text-[26px] px-2 py-2"
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={firstInput}
                  onChangeText={text => {
                    setOtp({ ...otp, 1: text });
                    text && secondInput.current.focus();
                  }}
                />
              </View>
              <View className="border-gray-400 border-b-gray-400 border-[0.5px] border-b-2 w-[38px] h-[57px] ml-[4vw]">
                <TextInput
                  className="text-center text-[26px] px-2 py-2"
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={text => {
                    setOtp({ ...otp, 2: text });
                    text ? thirdInput.current.focus() : firstInput.current.focus();
                  }}
                />
              </View>
              <View className="border-gray-400 border-b-gray-400 border-[0.5px] border-b-2 w-[38px] h-[57px] ml-[4vw]">
                <TextInput
                  className="text-center text-[26px] px-2 py-2"
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={text => {
                    setOtp({ ...otp, 3: text });
                    text ? fourthInput.current.focus() : secondInput.current.focus();
                  }}
                />
              </View>
              <View className="border-gray-400 border-b-gray-400 border-[0.5px] border-b-2 w-[38px] h-[57px] ml-[4vw]">
                <TextInput
                  className="text-center text-[26px] px-2 py-2"
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourthInput}
                  onChangeText={text => {
                    setOtp({ ...otp, 4: text });
                    !text && thirdInput.current.focus();
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              className="bg-[#0013C0] rounded-[15px] mx-[20px] justify-center py-[10px] items-center mt-[20px]"
              onPress={
                () => navigation.navigate('UpdatePassword')
                // () => console.log(otp)
              }>
              <Text className="text-[#fff] text-[18px] font-bold text-center" >Continue</Text>
            </TouchableOpacity>

            <View className="mt-[25px] mx-auto">
              {countdown > 0 ? (
                <Text className="text-[16px] text-gray-700">Resend code in <Text className="text-[#0013C0] font-medium">{countdown} Seconds</Text></Text>
              ) : (
                <TouchableOpacity
                  className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                  onPress={() => { setCountdown(30) }}>
                  <Text className="text-[#fff] text-[18px] font-bold text-center">Resend OTP</Text>
                </TouchableOpacity>

              )}
            </View>

          </View>

        </View>


        <View>

        </View>

        <View className="mt-[4vh]">
          <FooterBar />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    // fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    // width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    // fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    // fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    // fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 18 * 1.4,
    // color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 0,
    // borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    // color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    // backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    // height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    // color: Colors.DEFAULT_WHITE,
    // fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

