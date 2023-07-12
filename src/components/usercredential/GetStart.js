import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GetStartBackground from '../../assets/images/GetStartBackground.jpg';
import GetStartLogo from '../../assets/svg/GetStartLogo.svg';
import GetStartButtonBGI from '../../assets/svg/GetStartButtonBGI.svg';
import {FONT} from '../../config/Globles';

const GetStart = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainerGetStart}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={GetStartBackground}
        style={styles.backgroundImageGetStart}>
        <View style={styles.containerGetStart}>
          <View style={styles.LogoContainerGetStart}>
            <GetStartLogo width={wp('40%')} height={hp('23%')} />
          </View>

          <View style={styles.contentContainerGetStart}>
            <View style={styles.titleAndSubTitleContainer}>
              <View>
                <Text style={styles.titleTextGetStart}>
                  IN HOUSE PROPERTY SOLUTIONS
                </Text>
              </View>
              <View>
                <Text style={styles.descriptionTextGetStart}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard since the 1500s.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonContainerGetStart}
              onPress={() => navigation.navigate('States')}>
              <Text style={styles.buttonTextGetStart}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default GetStart;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContainerGetStart: {
    flexGrow: 1,
    width,
    height,
  },
  containerGetStart: {
    flex: 1,
  },
  backgroundImageGetStart: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainerGetStart: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp('8%'),
    marginHorizontal: wp('8%'),
  },
  titleAndSubTitleContainer: {
    // backgroundColor: 'red',
  },
  titleTextGetStart: {
    color: '#FFFFFF',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  descriptionContainerGetStart: {
    alignItems: 'flex-start',
    marginBottom: hp('1%'),
    width: '100%',
    marginLeft: hp('8%'),
  },
  descriptionTextGetStart: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    textAlign: 'justify',
    fontFamily: FONT.REGULAR,
    color: '#FFFFFF',
  },
  buttonContainerGetStart: {
    backgroundColor: '#F49825',
    width: wp('80%'),
    height: hp('7.5%'),
    marginTop: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    // position: 'absolute',
    // bottom: hp('4%'),
  },
  buttonBackgroundGetStart: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  buttonTextGetStart: {
    color: '#FFFFFF',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  LogoContainerGetStart: {
    position: 'absolute',
    top: hp('8%'),
    right: wp('30%'),
  },
});
