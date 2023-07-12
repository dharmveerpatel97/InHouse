import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Globals, {COLOR, FONT, FONT_SIZE} from '../../config/Globles';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';

import Mail from '../../assets/svg/Mail.svg';
import Password from '../../assets/svg/Password.svg';
import ShowEye from '../../assets/svg/ShowEye.svg';
import HideEye from '../../assets/svg/HideEye.svg';
import FaceBook from '../../assets/svg/FaceBook.svg';
import Google from '../../assets/svg/Google.svg';
import Store from '../../redux/Store';

import {loginPostData} from '../../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation, route}) => {
  // Show And Hide Password
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [verification, setverification] = useState(false);
  const UserData = '';

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // ----- remember start ----------
  

  const handleToggle = () => {
    setverification(!verification);
    console.log('onclick---', verification);
  };
  useEffect(()=>{
    showLoginDetails()
  },[])

  const showLoginDetails = async () => {
    let email_remember = await AsyncStorage.getItem('email');
    let password_remember = await AsyncStorage.getItem('password');
    let remember_me = await AsyncStorage.getItem('remember_me');
    console.log('email_remember', email_remember)
    console.log('password_remember', password_remember)
    if (remember_me == 'yes') {
      setRememberMe(true)
      setEmail(email_remember)
      setPassword(password_remember)
    } 
}

  const handleLogin = () => {
    dispatch(loginPostData(email, password))
      .then(response => {
        setEmail('');
        Alert.alert(`SignIn Successfully`);
        const UserData = response.user;
        const UserId = response.user.id;
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('userLoginStatus', 'yes');
        if(rememberMe){
          AsyncStorage.setItem('remember_me', 'yes');
        }else{
          AsyncStorage.setItem('remember_me', 'no');
        }
        navigation.navigate('States', {userData: response.user});
        setPassword('');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
        // Alert.alert('Enter Correct Data');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Login</Text>
              <Text style={styles.subheadingText}>
                Lorem Ipsum is simply dummy text of the printing and
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Mail height={hp('5%')} width={wp('5%')} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              </View>

              <View style={[styles.inputWrapper, {marginVertical: hp('3%')}]}>
                <Password height={hp('5%')} width={wp('5%')} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <HideEye height={hp('5%')} width={wp('5.5%')} />
                  ) : (
                    <ShowEye height={hp('5%')} width={wp('5.5%')} />
                  )}
                </TouchableOpacity>
              </View>

              {/* -------------- Remember me ---------- */}
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  width: '99%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    setRememberMe(!rememberMe)
                  }}>
                  {rememberMe ? (
                    <Image
                      source={require('../../assets/images/check-box.png')}
                      style={styles.RadioBtn}></Image>
                  ) : (
                    <Image
                      source={require('../../assets/images/uncheck-box.png')}
                      style={styles.RadioBtn}></Image>
                  )}
                  <Text
                    style={[styles.forgotPasswordText, {marginLeft: wp('2%')}]}>
                    Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ForgetPassword');
                  }}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <View style={styles.loginWithContainer}>
                <Text style={styles.loginWithText}>Login account with</Text>
              </View>

              <View style={styles.socialIconsContainer}>
                <TouchableOpacity style={styles.iconWrapper}>
                  <Google height={hp('9%')} width={wp('14%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                  <FaceBook height={hp('9%')} width={wp('14%')} />
                </TouchableOpacity>
              </View> */}

              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>
                  Want to create an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}>
                  <Text style={styles.signUpText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

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
    marginTop: hp('11%'),
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
    marginBottom: hp('2%'),
    marginTop: hp('5%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: hp('0.1%'),
    borderColor: '#001D4C',
    borderRadius: hp('1%'),
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
  },
  input: {
    flex: 1,
    marginLeft: wp('2%'),
    color: '#000000',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
  },
  RadioBtn: {
    alignSelf: 'center',
    height: hp('6.5%'),
    width: wp('6.5%'),
    resizeMode: 'contain',
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
  loginWithContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
  },
  loginWithText: {
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
  },

  createAccountText: {
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
    marginRight: hp('0.5%'),
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },

  signUpText: {
    color: '#8647F3',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_15,
  },
  iconWrapper: {
    marginHorizontal: wp('2.5%'),
  },
});
