import React from "react";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import HomeMobile from "@/features/Home/Mobile/Home";
import HomeDesktop from "@/features/Home/Home";

export default function Home() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  return (
    <div>
      {isMobile ? (
        <HomeMobile bootstrapConfiguration={bootstrapConfiguration} />
      ) : (
        <HomeDesktop bootstrapConfiguration={bootstrapConfiguration} />
      )}
    </div>
  );
}
