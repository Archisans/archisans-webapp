// ServiceCustomize.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import MobHeading from '@/components/Mobile/MobileHeading';

const ServiceCustomize = ({ serviceTitle = 'Service' }) => {
  const [formData, setFormData] = useState({
    experience: '',
    rate: '',
    rateBasis: '',
    notes: '',
    certificate: null,
    coverPhoto: null,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (field, e) => {
    handleChange(field, e.target.files[0]);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 500,
        mx: 'auto',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <MobHeading Heading="Service Details" />

      <Paper
        sx={{
          p: 2.5,
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        }}
      >
        {/* Cover Photo */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Cover Photo
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
          <IconButton
            color="primary"
            component="label"
            sx={{
              width: 60,
              height: 60,
              bgcolor: '#f4f6f8',
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            <PhotoCamera />
            <input hidden type="file" onChange={(e) => handleFileUpload('coverPhoto', e)} />
          </IconButton>
          {formData.coverPhoto && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={URL.createObjectURL(formData.coverPhoto)}
                variant="rounded"
                sx={{ width: 60, height: 60 }}
              />
              <Typography fontSize={13} noWrap maxWidth={150}>
                {formData.coverPhoto.name}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Experience */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Years of Experience
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            displayEmpty
            sx={{ borderRadius: 2, backgroundColor: '#f9fafb' }}
          >
            <MenuItem value="" disabled>
              Select experience
            </MenuItem>
            {[...Array(31).keys()].map((year) => (
              <MenuItem key={year} value={year}>
                {year === 0 ? 'Less than 1 year' : `${year} year${year > 1 ? 's' : ''}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Base Rate & Type */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Base Rate & Type
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Enter base rate"
            variant="outlined"
            type="number"
            value={formData.rate}
            onChange={(e) => handleChange('rate', e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
            sx={{
              flex: 1,
              minWidth: 120,
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f9fafb' },
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={formData.rateBasis}
              onChange={(e) => handleChange('rateBasis', e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2, backgroundColor: '#f9fafb' }}
            >
              <MenuItem value="" disabled>
                Select type
              </MenuItem>
              <MenuItem value="hour">Per Hour</MenuItem>
              <MenuItem value="day">Per Day</MenuItem>
              <MenuItem value="job">Per Job</MenuItem>
              <MenuItem value="sqft">Per Sq. Ft</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Notes */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Special Notes
        </Typography>
        <TextField
          placeholder="Any additional information"
          fullWidth
          multiline
          rows={3}
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          sx={{
            mb: 2.5,
            '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f9fafb' },
          }}
        />

        {/* Upload Certifications / License */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Upload Certification / License
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <IconButton
            color="primary"
            component="label"
            sx={{
              width: 50,
              height: 50,
              bgcolor: '#f4f6f8',
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            <PhotoCamera />
            <input hidden type="file" onChange={(e) => handleFileUpload('certificate', e)} />
          </IconButton>
          {formData.certificate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={URL.createObjectURL(formData.certificate)}
                variant="rounded"
                sx={{ width: 50, height: 50 }}
              />
              <Typography fontSize={13} noWrap maxWidth={120}>
                {formData.certificate.name}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ServiceCustomize;
