import { useParams } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import { PageLoader } from "@/components/PageLoader";
import { useFetchWorkersBySlug } from "@/hooks/useFetchWorkersBySlug";
import MobileSearchWorker from "@/features/SearchWorker/Mobile/SearchWorker";
import DesktopSearchWorker from "@/features/SearchWorker/SearchWorker";

export default function Workers() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const { slug } = useParams();
  const { workers, loading, error } = useFetchWorkersBySlug(slug);

  if (loading || error) {
    return <PageLoader />;
  }

  return (
    <div>
      {isMobile ? (
        <MobileSearchWorker workers={workers} />
      ) : (
        <DesktopSearchWorker workers={workers} />
      )}
    </div>
  );
}
