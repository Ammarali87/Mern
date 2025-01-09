import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";
import { Provider } from 'react-redux';
import store from "./store/store.ts";
import ProdcutPage from "./pages/ProdcutPage.tsx";

const queryClient = new QueryClient();

// Define routes with reduced code size
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> } ,
      { path: "product", element: <ProdcutPage /> }
      // { path: "/", element: <HomePage /> }
      // { path: "/", element: <HomePage /> }
    
    ],
  },
  {
    path:"/dashboard",
    element: <h1>Dashboard</h1>,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
