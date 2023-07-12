import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {FONT, FONT_SIZE, COLOR} from '../../config/Globles';

import ChatReadMeassageTicks from '../../assets/svg/ChatReadMeassageTicks.svg';
import ChatSendMessageIcon from '../../assets/svg/ChatSendMessageIcon.svg';
import ChatThreeDots from '../../assets/svg/ChatThreeDots.svg';
import ChatOnlineDot from '../../assets/svg/ChatOnlineDot.svg';

import HeadLeftArrow from '../../assets/svg/HeadLeftArrow.svg';

const Chat = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [text, setText] = useState('');

  const sendHandler = () => {
    // Show alert message
    Alert.alert('Message Sent');
    // Clear the text input
    setText('');
  };

  //Chat
  const PersonA = [
    {id: 1, message: 'Hi', timings: '10:00 AM'},
    {id: 2, message: 'How are you?', timings: '10:05 AM'},
    {id: 3, message: 'Did you watch the game?', timings: '10:10 AM'},
    {
      id: 4,
      message: 'What are your plans for the weekend?',
      timings: '10:15 AM',
    },
    {id: 5, message: 'See you later!', timings: '10:20 AM'},
  ];

  const PersonB = [
    {id: 1, message: 'Hi', timings: '10:01 AM'},
    {id: 2, message: 'I m good! How about you?', timings: '10:06 AM'},
    {id: 3, message: 'Yes it was an amazing game!', timings: '10:11 AM'},
    {id: 4, message: 'Im planning to go hiking.', timings: '10:16 AM'},
    {id: 5, message: 'Take care!', timings: '10:21 AM'},
  ];

  const ChatMessage = ({message, sender, timings}) => {
    const containerStyle =
      sender === 'PersonA' ? styles.personAContainer : styles.personBContainer;
    const textStyle =
      sender === 'PersonA' ? styles.personAText : styles.personBText;
    const timeContainerStyle =
      sender === 'PersonA'
        ? styles.timeContainerLeft
        : styles.timeContainerRight;
    const timeTextStyle =
      sender === 'PersonA' ? styles.timeTextLeft : styles.timeTextRight;

    return (
      <View style={{marginBottom: hp('1.2%')}}>
        <View style={[styles.messageContainer, containerStyle]}>
          <Text style={textStyle}>{message}</Text>
        </View>
        <View style={[styles.timeContainer, timeContainerStyle]}>
          <ChatReadMeassageTicks height={hp('3%')} width={wp('4%')} />
          <Text style={timeTextStyle}>{timings}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('');
              }}>
              <HeadLeftArrow height={hp('5%')} width={wp('12%')} />
            </TouchableOpacity>

            <View style={styles.userInfoContainer}>
              {/* DP */}
              <View style={styles.dpContainer} />
              <View>
                <Text style={styles.userNameText}>Clara Hazel</Text>
                <View style={styles.onlineContainer}>
                  <ChatOnlineDot height={hp('2%')} width={wp('2%')} />
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <ChatThreeDots height={hp('5.5%')} width={wp('13%')} />
          </TouchableOpacity>
        </View>

        {/* white Line */}
        <View style={styles.whiteLine} />

        {/* Body */}
        <View style={{flex: 1, marginBottom: hp('8%')}}>
          <ScrollView
            style={{marginLeft: hp('2.5%'), marginRight: hp('2.5%')}}
            showsVerticalScrollIndicator={false}>
            <View style={{marginTop: hp('2%')}}></View>

            {PersonA.map(message => (
              <ChatMessage
                key={message.id}
                message={message.message}
                sender="PersonA"
                timings={message.timings}
              />
            ))}
            {PersonB.map(message => (
              <ChatMessage
                key={message.id}
                message={message.message}
                sender="PersonB"
                timings={message.timings}
              />
            ))}
          </ScrollView>
        </View>
        {/* Footer */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={COLOR.WHITE}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            style={styles.sendIconContainer}
            onPress={sendHandler}>
            <ChatSendMessageIcon height={hp('5.5%')} width={wp('13%')} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Chat;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#001D4C',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp('2.7%'),
    margin: hp('2.6%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    marginLeft: hp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dpContainer: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('10.5%') / 2,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp('1.5%'),
  },
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    color: '#FFFFFF',
    fontFamily: FONT.SEMI_BOLD,
    fontSize: FONT_SIZE.F_16,
  },
  onlineText: {
    color: '#35C759',
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.F_13,
    marginLeft: hp('0.5%'),
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: hp('1%'),
    position: 'absolute',
    flex: 1,
    paddingLeft: hp('2.5%'),
    paddingRight: hp('2.5%'),
  },
  input: {
    flex: 1,
    height: hp('5%'),
    marginRight: wp('2%'),
    paddingHorizontal: wp('2%'),
    borderColor: '#ccc',
    borderWidth: wp('0.2%'),
    borderRadius: wp('2%'),
    color: COLOR.WHITE,
  },
  sendIconContainer: {
    height: hp('5.5%'),
    width: wp('13%'),
  },
  whiteLine: {
    height: hp('0.1'),
    backgroundColor: '#FFFFFF',
  },

  messageContainer: {
    maxWidth: '80%',
    borderRadius: 8,
    padding: hp('1'),
  },
  personAContainer: {
    backgroundColor: '#020432',
    alignSelf: 'flex-start',
  },
  personBContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignSelf: 'flex-end',
  },
  personAText: {
    color: COLOR.WHITE,
  },
  personBText: {
    color: COLOR.WHITE,
  },
  timingsText: {
    fontSize: FONT_SIZE.F_12,
    fontFamily: FONT.REGULAR,
    color: COLOR.WHITE,
    marginLeft: hp('0.5%'),
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainerLeft: {
    justifyContent: 'flex-start',
  },
  timeContainerRight: {
    justifyContent: 'flex-end',
  },
  timeTextLeft: {
    fontSize: FONT_SIZE.F_12,
    fontFamily: FONT.REGULAR,
    color: COLOR.WHITE,
    marginLeft: hp('0.7%'),
  },
  timeTextRight: {
    fontSize: FONT_SIZE.F_12,
    fontFamily: FONT.REGULAR,
    color: COLOR.WHITE,
    marginLeft: hp('0.7%'),
  },
});
