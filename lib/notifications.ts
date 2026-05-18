/**
 * Notification utilities for the application
 * Centralized notification system using react-hot-toast
 */
import toast from 'react-hot-toast';

export const notifications = {
  /**
   * Show success notification
   */
  success: (message: string, options?: { duration?: number }) => {
    return toast.success(message, {
      duration: options?.duration || 3000,
      position: 'top-right',
    });
  },

  /**
   * Show error notification
   */
  error: (message: string, options?: { duration?: number }) => {
    return toast.error(message, {
      duration: options?.duration || 4000,
      position: 'top-right',
    });
  },

  /**
   * Show info notification
   */
  info: (message: string, options?: { duration?: number }) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: options?.duration || 3000,
      position: 'top-right',
    });
  },

  /**
   * Show warning notification
   */
  warning: (message: string, options?: { duration?: number }) => {
    return toast(message, {
      icon: '⚠️',
      duration: options?.duration || 4000,
      position: 'top-right',
    });
  },

  /**
   * Show loading notification
   */
  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  },

  /**
   * Dismiss a specific notification
   */
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all notifications
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Update a loading notification to success/error
   */
  update: (
    toastId: string,
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    if (type === 'success') {
      toast.success(message, {
        id: toastId,
        duration: 3000,
      });
    } else if (type === 'error') {
      toast.error(message, {
        id: toastId,
        duration: 4000,
      });
    } else {
      toast(message, {
        id: toastId,
        icon: 'ℹ️',
        duration: 3000,
      });
    }
  },
};

