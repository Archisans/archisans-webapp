import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Ad4 from "@/assets/Images/Ad4.png";
import Ad5 from "@/assets/Images/Ad5.png";
import Ad6 from "@/assets/Images/Ad6.png";
import VGuard from "@/assets/Images/VGuard.png";

const MobBuildingMaterialBrands = () => {
  const ads = [VGuard, Ad4, Ad5, Ad6];
  const categories = ["All Materials", "Cement", "Steel", "Bricks", "Tiles"];

  const [selectedCategory, setSelectedCategory] = useState("All Materials");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container sx={{ pt: 2 }}>
      {/* Dropdown */}
      <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
        <InputLabel>Building Materials</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          label="Building Material"
        >
          {categories.map((category, index) => (
            <MenuItem value={category} key={index}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ad Images */}
      {ads.map((img, index) => (
        <Card key={index} sx={{ mb: 2, boxShadow: 3, borderRadius: 1 }}>
          <CardMedia
            component="img"
            image={img}
            alt={`Ad ${index + 1}`}
            sx={{ width: "100%", height: 180 }}
          />
        </Card>
      ))}
    </Container>
  );
};

export default MobBuildingMaterialBrands;
