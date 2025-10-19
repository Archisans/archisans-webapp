import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";

const AboutMobile = () => {
    return (
        <Box sx={{ p: 2, bgcolor: "#f5f5f5", minHeight: "100vh" }}>

            <MobHeading Heading="About Archisans" />
            <Stack spacing={3}>
                <Typography variant="body1" pt={2}>
                    Archisans is Kerala's premier platform connecting homeowners with verified construction professionals and home service providers.
                </Typography>

                <Typography variant="body1">
                    Our mission is to simplify the process of finding reliable, skilled professionals for your construction and home improvement needs. We carefully vet all our service providers to ensure quality and reliability.
                </Typography>

                <Typography variant="body1">
                    Founded with the vision of transforming Kerala's construction industry, we bridge the gap between homeowners and skilled artisans, ensuring transparency, quality, and trust in every project.
                </Typography>

                <Typography variant="body1">
                    We aim to empower customers with choice, competitive pricing, and accountability while giving skilled workers a platform to showcase their expertise.
                </Typography>

                <Typography variant="body1">
                    From large-scale construction projects to home maintenance tasks, Archisans ensures that every service request is matched with trusted professionals who deliver exceptional results.
                </Typography>
            </Stack>
        </Box >
    );
};

export default AboutMobile;
