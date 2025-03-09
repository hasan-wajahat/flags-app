'use client';

import { useEffect } from 'react';
import { preloadAssets } from './utils/preloadAssets';

export default function PWAManager() {
  // Preload important routes for offline use
  const preloadRoutes = async () => {
    try {
      console.log('Preloading routes for offline use...');
      
      // Preload the home and game routes
      const routes = ['/', '/game'];
      
      // Fetch each route to ensure it's cached by the service worker
      await Promise.all(
        routes.map(route => 
          fetch(route, { cache: 'force-cache' })
            .then(res => {
              if (!res.ok) {
                console.warn(`Failed to preload route: ${route}`);
              } else {
                console.log(`Route preloaded: ${route}`);
              }
            })
            .catch(err => console.warn(`Error preloading route ${route}:`, err))
        )
      );
      
      console.log('Routes preloaded successfully');
    } catch (error) {
      console.error('Error preloading routes:', error);
    }
  };

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
          
          // Preload critical routes for offline use
          preloadRoutes();
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