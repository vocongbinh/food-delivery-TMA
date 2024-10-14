import "./App.css";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import OrderPage from "./pages/order";
import { createBrowserRouter } from "react-router-dom";
import CheckoutPage from "./pages/checkout";

// import Layout from "./layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/order",
      element: <OrderPage />
    },
    {
      path: "/checkout",
      element: <CheckoutPage />
    },
  ], 
  {
    basename: "/food-delivery-TMA"
  }
)
  return (
    <RouterProvider router={router} />
  );
}

export default App;
