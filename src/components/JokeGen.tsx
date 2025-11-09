import axios from "axios";
import { useEffect, useState } from "react";

interface jokes {
  id?: number;
  setup?: string;
  punchline?: string;
  type?: string;
}

const JokeGen = () => {
  const [joke, setJoke] = useState<jokes>({});
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      // console.log("Response", response);
      setJoke(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("response", joke);

  return (
    <>
      <div className="w-screen h-screen bg-gray-300 flex justify-center items-center">
        <div className="w-96 min-h-60 flex flex-col justify-center items-center gap-4 
                  bg-gradient-to-r from-green-200 via-teal-400 to-cyan-600 
                  rounded-2xl shadow-2xl p-6 text-center text-black">
          <p className="text-lg font-semibold">Setup:</p>
          <p className="text-base">{joke.setup}</p>

          <p className="text-lg font-semibold">Punchline:</p>
          <p className="text-base">{joke.punchline}</p>
          

          <button onClick={fetchData}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md 
                 hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            New Joke
          </button>
        </div>
      </div>

    </>
  );
};

export default JokeGen;
