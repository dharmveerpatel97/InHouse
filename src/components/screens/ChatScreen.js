import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ChatScreen = ({chatData, onDelete, onOpenChat}) => {
  const [inputTextPerson1, setInputTextPerson1] = useState('');
  const [inputTextPerson2, setInputTextPerson2] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const inputRefPerson1 = useRef(null);
  const inputRefPerson2 = useRef(null);

  const handleSendMessagePerson1 = () => {
    if (inputTextPerson1.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: inputTextPerson1,
      sender: 'person1',
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputTextPerson1('');
    inputRefPerson1.current.blur();
    inputRefPerson2.current.focus();
  };

  const handleSendMessagePerson2 = () => {
    if (inputTextPerson2.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: inputTextPerson2,
      sender: 'person2',
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputTextPerson2('');
    inputRefPerson2.current.blur();
    inputRefPerson1.current.focus();
  };

  const handleDeleteMessage = id => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleOpenChat = () => {
    setModalVisible(true);
  };

  const handleCloseChat = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.chatContainer}>
      {/* List of new chats groups start */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleOpenChat}>
          <Text style={styles.chatTitle}>{chatData.chatGroup}</Text>
        </TouchableOpacity>
        <Button title="Delete Chat" onPress={() => onDelete(chatData.id)} />
      </View>
      {/* List of new chats groups start */}

      <Modal visible={modalVisible} onRequestClose={handleCloseChat}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{chatData.chatGroup}</Text>
          <View style={styles.modalSubtitleContainer}>
            <Text style={styles.modalSubtitle}>{chatData.person1}</Text>
            <Text style={styles.modalSubtitle}>{chatData.person2}</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.messageContainer}
            showsVerticalScrollIndicator={false}
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({animated: true});
            }}>
            {messages.map(message => (
              <View
                key={message.id}
                style={[
                  styles.message,
                  message.sender === 'person1'
                    ? styles.person1Message
                    : styles.person2Message,
                ]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
                <Button
                  title="Delete"
                  onPress={() => handleDeleteMessage(message.id)}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`${chatData.person1}...`}
              value={inputTextPerson1}
              onChangeText={setInputTextPerson1}
              ref={inputRefPerson1}
            />
            <Button title="Send" onPress={handleSendMessagePerson1} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`${chatData.person2}...`}
              value={inputTextPerson2}
              onChangeText={setInputTextPerson2}
              ref={inputRefPerson2}
            />
            <Button title="Send" onPress={handleSendMessagePerson2} />
          </View>
          <Button title="Close" onPress={handleCloseChat} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    marginBottom: hp('1%'),
    padding: wp('2%'),
    borderWidth: 1,
    borderRadius: wp('2%'),
    borderColor: '#ccc',
  },
  chatTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
  },
  modalContainer: {
    flex: 1,
    padding: wp('2%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
    alignSelf: 'center',
  },
  modalSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  modalSubtitle: {
    fontSize: wp('4%'),
    marginBottom: hp('0.8%'),
  },
  messageContainer: {
    flexGrow: 1,
    paddingBottom: hp('5%'),
  },
  message: {
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    marginBottom: hp('0.5%'),
    alignSelf: 'flex-start',
    maxWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  person1Message: {
    backgroundColor: '#dfe6e9',
    alignSelf: 'flex-start',
  },
  person2Message: {
    backgroundColor: '#00cec9',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: wp('4%'),
  },
  messageTime: {
    fontSize: wp('3%'),
    marginTop: hp('0.3%'),
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#f7f7f7',
  },
  input: {
    flex: 1,
    height: hp('5%'),
    marginRight: wp('2%'),
    paddingHorizontal: wp('2%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
  },
});

export default ChatScreen;
