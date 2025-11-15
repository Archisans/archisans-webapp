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

const WorkerDashboard = ({ worker }) => {
  const navigate = useNavigate();

  const services = worker.professions.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryTitle: category.title,
    }))
  );

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      {/* Minimal Top Bar */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
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
                color: "#111827",
                letterSpacing: "-0.02em",
              }}
            >
              {worker.personal.fullName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              <MapPinIcon size={14} color="#6B7280" weight="fill" />
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Thrissur, Kerala
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={() => navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)}
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <BellIcon size={20} color="#374151" />
            </IconButton>
            <Avatar
              onClick={() => navigate(RouteProvider.USER_PROFILE)}
              sx={{
                width: 36,
                height: 36,
                cursor: "pointer",
                border: "1px solid #E5E7EB",
              }}
              src={worker.personal.imageUrl}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 3, pb: 10 }}>

        {/* Quick Actions */}
        <Box mb={4} px={2}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "#6B7280",
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
                icon: <UserIcon size={20} color="#374151" weight="regular" />,
                onClick: () => navigate(RouteProvider.WORKER_PROFILE),
              },
            ].map(({ text, description, icon, onClick }, idx) => (
              <Card
                key={idx}
                onClick={onClick}
                sx={{
                  width: 160,
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  p: 2.5,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#D1D5DB",
                    bgcolor: "#F9FAFB",
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
                    bgcolor: "#F3F4F6",
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
                    color: "#111827",
                    mb: 0.5,
                  }}
                >
                  {text}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#6B7280",
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
              px:2,
              fontSize: 13,
              fontWeight: 600,
              color: "#6B7280",
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
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Services ({services.length})
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
                bgcolor: "#F3F4F6",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "#D1D5DB",
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#9CA3AF",
                },
              },
            }}
          >
            {services.map((service, idx) => (
              <Card
                key={idx}
                sx={{
                  minWidth: 280,
                  flex: "0 0 auto",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#D1D5DB",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    bgcolor: "#F3F4F6",
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
                      color: "#6B7280",
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
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#6B7280",
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
    </Box>
  );
};

export default WorkerDashboard;
