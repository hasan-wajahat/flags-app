'use client';

import { countryList } from '@/app/game/countryList';

export const preloadAssets = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    console.log('Preloading all flag images and audio files...');
    
    // Preload all flag images
    const imagePromises = countryList.map((country) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to preload image: ${country.image}`);
          resolve();
        };
        img.src = country.image;
      });
    });
    
    // Preload all audio files
    const audioPromises = countryList.map((country) => {
      return new Promise<void>((resolve) => {
        const audio = new Audio();
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => {
          console.warn(`Failed to preload audio: ${country.audio}`);
          resolve();
        };
        audio.src = country.audio;
      });
    });
    
    await Promise.all([...imagePromises, ...audioPromises]);
    console.log('All assets preloaded successfully');
  } catch (error) {
    console.error('Error preloading assets:', error);
  }
};