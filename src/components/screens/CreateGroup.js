import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import ChatScreen from './ChatScreen';

const CreateGroup = ({}) => {
  const [chatGroups, setChatGroups] = useState([]);
  const [newChatGroup, setNewChatGroup] = useState('');
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');

  const handleAddChatGroup = () => {
    if (
      newChatGroup.trim() === '' ||
      person1.trim() === '' ||
      person2.trim() === ''
    ) {
      return;
    }

    const newChat = {
      id: Date.now(),
      chatGroup: newChatGroup,
      person1: person1,
      person2: person2,
    };

    setChatGroups([...chatGroups, newChat]);
    setNewChatGroup('');
    setPerson1('');
    setPerson2('');
  };

  const handleDeleteChatGroup = id => {
    const updatedChatGroups = chatGroups.filter(chat => chat.id !== id);
    setChatGroups(updatedChatGroups);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addChatContainer}>
        <TextInput
          style={styles.inputGroupContainer}
          placeholder="Chat Group Name"
          value={newChatGroup}
          onChangeText={setNewChatGroup}
        />
        <TextInput
          style={styles.inputGroupContainer}
          placeholder="Person 1 Name"
          value={person1}
          onChangeText={setPerson1}
        />
        <TextInput
          style={styles.inputGroupContainer}
          placeholder="Person 2 Name"
          value={person2}
          onChangeText={setPerson2}
        />
        <Button title="Create Chat" onPress={handleAddChatGroup} />
      </View>
      <ScrollView>
        {chatGroups.map(chat => (
          <ChatScreen
            key={chat.id}
            chatData={chat}
            onDelete={handleDeleteChatGroup}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addChatContainer: {
    marginBottom: 20,
  },
  inputGroupContainer: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default CreateGroup;
