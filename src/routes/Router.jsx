import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SigUpPage/SignUpPage";
import TravelBoardPage from "../pages/TravelBoardPage/TravelBoardPage";
import Mypage from "../pages/Mypage/Mypage";
import TravelWritePage from "../pages/TravelWritePage/TravelWritePage";
import TravelPostDetailPage from "../pages/TravelPostDetailPage/TravelPostDetailPage";

import PlannerMap from "../components/PlannerMap/PlannerMap";
import PlannerMapEdit from "../components/PlannerMapEdit/PlannerMapEdit";
import AdminPage from "../pages/AdminPage/AdminPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/travelBoard" element={<TravelBoardPage />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/travelWritePage" element={<TravelWritePage />} />
        <Route
          path="/travelPostDetailPage"
          element={<TravelPostDetailPage />}
        />
        <Route path="/plannerMap" element={<PlannerMap />} />
        <Route path="/plannerMapEdit" element={<PlannerMapEdit />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
