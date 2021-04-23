import { CylinderQuantityCheckbox } from "../components/cylinderQuantity";
import { FlangeCheckbox } from "../components/flangeType";
import { ManufacturersCheckBox } from "../components/manufacturers";
import { RotationSpeedCheckbox } from "../components/rotation-speed";
import { FacetValue } from "../engines_search/model";

export interface Engine {
  id: number;
  model: string;
  powerRating: number;
  rotationSpeed: number;
  manufacturerName: string;
  torqueMax: number;
  assignment: string;
  loadMode: string;
  flangeType: string;
  operatingTimeYear: number;
  operatingTimeFirstTs: number;
  operatingTimeToRepair: number;
  fuelRate: number;
  fuelRateNominalPower: number;
  cylinderWorkingVolume: number;
  cylinderQuantity: number;
  cylinderDiameter: number;
  pistonStroke: number;
  compressionRatio: number;
  cylinderMaxPressure: number;
  cylinderArrangement: string;
  cylinderDegrees: number;
  injectionType: string;
  injectionPressure: number;
  length: number;
  width: number;
  height: number;
  weightDryNoImplements: number;
  weightWithImplements: number;
  coolingSystemType: string;
  coolingSystemVolume: number;
  oilRate: number;
  oilSystemVolume: string;
  imoEcoStandard: string;
  epaEcoStandard: string;
  euEcoStandard: string;
  uicEcoStandard: string;
  vesselType: string;
  classificationSociety: string;
  image: string;
}

export interface EngineFilter {
  model: string;
  manufacturerName: ManufacturersCheckBox;
  powerRating: FacetValue;
  rotationSpeed: RotationSpeedCheckbox;
  cylinderQuantity: CylinderQuantityCheckbox;
  flangeType: FlangeCheckbox;
  weightDryNoImplements: FacetValue;
  length: FacetValue;
  width: FacetValue;
  height: FacetValue;
  imoEcoStandard: string;
  epaEcoStandard: string;
  euEcoStandard: string;
  uicEcoStandard: string;
  lastFetchedEngineId: number;
}
