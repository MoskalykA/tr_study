import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Calcul from "./pages/Calcul"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calcul" element={<Calcul />} />
      </Routes>
    </div>
  )
}

export default App
