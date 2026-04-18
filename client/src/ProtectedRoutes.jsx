import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";

const ProtectedRoutes = () => {
  const { userData, loading } = useSelector((state) => state.user);
  if (loading) {
    return (
      <div className="spinner">
        <HashLoader color="#7cc242" size={30} />
      </div>
    );
  }

  return userData ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoutes;
