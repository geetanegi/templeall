import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchInput({ options = []}) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "10px",
          backgroundColor: "#FAFAFA",
        },
      }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
