import { useState, useRef, useCallback } from "react";

export const useSearch = (bootstrapConfiguration) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const debounceTimer = useRef(null);

  const updateRecentSearches = (term) => {
    if (!term.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== term.toLowerCase()
      );
      const updated = [term, ...filtered];
      return updated.slice(0, 5);
    });
  };

  const executeSearch = useCallback(
    (term) => {
      const cleanTerm = typeof term === "string" ? term.trim() : "";

      if (!cleanTerm || cleanTerm.length < 2) {
        setResults([]);
        setSuggestions([]);
        return;
      }

      setQuery(cleanTerm);
      updateRecentSearches(cleanTerm);

      if (!bootstrapConfiguration?.serviceCategories) {
        setResults([]);
        return;
      }

      const allServices = bootstrapConfiguration.serviceCategories.flatMap(
        (cat) => cat.services || []
      );

      const filtered = allServices.filter((service) =>
        service?.title?.toLowerCase().includes(cleanTerm.toLowerCase())
      );

      setResults(filtered);
      setSuggestions([]);
    },
    [bootstrapConfiguration]
  );

  const handleInputChange = (value) => {
    setQuery(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setResults([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      if (!bootstrapConfiguration?.serviceCategories) {
        setSuggestions([]);
        return;
      }

      const allServices = bootstrapConfiguration.serviceCategories.flatMap(
        (cat) => cat.services || []
      );

      const matched = allServices
        .filter((service) =>
          service?.title?.toLowerCase().includes(value.toLowerCase())
        )
        .map((service) => service.title)
        .filter(Boolean);

      const uniqueSuggestions = [...new Set(matched)].slice(0, 6);
      setSuggestions(uniqueSuggestions);
      setResults([]);
    }, 300);
  };

  const handleDeleteRecent = (item) => {
    setRecentSearches((prev) => prev.filter((r) => r !== item));
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setResults([]);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    results,
    recentSearches,
    executeSearch,
    handleInputChange,
    handleDeleteRecent,
    clearSearch,
  };
};
