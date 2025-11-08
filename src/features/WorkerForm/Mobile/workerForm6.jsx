import { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import { useProfessionForm } from "../utils/workerFormLogic";

const WorkerForm6 = ({
  formData,
  updateFormData,
  next,
  back,
  services = [],
}) => {
  const [selected, setSelected] = useState(formData.professions || []);
  const [open, setOpen] = useState(false);
  const [currentProfession, setCurrentProfession] = useState(null);
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  const { error, setError, validateProfessions } = useProfessionForm(
    formData,
    updateFormData
  );

  const handleNext = () => {
    const isValid = validateProfessions(selected);
    if (isValid) {
      updateFormData("professions", selected);
      next();
    }
  };

  const handleSelect = (categoryId, categoryTitle) => {
    setError("");
    setCurrentProfession({ id: categoryId, title: categoryTitle });
    const existing = selected.find((s) => s.categoryId === categoryId);

    if (existing) {
      setSelectedSubServices(existing.services || []);
    } else {
      setSelectedSubServices([]);
      setSelected((prev) => [
        ...prev,
        { categoryId, categoryTitle, services: [] },
      ]);
    }

    setOpen(true);
  };

  const handleSaveSubServices = () => {
    if (selectedSubServices.length === 0) return;

    const updated = selected.map((s) =>
      s.categoryId === currentProfession.id
        ? { ...s, services: selectedSubServices }
        : s
    );

    setSelected(updated);
    updateFormData("professions", updated);
    setOpen(false);
  };

  const handleToggleSubService = (service) => {
    setSelectedSubServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      return exists
        ? prev.filter((s) => s.id !== service.id)
        : [
            ...prev,
            {
              id: service.id,
              categoryId: service.categoryId,
              title: service.title,
            },
          ];
    });
  };

  const handleCheckboxClick = (e, categoryId, categoryTitle) => {
    e.stopPropagation();
    const isSelected = selected.some((s) => s.categoryId === categoryId);

    if (isSelected) {
      const filtered = selected.filter((s) => s.categoryId !== categoryId);
      setSelected(filtered);
      updateFormData("professions", filtered);
    } else {
      handleSelect(categoryId, categoryTitle);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 500,
        mx: "auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 10,
      }}
    >
      <Box>
        <TopProgressBar
          activeStep={5}
          onBack={back}
          pgnum="6/7"
          title="Select Profession"
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {services.map((category) => {
            const isSelected = selected.some(
              (s) => s.categoryId === category.id
            );

            return (
              <Box
                key={category.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "6px 10px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => handleSelect(category.id, category.title)}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                  <Box
                    component="img"
                    src={category.iconUrl}
                    alt={category.title}
                    sx={{
                      width: 55,
                      height: 45,
                      objectFit: "contain",
                      mr: 1.5,
                    }}
                  />
                  <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
                    {category.title}
                  </Typography>
                </Box>
                <Checkbox
                  checked={isSelected}
                  onClick={(e) =>
                    handleCheckboxClick(e, category.id, category.title)
                  }
                />
              </Box>
            );
          })}

          {error && (
            <FormHelperText sx={{ color: "error.main", mt: 2 }}>
              {error}
            </FormHelperText>
          )}
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>
            Select Services for {currentProfession?.title}
          </DialogTitle>
          <DialogContent>
            {currentProfession &&
              services
                .find((cat) => cat.id === currentProfession.id)
                ?.services.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
                        checked={selectedSubServices.some(
                          (s) => s.id === service.id
                        )}
                        onChange={() => handleToggleSubService(service)}
                      />
                    }
                    label={service.title}
                  />
                ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveSubServices}
              disabled={selectedSubServices.length === 0}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <BottomButton handleNext={handleNext} />
      </Box>
    </Box>
  );
};

export default WorkerForm6;
