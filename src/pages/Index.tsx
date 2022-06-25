import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { TbMathSymbols, TbWriting } from "react-icons/tb"
import { Link } from "react-router-dom"
import StatsType from "../types/Stats"

function Index() {
   const [data, setData] = useState<StatsType | null>(null)
   const [calculAverageTime, setCalculAverageTime] = useState<number>(0)
   const [writingAverageTime, setWritingAverageTime] = useState<number>(0)
   useEffect(() => {
      invoke("get_data").then((data: any) => {
         setData(data)
      })

      invoke("get_average_time", {
         to: "calcul"
      }).then((data: any) => {
         setCalculAverageTime(data)
      })

      invoke("get_average_time", {
         to: "writing"
      }).then((data: any) => {
         setWritingAverageTime(data)
      })
   }, [])

   return (
      <div className="flex flex-col justify-center items-center h-screen space-y-10">
         <div className="flex space-x-2">
            <Link to="/math" className="flex justify-center items-center border border-zinc-700 rounded p-4 transition-all duration-1000 hover:shadow-2xl hover:cursor-pointer hover:p-8">
               <TbMathSymbols className="w-5 h-5 text-white"/>
            </Link>

            <div className="flex justify-center items-center border border-zinc-700 rounded p-4 transition-all duration-1000 hover:shadow-2xl hover:cursor-pointer hover:p-8">
               <TbWriting className="w-5 h-5 text-white"/>
            </div>
         </div>

         <div className="space-y-2">
            <div className="flex justify-center items-center border border-zinc-700 rounded p-2 px-4 space-x-4">
               <TbMathSymbols className="w-5 h-5 text-white"/>

               <div>
                  <h1 className="text-white font-mono">Number of successes: { data?.calcul.number_of_successes }</h1>
                  <h1 className="text-white font-mono">Number of defeats: { data?.calcul.number_of_defeats }</h1>
                  <h1 className="text-white font-mono">Average time: { calculAverageTime.toFixed(2) } seconds</h1>
               </div>
            </div>

            <div className="flex justify-center items-center border border-zinc-700 rounded p-2 px-4 space-x-4">
               <TbWriting className="w-5 h-5 text-white"/>

               <div>
                  <h1 className="text-white font-mono">Number of successes: { data?.writing.number_of_successes }</h1>
                  <h1 className="text-white font-mono">Number of defeats: { data?.writing.number_of_defeats }</h1>
                  <h1 className="text-white font-mono">Average time: { writingAverageTime.toFixed(2) } seconds</h1>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Index