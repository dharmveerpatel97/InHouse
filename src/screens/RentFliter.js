import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Globles, {COLOR, FONT, FONT_SIZE} from '../config/Globles';

import {SliderPicker} from 'react-native-slider-picker';

const RentFliter = ({navigation}) => {
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  // ---------- sider -------
  const [value, setValue] = useState(1);
  const isMidRangeSelected = value == 0;
  const isRangeSelected = value <= 1;
  // -------- sliderend -----
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const handleValueChange = itemValue => {
    setSelectedLanguage(itemValue);
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.headView}>
          <Text
            style={{
              fontSize: FONT_SIZE.F_20,
              color: 'black',
              fontFamily: FONT.SEMI_BOLD,
            }}>
            Filter
          </Text>
        </View>

        <ScrollView styles={{flexGrow: 1, marginBottom: wp('3%')}}>
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: 5,
              width: wp('27%'),
              marginLeft: '4%',
              marginVertical: hp('1.5%'),
            }}>
            <Text style={styles.TopicHead}>Categories</Text>
          </View>

          <View style={styles.listTab}>
            <TouchableOpacity
              style={[
                styles.tabView,
                {backgroundColor: status === false ? '#F8F8F8' : 'orange'},
              ]}
              onPress={() => navigation.navigate('BuyFliter')}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_13,
                  color: status === false ? 'black' : 'white',
                  fontFamily: FONT.MEDIUM,
                }}>
                Buy
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.tabView,
                {backgroundColor: status === false ? 'orange' : 'white'},
              ]}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_13,
                  color: status1 === false ? 'white' : 'black',
                  fontFamily: FONT.MEDIUM,
                }}>
                Rent
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.tabView,
                {backgroundColor: status === false ? '#F8F8F8' : 'orange'},
              ]}
              onPress={() => navigation.navigate('PGFilter')}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_13,
                  color: status === false ? 'black' : 'white',
                  fontFamily: FONT.MEDIUM,
                }}>
                PG
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.tabView,
                {backgroundColor: status === false ? '#F8F8F8' : 'orange'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_13,
                  color: status === false ? 'black' : 'white',
                  fontFamily: FONT.MEDIUM,
                }}>
                Commercial
              </Text>
            </View>

            <View
              style={[
                styles.tabView,
                {backgroundColor: status === false ? '#F8F8F8' : 'orange'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_13,
                  color: status === false ? 'black' : 'white',
                  fontFamily: FONT.MEDIUM,
                }}>
                Project
              </Text>
            </View>
          </View>

          {/* ------------ Locality ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Locality/Project/Landmark</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '4%',
              backgroundColor: '#F8F8F8',
              borderRadius: wp('2%'),
              padding: wp('1%'),
            }}>
            <View
              style={[
                styles.tabView,
                {
                  backgroundColor: '#93bfbf',
                  borderWidth: 0.5,
                  borderColor: 'grey',
                  marginLeft: wp('3%'),
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_12,
                  color: 'black',
                  fontFamily: FONT.MEDIUM,
                }}>
                New Delhi X
              </Text>
            </View>

            <View style={[styles.tabView, {marginLeft: wp('5.6%')}]}>
              <Text
                style={{
                  fontSize: FONT_SIZE.F_12,
                  color: 'black',
                  fontFamily: FONT.MEDIUM,
                }}>
                Add more...
              </Text>
            </View>
          </View>

          {/* ------------ Property ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Property Type</Text>
          </View>

          <View style={styles.listTab}>
            <View
              style={[
                styles.tabIMGView,
                {borderColor: status === false ? 'gray' : 'orange'},
              ]}
              onPress={() => setStatus(!status)}>
              <Image
                source={require('../assets/images/office.png')}
                style={styles.images}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'black' : 'white',
                  fontFamily: '500',
                }}>
                Flat
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === false ? 'orange' : 'white'},
              ]}
              onPress={() => setStatus(!status)}>
              <Image
                source={require('../assets/images/house.png')}
                style={[styles.images, {tintColor: 'black'}]}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                House/Villa
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === false ? 'white' : 'orange'},
              ]}
              onPress={() => setStatus(!status)}>
              <Image
                source={require('../assets/images/plot.png')}
                style={styles.images}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'black' : 'white',
                  fontFamily: '500',
                }}>
                Plot
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === false ? 'white' : 'orange'},
              ]}
              onPress={() => setStatus(!status)}>
              <Image
                source={require('../assets/images/building.png')}
                style={styles.images}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'black' : 'white',
                  fontFamily: '500',
                }}>
                Office
              </Text>
            </View>
          </View>

          {/* ------------ Price ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Price</Text>
          </View>
          <View style={[styles.tabIMGView, {backgroundColor: 'white'}]}>
            <SliderPicker
              minValue={0}
              maxValue={2}
              defaultValue={value}
              callback={position => {
                setValue(position);
              }}
              labelFontColor={'#6c7682'}
              labelFontWeight={'600'}
              showFill={true}
              fillColor={isMidRangeSelected ? 'green' : 'orange'}
              buttonBackgroundColor={'#fff'}
              buttonDimensionsPercentage={6}
              heightPercentage={1.5}
              widthPercentage={85}
              style={styles.sliderPicker}
            />

            <View style={styles.labelView}>
              <Text style={styles.labelText}>Rp 0</Text>
              <Text
                style={[
                  styles.labelText,
                  isMidRangeSelected && styles.selectedLabelText,
                  {marginLeft: hp('7%')},
                ]}>
                Rp 4.000.000
              </Text>
              <Text
                style={[
                  styles.labelText,
                  isRangeSelected && styles.selectedLabelText,
                ]}>
                Rp 8.000.000
              </Text>
            </View>
          </View>

          {/* ------------ Rate ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Rating</Text>
          </View>
          <View style={styles.listTab}>
            <View
              style={[
                styles.RatingtabView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                1
              </Text>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.RatingtabView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                2
              </Text>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.RatingtabView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                3
              </Text>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.RatingtabView,
                {backgroundColor: status === false ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                4
              </Text>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.RatingtabView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                5
              </Text>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.Starimages}></Image>
            </View>
          </View>

          {/* ------------ BHK ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>BHK</Text>
          </View>
          <View style={styles.listTab}>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                1 RK
              </Text>
            </View>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                1 BHK
              </Text>
            </View>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === false ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                2 BHK
              </Text>
            </View>
          </View>
          <View style={[styles.listTab, {marginTop: wp('3%')}]}>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                3 BHK
              </Text>
            </View>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                4 BHK
              </Text>
            </View>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                4+ BHK
              </Text>
            </View>
          </View>

          {/* ------------ fACILITY ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Facilities</Text>
          </View>
          <View style={styles.listTab}>
            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === false ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                AC
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Fan
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Indoor Bathroom
              </Text>
            </View>
            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                WiFi
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: wp('3%'),
              marginHorizontal: wp('4%'),
            }}>
            <View
              style={[
                styles.tabIMGView,
                {backgroundColor: status === true ? 'orange' : '#F8F8F8'},
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Parking lot
              </Text>
            </View>

            <View
              style={[
                styles.tabIMGView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  marginHorizontal: wp('4%'),
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Near Hospital
              </Text>
            </View>
          </View>

          {/* ------------ Covered AreaCovered Area ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Covered Area</Text>
          </View>

          <View style={[styles.listTab, {width: '75%'}]}>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Sqft
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Min
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Max
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>

            {/* <Picker
   ref={pickerRef}
    selectedValue={selectedLanguage}
    onValueChange={(itemValue, itemIndex) =>
      setSelectedLanguage(itemValue)
    }>
    <Picker.Item label="Java" value="java" />
    <Picker.Item label="JavaScript" value="js" />
  </Picker> */}
          </View>

          {/* ------------ Tenants ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Tenants Preferred</Text>
          </View>
          <View style={[styles.listTab, {width: '43%'}]}>
            <View
              style={{
                backgroundColor: 'orange',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              // onPress={() => setStatus(true)}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Bachelors
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              // onPress={() => setStatus(!status)}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                }}>
                Family
              </Text>
            </View>
          </View>

          {/* ------------ Available From ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Available From</Text>
          </View>
          <View style={[styles.listTab, {width: '83%'}]}>
            <View
              style={{
                // backgroundColor: status === false ? 'orange' : '#F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  // color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Immediately from
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'orange',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              // onPress={() => setStatus(true)}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Yesterday
              </Text>
            </View>

            <View
              style={{
                // backgroundColor: status === true ? 'orange' : '#F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  // color: status === true ? 'white' : 'black',
                  color: 'black',
                  fontFamily: '500',
                }}>
                Last day
              </Text>
            </View>
          </View>

          {/* ------------ Posted By ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Posted By</Text>
          </View>
          <View style={[styles.listTab, {width: '53%'}]}>
            <View
              style={{
                backgroundColor: status === false ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === false ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Agent
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                }}>
                Owner
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                }}>
                Owner
              </Text>
            </View>
          </View>

          {/* ------------ Posted Since ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Posted Since</Text>
          </View>
          <View style={[styles.listTab, {width: '80%'}]}>
            <View
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Any time
              </Text>
            </View>

            <View
              style={{
                backgroundColor: status === false ? 'orange' : '#F8F8F8',

                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: '500',
                }}>
                Within 1 month
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                }}>
                1-2 month
              </Text>
            </View>
          </View>

          {/* ------------ Furnishing ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Furnishing Status</Text>
          </View>

          <View
            style={{
              height: wp('35%'),
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Image
              style={{width: wp('100%')}}
              resizeMode="contain"
              source={require('../assets/images/Demo.png')}
            />
          </View>

          {/* ---------------- Amenitite ----------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Amenities</Text>
          </View>

          <View
            style={{
              height: wp('35%'),
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Image
              style={{width: wp('100%')}}
              resizeMode="contain"
              source={require('../assets/images/Demo.png')}
            />
          </View>

          {/* ------------ pHOTO/Video --------- */}
          <View
            style={{
              flexDirection: 'row',
              width: wp('90%'),
              justifyContent: 'space-between',
              marginHorizontal: hp('2.5%'),
              marginTop: hp('2'),
            }}>
            <View style={{width: wp('45%'), justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: hp('2.2%'),
                  color: 'black',
                  fontFamily: FONT.SEMI_BOLD,
                  marginVertical: wp('3%'),
                }}>
                Photos
              </Text>
              <Image
                style={{resizeMode: 'contain', alignItems: 'center'}}
                source={require('../assets/images/Mbprime.png')}></Image>
            </View>

            <View style={{width: wp('45%'), justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: hp('2.2%'),
                  color: 'black',
                  fontFamily: FONT.SEMI_BOLD,
                  marginVertical: wp('3%'),
                }}>
                Videos
              </Text>
              <Image
                style={{resizeMode: 'contain', alignItems: 'center'}}
                source={require('../assets/images/Mbprime.png')}></Image>
            </View>
          </View>

          {/* ---------------- Facing ----------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Facing</Text>
          </View>
          <View
            style={{
              height: wp('35%'),
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Image
              style={{width: wp('100%')}}
              resizeMode="contain"
              source={require('../assets/images/Demo.png')}
            />
          </View>

          {/* ---------------- Bathroom ----------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Bathroom</Text>
          </View>
          <View style={[styles.listTab, {width: '70%'}]}>
            <View
              style={[
                styles.RatingtabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  width: wp('10%'),
                  paddingVertical: wp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  textAlign: 'center',
                }}>
                1
              </Text>
            </View>
            <View
              style={[
                styles.RatingtabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  width: wp('10%'),
                  paddingVertical: wp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                2
              </Text>
            </View>
            <View
              style={[
                styles.RatingtabView,
                {
                  backgroundColor: status === true ? 'orange' : 'orange',
                  width: wp('10%'),
                  paddingVertical: wp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'white',
                  fontFamily: '500',
                }}>
                3
              </Text>
            </View>
            <View
              style={[
                styles.RatingtabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  width: wp('10%'),
                  paddingVertical: wp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                4
              </Text>
            </View>
            <View
              style={[
                styles.RatingtabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  width: wp('10%'),
                  paddingVertical: wp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                5
              </Text>
            </View>
          </View>

          {/* ------------ Covered Area ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Covered Area</Text>
          </View>

          <View style={[styles.listTab, {width: '53%'}]}>
            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Min
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.BuiltabView,
                {
                  backgroundColor: status === true ? 'orange' : '#F8F8F8',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => setStatus(!status)}>
              <Text
                style={{
                  fontSize: 15,
                  color: status === true ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Max
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>
          </View>

          {/* ----------- Button ---------- */}
          <View
            style={{
              backgroundColor: 'orange',
              width: wp('93%'),
              borderRadius: wp('4%'),
              padding: wp('5%'),
              marginBottom: '25%',
              marginTop: '10%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.bottomButtonText}> See 3516 Properties</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RentFliter;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    // backgroundColor:'white'
  },
  headView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: hp('1.5%'),
  },
  listTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
  },
  tabView: {
    flexDirection: 'row',
    borderRadius: wp('2%'),
    padding: 10,
    alignSelf: 'center',
  },
  BuiltabView: {
    flexDirection: 'row',
    width: wp('23%'),
    borderRadius: wp('2%'),
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  RERAView: {
    flexDirection: 'row',
    width: wp('80%'),
    // backgroundColor:"pink",
    alignSelf: 'flex-start',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  RatingtabView: {
    flexDirection: 'row',
    borderRadius: wp('2%'),
    paddingHorizontal: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabIMGView: {
    // flexDirection: 'row',
    borderRadius: wp('2%'),
    padding: 10,
    // backgroundColor:'green',
    alignSelf: 'center',
  },
  Heading: {
    alignSelf: 'flex-start',
    marginTop: wp('4%'),
    marginLeft: wp('4%'),
    // backgroundColor:'yellow',
    marginVertical: hp('2%'),
  },
  images: {
    alignSelf: 'center',
    height: hp('6%'),
    width: wp('6%'),
    resizeMode: 'contain',
  },
  Starimages: {
    alignSelf: 'center',
    height: hp('4%'),
    width: wp('4%'),
    resizeMode: 'contain',
  },
  RadioBtn: {
    alignSelf: 'center',
    // height: hp('6.3%'),
    // width: wp('6.3%'),
    resizeMode: 'contain',
  },
  protxt: {
    fontSize: 15,
    color: 'black',
    fontFamily: '500',
    marginLeft: wp('2%'),
  },
  bottomButtonText: {
    fontFamily: FONT.SEMI_BOLD,
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_17,
  },
  TopicHead: {
    fontSize: hp('2.2%'),
    color: 'black',
    fontFamily: FONT.SEMI_BOLD,
  },
  // ---------- slider ------
  labelText: {
    fontFamily: FONT.MEDIUM,
    color: 'orange',
    fontSize: FONT_SIZE.F_12,
  },
  selectedLabelText: {
    color: 'gray',
  },
  UnselectLabelText: {
    color: 'orange',
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('87%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  sliderPicker: {
    borderRadius: 10,
    borderWidth: wp('0.2%'),
    borderColor: '#6c7682',
    overflow: 'hidden',
  },
});
