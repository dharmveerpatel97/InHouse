import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';

import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';

import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import DetailFrameOne from '../assets/images/DetailFrameOne.jpg';
import Location from '../assets/svg/Location.svg';
import BedDetail from '../assets/svg/BedDetail.svg';
import BathDetail from '../assets/svg/BathDetail.svg';
import WifiBath from '../assets/svg/WifiBath.svg';
import CallDetail from '../assets/svg/CallDetail.svg';
import ChatDetail from '../assets/svg/ChatDetail.svg';
import ProfileDetail from '../assets/images/ProfileDetail.jpg';
import MapRectangle from '../assets/images/MapRectangle.jpg';
import GalleryOne from '../assets/svg/GalleryOne.svg';
import GalleryTwo from '../assets/svg/GalleryTwo.svg';
import GalleryThree from '../assets/svg/GalleryThree.svg';
import GalleryFour from '../assets/svg/GalleryFour.svg';
import Globles, {COLOR, FONT, FONT_SIZE} from '../config/Globles';

const Detail = ({navigation}) => {
  return (
    <View style={styles.containerDetail}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageSplashDetail}>
        <View style={styles.headerContainerDetail}>
          <View style={styles.headerContentDetail}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
            <View style={styles.headerTextContainerDetail}>
              <Text style={styles.headerTextDetail}>Detail</Text>
            </View>
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
              <View style={styles.containerImageCard}>
                <Image source={DetailFrameOne} style={styles.imageImageCard} />

                <View style={styles.bottomContainerImageCard}>
                  <View style={{width: wp('60%')}}>
                    <Text
                      style={[
                        styles.textImageCardTitle,
                        {
                          overflow: 'hidden',
                          textOverflow: 'clip',
                          color: '#001D4C',
                        },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      To-Let ( 1 single room )
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Location height={hp('4%')} width={wp('4.5%')} />
                      <Text
                        style={[
                          styles.textImageCardTitle,
                          {fontFamily: FONT.REGULAR},
                          {overflow: 'hidden', textOverflow: 'clip'},
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        Kolabagan & Panducharry
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: 'green',
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
                      9,000
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Speciality */}
            <View style={styles.specialityContainer}>
              <View style={styles.rowSpeciality}>
                <View style={styles.specialitysDetail}>
                  <BedDetail height={hp('2.5%')} width={wp('5.5%')} />
                  <Text style={styles.specialitysTextDetail}>Bed Room</Text>
                </View>
                <View style={styles.specialitysDetail}>
                  <BathDetail height={hp('2.5%')} width={wp('5.5%')} />
                  <Text style={styles.specialitysTextDetail}>Bath Room</Text>
                </View>
                <View style={styles.specialitysDetail}>
                  <WifiBath height={hp('2.5%')} width={wp('5.5%')} />
                  <Text style={styles.specialitysTextDetail}>Free Wi-Fi</Text>
                </View>
              </View>
            </View>
            {/* Profile Card */}
            <View style={styles.container}>
              <View style={styles.containerProfileCard}>
                <TouchableOpacity style={styles.profileImageContainer}>
                  <Image
                    source={ProfileDetail}
                    style={styles.profileImageProfileCard}
                  />
                </TouchableOpacity>

                <View>
                  <Text style={styles.labelTextProfileCard}>Owner</Text>
                  <Text style={styles.ownerNameProfileCard}>Jane Cooper</Text>
                </View>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <ChatDetail height={hp('6%')} width={wp('14%')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: hp('1%'), marginRight: hp('1.5%')}}>
                  <CallDetail height={hp('6%')} width={wp('14%')} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Map */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderRadius: hp('1%'),
                marginTop: hp('1%'),
                marginBottom: hp('1%'),
              }}>
              <Image
                source={MapRectangle}
                style={{flex: 1, borderRadius: hp('2%')}}
              />
            </View>

            {/* About */}
            <View
              style={{
                marginTop: hp('2%'),
                marginBottom: hp('2%'),
              }}>
              <View>
                <Text
                  style={{
                    color: '#021128',
                    fontFamily: FONT.SEMI_BOLD,
                    fontSize: FONT_SIZE.F_15,
                  }}>
                  About
                </Text>
              </View>
              <View
                style={{
                  marginTop: hp('0.7%'),
                }}>
                <Text
                  style={{
                    color: '#343E42',
                    fontFamily: FONT.MEDIUM,
                    fontSize: FONT_SIZE.F_14,
                  }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Justo, vitae ac venenatis vitae, turpis nec.
                </Text>
              </View>
            </View>

            {/* Gallery */}
            <View style={styles.containerGallery}>
              <View>
                <Text
                  style={{
                    color: '#021128',
                    fontFamily: FONT.SEMI_BOLD,
                    fontSize: FONT_SIZE.F_15,
                  }}>
                  Gallery
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.scrollViewContentGallery,
                  {
                    // backgroundColor: 'red',
                  },
                ]}>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryOne
                    height={hp('10%')}
                    width={wp('17%')}
                    style={styles.galleryPhotoCard}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryTwo height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryThree height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryFour height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryOne
                    height={hp('10%')}
                    width={wp('17%')}
                    style={styles.galleryPhotoCard}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryTwo height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryThree height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryItemGallery}>
                  <GalleryFour height={hp('10%')} width={wp('17%')} />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Detail;

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
  },
  textContainerDetail: {
    flex: 1,
  },
  textDetail: {
    color: 'yellow',
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
    fontFamily: FONT.REGULAR,
    margin: hp('0.1%'),
  },
  //Speciality Container
  specialityContainer: {
    flex: 1,
    marginTop: hp('2%'),
  },
  rowSpeciality: {
    flexDirection: 'row',
    // paddingHorizontal: hp('1.5%'),
  },
  specialitysDetail: {
    alignItems: 'center',
    padding: hp('2.2%'),
    backgroundColor: 'rgba(3, 31, 95, 0.1)',
    borderRadius: hp('3%'),
    justifyContent: 'center',
    margin: hp('0.5%'),
    paddingLeft: hp('1%'),
    paddingRight: hp('1%'),
  },
  specialitysTextDetail: {
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
    marginTop: hp('1%'),
    fontSize: FONT_SIZE.F_11,
  },

  //Profile card
  container: {
    margin: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
    backgroundColor: COLOR.WHITE,
    marginRight: 0,
    borderRadius: hp('1%'),
  },
  containerProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: hp('1.5%'),
    overflow: 'hidden',
  },
  profileImageProfileCard: {
    height: hp('8.5%'),
    width: hp('9%'),
    resizeMode: 'contain',
    borderRadius: hp('1%'),
  },
  labelTextProfileCard: {
    fontSize: hp('2%'),
    fontFamily: FONT.REGULAR,
    color: '#001D4C',
    marginBottom: hp('0.5%'),
  },
  ownerNameProfileCard: {
    fontSize: hp('1.8%'),
    fontFamily: FONT.SEMI_BOLD,
    color: '#001D4C',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //Gallery
  containerGallery: {
    flex: 1,
  },
  scrollViewContentGallery: {
    flexDirection: 'row',
  },
  galleryItemGallery: {
    marginRight: 10,
  },
  aboutGalleryImage: {
    flex: 1,
  },
  galleryPhotoCard: {
    borderRadius: hp('12%'),
    width: hp('2%'),
  },
});
