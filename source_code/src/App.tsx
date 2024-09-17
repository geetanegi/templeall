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
      path: ROUTES.STRIPE,
      element: <AuthStructure />,
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
      path: "*",
      element: <NoFound />,
    },
  ]);

  return routes;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token && isLogin && location.pathname !== ROUTES.DASHBOARD) {
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
      </Suspense>
    </>
  );
}

export default App;
