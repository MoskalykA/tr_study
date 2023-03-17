import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { TbMathSymbols } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Stats } from "@/types/Stats";

function Index() {
  const [data, setData] = useState<Stats | null>(null);
  const [calculAverageTime, setCalculAverageTime] = useState<number>(0);
  useEffect(() => {
    invoke("get_data").then((data: any) => {
      setData(data);
    });

    invoke("get_average_time").then((data: any) => {
      setCalculAverageTime(data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
      <div className="flex space-x-2">
        <Link
          to="/calcul"
          className="flex justify-center items-center border border-zinc-700 rounded p-4 transition-all duration-1000 hover:shadow-2xl hover:cursor-pointer hover:p-8"
        >
          <TbMathSymbols className="w-5 h-5 text-white" />
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex justify-center items-center border border-zinc-700 rounded p-2 px-4 space-x-4">
          <TbMathSymbols className="w-5 h-5 text-white" />

          <div>
            <h1 className="text-white font-mono">
              Number of successes: {data?.numberOfDefeats}
            </h1>

            <h1 className="text-white font-mono">
              Number of defeats: {data?.numberOfSuccesses}
            </h1>

            <h1 className="text-white font-mono">
              Average time: {calculAverageTime.toFixed(2)} seconds
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
