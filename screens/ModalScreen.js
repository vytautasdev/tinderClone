import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image | !occupation | !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      occupation,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        ToastAndroid.show(
          "Successfully updated user profile",
          ToastAndroid.LONG
        );
        navigation.goBack();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={-120}
      style={{ flex: 1 }}
    >
      <View style={tw("flex-1 items-center pt-5")}>
        <Image
          style={tw("h-20 w-full mt-5")}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/2pf" }}
        />

        <Text style={tw("text-xl text-gray-500 p-2")}>
          Welcome back,{" "}
          <Text style={tw("text-blue-700")}>
            {user.displayName.split(" ")[0]}
          </Text>
        </Text>

        <Text style={tw("text-center mt-2 p-4 font-bold text-red-400")}>
          Step 1: The Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={(value) => setImage(value)}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter a Profile Pic URL"
        />

        <Text style={tw("text-center p-4 font-bold text-red-400")}>
          Step 2: The Job
        </Text>
        <TextInput
          value={occupation}
          onChangeText={setOccupation}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter your occupation"
        />

        <Text style={tw("text-center p-4 font-bold text-red-400")}>
          Step 3: The Age
        </Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter your age"
          keyboardType="numeric"
          maxLength={2}
        />

        <TouchableOpacity
          disabled={incompleteForm}
          onPress={updateUserProfile}
          style={[
            tw("items-center rounded-2xl w-64 p-4 absolute bottom-10"),
            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
          ]}
        >
          <Text style={tw("text-white text-xl font-bold")}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
