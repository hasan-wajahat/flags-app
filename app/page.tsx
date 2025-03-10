import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="text-center text-blue-500">
      <div className="mb-8 mt-20 flex justify-center">
        <Image
          src="/bluey-dancing.gif"
          alt="Bluey Dancing"
          unoptimized
          width={200}
          height={200}
        />
      </div>
      <h1 className="mb-6 text-4xl font-extrabold">Flags Game</h1>

      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            href={{
              pathname: '/game',
              query: { difficulty: 'easy' },
            }}
            className="rounded-full bg-yellow-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-yellow-500"
          >
            Easy
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: '/game',
              query: { difficulty: 'medium' },
            }}
            className="rounded-full bg-green-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-green-500"
          >
            Medium
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: '/game',
              query: { difficulty: 'easy' },
            }}
            className="rounded-full bg-red-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-red-500"
          >
            Hard
          </Link>
        </li>
      </ul>
    </main>
  );
}
