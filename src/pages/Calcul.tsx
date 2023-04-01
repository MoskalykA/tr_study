import { CalculResponse } from "@/types/CalculResponse";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Calcul() {
  const [drawResponse, setDrawResponse] = useState<boolean>(false);
  const [instruction, setInstruction] = useState<string>("");
  const [calcul, setCalcul] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
  const [correction, setCorrection] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    invoke<string>("random_calcul").then((data: string) => {
      setInstruction(data);
    });
  }, []);

  const newChallenge = (): void => {
    invoke<string>("random_calcul").then((data: string) => {
      setDrawResponse(false);
      setInstruction(data);
      setCalcul("");
      setCorrectAnswer(false);
      setCorrection("");
      setTime(0);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {drawResponse ? (
        <>
          <h1 className="text-white font-quicksand">
            The result is{" "}
            {correctAnswer ? (
              <span className="text-green-700">correct</span>
            ) : (
              <span className="text-red-700">incorrect</span>
            )}
            .
          </h1>

          {!correctAnswer && (
            <h1 className="text-white font-quicksand">
              The answer was{" "}
              <span className="text-green-700">{correction}</span>.
            </h1>
          )}

          <div className="flex space-x-2">
            <button
              onClick={newChallenge}
              className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-quicksand p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8"
            >
              New challenge
            </button>

            <Link
              to="/"
              className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-quicksand p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8"
            >
              Back to index
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white font-quicksand">{instruction}</h1>

          <input
            onChange={(e: any) => {
              setCalcul(e.target.value);

              if (time == 0) {
                setTime(new Date().getTime());
              }
            }}
            className="bg-zinc-800/50 border border-zinc-700 rounded focus:outline-0 text-white font-quicksand p-1"
            type="text"
          />

          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (time == 0) {
                  newChallenge();
                } else {
                  invoke<CalculResponse>("validate_calcul", {
                    calcul: calcul,
                    time: (new Date().getTime() - time) / 1000,
                  }).then((data: CalculResponse) => {
                    setDrawResponse(true);
                    setCorrectAnswer(data.correctAnswer);
                    setCorrection(data.correction);
                  });
                }
              }}
              className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-quicksand p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8"
            >
              My answer is correct?
            </button>

            <Link
              to="/"
              className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-quicksand p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8"
            >
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Calcul;
