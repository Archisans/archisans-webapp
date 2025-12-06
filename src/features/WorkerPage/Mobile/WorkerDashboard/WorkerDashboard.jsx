import {
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Card,
  Divider,
} from "@mui/material";
import {
  BellIcon,
  MapPinIcon,
  BankIcon,
  UserIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import AdvertisementCarousel from "@/features/Advertisment/AdvertismentCarousel/AdvertisementCarousal";
import { RouteProvider } from "@/config/RouteProvider";
import ProfileDrawer from "@/features/Home/Mobile/Components/ProfileDrawer";
import LoginDrawer from "@/components/Mobile/LoginDrawer";
import { useState } from "react";

const WorkerDashboard = ({ worker }) => {
  const navigate = useNavigate();

const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const services = worker.professions.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryTitle: category.title,
    }))
  );

  return (
    <Box sx={{ bgcolor:"neutral.bg.50", minHeight: "100vh" }}>
      {/* Minimal Top Bar */}
      <Box
        sx={{
          bgcolor: "neutral.bg.50",
          borderBottom: "1px solid #E5E7EB",
          px: 3,
          py: 2.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color: "neutral.content.900",
                letterSpacing: "-0.02em",
              }}
            >
              {worker.personal.fullName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              <MapPinIcon size={14} color="neutral.content.300" />
              <Typography
                sx={{
                  fontSize: 13,
                  color: "neutral.content.600",
                }}
              >
                Thrissur, Kerala
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* <IconButton
              onClick={() => navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)}
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <BellIcon size={20} color="#374151" />
            </IconButton> */}
            <Avatar
               onClick={() => setDrawerOpen(true)}
              sx={{
                width: 36,
                height: 36,
                cursor: "pointer",
                border: "1px solid neutral.bg.50",
              }}
              src={worker.personal.imageUrl}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 3, pb: 1 }}>

        {/* Quick Actions */}
        <Box mb={4} px={2}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "neutral.content.600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 2,
            }}
          >
            Quick Actions
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-start">
            {[
              // {
              //   text: "Portfolio",
              //   description: "Manage your work",
              //   icon: <BankIcon size={20} color="#374151" weight="regular" />,
              //   onClick: () => navigate(RouteProvider.WORKER_PORTFOLIO),
              // },
              {
                text: "Work Profile",
                description: "Edit your details",
                icon: <UserIcon size={20} color="neutral.content.800" weight="regular" />,
                onClick: () => navigate(RouteProvider.WORKER_PROFILE),
              },
            ].map(({ text, description, icon, onClick }, idx) => (
              <Card
                key={idx}
                onClick={onClick}
                sx={{
                  width: 160,
                  bgcolor: "neutral.bg.50",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  p: 2.5,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "neutral.stroke.dark",
                    bgcolor: "neutral.bg.100",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "neutral.bg.200",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "neutral.content.800",
                    mb: 0.5,
                  }}
                >
                  {text}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "neutral.content.600",
                  }}
                >
                  {description}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Ads */}
        <Box>
          <Typography
            sx={{
              px: 2,
              fontSize: 13,
              fontWeight: 600,
              color: "neutral.content.600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 2,
            }}
          >
            Featured
          </Typography>
          <AdvertisementCarousel />
        </Box>

        {/* Services */}
        <Box mb={4} px={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            mb={2}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "neutral.content.600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              My Services ({services.length})
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: "neutral.bg.100",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "neutral.stroke.dark",
                borderRadius: 3,
              },
            }}
          >
            {services.map((service, idx) => (
              <Card
                key={idx}
                sx={{
                  minWidth: 280,
                  flex: "0 0 auto",
                  bgcolor: "neutral.bg.50",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "neutral.stroke.dark",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "neutral.content.700",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: 0.5,
                    }}
                  >
                    {service.categoryTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "neutral.content.800",
                      mb: 1,
                    }}
                  >
                    {service.title?.endsWith("s") ? service.title.slice(0, -1) : service.title}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "neutral.content.600",
                    }}
                  >
                    {service.experience} years experience
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <LoginDrawer open={loginOpen} setOpen={setLoginOpen} height={"30vh"} />
    </Box>
  );
};

export default WorkerDashboard;
