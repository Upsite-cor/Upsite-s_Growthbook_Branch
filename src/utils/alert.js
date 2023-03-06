import { Alert as NativeAlert } from "react-native";
export default class Alert {
    static notify(title="", message=""){
        NativeAlert.alert(title, message);
    }
}