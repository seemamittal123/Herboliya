import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./hooks/useCurrentUser";
import useGetItems from "./hooks/useGetItems";
import useGetMyOrder from "./hooks/useGetMyOrder";
import useGetLike from "./hooks/useGetLike";

export const serverUrl = "https://herboliya-1.onrender.com";

const App = () => {
  useCurrentUser();
  useGetLike();
  useGetMyOrder();
  useGetItems();
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default App;
