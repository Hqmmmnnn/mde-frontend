import TextField from "@material-ui/core/TextField";
import { Event } from "effector";

type TextFieldProps<T> = {
  value: T;
  onChange: Event<T>;
};

export const ModelView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="model"
    label="Модель"
    variant="outlined"
    size="small"
  />
);

export const SeriesView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="series"
    label="Серия"
    variant="outlined"
    size="small"
  />
);

export const PowerRatingView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="powerRating"
    label="Мощность"
    variant="outlined"
    size="small"
  />
);

export const TorqueMaxView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="torqueMax"
    label="Макс. крутящий момент, нм"
    variant="outlined"
    size="small"
  />
);

export const OperatingTimeYearView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="operatingTimeYear"
    label="В год, ч"
    variant="outlined"
    size="small"
  />
);

export const OperatingTimeFirstTsView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="operatingTimeFirstTs"
    label="До первого ТО, ч"
    variant="outlined"
    size="small"
  />
);

export const OperatingTimeToRepairView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="operatingTimeToRepair"
    label="До кап. ремонта, ч"
    variant="outlined"
    size="small"
  />
);

export const FuelRateView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="fuelRate"
    label="Удельный, г/кВт ч"
    variant="outlined"
    size="small"
  />
);

export const FuelRateNominalPowerView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="fuelRateNominalPower"
    label="Номинальной мощности, л/ч"
    variant="outlined"
    size="small"
  />
);

export const CylinderWorkingVolumeView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="cylinderWorkingVolume"
    label="Рабочий объем"
    variant="outlined"
    size="small"
  />
);

export const CylinderDiameterView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="cylinderDiameter"
    label="Диаметр, мм"
    variant="outlined"
    size="small"
  />
);

export const PistonStrokeView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="pistonStroke"
    label="Ход поршня, мм"
    variant="outlined"
    size="small"
  />
);

export const СompressionRatioView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="compressionRatio"
    label="Степень сжатия"
    variant="outlined"
    size="small"
  />
);

export const InjectionPressureView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="injectionPressure"
    label="Давление впрыска"
    variant="outlined"
    size="small"
  />
);

export const СylinderMaxPressureView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="cylinderMaxPressure"
    label="Макс. давление, (Pz), бар"
    variant="outlined"
    size="small"
  />
);

export const CylinderDegreesView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="cylinderDegrees"
    label="Развал, град"
    variant="outlined"
    size="small"
  />
);

export const WeightDryNoImplementsView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="weightDryNoImplements"
    label="Вес без оборудования"
    variant="outlined"
    size="small"
  />
);

export const WeightWithImplementsView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="weightWithImplements"
    label="Вес с оборудованием"
    variant="outlined"
    size="small"
  />
);

export const LengthView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="length"
    label="Длина"
    variant="outlined"
    size="small"
  />
);

export const WidthView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="width"
    label="Ширина"
    variant="outlined"
    size="small"
  />
);

export const HeightView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="height"
    label="Высота"
    variant="outlined"
    size="small"
  />
);

export const OilRateView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="oilRate"
    label="Расход на угар, г/кВт ч"
    variant="outlined"
    size="small"
  />
);

export const OilSystemVolumeView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="oilSystemVolume"
    label="Объем системы, л"
    variant="outlined"
    size="small"
  />
);

export const CoolingSystemVolumeView = ({ value, onChange }: TextFieldProps<string>) => (
  <TextField
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="coolingSystemVolume"
    label="Объем  , л"
    variant="outlined"
    size="small"
  />
);
