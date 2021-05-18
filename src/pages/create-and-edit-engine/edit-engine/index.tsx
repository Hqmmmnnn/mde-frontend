import { IconButton } from "@material-ui/core";
import { useField } from "effector-forms/dist";
import { useStore } from "effector-react";
import { FormEvent, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "../../../features/common/header";
import CloseIcon from "@material-ui/icons/Close";
import {
  ModelView,
  SeriesView,
  PowerRatingView,
  TorqueMaxView,
  OperatingTimeYearView,
  OperatingTimeFirstTsView,
  OperatingTimeToRepairView,
  FuelRateView,
  FuelRateNominalPowerView,
  CylinderWorkingVolumeView,
  CylinderDiameterView,
  PistonStrokeView,
  СompressionRatioView,
  InjectionPressureView,
  СylinderMaxPressureView,
  CylinderDegreesView,
  WeightDryNoImplementsView,
  WeightWithImplementsView,
  LengthView,
  WidthView,
  HeightView,
  OilRateView,
  OilSystemVolumeView,
  CoolingSystemVolumeView,
  RotationFrequencyView,
  NoteView,
} from "../common/inputs";
import {
  ManufacturerView,
  AssignmentView,
  EngineRatingView,
  CylinderQuantityView,
  InjectionTypeView,
  CylinderArrangementView,
  CoolingSystemTypeView,
  ImoEcoStandardView,
  EpaEcoStandardView,
  EuEcoStandardView,
  UicEcoStandardView,
  VesselTypeView,
  ClassificationSocietyView,
  FlangeTypeView,
} from "../common/selects";
import { EngineFormTemplate } from "../common/template";
import { FilesUploaderViewForUpdate, ImageUploaderView } from "../common/uploaders";

import {
  $engineImage,
  $isEngineImageExist,
  editEngineForm,
  getEngineImageFx,
  getEditDataFx,
  deleteEngineImageFx,
  getFilesFx,
  $editEngineFiles,
  saveEngineImageFx,
} from "./edit-engie-model";
import { useDropzone } from "react-dropzone";
import { WithSecure } from "../../../lib/wIth-secure";
import { ScrollToTop } from "../../../lib/scroll-to-top";

export const EditEnginePage = () => (
  <WithSecure>
    <>
      <ScrollToTop />
      <Header />
      <EditEngineForm />
    </>
  </WithSecure>
);

const EditEngineForm = () => {
  const { id }: { id: string } = useParams();
  const { onChange } = useField(editEngineForm.fields.engineId);
  const img = useStore($engineImage);
  const isImgExist = useStore($isEngineImageExist);

  useEffect(() => {
    getEditDataFx(id);
    getEngineImageFx(id);
  }, [id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    onChange(id);
    e.preventDefault();
    editEngineForm.submit();
  };

  return (
    <>
      <EngineFormTemplate
        onSubmit={onSubmit}
        imageUploader={
          isImgExist ? <Image img={img} engineId={id} /> : <ImageUploader engineId={id} />
        }
        filesUploader={<FilesUploader engineId={id} />}
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
        submitButtonText="Обновить"
      />
    </>
  );
};

const Model = () => {
  const { value, onChange } = useField(editEngineForm.fields.model);
  return <ModelView value={value} onChange={onChange} />;
};

const Series = () => {
  const { value, onChange } = useField(editEngineForm.fields.series);
  return <SeriesView value={value} onChange={onChange} />;
};

const PowerRating = () => {
  const { value, onChange } = useField(editEngineForm.fields.powerRating);
  return <PowerRatingView value={value} onChange={onChange} />;
};

const RotationFrequency = () => {
  const { value, onChange } = useField(editEngineForm.fields.rotationFrequency);
  return <RotationFrequencyView value={value} onChange={onChange} />;
};

const Manufacturer = () => {
  const { value, onChange } = useField(editEngineForm.fields.manufacturerId);
  return <ManufacturerView value={value} onChange={onChange} />;
};

const TorqueMax = () => {
  const { value, onChange } = useField(editEngineForm.fields.torqueMax);
  return <TorqueMaxView value={value} onChange={onChange} />;
};

const Assignment = () => {
  const { value, onChange } = useField(editEngineForm.fields.assignmentId);
  return <AssignmentView value={value} onChange={onChange} />;
};

const EngineRating = () => {
  const { value, onChange } = useField(editEngineForm.fields.engineRatingId);
  return <EngineRatingView value={value} onChange={onChange} />;
};

const OperatingTimeYear = () => {
  const { value, onChange } = useField(editEngineForm.fields.operatingTimeYear);
  return <OperatingTimeYearView value={value} onChange={onChange} />;
};

const OperatingTimeFirstTs = () => {
  const { value, onChange } = useField(editEngineForm.fields.operatingTimeFirstTs);
  return <OperatingTimeFirstTsView value={value} onChange={onChange} />;
};

const OperatingTimeToRepair = () => {
  const { value, onChange } = useField(editEngineForm.fields.operatingTimeToRepair);
  return <OperatingTimeToRepairView value={value} onChange={onChange} />;
};

const FuelRate = () => {
  const { value, onChange } = useField(editEngineForm.fields.fuelRate);
  return <FuelRateView value={value} onChange={onChange} />;
};

const FuelRateNominalPower = () => {
  const { value, onChange } = useField(editEngineForm.fields.fuelRateNominalPower);
  return <FuelRateNominalPowerView value={value} onChange={onChange} />;
};

const CylinderWorkingVolume = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderWorkingVolume);
  return <CylinderWorkingVolumeView value={value} onChange={onChange} />;
};

const CylinderQuantity = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderQuantityId);
  return <CylinderQuantityView value={value} onChange={onChange} />;
};

const CylinderDiameter = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderDiameter);
  return <CylinderDiameterView value={value} onChange={onChange} />;
};

const PistonStroke = () => {
  const { value, onChange } = useField(editEngineForm.fields.pistonStroke);
  return <PistonStrokeView value={value} onChange={onChange} />;
};

const СompressionRatio = () => {
  const { value, onChange } = useField(editEngineForm.fields.compressionRatio);
  return <СompressionRatioView value={value} onChange={onChange} />;
};

const InjectionType = () => {
  const { value, onChange } = useField(editEngineForm.fields.injectionTypeId);
  return <InjectionTypeView value={value} onChange={onChange} />;
};

const InjectionPressure = () => {
  const { value, onChange } = useField(editEngineForm.fields.injectionPressure);
  return <InjectionPressureView value={value} onChange={onChange} />;
};

const СylinderMaxPressure = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderMaxPressure);
  return <СylinderMaxPressureView value={value} onChange={onChange} />;
};

const CylinderArrangement = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderArrangementId);
  return <CylinderArrangementView value={value} onChange={onChange} />;
};

const CylinderDegrees = () => {
  const { value, onChange } = useField(editEngineForm.fields.cylinderDegrees);
  return <CylinderDegreesView value={value} onChange={onChange} />;
};

const WeightDryNoImplements = () => {
  const { value, onChange } = useField(editEngineForm.fields.weightDryNoImplements);
  return <WeightDryNoImplementsView value={value} onChange={onChange} />;
};

const WeightWithImplements = () => {
  const { value, onChange } = useField(editEngineForm.fields.weightWithImplements);
  return <WeightWithImplementsView value={value} onChange={onChange} />;
};

const CoolingSystemType = () => {
  const { value, onChange } = useField(editEngineForm.fields.coolingSystemTypeId);
  return <CoolingSystemTypeView value={value} onChange={onChange} />;
};

const Length = () => {
  const { value, onChange } = useField(editEngineForm.fields.length);
  return <LengthView value={value} onChange={onChange} />;
};

const Width = () => {
  const { value, onChange } = useField(editEngineForm.fields.width);
  return <WidthView value={value} onChange={onChange} />;
};

const Height = () => {
  const { value, onChange } = useField(editEngineForm.fields.height);
  return <HeightView value={value} onChange={onChange} />;
};

const OilRate = () => {
  const { value, onChange } = useField(editEngineForm.fields.oilRate);
  return <OilRateView value={value} onChange={onChange} />;
};

const OilSystemVolume = () => {
  const { value, onChange } = useField(editEngineForm.fields.oilSystemVolume);
  return <OilSystemVolumeView value={value} onChange={onChange} />;
};

const CoolingSystemVolume = () => {
  const { value, onChange } = useField(editEngineForm.fields.coolingSystemVolume);
  return <CoolingSystemVolumeView value={value} onChange={onChange} />;
};

const ImoEcoStandard = () => {
  const { value, onChange } = useField(editEngineForm.fields.imoEcoStandardId);
  return <ImoEcoStandardView value={value} onChange={onChange} />;
};

const EpaEcoStandard = () => {
  const { value, onChange } = useField(editEngineForm.fields.epaEcoStandardId);
  return <EpaEcoStandardView value={value} onChange={onChange} />;
};

const EuEcoStandard = () => {
  const { value, onChange } = useField(editEngineForm.fields.euEcoStandardId);
  return <EuEcoStandardView value={value} onChange={onChange} />;
};

const UicEcoStandard = () => {
  const { value, onChange } = useField(editEngineForm.fields.uicEcoStandardId);
  return <UicEcoStandardView value={value} onChange={onChange} />;
};

const VesselType = () => {
  const { value, onChange } = useField(editEngineForm.fields.vesselTypeId);
  return <VesselTypeView value={value} onChange={onChange} />;
};

const ClassificationSociety = () => {
  const { value, onChange } = useField(editEngineForm.fields.classificationSocietyId);
  return <ClassificationSocietyView value={value} onChange={onChange} />;
};

const FlangeType = () => {
  const { value, onChange } = useField(editEngineForm.fields.flangeId);
  return <FlangeTypeView value={value} onChange={onChange} />;
};

const Note = () => {
  const { value, onChange } = useField(editEngineForm.fields.note);
  return <NoteView value={value} onChange={onChange} />;
};

const ImageUploader = ({ engineId }: { engineId: string }) => {
  const { value, onChange, reset } = useField(editEngineForm.fields.image);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const image = acceptedFiles[0];

      saveEngineImageFx({ engineId, image }).then(() => {
        onChange(Object.assign(image, { preview: URL.createObjectURL(image) }));
      });
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (value) URL.revokeObjectURL(value.preview);
    },
    [value]
  );

  const onCloseIconClick = (e: any) => {
    deleteEngineImageFx(engineId);
    reset();
  };

  return (
    <ImageUploaderView
      value={value}
      onCloseIconClick={onCloseIconClick}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
    />
  );
};

const Image = ({ img, engineId }: { img: string; engineId: string }) => (
  <div style={{ display: "flex" }}>
    <img src={img} style={{ width: "250px", height: "250px", objectFit: "contain" }} />
    <IconButton
      onClick={() => deleteEngineImageFx(engineId)}
      aria-label="delete engine image"
      style={{ height: "24px", padding: 0, position: "relative", left: "-30px", top: "5px" }}
    >
      <CloseIcon color="action" />
    </IconButton>
  </div>
);

const FilesUploader = ({ engineId }: { engineId: string }) => {
  const value = useStore($editEngineFiles);

  useEffect(() => {
    getFilesFx(engineId);
  }, [engineId]);

  return <FilesUploaderViewForUpdate value={value} engineId={engineId} />;
};
