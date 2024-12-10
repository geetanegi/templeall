import { Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute";
import { ROUTES } from "./utils/routesPath";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Nav from "./Nav";
import NoFound from "./pages/NoFound";
import CoursePanel from "./components/AdminPanel/courses/CoursePanel";
import ProfileComponent from "./components/ProfileComponents/ProfileComponent";
import Contests from "./pages/Contests";
import MediaManagement from "./components/MediaManagement/MediaManagement";
import CreateContest from "./pages/CreateContest";
import ContestList from "./pages/ContestList";
import Checkout from "./pages/Checkout";
import PaymentSuccessCard from "./components/SuccessCart";
import Footer from "./Footer";
import ContestsWrapper from "./pages/ContestsWrapper";
import ExternalTC from "./pages/ExternalTC";
import ExternalPrivacyPolicy from "./pages/ExternalPrivacyPolicy";
import TestComp from "./TestComp";

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthStructure = lazy(() => import("./pages/AuthStructure"));

const SuspenseLoading = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center py-12 text-center">
        <div className="flex flex-col px-4">
          <PropagateLoader color={"#5383ff"} loading={true} />
        </div>
      </div>
    </>
  );
};

function AppRoutes() {
  const routes = useRoutes([
    {
      path: ROUTES.LOGIN,
      element: <AuthStructure />,
    },
    {
      path: ROUTES.SIGNUP,
      element: <AuthStructure />,
    },
    {
      path: ROUTES.RESET_PASSWORD,
      element: <AuthStructure />,
    },
    {
      path: ROUTES.FORGET_PASSWORD,
      element: <AuthStructure />,
    },
    {
      path: ROUTES.USER_REGISTRATION,
      element: <AuthStructure />,
    },
    {
      path: ROUTES.ExternalTC,
      element: <ExternalTC />,
    },
    {
      path: ROUTES.ExternalPrivacyPolicy,
      element: <ExternalPrivacyPolicy />,
    },
    {
      path: "/test",
      element: <TestComp />,
    },
    {
      path: "/test",
      element: <TestComp />,
    },
    {
      path: "/test",
      element: <TestComp />,
    },
    {
      path: ROUTES.USERS,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.DASHBOARD,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.CONTESTS,
      element: (
        <PrivateRoute>
          <ContestsWrapper />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.CREATE_CONTEST,
      element: (
        <PrivateRoute>
          <CreateContest />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.UPDFATE_CONTEST,
      element: (
        <PrivateRoute>
          <Contests />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.PROFILE,
      element: (
        <PrivateRoute>
          <ProfileComponent />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.COMMUNITY,
      element: (
        <PrivateRoute>
          <ProfileComponent isCommunitySearch={true} />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.MEDIA,
      element: (
        <PrivateRoute>
          <MediaManagement />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.GENERATE_QR,
      element: (
        <PrivateRoute>
          <CoursePanel />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.CONTEST_LIST,
      element: (
        <PrivateRoute>
          <ContestList />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.CHECKOUT,
      element: (
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.PAYMENT_SUCCESS,
      element: (
        <PrivateRoute>
          <PaymentSuccessCard />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <NoFound />,
    },
    {
      path: "*",
      element: <NoFound />,
    },
  ]);

  return routes;
}
function App() {
  const location = useLocation();
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (token && isLogin && location.pathname === ROUTES.LOGIN) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [token, isLogin, navigate, location.pathname]);

  return (
    <>
      {[
        ROUTES.LOGIN,
        ROUTES.SIGNUP,
        ROUTES.FORGET_PASSWORD,
        ROUTES.RESET_PASSWORD,
        ROUTES.ExternalTC,
        ROUTES.ExternalPrivacyPolicy
      ].includes(location.pathname) ||
        (isLogin && <Nav />)}

      <Suspense fallback={<SuspenseLoading />}>
        <AppRoutes />
        <ToastContainer
          draggable={true}
          pauseOnHover={true}
          autoClose={3000}
          position="top-right"
          theme="light"
        />
        {[
          ROUTES.LOGIN,
          ROUTES.SIGNUP,
          ROUTES.FORGET_PASSWORD,
          ROUTES.RESET_PASSWORD,
        ].includes(location.pathname) ||
          (isLogin && <Footer />)}
      </Suspense>
    </>
  );
}

export default App;
