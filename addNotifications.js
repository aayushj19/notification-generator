const userNotifications = {};

function addNotification(userId, notification) {
  if (!userNotifications[userId]) {
    userNotifications[userId] = [];
  }
  userNotifications[userId].push({ ...notification, timestamp: new Date() });
}

function getUserNotifications(userId) {
  return userNotifications[userId] || [];
}

module.exports = { addNotification, getUserNotifications };