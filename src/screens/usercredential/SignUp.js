import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
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

//API Integration

import {signUpPostData} from '../../redux/Store';
import {useSelector, useDispatch} from 'react-redux';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePost = () => {
    dispatch(signUpPostData(name, email, password))
      .then(response => {
        Alert.alert(`${response.data.name}  Registered Successfully`);
        navigation.navigate('Login', {userData: response.data});
        console.log(`${response.data.name} , Registered Successfully`);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        if (error.response && error.response.status == 300) {
          Alert.alert('Already, User exists with the same email ID');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };

  // Show And Hide Password
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const register = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else {
      handlePost();
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
              <Text style={styles.headingText}>Create a New Account </Text>
              <Text style={styles.subheadingText}>
                Lorem Ipsum is simply dummy text of the printing and
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Mail height={hp('5%')} width={wp('5%')} />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholder="User Name"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Mail height={hp('5%')} width={wp('5%')} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Email"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Password height={hp('5%')} width={wp('5%')} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
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

              <View style={styles.inputWrapper}>
                <Password height={hp('5%')} width={wp('5%')} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  {isConfirmPasswordVisible ? (
                    <HideEye height={hp('5%')} width={wp('5.5%')} />
                  ) : (
                    <ShowEye height={hp('5%')} width={wp('5.5%')} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={register}>
              <Text style={styles.loginButtonText}>Register</Text>
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
                  <Google height={hp('9%')} width={wp('15%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                  <FaceBook height={hp('9%')} width={wp('15%')} />
                </TouchableOpacity>
              </View> */}

              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>
                  Want to Login With an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={styles.signUpText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

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
    marginTop: hp('10.5%'),
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
    marginTop: hp('2%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: hp('0.1%'),
    borderColor: '#001D4C',
    borderRadius: hp('1%'),
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
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
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  createAccountText: {
    color: '#001D4C',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
    marginRight: hp('0.5%'),
  },
  signUpText: {
    color: '#8647F3',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_14,
  },
  iconWrapper: {
    marginHorizontal: wp('2.5%'),
  },
});
