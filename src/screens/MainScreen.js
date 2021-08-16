import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppLoader } from "../components/ui/AppLoader";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";
import AppLoading from "expo-app-loading";

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } =
    useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    // console.log(loading);
    // return <View style={styles.center}>
    //     <ActivityIndicator size="large" />
    //   </View>
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
