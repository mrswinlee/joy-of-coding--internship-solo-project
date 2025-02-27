import React, { useState, useEffect } from "react";

const Search = ({ query, setQuery }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={query}
        placeholder="Search for a task in your to do list..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
