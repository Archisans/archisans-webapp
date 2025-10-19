import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop/ScrollToTop";
import AppLayout from "./layouts/AppLayout";
import { RouteProvider } from "./config/RouteProvider";
import Home from "./pages/Home";
import SavedAddress from "./pages/address/saved/Address";
import Profile from "./pages/profile/Profile";
import Bookings from "./pages/bookings/Bookings";
import Info from "./pages/bookings/info";
import Services from "./pages/services/Services";
import Settings from "./pages/settings/Settings";
import Premium from "./pages/premium/Premium";
import Support from "./pages/support/Support";
import Terms from "./pages/terms/Terms";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy";
import About from "./pages/about/About";
import WorkerInfo from "./pages/worker/WorkerInfo";
import ChatSupport from "./pages/support/chat/ChatSupport";
import WorkerSearch from "./pages/worker/search/WokerSearch";
import WorkerHome from "./pages/worker/home/WorkerHome";
import AssignedWorks from "./pages/worker/assigned/works/AssignedWorks";
import WorkerWorkInfo from "./pages/worker/work/info/WorkerWorkInfo";
import WorkerProfile from "./pages/worker/profile/WorkerProfile";
import WorkerPortfolio from "./pages/worker/protfolio/WorkerPortfolio";
import WorkerAvailability from "./pages/worker/availability/WorkerAvailability";
import ServiceDetails from "./pages/worker/service/details/ServiceDetails";
import AddAddress from "./pages/address/AddAddress";
import Notification from "./pages/settings/notification/Notification";
import { useBootstrapConfiguration } from "./hooks/useBootstrapConfiguration";
import SplashScreen from "./components/SplashScreen";
import Search from "./pages/search/Search";
import Workers from "./pages/workers/Workers";
import icon from "@/assets/Images/Archi.png";
import SavedWorker from "./pages/savedworkers/SavedWorker";
import WorkerRegister from "./pages/worker/register/WorkerRegister";
import { useUser } from "@clerk/clerk-react";
import NotFound from "@/error/404/NotFound";
import ServerError from "@/error/500/ServerError";
import AccessDenied from "@/error/403/AccessDenied";

function App() {
  const { isLoading, hasError } = useBootstrapConfiguration();
  const { isLoaded } = useUser();

  if (isLoading || hasError || !isLoaded) {
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
          <Route path={RouteProvider.USER_HOME} element={<Home />} />
          <Route path={RouteProvider.USER_SEARCH} element={<Search />} />
          <Route path={RouteProvider.USER_SERVICES} element={<Services />} />
          <Route path={RouteProvider.USER_WORKERS} element={<Workers />} />
          <Route
            path={RouteProvider.USER_ADDRESS_SAVED}
            element={<SavedAddress />}
          />
          <Route path={RouteProvider.USER_PROFILE} element={<Profile />} />
          <Route path={RouteProvider.USER_BOOKINGS} element={<Bookings />} />
          <Route path={RouteProvider.USER_BOOKINGS_INFO} element={<Info />} />
          <Route
            path={RouteProvider.USER_SERVICES_ALL}
            element={<Services />}
          />
          <Route path={RouteProvider.USER_SETTINGS} element={<Settings />} />
          <Route
            path={RouteProvider.USER_SETTINGS_NOTIFICATION}
            element={<Notification />}
          />
          <Route path={RouteProvider.USER_PREMIUM} element={<Premium />} />
          <Route path={RouteProvider.USER_SUPPORT} element={<Support />} />
          <Route path={RouteProvider.USER_TERMS} element={<Terms />} />
          <Route path={RouteProvider.USER_PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={RouteProvider.USER_ABOUT} element={<About />} />
          <Route
            path={RouteProvider.USER_WORKER_INFO}
            element={<WorkerInfo />}
          />

          <Route
            path={RouteProvider.USER_SUPPORT_CHAT}
            element={<ChatSupport />}
          />

          <Route
            path={RouteProvider.USER_WORKER_SEARCH}
            element={<WorkerSearch />}
          />

          <Route
            path={RouteProvider.WORKER_REGISTER}
            element={<WorkerRegister />}
          />

          <Route path={RouteProvider.WORKER_HOME} element={<WorkerHome />} />

          <Route
            path={RouteProvider.WORKER_ASSIGNED_WORKS}
            element={<AssignedWorks />}
          />

          <Route
            path={RouteProvider.WORKER_WORK_INFO}
            element={<WorkerWorkInfo />}
          />

          <Route
            path={RouteProvider.WORKER_PROFILE}
            element={<WorkerProfile />}
          />

          <Route
            path={RouteProvider.WORKER_PORTFOLIO}
            element={<WorkerPortfolio />}
          />

          <Route
            path={RouteProvider.WORKER_AVAILABILITY}
            element={<WorkerAvailability />}
          />

          <Route
            path={RouteProvider.WORKER_SERVICE_DETAILS}
            element={<ServiceDetails />}
          />

          <Route
            path={RouteProvider.USER_ADDRESS_ADD}
            element={<AddAddress />}
          />
          <Route 
            path={RouteProvider.USER_SAVED_WORKERS}
             element={<SavedWorker />}
          />

          {/* Error pages */}
          <Route path={RouteProvider.ERROR_404} element={<NotFound />} />
          <Route path={RouteProvider.ERROR_403} element={<AccessDenied />} />
          <Route path={RouteProvider.ERROR_500} element={<ServerError />} />

          {/* Fallback for any unmatched URL */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
