import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Video as VideoIcon, FolderOpen, FileText } from "lucide-react";

const MobWorkerPortFolio = () => {
  const theme = useTheme();


  const portfolioData = {
    pdf: "https://drive.google.com/file/d/12pdfexample/view?usp=drive_link",
    link: "https://worker-portfolio-site.com/profile",
  };

  const workSamples = [
    {
      title: "Interior Design Project",
      type: "Interior Work",
      clientNumber: "9876543210",
      location: "Bangalore, Karnataka",

      photos: [
        "https://picsum.photos/300/200?random=1",
        "https://picsum.photos/300/200?random=2",
      ],

      driveLinks: [
        "https://drive.google.com/file/d/1AbCdEfGh12345/view?usp=drivesdk",
      ],

      videoLinks: ["https://youtube.com/watch?v=demo1"],
    },
  ];

  return (
    <Box sx={{ p: 1 }}>

      {/*  TOP PORTFOLIO SECTION (PDF + LINK)  */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 1,
          border: "1px solid #e5e7eb",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
          background: "#ffffff",
        }}
      >
        {/* PDF Section */}
        <Stack direction="row" spacing={1.4} alignItems="center" sx={{ mb: 1.2 }}>
          <Box
            sx={{
              height: 30,
              borderRadius: "6px",
              background: "#eef2ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FileText size={18} color="#4f46e5" />
          </Box>

          {portfolioData.pdf ? (
            <Link
              href={portfolioData.pdf}
              target="_blank"
              sx={{
                fontSize: 14,
                color: "#2563eb",
                fontWeight: 600,
                display: "block",
                mt: 0.3,
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              View PDF
            </Link>
          ) : (
            <Typography sx={{ fontSize: 13, color: "#9ca3af", mt: 0.3 }}>
              No PDF uploaded
            </Typography>
          )}
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* Portfolio External Link */}
        <Stack direction="row" spacing={1.4} alignItems="center">
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "6px",
              background: "#e0f2fe",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FolderOpen size={18} color="#0284c7" />
          </Box>

          {portfolioData.link ? (
            <Link
              href={portfolioData.link}
              target="_blank"
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#2563eb",
                mt: 0.3,
                display: "block",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              Open Portfolio
            </Link>
          ) : (
            <Typography sx={{ fontSize: 13, color: "#9ca3af", mt: 0.3 }}>
              No link added
            </Typography>
          )}
        </Stack>

      </Box>




      {/* ACCORDION WORK SAMPLES BELOW */}

      {workSamples.map((sample, idx) => (
        <Accordion
          key={idx}
          sx={{
            mb: 2,
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.06)",
            "&::before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: "rgba(238, 239, 247, 0.39)",
              py: 1.5,
            }}
          >
            <Typography sx={{ color: 'rgb(8, 13, 112)', fontSize: 16, fontWeight: 600 }}>
              {sample.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 2 }}>
            {/* Details */}
            <Stack spacing={1.2} sx={{ mb: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Service</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {sample.type}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Phone</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {sample.clientNumber}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 13, color: "#6b7280" , fontWeight: 600}}>Location</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {sample.location}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Images + Drive Thumbnails */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Images
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  overflowX: "auto",
                  pb: 1,
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {sample.photos.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt="project"
                    sx={{
                      width: 140,
                      height: 100,
                      borderRadius: 2,
                      objectFit: "cover",
                      border: "1px solid #e5e7eb",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open(img, "_blank")}
                  />
                ))}
              </Box>
            </Box>

            {/* Google Drive Links */}

            {/* Google Drive Uploads */}
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Google Drive Uploads
              </Typography>

              {sample.driveLinks.map((link, i) => (
                <Stack key={i} direction="row" spacing={1.4} alignItems="center" sx={{ mb: 1 }}>

                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "6px",
                      background: "#e0f2fe",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FolderOpen size={18} color="#0284c7" />
                  </Box>

                  <Link
                    href={link}
                    target="_blank"
                    sx={{
                      fontSize: 14,
                      color: "#2563eb",
                      fontWeight: 600,
                      mt: 0.3,
                      display: "block",
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                    }}
                  >
                    Open Drive File
                  </Link>
                </Stack>
              ))}
            </Box>



            {/* Video Links */}
            {/* Video Links */}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Video Links
              </Typography>

              {sample.videoLinks.map((link, i) => (
                <Stack key={i} direction="row" spacing={1.4} alignItems="center" sx={{ mb: 1 }}>

                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "6px",
                      background: "#fef3c7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VideoIcon size={18} color="#d97706" />
                  </Box>

                  <Link
                    href={link}
                    target="_blank"
                    sx={{
                      fontSize: 14,
                      color: "#2563eb",
                      fontWeight: 600,
                      mt: 0.3,
                      display: "block",
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                    }}
                  >
                    Open Video
                  </Link>
                </Stack>
              ))}
            </Box>


          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MobWorkerPortFolio;
