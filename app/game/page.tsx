'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { countryList } from './countryList';

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

export default function Game() {
  const searchParams = useSearchParams();
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const difficulty = searchParams.get('difficulty') || 'easy';
  const difficultyLevel = difficultLevels[difficulty];
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);

  useEffect(() => {
    const countryForDifficulty = countryList.filter(
      (flag) => flag.difficulty <= difficultyLevel
    );
    setShuffledCountries(shuffleArray(countryForDifficulty));
  }, [difficultyLevel]);

  const currentCountry = shuffledCountries[currentCountryIndex];

  return (
    <main className="text-center text-blue-500">
      <h1 className="my-6 text-4xl font-extrabold">Guess the flag</h1>
      {currentCountry && (
        <Image
          src={currentCountry.image}
          alt={`Flag of ${currentCountry.name}`}
          unoptimized
          width={500}
          height={300}
          className="mx-auto my-4"
        />
      )}
    </main>
  );
}
