import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';
import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';

import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import ACrepair from '../assets/images/ACrepair.png';
import DropDown from '../assets/svg/DropDown.svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Picker} from '@react-native-picker/picker';
import DetailsServicesOfferOne from '../assets/svg/DetailsServicesOfferOne.svg';
import DetailsServicesOfferTwo from '../assets/svg/DetailsServicesOfferTwo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR, FONT, FONT_SIZE } from '../config/Globles';


const Citydetail = '';

const Acrepair = ({navigation, route}) => {
  const {banner, ServiceId, titlename, image} = route?.params;
  console.log('banner:', ServiceId);

  const [cityData, setCityData] = useState([]);
  const [Phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  // const [propertyTypeId, setPropertyTypeId] = useState('');
  const [cityName, setCityName] = useState('');

  const getdata = async () => {
    const UserId = await AsyncStorage.getItem('UserId');
    console.log('UserId  -------:', UserId);

    const result = await AsyncStorage.getItem(Citydetail);
    const parsedData = JSON.parse(result);
    console.log('Retrieved city: ', parsedData);
    setCityData(parsedData);
  };
  console.log('City data: ', cityData);

  useEffect(() => {
    getdata();
  }, []);

  // ------------------ Submit data --------
  const SubmitBtn = async () => {
    try {
      const UserId = await AsyncStorage.getItem('UserId'); // Retrieve UserId again within SubmitBtn
      const loanData = new FormData();
      loanData.append('user_id', UserId);
      loanData.append('service_id', ServiceId);
      loanData.append('phone', Phone);
      loanData.append('city', cityName.toString());
      loanData.append('description', description);

      const response = await fetch(
        'https://inhouse.hirectjob.in/api/service_enquery',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data', // Update the Content-Type header
          },
          body: loanData,
        },
      );

      const data = await response.json();
      console.log('Property Images and Videos Response:', data);
      Alert.alert('Successful');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.containerDetail}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageSplashDetail}>
        <View style={styles.headerContainerDetail}>
          <View style={styles.headerContentDetail}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('');
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainerDetail}>
            <Text style={styles.headerTextDetail}>AC Repair</Text>
          </View>
          <TouchableOpacity>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerDetail}>
          <ScrollView
            style={styles.innerContainerDetail}
            showsVerticalScrollIndicator={false}>
            <View style={styles.textContainerDetail}>
              {/* ------------ Ac Image----------- */}
              <View style={styles.containerImageCard}>
                <Image
                  source={{uri: 'https://inhouse.hirectjob.in/' + image}}
                  style={styles.imageImageCard}
                />
              </View>
              <View style={[styles.containerImageCard, {marginTop: hp('2%')}]}>
                <Text style={styles.AdHead}>
                  {/* Best AC Repair Best prices Find your best AC Repair */}
                  {titlename}
                </Text>
              </View>
              {/* Shyam----------------------------------- */}

              <Text
                style={[styles.titleTextInputFields, {marginTop: hp('3%')}]}>
                Select City
              </Text>

              <View style={[styles.pickerContainerForm]}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={cityName}
                  onValueChange={itemValue => setCityName(itemValue)}>
                  {Array.isArray(cityData) && cityData.length > 0 ? (
                    cityData.map(city => (
                      <Picker.Item
                        key={city.id}
                        label={city.name}
                        value={city.name}
                      />
                    ))
                  ) : (
                    <Picker.Item
                      label="No cities available"
                      value="No cities available"
                    />
                  )}
                </Picker>
              </View>

              <Text
                style={[styles.titleTextInputFields, {marginTop: hp('2%')}]}>
                Mobile No.
              </Text>
              <View style={[styles.InputView]}>
                <Text style={[styles.TextStle, {marginRight: wp('2%')}]}>
                  +91
                </Text>
                <TextInput
                  value={Phone}
                  onChangeText={text => {
                    setPhone(text);
                  }}
                  placeholder="Enter Mobile no."
                  placeholderTextColor={COLOR.BLACK}
                  maxLength={10}
                  keyboardType="number-pad"
                  style={styles.InputText}
                />
              </View>

              <Text
                style={[styles.titleTextInputFields, {marginTop: hp('2%')}]}>
                Description
              </Text>
              <View style={[styles.descriptionView]}>
                <TextInput
                  style={{
                    color: 'black',
                    // backgroundColor: 'pink',
                    // marginTop: hp('0%'),
                  }}
                  placeholder="Message ..."
                  placeholderTextColor={'gray'}
                  keyboardType="default"
                  multiline={true}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              {/* Bottom Navigation Button */}
              <View style={styles.bottomNavButtonContainer}>
                <TouchableOpacity
                  style={styles.bottomButtonTouchOpacity}
                  onPress={() => SubmitBtn()}>
                  <Text style={styles.bottomButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
              {/* ---------- Unlock text-------- */}
              <View
                style={[
                  styles.containerImageCard,
                  {marginTop: hp('3%'), marginBottom: hp('1.5%')},
                ]}>
                <Text style={styles.AdHead}>
                  Unlock exclusive brand offers only with IN House Property
                </Text>
              </View>
              {/* Specialities Offer Cards */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flex: 1, flexDirection: 'row'}}
                horizontal={true} // Added horizontal prop
              >
                <View style={styles.homeServicesOfferContainer}>
                  <Image
                    source={{uri: 'https://inhouse.hirectjob.in/' + banner}}
                    style={{
                      height: hp('17.5%'),
                      width: wp('64%'),
                      borderRadius: wp('3%'),
                    }}
                  />
                </View>

                {/* 2 */}
                {/* <View style={styles.homeServicesOfferContainer}>
                  <DetailsServicesOfferTwo
                    height={hp('17.5%')}
                    width={wp('64%')}
                  />
                </View> */}
              </ScrollView>
              {/* ---------------------------------- */}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Acrepair;

const styles = StyleSheet.create({
  containerDetail: {
    flex: 1,
  },
  backgroundImageSplashDetail: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
  },
  headerContentDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainerDetail: {
    marginLeft: hp('2%'),
  },
  headerTextDetail: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },

  contentContainerDetail: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerDetail: {
    margin: hp('3%'),
    flex: 1,
    // backgroundColor:'red'
  },
  textContainerDetail: {
    flex: 1,
  },
  imageImageCard: {
    width: wp('85%'),
    height: hp('30%'),
    resizeMode: 'contain',
  },
  containerImageCard: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  AdHead: {
    color: COLOR.Back,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_16,
  },
  // ------- TextInput -------
  InputView: {
    flexDirection: 'row',
    width: wp('86%'),
    borderRadius: hp('2%'),
    borderColor: COLOR.ExtLIGHT_GRAY,
    borderWidth: wp('0.3%'),
    paddingVertical: wp('1%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // marginVertical: hp('1.5%'),
  },
  InputText: {
    fontSize: FONT_SIZE.F_13,
    fontFamily: FONT.MEDIUM,
    color: COLOR.BLACK,
    width: wp('70%'),
    // marginHorizontal:hp('2%'),
    borderRadius: hp('2%'),
    // backgroundColor:'violet'
  },
  TextStle: {
    fontSize: FONT_SIZE.F_13,
    fontFamily: FONT.SEMI_BOLD,
    color: COLOR.BLACK,
    textAlign: 'center',
  },
  imageDrop: {
    width: wp('6%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  //--------------------------button nav bottom
  bottomNavButtonContainer: {
    // position: 'absolute',
    // bottom: hp('4%'),
    // flex: 0,
    alignSelf: 'center',
    width: wp('86%'),
    alignItems: 'center',
  },
  bottomButtonTouchOpacity: {
    backgroundColor: '#F49825',
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
  },
  bottomButtonText: {
    fontFamily: FONT.SEMI_BOLD,
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_17,
  },

  //Specialitys List
  specialitiesContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  homeServicesOfferContainer: {
    marginBottom: hp('2%'),
    marginRight: hp('2%'),
  },

  strikeThroughPrice: {
    overflow: 'hidden',
    textDecorationLine: 'line-through',
    fontSize: FONT_SIZE.F_12,
    alignSelf: 'center',
    marginLeft: hp('0.5%'),
    marginTop: hp('0.5%'),
  },
  discountedPrice: {
    overflow: 'hidden',
    textOverflow: 'clip',
    color: '#F49825',
    fontFamily: FONT.SEMI_BOLD,
    marginLeft: hp('1.5%'),
  },

  // -------- Picker --------
  titleTextInputFields: {
    fontSize: FONT_SIZE.F_14,
    fontFamily: FONT.SEMI_BOLD,
    color: '#001D4C',
    marginBottom: hp('0.6%'),
  },
  // pickerContainerForm: {
  //   borderWidth: hp('0.1%'),
  //   backgroundColor: 'pink',
  //   borderRadius: hp('1%'),
  //   // marginBottom: hp('2%'),
  //   // justifyContent: 'center',
  //   height: hp('5%'),
  //   marginBottom: hp('2.5%'),
  //   borderColor: 'gray',
  // },
  pickerForm: {
    height: hp('5%'),
    color: 'black',
  },
  pickerContainerForm: {
    borderWidth: hp('0.1%'),
    borderRadius: hp('2%'),
    width: wp('85%'),
    justifyContent: 'center',
    height: hp('6.5%'),
    alignSelf: 'center',
    borderColor: 'gray',
  },
  descriptionView: {
    width: wp('85%'),
    alignSelf: 'center',
    marginBottom: hp('2.5%'),
    borderRadius: hp('1.5%'),
    paddingHorizontal: wp('1%'),
    height: hp('14%'),
    borderWidth: hp('0.1'),
    borderColor: 'gray',
  },
  titleTextInputFields: {
    fontSize: FONT_SIZE.F_14,
    fontFamily: FONT.SEMI_BOLD,
    color: '#001D4C',
    marginBottom: hp('0.6%'),
  },
});
