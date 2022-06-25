import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Math() {
   const [calculInstruction, setCalculInstruction] = useState("")
   const [calculIsValidated, setCalculIsValidated] = useState<null | Boolean>(null)
   const [correctCalculResponse, setCorrectCalculResponse] = useState<null | String>(null)
   const [calculTime, setCalculTime] = useState<number>(Date.now())
   const [calcul, setCalcul] = useState("")
   useEffect(() => {
      invoke("random_calcul").then((data: any) => {
         setCalculInstruction(data)
      })
   }, [])

   const newChallenge = () => {
      invoke("random_calcul").then((data: any) => {
         setCalculInstruction(data)
         setCalculIsValidated(null)
         setCalcul("")
      })
   }

   return (
      <div className="flex flex-col justify-center items-center h-screen">
         { calculIsValidated ? (
            <>
               <h1 className="text-white font-mono">The result is <span className="text-green-700">correct</span>.</h1>

               <div className="flex space-x-2">
                  <button onClick={newChallenge} className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-mono p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8">
                     New challenge
                  </button>

                  <Link to="/" className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-mono p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8">
                     Back to index
                  </Link>
               </div>
            </>
         ) : calculIsValidated === false ? (
            <>
               <h1 className="text-white font-mono">The result is <span className="text-red-700">incorrect</span>.</h1>
               <h1 className="text-white font-mono">The answer was <span className="text-green-700">{ correctCalculResponse }</span>.</h1>

               <div className="flex space-x-2">
                  <button onClick={newChallenge} className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-mono p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8">
                     New challenge
                  </button>

                  <Link to="/" className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-mono p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8">
                     Back to index
                  </Link>
               </div>
            </>
         ) : (
            <>
               <h1 className="text-white font-mono">{ calculInstruction }</h1>

               <input onChange={(e: any) => {
                  setCalcul(e.target.value)
               }} className="bg-zinc-800/50 border border-zinc-700 rounded focus:outline-0 text-white font-mono p-1" type="text"/>

               <button onClick={() => {
                  invoke("validate_calcul", {
                     calcul: calcul,
                     time: (Date.now() - calculTime) / 1000
                  }).then((data: any) => {
                     setCalculIsValidated(data[0])
                     setCorrectCalculResponse(data[1])
                  })
               }} className="bg-zinc-800/50 border border-zinc-700 rounded text-white font-mono p-1 px-4 mt-4 transition-all duration-1000 hover:shadow-2xl hover:p-2 hover:px-8">
                  Send
               </button>
            </>
         )}
      </div>
   )
}

export default Math