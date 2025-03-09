'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { countryList } from './countryList';
import QuestionIcon from '@/app/components/QuestionIcon';
import SpeakerIcon from '@/app/components/SpeakerIcon';

const difficultLevels: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type Country = (typeof countryList)[number];

let audio: HTMLAudioElement;

function Game() {
  const searchParams = useSearchParams();
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const difficulty = searchParams.get('difficulty') || 'easy';
  const difficultyLevel = difficultLevels[difficulty];
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const [isPwa, setIsPwa] = useState(false);

  const playAudio = () => {
    audio.src = currentCountry.audio;
    audio.play();
  };

  useEffect(() => {
    const countryForDifficulty = countryList.filter(
      (flag) => flag.difficulty <= difficultyLevel
    );
    setShuffledCountries(shuffleArray(countryForDifficulty));
    audio = new Audio();
    
    // Check if app is running as PWA
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      setIsPwa(isStandalone);
    }
  }, [difficultyLevel]);

  const goNext = () => {
    setCurrentCountryIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= shuffledCountries.length ? 0 : nextIndex;
    });
    setShowAnswer(false);
  };

  const onShowAnswer = () => {
    setShowAnswer(true);
    playAudio();
  };

  const currentCountry = shuffledCountries[currentCountryIndex];

  return (
    <main className="p-8 text-center">
      <h1 className="my-6 text-4xl font-extrabold text-gray-600">
        Guess the flags {isPwa && <span className="ml-2 rounded bg-indigo-600 px-2 py-1 text-sm font-medium text-white">Offline Ready</span>}
      </h1>
      <div className="relative mx-auto my-8 flex h-[40vh] max-h-[300px] min-h-[200px] items-center justify-center">
        {currentCountry && (
          <Image
            src={currentCountry.image}
            alt={`Flag of ${currentCountry.name}`}
            unoptimized
            width={500}
            height={300}
            className="h-full w-auto max-w-full max-h-full object-contain transition-opacity duration-300"
          />
        )}
      </div>
      {showAnswer ? (
        <div>
          <div className="flex justify-center">
            <p className="text-3xl font-bold text-slate-700">
              {currentCountry?.name}
            </p>
            <button onClick={playAudio} className="ml-4">
              <SpeakerIcon className="h-8 w-8" />
            </button>
          </div>
          <button onClick={goNext}>
            <Image
              src="/bluey-hello.gif"
              alt="Next"
              unoptimized
              width={100}
              height={100}
              className="mt-4 rounded-full"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={onShowAnswer}
          className="blink text-yellow-500 hover:text-yellow-600"
        >
          <QuestionIcon className="h-16 w-16" />
        </button>
      )}
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback="Loading...">
      <Game />
    </Suspense>
  );
}
