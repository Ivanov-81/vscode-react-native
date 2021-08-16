import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Введите техт...");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Введите текст..."
      />
      <AntDesign.Button onPress={pressHandler} name="pluscircleo" color="#FFF">
        Добавить
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginBottom: 15,
  },
  input: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 2,
    borderBottomColor: "#3949ab",
    borderLeftColor: "#FFF",
    borderTopColor: "#FFF",
    borderRightColor: "#FFF",
    padding: 2,
  },
  button: {
    textTransform: "none",
  },
});
