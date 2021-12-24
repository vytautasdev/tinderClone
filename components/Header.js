import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View
      style={tw("p-1 mt-8 bg-blue-300 flex-row items-center justify-between")}
    >
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity style={tw("p-2")} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color={"#FF5864"} />
        </TouchableOpacity>
        <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          style={tw("rounded-full mr-4 p-3 bg-red-200")}
          onPress={() => navigation.goBack()}
        >
          <Foundation name="telephone" size={20} color={"#FF5864"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
