import { createBrowserRouter } from "react-router";

import Error from "../Pages/Error";
import Home from "../Pages/Home";
import AddRecipe from "../Pages/AddRecipe";
import Login from "../Components/login_reginster/Login";
import Register from "../Components/login_reginster/Register";
import PrivateRoute from "../Provider/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    Component: Home,
    children: [
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
