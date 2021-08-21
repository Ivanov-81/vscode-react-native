import React, { useReducer, useContext } from "react";
import { Alert, ToastAndroid, Platform, AlertIOS } from "react-native";
import { ScreenContext } from "../screen/screenContext";
// import { AppToast } from "../../components/ui/AppToast";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReduser } from "./todoReduser";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReduser, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-24f08-default-rtdb.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError('Что-то пошло не так...')
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await fetch(
              `https://rn-todo-app-24f08-default-rtdb.firebaseio.com/todos/${id}.json`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application.json" },
              }
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch(
        "https://rn-todo-app-24f08-default-rtdb.firebaseio.com/todos.json",
        {
          method: "GET",
          headers: { "Content-Type": "application.json" },
        }
      );
      const data = await response.json();
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (err) {
      showToast(err);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      const response = await fetch(
        `https://rn-todo-app-24f08-default-rtdb.firebaseio.com/todos/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application.json" },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (err) {
      showToast(err);
    }
  };

  const showToast = (err) => {
    console.log(err);
    let msg = "Что-то пошло не так...";
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
    showError(msg);
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
