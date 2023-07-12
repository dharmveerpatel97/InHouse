import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';

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
import Store, {stateApiGet} from '../../redux/Store';
import {useNavigation} from '@react-navigation/native';

const States = ({navigation}) => {
  const dispatch = useDispatch();
  const apiData = useSelector(state => state.stateApiGetStatus);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(stateApiGet())
      .then(res => {
        // console.log('Response:======>', res);
        setData(res.state);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error:', error);
        setLoading(false);
      });
  };

  console.log('----------------+++++++++++', data.state);

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
            padding: hp('3%'),
          }}>
          {/* Title Text */}
          <View>
            <View style={styles.titleOuterTextContainer}>
              <Text style={styles.titleTextOne}>You are looking to buy in</Text>
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
                placeholderTextColor={'gray'}
                style={styles.searchInput}
                // value={searchText}
                // onChangeText={text => {
                //   setSearchText({searchText: text});
                // }}
              />
            </View>
          </View>

          {/* Cards */}
          <View
            style={{
              // backgroundColor: 'red',
              height: hp('54%'),
            }}>
            {data ? (
              <FlatList
                data={data.slice(27, 33)}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                renderItem={({item}) => (
                  <View style={styles.cardSpaceContainer}>
                    <View style={styles.cardContainer}>
                      <View style={styles.card}>
                        <TouchableOpacity
                          style={styles.cardImageContainer}
                          onPress={() => {
                            dispatch({type: 'SET_ITEM_ID', itemId: item.id});
                            navigation.navigate('Places', {itemId: item.id});
                          }}>
                          <View style={styles.cardImage}>
                            <Image
                              source={{
                                uri:
                                  'https://inhouse.hirectjob.in/' + item.image,
                              }}
                              style={{
                                width: wp('6%'),
                                height: hp('6%'),
                              }}></Image>
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.cardText}>{item.state_name}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            ) : (
              <ActivityIndicator size="large" color="blue" />
            )}
          </View>
        </View>
      </ImageBackground>

      {/* Bottom Navigation Button */}

      <TouchableOpacity
        style={styles.bottomButtonTouchOpacity}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default States;

const styles = StyleSheet.create({
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },

  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  //  ========== MAIN CONTAIN =======
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
    textAlign: 'center',
  },

  cardContainerMain: {
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
  },
  cardSpaceContainer: {
    // backgroundColor: 'pink',
    width: wp('28%'),
    marginRight: wp('2%'),
    marginVertical: hp('1.5%'),
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
  bottomButtonTouchOpacity: {
    backgroundColor: '#F49825',
    width: wp('80%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    position: 'absolute',
    bottom: hp('4%'),
    alignSelf: 'center',
  },
  bottomButtonText: {
    fontFamily: FONT.SEMI_BOLD,
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_17,
  },
});
