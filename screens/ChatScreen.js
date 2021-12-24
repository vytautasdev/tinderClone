import React from "react";
import { StyleSheet, View } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = () => {
  return (
    <View>
      <Header title="Chat" />
      <ChatList />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
