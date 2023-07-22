import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  
  import LeftArrowSearch from '../assets/svg/LeftArrowSearch.svg';
  import SearchIcon from '../assets/svg/SearchIcon.svg';
  import FilterSearch from '../assets/svg/FilterSearch.svg';
  import MapSearch from '../assets/svg/MapSearch.svg';
  import CurrentLocation from '../assets/svg/CurrentLocation.svg';
  
  import SearchBGI from '../assets/images/SearchBGI.jpg';
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
  import {FONT, FONT_SIZE, COLOR} from '../config/Globles';
  
  const Search = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={styles.scrollView}>
          {/* Header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{navigation.goBack('')}}>
              <LeftArrowSearch height={hp('3%')} width={wp('5%')} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.headerText}>Search</Text>
            </View>
          </View>
  
          {/* Search TextInput */}
          <View style={styles.searchInputContainer}>
            <View style={styles.searchInput}>
              <View style={{width: wp('50%')}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search place, home, cozy ..."
                  placeholderTextColor={COLOR.LIGHT_GRAY}
                />
              </View>
              <TouchableOpacity style={{marginLeft: hp('5%')}}>
                <SearchIcon height={hp('3%')} width={wp('4.5%')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <FilterSearch height={hp('7%')} width={wp('11%')} />
            </TouchableOpacity>
          </View>
          {/* Search results */}
          <View style={styles.searchResultsContainer}>
            <View style={styles.searchResultsText}>
              <Text style={styles.resultsText}>Search results for : </Text>
              <Text style={styles.keywordText}>DI Yogyakarta</Text>
            </View>
            <TouchableOpacity>
              <MapSearch
                style={styles.mapIcon}
                height={hp('3%')}
                width={wp('6%')}
              />
            </TouchableOpacity>
          </View>
          {/* Map */}
          <View style={styles.mapContainer}>
            <Image source={SearchBGI} style={styles.mapImage} />
            <TouchableOpacity style={styles.currentLocationContainer}>
              <CurrentLocation style={styles.currentLocationIcon} />
            </TouchableOpacity>
          </View>
          {/* Current Location */}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      justifyContent: 'center', // Center the content vertically
      margin: hp('2%'),
      marginTop: hp('3.5%'),
    },
  
    headerText: {
      color: '#343E42',
      fontFamily: FONT.BOLD,
      fontSize: FONT_SIZE.F_17,
      flex: 1, // Added flex property to expand and center the text
      textAlign: 'center', // Center the text horizontally
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: hp('1.5%'),
      padding: wp('2%'),
    },
    searchInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInput: {
      marginLeft: wp('2%'),
      color:COLOR.BLACK
    },
    searchResultsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp('2%'),
      padding: wp('2%'),
    },
    searchResultsText: {
      flexDirection: 'row',
      alignItems: 'center',
      color:COLOR.LIGHT_GRAY
    },
    resultsText: {
      color: '#343E42',
      fontFamily: FONT.MEDIUM,
      fontSize: FONT_SIZE.F_14,
    },
    keywordText: {
      color: '#0F64EE',
      fontFamily: FONT.BOLD,
      fontSize: FONT_SIZE.F_15,
      marginLeft: wp('1%'),
    },
    mapIcon: {
      marginRight: wp('2%'),
    },
    mapContainer: {
      flex: 1,
      // backgroundColor: 'red',
      marginTop: hp('2%'),
      position: 'relative',
    },
    mapImage: {
      height: hp('77%'),
      width: '100%',
    },
    currentLocationContainer: {
      position: 'absolute',
      bottom: hp('2%'), // Adjust the desired distance from the bottom
      left: wp('3%'),
    },
    currentLocationIcon: {
      width: wp('8%'),
      height: hp('8%'),
    },
  });
  
  export default Search;
  