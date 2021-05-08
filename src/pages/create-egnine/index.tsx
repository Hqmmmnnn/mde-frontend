import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";

import { useField } from "effector-forms/dist";
import { useStore } from "effector-react";
import React, { FormEvent, useEffect, useMemo } from "react";
import { Header } from "../../components/header";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {
  assignmentsSelect,
  createEngineForm,
  engineRatingSelect,
  SelectedDataProps,
  manufacturersSelect,
  classificationSocietySelect,
  flangeSelect,
} from "./create-engine-model";
import { Event } from "effector";
import { useDropzone } from "react-dropzone";

export const CreateEngine = () => {
  return (
    <>
      <Header />
      <CreateEngineForm />
    </>
  );
};

type CreateEngineFormBlockProps = {
  items: React.ReactNode[];
  name: string;
};

const CreateEngineFormBlock = ({ items, name }: CreateEngineFormBlockProps) => {
  let key = 0;

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={2} style={{ width: "280px" }}>
        <Box paddingLeft={2}>
          <Typography variant="h6">{name}</Typography>
        </Box>

        {items.map((item) => (
          <Grid item key={key++} style={{ maxWidth: "280px" }}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CreateEngineForm = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEngineForm.submit();

    console.log(createEngineForm.$values.getState());
  };

  return (
    <Container>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "100%",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <Grid container>
          <Grid item style={{ padding: "24px", display: "flex", width: "100%" }}>
            <Grid container spacing={6}>
              <Grid item>
                <ImageDropZone />
              </Grid>
              <Grid item style={{ display: "flex", flexGrow: 1 }}>
                <FilesUploader />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container style={{ justifyContent: "flex-start" }}>
              <CreateEngineFormBlock
                name="Основные характеристики"
                items={[
                  <Model />,
                  <Series />,
                  <PowerRating />,
                  <RotationSpeed />,
                  <Manufacturer />,
                  <TorqueMax />,
                  <Assignment />,
                  <EngineRating />,
                  <FlangeType />,
                ]}
              />

              <CreateEngineFormBlock
                name="Цилиндр"
                items={[
                  <CylinderWorkingVolume />,
                  <CylinderQuantity />,
                  <CylinderDiameter />,
                  <PistonStroke />,
                  <СompressionRatio />,
                  <InjectionType />,
                  <InjectionPressure />,
                  <СylinderMaxPressure />,
                  <CylinderArrangement />,
                  <CylinderDegrees />,
                ]}
              />

              <Grid item>
                <CreateEngineFormBlock
                  name="Рекомендуемая наработка"
                  items={[
                    <OperatingTimeYear />,
                    <OperatingTimeFirstTs />,
                    <OperatingTimeToRepair />,
                  ]}
                />
                <CreateEngineFormBlock
                  name="Расход топлива"
                  items={[<FuelRate />, <FuelRateNominalPower />]}
                />
                <CreateEngineFormBlock name="Впрыск" items={[<OilRate />, <OilSystemVolume />]} />
              </Grid>

              <Grid item>
                <CreateEngineFormBlock
                  name="Габариты, мм"
                  items={[<Length />, <Width />, <Height />]}
                />

                <CreateEngineFormBlock
                  name="Масса, кг"
                  items={[<WeightDryNoImplements />, <WeightWithImplements />]}
                />

                <CreateEngineFormBlock
                  name="Охлаждение"
                  items={[<CoolingSystemType />, <CoolingSystemVolume />]}
                />
              </Grid>

              <Grid item>
                <CreateEngineFormBlock
                  name="Эко стандарты"
                  items={[
                    <ImoEcoStandard />,
                    <EpaEcoStandard />,
                    <EuEcoStandard />,
                    <UicEcoStandard />,
                  ]}
                />
              </Grid>

              <Grid item>
                <CreateEngineFormBlock
                  name="Другое"
                  items={[<VesselType />, <ClassificationSociety />]}
                />
              </Grid>
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              <Button size="large" color="primary" variant="outlined" type="submit">
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const Model = () => {
  const { value, onChange } = useField(createEngineForm.fields.model);

  return (
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
};

const Series = () => {
  const { value, onChange } = useField(createEngineForm.fields.series);

  return (
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
};

const PowerRating = () => {
  const { value, onChange } = useField(createEngineForm.fields.powerRating);

  return (
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
};

const RotationSpeed = () => {
  const { value, onChange } = useField(createEngineForm.fields.rotationSpeed);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="rotationSpeed"
      label="Частота вращения"
      variant="outlined"
      size="small"
    />
  );
};

const Manufacturer = () => {
  const { onChange } = useField(createEngineForm.fields.manufacturerId);

  return (
    <CreateEngineSelect
      labelId="manufacturersLabel"
      labelName="Производитель"
      selectId="manufacturersSelect"
      selectData={manufacturersSelect}
      onChange={onChange}
      fetchingDataUrl="/manufacturersData"
    />
  );
};

const TorqueMax = () => {
  const { value, onChange } = useField(createEngineForm.fields.torqueMax);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="torqueMax"
      label="Макс. крутящий момент"
      variant="outlined"
      size="small"
    />
  );
};

const Assignment = () => {
  const { onChange } = useField(createEngineForm.fields.assignmentId);

  return (
    <CreateEngineSelect
      labelId="assignmentIdLabel"
      labelName="Назначение"
      selectId="assignmentIdSelect"
      selectData={assignmentsSelect}
      onChange={onChange}
      fetchingDataUrl="/assignmentsData"
    />
  );
};

const EngineRating = () => {
  const { onChange } = useField(createEngineForm.fields.engineRatingId);

  return (
    <CreateEngineSelect
      labelId="engineRatingIdLabel"
      labelName="Рейтинг двигателя"
      selectId="engineRatingIdSelect"
      selectData={engineRatingSelect}
      onChange={onChange}
      fetchingDataUrl="/engineRatingData"
    />
  );
};

const OperatingTimeYear = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeYear);

  return (
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
};

const OperatingTimeFirstTs = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeFirstTs);

  return (
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
};

const OperatingTimeToRepair = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeToRepair);

  return (
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
};

const FuelRate = () => {
  const { value, onChange } = useField(createEngineForm.fields.fuelRate);

  return (
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
};

const FuelRateNominalPower = () => {
  const { value, onChange } = useField(createEngineForm.fields.fuelRateNominalPower);

  return (
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
};

const CylinderWorkingVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderWorkingVolume);

  return (
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
};

const CylinderQuantity = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderQuantity);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="cylinderQuantity"
      label="Количество"
      variant="outlined"
      size="small"
    />
  );
};

const CylinderDiameter = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderDiameter);

  return (
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
};

const PistonStroke = () => {
  const { value, onChange } = useField(createEngineForm.fields.pistonStroke);

  return (
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
};

const СompressionRatio = () => {
  const { value, onChange } = useField(createEngineForm.fields.compressionRatio);

  return (
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
};

const InjectionType = () => {
  const { value, onChange } = useField(createEngineForm.fields.injectionType);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="injectionType"
      label="Тип впрыска"
      variant="outlined"
      size="small"
    />
  );
};

const InjectionPressure = () => {
  const { value, onChange } = useField(createEngineForm.fields.injectionPressure);

  return (
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
};

const СylinderMaxPressure = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderMaxPressure);

  return (
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
};

const CylinderArrangement = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderArrangement);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="cylinderArrangement"
      label="Расположение цилиндра"
      variant="outlined"
      size="small"
    />
  );
};

const CylinderDegrees = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderDegrees);

  return (
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
};

const WeightDryNoImplements = () => {
  const { value, onChange } = useField(createEngineForm.fields.weightDryNoImplements);

  return (
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
};

const WeightWithImplements = () => {
  const { value, onChange } = useField(createEngineForm.fields.weightWithImplements);

  return (
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
};

const CoolingSystemType = () => {
  const { value, onChange } = useField(createEngineForm.fields.coolingSystemType);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="coolingSystemType"
      label="Тип системы охлаждения"
      variant="outlined"
      size="small"
    />
  );
};

const Length = () => {
  const { value, onChange } = useField(createEngineForm.fields.length);

  return (
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
};

const Width = () => {
  const { value, onChange } = useField(createEngineForm.fields.width);

  return (
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
};

const Height = () => {
  const { value, onChange } = useField(createEngineForm.fields.height);

  return (
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
};

const OilRate = () => {
  const { value, onChange } = useField(createEngineForm.fields.oilRate);

  return (
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
};

const OilSystemVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.oilSystemVolume);

  return (
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
};

const CoolingSystemVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.coolingSystemVolume);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="coolingSystemVolume"
      label="Объем системы охлаждения, л"
      variant="outlined"
      size="small"
    />
  );
};

const ImoEcoStandard = () => {
  const { value, onChange } = useField(createEngineForm.fields.imoEcoStandard);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="imoEcoStandard"
      label="IMO эко стандарт"
      variant="outlined"
      size="small"
    />
  );
};

const EpaEcoStandard = () => {
  const { value, onChange } = useField(createEngineForm.fields.epaEcoStandard);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="epaEcoStandard"
      label="EPA эко стандарт"
      variant="outlined"
      size="small"
    />
  );
};

const EuEcoStandard = () => {
  const { value, onChange } = useField(createEngineForm.fields.euEcoStandard);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="euEcoStandard"
      label="EU эко стандарт"
      variant="outlined"
      size="small"
    />
  );
};

const UicEcoStandard = () => {
  const { value, onChange } = useField(createEngineForm.fields.uicEcoStandard);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="uicEcoStandard"
      label="UIC эко стандарт"
      variant="outlined"
      size="small"
    />
  );
};

const VesselType = () => {
  const { value, onChange } = useField(createEngineForm.fields.vesselType);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="vesselType"
      label="Тип судна"
      variant="outlined"
      size="small"
    />
  );
};

const ClassificationSociety = () => {
  const { onChange } = useField(createEngineForm.fields.classificationSocietyId);

  return (
    <CreateEngineSelect
      labelId="classificationSocietiesLabel"
      labelName="Классифиционное общество"
      selectId="classificationSocietiesSelect"
      selectData={classificationSocietySelect}
      onChange={onChange}
      fetchingDataUrl="/classificationSocietyData"
    />
  );
};

const FlangeType = () => {
  const { onChange } = useField(createEngineForm.fields.flangeId);

  return (
    <CreateEngineSelect
      labelId="flangeTypeLabel"
      labelName="Тип фланца"
      selectId="flangeTypeSelect"
      selectData={flangeSelect}
      onChange={onChange}
      fetchingDataUrl="/flangeTypesData"
    />
  );
};

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,

  marginBottom: 8,
  marginRight: 8,
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const img: React.CSSProperties = {
  display: "block",
  height: "250px",
  width: "250px",
  border: "1px solid #eaeaea",
  objectFit: "contain",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const baseStyle = {
  flex: 1,
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  height: "100%",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const ImageDropZone = () => {
  const { value, onChange, reset } = useField(createEngineForm.fields.image);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onChange(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = value && (
    <div style={thumb} key={value.name}>
      <div style={thumbInner}>
        <img src={value.preview} style={img} />
        <IconButton
          onClick={() => reset()}
          aria-label="delete engine image"
          style={{ height: "24px", padding: 0, position: "relative", left: "-30px", top: "5px" }}
        >
          <CloseIcon color="action" />
        </IconButton>
      </div>
    </div>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (value) URL.revokeObjectURL(value.preview);
    },
    [value]
  );

  return (
    <section style={{ width: "250px", height: "250px" }}>
      {value === null ? (
        <div {...getRootProps({ style })}>
          <AddIcon fontSize="large" color="action" />
          <input {...getInputProps()} />
          <Typography align="center">
            Нажмите или перетащите, чтобы загрузить изображение двигателя
          </Typography>
        </div>
      ) : (
        <>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </>
      )}
    </section>
  );
};

const FilesUploader = () => {
  const { value, onChange, reset } = useField(createEngineForm.fields.files);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  const acceptedFileItems = value?.map((file) => (
    <Typography
      key={file.name}
      style={{
        marginTop: "8px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "150px",
      }}
    >
      {file.name}
    </Typography>
  ));

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div style={{ height: "100%", display: "flex", width: "100%" }}>
      {value === null || value.length === 0 ? (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <AddIcon fontSize="large" color="action" />
          <Typography align="center">
            Нажмите или перетащите, чтобы загрузить файлы для двигателя
          </Typography>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography align="center">Удалить загруженные файлы</Typography>
          <IconButton onClick={() => reset()} aria-label="delete engine image">
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
      )}

      <div style={{ margin: "0 20px" }}>
        <Typography variant="h6">Принятые файлы</Typography>
        <div>{acceptedFileItems}</div>
      </div>
    </div>
  );
};

type CreateEngineSelectProps = {
  labelId: string;
  labelName: string;
  selectId: string;
  selectData: SelectedDataProps;
  onChange: Event<string>;
  fetchingDataUrl: string;
};

const CreateEngineSelect = ({
  labelId,
  labelName,
  selectId,
  selectData,
  onChange,
  fetchingDataUrl,
}: CreateEngineSelectProps) => {
  const { loadSelectDataFx, $selectedData } = selectData;
  const items = useStore($selectedData);

  useEffect(() => {
    loadSelectDataFx(fetchingDataUrl);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" variant="outlined" fullWidth style={{ height: "100%" }}>
      <InputLabel id={labelId}>{labelName}</InputLabel>
      <Select
        label={labelName}
        labelId={labelId}
        id={selectId}
        defaultValue=""
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Не выбрано</em>
        </MenuItem>

        {items.map(({ id, value }) => (
          <MenuItem key={id} value={id}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
