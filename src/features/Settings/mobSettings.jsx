import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  styled,
} from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";

// iOS-style Switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const MobSettings = () => {
  return (
    <Grid sx={{ overflow: "hidden" }}>
      <MobHeading Heading="Settings" />
      <Box mt={-3}>
        <List>
          {[
            "Notifications",
            "Push Notifications",
            "Offers & Announcements",
            "Recieve Security Alerts",
            "Change Password",
          ].map((label, index) => (
            <ListItem
              disablePadding
              sx={{ borderBottom: "0.5px solid #e0e0e0" }}
              key={index}
            >
              <ListItemButton sx={{ py: 2 }}>
                <ListItemText
                  primary={label}
                  secondary={
                    label === "Notifications" ? "via email and whatsapp" : null
                  }
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#434966"
                      },
                      variant: "body2",
                    },
                    secondary: {
                      sx: {
                        fontSize: "13px",
                        mt: 0.5,
                      },
                    },
                  }}
                />
                {label !== "Change Password" && <IOSSwitch />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  );
};

export default MobSettings;
