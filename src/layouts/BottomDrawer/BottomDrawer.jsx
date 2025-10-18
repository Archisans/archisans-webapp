import { Close } from "@mui/icons-material";
import { Box, Button, Drawer, Grid } from "@mui/material";

export default function BottomDrawerLayout({
  children,
  open,
  setOpen,
  sx,
  height,
  headerBar = true,
  closeIcon = true,
  borderRadius,
}) {
  const handleOpen = (toggleOpen) => {
    setOpen(toggleOpen);
  };

  return (
    <>
      {closeIcon && open && (
        <Box
          sx={{
            height: "40px",
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            color: "lightgrey",
            bgcolor: "rgba(39, 39, 39, 0.37)",
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: height
              ? `calc(${height} + 10px)` 
              : "calc(74vh + 10px)",
            zIndex: 2001,
          }}
          onClick={() => handleOpen(false)}
        >
          <Close sx={{ fontSize: "20px" }} />
        </Box>
      )}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => handleOpen(false)}
        hideBackdrop={false}
        slotProps={{
          paper: {
            sx: {
              height: height ?? "74vh",
              width: "100%",
              borderRadius: borderRadius ?? "22px 22px 0px 0px",
              overflow: "hidden",
            },
          },
        }}
      >
        <Close
          sx={{
            fontSize: "20px",
            borderRadius: "50px",
            position: "fixed",
            bgcolor: "lightgrey",
            left: 20,
            top: -20,
            zIndex: 2000,
          }}
          onClick={() => handleOpen(false)}
        />
        <Box
          width="100%"
          height="100%"
          sx={{
            overflow: "hidden",
            bgcolor: "white",
            position: "relative",
            ...sx,
          }}
          pt={2}
        >
          {headerBar && (
            <Box
              sx={{
                height: "6px",
                width: "70px",
                bgcolor: "lightgrey",
                borderRadius: "50px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              onClick={() => handleOpen(false)}
            />
          )}
          <Box
            sx={{
              height: "100%",
              position: "relative",
              overflow: "auto",
              scrollbarWidth: "none",
            }}
            m={2}
          >
            {children}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
