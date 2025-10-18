import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  InputBase,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import {
  ArrowBackIos,
  Search as SearchIcon,
  Close,
  ArrowOutward,
  LocationOnOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MobServiceCategoryList from "@/components/Mobile/mobServiceCategoryList";

const Search = ({ bootstrapConfiguration }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  const updateRecentSearches = (searchTerm) => {
    if (!searchTerm.trim()) return;
    let updated = [
      searchTerm,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== searchTerm.toLowerCase()
      ),
    ];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const executeSearch = (searchTerm) => {
    const cleanTerm = searchTerm.trim();
    setQuery(cleanTerm);
    if (cleanTerm.length < 3) {
      setResults([]);
      return;
    }

    updateRecentSearches(cleanTerm);

    const allServices = bootstrapConfiguration.serviceCategories.flatMap(
      (cat) => cat.services
    );

    const filtered = allServices.filter((service) =>
      service.title.toLowerCase().includes(cleanTerm.toLowerCase())
    );

    setResults(filtered);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 3) {
      const allServices = bootstrapConfiguration.serviceCategories.flatMap(
        (cat) => cat.services
      );

      const matched = allServices
        .filter((service) =>
          service.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((service) => service.title);

      // Unique + limit suggestions
      const uniqueSuggestions = [...new Set(matched)].slice(0, 6);
      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleDeleteRecent = (item) => {
    const updated = recentSearches.filter((r) => r !== item);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClickService = (slug) => {
    if (slug) {
      navigate("/workers/" + slug);
    }
  };

  return (
    <Box py={2}>
      {/* Header */}
      <Box px={1} display="flex" alignItems="center">
        <ArrowBackIos
          sx={{ fontSize: 23, cursor: "pointer", color: "grey" }}
          onClick={() => navigate(-1)}
        />
        <Box display="flex" alignItems="center" ml={1}>
          <LocationOnOutlined sx={{ fontSize: 25, mr: 1, color: "black" }} />
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              color="gray"
              sx={{ lineHeight: 1, fontSize: 13 }}
            >
              Current Location
            </Typography>
            <Typography sx={{ fontWeight: "Bold", fontSize: 15 }}>
              Thrissur, Kerala
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box
        mt={2}
        mx={2}
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius={1}
        px={1.5}
        py={0.8}
        bgcolor="white"
      >
        <SearchIcon
          sx={{ mr: 1, cursor: "pointer", color: "gray" }}
          onClick={() => executeSearch(query)}
        />
        <InputBase
          sx={{ fontSize: "14px" }}
          placeholder="Search Services"
          fullWidth
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && executeSearch(query)}
        />
        {query && (
          <IconButton
            size="small"
            onClick={() => {
              setQuery("");
              setResults([]);
              setSuggestions([]);
            }}
          >
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Box mt={2} px={1}>
          {suggestions.map((item, idx) => (
            <Box
              key={idx}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ cursor: "pointer", mb: 1 }}
              onClick={() => executeSearch(item)}
            >
              <SearchIcon sx={{ fontSize: 20, color: "gray" }} />
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && !results.length && !suggestions.length && (
        <Box mt={3} px={1} borderBottom="1px solid rgba(0,0,0,0.1)" pb={1}>
          <Typography fontWeight={500} mb={1} color="grey">
            Recent searches
          </Typography>
          {recentSearches.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
              sx={{ cursor: "pointer" }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                onClick={() => executeSearch(item)}
              >
                <SearchIcon sx={{ fontSize: 22, color: "gray" }} />
                <Typography sx={{ fontSize: "90%", fontWeight: 550 }}>
                  {item}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleDeleteRecent(item)}>
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <Box mt={3} px={1}>
          <Typography sx={{ fontSize: "115%", fontWeight: 600, mb: 2 }}>
            Results
          </Typography>
          <Grid container spacing={2}>
            {results.map((service, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <MobServiceCategoryList
                  title={service.title}
                  img={service.imageUrl}
                  onClick={() => handleClickService(service.slug)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Popular Services */}
      {!results.length && !suggestions.length && (
        <Box mt={3} px={1}>
          <Typography sx={{ fontSize: "115%", fontWeight: 600, mb: 2 }}>
            Popular services
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {bootstrapConfiguration.serviceCategories
              .flatMap((cat) => cat.services)
              .slice(0, 8)
              .map((service, idx) => (
                <Chip
                  key={idx}
                  label={service.title}
                  clickable
                  onClick={() => executeSearch(service.title)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "white",
                    border: "1px solid #D3D3D3",
                    mb: 1,
                  }}
                  deleteIcon={<ArrowOutward />}
                  onDelete={() => {}}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
