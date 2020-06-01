export const getAppBackgroundColor = route => {
    switch(route) {
      case 'login':
      case 'register':
        return '#ebbf47'
      default: 
        return '#fff'
    }
  }

  
  export default {
    getAppBackgroundColor
  }