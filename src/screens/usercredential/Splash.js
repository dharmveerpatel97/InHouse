import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import SplashBackground from '../../assets/images/SplashBackground.jpg';
import SplashIcon from '../../assets/svg/SplashIcon.svg';
import { useDispatch } from 'react-redux';
import { loginPostData } from '../../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkAutoLoginData()
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation]);
  const dispatch = useDispatch();
  const checkAutoLoginData =async () => {
      let email =  await AsyncStorage.getItem('email');
      let password =  await await AsyncStorage.getItem('password');
      let userLoginStatus =  await await AsyncStorage.getItem('userLoginStatus');
      if(userLoginStatus=='yes'){
        dispatch(loginPostData(email, password))
        .then(response => {
          navigation.navigate('Home')
        }).catch((error) => {
          navigation.navigate('Login')
        })
      }else{
        navigation.navigate('Login')
      }
  }




  return (
    <View style={styles.containerSplash}>
      <ImageBackground
        source={SplashBackground}
        style={styles.backgroundImageSplash}>
        <TouchableOpacity
          View
          style={styles.svgWrapperSplash}
          onPress={() => navigation.navigate('Login')}>
          <SplashIcon height={hp('50%')} width={wp('50%')} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSplash: {
    flex: 1,
  },
  backgroundImageSplash: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgWrapperSplash: {
    width: wp('50%'),
    height: hp('50%'),
  },
});

export default Splash;
