import React, { useEffect } from "react";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import SearchMobile from "@/features/Search/Mobile/Search";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook

export default function Search() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate("/"); // ✅ redirect desktop users to home
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
