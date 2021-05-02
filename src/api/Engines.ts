import { CheckboxValue } from "../components/checkbox/model";
import { FacetValue } from "../pages/search_engines/model";

export interface EngineDemo {
  id: number;
  model: string;
  manufacturerName: string;
  cylinderQuantity: number;
  weightDryNoImplements: number;
  loadMode: string;
  flangeType: string;
  assignment: string;
  powerRating: number;
  imoEcoStandard: string;
  epaEcoStandard: string;
  euEcoStandard: string;
  uicEcoStandard: string;
  length: number;
  width: number;
  height: number;
  classificationSociety: string;
  image: string;
}

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
  manufacturerNames: CheckboxValue[];
  powerRating: FacetValue;
  rotationSpeed: CheckboxValue[];
  cylindersQuantity: CheckboxValue[];
  flangeTypes: CheckboxValue[];
  weightDryNoImplements: FacetValue;
  length: FacetValue;
  width: FacetValue;
  height: FacetValue;
  imoEcoStandards: CheckboxValue[];
  epaEcoStandards: CheckboxValue[];
  euEcoStandards: CheckboxValue[];
  uicEcoStandards: CheckboxValue[];
  lastFetchedEngineId: number;
}
