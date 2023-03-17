import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Calcul from "@/pages/Calcul";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/calcul",
    element: <Calcul />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
