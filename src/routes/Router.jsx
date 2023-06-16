import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SigUpPage/SignUpPage";
import TravelBoardPage from "../pages/TravelBoardPage/TravelBoardPage";
import Mypage from "../pages/Mypage/Mypage";
import TravelWritePage from "../pages/TravelWritePage/TravelWritePage";
import TravelPostDetailPage from "../pages/TravelPostDetailPage/TravelPostDetailPage";
import TravelPostEditPage from "../pages/TravelPostEditPage/TravelPostEditPage";
import PlannerMap from "../components/PlannerMap/PlannerMap";
import PlannerEditPage from "../pages/PlannerEditPage/PlannerEditPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import { useEffect, useState } from "react";
import axios from "axios";

const Router = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const getUserData = async () => {
    const apiUrl =
      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
        ? import.meta.env.VITE_APP_API_DEV_URL
        : import.meta.env.VITE_APP_API_PROD_URL;
    const result = await axios.get(`${apiUrl}/mypage`, {
      withCredentials: true,
    });
    if (result.data.userData.role === "ADMIN") {
      setIsAdmin(true);
    } else if (result.status === 500) {
      localStorage.removeItem("isLogin");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "1") {
      setIsLogin(true);
      getUserData();
    } else {
      setIsLogin(false);
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} exact />
      {!isLogin && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/TravelPostDetailPage/:postId"
            element={<TravelPostDetailPage />}
          />
          <Route path="/travelBoard" element={<TravelBoardPage />} />
        </>
      )}
      {isLogin && (
        <>
          <Route path="/travelBoard" element={<TravelBoardPage />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route
            path="/travelWritePage/:postId"
            element={<TravelWritePage />}
          />
          <Route
            path="/travelEditPage/:postId"
            element={<TravelPostEditPage />}
          />
          <Route
            path="/TravelPostDetailPage/:postId"
            element={<TravelPostDetailPage />}
          />
          <Route path="/plannerMap/:id" element={<PlannerMap />} />
          <Route path="/plannerMap" element={<PlannerMap />} />
          <Route path="/travelPlan/:id" element={<PlannerEditPage />} />
        </>
      )}
      {isAdmin && <Route path="/admin" element={<AdminPage />} />}

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default Router;
