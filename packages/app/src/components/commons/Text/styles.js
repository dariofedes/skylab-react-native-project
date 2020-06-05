import { StyleSheet } from "react-native";

let styles = StyleSheet.create({
    default: {
        fontWeight: '300',
        fontSize: 18,
        color: '#333',
    },
    title: {},
    subtitle: {},
    link: {}
})

styles.title = {
    ...styles.default,
    margin: 30,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '700'
}

styles.subtitle = {
    ...styles.default,
    margin: 10,
    fontSize: 24,
    fontWeight: '500'
}

styles.link = {
    ...styles.default,
    margin: 10,
    fontWeight: '400',
    color: '#4081e3',
    textDecorationLine: 'underline'
}

export default styles