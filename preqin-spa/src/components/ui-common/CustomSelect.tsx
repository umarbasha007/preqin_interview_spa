import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { label: string; value: string }[];
  label: string;
  defaultWidth?: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  label,
  defaultWidth = "200px", // Default width
}: CustomSelectProps) => {
  return (
    <FormControl style={{ width: defaultWidth, margin: "10px" }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label} ({item.value})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
