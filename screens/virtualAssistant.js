import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Image} from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

import NetInfo from "@react-native-community/netinfo";

function ChatHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Asistente Virtual</Text>
    </View>
  );
}

function ChatMessages({ messages }) {
  return (
    <ScrollView style={styles.messages}>
      {messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.message,
            {
              alignSelf: message.type == 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: message.type == 'user' ? 'lightblue' : '#FF9D7A',
              padding: wp("3%"),
              borderTopStartRadius: message.type == 'user' ? wp("3%") : 0,
              borderTopEndRadius: message.type == 'user' ? 0 : wp("3%"),
              borderRadius: wp("3%"),
              borderEndEndRadius: wp("3%")
            },
          ]}
        >
          <Text>{message.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [assistantReplied, setAssistantReplied] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      // Verifica si el asistente ya ha respondido
      if (!assistantReplied) setAssistantReplied(true);
      setMessage('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Escribe tu mensaje..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity style={styles.boton} onPress={handleSendMessage}>
        <Text style={styles.textoBoton}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

function VirtualAssistantApp() {

  useFocusEffect(
    React.useCallback(() => {
      NetInfo.fetch().then(state => {
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
        if (state.isConnected) setConection(true)
        else setConection(false)
      });
    }, [])
  );

  const [messages, setMessages] = useState([]);
  const [conection, setConection] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const newMessage = {
        text: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte?',
        type: 'assist',
      };
      setMessages([...messages, newMessage]);
    }, 500);
  }, []);



  const handleSendMessage = (messageText) => {
    console.log(messageText);
    const newMessage = {
      text: messageText,
      type: 'user',
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <>
    {
      conection == true
      ?
        <View style={{ flex: 1 }}>
          <ChatHeader />
          <ChatMessages messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </View>
      :
        <View style={styles.divNotConection}>
          <Image source={require('../assets/img/noConection.png')} style={{ width: wp('25%'), height: hp('15%') }}/>
          <Text style={styles.textNotConection}>Parece que no estás conectado a internet</Text>
        </View>
    }

    </>
  );
}


const styles = {
  header: {
    backgroundColor: '#FF9D7A',
    padding: 10,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight
  },
  headerText: {
    fontSize: wp("4.5%"),
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
    padding: wp("2%"),
    marginBottom: wp("2%")
  },
  message: {
    backgroundColor: 'lightgray',
    // borderRadius: 10,
    padding: 8,
    marginVertical: 5,
    maxWidth: wp("70%"),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp("1%"),
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    marginBottom: hp('9%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp("3%"),
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    marginBottom: hp('9%'),
    height: hp('7%'), // Establece la misma altura para el contenedor
  },
  inputText: {
    flex: 1,
    marginRight: wp("2%"),
    padding: wp("2%"),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  boton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6633',
    // padding: 10,
    borderRadius: 8,
    width: wp("25%"),
    height: hp("4.5%"),
  },
  textoBoton: {
    color: 'white',
    fontSize: wp("4%"),
    fontWeight: 'bold',
  },

  divNotConection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('12%')
  },

  textNotConection: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginVertical: hp('5%')
  }
};

export default VirtualAssistantApp;

