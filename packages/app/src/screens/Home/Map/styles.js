import { StyleSheet } from "react-native";
import { getWidht, getHeight } from "../../../utils/Device";

const styles = StyleSheet.create({
    map: {
        width: getWidht(),
        height: getHeight()
    },
    listContainer: {
        marginBottom: 10,
        width: getWidht(),
        height: getHeight() / 5,
        position: 'absolute',
        bottom: 0,
        left: 0
    }
})

export default styles