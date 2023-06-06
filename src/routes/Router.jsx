import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SigUpPage/SignUpPage';
import TravelBoardPage from '../pages/TravelBoardPage/TravelBoardPage';
import PlannerMap from '../components/PlannerMap/PlannerMap';
import PlannerMapEdit from '../components/PlannerMapEdit/PlannerMapEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/travelBoard" element={<TravelBoardPage />} />
        <Route path="/plannerMap" element={<PlannerMap />} />
        <Route path="/plannerMapEdit" element={<PlannerMapEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
