import { Outlet } from "react-router-dom";
import Footer from "../components/footer.jsx";
import Header from "../components/Header.jsx";
import { serverUrl } from "../App.jsx";
const UserDashboard = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserDashboard;
