'use client';

import { useEffect } from 'react';
import { preloadAssets } from './utils/preloadAssets';

export default function PWAManager() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      window.addEventListener('load', () => {
        // When PWA is installed or opened, preload assets
        if (window.matchMedia('(display-mode: standalone)').matches || 
            // @ts-ignore: 'standalone' exists on iOS Safari but not in standard Navigator type
            window.navigator.standalone === true) {
          console.log('Running in PWA mode');
          preloadAssets();
        } else {
          console.log('Running in browser mode');
        }
      });
    }
    
    // Listen for offline/online events to show appropriate UIs
    const handleOffline = () => {
      console.log('App is offline');
      // You could add UI to notify users they are offline
    };
    
    const handleOnline = () => {
      console.log('App is back online');
      // You could add UI to notify users they are online again
    };
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}