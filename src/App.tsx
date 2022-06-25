import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Math from "./pages/Math"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/math" element={<Math />} />
      </Routes>
    </div>
  )
}

export default App
