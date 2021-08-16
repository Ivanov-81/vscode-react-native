import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Ошибка!",
        `Минимальная длинна названия 3 символа. Сейчас ${
          title.trim().length
        } символов.`
      );
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Введите назвение"
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton color={THEME.GREY_COLOR} onPress={saveHandler}>
            Сохранить
          </AppButton>
          <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
            Отменить
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
