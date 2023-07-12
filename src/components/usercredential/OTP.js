import React, {useState, useRef} from 'react';
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

const OTP = ({navigation}) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    setOTP(updatedOTP);
  };

  const handleOTPKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>OTP</Text>
              <Text style={styles.subheadingText}>
                Lorem Ipsum is simply dummy text of the printing and
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.input}
                    value={digit}
                    onChangeText={value => handleOTPChange(index, value)}
                    onKeyPress={({nativeEvent}) =>
                      handleOTPKeyPress(index, nativeEvent.key)
                    }
                    ref={ref => (inputRefs.current[index] = ref)}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('SetNewPassword')}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OTP;

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
    marginTop: hp('10%'),
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
    marginTop: hp('9%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('5%'),
  },
  input: {
    width: wp('12%'),
    height: wp('12%'),
    borderWidth: 1,
    borderColor: '#001D4C',
    borderRadius: wp('1%'),
    color: '#000000',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_20,
    textAlign: 'center',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#F49825',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
  },
  loginButton: {
    backgroundColor: '#F49825',
    width: wp('88%'),
    height: hp('7.5%'),
    marginTop: hp('4%'),
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
