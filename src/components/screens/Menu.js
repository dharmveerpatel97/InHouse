import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Location from '../../assets/images/location.png';
import Radio from '../../assets/images/Radio.png';
import Globles, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector, useDispatch} from 'react-redux';
import {ProfileGet} from '../../redux/Store';

const Profile = ({navigation}) => {
  // Get API For Profile
  const dispatch = useDispatch();
  const ProfileData = useSelector(state => state.profileGetStatus);

  useEffect(() => {
    dispatch(ProfileGet());
  }, [dispatch]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [apiProfile, setApiProfile] = useState(false);

  useEffect(() => {
    dispatch(ProfileGet())
      .then(() => {
        setLoadingProfile(false);
        setApiProfile(true);
      })
      .catch(() => {
        setLoadingProfile(false);
        setApiProfile(false);
      });
  }, [dispatch]);

  if (loadingProfile) {
    console.log('Loading....');
  } else {
    console.log('-----------------------------------', ProfileData);
  }
  const logout = async () => {
    let remember_me =  await AsyncStorage.getItem('remember_me');
    let email =  await AsyncStorage.getItem('email');
    let password =  await await AsyncStorage.getItem('password');
    let userLoginStatus =  await await AsyncStorage.getItem('userLoginStatus');

    console.log('remember_me',remember_me)
    console.log('userLoginStatus',userLoginStatus)
    console.log('email',email)
    console.log('password',password)

    await AsyncStorage.clear();
    if(remember_me=='yes'){
      await AsyncStorage.setItem('remember_me','yes');
      AsyncStorage.setItem('password', password);
      AsyncStorage.setItem('email', email);
    }
    setTimeout(() => {
      navigation.navigate('Login');
    }, 400);
    
  };

  return (
    <View style={{flex: 1, backgroundColor: '#001D4C'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginHorizontal: wp('4.5%')}}>
          {/* --------- profile View ---- */}

          {loadingProfile ? (
            <View>
              <ActivityIndicator></ActivityIndicator>
            </View>
          ) : (
            <View style={styles.ProfileView}>
              <Image
                source={{
                  uri: `https://inhouse.hirectjob.in/public/${ProfileData.user[0].image}`,
                }}
                style={styles.Profimages}
              />

              <View style={styles.PofText}>
                <Text
                  style={{
                    fontSize: wp('4.5%'),
                    fontFamily: 'bold',
                    color: 'orange',
                  }}>
                  {ProfileData.user[0].name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Location} style={styles.images} />
                  <Text
                    style={{
                      fontSize: wp('4%'),
                      fontFamily: '500',
                      color: 'white',
                      marginLeft: wp('1%'),
                    }}>
                    {ProfileData.user[0].address}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* --------- profile View ---- */}
          <ScrollView
            // contentContainerStyle={styles.scrollViewContent}
            style={{flexGrow: 1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={[styles.ViewSett, {marginTop: hp('10%')}]}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Profie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Messages');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ViewSett}
              onPress={() => {
                navigation.navigate('Favourite');
              }}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoanType');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Loan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Services');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Property');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Property</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Form');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Property Form</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MessageForm');
              }}
              style={styles.ViewSett}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Message Form</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                logout();
              }}
              style={[styles.ViewSett, {marginBottom: hp('20%')}]}>
              <Image source={Radio} style={styles.IconStyle} />
              <Text style={styles.TextStyle}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  ProfileView: {
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Profimages: {
    alignSelf: 'center',
    height: hp('12.4%'),
    width: hp('12.4%'),
    borderRadius: hp('6.25%'),
    resizeMode: 'cover',
    transform: [{scale: 1.1}],
  },

  Editimages: {
    height: hp('17%'),
    width: wp('17%'),
    resizeMode: 'contain',
  },
  editView: {
    position: 'absolute',
    top: hp('5%'),
    left: hp('2%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PofText: {
    marginTop: hp('4%'),
    width: wp('60%'),
    // backgroundColor:'yellow',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  images: {
    height: hp('4%'),
    width: wp('4%'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  IconStyle: {
    height: hp('8%'),
    width: wp('12%'),
    resizeMode: 'contain',
  },
  TextStyle: {
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    color: 'white',
    marginLeft: wp('3%'),
  },
  ViewSett: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    // marginBottom: hp('20%'),
    // marginTop: hp('2%'),
    flexGrow: 1,
  },
});
