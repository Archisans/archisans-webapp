import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import SearchMobile from "@/features/Search/Mobile/Search";

export default function Search() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate("/", { state: { focusSearch: true } });
    }
  }, [isMobile, navigate]);

  return (
    <div>
      {isMobile && (
        <SearchMobile bootstrapConfiguration={bootstrapConfiguration} />
      )}
    </div>
  );
}
