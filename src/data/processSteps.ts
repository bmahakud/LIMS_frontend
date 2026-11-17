import { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    stepNumber: 1,
    code: 'STAGE-01',
    title: 'Sampling',
    shortDesc: 'Inspection and sampling of manufactured refractory lots at supplier works by DC inspector.',
    fullDesc: 'Inspection and sampling of the manufactured lot is conducted by a Danieli Corus inspector or designated authorized inspector at the manufacturer works. Representative samples are selected across production lots, marked with unique reference numbers, and dispatched to the testing laboratory along with dispatch documentation.',
    keyDeliverables: [
      'Lot sampling record and dispatch documentation',
      'Unique reference numbers marked on each sample unit',
      'Defined property testing request sheet'
    ],
    qualityControls: [
      'Inspection and sampling directly at manufacturer works',
      'Unique reference number marked on each physical specimen',
      'Secure packaging for intact transit to laboratory'
    ],
    procedureReference: 'Procedure R-01: Section 1 — Sampling at Manufacturer Works'
  },
  {
    stepNumber: 2,
    code: 'STAGE-02',
    title: 'Receipt of Samples',
    shortDesc: 'Intake acknowledgment with photographs, condition checklist, and unique ID recording.',
    fullDesc: 'Upon arrival at the testing laboratory, sample receipt is formally acknowledged with photographs. Each sample is evaluated against an intake checklist (intact and fit for testing vs damaged), and the unique identification number marked on the sample is recorded to be used throughout testing and results presentation.',
    keyDeliverables: [
      'Intake acknowledgment with photographic verification',
      'Sample condition checklist (intact and fit for testing confirmation)',
      'Recorded unique identification number tracking log'
    ],
    qualityControls: [
      'Mandatory photographic recording of received samples',
      'Intake condition check (verification of physical integrity)',
      'Lead time and expected testing start date established'
    ],
    procedureReference: 'Procedure R-01: Section 1 & Section 3 — Receipt of Samples & Checklist'
  },
  {
    stepNumber: 3,
    code: 'STAGE-03',
    title: 'Testing (Preparation & Instrumental)',
    shortDesc: 'Execution across physical, mechanical, thermal, and chemical stations per DC standards.',
    fullDesc: 'Required testing is carried out strictly per standards defined by Danieli Corus, including precision specimen preparation (diamond diamond core sawing and 110°C drying) followed by instrumental testing (Bulk Density, Apparent Porosity, CCS, PLC, Creep up to 50 hours, RUL up to 1600°C+, and XRF chemical analysis). DC inspectors are granted access to witness testing in progress.',
    keyDeliverables: [
      'Calibrated instrumental test measurements and load curves',
      'Physical, mechanical, thermal, and chemical test raw data',
      'Witness verification sign-off where requested by DC inspector'
    ],
    qualityControls: [
      'Strict execution against ISO / ASTM / EN standards per R-01 table',
      'Witness access accommodated for Danieli Corus representatives',
      'Calibrated instrumentation across all testing disciplines'
    ],
    procedureReference: 'Procedure R-01: Section 2 — Testing Standards to be Followed'
  },
  {
    stepNumber: 4,
    code: 'STAGE-04',
    title: 'Results & QA Review',
    shortDesc: 'Review of test data, verification of UOM, and benchmarking against DC specifications.',
    fullDesc: 'Test data from testing instruments is reviewed on the result page. All test values and units of measurement (UOM) are validated against applicable Danieli Corus refractory project specifications to evaluate compliance.',
    keyDeliverables: [
      'Review data compiled on laboratory result page',
      'Verification of units of measurement (UOM) and test parameters',
      'Preliminary tolerance benchmarking against DC project limits'
    ],
    qualityControls: [
      'Data verification against required test specifications',
      'Instrument data integrity review prior to report generation',
      'Verification of test soaking hours and temperatures'
    ],
    procedureReference: 'Procedure R-01: Section 4 — Display of Results'
  },
  {
    stepNumber: 5,
    code: 'STAGE-05',
    title: 'Report Issuance',
    shortDesc: 'Official test report in prescribed format with formal compliance verdict.',
    fullDesc: 'Test results are shared in the prescribed Danieli Corus format ("Registration form for physical and chemical test results"). Reports include complete material quality, DC code, sample codes, measured test values, and a clear compliance decision: According specification APPROVED, Deviation acceptable: APPROVED, or Deviation not acceptable: NOT APPROVED.',
    keyDeliverables: [
      'Registration form for physical and chemical test results',
      'Prescribed format and UOM test documentation',
      'Formal compliance decision (APPROVED / NOT APPROVED)'
    ],
    qualityControls: [
      'Prescribed Danieli Corus registration format adherence',
      'Authoritative compliance determination against project specifications',
      'Traceable cross-reference to original sample reference numbers'
    ],
    procedureReference: 'Procedure R-01: Section 4 — Prescribed Format Results Presentation'
  },
  {
    stepNumber: 6,
    code: 'STAGE-06',
    title: 'Storage of Tested Samples',
    shortDesc: 'Archival of tested counter samples in designated storage for predefined timeline.',
    fullDesc: 'Tested samples are safely transferred to designated storage shelves and maintained for a predefined timeline. Retained counter samples remain accessible for future audit, verification, or re-examination if required.',
    keyDeliverables: [
      'Systematic shelf placement with unique sample ID label',
      'Retention storage inventory record with expiry schedule',
      'Accessibility for future reference and technical review'
    ],
    qualityControls: [
      'Protected dry storage environment for tested specimens',
      'Traceable indexing linking retained samples to test reports',
      'Predefined retention timeline governance'
    ],
    procedureReference: 'Procedure R-01: Section 1 & Section 4 — Storage of Tested Samples'
  }
];
