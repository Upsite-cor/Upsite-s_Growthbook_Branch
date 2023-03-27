import { colors } from "../../styles/theme.style";

const { RefreshControl, Platform } = require("react-native")

const Refresh = (props) =>{
    return(
        Platform.OS === 'ios' ? (
            <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
          ) : (
            <RefreshControl
                {...props}
              colors={[colors.general.BRAND]}
              refreshing={props.refreshing}
              onRefresh={props.onRefresh}
            />
          )
    )
}

export default Refresh;