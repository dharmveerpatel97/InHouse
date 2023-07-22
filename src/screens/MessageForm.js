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
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT, FONT_SIZE, COLOR} from '../config/Globles';
import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import ServicesIcon from '../assets/svg/ServicesIcon.svg';

// import {useSelector, useDispatch} from 'react-redux';
// import {MessageFormPost} from '../redux/Store';
const MessageForm = ({navigation}) => {
  // const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(6);

  //API MESSAGES POST
  // const messageSubmitHandler = () => {
  //   console.log('name:', name);
  //   console.log('phone:', phone);
  //   console.log('email:', email);
  //   console.log('subject:', subject);
  //   console.log('message:', message);
  //   console.log('userId:', userId);

  //   dispatch(MessageFormPost(name, phone, email, subject, message, userId))
  //     .then(response => {
  //       Alert.alert('Success', response);
  //     })
  //     .catch(error => {
  //       Alert.alert('Error', error);
  //     });
  // };
  // ----------------------------------------------
  const messageSubmitHandler = () => {
    const data = {
      name: name,
      phone: phone,
      email: email,
      subject: subject,
      message: message,
      user_id: userId,
    };

    axios
      .post('https://inhouse.hirectjob.in/api/send-contact-message', data)
      .then(response => {
        console.log('Message sent successfully', response);
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
        Alert.alert('Message sent successfully');
      })
      .catch(error => {
        console.error('Error sending message:', error);
        Alert.alert('Error sending message:', error);
      });
  };

  return (
    <View style={styles.containerForm}>
      <ImageBackground source={PlacesBGI} style={styles.backgroundImageForm}>
        <View style={styles.headerContainerForm}>
          <View style={styles.headerContentForm}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}
              style={styles.headerButtonForm}>
              <ServicesIcon height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextForm}>Message Form</Text>

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
                onChangeText={setName}
              />
              <Text style={styles.titleTextStyle}>Email</Text>
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
              <Text style={styles.titleTextStyle}>Phone No</Text>
              <TextInput
                style={styles.inputFieldForm}
                placeholder="Enter Here"
                value={phone}
                onChangeText={setPhone}
                keyboardType="default"
              />
              <Text style={styles.formTitle}>Subject</Text>

              <TextInput
                style={[styles.inputFieldForm, styles.longInputFieldForm]}
                placeholder="Enter Here"
                value={subject}
                onChangeText={setSubject}
                keyboardType="default"
                multiline={true}
                numberOfLines={6}
              />

              <Text style={styles.formTitle}>Message</Text>
              <TextInput
                style={[
                  styles.inputFieldForm,
                  styles.longInputFieldForm,
                  {marginBottom: hp('35%')},
                ]}
                placeholder="Enter Here"
                value={message}
                onChangeText={setMessage}
                keyboardType="default"
                multiline={true}
                numberOfLines={4}
              />
            </ScrollView>
          </View>
        </View>

        {/* Bottom Navigation Button */}
        <View style={styles.bottomNavButtonContainerForm}>
          <TouchableOpacity
            style={styles.bottomButtonTouchOpacityForm}
            onPress={messageSubmitHandler}>
            <Text style={styles.bottomButtonTextForm}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MessageForm;

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
    height: hp('6.5%'),
    borderWidth: hp('0.1'),
    borderColor: 'gray',
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: hp('1%'),
  },
  pickerContainerForm: {
    borderWidth: hp('0.1%'),
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    height: hp('6.5%'),
    marginBottom: hp('2.5%'),
    borderColor: 'gray',
  },
  pickerForm: {
    height: hp('5%'),
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
  formTitle: {
    color: 'black',
    fontSize: FONT_SIZE.F_15,
    fontFamily: FONT.SEMI_BOLD,
    marginBottom: hp('1%'),
  },
  longInputFieldForm: {
    height: hp('15%'),
    textAlignVertical: 'top',
  },
});
