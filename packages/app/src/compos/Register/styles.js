import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 30
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    icon:{
        height: 100,
        width: 100
    },
    button: {
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    haveAccount: {
        flexDirection: "row"
    },
    link: {
        color: "#0000FF"
    }
})

export default styles