import { StyleSheet } from "react-native";
import { getWidth, getHeight } from "../../utils/Device";

const styles = StyleSheet.create({
    listItem: {
        width: getWidth() / 2,
        marginHorizontal: 10,
        height: getHeight() / 5,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderColor: 'purple',
        borderWidth: 0.5,
        padding: 10
    }
})

export default styles