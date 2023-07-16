import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const listTab = [
    {
        status: 'Detail'
    },
    {
        status: 'Stock'
    }
]

const data = [
    {
        name: 'Aqua Farm Name',
        subName: 'First Fish Fairming',
        status: "Detail"
    },
    {
        name: 'Address',
        subName: 'Madiha, Matara',
        status: "Detail"
    },
    {
        name: 'Owner Name',
        subName: 'Lahiru Madushanka',
        status: "Detail"
    },
    {
        name: 'Contact Number',
        subName: '+94765259905',
        status: "Detail"
    },
    {
        name: 'Stoke',
        subName: '145.25 KG',
        status: "Stock"
    },
    {
        name: 'Stoking Date',
        subName: '25th June,2023',
        status: "Stock"
    },
    {
        name: 'Hatchery',
        subName: 'The first hatchery Sri Lanka',
        status: "Stock"
    },
    {
        name: 'Hatchery Batch',
        subName: '75th',
        status: "Stock"
    },
]

export default function AquacultureScreen() {
    const navigation = useNavigation();
    const [status, setStatus] = useState('Detail')
    const [datalist, setDatalist] = useState(data.filter(e => e.status === 'Detail'))
    const setStatusFilter = status => {
        if (status === 'Detail') {
            setDatalist([...data.filter(e => e.status === status)])
        } else if (status === 'Stock') {
            setDatalist([...data.filter(e => e.status === status)])
        } else {
            setDatalist(data)
        }

        setStatus(status)
    }

  return (
      <SafeAreaView>
          <ScrollView>
              <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
                  <View className="mt-[58vh] ">
                      <View className="flex-row ">
                          <View className=" ml-[4vw]">
                              <TouchableOpacity
                                  onPress={() => navigation.navigate('MainBoard')}
                              >
                                  <View className="flex m-[auto] ">
                                      <Image source={require('../assets/main_board/arrow.png')} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                                  </View>
                              </TouchableOpacity>
                          </View>

                          <View className=" ml-[11vw]">
                              <TouchableOpacity
                                  onPress={() => navigation.navigate('Switch')}
                              >
                                  <View className="flex m-[auto] ">
                                      <Image source={require('../assets/fisheries/dotIcon.png')} className=" w-[24.21875px] h-[7.03125px] ml-[280px]" />
                                  </View>
                              </TouchableOpacity>
                          </View>
                      </View>

                      <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw]">Aquaculture</Text>
                  </View>
              </View>

              <View className="mt-[36vh]">
                  <Text className="text-center text-[22px] font-bold text-[#000000A6]">First Fish Farming</Text>

                  <View className="mx-[10vw]  ">
                      <Image source={require('../assets/aquaculture/fish.png')} className=" w-[328px] h-[176px]  mt-[21px]" />
                  </View>

                  <View className="mt-[-32vh]" style={styles.listTab}>
                      {listTab.map(e => (
                          <TouchableOpacity
                              style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                              className="mx-[2vw] w-[164px] h-[30px] mt-[36vh]"
                              onPress={() => setStatusFilter(e.status)}
                          >
                              <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>
                                  {e.status}
                              </Text>
                          </TouchableOpacity>
                      ))}
                  </View>

                  {datalist.map((item, index) => (
                      <View key={index} className="flex-row py-[2.5vw]" >
                        

                          <View className="ml-[16vw] mt-[-1.8vh]">
                              <Text className="text-[13px] font-bold text-[#000000A6]" >{item.name}</Text>
                              <Text className="text-[13px] text-[#000000A6]">{item.subName}</Text>
                          </View>
                      </View>
                  ))}
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        justifyContent: 'center'
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20
    },
    btnTab: {

        flexDirection: 'row',

        justifyContent: 'center',

        fontWeight: 'bold',
        color: '#3644C5',
        textAlign: 'center',
        fontSize: 14,
        paddingLeft: 31,
        paddingRight: 31,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 8,
        borderBottomRightRadius: 0


    },
    textTab: {
        fontSize: 16
    },
    btnTabActive: {
        backgroundColor: '#3644C5'
    },
    textTabActive: {
        color: '#fff'
    },
    itemContainer: {
        
    },
    itemLogo: {
        padding: 10
    },
    itemImage: {
        width: 50,
        height: 50
    },
    itemBody: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemStatus: {
        backgroundColor: 'green',
        paddingHorizontal: 6,
        justifyContent: 'center',
        right: 12
    }
})
