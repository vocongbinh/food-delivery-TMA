import WebApp from '@twa-dev/sdk';

export const useHapticFeedback = () => {
  const triggerHapticFeedback = () => {
    WebApp.HapticFeedback.impactOccurred('light');
  };

  return triggerHapticFeedback;
};