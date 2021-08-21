import {
    ToastAndroid,
    Platform,
    AlertIOS
} from "react-native";

export const AppToast = ({ msg }) => {

    console.log(msg);

    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }
    else {
        AlertIOS.alert(msg);
    }

    return null;
};