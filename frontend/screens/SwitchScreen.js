import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const listTab = [
    {
        status: 'Add'
    },
    {
        status: 'Sell'
    }
]

const data = [
    {
        name: 'Aqua Farm Name',
        subName: 'First Fish Fairming',
        status: "Add"
    },
    {
        name: 'Address',
        subName: 'Madiha, Matara',
        status: "Add"
    },
    {
        name: 'Owner Name',
        subName: 'Lahiru Madushanka',
        status: "Add"
    },
    {
        name: 'Contact Number',
        subName: '+94765259905',
        status: "Add"
    },
    {
        name: 'Stoke',
        subName: '145.25 KG',
        status: "Sell"
    },
    {
        name: 'Stoking Date',
        subName: '25th June,2023',
        status: "Sell"
    },
    {
        name: 'Hatchery',
        subName: 'The first hatchery Sri Lanka',
        status: "Sell"
    },
    {
        name: 'Hatchery Batch',
        subName: '75th',
        status: "Sell"
    },
]

export default function AquacultureScreen() {
    const navigation = useNavigation();
    const [status, setStatus] = useState('Add')
    const [datalist, setDatalist] = useState(data.filter(e => e.status === 'Detail'))
    const [formData, setFormData] = useState({
      farmName: '',
      address: '',
      ownerName: '',
      contactNumber: '',
      // add more fields as needed
    });

    const setStatusFilter = status => {
        if (status === 'Add') {
            setDatalist([...data.filter(e => e.status === status)])
        } else if (status === 'Sell') {
            setDatalist([...data.filter(e => e.status === status)])
        } else {
            setDatalist(data)
        }

        setStatus(status)
    }

  const handleFormChange = (name, value) => {
      setFormData(prevState => ({
          ...prevState,
          [name]: value,
      }));
  }

  const handleFormSubmit = () => {
      // handle form submission here
      console.log(formData);
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
                      <Text className="text-center text-[#fff] font-bold text-[16px] mt-[10vw]">Update Data</Text>
                      <Text className="text-center text-[#fff] font-bold text-[26px] mt-[vw]">Fisheries</Text>
                  </View>
              </View>

              <View className="mt-[36vh]">
                  <Text className="text-center text-[22px] font-bold text-[#000000A6]">Fisheries Name</Text>

                  <View style={styles.listTab}>
                      {listTab.map(e => (
                          <TouchableOpacity
                              style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                              onPress={() => setStatusFilter(e.status)}
                          >
                              <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>
                                  {e.status}
                              </Text>
                          </TouchableOpacity>
                      ))}
                  </View>

                  {status === 'Add' && (
                      <View>
                          <Text>Aqua Farm Name:</Text>
                          <TextInput
                              value={formData.farmName}
                              onChangeText={text => handleFormChange('farmName', text)}
                          />
                          <Text>Address:</Text>
                          <TextInput
                              value={formData.address}
                              onChangeText={text => handleFormChange('address', text)}
                          />
                          <Text>Owner Name:</Text>
                          <TextInput
                              value={formData.ownerName}
                              onChangeText={text => handleFormChange('ownerName', text)}
                          />
                          <Text>Contact Number:</Text>
                          <TextInput
                              value={formData.contactNumber}
                              onChangeText={text => handleFormChange('contactNumber', text)}
                          />
                          {/* add more fields as needed */}
                          <Button title="Submit" onPress={handleFormSubmit} />
                      </View>
                  )}

                  {status === 'Sell' && (
                      // add content for the 'Sell' tab here
                      <Text>Sell tab content</Text>
                  )}
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
