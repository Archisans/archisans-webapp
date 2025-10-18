import React from "react";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import SearchMobile from "@/features/Search/Mobile/Search";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";

export default function Search() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  return (
    <div>
      {isMobile ? (
        <SearchMobile bootstrapConfiguration={bootstrapConfiguration} />
      ) : (
        <SearchMobile bootstrapConfiguration={bootstrapConfiguration} />
      )}
    </div>
  );
}
