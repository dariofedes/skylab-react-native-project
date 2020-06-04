import { StyleSheet } from "react-native";
import { getWidth, getHeight } from "../../../utils/Device";

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    listContainer: {
        marginBottom: 10,
        width: getWidth(),
        height: getHeight() / 5,
        position: 'absolute',
        bottom: 0,
        left: 0
    }
})

export default styles