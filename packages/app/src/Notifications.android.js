import PushNotification from "react-native-push-notification"

export const configureNotitications = () => {
    PushNotification.configure({
        onRegister: (token) => {
          console.log("TOKEN:", token);
        },
        onNotification: (notification) => {
          console.log("NOTIFICATION:", notification);

          // need to install ios library 
          // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
}

export const sendNotification = () => {
    PushNotification.localNotification({
        /* Android Only Properties */
        ticker: "My Notification Ticker",
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "red",
        vibrate: true,
        vibration: 300,
      
        /* iOS only properties */
        alertAction: "view",
        userInfo: {
            name: 'maider'
        },
      
        /* iOS and Android properties */
        title: "My Notification Title",
        message: "My Notification Message", // (required)
    });
}

export default {
    configureNotitications,
    sendNotification
}