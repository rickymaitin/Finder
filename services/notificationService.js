import { Notifications } from 'expo';

export const sendPushNotification = async (token, message) => {
  const notification = {
    to: token,
    sound: 'default',
    title: 'Hire Request',
    body: message,
    data: { message },
  };

  try {
    await Notifications.scheduleNotificationAsync(notification);
  } catch (error) {
    throw new Error('Error scheduling notification:', error);
  }
};
