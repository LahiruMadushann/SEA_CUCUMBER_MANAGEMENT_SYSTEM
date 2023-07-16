import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal,SafeAreaView, ScrollView,StyleSheet, Image } from 'react-native'


export default function PopupScreen() {
    const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" ">
      <TouchableOpacity onPress={toggleMenu}>
      <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] ml-[70vw]" />

      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu} className="ml-[40vw] w-[36vw]" >
          <TouchableOpacity onPress={() => alert('Option 1 selected')}>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Option 2 selected')}>
            <Text>Option 2</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
   
  )
}

const styles = StyleSheet.create({
    menu: {
      backgroundColor: '#fff',
      padding: 10,
      
      zIndex:10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
  });
