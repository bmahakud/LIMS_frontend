import { StandardReference, InspectionReportSample } from '../types';

export const STANDARDS_MATRIX: StandardReference[] = [
  {
    code: 'ISO 5017',
    organization: 'ISO',
    title: 'Dense shaped refractory products — Determination of bulk density, apparent porosity and true porosity',
    scope: 'Referee liquid displacement and immersion methods for determining bulk density and apparent porosity of dense refractory bricks.',
    applicableTests: ['Bulk Density', 'Apparent Porosity', 'True Porosity']
  },
  {
    code: 'ISO 5016',
    organization: 'ISO',
    title: 'Shaped insulating refractory products — Determination of bulk density and true porosity',
    scope: 'Standard volumetric and weighing procedure for insulating firebricks and lightweight refractory products.',
    applicableTests: ['Insulating Brick Bulk Density', 'True Porosity']
  },
  {
    code: 'ISO 5018',
    organization: 'ISO',
    title: 'Refractory materials — Determination of true density',
    scope: 'Pycnometer method on finely milled refractory powders to establish real material density without internal void space.',
    applicableTests: ['True Density']
  },
  {
    code: 'ISO 10059-1',
    organization: 'ISO',
    title: 'Dense shaped refractory products — Cold compressive strength — Part 1: Referee test without packing',
    scope: 'Mechanical load application up to 3000 kN on plane-parallel ground refractory prisms until failure.',
    applicableTests: ['Cold Crushing Strength (Dense Bricks)']
  },
  {
    code: 'ISO 8895',
    organization: 'ISO',
    title: 'Shaped insulating refractory products — Cold crushing strength',
    scope: 'Compressive strength verification specifically calibrated for porous insulating firebrick geometries.',
    applicableTests: ['Cold Crushing Strength (Insulating)']
  },
  {
    code: 'ISO 1927-6',
    organization: 'ISO',
    title: 'Monolithic (unshaped) refractory products — Part 6: Measurement of physical properties',
    scope: 'Determination of density, porosity, cold crushing strength, and permanent linear change on castable and gunning test specimens.',
    applicableTests: ['Castable Density', 'Castable CCS', 'Castable PLC']
  },
  {
    code: 'ISO 2478',
    organization: 'ISO',
    title: 'Dense shaped refractory products — Permanent change in dimensions on heating',
    scope: 'High-temperature soaking (e.g. 5 hours at 1500°C) to quantify permanent thermal expansion or shrinkage post-firing.',
    applicableTests: ['Permanent Linear Change (PLC)']
  },
  {
    code: 'ISO 2477',
    organization: 'ISO',
    title: 'Shaped insulating refractory products — Permanent change in dimensions on heating',
    scope: 'Thermal dimensional stability evaluation for insulating firebrick grades under prolonged elevated soaking.',
    applicableTests: ['Insulating Brick PLC']
  },
  {
    code: 'ISO 3187',
    organization: 'ISO',
    title: 'Refractory products — Determination of creep in compression',
    scope: 'Long-term isothermal compression testing (20 to 50 hours at 1400°C to 1550°C under 0.2 MPa constant load).',
    applicableTests: ['Creep in Compression']
  },
  {
    code: 'ISO 1893',
    organization: 'ISO',
    title: 'Refractory products — Determination of refractoriness under load (differential method)',
    scope: 'Continuous differential dilatometer recording to detect T0.5, T1.0, and T2.0 softening temperatures under load up to 1700°C.',
    applicableTests: ['Refractoriness Under Load (RUL)']
  },
  {
    code: 'ISO 8894-2',
    organization: 'ISO',
    title: 'Refractory materials — Determination of thermal conductivity — Part 2: Hot-wire method',
    scope: 'Dynamic thermal conductivity measurement via embedded cross-array platinum hot-wire technique.',
    applicableTests: ['Thermal Conductivity']
  },
  {
    code: 'ISO 12677',
    organization: 'ISO',
    title: 'Chemical analysis of refractory products by X-ray fluorescence (WD-XRF) — Fused cast bead method',
    scope: 'Quantitative spectrometry of major refractory oxides (SiO2, Al2O3, Fe2O3, TiO2, CaO, MgO, K2O, Na2O) via fused tetraborate beads.',
    applicableTests: ['WD-XRF Chemical Assay']
  },
  {
    code: 'EN 993-19',
    organization: 'EN/DIN',
    title: 'Methods of test for dense shaped refractory products — Reversible thermal expansion',
    scope: 'Continuous recording of reversible linear thermal dilation from ambient to 1600°C.',
    applicableTests: ['Thermal Expansion Coefficient']
  },
  {
    code: 'DC-SPEC-REF',
    organization: 'DC-SPEC',
    title: 'Danieli Corus Engineering Specification for Refractory Materials Acceptance',
    scope: 'Mandatory technical limits and allowable tolerances for blast furnace, hot blast stove, and iron runner refractories.',
    applicableTests: ['All Laboratory Acceptance Protocols']
  }
];

export const SAMPLE_INSPECTION_REPORT: InspectionReportSample = {
  reportId: 'DCL-DEMO-2024-REF-001',
  clientRef: 'DEMO-PROJECT-HOT-BLAST-STOVE (Demonstration Record)',
  dateTested: '2024-03-15',
  materialType: 'High-Alumina Checker Brick (Demonstration Specimen)',
  qualityGrade: 'Grade HA-70S (Refractory Checker)',
  batchNumber: 'LOT-DEMO-HA-24/01',
  specification: 'Danieli Corus Refractory Acceptance Specification DC-SPEC-REF / ISO 5017 / ISO 10059-1',
  tests: [
    {
      property: 'Bulk Density',
      standard: 'ISO 5017',
      unit: 'kg/m³',
      requirement: '> 2550 kg/m³',
      measuredValue: '2620 kg/m³',
      status: 'APPROVED'
    },
    {
      property: 'Apparent Porosity',
      standard: 'ISO 5017',
      unit: '%',
      requirement: '< 18.0 %',
      measuredValue: '15.4 %',
      status: 'APPROVED'
    },
    {
      property: 'Cold Crushing Strength (CCS)',
      standard: 'ISO 10059-1',
      unit: 'MPa',
      requirement: '> 65.0 MPa',
      measuredValue: '92.4 MPa',
      status: 'APPROVED'
    },
    {
      property: 'Permanent Linear Change (5h / 1500°C)',
      standard: 'ISO 2478',
      unit: '%',
      requirement: '< ± 0.30 %',
      measuredValue: '+0.08 %',
      status: 'APPROVED'
    },
    {
      property: 'Creep in Compression (25h / 1400°C, 0.2 MPa)',
      standard: 'ISO 3187',
      unit: '%',
      requirement: '< 0.30 %',
      measuredValue: '0.12 %',
      status: 'APPROVED'
    },
    {
      property: 'Refractoriness Under Load T(0.5%)',
      standard: 'ISO 1893',
      unit: '°C',
      requirement: '> 1550 °C',
      measuredValue: '> 1620 °C',
      status: 'APPROVED'
    },
    {
      property: 'Refractoriness Under Load T(2.0%)',
      standard: 'ISO 1893',
      unit: '°C',
      requirement: '> 1650 °C',
      measuredValue: '> 1680 °C',
      status: 'APPROVED'
    },
    {
      property: 'Al2O3 Oxide Content',
      standard: 'ISO 12677 (WD-XRF)',
      unit: '%',
      requirement: '> 70.0 %',
      measuredValue: '72.3 %',
      status: 'APPROVED'
    },
    {
      property: 'SiO2 Oxide Content',
      standard: 'ISO 12677 (WD-XRF)',
      unit: '%',
      requirement: '< 25.0 %',
      measuredValue: '23.8 %',
      status: 'APPROVED'
    },
    {
      property: 'Fe2O3 Oxide Content',
      standard: 'ISO 12677 (WD-XRF)',
      unit: '%',
      requirement: '< 1.8 %',
      measuredValue: '1.25 %',
      status: 'APPROVED'
    },
    {
      property: 'Total Alkalies (Na2O + K2O)',
      standard: 'ISO 12677 (WD-XRF)',
      unit: '%',
      requirement: '< 0.40 %',
      measuredValue: '0.22 %',
      status: 'APPROVED'
    }
  ],
  verdict: 'APPROVED',
  remarks: 'Tested demonstration specimen complies with all specified physical, mechanical, thermal and chemical requirements per Danieli Corus Refractory Acceptance Specification DC-SPEC-REF. Material according specification APPROVED for refractory service.'
};
