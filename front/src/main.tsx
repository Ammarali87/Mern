import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Categories from "./pages/Categories.tsx";
import CartPage from "./pages/CartPage.tsx";
import { StoreProvider } from "./Store.tsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "products/:id", element: <ProductPage/> },
      { path: "categories", element: <Categories/> },
      { path: "signUp", element: <SignUp/> },
      { path: "signIn", element: <SignIn/> },
      { path: "cart", element: <CartPage/> },
    ],
  },
  {
    path: "/dashboard",
    element: <h1>Dashboard</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
    <StoreProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </StoreProvider>
    </HelmetProvider>
  </StrictMode>
);
