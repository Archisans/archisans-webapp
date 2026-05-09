import React from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobMigrantWorkersForm from "@/features/MigrantWorkers/Mobile/mobMigrantWorkers";
import MigrantWorkersForm from "@/features/Home/Components/MigrantWorkersSection";

export default function MigrantWorkers() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  if (isMobile) {
    return <MobMigrantWorkersForm />;
  }

  return (
    <MigrantWorkersForm
      open={true}
      onClose={handleClose}
    />
  );
}

