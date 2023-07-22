import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ServicesIcon from '../assets/svg/ServicesIcon.svg';
import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';
import Globles, {COLOR, FONT, FONT_SIZE} from '../config/Globles';
import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import DetailAddsOne from '../assets/images/DetailAddsOne.png';
import DetailsServicesOfferOne from '../assets/svg/DetailsServicesOfferOne.svg';
import DetailsServicesOfferTwo from '../assets/svg/DetailsServicesOfferTwo.svg';
import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';

//Nav special
import BNProperty from '../assets/svg/BNProperty.svg';
import BNServices from '../assets/svg/BNServices.svg';
import BNHome from '../assets/svg/BNHome.svg';
import BNLoan from '../assets/svg/BNLoan.svg';
import BNFavourite from '../assets/svg/BNFavourite.svg';

import BNHomeIcon from '../assets/svg/BNHomeIcon.svg';
import BNEnquiryIcon from '../assets/svg/BNEnquiryIcon.svg';

const Services = ({navigation, route}) => {
  const [getdata, setGetData] = useState([]);
  const [offerdata, setOfferData] = useState([]);
  const [loader, setLoader] = useState([]);

  useEffect(() => {
    ServiceData();
    getOffer();
  }, []);

  const ServiceData = async () => {
    setLoader(true);
    await axios
      .get('https://inhouse.hirectjob.in/api/service_category')
      .then(res => {
        console.log('Response:======>12345', res.data.data);
        setGetData(res.data.data);
        setLoader(false);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const getOffer = async () => {
    setLoader(true);
    await axios
      .get('https://inhouse.hirectjob.in/api/offer')
      .then(res => {
        console.log('getOffer:======>', res.data.data);
        setOfferData(res.data.data);
        setLoader(false);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={styles.containerServices}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageSplashServices}>
        <View style={styles.headerContainerServices}>
          <View style={styles.headerContentServices}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}>
              <ServicesIcon height={hp('8%')} width={wp('10%')} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTextContainerServices}>
            <Text style={styles.headerTextServices}>Services</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerServices}>
          <ScrollView
            style={styles.innerContainerServices}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View>
              <Image
                source={DetailAddsOne}
                style={styles.advertisementImageServices}
              />
            </View>
            {/* Specialities List as Cards */}
            <View style={styles.specialitiesServicesContainer}>
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
                      style={[styles.rowServices]}
                      onPress={() => {
                        navigation.navigate('SubService', {
                          // image: item.image,
                          banner: item.image,
                          ServiceId: item.id,
                        });
                      }}>
                      <View style={styles.serviceItemServices}>
                        <View style={styles.serviceIconContainerServices}>
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
                        <Text style={styles.serviceTextServices}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

            <View
              style={{
                marginBottom: hp('1%'),
              }}>
              <Text
                style={{
                  color: '#001D4C',
                  fontFamily: FONT.MEDIUM,
                  fontSize: FONT_SIZE.F_16,
                }}>
                Home Services offer
              </Text>
            </View>

            {/* Specialities Offer Cards */}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{flex: 1, flexDirection: 'row'}}
              horizontal={true} // Added horizontal prop
            >
              {offerdata.length === 0 ? (
                <ActivityIndicator
                  style={{
                    // size: 'large',
                    // color: 'blue',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              ) : (
                <FlatList
                  data={offerdata}
                  keyExtractor={item => item.id.toString()}
                  numColumns={4}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <View style={styles.homeServicesOfferServicesContainer}>
                      <View>
                        <Image
                          source={{
                            uri: 'https://inhouse.hirectjob.in/' + item.image,
                          }}
                          style={{
                            width: wp('64%'),
                            height: hp('17.5%'),
                            borderTopRightRadius: hp('2%'),
                            borderTopLeftRadius: hp('2%'),
                          }}
                        />
                      </View>
                      <View style={styles.offerTextServicesContainer}>
                        <Text
                          style={[
                            styles.offerTextServices,
                            {overflow: 'hidden'},
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          Flat {item.discount_price}% off on AC Repair
                        </Text>
                        <View style={styles.offerPriceServicesContainer}>
                          <View
                            style={styles.priceStrikeThroughServicesContainer}>
                            <Text
                              style={{
                                fontSize: FONT_SIZE.F_15,
                                fontFamily: FONT.MEDIUM,
                                color: '#021128',
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              At
                            </Text>
                            <Text
                              style={[
                                styles.offerTextServices,
                                styles.strikeThroughPriceServices,
                              ]}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              2000
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.offerTextServices,
                              styles.discountedPriceServices,
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            ₹ {item.price}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity style={styles.bookNowContainerServices}>
                        <View
                          style={styles.bookNowButtonServices}
                          activeOpacity={0.8}>
                          <Text style={styles.bookNowButtonTextServices}>
                            Book Now
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
            </ScrollView>
          </ScrollView>
        </View>
      </ImageBackground>

      {/*Special Footer */}
      <View>
        <View style={styles.homeIconPositionContainer}>
          <View style={{backgroundColor: 'blue'}}>
            <View style={styles.homeBackGroundMain}>
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  activeOpacity={1.6}
                  onPress={() => {
                    navigation.navigate('PropertyForm');
                  }}
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
            style={[styles.bottomNavIconAndTextContainer]}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <BNHomeIcon height={hp('3.5%')} width={wp('10.5%')} />

            <Text style={styles.textOfBottomNavBNB}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomNavIconAndTextContainer]}
            activeOpacity={1.6}>
            <BNServices height={hp('4.2%')} width={wp('10.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1.6}
            style={[
              styles.bottomNavIconAndTextContainer,
              {marginStart: hp('9.5%')},
            ]}
            onPress={() => {
              navigation.navigate('LoanType');
            }}>
            <BNLoan height={hp('3.5%')} width={wp('10.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1.6}
            onPress={() => {
              navigation.navigate('Form');
            }}
            style={styles.bottomNavIconAndTextContainer}>
            <BNEnquiryIcon height={hp('3.5%')} width={wp('9.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Enquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  containerServices: {
    flex: 1,
  },
  backgroundImageSplashServices: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainerServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentServices: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advertisementImageServices: {
    // flex: 1,
    width: wp('86%'),
    height: hp('20%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  headerTextContainerServices: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
  },
  headerTextServices: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },
  contentContainerServices: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerServices: {
    margin: hp('3%'),
    flex: 1,
    alignSelf: 'center',
    marginBottom: hp('9.1%'),
  },

  //Specialities List in Card
  bookNowContainerServices: {
    marginTop: hp('0.5%'),
    paddingVertical: hp('1%'),
  },
  rowServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('23%'),
    alignItems: 'center',
  },
  serviceItemServices: {
    alignItems: 'center',
    margin: hp('1%'),
    marginLeft: hp('0%'),
    marginRight: hp('0%'),
    width: hp('10%'),
    height: hp('13%'),
  },
  serviceIconContainerServices: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: hp('2%'),
    backgroundColor: '#FFFFFF',
    borderWidth: hp('0.1%'),
    borderColor: COLOR.ExtLIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('2%'),
  },
  serviceTextServices: {
    fontFamily: FONT.MEDIUM,
    color: '#001D4C',
    fontSize: FONT_SIZE.F_12,
    marginTop: hp('1%'),
    textAlign: 'center',
  },

  //Specialitys List
  specialitiesServicesContainer: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  homeServicesOfferServicesContainer: {
    marginBottom: hp('2%'),
    marginRight: hp('2%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
  },
  offerTextServicesContainer: {
    width: wp('52%'),
    marginTop: hp('1%'),
    marginLeft: hp('1%'),
  },
  offerTextServices: {
    fontSize: FONT_SIZE.F_15,
    color: '#021128',
    fontFamily: FONT.MEDIUM,
    margin: hp('0.1%'),
  },
  offerPriceServicesContainer: {
    flexDirection: 'row',
    marginTop: hp('0.2%'),
  },
  priceStrikeThroughServicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikeThroughPriceServices: {
    overflow: 'hidden',
    textDecorationLine: 'line-through',
    fontSize: FONT_SIZE.F_12,
    alignSelf: 'center',
    marginLeft: hp('0.5%'),
    marginTop: hp('0.5%'),
  },
  discountedPriceServices: {
    overflow: 'hidden',
    color: '#F49825',
    fontFamily: FONT.SEMI_BOLD,
    marginLeft: hp('1.5%'),
  },

  //Book Now Button in Services Offers cards
  bookNowContainerServices: {
    marginTop: 10,
    alignItems: 'center',
  },
  bookNowButtonServices: {
    backgroundColor: '#F49825',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: hp('2%'),
  },
  bookNowButtonTextServices: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

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
