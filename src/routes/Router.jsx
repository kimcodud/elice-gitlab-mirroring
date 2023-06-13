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

const Router = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("role")) {
      setIsLogin(true);
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
        </>
      )}
      {isLogin && (
        <>
          <Route path="/travelBoard" element={<TravelBoardPage />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/travelWritePage" element={<TravelWritePage />} />
          <Route path="/travelWritePage" element={<TravelWritePage />} />
          <Route
            path="/TravelPostDetailPage/:postId"
            element={<TravelPostDetailPage />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/plannerMap" element={<PlannerMap />} />
          <Route path="/plannerEdit" element={<PlannerEditPage />} />
        </>
      )}

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default Router;
