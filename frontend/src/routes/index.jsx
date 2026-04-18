import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import PageNotFound from "../PageNotFound.jsx";
import ProtectedRoutes from "../ProtectedRoutes.jsx";
import AddFoodItem from "../pages/AddFoodItem.jsx";
import Contact from "../components/Contact.jsx";
import CheckOut from "../pages/CheckOut.jsx";
import OrderPlaced from "../pages/OrderPlaced.jsx";
import MyOrder from "../pages/MyOrder.jsx";
import Items from "../components/items.jsx";
import About from "../components/About.jsx";
import MyLikes from '../pages/MyLikes.jsx';
import Cart from '../pages/Cart.jsx'
import OwnerDashboard from "../components/OwnerDashboard.jsx";
import UserDashboard from "../pages/Userdashboard.jsx";
import Home from "../components/Home.jsx";
export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "",
            element: <UserDashboard />,
            children: [
              {
                index: true,
                element: <Home />
              },
              {
                path: "contact",
                element: <Contact />,
              },
              {
                path: "items",
                element: <Items />,
              },
              {
                path: "about",
                element: <About />,
              },
            ]
          },
          {
            path: "admin-dashboard",
            element: <OwnerDashboard />,
          },
          {
            path: "checkOut",
            element: <CheckOut />,
          },
          {
            path: "add-item",
            element: <AddFoodItem />,
          },
          {
            path: 'order-place',
            element: <OrderPlaced />
          },
          {
            path: "my-orders",
            element: <MyOrder />
          },
          {
            path: "likes",
            element: <MyLikes />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "edit-item/:id",
            element: <AddFoodItem />,
          },

        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
