// async function schedulePerSecondNotification() {
//   await Notifications.cancelAllScheduledNotificationsAsync();

//   let randomQuote = randomFromArray(quotes);
//   let notification = {
//     title: randomQuote.author,
//     body: randomQuote.quote,
//   };
//   let schedulingOptions = {
//     date: new Date().getTime() + 1000, // fire after one second
//     // repeat: true,
//   };

//   let notificationId = await Notifications.scheduleNotificationAsync({
//     content: notification,
//     trigger: schedulingOptions,
//   });

//   // schedulePerSecondNotification();
// }
