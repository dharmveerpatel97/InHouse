import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Filter from '../../assets/svg/Filter.svg';

import Globles, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';
import Location from '../../assets/svg/Location.svg';
import FavouriteOne from '../../assets/images/FavouriteOne.jpg';
import FavouriteTwo from '../../assets/images/FavouriteTwo.jpg';
import FavouriteThree from '../../assets/images/FavouriteThree.jpg';
import HeartHome from '../../assets/svg/HeartHome.svg';
import ServicesIcon from '../../assets/svg/ServicesIcon.svg';
import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Property = ({navigation, route}) => {
  const {selectedFilters} = route?.params;
  console.log('====================================', route.params);
  const [data, setData] = useState([]);
  const [PropertyData, setPropertyData] = useState([]);
  const [likeStatus, setlikeStatus] = useState('disable');
  const [propertyId, setPropertyId] = useState('');

  useEffect(() => {
    filterData(selectedFilters)
  }, []);

  const filterData = async (filters) => {
    try {
      const response = await axios.get(
        'https://inhouse.hirectjob.in/api/properties',
      );
      const allData = response.data.properties.data;
      console.log('allData:', allData);

      if(filters){
        const filteredData1 = allData.filter(i =>
          Object.entries(filters).every(([k, v]) => {
            if(k==='price'){
              if((Number(i[k]) <= Number(v))){
                return true;
              }
            }else if(k==='totalRating'){
              if(Number(i[k]) >= Number(v)){
                console.log('total rating true')
                return 
              }
            }else if(i[k] === v){
              return true;
            }else{
              return false;
            }
          })
        )
        console.log('filteredData1:', filteredData1);
        setData(filteredData1);
      }else{
        setData(allData);
      }
      
    } catch (error) {
      console.log('Error:', error);
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
              }}
              style={styles.headerButtonForm}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainerDetail}>
            <Text style={styles.headerTextDetail}>Property</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('BuyFliter')}>
            <Filter height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerDetail}>
          <ScrollView
            style={styles.innerContainerDetail}
            showsVerticalScrollIndicator={false}>
            {/* --------- flatlist ----- */}
            {data ? (
              <FlatList
                data={data}
                keyExtractor={item => 'flatlist'+item.id.toString()}
                renderItem={({item}) => (
                  <View style={{marginVertical: 10}}>
                    <View style={styles.textContainerDetail}>
                      <View style={styles.containerImageCard}>
                        <TouchableOpacity
                          style={styles.favoriteButton}
                          onPress={() => {
                            setlikeStatus(!likeStatus);
                            handleLike(item.id);
                          }}>
                          {item.status === 'enable' ? (
                            <Image
                              source={require('../../assets/images/Dislike.png')}
                              style={styles.LikeImage}
                            />
                          ) : (
                            <HeartHome />
                          )}
                        </TouchableOpacity>

                        {/* ---------- background Image -------- */}
                        <Image
                          source={{
                            uri:
                              'https://inhouse.hirectjob.in/' +
                              item.thumbnail_image,
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
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Location height={hp('3.5%')} width={wp('4%')} />
                              <Text
                                style={[
                                  styles.textImageCardTitle,
                                  {
                                    fontFamily: FONT.REGULAR,
                                    fontSize: FONT_SIZE.F_14,
                                  },
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
                )}
              />
            ) : (
              <ActivityIndicator size="large" color="blue" />
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Property;

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
    alignSelf: 'center',
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

  LikeImage: {
    width: wp('11%'),
    height: hp('11%'),
    resizeMode: 'contain',
    marginTop: hp('-2.5%'),
  },
});
