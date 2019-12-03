/* eslint-env browser */
/* eslint-disable import/no-unresolved, import/extensions */

import confetti from 'https://unpkg.com/canvas-confetti@0.5.0/dist/confetti.module.mjs';

export default () => {
  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification('Endspurt has finished!');
  }

  const end = Date.now() + (10 * 1000);

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      shapes: ['square'],
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  }, 200);
};
