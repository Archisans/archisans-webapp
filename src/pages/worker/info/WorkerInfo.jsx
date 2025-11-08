import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useFetchWorkerByPhoneNumber } from "@/hooks/useFetchWorkerByPhone";
import MobWorkerpage from "@/features/Worker/Mobile/Workerpage";
import DesktopWorkerPage from "@/features/Worker/WorkerPage";
import { PageLoader } from "@/components/PageLoader";

export default function WorkerInfo() {
  const { phoneNumber } = useParams();
  const { worker, loading } = useFetchWorkerByPhoneNumber(`+91${phoneNumber}`);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  if (loading) return <PageLoader />;

  return (
    <div>
      {isMobile ? (
        <MobWorkerpage worker={worker} />
      ) : (
        <DesktopWorkerPage worker={worker} />
      )}
    </div>
  );
}
