import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobPortfolio from "@/features/WorkerPage/Mobile/Portfolio/Portfolio";
import DesktopPortfolio from "@/features/WorkerPage/Portfolio/Portfolio";

export default function WorkerPortfolio() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobPortfolio /> : <DesktopPortfolio />}</div>;
}
