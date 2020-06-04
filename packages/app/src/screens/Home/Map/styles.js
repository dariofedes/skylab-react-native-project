import { StyleSheet } from "react-native";
import { getWidht, getHeight } from "../../../utils/Device";

const styles = StyleSheet.create({
    map: {
        width: getWidht(),
        height: getHeight()
    }
})

export default styles