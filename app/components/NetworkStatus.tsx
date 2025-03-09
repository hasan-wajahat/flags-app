'use client';

import { useState, useEffect } from 'react';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Initialize with the current online status
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 mx-auto w-max animate-fade-in rounded-lg px-6 py-3 text-white shadow-lg ${
        isOnline ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <p>
        {isOnline
          ? '🌐 You are back online! All features available.'
          : '📴 You are offline! App will work with cached content.'}
      </p>
    </div>
  );
}