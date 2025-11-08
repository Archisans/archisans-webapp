import { Routes, Route } from "react-router-dom";
import { RouteProvider } from "./config/RouteProvider";
import { useUser } from "./context/UserContext";
import { useBootstrapConfiguration } from "./hooks/useBootstrapConfiguration";

import ScrollToTop from "@/utils/ScrollToTop/ScrollToTop";
import AppLayout from "./layouts/AppLayout";
import SplashScreen from "./components/SplashScreen";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import icon from "@/assets/Images/Archi.png";

// Pages - User
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import Services from "./pages/services/Services";
import Workers from "./pages/workers/Workers";
import WorkerInfo from "./pages/worker/info/WorkerInfo";
import SavedAddress from "./pages/address/saved/Address";
import AddAddress from "./pages/address/AddAddress";
import Profile from "./pages/profile/Profile";
import Bookings from "./pages/bookings/Bookings";
import Info from "./pages/bookings/info";
import Settings from "./pages/settings/Settings";
import Notification from "./pages/settings/notification/Notification";
import Premium from "./pages/premium/Premium";
import Support from "./pages/support/Support";
import Terms from "./pages/terms/Terms";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy";
import About from "./pages/about/About";
import SavedWorker from "./pages/savedworkers/SavedWorker";

// Pages - Worker
import Worker from "./pages/worker/Worker";
import WorkerRegister from "./pages/worker/register/WorkerRegister";
import AssignedWorks from "./pages/worker/assigned/works/AssignedWorks";
import WorkerWorkInfo from "./pages/worker/work/info/WorkerWorkInfo";
import WorkerProfile from "./pages/worker/profile/WorkerProfile";
import WorkerPortfolio from "./pages/worker/protfolio/WorkerPortfolio";
import WorkerAvailability from "./pages/worker/availability/WorkerAvailability";
import ServiceDetails from "./pages/worker/service/details/ServiceDetails";

// Error pages
import NotFound from "@/error/404/NotFound";
import ServerError from "@/error/500/ServerError";
import AccessDenied from "@/error/403/AccessDenied";

function App() {
  const { isLoading: configLoading, hasError } = useBootstrapConfiguration();
  const { loading: userLoading } = useUser();

  if (userLoading || configLoading || hasError) {
    return (
      <SplashScreen
        logo={<img src={icon} alt="App Logo" width={150} height={150} />}
      />
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path={RouteProvider.USER_HOME} element={<Home />} />
          <Route path={RouteProvider.USER_SEARCH} element={<Search />} />
          <Route path={RouteProvider.USER_SERVICES} element={<Services />} />
          <Route path={RouteProvider.USER_SERVICES_ALL} element={<Services />} />
          <Route path={RouteProvider.USER_SETTINGS} element={<Settings />} />
          <Route path={RouteProvider.USER_PREMIUM} element={<Premium />} />
          <Route path={RouteProvider.USER_SUPPORT} element={<Support />} />
          <Route path={RouteProvider.USER_TERMS} element={<Terms />} />
          <Route
            path={RouteProvider.USER_PRIVACY_POLICY}
            element={<PrivacyPolicy />}
          />
          <Route path={RouteProvider.USER_ABOUT} element={<About />} />
          <Route path={RouteProvider.USER_WORKER_INFO} element={<WorkerInfo />} />
          <Route
            path={RouteProvider.USER_WORKER_SEARCH}
            element={<Workers />}
          />

          {/* Protected Routes */}
          <Route
            path={RouteProvider.USER_ADDRESS_SAVED}
            element={
              <ProtectedRoute>
                <SavedAddress />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_BOOKINGS}
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_BOOKINGS_INFO}
            element={
              <ProtectedRoute>
                <Info />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_SETTINGS_NOTIFICATION}
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_REGISTER}
            element={
              <ProtectedRoute>
                <WorkerRegister />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_HOME}
            element={
              <ProtectedRoute>
                <Worker />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_ASSIGNED_WORKS}
            element={
              <ProtectedRoute>
                <AssignedWorks />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_WORK_INFO}
            element={
              <ProtectedRoute>
                <WorkerWorkInfo />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_PROFILE}
            element={
              <ProtectedRoute>
                <WorkerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_PORTFOLIO}
            element={
              <ProtectedRoute>
                <WorkerPortfolio />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_AVAILABILITY}
            element={
              <ProtectedRoute>
                <WorkerAvailability />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.WORKER_SERVICE_DETAILS}
            element={
              <ProtectedRoute>
                <ServiceDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_ADDRESS_ADD}
            element={
              <ProtectedRoute>
                <AddAddress />
              </ProtectedRoute>
            }
          />

          <Route
            path={RouteProvider.USER_SAVED_WORKERS}
            element={
              <ProtectedRoute>
                <SavedWorker />
              </ProtectedRoute>
            }
          />

          {/* Error Pages */}
          <Route path={RouteProvider.ERROR_404} element={<NotFound />} />
          <Route path={RouteProvider.ERROR_403} element={<AccessDenied />} />
          <Route path={RouteProvider.ERROR_500} element={<ServerError />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
