import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Globles, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import PlacesBGI from '../../assets/images/PlacesBGI.jpg';
import Search from '../../assets/svg/Search.svg';
import Mumbai from '../../assets/svg/Mumbai.svg';
import Bangalore from '../../assets/svg/Bangalore.svg';
import NewDelhi from '../../assets/svg/NewDelhi.svg';
import Noida from '../../assets/svg/Noida.svg';
import Kolkata from '../../assets/svg/Kolkata.svg';
import Chennai from '../../assets/svg/Chennai.svg';
import ButtonBGI from '../../assets/svg/ButtonBGI.svg';

import {useSelector, useDispatch} from 'react-redux';
import {citysetItemId} from '../../redux/Store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Places = ({navigation, route}) => {
  console.log('routebbv===', route.params.itemId);
  const getId = route.params.itemId;

  const dispatch = useDispatch();
  const apiData = useSelector(state => state.itemId);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  //  -----------  select City  function ---
  const [cityname, setCityname] = useState('');
  const SelectCity = text => {
    setCityname(text);
    navigation.navigate('Home');
  };
  console.log('hllo', cityname);

  const fetchData = async () => {
    // dispatch(citysetItemId())
    await axios
      .post('https://inhouse.hirectjob.in/api/city?state.id=' + getId)
      .then(res => {
        console.log('Response:======>1213', res.data.state);
        setData(res.data.state);
        setLoading(false);
        const Citydetail = ''; // Define Citydetail variable
        AsyncStorage.setItem(Citydetail, JSON.stringify(res.data.state))
          .then(() => {
            console.log('Data stored successfully.');
            setLoading(false);
          })
          .catch(error => {
            console.log('Error storing data: ', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log('Error:', error);
        setLoading(false);
      });
  };

  // console.log('----------------+++++++++++', apiData);

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImageSplash}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            marginTop: hp('10%'),
            borderTopLeftRadius: hp('4%'),
            borderTopRightRadius: hp('4%'),
          }}>
          <View style={{margin: hp('3%')}}>
            {/* Title Text */}
            <View>
              <View style={styles.titleOuterTextContainer}>
                <Text style={styles.titleTextOne}>
                  You are looking to buy in
                </Text>
                <Text style={styles.titleTextTwo}>
                  Protect up to 10 devices with all features
                </Text>
              </View>
            </View>
            {/* Search */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputFieldContainer}>
                <Search height={hp('6%')} width={hp('2.5%')} />
                <TextInput
                  placeholder="Search place, home, cozy ..."
                  style={styles.searchInput}
                />
              </View>
            </View>
            {/* Cards */}
            <View
              style={{
                // backgroundColor: 'red',
                height: hp('54%'),
              }}>
              <ScrollView
                style={styles.cardContainerMain}
                showsVerticalScrollIndicator={false}>
                <View style={styles.cardSpaceContainer}>
                  <View style={styles.cardContainer}>
                    {data ? (
                      <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                          <View style={styles.card}>
                            <TouchableOpacity
                              style={styles.cardImageContainer}
                              onPress={() => {
                                SelectCity(item.name);
                              }}>
                              <View style={styles.cardImage}>
                                <Image
                                  source={{
                                    uri:
                                      'https://inhouse.hirectjob.in/' +
                                      item.image,
                                  }}
                                  style={{
                                    width: wp('6%'),
                                    height: hp('6%'),
                                  }}></Image>
                              </View>
                            </TouchableOpacity>
                            <Text style={styles.cardText}>{item.name}</Text>
                          </View>
                        )}
                      />
                    ) : (
                      <ActivityIndicator size="large" color="blue" />
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Bottom Navigation Button */}
      <View style={styles.bottomNavButtonContainer}>
        <TouchableOpacity
          style={styles.bottomButtonTouchOpacity}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.bottomButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Places;

const styles = StyleSheet.create({
  backgroundImageSplash: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  containerSplash: {
    height: hp('100%'),
  },
  // backgroundImageSplash: {
  //   flex: 1,
  // },
  mainContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: hp('8%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
    height: hp('95%'),
  },
  internalMainContainer: {
    margin: hp('2.5%'),
  },
  titleOuterTextContainer: {
    marginTop: hp('4.5%'),
  },

  titleTextOne: {
    color: '#001D4C',
    fontSize: FONT_SIZE.F_18,
    fontFamily: FONT.BOLD,
  },
  titleTextTwo: {
    fontFamily: FONT.MEDIUM,
    color: '#001D4C',
    marginTop: hp('1%'),
    fontSize: FONT_SIZE.F_14,
  },
  searchContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: hp('2%'),
    marginTop: hp('2.5%'),
  },
  searchInputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('3%'),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontFamily: FONT.MEDIUM,
    fontSize: FONT_SIZE.F_13,
    paddingVertical: hp('1%'),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.2%'),
    marginBottom: hp('1%'),
  },
  card: {
    flex: 1,
    alignItems: 'center',
  },
  cardImageContainer: {
    borderRadius: hp('2%'),
    borderColor: 'red ',
    borderWidth: hp('0.1%'),
  },
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('0.5%'),
    height: hp('5.5%'),
    width: hp('5.5%'),
  },
  cardText: {
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
    fontFamily: FONT.MEDIUM,
    color: '#001D4C',
  },

  cardContainerMain: {
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
  },
  cardSpaceContainer: {
    marginTop: hp('1.5%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },

  //bottom button styling
  bottomNavigation: {
    bottom: 10,
  },
  bottomNavigationButton: {
    backgroundColor: '#FF0000',
    borderRadius: hp('2%'),
    paddingVertical: hp('2%'),
    marginBottom: hp('1%'),
  },
  bottomNavigationButtonText: {
    color: '#FFFFFF',
    fontSize: hp('2.5%'),
    fontFamily: FONT.SEMI_BOLD,
    color: '#FFFFFF',
    fontSize: hp('3%'),
    fontFamily: FONT.SEMI_BOLD,
  },

  //--------------------------button nav bottom
  bottomNavButtonContainer: {
    position: 'absolute',
    bottom: hp('4%'),
    flex: 0,
    width: wp('100%'),
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
});
