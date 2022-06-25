import { TbMathSymbols, TbWriting } from "react-icons/tb"
import { Link } from "react-router-dom"

function Index() {
   return (
      <div className="flex justify-center items-center h-screen">
         <div className="flex space-x-2">
            <Link to="/math" className="flex justify-center items-center border border-zinc-700 rounded p-4 transition-all duration-1000 hover:shadow-2xl hover:cursor-pointer hover:p-8">
               <TbMathSymbols className="w-5 h-5 text-white"/>
            </Link>

            <div className="flex justify-center items-center border border-zinc-700 rounded p-4 transition-all duration-1000 hover:shadow-2xl hover:cursor-pointer hover:p-8">
               <TbWriting className="w-5 h-5 text-white"/>
            </div>
         </div>
      </div>
   )
}

export default Index