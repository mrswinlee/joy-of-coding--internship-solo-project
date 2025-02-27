import React from "react";

const FilterDropDown = ({ setFilteredStatus }) => {
  return (
    <select onChange={(e) => setFilteredStatus(e.target.value)}>
      <option value="All">Choose One</option>
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="InProgress">In Progress</option>
    </select>
  );
};

export default FilterDropDown;
