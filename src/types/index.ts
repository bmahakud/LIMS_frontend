export type TestCategory = 'Physical Properties' | 'Mechanical Strength' | 'Thermal Performance' | 'Chemical Composition';

export interface TestItem {
  id: string;
  code: string;
  name: string;
  category: TestCategory;
  purpose: string;
  unit: string;
  applicableStandards: string[];
  testSpecimen: string;
  temperatureRange?: string;
  description: string;
  typicalApplications: string[];
  featured?: boolean;
}

export type EquipmentCategory = 
  | 'Sample Preparation'
  | 'Physical Testing'
  | 'Mechanical Testing'
  | 'High-Temperature Testing'
  | 'Chemical Analysis';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  image: string;
  operation: string;
  keyCapability: string;
  standardsSupported: string[];
  specifications: { [key: string]: string };
}

export interface ProcessStage {
  stepNumber: number;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyDeliverables: string[];
  qualityControls: string[];
  procedureReference: string;
}

export interface StandardReference {
  code: string;
  organization: 'ISO' | 'ASTM' | 'EN/DIN' | 'DC-SPEC';
  title: string;
  scope: string;
  applicableTests: string[];
}

export interface InspectionReportSample {
  reportId: string;
  clientRef: string;
  dateTested: string;
  materialType: string;
  qualityGrade: string;
  batchNumber: string;
  specification: string;
  tests: {
    property: string;
    standard: string;
    unit: string;
    requirement: string;
    measuredValue: string;
    status: 'APPROVED' | 'NOT APPROVED';
  }[];
  verdict: 'APPROVED' | 'NOT APPROVED';
  remarks: string;
}
