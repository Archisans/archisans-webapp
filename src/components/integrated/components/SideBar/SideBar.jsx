import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PaymentIcon from "@mui/icons-material/Payment";
import MessageIcon from "@mui/icons-material/Message";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function SideBar() {
  return (
    <Box
      sx={{
        width: "14rem",
        paddingBottom: "1rem",
        height: "95vh",
        borderRadius: "20px",
      }}
    >
      <Box sx={{ py: 2, ml: 2, mb: 2 }}>
        <Paper
          elevation={5}
          sx={{
            px: 2,
            py: 0.5,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="Jane"
          />
          <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">Jane</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "0.6rem" }}
            >
              jane.doe@example.com
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: 210, pl: 1 }}>
        <List disablePadding dense>
          <Typography
            variant="body2"
            color="grey"
            sx={{ ml: 1.25, mb: 1, fontSize: "0.7rem" }}
          >
            {" "}
            Main Menu
          </Typography>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AccountCircle fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <HomeIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <NotificationsIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Notification"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <BookmarkIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Saved Workers"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <EventNoteIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Bookings"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <PaymentIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Payment"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <MessageIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Messages"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <ScheduleIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Schedule"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <Typography
            variant="body2"
            color="grey"
            sx={{ ml: 1.25, py: 1.5, fontSize: "0.75rem" }}
          >
            Preference
          </Typography>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <SettingsIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F1E6DD" },
                "&:hover .MuiListItemText-primary": { color: "black" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <HelpIcon fontSize="0.75rem" />
              </ListItemIcon>
              <ListItemText
                primary="Help & Support"
                slotProps={{
                  primary: {
                    sx: { color: "grey", fontSize: "0.8rem" },
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Card
        sx={{
          backgroundColor: "#B08B6F",
          borderRadius: 1,
          boxShadow: 3,
          mx: "auto",
          width: 180,
          marginTop: "3rem",
          marginBottom: "4rem",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            gutterBottom
            color="white"
            sx={{ fontSize: "0.8rem" }}
          >
            Get Pro Access
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.6rem" }}
            color="#f8ece9"
          >
            Unlock premium features with a Pro subscription.
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          startIcon={<WorkspacePremiumIcon sx={{ color: "#b0906f" }} />}
          sx={{
            backgroundColor: "white",
            color: "#b0906f",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "none",
            mb: 2,
            mx: "auto",
            display: "flex",
          }}
        >
          Get Pro Access
        </Button>
      </Card>
    </Box>
  );
}
