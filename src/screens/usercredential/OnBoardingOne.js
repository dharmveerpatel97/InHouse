import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OnBoardingOneBGI from '../../assets/images/OnBoardingOneBGI.jpg';
import Skip from '../../assets/svg/Skip.svg';
import RectangleBackgroundButton from '../../assets/svg/RectangleBackgroundButton.svg';
import OnBoardingOneText from '../../assets/svg/OnBoardingOneText.svg';

const OnBoardingOne = ({navigation}) => {
  return (
    <View style={styles.containerOnBoardingOne}>
      <ImageBackground
        source={OnBoardingOneBGI}
        style={styles.backgroundImageOnBoardingOne}>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Skip width={wp('15%')} height={hp('10%')} />
        </TouchableOpacity>

        <View style={{marginTop: hp('65%')}}>
          <OnBoardingOneText width={wp('100%')} height={hp('17%')} />
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('OnBoardingTwo')}>
            <View style={styles.buttonTextContainer}>
              <RectangleBackgroundButton
                style={styles.buttonBackground}
                width={wp('90%')}
                height={hp('10%')}
              />
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerOnBoardingOne: {
    flex: 1,
  },
  backgroundImageOnBoardingOne: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: hp('-90%'),
  },
  buttonContainer: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  buttonBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#000000',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  skipContainer: {
    position: 'absolute',
    top: hp('3%'),
    right: wp('3%'),
  },
});

export default OnBoardingOne;
