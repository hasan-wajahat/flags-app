'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function Game() {
  const searchParams = useSearchParams();
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const difficulty = searchParams.get('difficulty') || 'easy';
  const difficultyLevel = difficultLevels[difficulty];
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);

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
        Guess the flag
      </h1>
      {currentCountry && (
        <Image
          src={currentCountry.image}
          alt={`Flag of ${currentCountry.name}`}
          unoptimized
          width={500}
          height={300}
          className="mx-auto my-8"
        />
      )}
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
