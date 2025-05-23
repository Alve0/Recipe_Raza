import { createBrowserRouter } from "react-router";

import Error from "../Pages/Error";
import Home from "../Pages/Home";
import AddRecipe from "../Pages/AddRecipe";
import Login from "../Components/login_reginster/Login";
import Register from "../Components/login_reginster/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import MyRecipes from "../Pages/MyRecipes";
import RecipeDetails from "../Pages/RecipeDetails";
import Update from "../Pages/Update";
import AllPage from "../Pages/AllPage";

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
      {
        path: "/my-recipe/:id",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe-details/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        Component: Update,
      },
      {
        path: "/all-recipe",
        Component: AllPage,
      },
    ],
  },
]);

export default router;
