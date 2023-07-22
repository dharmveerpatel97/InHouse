import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';

import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';
import Globles, {COLOR, FONT, FONT_SIZE} from '../config/Globles';
import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import Location from '../assets/svg/Location.svg';
import FavouriteOne from '../assets/images/FavouriteOne.jpg';
import FavouriteTwo from '../assets/images/FavouriteTwo.jpg';
import FavouriteThree from '../assets/images/FavouriteThree.jpg';
import HeartHome from '../assets/svg/HeartHome.svg';
import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Nav special
import BNServices from '../assets/svg/BNServices.svg';
import BNHome from '../assets/svg/BNHome.svg';
import BNLoan from '../assets/svg/BNLoan.svg';

import BNHomeIcon from '../assets/svg/BNHomeIcon.svg';
import BNEnquiryIcon from '../assets/svg/BNEnquiryIcon.svg';

import {useSelector, useDispatch} from 'react-redux';
import {propertyGetData} from '../redux/Store';

const Favourite = ({navigation}) => {
  const [data, setData] = useState([]);
  const [wishlistdata, setWishlistData] = useState([]);
  const [Id, setid] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
    // navigation.navigate('Favourite');
  }, []);

  const getData = async () => {
    const UserId = await AsyncStorage.getItem('UserId');
    await axios
      .get('https://inhouse.hirectjob.in/api/user/wishlist/' + UserId)
      .then(res => {
        console.log(' Fav Response:======>', res.data.wishlist);
        setWishlistData(res.data.wishlist);
        setData(res.data.properties.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const Delete = async getId => {
    console.log('ew id===>', getId);
    await axios
      .delete('https://inhouse.hirectjob.in/api/user/remove-wishlist/' + getId)
      .then(res => {
        const message = res.data.message;
        getData();
        Alert.alert('Removed successfully');
      })
      .catch(error => {
        console.log('Error occurred:', error);
      });
  };

  const selectedList = itemId => {
    let wishData = [...wishlistdata];
    const selectedIndex = wishData.find(item => item.property_id === itemId);
    console.log('selecte item ---->', selectedIndex);
    setid(selectedIndex.id);
    Delete(selectedIndex.id);
  };
  console.log('selecte iddd ---->', Id);

  const renderItem = ({item}) => (
    <View style={{marginVertical: 10}}>
      <View style={styles.textContainerDetail}>
        <View style={styles.containerImageCard}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              selectedList(item.id);
            }}>
            <HeartHome />
            {/* <Image
              source={require('../assets/images/Dislike.png')}
              style={styles.LikeImage}
            /> */}
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://inhouse.hirectjob.in/' + item.thumbnail_image,
            }}
            style={styles.imageImageCard}
          />
          <View style={styles.bottomContainerImageCard}>
            <TouchableOpacity style={{width: wp('60%')}}>
              <Text
                style={[
                  styles.textImageCardTitle,
                  {
                    overflow: 'hidden',

                    color: '#001D4C',
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.title}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Location height={hp('3.5%')} width={wp('4%')} />
                <Text
                  style={[
                    styles.textImageCardTitle,
                    {fontFamily: FONT.REGULAR, fontSize: FONT_SIZE.F_14},
                    {overflow: 'hidden'},
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.address}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#001D4C',
                  fontFamily: FONT.REGULAR,
                  fontSize: FONT_SIZE.F_13,
                  bottom: hp('-0.2%'),
                }}>
                $
              </Text>
              <Text
                style={{
                  color: '#001D4C',
                  fontFamily: FONT.SEMI_BOLD,
                  fontSize: FONT_SIZE.F_18,
                  marginLeft: hp('0.5%'),
                }}>
                {item.price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

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
              }}
              style={styles.headerButtonForm}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainerDetail}>
            <Text style={styles.headerTextDetail}>Favorite</Text>
          </View>
          <TouchableOpacity>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainerDetail}>
          <ScrollView
            style={styles.innerContainerDetail}
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
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
            activeOpacity={1.6}
            style={[styles.bottomNavIconAndTextContainer]}
            onPress={() => {
              navigation.navigate('Services');
            }}>
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

          <View
            activeOpacity={1.6}
            style={styles.bottomNavIconAndTextContainer}
            onPress={() => {
              navigation.navigate('Form');
            }}>
            <BNEnquiryIcon height={hp('3.5%')} width={wp('9.5%')} />
            <Text style={styles.textOfBottomNavBNB}>Enquiry</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Favourite;

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
    marginBottom: hp('0.5%'),
    // backgroundColor: 'red',
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
    marginBottom: hp('15%'),
  },
  textContainerDetail: {
    flex: 1,
    marginTop: hp('2%'),
  },
  containerImageCard: {
    height: hp('35%'),
    backgroundColor: '#FFFFFF',
    borderRadius: hp('2%'),
    overflow: 'hidden',
  },
  imageImageCard: {
    width: wp('90%'),
    height: hp('27%'),
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
  textImageCardTitle: {
    fontSize: FONT_SIZE.F_15,
    color: '#021128',
    fontFamily: FONT.BOLD,
    margin: hp('0.1%'),
  },
  favoriteButton: {
    position: 'absolute',
    top: hp('2%'),
    right: hp('2%'),
    zIndex: 1,
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
  LikeImage: {
    width: wp('11%'),
    height: hp('11%'),
    resizeMode: 'contain',
    marginTop: hp('-2.5%'),
  },
});
