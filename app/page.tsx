export default function Home() {
  return (
    <main className="text-blue-500 text-center">
      <h1 className="text-4xl font-extrabold mb-6">Flags Game</h1>

      <ul className="flex justify-center space-x-4">
        <li>
          <button className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-500 transition duration-300">
            Easy
          </button>
        </li>
        <li>
          <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-full hover:bg-green-500 transition duration-300">
            Medium
          </button>
        </li>
        <li>
          <button className="bg-red-400 text-white font-bold py-2 px-4 rounded-full hover:bg-red-500 transition duration-300">
            Hard
          </button>
        </li>
      </ul>
    </main>
  );
}
