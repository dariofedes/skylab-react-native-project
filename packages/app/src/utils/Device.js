import { Dimensions } from "react-native";

export const getKeyboardType = type => {
    switch(type) {
        case 'phone':
            return 'numeric'
        case 'email': 
            return 'email-address'
        default: 
            return 'default'
    }
}

export const getWidht = () => {
    return Dimensions.get('screen').width
}


export const getHeight = () => {
    return Dimensions.get('screen').height
}


export default {
    getKeyboardType,
    getWidht,
    getHeight
}