import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useUser } from "@/context/UserContext";
import { useWorker } from "@/context/WorkerContext";
import { PageLoader } from "@/components/PageLoader";
import MobWorkerDashboard from "@/features/WorkerPage/Mobile/WorkerDashboard/WorkerDashboard";
import DesktopWorkerDashboard from "@/features/WorkerPage/WorkerDashboard/WorkerDashboard";
import { RouteProvider } from "@/config/RouteProvider";
import { useEffect } from "react";

export default function Worker() {
  const { isWorker } = useUser();
  const { worker, loading } = useWorker();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  useEffect(() => {
    if (!isWorker) {
      navigate(RouteProvider.WORKER_REGISTER)
    }
  }, [isWorker]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {isMobile ? (
        <MobWorkerDashboard worker={worker} />
      ) : (
        <DesktopWorkerDashboard worker={worker} />
      )}
    </div>
  );
}
