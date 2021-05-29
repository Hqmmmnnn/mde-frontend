import { useField, useForm } from "effector-forms/dist";
import { FormEvent, useEffect } from "react";

import { newEngineForm, saveEngineFxWithToken } from "./create-engine-model";
import { EngineFormTemplate } from "../common/template";
import {
  ModelView,
  SeriesView,
  PowerRatingView,
  TorqueMaxView,
  CoolingSystemVolumeView,
  CylinderDegreesView,
  CylinderDiameterView,
  CylinderWorkingVolumeView,
  FuelRateNominalPowerView,
  FuelRateView,
  HeightView,
  InjectionPressureView,
  LengthView,
  OilRateView,
  OilSystemVolumeView,
  OperatingTimeFirstTsView,
  OperatingTimeToRepairView,
  OperatingTimeYearView,
  PistonStrokeView,
  WeightDryNoImplementsView,
  WeightWithImplementsView,
  WidthView,
  СompressionRatioView,
  СylinderMaxPressureView,
  RotationFrequencyView,
  NoteView,
} from "../common/inputs";
import {
  AssignmentView,
  ClassificationSocietyView,
  CoolingSystemTypeView,
  CylinderArrangementView,
  CylinderQuantityView,
  EngineRatingView,
  EpaEcoStandardView,
  EuEcoStandardView,
  FlangeTypeView,
  ImoEcoStandardView,
  InjectionTypeView,
  ManufacturerView,
  UicEcoStandardView,
  VesselTypeView,
} from "../common/selects";

import { FilesUploaderView, ImageUploaderView } from "../common/uploaders";
import { Header } from "../../../features/common/header";
import { useDropzone } from "react-dropzone";
import { WithSecure } from "../../../lib/wIth-secure";
import { ScrollToTop } from "../../../lib/scroll-to-top";
import { useSnackbar } from "notistack";
import { SubmitButton } from "../common/submitButton";

export const CreateEnginePage = () => (
  <WithSecure>
    <>
      <ScrollToTop />
      <Header />
      <CreateEngineForm />
    </>
  </WithSecure>
);

const CreateEngineForm = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      note={<Note />}
      submitButton={<AddedEngineButton />}
      onClickReset={newEngineForm.reset}
    />
  );
};

const AddedEngineButton = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { isValid, values } = useForm(newEngineForm);

  const handleClick = () => {
    if (isValid) {
      saveEngineFxWithToken(values)
        .then(() => enqueueSnackbar("Двигатель успешно добавлен", { variant: "success" }))
        .catch(() => enqueueSnackbar("Не удалось добавить двигатель", { variant: "error" }));
    }
  };

  return <SubmitButton text="Добавить" onClick={handleClick} />;
};

const Model = () => {
  const { value, onChange } = useField(newEngineForm.fields.model);
  return <ModelView value={value} onChange={onChange} />;
};

const Series = () => {
  const { value, onChange } = useField(newEngineForm.fields.series);
  return <SeriesView value={value} onChange={onChange} />;
};

const PowerRating = () => {
  const { value, onChange } = useField(newEngineForm.fields.powerRating);
  return <PowerRatingView value={value} onChange={onChange} />;
};

const RotationFrequency = () => {
  const { value, onChange } = useField(newEngineForm.fields.rotationFrequency);
  return <RotationFrequencyView value={value} onChange={onChange} />;
};

const Manufacturer = () => {
  const { value, onChange } = useField(newEngineForm.fields.manufacturerId);
  return <ManufacturerView value={value} onChange={onChange} />;
};

const TorqueMax = () => {
  const { value, onChange } = useField(newEngineForm.fields.torqueMax);
  return <TorqueMaxView value={value} onChange={onChange} />;
};

const Assignment = () => {
  const { value, onChange } = useField(newEngineForm.fields.assignmentId);
  return <AssignmentView value={value} onChange={onChange} />;
};

const EngineRating = () => {
  const { value, onChange } = useField(newEngineForm.fields.engineRatingId);
  return <EngineRatingView value={value} onChange={onChange} />;
};

const OperatingTimeYear = () => {
  const { value, onChange } = useField(newEngineForm.fields.operatingTimeYear);
  return <OperatingTimeYearView value={value} onChange={onChange} />;
};

const OperatingTimeFirstTs = () => {
  const { value, onChange } = useField(newEngineForm.fields.operatingTimeFirstTs);
  return <OperatingTimeFirstTsView value={value} onChange={onChange} />;
};

const OperatingTimeToRepair = () => {
  const { value, onChange } = useField(newEngineForm.fields.operatingTimeToRepair);
  return <OperatingTimeToRepairView value={value} onChange={onChange} />;
};

const FuelRate = () => {
  const { value, onChange } = useField(newEngineForm.fields.fuelRate);
  return <FuelRateView value={value} onChange={onChange} />;
};

const FuelRateNominalPower = () => {
  const { value, onChange } = useField(newEngineForm.fields.fuelRateNominalPower);
  return <FuelRateNominalPowerView value={value} onChange={onChange} />;
};

const CylinderWorkingVolume = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderWorkingVolume);
  return <CylinderWorkingVolumeView value={value} onChange={onChange} />;
};

const CylinderQuantity = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderQuantityId);
  return <CylinderQuantityView value={value} onChange={onChange} />;
};

const CylinderDiameter = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderDiameter);
  return <CylinderDiameterView value={value} onChange={onChange} />;
};

const PistonStroke = () => {
  const { value, onChange } = useField(newEngineForm.fields.pistonStroke);
  return <PistonStrokeView value={value} onChange={onChange} />;
};

const СompressionRatio = () => {
  const { value, onChange } = useField(newEngineForm.fields.compressionRatio);
  return <СompressionRatioView value={value} onChange={onChange} />;
};

const InjectionType = () => {
  const { value, onChange } = useField(newEngineForm.fields.injectionTypeId);
  return <InjectionTypeView value={value} onChange={onChange} />;
};

const InjectionPressure = () => {
  const { value, onChange } = useField(newEngineForm.fields.injectionPressure);
  return <InjectionPressureView value={value} onChange={onChange} />;
};

const СylinderMaxPressure = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderMaxPressure);
  return <СylinderMaxPressureView value={value} onChange={onChange} />;
};

const CylinderArrangement = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderArrangementId);
  return <CylinderArrangementView value={value} onChange={onChange} />;
};

const CylinderDegrees = () => {
  const { value, onChange } = useField(newEngineForm.fields.cylinderDegrees);
  return <CylinderDegreesView value={value} onChange={onChange} />;
};

const WeightDryNoImplements = () => {
  const { value, onChange } = useField(newEngineForm.fields.weightDryNoImplements);
  return <WeightDryNoImplementsView value={value} onChange={onChange} />;
};

const WeightWithImplements = () => {
  const { value, onChange } = useField(newEngineForm.fields.weightWithImplements);
  return <WeightWithImplementsView value={value} onChange={onChange} />;
};

const CoolingSystemType = () => {
  const { value, onChange } = useField(newEngineForm.fields.coolingSystemTypeId);
  return <CoolingSystemTypeView value={value} onChange={onChange} />;
};

const Length = () => {
  const { value, onChange } = useField(newEngineForm.fields.length);
  return <LengthView value={value} onChange={onChange} />;
};

const Width = () => {
  const { value, onChange } = useField(newEngineForm.fields.width);
  return <WidthView value={value} onChange={onChange} />;
};

const Height = () => {
  const { value, onChange } = useField(newEngineForm.fields.height);
  return <HeightView value={value} onChange={onChange} />;
};

const OilRate = () => {
  const { value, onChange } = useField(newEngineForm.fields.oilRate);
  return <OilRateView value={value} onChange={onChange} />;
};

const OilSystemVolume = () => {
  const { value, onChange } = useField(newEngineForm.fields.oilSystemVolume);
  return <OilSystemVolumeView value={value} onChange={onChange} />;
};

const CoolingSystemVolume = () => {
  const { value, onChange } = useField(newEngineForm.fields.coolingSystemVolume);
  return <CoolingSystemVolumeView value={value} onChange={onChange} />;
};

const ImoEcoStandard = () => {
  const { value, onChange } = useField(newEngineForm.fields.imoEcoStandardId);
  return <ImoEcoStandardView value={value} onChange={onChange} />;
};

const EpaEcoStandard = () => {
  const { value, onChange } = useField(newEngineForm.fields.epaEcoStandardId);
  return <EpaEcoStandardView value={value} onChange={onChange} />;
};

const EuEcoStandard = () => {
  const { value, onChange } = useField(newEngineForm.fields.euEcoStandardId);
  return <EuEcoStandardView value={value} onChange={onChange} />;
};

const UicEcoStandard = () => {
  const { value, onChange } = useField(newEngineForm.fields.uicEcoStandardId);
  return <UicEcoStandardView value={value} onChange={onChange} />;
};

const VesselType = () => {
  const { value, onChange } = useField(newEngineForm.fields.vesselTypeId);
  return <VesselTypeView value={value} onChange={onChange} />;
};

const ClassificationSociety = () => {
  const { value, onChange } = useField(newEngineForm.fields.classificationSocietyId);
  return <ClassificationSocietyView value={value} onChange={onChange} />;
};

const FlangeType = () => {
  const { value, onChange } = useField(newEngineForm.fields.flangeId);
  return <FlangeTypeView value={value} onChange={onChange} />;
};

const Note = () => {
  const { value, onChange } = useField(newEngineForm.fields.note);
  return <NoteView value={value} onChange={onChange} />;
};

const ImageUploader = () => {
  const { value, onChange, reset } = useField(newEngineForm.fields.image);

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

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (value) URL.revokeObjectURL(value.preview);
    },
    [value]
  );

  return (
    <ImageUploaderView
      value={value}
      onCloseIconClick={() => reset()}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
    />
  );
};

const FilesUploader = () => {
  const { value, onChange, reset } = useField(newEngineForm.fields.files);
  return <FilesUploaderView value={value} onChange={onChange} reset={reset} />;
};
