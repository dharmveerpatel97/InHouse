import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';

import {FONT, FONT_SIZE, COLOR} from '../../config/Globles';

import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';
import HeadLeftNotification from '../../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../../assets/images/DetailsBGI.jpg';

const PropertyFormMail = ({navigation}) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const SubmitHandilar = () => {
    console.log('name:', name);
    console.log('mobileNo:', subject);
    console.log('email:', email);
    console.log('message:', message);

    // Prepare the data to be sent in the request
    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      agent_email: 'agent_email@gmail.com', // Replace with the actual agent email
    };

    // Make the POST request using Axios
    axios
      .post('https://inhouse.hirectjob.in/api/send-mail-to-agent', data)
      .then(response => {
        // Handle the response if needed
        console.log('API response:', response.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('API error:', error);
      });
  };

  return (
    <View style={styles.containerForm}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImageForm}>
        <View style={styles.headerContainerForm}>
          <View style={styles.headerContentForm}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.headerButtonForm}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextForm}>Property Form</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}
            style={styles.headerButtonForm}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerForm}>
          <View>
            <ScrollView
              style={styles.innerContainerForm}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.titleTextStyle}>Full Name</Text>

              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={name}
                keyboardType="default"
                onChangeText={setName}
              />
              <Text style={styles.titleTextStyle}>E-mail</Text>

              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoCompleteType="email"
              />
              <Text style={styles.titleTextStyle}>Subject</Text>

              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={subject}
                onChangeText={setSubject}
                keyboardType="default"
              />

              <Text style={styles.titleTextStyle}>Message</Text>
              <View>
                <TextInput
                  style={[styles.inputFieldForm]}
                  placeholder="Enter Here"
                  value={message}
                  onChangeText={setMessage}
                  keyboardType="default"
                  multiline={true}
                  numberOfLines={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.bottomNavButtonContainerForm}>
          <TouchableOpacity
            style={styles.bottomButtonTouchOpacityForm}
            onPress={SubmitHandilar}>
            <Text style={styles.bottomButtonTextForm}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PropertyFormMail;

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
  },
  backgroundImageForm: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainerForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonForm: {
    marginRight: hp('0%'),
  },

  headerTextForm: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },

  contentContainerForm: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
    paddingBottom: hp('9%'),
  },
  innerContainerForm: {
    margin: hp('3%'),
    marginTop: hp('5%'),
  },
  textContainerForm: {
    flex: 1,
  },

  bottomNavButtonContainerForm: {
    position: 'absolute',
    bottom: hp('4%'),
    flex: 0,
    width: wp('100%'),
    alignItems: 'center',
  },
  bottomButtonTouchOpacityForm: {
    backgroundColor: '#F49825',
    width: wp('86%'),
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
  },
  bottomButtonTextForm: {
    fontFamily: 'SemiBold',
    color: '#FFFFFF',
    fontSize: FONT_SIZE.F_17,
  },

  inputFieldForm: {
    // height: hp('6.5%'),
    borderWidth: hp('0.1'),
    borderColor: 'gray',
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: hp('1%'),
  },

  buttonTextForm: {
    color: 'white',
    fontSize: FONT_SIZE.F_17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleTextStyle: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginVertical: hp('1%'),
  },
});
