/* eslint-env browser */

export default () => {
  const enableNotificationsBtn = document.querySelector('.request-notifications');

  if (Notification.permission === 'granted') {
    enableNotificationsBtn.style.display = 'none';
  }

  enableNotificationsBtn.addEventListener('click', (e) => {
    e.preventDefault();

    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        enableNotificationsBtn.style.display = 'none';
      }
    });
  });
};
