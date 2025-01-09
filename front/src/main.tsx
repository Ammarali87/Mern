import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";
import { Provider } from 'react-redux';
import store from './store/store';

// Create a QueryClient for React Query
const queryClient = new QueryClient();

// Define routes with reduced code size
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,  // Directly use the HomePage as root route element
  },
  {
    path: "/dashboard",
    element: <h1>Dashboard</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
