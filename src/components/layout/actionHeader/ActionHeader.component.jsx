import React from "react";
import { TouchableOpacity, Text, View} from "react-native";
import ActionHeaderStylesheet from "./ActionHeader.component.style";

const ActionHeader = ({heading, actionTitle, actionHandler}) => {
    return(
        <View style={ActionHeaderStylesheet.container}>
            <Text style={ActionHeaderStylesheet.heading}>{heading}</Text>
            <TouchableOpacity onPress={actionHandler? ()=> actionHandler(): ()=>{}}>
                {/* <Text style={ActionHeaderStylesheet.actionButtonText}>{actionTitle? actionTitle: "See More"}</Text> */}
            </TouchableOpacity>
        </View>
    );
};

export default ActionHeader;