import PushNotification from 'react-native-push-notification';

class NotificationService {
    configure(onNotification) {
        PushNotification.configure({
            onNotification,
            requestPermissions: true,
        });

        PushNotification.createChannel(
            {
                channelId: "default-channel-id",
                channelName: "Default Channel",
                channelDescription: "A default channel",
                soundName: "default",
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`)
        );
    }

    sendNotification(title, message) {
        PushNotification.localNotification({
            channelId: "default-channel-id",
            title: title,
            message: message,
        });
    }

    scheduleNotification(title, message, date) {
        PushNotification.localNotificationSchedule({
            channelId: "default-channel-id",
            title: title,
            message: message,
            date,
        });
    }
}

export default new NotificationService();
