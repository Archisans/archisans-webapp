import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Grid,
  TextField,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function MigrantWorkersFormModal({ open, onClose }) {
  const sectionTitle = (title) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 4,
        mb: 3,
        borderRadius: 3,
        background: "#f8f9fc",
        border: "1px solid #ececec",
      }}
    >
      <Typography fontWeight={800} fontSize="18px">
        {title}
      </Typography>
    </Paper>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "96%",
          maxWidth: 1150,
          maxHeight: "94vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 4,
          p: 4,
          mx: "auto",
          mt: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={900}>
              ARCHISANS
            </Typography>

            <Typography fontWeight={700}>
              Builder / Contractor Registration Form for Migrant Worker
              Absorption
            </Typography>
          </Box>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Typography
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            background: "#fff9e8",
          }}
        >
          Purpose: This form is intended for builders, contractors,
          construction companies, interior firms, and project owners who are
          willing to recruit or absorb migrant workers through the Archisans
          platform.
        </Typography>

        {/* 1 */}
        {sectionTitle("1. COMPANY / BUILDER DETAILS")}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Company / Firm Name" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>Type of Business:</Typography>
            <FormGroup row>
              {[
                "Builder",
                "Contractor",
                "Interior Firm",
                "Construction Company",
                "Infrastructure Company",
                "Real Estate Developer",
                "Other",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Proprietor / Managing Director Name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="GST Number" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Registration Number (If Any)"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Office Address" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="District" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="State" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="PIN Code" />
          </Grid>
        </Grid>

        {/* 2 */}
        {sectionTitle("2. CONTACT DETAILS")}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Contact Person Name" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Designation" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Mobile Number" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Alternate Contact Number"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="WhatsApp Number" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email Address" />
          </Grid>
        </Grid>

        {/* 3 */}
        {sectionTitle("3. PROJECT DETAILS")}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Current Project Name" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Project Location" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>Type of Project:</Typography>
            <FormGroup row>
              {[
                "Residential",
                "Commercial",
                "Villa",
                "Apartment",
                "Industrial",
                "Government",
                "Interior Fit-Out",
                "Other",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Estimated Project Duration"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Approximate Number of Workers Required"
            />
          </Grid>
        </Grid>

        {/* 4 */}
        {sectionTitle("4. WORKER REQUIREMENTS")}

        <Grid container spacing={3}>
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
            <Grid item xs={12} md={4} key={item}>
              <TextField
                fullWidth
                label={`${item} Quantity Required`}
              />
            </Grid>
          ))}
        </Grid>

        {/* 5 */}
        {sectionTitle("5. FACILITIES PROVIDED TO WORKERS")}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={700}>Accommodation:</Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Food / Mess Facility:
            </Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>Transportation:</Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Safety Equipment Provided:
            </Typography>
            <FormGroup row>
              {[
                "Helmet",
                "Shoes",
                "Gloves",
                "Safety Belt",
                "Uniform",
                "Other",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Weekly Off" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Working Hours" />
          </Grid>
        </Grid>

        {/* 6 */}
        {sectionTitle("6. SALARY & PAYMENT DETAILS")}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Salary Structure:
            </Typography>
            <FormGroup row>
              {[
                "Daily Wage",
                "Weekly Payment",
                "Monthly Salary",
                "Contract Basis",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Expected Wage Range" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Overtime Policy" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Payment Method:
            </Typography>
            <FormGroup row>
              {[
                "Bank Transfer",
                "Cash",
                "UPI",
                "Other",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>

        {/* 7 */}
        {sectionTitle("7. LEGAL & COMPLIANCE")}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Does your company comply with labour and safety regulations?
            </Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Are workers covered under insurance?
            </Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              PF / ESI Availability:
            </Typography>
            <FormGroup row>
              {[
                "PF",
                "ESI",
                "Both",
                "Not Applicable",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>

        {/* 8 */}
        {sectionTitle("8. DECLARATION")}

        <Typography sx={{ mb: 3 }}>
          I / We hereby confirm that the information provided above is true
          and correct to the best of our knowledge. We agree to recruit
          migrant workers through the Archisans platform under lawful and
          ethical employment practices.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Authorized Signatory Name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Date (DD/MM/YY)" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Signature" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Company Seal" />
          </Grid>
        </Grid>

        {/* OFFICE USE */}
        {sectionTitle("FOR ARCHISANS OFFICE USE ONLY")}

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Registration ID" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Verified By" />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Remarks" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700}>
              Verification Status:
            </Typography>
            <FormGroup row>
              {["Approved", "Pending", "Rejected"].map(
                (item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                )
              )}
            </FormGroup>
          </Grid>
        </Grid>

        {/* Footer */}
        <Divider sx={{ my: 4 }} />

        <Typography textAlign="center" fontWeight={800}>
          ARCHISANS
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Building the Future Workforce Network
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
        >
          Contact: Mobile: _______ Email: ________ Website: _______
        </Typography>

        {/* Submit */}
        <Button
          fullWidth
          sx={{
            mt: 4,
            height: 56,
            borderRadius: 3,
            fontWeight: 800,
            textTransform: "none",
            background:
              "linear-gradient(135deg,#FFD700,#FFC107)",
            color: "#111",
          }}
        >
          Submit Registration
        </Button>
      </Box>
    </Modal>
  );
}