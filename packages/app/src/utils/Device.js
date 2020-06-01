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


export default {
    getKeyboardType
}