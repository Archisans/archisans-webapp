import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  InputBase,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import { Search as SearchIcon, Close, ArrowOutward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/hooks/useSearch";
import MobServiceCategoryList from "@/components/Mobile/mobServiceCategoryList";
import MobMainHeader from "@/components/Mobile/MainHeader";

const Search = ({ bootstrapConfiguration }) => {
  const navigate = useNavigate();
  const {
    query,
    suggestions,
    results,
    recentSearches,
    executeSearch,
    handleInputChange,
    handleDeleteRecent,
    clearSearch,
  } = useSearch(bootstrapConfiguration);

  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClickService = (slug) => {
    if (slug) {
      navigate("/workers/" + slug);
    }
  };

  const showNoResults =
    query.trim().length > 0 && results.length === 0 && suggestions.length === 0;

  return (
    <Box pb={2}>
      {/* Header */}
      <MobMainHeader />

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
          inputRef={inputRef}
          sx={{ fontSize: "14px" }}
          placeholder="Search Services"
          fullWidth
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && executeSearch(query)}
        />
        {query && (
          <IconButton size="small" onClick={clearSearch}>
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
      {recentSearches.length > 0 &&
        !results.length &&
        !suggestions.length &&
        !showNoResults && (
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
                <IconButton
                  size="small"
                  onClick={() => handleDeleteRecent(item)}
                >
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

      {showNoResults && (
        <Box
          mt={4}
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <SearchIcon sx={{ fontSize: 50, color: "grey.400", mb: 1 }} />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No results found
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Try searching for something else
          </Typography>
        </Box>
      )}

      {/* Popular Services */}
      {!results.length && !suggestions.length && !showNoResults && (
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
