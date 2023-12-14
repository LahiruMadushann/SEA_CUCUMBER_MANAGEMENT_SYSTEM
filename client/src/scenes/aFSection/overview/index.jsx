import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import FishOverviewChart from "components/FishOverViewChart";


const FishOverview = () => {
  const [view, setView] = useState("numOfSpecies");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="FISH OVERVIEW"
        subtitle="Overview of number of species and buying price"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="numOfSpecies">Number Of Species</MenuItem>
            <MenuItem value="buyingPrice">Buying Price</MenuItem>
          </Select>
        </FormControl>
        <FishOverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default FishOverview;
