import { Container, Grid, Button, Box, Typography } from "@material-ui/core";
import React, { FormEvent } from "react";

type EngineFormTemplateProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  imageUploader: React.ReactNode;
  filesUploader: React.ReactNode;
  model: React.ReactNode;
  series: React.ReactNode;
  powerRating: React.ReactNode;
  rotationFrequency: React.ReactNode;
  manufacturer: React.ReactNode;
  torqueMax: React.ReactNode;
  assignment: React.ReactNode;
  engineRating: React.ReactNode;
  flangeType: React.ReactNode;

  cylinderWorkingVolume: React.ReactNode;
  cylinderQuantity: React.ReactNode;
  cylinderDiameter: React.ReactNode;
  pistonStroke: React.ReactNode;
  compressionRatio: React.ReactNode;
  injectionType: React.ReactNode;
  injectionPressure: React.ReactNode;
  cylinderMaxPressure: React.ReactNode;
  cylinderArrangement: React.ReactNode;
  cylinderDegrees: React.ReactNode;

  operatingTimeYear: React.ReactNode;
  operatingTimeFirstTs: React.ReactNode;
  operatingTimeToRepair: React.ReactNode;

  fuelRate: React.ReactNode;
  fuelRateNominalPower: React.ReactNode;

  oilRate: React.ReactNode;
  oilSystemVolume: React.ReactNode;

  length: React.ReactNode;
  width: React.ReactNode;
  height: React.ReactNode;

  weightDryNoImplements: React.ReactNode;
  weightWithImplements: React.ReactNode;

  coolingSystemType: React.ReactNode;
  coolingSystemVolume: React.ReactNode;

  imoEcoStandard: React.ReactNode;
  epaEcoStandard: React.ReactNode;
  euEcoStandard: React.ReactNode;
  uicEcoStandard: React.ReactNode;

  vesselType: React.ReactNode;
  classificationSociety: React.ReactNode;

  submitButtonText: React.ReactNode;
};

export const EngineFormTemplate = ({
  onSubmit,

  imageUploader,
  filesUploader,
  model,
  series,
  powerRating,
  rotationFrequency,
  manufacturer,
  torqueMax,
  assignment,
  engineRating,
  flangeType,

  cylinderWorkingVolume,
  cylinderQuantity,
  cylinderDiameter,
  pistonStroke,
  compressionRatio,
  injectionType,
  injectionPressure,
  cylinderMaxPressure,
  cylinderArrangement,
  cylinderDegrees,

  operatingTimeYear,
  operatingTimeFirstTs,
  operatingTimeToRepair,

  fuelRate,
  fuelRateNominalPower,

  oilRate,
  oilSystemVolume,

  length,
  width,
  height,

  weightDryNoImplements,
  weightWithImplements,

  coolingSystemType,
  coolingSystemVolume,

  imoEcoStandard,
  epaEcoStandard,
  euEcoStandard,
  uicEcoStandard,

  vesselType,
  classificationSociety,

  submitButtonText,
}: EngineFormTemplateProps) => (
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
        <Grid item style={{ padding: "0 24px", display: "flex", width: "100%" }}>
          <Grid container spacing={6}>
            <Grid item>{imageUploader}</Grid>
            <Grid item style={{ display: "flex", flexGrow: 1 }}>
              {filesUploader}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container style={{ justifyContent: "flex-start" }}>
            <EngineFormBlock
              name="Основные характеристики"
              items={[
                model,
                series,
                powerRating,
                rotationFrequency,
                manufacturer,
                torqueMax,
                assignment,
                engineRating,
                flangeType,
              ]}
            />

            <EngineFormBlock
              name="Цилиндр"
              items={[
                cylinderWorkingVolume,
                cylinderQuantity,
                cylinderDiameter,
                pistonStroke,
                compressionRatio,
                cylinderMaxPressure,
                cylinderArrangement,
                cylinderDegrees,
              ]}
            />

            <Grid item>
              <EngineFormBlock
                name="Рекомендуемая наработка"
                items={[operatingTimeYear, operatingTimeFirstTs, operatingTimeToRepair]}
              />
              <EngineFormBlock name="Расход топлива" items={[fuelRate, fuelRateNominalPower]} />
              <EngineFormBlock name="Система смазки" items={[oilRate, oilSystemVolume]} />
            </Grid>

            <Grid item>
              <EngineFormBlock name="Габариты, мм" items={[length, width, height]} />
              <EngineFormBlock
                name="Масса, кг"
                items={[weightDryNoImplements, weightWithImplements]}
              />
              <EngineFormBlock name="Охлаждение" items={[coolingSystemType, coolingSystemVolume]} />
            </Grid>

            <Grid item>
              <EngineFormBlock
                name="Эко стандарты"
                items={[imoEcoStandard, epaEcoStandard, euEcoStandard, uicEcoStandard]}
              />
            </Grid>

            <Grid item>
              <EngineFormBlock name="Впрыск" items={[injectionType, injectionPressure]} />
            </Grid>

            <Grid item>
              <EngineFormBlock name="Другое" items={[vesselType, classificationSociety]} />
            </Grid>
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" color="primary" variant="outlined" type="submit">
              {submitButtonText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  </Container>
);

type EngineFormBlockProps = {
  items: React.ReactNode[];
  name: string;
};

const EngineFormBlock = ({ items, name }: EngineFormBlockProps) => {
  let key = 0;

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={2} style={{ width: "280px" }}>
        <Box paddingLeft={1}>
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
