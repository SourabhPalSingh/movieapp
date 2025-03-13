import React, { useState } from "react";
import { useGlobalcontext } from "./context";

const Search = () => {
  const { query, setQuery } = useGlobalcontext();
  const [inputValue, setInputValue] = useState(query); // Maintain local state for input value

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery); // Update local input value

    // Update the global query state immediately when input changes
    setQuery(newQuery);
  };

  return (
    <section className="search-section">
      <h2>Search your favourite movie:</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Search for a movie..."
      />
    </section>
  );
};

export default Search;