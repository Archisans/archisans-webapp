import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Divider,
    Paper,
    useTheme,
  } from "@mui/material";
  import { useState } from "react";
  import MobHeading from "@/components/Mobile/mobileHeading";
  
  export default function MigrantWorkersForm() {
    const theme = useTheme();
  
    const [formData, setFormData] = useState({});
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const inputStyle = {
      backgroundColor: "white",
      borderRadius: "10px",
    };
  
    const headingStyle = {
      fontWeight: 700,
      fontSize: "16px",
      mt: 3,
      mb: 1,
    };
  
    const checkBoxList = (items) => (
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={<Checkbox />}
            label={item}
          />
        ))}
      </FormGroup>
    );
  
    return (
      <Grid>
        <MobHeading Heading={"MigrantWorkers"} />
  
        <Box
          sx={{
            minHeight: "100vh",
            background: "#f5f6fa",
            display: "flex",
            justifyContent: "center",
            py: 4,
            px: 2,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              maxWidth: "850px",
              borderRadius: "20px",
              p: 3,
            }}
          >
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight={700}>
                ARCHISANS
              </Typography>
  
              <Typography variant="body1" color="text.secondary">
                Builder / Contractor Registration Form for Migrant Worker
                Absorption
              </Typography>
  
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                Purpose: This form is intended for builders,
                contractors, construction companies, interior
                firms, and project owners who are willing to
                recruit or absorb migrant workers through the
                Archisans platform.
              </Typography>
            </Box>
  
            <Grid container spacing={2}>
              {/* 1 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  1. COMPANY / BUILDER DETAILS
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Company / Firm Name"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Type of Business
                </Typography>
  
                {checkBoxList([
                  "Builder",
                  "Contractor",
                  "Interior Firm",
                  "Construction Company",
                  "Infrastructure Company",
                  "Real Estate Developer",
                  "Other",
                ])}
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Proprietor / Managing Director Name"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="GST Number"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Registration Number (If Any)"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Office Address"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="District"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="State"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* 2 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  2. CONTACT DETAILS
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Contact Person Name"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Designation"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Alternate Contact Number"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="WhatsApp Number"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* 3 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  3. PROJECT DETAILS
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Current Project Name"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Project Location"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Type of Project
                </Typography>
  
                {checkBoxList([
                  "Residential",
                  "Commercial",
                  "Villa",
                  "Apartment",
                  "Industrial",
                  "Government",
                  "Interior Fit-Out",
                  "Other",
                ])}
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Estimated Project Duration"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Approximate Number of Workers Required"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* 4 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  4. WORKER REQUIREMENTS
                </Typography>
                <Divider />
              </Grid>
  
              {[
                "Mason",
                "Carpenter",
                "Electrician",
                "Plumber",
                "Steel Fixer",
                "Painter",
                "Tile Worker",
                "Gypsum Worker",
                "Aluminium Fabricator",
                "Welder",
                "Helper / General Worker",
                "Interior Finishing Worker",
                "Other",
              ].map((item) => (
                <Grid size={6} key={item}>
                  <TextField
                    fullWidth
                    label={`${item} Quantity`}
                    sx={inputStyle}
                  />
                </Grid>
              ))}
  
              {/* 5 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  5. FACILITIES PROVIDED TO WORKERS
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Accommodation
                </Typography>
                {checkBoxList(["Yes", "No"])}
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Food / Mess Facility
                </Typography>
                {checkBoxList(["Yes", "No"])}
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Transportation
                </Typography>
                {checkBoxList(["Yes", "No"])}
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Safety Equipment Provided
                </Typography>
  
                {checkBoxList([
                  "Helmet",
                  "Shoes",
                  "Gloves",
                  "Safety Belt",
                  "Uniform",
                  "Other",
                ])}
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Weekly Off"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Working Hours"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* 6 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  6. SALARY & PAYMENT DETAILS
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Salary Structure
                </Typography>
  
                {checkBoxList([
                  "Daily Wage",
                  "Weekly Payment",
                  "Monthly Salary",
                  "Contract Basis",
                ])}
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Expected Wage Range"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Overtime Policy"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Payment Method
                </Typography>
  
                {checkBoxList([
                  "Bank Transfer",
                  "Cash",
                  "UPI",
                  "Other",
                ])}
              </Grid>
  
              {/* 7 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  7. LEGAL & COMPLIANCE
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Does your company comply with labour
                  regulations?
                </Typography>
                {checkBoxList(["Yes", "No"])}
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Are workers covered under insurance?
                </Typography>
                {checkBoxList(["Yes", "No"])}
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  PF / ESI Availability
                </Typography>
  
                {checkBoxList([
                  "PF",
                  "ESI",
                  "Both",
                  "Not Applicable",
                ])}
              </Grid>
  
              {/* 8 */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  8. DECLARATION
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={12}>
                <Typography variant="body2">
                  I / We hereby confirm that the information
                  provided above is true and correct to the best
                  of our knowledge. We agree to recruit migrant
                  workers through the Archisans platform under
                  lawful and ethical employment practices.
                </Typography>
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Authorized Signatory Name"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Signature"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Date"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Company Seal"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* Office Use */}
              <Grid size={12}>
                <Typography sx={headingStyle}>
                  FOR ARCHISANS OFFICE USE ONLY
                </Typography>
                <Divider />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Registration ID"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Verified By"
                  sx={inputStyle}
                />
              </Grid>
  
              <Grid size={12}>
                <Typography fontWeight={600}>
                  Verification Status
                </Typography>
  
                {checkBoxList([
                  "Approved",
                  "Pending",
                  "Rejected",
                ])}
              </Grid>
  
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Remarks"
                  sx={inputStyle}
                />
              </Grid>
  
              {/* Footer */}
              <Grid size={12}>
                <Box mt={2}>
                  <Typography
                    textAlign="center"
                    fontWeight={700}
                  >
                    ARCHISANS
                  </Typography>
  
                  <Typography
                    textAlign="center"
                    variant="body2"
                    color="text.secondary"
                  >
                    Building the Future Workforce Network
                  </Typography>
  
                  <Typography
                    textAlign="center"
                    variant="body2"
                    color="text.secondary"
                  >
                    Contact: Mobile: _______ Email: ________
                    Website: _______
                  </Typography>
                </Box>
              </Grid>
  
              {/* Submit */}
              <Grid size={12}>
                <Box mt={3}>
                  <Button
                    fullWidth
                    sx={{
                      height: "52px",
                      borderRadius: "14px",
                      backgroundColor:
                        theme.palette.primary.main,
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Submit Registration
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    );
  }