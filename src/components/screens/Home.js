import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import HomeProfile from '../../assets/svg/HomeProfile.svg';
import Filter from '../../assets/svg/Filter.svg';
import Buy from '../../assets/svg/Buy.svg';
import Sale from '../../assets/svg/Sale.svg';
import Rent from '../../assets/svg/Rent.svg';

import HeartHome from '../../assets/svg/HeartHome.svg';

import Search from '../../assets/svg/SearchW.svg';
import {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import HomeJPGBGI from '../../assets/images/HomeJPGBGI.jpg';
import HomeFinanceTwo from '../../assets/images/HomeFinanceTwo.png';
import HomeMapPoint from '../../assets/svg/HomeMapPoint.svg';

import ServicesIcon from '../../assets/svg/ServicesIcon.svg';
import Notificationbell from '../../assets/svg/Notificationbell.svg';
import HeartHeader from '../../assets/svg/HeartHeader.svg';
import BNHomeIcon from '../../assets/svg/BNHomeIcon.svg';
import BNEnquiryIcon from '../../assets/svg/BNEnquiryIcon.svg';
//Nav special
import BNProperty from '../../assets/svg/BNProperty.svg';
import BNServices from '../../assets/svg/BNServices.svg';
import BNHome from '../../assets/svg/BNHome.svg';
import BNLoan from '../../assets/svg/BNLoan.svg';
import BNFavourite from '../../assets/svg/BNFavourite.svg';

import axios from 'axios';

const App = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [getdata, setGetData] = useState([]);
  const [loandata, setLoandata] = useState([]);

  useEffect(() => {
    ServiceData();
    LoanData();
  }, []);

  const ServiceData = async () => {
    await axios
      .get('https://inhouse.hirectjob.in/api/service_category')
      .then(res => {
        console.log('service_categoryResponse:======>', res.data.data);
        setGetData(res.data.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const LoanData = async () => {
    await axios
      .get('https://inhouse.hirectjob.in/api/loan_category')
      .then(res => {
        console.log('Response  loan:======>', res.data.data);
        setLoandata(res.data.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      {/* Header */}
      <View style={{height: hp('35%')}}>
        <Image
          source={HomeJPGBGI}
          style={{
            top: hp('-7%'),
            width: wp('100%'),
            height: hp('40.5%'),
            position: 'absolute',
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
        />

        {/* Items of Head */}
        <View
          style={{
            marginTop: hp('1%'),
            width: wp('95%'),
            alignSelf: 'center',
          }}>
          <View style={styles.welcomeTextContainer}>
            <View style={styles.profileNameAndPictureContainer}>
              {/* Menu Icon */}
              <View style={styles.headerContentDetail}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Menu');
                  }}>
                  <ServicesIcon height={hp('8%')} width={wp('10%')} />
                </TouchableOpacity>
              </View>
              {/* Profile Design */}
              <View style={{flexDirection: 'row'}}>
                <HomeProfile
                  height={hp('5%')}
                  width={wp('11.5%')}
                  marginRight={wp('2%')}
                />

                <Text style={styles.greetingText}>Hi Anarda</Text>
              </View>

              {/* Header Notification and Fav Icons */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Notification');
                  }}
                  style={styles.notificationAndFavIconsContainer}>
                  <Notificationbell height={hp('5%')} width={wp('10%')} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.notificationAndFavIconsContainer}
                  onPress={() => {
                    navigation.navigate('Favourite');
                  }}>
                  <HeartHeader height={hp('5%')} width={wp('10%')} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.welcomeText}>Welcome</Text>
          </View>

          <View style={styles.textInputAndFilterIconContainer}>
            <View style={styles.searchViewContainer}>
              <View style={styles.searchInputContainer}>
                <Search
                  style={styles.searchIcon}
                  height={hp('3%')}
                  width={wp('5.3%')}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Search place, home, cozy ..."
                  placeholderTextColor={COLOR.WHITE}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BuyFliter');
              }}
              style={styles.filterIconContainer}>
              <Filter height={hp('6%')} width={wp('11.5%')} />
            </TouchableOpacity>
          </View>
        </View>

        {/* View for Buy sale Rent */}
        <View style={styles.buySaleRentContainerMain}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.buySaleRentContainer}>
              <View style={styles.iconTextContainer}>
                <Buy height={hp('4%')} width={wp('7%')} />
                <Text style={styles.buySaleRentText}>Buy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buySaleRentContainer,
                {
                  backgroundColor: 'rgba(0, 27, 46, 0.2)',
                  borderWidth: hp('0'),
                },
              ]}>
              <View style={styles.iconTextContainer}>
                <Sale height={hp('4%')} width={wp('7%')} />
                <Text style={styles.buySaleRentText}>Sale</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buySaleRentContainer,
                {
                  backgroundColor: 'rgba(0, 27, 46, 0.2)',
                  borderWidth: hp('0'),
                },
              ]}>
              <View style={styles.iconTextContainer}>
                <Rent height={hp('4%')} width={wp('7%')} />
                <Text style={[styles.buySaleRentText]}>Rent</Text>
              </View>
            </TouchableOpacity>

            {/* ------------------------------ */}

            <TouchableOpacity style={styles.buySaleRentContainer}>
              <View style={styles.iconTextContainer}>
                <Buy height={hp('4%')} width={wp('7%')} />
                <Text style={styles.buySaleRentText}>Buy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buySaleRentContainer}>
              <View style={styles.iconTextContainer}>
                <Buy height={hp('4%')} width={wp('7%')} />
                <Text style={styles.buySaleRentText}>Buy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buySaleRentContainer,
                {
                  backgroundColor: 'rgba(0, 27, 46, 0.2)',
                  borderWidth: hp('0'),
                },
              ]}>
              <View style={styles.iconTextContainer}>
                <Sale height={hp('4%')} width={wp('7%')} />
                <Text style={[styles.buySaleRentText]}>PG</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {/* ----------------------------------------------------- */}
      {/* Body */}

      <ScrollView
        style={{
          flex: 2,
          width: wp('89%'),
          height: hp('3.3%'),
          alignSelf: 'center',
          marginBottom: hp('9.1%'),
        }}
        showsVerticalScrollIndicator={false}>
        {/* Cards for Home in Popular Location*/}

        <View>
          <View>
            <Text
              style={{
                color: COLOR.DARK_BLUE,
                fontFamily: FONT.SEMI_BOLD,
                fontSize: FONT_SIZE.F_16,
              }}>
              Homes in Popular Location
            </Text>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCard}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details');
                  }}>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Rest of the code... */}
              <View style={styles.containerImageCard}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details');
                  }}>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.containerImageCard}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details');
                  }}>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Cards for service Home Finance*/}
        <View>
          <View>
            <Text
              style={{
                color: COLOR.DARK_BLUE,
                fontFamily: FONT.SEMI_BOLD,
                fontSize: FONT_SIZE.F_16,
                marginTop: hp('2%'),
                marginLeft: hp('0.1%'),
              }}>
              Home Finance
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCardFinance}>
                <View style={styles.bottomContainerImageCardFinance}>
                  <Text
                    style={[
                      styles.textImageCardFinance,
                      {fontFamily: FONT.SEMI_BOLD},
                    ]}>
                    Homes Finance
                  </Text>
                  <Text
                    style={[styles.textImageCardFinance, {color: '#F49825'}]}>
                    420 Residence
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/HomeFinanceOne.png')}
                  style={styles.imageImageCardFinance}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCardFinance}>
                <View style={styles.bottomContainerImageCardFinance}>
                  <Text
                    style={[
                      styles.textImageCardFinance,
                      {fontFamily: FONT.SEMI_BOLD},
                    ]}>
                    Estimation
                  </Text>
                  <Text
                    style={[styles.textImageCardFinance, {color: '#F49825'}]}>
                    320 Residence
                  </Text>
                </View>
                <Image
                  source={HomeFinanceTwo}
                  style={styles.imageImageCardFinance}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCardFinance}>
                <View style={styles.bottomContainerImageCardFinance}>
                  <Text
                    style={[
                      styles.textImageCardFinance,
                      {fontFamily: FONT.SEMI_BOLD},
                    ]}>
                    Homes Finance
                  </Text>
                  <Text
                    style={[styles.textImageCardFinance, {color: '#F49825'}]}>
                    420 Residence
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/HomeFinanceOne.png')}
                  style={styles.imageImageCardFinance}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Cards for Home in Popular Location*/}
        <View style={{marginTop: hp('2%')}}>
          <View>
            <Text
              style={{
                color: COLOR.DARK_BLUE,
                fontFamily: FONT.SEMI_BOLD,
                fontSize: FONT_SIZE.F_16,
              }}>
              Homes in Popular Location
            </Text>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/*------------Mini HOME Services -------------*/}
        <View style={{marginTop: hp('2%')}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: COLOR.DARK_BLUE,
                  fontFamily: FONT.SEMI_BOLD,
                  fontSize: FONT_SIZE.F_16,
                }}>
                Services
              </Text>
            </View>
            <TouchableOpacity
              style={{marginTop: hp('1.5%')}}
              onPress={() => navigation.navigate('Services')}>
              <Text style={{color: '#021128', fontFamily: FONT.SEMI_BOLD}}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
              {getdata.length === 0 ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <FlatList
                  data={getdata}
                  keyExtractor={item => item.id.toString()}
                  numColumns={4}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => navigation.navigate('Services')}>
                      <View style={styles.serviceItem}>
                        <View style={styles.serviceIconContainer}>
                          <Image
                            source={{
                              uri: 'https://inhouse.hirectjob.in/' + item.image,
                            }}
                            style={{
                              width: wp('12%'),
                              height: hp('6%'),
                              resizeMode: 'cover',
                              borderRadius: hp('2%'),
                            }}
                          />
                        </View>
                        <Text style={styles.serviceText}> {item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>

        {/*------------Mini lOAN Services -------------*/}
        <View style={{marginTop: hp('2%')}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: COLOR.DARK_BLUE,
                  fontFamily: FONT.SEMI_BOLD,
                  fontSize: FONT_SIZE.F_16,
                }}>
                Loan Services
              </Text>
            </View>
            <TouchableOpacity
              style={{marginTop: hp('1.5%')}}
              onPress={() => navigation.navigate('LoanType')}>
              <Text style={{color: '#021128', fontFamily: FONT.SEMI_BOLD}}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
              {loandata !== [] ? (
                <FlatList
                  // data={getdata.slice(0, 7)}
                  data={loandata}
                  keyExtractor={item => item.id.toString()}
                  numColumns={4}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('LoanType')}>
                      <View style={styles.serviceItem}>
                        <View style={styles.serviceIconContainer}>
                          <Image
                            source={{
                              uri: 'https://inhouse.hirectjob.in/' + item.image,
                            }}
                            style={{
                              width: wp('12%'),
                              height: hp('6%'),
                              resizeMode: 'cover',
                              borderRadius: hp('2%'),
                            }}></Image>
                        </View>
                        <Text style={styles.serviceText}> {item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <ActivityIndicator size="large" color="blue" />
              )}
            </View>
          </ScrollView>
        </View>

        {/* Cards for Home in Popular Location*/}
        <View style={{marginBottom: hp('2%')}}>
          <View>
            <Text
              style={{
                color: COLOR.DARK_BLUE,
                fontFamily: FONT.SEMI_BOLD,
                fontSize: FONT_SIZE.F_16,
              }}>
              Homes in Popular Location
            </Text>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Repeat the above block for other images */}

              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerImageCard}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/ImageOne.jpg')}
                    style={styles.imageImageCard}
                  />
                </TouchableOpacity>
                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('52%')}}>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      4 BHK
                    </Text>
                    <Text
                      style={[
                        styles.textImageCard,
                        {fontFamily: FONT.SEMI_BOLD},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      ₹ 1.5 lac | 2.5 lac
                    </Text>
                    <Text
                      style={[styles.textImageCard, {overflow: 'hidden'}]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      2118 Thornridge Cir. Syracuse
                    </Text>
                  </View>
                  <TouchableOpacity style={{flex: 1}}>
                    <HeartHome height={hp('10%')} width={wp('11.5%')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* ------------------------------------------------------------------- */}

      {/* MapPointing Image */}

      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={{position: 'absolute', bottom: hp('15.5%'), right: hp('3%')}}>
        <HomeMapPoint height={hp('10%')} width={wp('22%')} />
      </TouchableOpacity>

      {/*Special Footer */}
      <View>
        <View style={styles.homeIconPositionContainer}>
          <View style={{backgroundColor: 'blue'}}>
            <View style={styles.homeBackGroundMain}>
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PropertyForm');
                  }}
                  activeOpacity={1.6}
                  style={[styles.homeSVGBackGroundBNB, styles.homeIconBtnBNB]}>
                  <BNHome containerStyle={{marginHorizontal: 16}} />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View style={styles.bottomNavIconAndTextMainContainer}>
          <TouchableOpacity
            activeOpacity={1.6}
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={[styles.bottomNavIconAndTextContainer]}>
            <BNHomeIcon height={hp('3.5%')} width={wp('10.5%')} />

            <Text style={styles.textOfBottomNavBNB}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1.6}
            onPress={() => {
              navigation.navigate('Services');
            }}
            style={[styles.bottomNavIconAndTextContainer]}>
            <BNServices height={hp('4.2%')} width={wp('10.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1.6}
            onPress={() => {
              navigation.navigate('LoanType');
            }}
            style={[
              styles.bottomNavIconAndTextContainer,
              {marginStart: hp('9.5%')},
            ]}>
            <BNLoan height={hp('3.5%')} width={wp('10.5%')} />

            <Text style={styles.textOfBottomNavBNB}>Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1.6}
            style={styles.bottomNavIconAndTextContainer}
            onPress={() => {
              navigation.navigate('Form');
            }}>
            <BNEnquiryIcon height={hp('3.5%')} width={wp('9.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Enquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
  },
  backgroundContainerHeader: {
    flex: 1,
  },
  waveContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: hp('2.5%'),
    alignSelf: 'center',
    height: hp('100%'),
    width: wp('100%'),
    paddingLeft: hp('2.5%'),
    paddingRight: hp('2.5%'),
  },
  profileNameAndPictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  greetingText: {
    fontFamily: FONT.BOLD,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.F_21,
  },
  notificationAndFavIconsContainer: {
    marginLeft: hp('2%'),
  },
  welcomeTextContainer: {
    marginBottom: hp('0.3%'),
  },
  welcomeText: {
    fontSize: FONT_SIZE.F_15,
    marginBottom: hp('1%'),
    fontFamily: FONT.MEDIUM,
    color: '#F49825',
    alignSelf: 'center',
  },
  textInputAndFilterIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('0.5%'),
    width: wp('83%'),
    alignSelf: 'center',
  },
  searchViewContainer: {
    flexDirection: 'row',
    borderRadius: hp('1.5%'),
    alignItems: 'center',
    width: wp('64%'),
    height: hp('5.8%'),
    backgroundColor: '#1F5EC3',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: hp('0.3%'),
    borderRadius: hp('1%'),
    paddingHorizontal: hp('1%'),
  },
  searchIcon: {
    marginRight: hp('0.8%'),
  },
  filterIconContainer: {
    marginLeft: hp('2%'),
  },

  input: {
    marginLeft: hp('0.2%'),
    color: COLOR.WHITE,
    fontFamily: FONT.MEDIUM,
    fontSize: FONT_SIZE.F_13,
    width: wp('52%'),
    height: hp('5.8%'),
  },

  //View for Buy Sale Rent
  buySaleRentContainerMain: {
    width: wp('88%'),
    alignSelf: 'center',
    top: hp('7.3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  buySaleRentContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: hp('0.2%'),
    borderColor: '#F49825',
    borderRadius: hp('2%'),
    padding: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: hp('2%'),
    paddingHorizontal: hp('1.2%'),
  },
  buySaleRentText: {
    color: '#031F5F',
    fontFamily: FONT.SEMI_BOLD,
    fontSize: hp('2%'),
    marginLeft: hp('1%'),
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('0.1%'),
    paddingBottom: hp('0.1%'),
    padding: hp('1%'),
  },

  //Image Gallery Card
  containerImageCard: {
    width: wp('70%'),
    height: hp('23%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    overflow: 'hidden',
    marginTop: hp('1.3%'),
    marginRight: hp('2.5%'),
  },
  imageImageCard: {
    width: wp('70%'),
    height: hp('13%'),
    resizeMode: 'cover',
  },
  bottomContainerImageCard: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    marginLeft: hp('2%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textImageCard: {
    fontSize: FONT_SIZE.F_15,
    color: '#021128',
    fontFamily: FONT.REGULAR,
    margin: hp('0.1%'),
  },

  //Finance
  containerImageCardFinance: {
    width: wp('50%'),
    height: hp('26.5%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    overflow: 'hidden',
    marginTop: hp('2%'),
    marginRight: hp('2.5%'),
  },
  imageImageCardFinance: {
    width: wp('55%'),
    height: hp('19%'),
    resizeMode: 'cover',
  },
  bottomContainerImageCardFinance: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    margin: hp('2%'),
  },
  textImageCardFinance: {
    fontSize: FONT_SIZE.F_15,
    color: '#021128',
    fontFamily: FONT.REGULAR,
    margin: hp('0.1%'),
  },

  //SERVICES
  container: {
    marginTop: hp('0.5%'),
    paddingVertical: hp('1%'),
  },

  serviceItem: {
    alignItems: 'center',
    margin: hp('1%'),
    marginLeft: hp('0%'),
    marginRight: hp('0.6%'),
    // backgroundColor: 'green',
  },
  serviceIconContainer: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: hp('3%'),
    backgroundColor: 'white',
    borderWidth: hp('0.1%'),
    borderColor: '#001D4C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('2%'),
  },
  serviceText: {
    fontFamily: FONT.MEDIUM,
    color: '#001D4C',
    fontSize: FONT_SIZE.F_12,
    marginTop: hp('1%'),
    textAlign: 'center',
    alignItems: 'center',
    width: wp('18%'),
  },

  //Bottom Nav Bar
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
});
