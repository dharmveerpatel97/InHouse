import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Globals, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';

import MailIcon from '../../assets/svg/Mail.svg';

const ForgetPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Forgot Password?</Text>
              <Text style={styles.subheadingText}>
                Lorem Ipsum is simply dummy text of the printing and
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <MailIcon height={hp('5%')} width={wp('5%')} />
                <TextInput
                  style={styles.input}
                  placeholder="rv6504064@gmail.com"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('OTP')}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('10%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainer: {
    margin: hp('3%'),
    flex: 1,
    marginBottom: hp('0.5%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
    marginTop: hp('15%'),
  },
  headingContainer: {
    marginBottom: hp('2%'),
  },
  headingText: {
    color: '#001D4C',
    fontFamily: FONT.BOLD,
    fontSize: FONT_SIZE.F_20,
    marginBottom: hp('1%'),
  },
  subheadingText: {
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
  },
  inputContainer: {
    marginBottom: hp('4%'),
    marginTop: hp('4%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: hp('0.1%'),
    borderColor: '#001D4C',
    borderRadius: hp('1%'),
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginBottom: hp('3%'),
  },
  input: {
    flex: 1,
    marginLeft: wp('2%'),
    color: '#000000',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_15,
  },

  loginButton: {
    backgroundColor: '#F49825',
    width: wp('88%'),
    height: hp('7.5%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_20,
    fontWeight: 'bold',
  },
});
