import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {FONT, FONT_SIZE, COLOR} from '../config/Globles';

import ServicesIcon from '../assets/svg/ServicesIcon.svg';
import HeadLeftNotification from '../assets/svg/HeadLeftNotification.svg';
import PlacesBGI from '../assets/images/DetailsBGI.jpg';
import MessageScreenYellowDot from '../assets/svg/MessageScreenYellowDot.svg';

import HeadLeftArrow from '../assets/svg/HeadLeftArrow.svg';

const Messages = ({navigation}) => {
  const notificationData = [
    {
      id: 1,
      name: 'John Doe',
      chatOnline: true,
      time: '09:18',
      message: 'Hello',
    },
    {
      id: 2,
      name: 'Jane Smith',
      chatOnline: false,
      time: '09:18',
      message: 'How r u ?',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      chatOnline: true,
      time: '09:18',
      message: 'What about that  ...',
    },
    {
      id: 4,
      name: 'Sarah Thompson',
      chatOnline: false,
      time: '09:18',
      message: 'I’ve already registeredai...',
    },
    {
      id: 5,
      name: 'David Wilson',
      chatOnline: true,
      time: '09:18',
      message: 'Tagged you in a post',
    },

    {
      id: 6,
      name: 'Emily Davis',
      chatOnline: true,

      time: '09:18',
      message: 'Shared your story',
    },
    {
      id: 7,
      name: 'Alex Rodriguez',
      chatOnline: false,
      time: '09:18',
      message: 'Mentioned you in a comment',
    },
    {
      id: 8,
      name: 'Sophia Garcia',
      chatOnline: true,
      time: '09:18',
      message: 'Replied to your message',
    },
    {
      id: 9,
      name: 'Daniel Thomas',
      chatOnline: true,
      time: '09:18',
      message: 'Invited you to an event',
    },
    {
      id: 10,
      name: 'Olivia Martin',
      chatOnline: true,

      time: '09:18',
      message: 'Started following you',
    },
  ];

  const handleNotificationPress = id => {
    // Alert.alert(`Clicked on notification ID: ${id}`);
    navigation.navigate('Chat');
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item.id)}>
      <View style={styles.notificationItemContainerMessages}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Dp */}
          <View style={styles.circleContainerMessages}></View>

          {/* Name and About */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <View style={{}}>
                <Text style={styles.notificationItemNameMessages}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text style={styles.notificationItemMessageText}>
                  {item.message}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              {item.chatOnline ? (
                <MessageScreenYellowDot height={hp('3%')} width={wp('4%')} />
              ) : null}
              <Text style={styles.timeMessageText}>{item.time}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerMessages}>
      <ImageBackground
        source={PlacesBGI}
        style={styles.backgroundImageMessages}>
        <View style={styles.headerContainerMessages}>
          <View style={styles.headerContentMessages}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('');
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTextFormMessages}>Messages</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <HeadLeftNotification height={hp('5%')} width={wp('12%')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainerMessages}>
          <View
            style={styles.innerContainerMessages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <FlatList
              data={notificationData}
              keyExtractor={item => item.id.toString()}
              renderItem={renderNotificationItem}
              contentContainerStyle={styles.notificationContainerMessages}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  containerMessages: {
    flex: 1,
  },
  backgroundImageMessages: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerTextFormMessages: {
    color: COLOR.WHITE,
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_17,
  },
  headerContainerMessages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContentMessages: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainerMessages: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%') / 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp('1.5%'),
  },
  headerTextContainerMessages: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
  },
  headerTextMessages: {
    color: '#FFFFFF',
    fontFamily: 'bold',
    fontSize: wp('4.5%'),
  },
  contentContainerMessages: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: hp('2%'),
    borderTopLeftRadius: hp('4%'),
    borderTopRightRadius: hp('4%'),
  },
  innerContainerMessages: {
    margin: hp('3%'),
    marginTop: hp('2%'),
    flex: 1,
    marginBottom: hp('2%'),
  },
  notificationContainerMessages: {
    flexGrow: 1,
    paddingTop: hp('2%'),
  },
  notificationItemContainerMessages: {
    padding: hp('2%'),
    borderRadius: hp('2.5%'),
    backgroundColor: 'rgba(2, 20, 49, 0.1)',
    marginBottom: hp('2%'),
    // paddingLeft: hp('1.5%'),
    // paddingRight: hp('1.5%'),
  },
  notificationItemHeaderMessages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationItemNameMessages: {
    fontSize: FONT_SIZE.F_15,
    color: '#001D4C',
    fontFamily: FONT.SEMI_BOLD,
  },
  notificationItemTimeMessages: {
    fontSize: FONT_SIZE.F_12,
    color: '#001D4C',
    fontFamily: FONT.BOLD,
  },
  notificationItemMessageText: {
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
    fontSize: FONT_SIZE.F_14,
    color: '#001D4C',
    fontFamily: FONT.MEDIUM,
  },
  timeMessageText: {
    fontSize: wp('4%'),
    fontSize: FONT_SIZE.F_12,
    color: '#9EA3AE',
    fontFamily: FONT.SEMI_BOLD,
  },
});
