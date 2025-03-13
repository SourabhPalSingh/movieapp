import React, { useContext, useEffect, useState } from "react";

// Fetch API key from the environment variable
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("titanic"); // Default query

  const getMovies = async (url) => {
    try {
      console.log("Fetching movies from URL:", url); // Log the URL before calling API
      setIsLoading(true); // Set loading state

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data"); // If fetch fails, throw an error
      }

      const data = await res.json();

      console.log("API response data:", data); // Log the API response to inspect it

      if (data.Response === "True") {
        setIsLoading(false); // Stop loading when data is fetched
        setMovie(data.Search); // Update movie results
        setIsError({ show: false, msg: "" }); // Reset error state
      } else {
        setIsLoading(false);
        setIsError({
          show: true,
          msg: data.Error || "No results found",
        });
        setMovie([]); // Clear results if there's an error
      }
    } catch (error) {
      console.log("Error during fetch:", error); // Log error
      setIsLoading(false);
      setIsError({ show: true, msg: "Something went wrong!" });
      setMovie([]); // Clear results on error
    }
  };

  useEffect(() => {
    // Debugging the API key and URL in the console
    console.log("Using API key:", API_KEY); // Log the API key to ensure it's being fetched
    console.log("Query changed:", query); // Log query change
    if (query.trim() !== "") {
      const timeout = setTimeout(() => {
        console.log("Making API call with query:", query); // Log query before fetching
        const url = `${API_URL}&s=${query}`;
        console.log("Constructed URL:", url); // Log the complete URL
        getMovies(url);
      }, 800); // Delay search to avoid too many requests

      return () => {
        clearTimeout(timeout); // Cleanup timeout on query change
      };
    } else {
      setIsError({ show: true, msg: "Please enter a search term." });
      setMovie([]); // Clear results if query is empty
    }
  }, [query]); // Re-run the effect on query change

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalcontext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalcontext };