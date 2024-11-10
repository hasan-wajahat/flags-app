import Image from 'next/image';

export default function Home() {
  return (
    <main className="text-center text-blue-500">
      <div className="mb-8 mt-20 flex justify-center">
        <Image
          src="/bluey-dancing.gif"
          alt="Bluey Dancing"
          width={200}
          height={200}
        />
      </div>
      <h1 className="mb-6 text-4xl font-extrabold">Flags Game</h1>

      <ul className="flex justify-center space-x-4">
        <li>
          <button className="rounded-full bg-yellow-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-yellow-500">
            Easy
          </button>
        </li>
        <li>
          <button className="rounded-full bg-green-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-green-500">
            Medium
          </button>
        </li>
        <li>
          <button className="rounded-full bg-red-400 px-4 py-2 font-bold text-white transition duration-300 hover:bg-red-500">
            Hard
          </button>
        </li>
      </ul>
    </main>
  );
}
