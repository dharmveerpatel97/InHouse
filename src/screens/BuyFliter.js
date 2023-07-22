import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SliderPicker} from 'react-native-slider-picker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import Globles, {COLOR, FONT, FONT_SIZE} from '../config/Globles';
const BuyFliter = ({navigation}) => {
  const [status, setStatus] = useState(false);

  const [Maxdata, setMaxdata] = useState([]);
  const [coverSQT, setcoverSQT] = useState('');
  const [coverMin, setcoverMin] = useState('');
  const [coverMax, setcoverMax] = useState('');

  const [verification, setverification] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [Showcheck, setShowcheck] = useState([]);

  const [dataArrays, setDataArrays] = useState({
    categoryData: [],
    bhkData: [],
    propertyType: [],
    max_price: 0,
    midPrice: 0,
    ratingData:[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  });

  const [selectedFilters, setSelectedFilters] = useState({});

  const selectFilterData = (type, item) => {
    switch (type) {
      case 'category':
        setSelectedFilters({...selectedFilters, purpose: item.purpose});
        break;
      case 'propertyType':
        setSelectedFilters({...selectedFilters, property_type_id: item.id});
        break;
      case 'price':
        setSelectedFilters({
          ...selectedFilters,
          price: 4000,
        });
        break;
      case 'BHK':
        setSelectedFilters({
          ...selectedFilters,
          total_bedroom: item.total_bedroom,
        });
        break;
      case 'totalRating':
        setSelectedFilters({...selectedFilters, totalRating: item});
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get('https://inhouse.hirectjob.in/api/properties')
      .then(res => {
        console.log('resres',res)
        setDataFliter(res.data);
        setMaxdata(res.data.max_area);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const setDataFliter = data => {
    let categoryData = data.properties.data.filter(
      (item, index, self) =>
        index === self.findIndex(t => t.purpose === item.purpose),
    );
    let bhkData = data.properties.data.filter(
      (item, index, self) =>
        index === self.findIndex(t => t.total_bedroom === item.total_bedroom),
    );

    let max_price = data.max_price;
    let midPrice = max_price / 2;
    setDataArrays({
      ...dataArrays,
      bhkData: bhkData,
      categoryData: categoryData,
      propertyType: data.property_types,
      max_price: max_price,
      midPrice: midPrice,
    });
  };



  useEffect(() => {
    setShowcheck([checkbox1, checkbox2, checkbox3]);
  }, [checkbox1, checkbox2, checkbox3]);

  // ----------- verfied ---------
  const handleVerificationToggle = () => {
    const newVerification = !verification;
    setverification(newVerification);
    setverifyFun(newVerification);
  };

  // ----------- show only ---------
  const handleCheckbox = checkboxNumber => {
    setCheckbox1(checkboxNumber === 1);
    setCheckbox2(checkboxNumber === 2);
    setCheckbox3(checkboxNumber === 3);
    const updatedResponses = Showcheck.map((response, index) => {
      if (index === checkboxNumber - 1) {
        return !response;
      }
      return response;
    });
    setShowcheck(updatedResponses);
  };
  
  return (
    <View style={{flex: 1, bResalekgroundColor: 'white'}}>
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

        <ScrollView style={{flexGrow: 1, marginBottom: wp('3%')}}>
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: 5,
              width: wp('29%'),
              marginLeft: '4%',
              marginVertical: hp('1.5%'),
            }}>
            <Text style={styles.TopicHead}>Categories</Text>
          </View>

          {dataArrays.categoryData.length === 0 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={dataArrays.categoryData}
              keyExtractor={item => 'Categories' + item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: hp('1.8%'),
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.tabView,
                    {
                      marginRight: wp('2.6%'),
                      backgroundColor:
                        selectedFilters?.purpose === item.purpose
                          ? 'orange'
                          : '#F8F8F8',
                    },
                  ]}
                  onPress={() => selectFilterData('category', item)}>
                  <Text
                    style={{
                      fontSize: FONT_SIZE.F_14,
                      color: selectedFilters?.purpose === item.purpose ? 'white' : 'black',
                      fontFamily: FONT.MEDIUM,
                    }}>
                    {item.purpose}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

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
                  fontSize: FONT_SIZE.F_13,
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

          {dataArrays.propertyType.length === 0 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={dataArrays.propertyType}
              keyExtractor={item => 'Property' + item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={[styles.listTab]}>
                  <TouchableOpacity
                    style={[
                      styles.tabIMGView,
                      {
                        backgroundColor:
                          selectedFilters?.property_type_id === item.id
                            ? 'orange'
                            : 'white',
                      },
                    ]}
                    onPress={() => selectFilterData('propertyType', item)}>
                    <Image
                      source={{
                        uri: 'https://inhouse.hirectjob.in/' + item.icon,
                      }}
                      style={[styles.images, {tintColor: 'black'}]}></Image>
                    <Text
                      style={{
                        fontSize: 15,
                        color: selectedFilters?.property_type_id === item.id ? 'white' : 'black',
                        fontFamily: '500',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {/* ------------ Price ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Price</Text>
          </View>
          <View style={[styles.tabIMGView, {backgroundColor: 'white'}]}>
           {
            dataArrays?.max_price!=0 &&
            <Slider
              maximumValue={dataArrays?.max_price}
              minimumValue={0}
              minimumTrackTintColor="#307ecc"
              maximumTrackTintColor="#000000"
              step={1}
              value={50}
              onValueChange={
                (sliderValue) => {
                  selectFilterData('price',sliderValue) 
                  console.log('sliderValue',sliderValue)
              }
              }
            />
           }


            <View style={styles.labelView}>
              <Text style={styles.labelText}>Rp 0</Text>
              <Text
                style={[
                  styles.labelText,
                  styles.selectedLabelText,
                  {marginLeft: hp('7%')},
                ]}>
                Rp {dataArrays.midPrice.toLocaleString()}
              </Text>
              <Text style={[styles.labelText, styles.selectedLabelText]}>
                Rp {dataArrays.max_price.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* ------------ Rate ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Rating</Text>
          </View>
          <FlatList
            data={dataArrays.ratingData}
            keyExtractor={item => 'Rating' + item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: hp('1.8%'),
            }}
            renderItem={({item}) => (
              <View style={styles.listTab}>
                <TouchableOpacity
                  style={[
                    styles.RatingtabView,
                    {
                      backgroundColor:
                        selectedFilters?.totalRating === item.id
                          ? 'orange'
                          : '#F8F8F8',
                    },
                  ]}
                  onPress={() => selectFilterData('totalRating', item.id)}>
                  <Text
                    style={{
                      fontSize: 15,
                      color:
                        selectedFilters?.totalRating === item.id
                          ? 'white'
                          : 'black',
                      fontFamily: '500',
                      marginRight: wp('2%'),
                    }}>
                    {item.id}
                  </Text>
                  <Image
                    source={require('../assets/images/star.png')}
                    style={styles.Starimages}></Image>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* ------------ BHK ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>BHK</Text>
          </View>
          {dataArrays.bhkData.length === 0 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={dataArrays.bhkData}
              keyExtractor={item => 'BHK' + item.id.toString()}
              numColumns={3}
              renderItem={({item}) => (
                <View style={[styles.listTab, {marginVertical: hp('1%')}]}>
                  <TouchableOpacity
                    style={[
                      styles.BuiltabView,
                      {
                        backgroundColor:
                          selectedFilters?.total_bedroom === item.total_bedroom
                            ? 'orange'
                            : '#F8F8F8',
                      },
                    ]}
                    onPress={() => selectFilterData('BHK', item)}>
                    <Text
                      style={{
                        fontSize: 15,
                        color:
                          selectedFilters?.total_bedroom === item.total_bedroom
                            ? 'white'
                            : 'black',
                        fontFamily: '500',
                        textAlign: 'center',
                      }}>
                      {item.total_bedroom} BHK
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {/* ------------ fACILITY ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Facilities</Text>
          </View>

          <FlatList
            data={FacilitiesData}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            renderItem={({item}) => (
              <View style={[styles.listTab, {marginVertical: hp('0.8%')}]}>
                <TouchableOpacity
                  style={[
                    styles.tabIMGView,
                    {
                      backgroundColor:
                        faciltyStatus === item.title ? 'orange' : '#F8F8F8',
                    },
                  ]}
                  onPress={() => FacilitPress(item.title)}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: faciltyStatus === item.title ? 'white' : 'black',
                      fontFamily: '500',
                      marginRight: wp('2%'),
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          /> */}

          {/* ------------ COVERaREA ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Covered Area</Text>
          </View>
          <ScrollView
            style={styles.innerContainerDetail}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={[styles.listTab]}>
              <View
                style={[styles.pickerContainerForm, {marginRight: wp('3%')}]}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={coverSQT}
                  onValueChange={setcoverSQT}>
                  <Picker.Item label="Sqft" value="Sqft" />
                  <Picker.Item label="0" value="0" />
                  {/* <Picker.Item label="Builder" value="Builder" /> */}
                </Picker>
              </View>

              <View
                style={[styles.pickerContainerForm, {marginRight: wp('3%')}]}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={coverMin}
                  onValueChange={setcoverMin}>
                  <Picker.Item label="Min" value="Min" />
                  <Picker.Item label="0" value="0" />
                  {/* <Picker.Item label="Builder" value="Builder" /> */}
                </Picker>
              </View>

              <View
                style={[styles.pickerContainerForm, {marginRight: wp('3%')}]}>
                <Picker
                  style={styles.pickerForm}
                  dropdownIconColor="black"
                  selectedValue={coverMax}
                  onValueChange={setcoverMax}>
                  <Picker.Item label="Max" value="Max" />
                  <Picker.Item label={Maxdata.toString()} value={Maxdata} />
                  {/* <Picker.Item label="Builder" value="Builder" /> */}
                </Picker>
              </View>
            </View>
          </ScrollView>

          {/* ------------ Prossesional ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Possesional Status</Text>
          </View>
          <View style={[styles.listTab, {width: '73%'}]}>
            <TouchableOpacity
              style={{
                backgroundColor: possession === false ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setpossession(!possession);
                Possesfun('Under Construction');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: possession === false ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Under Construction
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: possession === true ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setpossession(!possession);
                Possesfun('Ready to move');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: possession === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Ready to move
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* ------------ Sale type ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Sale Type</Text>
          </View>
          <View style={[styles.listTab, {width: '40%'}]}>
            <TouchableOpacity
              style={{
                backgroundColor: Saletype === false ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setSaletype(!Saletype);
                Salefun('resale');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: Saletype === false ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Resale
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Saletype === true ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
                width: wp('20%'),
                alignItems: 'center',
              }}
              onPress={() => {
                setSaletype(!Saletype);
                Salefun('New');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: Saletype === true ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                New
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* ------------ Posted By ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Posted By</Text>
          </View>
          <View style={[styles.listTab, {width: '53%'}]}>
            <TouchableOpacity
              style={{
                backgroundColor: postby === 0 ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setpostby(0);
                postbyfun('Agent');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: postby === 0 ? 'white' : 'black',
                  fontFamily: '500',
                  marginRight: wp('2%'),
                }}>
                Agent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: postby === 1 ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setpostby(1);
                postbyfun('Owner');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: postby === 1 ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Owner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: postby === 2 ? 'orange' : '#F8F8F8',
                borderRadius: wp('2%'),
                padding: 10,
              }}
              onPress={() => {
                setpostby(2);
                postbyfun('Other');
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: postby === 2 ? 'white' : 'black',
                  fontFamily: '500',
                }}>
                Other
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* ------------ Rera Registered ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Rera Registered</Text>
          </View>

          <View style={{marginHorizontal: hp('2%')}}>
            <View style={styles.RERAView}>
              <Image
                source={require('../assets/images/rectangle.jpg')}
                style={styles.RadioBtn}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                  marginLeft: wp('2%'),
                }}>
                RERA register properties
              </Text>
            </View>

            <View style={[styles.RERAView, {marginTop: '2%'}]}>
              <Image
                source={require('../assets/images/rectangle.jpg')}
                style={styles.RadioBtn}></Image>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                  marginLeft: wp('2%'),
                }}>
                RERA register agents
              </Text>
            </View>
          </View> */}

          {/* ------------ Furnishing ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Furnishing Status</Text>
          </View>

          <View
            style={{
              height: wp('35%'),
              justifyContent: 'center',
              alignSelf: 'flex-start',
              marginVertical: hp('2%'),
            }}>
            <Image
              style={{width: wp('100%')}}
              resizeMode="contain"
              source={require('../assets/images/Demo.png')}
            />
          </View> */}

          {/* ---------------- Amenitite ----------- */}
          {/* <View style={styles.Heading}>
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
          </View> */}

          {/* ------------ Verification Properties ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Verified Properties</Text>
          </View>

          <View style={{marginHorizontal: hp('2%')}}>
            <TouchableOpacity
              style={styles.RERAView}
              onPress={
                (() => setverification(!verification), handleVerificationToggle)
              }>
              {verification ? (
                <Image
                  source={require('../assets/images/uncheck-box.png')}
                  style={styles.RadioBtn}></Image>
              ) : (
                <Image
                  source={require('../assets/images/check-box.png')}
                  style={styles.RadioBtn}></Image>
              )}
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: '500',
                  marginLeft: wp('2%'),
                }}>
                Show Only Verified Properties
              </Text>
            </TouchableOpacity>
          </View>

          {/* ------------ pHOTO/Video --------- */}
          {/* <View
            style={{
              flexDirection: 'row',
              width: wp('90%'),
              justifyContent: 'space-between',
              marginHorizontal: hp('2.5s%'),
            }}>
            <View style={{width: wp('45%'), justifyContent: 'space-between'}}>
              <Text style={[styles.TopicHead, {marginVertical: wp('3%')}]}>
                Photos
              </Text>
              <Image
                style={{resizeMode: 'contain', alignItems: 'center'}}
                source={require('../assets/images/Mbprime.png')}></Image>
            </View>

            <View style={{width: wp('45%'), justifyContent: 'space-between'}}>
              <Text style={[styles.TopicHead, {marginVertical: wp('3%')}]}>
                Videos
              </Text>
              <Image
                style={{resizeMode: 'contain', alignItems: 'center'}}
                source={require('../assets/images/Mbprime.png')}></Image>
            </View>
          </View> */}

          {/* ---------------- Facing ----------- */}
          {/* <View style={styles.Heading}>
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
          </View> */}

          {/* ---------------- Bathroom ----------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Bathroom</Text>
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
          </View> */}

          {/* ------------ Covered Area ---------- */}
          {/* <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Covered Area</Text>
          </View>

          <View style={[styles.listTab, {width: '53%'}]}>
            <View
              style={[
                styles.BuiltabView,
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
                Min
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>

            <View
              style={[
                styles.BuiltabView,
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
                Max
              </Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.Starimages}></Image>
            </View>
          </View> */}

          {/* ------------ Show ONLY ---------- */}
          <View style={styles.Heading}>
            <Text style={styles.TopicHead}>Show Only</Text>
          </View>

          <View style={{marginHorizontal: hp('2%')}}>
            <TouchableOpacity
              style={styles.RERAView}
              onPress={() => handleCheckbox(1)}>
              {checkbox1 ? (
                <Image
                  source={require('../assets/images/check-box.png')}
                  style={styles.RadioBtn}></Image>
              ) : (
                <Image
                  source={require('../assets/images/uncheck-box.png')}
                  style={styles.RadioBtn}></Image>
              )}
              <Text style={styles.protxt}>
                Properties with discounts and offer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.RERAView, {marginVertical: hp('1%')}]}
              onPress={() => handleCheckbox(2)}>
              {checkbox2 ? (
                <Image
                  source={require('../assets/images/check-box.png')}
                  style={styles.RadioBtn}></Image>
              ) : (
                <Image
                  source={require('../assets/images/uncheck-box.png')}
                  style={styles.RadioBtn}></Image>
              )}
              <Text style={styles.protxt}>Exclusive properties</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RERAView}
              onPress={() => handleCheckbox(3)}>
              {checkbox3 ? (
                <Image
                  source={require('../assets/images/check-box.png')}
                  style={styles.RadioBtn}></Image>
              ) : (
                <Image
                  source={require('../assets/images/uncheck-box.png')}
                  style={styles.RadioBtn}></Image>
              )}
              <Text style={styles.protxt}>
                Properties posted by certified agents
              </Text>
            </TouchableOpacity>
          </View>

          {/* ----------- Button ---------- */}
          <TouchableOpacity
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
            onPress={() => {
              navigation.navigate('Property', {
                selectedFilters: selectedFilters,
              });
              console.log('selected filter data', selectedFilters);
            }}>
            <Text style={styles.bottomButtonText}>Filter Properties</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BuyFliter;

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
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
  },
  tabView: {
    // flexDirection: 'row',
    borderRadius: wp('2%'),
    padding: 10,
    alignSelf: 'center',
  },
  BuiltabView: {
    flexDirection: 'row',
    width: wp('20%'),
    borderRadius: wp('2%'),
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: hp('6.5%'),
    width: wp('6.5%'),
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
  // ----------- Slider ---------
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
    width: wp('89%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  sliderPicker: {
    borderRadius: 10,
    borderWidth: wp('0.2%'),
    borderColor: '#6c7682',
    overflow: 'hidden',
  },
  pickerForm: {
    height: hp('5%'),
    // borderRadius: wp('3%'),
    color: 'black',
    backgroundColor: '#F8F8F8',
  },
  pickerContainerForm: {
    // borderWidth: hp('0.1%'),
    // borderRadius: hp('2%'),
    width: wp('40%'),
    justifyContent: 'center',
    height: hp('6.5%'),
    alignSelf: 'center',
    // borderColor: 'gray',
  },
});
