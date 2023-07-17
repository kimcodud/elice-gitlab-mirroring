import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import { Suspense, lazy } from "react";
import axios from "axios";

const Router = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
  const LoginPage = lazy(() => import("../pages/MainPage/MainPage"));
  const SignUpPage = lazy(() => import("../pages/MainPage/MainPage"));
  const Mypage = lazy(() => import("../pages/Mypage/Mypage"));
  const TravelWritePage = lazy(() =>
    import("../pages/TravelWritePage/TravelWritePage")
  );
  const TravelPostDetailPage = lazy(() =>
    import("../pages/TravelPostDetailPage/TravelPostDetailPage")
  );
  const TravelPostEditPage = lazy(() =>
    import("../pages/TravelPostEditPage/TravelPostEditPage")
  );
  const PlannerMapPage = lazy(() =>
    import("../pages/PlannerMapPage/PlannerMapPage")
  );
  const PlannerEditPage = lazy(() =>
    import("../pages/PlannerEditPage/PlannerEditPage")
  );
  const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
  const TravelBoardPage = lazy(() =>
    import("../pages/TravelBoardPage/TravelBoardPage")
  );

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
    <Suspense fallback={<div>page loading....</div>}>
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
            <Route path="/plannerMap/:id" element={<PlannerMapPage />} />
            <Route path="/plannerMap" element={<PlannerMapPage />} />
            <Route path="/travelPlan/:id" element={<PlannerEditPage />} />
          </>
        )}
        {isAdmin && <Route path="/admin" element={<AdminPage />} />}

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
