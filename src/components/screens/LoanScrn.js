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
  TouchableWithoutFeedback,
  Alert,
  Flatlist,
  LogBox,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import HeadLeftNotification from '../../assets/svg/HeadLeftNotification.svg';
import Globles, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';
import Loan from '../../assets/images/Loan.png';

import DropDown from '../../assets/svg/DropDown.svg';
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

const LoanScrn = ({navigation, route}) => {
  const {image, loanId, titlename} = route?.params;
  console.log('banner:', titlename);

  const [cityData, setCityData] = useState([]);
  const [Phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [cityName, setCityName] = useState('Select City');

  const getdata = async () => {
    try {
      const UserId = await AsyncStorage.getItem('UserId');
      console.log('UserId  -------:', UserId);

      const Citydetail = '';
      const result = await AsyncStorage.getItem(Citydetail);
      console.log('id ------->', UserId);
      const parsedData = JSON.parse(result);
      console.log('Retrieved city: ', parsedData);
      setCityData(parsedData);
      return UserId; // Return UserId from the function
    } catch (error) {
      console.log('Error retrieving data:', error);
      return null; // Return null if an error occurs
    }
  };

  console.log('City data: ', cityData);
  console.log('cityNames====', cityName);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getdata(); // Assign the value of UserId to a variable
      // Update other state variables or perform other logic here
    };
    fetchData();
  }, []);

  // ------------------ Submit data --------
  const SubmitBtn = async () => {
    try {
      const UserId = await AsyncStorage.getItem('UserId'); // Retrieve UserId again within SubmitBtn
      const loanData = new FormData();
      loanData.append('user_id', UserId);
      loanData.append('loan_id', loanId);
      loanData.append('phone', Phone);
      loanData.append('city', cityName.toString());
      loanData.append('description', description);

      const response = await fetch(
        'https://inhouse.hirectjob.in/api/loan_enquery',
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
            <Text style={styles.headerTextDetail}>Loan</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
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

              <View style={styles.containerText}>
                <Text style={styles.AdHead}>{titlename}</Text>
              </View>

              {/* ------------ TEXTINPUT ------- */}

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
                  <Picker.Item label="Select City" value="Select City" />
                  {Array.isArray(cityData) && cityData.length > 0 ? (
                    cityData.map(city => (
                      <Picker.Item
                        key={city.id}
                        label={city.name}
                        value={city.name}
                      />
                    ))
                  ) : (
                    <Picker.Item label="No cities available" value="" />
                  )}
                </Picker>
              </View>

              {/* ---------------- Contact no. --------- */}
              <Text
                style={[styles.titleTextInputFields, {marginTop: hp('3%')}]}>
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
                  placeholder="Enter the number"
                  placeholderTextColor={COLOR.BLACK}
                  maxLength={10}
                  keyboardType="number-pad"
                  style={styles.InputText}
                />
              </View>

              <Text
                style={[styles.titleTextInputFields, {marginTop: hp('3%')}]}>
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
                  onPress={() => {
                    SubmitBtn();
                  }}>
                  <Text style={styles.bottomButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>

              {/* ---------- Unlock text-------- */}
              <View style={[styles.containerText, {marginTop: hp('3%')}]}>
                <Text style={styles.AdHead}>
                  Fast and very easy application process here
                </Text>
              </View>

              {/* Specialities Offer Cards */}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flex: 1, flexDirection: 'row'}}
                horizontal={true} // Added horizontal prop
              >
                {/* 1 */}
                <TouchableOpacity style={styles.homeServicesOfferContainer}>
                  <View
                    style={[
                      styles.BankTouchOpacity,
                      {backgroundColor: COLOR.DARK_BLUE},
                    ]}>
                    {/* ----- 01-------- */}
                    <View style={styles.LittleBankTouchOpacity}>
                      <Text style={styles.LitleText}>01</Text>
                    </View>
                    <Text style={[styles.BANKText, {color: 'white'}]}>
                      Apply Bank Loan
                    </Text>
                    <Text style={[styles.BANKinnText, {color: 'white'}]}>
                      We are provide best services {'\n'} and finaancial
                      solution for you
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 2 */}
                <TouchableOpacity style={styles.homeServicesOfferContainer}>
                  <View
                    style={[
                      styles.BankTouchOpacity,
                      {
                        backgroundColor: 'white',
                        borderColor: COLOR.ExtLIGHT_GRAY,
                        borderWidth: wp('0.3%'),
                      },
                    ]}>
                    {/* ----- 02-------- */}
                    <View style={styles.LittleBankTouchOpacity}>
                      <Text style={styles.LitleText}>02</Text>
                    </View>
                    <Text style={[styles.BANKText, {color: 'black'}]}>
                      Apply Bank Loan
                    </Text>
                    <Text style={[styles.BANKinnText, {color: 'black'}]}>
                      We are provide best services {'\n'} and finaancial
                      solution for you
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoanScrn;

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
    width: wp('94%'),
    height: hp('30%'),
    resizeMode: 'contain',
  },
  containerImageCard: {
    // height: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  containerText: {
    width: wp('85%'),
    alignSelf: 'center',
    margin: wp('2.6%'),
    marginLeft: wp('4%'),
    justifyContent: 'center',
    //  backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  AdHead: {
    color: 'black',
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
    marginVertical: hp('1.5%'),
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

  // ---------- cardBank  --------
  BankTouchOpacity: {
    // backgroundColor:COLOR.DARK_BLUE,
    width: wp('67%'),
    // height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('3%'),
    marginTop: hp('3.5%'),
  },
  LittleBankTouchOpacity: {
    backgroundColor: 'white',
    width: wp('15%'),
    height: hp('7%'),
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 6,
  },
  LitleText: {
    fontFamily: FONT.SEMI_BOLD,
    color: '#000',
    fontSize: FONT_SIZE.F_15,
  },
  BANKText: {
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_15,
  },
  BANKinnText: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.F_11,
    marginVertical: hp('1%'),
    marginBottom: hp('3%'),
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

  // --------- footer -------
  homeIconPositionContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'grey',
    height: hp('10%'),
    bottom: hp('5%'),
    zIndex: 10,
    // right:hp('24%')
  },
  homeBackGroundMain: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: wp('17.9%'),
    height: hp('9.5%'),
    borderRadius: hp('10%'),
    alignSelf: 'center',
  },
  homeSVGBackGroundBNB: {
    width: wp('15%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowRadius: hp('20%'),
    borderRadius: hp('15%'),
    position: 'absolute',
    bottom: hp('85%'),
    top: hp('0.5%'),
    left: hp('0.7%'),
  },
  homeIconBtnBNB: {
    backgroundColor: '#E98100',
    textShadowOffset: {width: wp('0.5%'), height: hp('0.5%')},
    textShadowRadius: hp('0.5%'),
  },
  bottomNavIconAndTextMainContainer: {
    position: 'absolute',
    backgroundColor: '#001D4C',
    bottom: 0,
    width: '100%',
    height: hp('9%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('-2%'),
    paddingHorizontal: hp('2%'),
  },
  bottomNavIconAndTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    height: hp('7%'),
    alignSelf: 'center',
    width: wp('18%'),
  },

  textOfBottomNavBNB: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    fontFamily: FONT.MEDIUM,
    fontSize: FONT_SIZE.F_13,
    marginTop: hp('1%'),
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

  //  ------------ picker ------
  pickerContainerForm: {
    borderWidth: hp('0.1%'),
    borderRadius: hp('2%'),
    width: wp('85%'),
    justifyContent: 'center',
    height: hp('6.5%'),
    alignSelf: 'center',
    borderColor: 'gray',
  },
  titleTextInputFields: {
    fontSize: FONT_SIZE.F_14,
    fontFamily: FONT.SEMI_BOLD,
    color: '#001D4C',
    marginBottom: hp('0.6%'),
  },

  pickerForm: {
    height: hp('5%'),
    color: 'black',
  },
});
