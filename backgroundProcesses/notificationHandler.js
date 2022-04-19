import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


class notificationHandler {
    async lectureStart( lectureName, startTime, lectureLocation) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Your lesson is starting soon! 📝",
                body: 'Your '+ lectureName +' lecture is starting in '+ startTime +' minutes in '+ lectureLocation,
            },
            trigger: null
        });
    }
}

export default new notificationHandler();


