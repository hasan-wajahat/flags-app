'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';
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

function Game() {
  const searchParams = useSearchParams();
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const difficulty = searchParams.get('difficulty') || 'easy';
  const difficultyLevel = difficultLevels[difficulty];
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = currentCountry.audio;
      audioRef.current.play();
      setAudioPlayed(false); // Reset audioPlayed state when playing new audio
    }
  };

  useEffect(() => {
    const countryForDifficulty = countryList.filter(
      (flag) => flag.difficulty <= difficultyLevel
    );
    setShuffledCountries(shuffleArray(countryForDifficulty));
    audioRef.current = new Audio();

    const handleAudioEnded = () => {
      setAudioPlayed(true);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [difficultyLevel]);

  const goNext = () => {
    setCurrentCountryIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= shuffledCountries.length ? 0 : nextIndex;
    });
    setShowAnswer(false);
    setAudioPlayed(false);
  };

  const onShowAnswer = () => {
    setShowAnswer(true);
    playAudio();
  };

  const currentCountry = shuffledCountries[currentCountryIndex];

  return (
    <main className="p-8 text-center">
      <h1 className="my-6 text-4xl font-extrabold text-gray-600">
        Guess the flags
      </h1>
      <div className="relative mx-auto my-8 flex h-[40vh] max-h-[300px] min-h-[200px] items-center justify-center">
        {currentCountry && (
          <Image
            src={currentCountry.image}
            alt={`Flag of ${currentCountry.name}`}
            unoptimized
            width={500}
            height={300}
            className="h-full max-h-full w-auto max-w-full object-contain transition-opacity duration-300"
          />
        )}
      </div>
      {showAnswer ? (
        <div>
          <div className="flex justify-center">
            <p className="text-3xl font-bold text-slate-700">
              {currentCountry?.name}
            </p>
            <button
              onClick={playAudio}
              className={`ml-4 ${!audioPlayed && 'animate-pulse'}`}
              aria-label={`Listen to pronunciation of ${currentCountry?.name}`}
            >
              <SpeakerIcon className="h-8 w-8" />
            </button>
          </div>
          <button
            onClick={goNext}
            disabled={!audioPlayed}
            className="relative mt-4"
            aria-label="Next flag"
          >
            <Image
              src="/bluey-hello.gif"
              alt="Next"
              unoptimized
              width={100}
              height={100}
              className={`rounded-full transition-opacity duration-300 ${!audioPlayed ? 'opacity-50' : 'opacity-100'}`}
            />
            {!audioPlayed && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 text-sm font-medium text-white">
                Play audio first
              </div>
            )}
          </button>
        </div>
      ) : (
        <button
          onClick={onShowAnswer}
          className="blink text-yellow-500 hover:text-yellow-600"
          aria-label="Show answer"
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
