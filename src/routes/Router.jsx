import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SigUpPage/SignUpPage";
import TravelBoardPage from "../pages/TravelBoardPage/TravelBoardPage";
import Mypage from "../pages/Mypage/Mypage";
import TravelWritePage from "../pages/TravelWritePage/TravelWritePage";
import TravelPostDetailPage from "../pages/TravelPostDetailPage/TravelPostDetailPage";
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
    const result = await axios.get("http://localhost:3000/mypage", {
      withCredentials: true,
    });
    console.log(result.data.userData.role);
    if (result.data.userData.role === "ADMIN") {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "1") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    getUserData();
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
          <Route path="/travelWritePage" element={<TravelWritePage />} />
          <Route
            path="/TravelPostDetailPage/:postId"
            element={<TravelPostDetailPage />}
          />
          <Route path="/plannerMap" element={<PlannerMap />} />
          <Route path="/plannerEdit" element={<PlannerEditPage />} />
        </>
      )}
      {isAdmin && <Route path="/admin" element={<AdminPage />} />}

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default Router;
