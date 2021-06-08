import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { mapRole } from "../../lib/mapRole";
import { rolesSelectedData } from "./users-model";

type RoleSelectProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

export const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  const { loadSelectDataFxWithToken, $selectedData } = rolesSelectedData;
  const items = useStore($selectedData);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    loadSelectDataFxWithToken("/api/selectData/roles");
  }, []);

  return (
    <FormControl size="small" variant="outlined" style={{ width: "60%" }}>
      <InputLabel id="roles-select-label">Роль</InputLabel>
      <Select
        label="Роль"
        labelId="roles-select-label"
        id="roles-select"
        value={value}
        onChange={handleChange}
      >
        {items.map(({ id, value }) => (
          <MenuItem key={id} value={id}>
            {mapRole(value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
