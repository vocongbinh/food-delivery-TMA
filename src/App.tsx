import "./App.css";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import OrderPage from "./pages/order";
import { createBrowserRouter } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/order",
      element: <OrderPage />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
