import { useField } from "effector-forms/dist";
import { FormEvent, useEffect } from "react";
import { Header } from "../../../components/header";

import { createEngineForm } from "./create-engine-model";
import { EngineFormTemplate } from "../common/template";
import {
  ModelView,
  SeriesView,
  PowerRatingView,
  TorqueMaxView,
  CoolingSystemTypeView,
  CoolingSystemVolumeView,
  CylinderArrangementView,
  CylinderDegreesView,
  CylinderDiameterView,
  CylinderWorkingVolumeView,
  FuelRateNominalPowerView,
  FuelRateView,
  HeightView,
  InjectionPressureView,
  InjectionTypeView,
  LengthView,
  OilRateView,
  OilSystemVolumeView,
  OperatingTimeFirstTsView,
  OperatingTimeToRepairView,
  OperatingTimeYearView,
  PistonStrokeView,
  VesselTypeView,
  WeightDryNoImplementsView,
  WeightWithImplementsView,
  WidthView,
  СompressionRatioView,
  СylinderMaxPressureView,
} from "../common/inputs";
import {
  AssignmentView,
  ClassificationSocietyView,
  CylinderQuantityView,
  EngineRatingView,
  EpaEcoStandardView,
  EuEcoStandardView,
  FlangeTypeView,
  ImoEcoStandardView,
  ManufacturerView,
  RotationFrequencyView,
  UicEcoStandardView,
} from "../common/selects";

import { FilesUploaderView, ImageUploaderView } from "../common/uploaders";

export const CreateEnginePage = () => (
  <>
    <Header />
    <CreateEngineForm />
  </>
);

const CreateEngineForm = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEngineForm.submit();
  };

  return (
    <EngineFormTemplate
      onSubmit={onSubmit}
      imageUploader={<ImageUploader />}
      filesUploader={<FilesUploader />}
      model={<Model />}
      series={<Series />}
      powerRating={<PowerRating />}
      rotationFrequency={<RotationFrequency />}
      manufacturer={<Manufacturer />}
      torqueMax={<TorqueMax />}
      assignment={<Assignment />}
      engineRating={<EngineRating />}
      flangeType={<FlangeType />}
      //cylinder
      cylinderWorkingVolume={<CylinderWorkingVolume />}
      cylinderQuantity={<CylinderQuantity />}
      cylinderDiameter={<CylinderDiameter />}
      pistonStroke={<PistonStroke />}
      compressionRatio={<СompressionRatio />}
      injectionType={<InjectionType />}
      injectionPressure={<InjectionPressure />}
      cylinderMaxPressure={<СylinderMaxPressure />}
      cylinderArrangement={<CylinderArrangement />}
      cylinderDegrees={<CylinderDegrees />}
      // operating time
      operatingTimeYear={<OperatingTimeYear />}
      operatingTimeFirstTs={<OperatingTimeFirstTs />}
      operatingTimeToRepair={<OperatingTimeToRepair />}
      // fuel
      fuelRate={<FuelRate />}
      fuelRateNominalPower={<FuelRateNominalPower />}
      // oil
      oilRate={<OilRate />}
      oilSystemVolume={<OilSystemVolume />}
      // dimensions
      length={<Length />}
      width={<Width />}
      height={<Height />}
      // weight
      weightDryNoImplements={<WeightDryNoImplements />}
      weightWithImplements={<WeightWithImplements />}
      // cooling
      coolingSystemType={<CoolingSystemType />}
      coolingSystemVolume={<CoolingSystemVolume />}
      // eco standards
      imoEcoStandard={<ImoEcoStandard />}
      epaEcoStandard={<EpaEcoStandard />}
      euEcoStandard={<EuEcoStandard />}
      uicEcoStandard={<UicEcoStandard />}
      // others
      vesselType={<VesselType />}
      classificationSociety={<ClassificationSociety />}
      submitButtonText="Добавить"
    />
  );
};

const Model = () => {
  const { value, onChange } = useField(createEngineForm.fields.model);
  return <ModelView value={value} onChange={onChange} />;
};

const Series = () => {
  const { value, onChange } = useField(createEngineForm.fields.series);
  return <SeriesView value={value} onChange={onChange} />;
};

const PowerRating = () => {
  const { value, onChange } = useField(createEngineForm.fields.powerRating);
  return <PowerRatingView value={value} onChange={onChange} />;
};

const RotationFrequency = () => {
  const { onChange } = useField(createEngineForm.fields.rotationFrequencyId);
  return <RotationFrequencyView onChange={onChange} />;
};

const Manufacturer = () => {
  const { onChange } = useField(createEngineForm.fields.manufacturerId);
  return <ManufacturerView onChange={onChange} />;
};

const TorqueMax = () => {
  const { value, onChange } = useField(createEngineForm.fields.torqueMax);
  return <TorqueMaxView value={value} onChange={onChange} />;
};

const Assignment = () => {
  const { onChange } = useField(createEngineForm.fields.assignmentId);
  return <AssignmentView onChange={onChange} />;
};

const EngineRating = () => {
  const { onChange } = useField(createEngineForm.fields.engineRatingId);
  return <EngineRatingView onChange={onChange} />;
};

const OperatingTimeYear = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeYear);
  return <OperatingTimeYearView value={value} onChange={onChange} />;
};

const OperatingTimeFirstTs = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeFirstTs);
  return <OperatingTimeFirstTsView value={value} onChange={onChange} />;
};

const OperatingTimeToRepair = () => {
  const { value, onChange } = useField(createEngineForm.fields.operatingTimeToRepair);
  return <OperatingTimeToRepairView value={value} onChange={onChange} />;
};

const FuelRate = () => {
  const { value, onChange } = useField(createEngineForm.fields.fuelRate);
  return <FuelRateView value={value} onChange={onChange} />;
};

const FuelRateNominalPower = () => {
  const { value, onChange } = useField(createEngineForm.fields.fuelRateNominalPower);
  return <FuelRateNominalPowerView value={value} onChange={onChange} />;
};

const CylinderWorkingVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderWorkingVolume);
  return <CylinderWorkingVolumeView value={value} onChange={onChange} />;
};

const CylinderQuantity = () => {
  const { onChange } = useField(createEngineForm.fields.cylinderQuantityId);
  return <CylinderQuantityView onChange={onChange} />;
};

const CylinderDiameter = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderDiameter);
  return <CylinderDiameterView value={value} onChange={onChange} />;
};

const PistonStroke = () => {
  const { value, onChange } = useField(createEngineForm.fields.pistonStroke);
  return <PistonStrokeView value={value} onChange={onChange} />;
};

const СompressionRatio = () => {
  const { value, onChange } = useField(createEngineForm.fields.compressionRatio);
  return <СompressionRatioView value={value} onChange={onChange} />;
};

const InjectionType = () => {
  const { value, onChange } = useField(createEngineForm.fields.injectionType);
  return <InjectionTypeView value={value} onChange={onChange} />;
};

const InjectionPressure = () => {
  const { value, onChange } = useField(createEngineForm.fields.injectionPressure);
  return <InjectionPressureView value={value} onChange={onChange} />;
};

const СylinderMaxPressure = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderMaxPressure);
  return <СylinderMaxPressureView value={value} onChange={onChange} />;
};

const CylinderArrangement = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderArrangement);
  return <CylinderArrangementView value={value} onChange={onChange} />;
};

const CylinderDegrees = () => {
  const { value, onChange } = useField(createEngineForm.fields.cylinderDegrees);
  return <CylinderDegreesView value={value} onChange={onChange} />;
};

const WeightDryNoImplements = () => {
  const { value, onChange } = useField(createEngineForm.fields.weightDryNoImplements);
  return <WeightDryNoImplementsView value={value} onChange={onChange} />;
};

const WeightWithImplements = () => {
  const { value, onChange } = useField(createEngineForm.fields.weightWithImplements);
  return <WeightWithImplementsView value={value} onChange={onChange} />;
};

const CoolingSystemType = () => {
  const { value, onChange } = useField(createEngineForm.fields.coolingSystemType);
  return <CoolingSystemTypeView value={value} onChange={onChange} />;
};

const Length = () => {
  const { value, onChange } = useField(createEngineForm.fields.length);
  return <LengthView value={value} onChange={onChange} />;
};

const Width = () => {
  const { value, onChange } = useField(createEngineForm.fields.width);
  return <WidthView value={value} onChange={onChange} />;
};

const Height = () => {
  const { value, onChange } = useField(createEngineForm.fields.height);
  return <HeightView value={value} onChange={onChange} />;
};

const OilRate = () => {
  const { value, onChange } = useField(createEngineForm.fields.oilRate);
  return <OilRateView value={value} onChange={onChange} />;
};

const OilSystemVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.oilSystemVolume);
  return <OilSystemVolumeView value={value} onChange={onChange} />;
};

const CoolingSystemVolume = () => {
  const { value, onChange } = useField(createEngineForm.fields.coolingSystemVolume);
  return <CoolingSystemVolumeView value={value} onChange={onChange} />;
};

const ImoEcoStandard = () => {
  const { onChange } = useField(createEngineForm.fields.imoEcoStandardId);
  return <ImoEcoStandardView onChange={onChange} />;
};

const EpaEcoStandard = () => {
  const { onChange } = useField(createEngineForm.fields.epaEcoStandardId);
  return <EpaEcoStandardView onChange={onChange} />;
};

const EuEcoStandard = () => {
  const { onChange } = useField(createEngineForm.fields.euEcoStandardId);
  return <EuEcoStandardView onChange={onChange} />;
};

const UicEcoStandard = () => {
  const { onChange } = useField(createEngineForm.fields.uicEcoStandardId);
  return <UicEcoStandardView onChange={onChange} />;
};

const VesselType = () => {
  const { value, onChange } = useField(createEngineForm.fields.vesselType);
  return <VesselTypeView value={value} onChange={onChange} />;
};

const ClassificationSociety = () => {
  const { onChange } = useField(createEngineForm.fields.classificationSocietyId);
  return <ClassificationSocietyView onChange={onChange} />;
};

const FlangeType = () => {
  const { onChange } = useField(createEngineForm.fields.flangeId);
  return <FlangeTypeView onChange={onChange} />;
};

const ImageUploader = () => {
  const { value, onChange, reset } = useField(createEngineForm.fields.image);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (value) URL.revokeObjectURL(value.preview);
    },
    [value]
  );

  return <ImageUploaderView value={value} onChange={onChange} reset={reset} />;
};

const FilesUploader = () => {
  const { value, onChange, reset } = useField(createEngineForm.fields.files);
  return <FilesUploaderView value={value} onChange={onChange} reset={reset} />;
};
