import { EquipmentItem } from '../types';

export const EQUIPMENT_CATALOGUE: EquipmentItem[] = [
  // 1. Sample Preparation
  {
    id: 'eq-cutting-saw',
    name: 'Precision Specimen Cutting Machine',
    category: 'Sample Preparation',
    image: '/images/equipment/sample-cutting-saw.jpg',
    operation: 'Diamond water-cooled planar cutting of refractory brick shapes and cores to required geometric dimensions.',
    keyCapability: 'Produces parallel, flat test specimens of defined dimensions without mechanical micro-fracturing or thermal stress.',
    standardsSupported: ['ISO 5017', 'ISO 10059-1', 'ISO 1893'],
    specifications: {
      'Primary Function': 'Specimen preparation and dimension sectioning',
      'Blade Type': 'Continuous diamond segmented cutting wheel',
      'Cooling Medium': 'Recirculating water coolant',
      'Specimen Types': 'Dense shaped bricks, carbon blocks, core cylinders'
    }
  },
  {
    id: 'eq-vibrating-table',
    name: 'Refractory Vibrating Table',
    category: 'Sample Preparation',
    image: '/images/equipment/vibrating-table.png',
    operation: 'Provides controlled mechanical vibration for casting and compacting unshaped monolithic refractory specimens.',
    keyCapability: 'Ensures homogeneous cavity filling and de-airing of test molds for low-cement and ultra-low cement castables.',
    standardsSupported: ['ISO 1927-5', 'EN 1402-4'],
    specifications: {
      'Primary Function': 'Vibratory compaction of castable slurries',
      'Operation Mode': 'Electromechanical table vibration',
      'Specimen Forms': 'Standard test prism molds and test bars',
      'Applications': 'Runner castables, trough mixes, gunning test panels'
    }
  },
  {
    id: 'eq-drying-oven',
    name: 'Continuous Hot Air Drying Oven (110°C)',
    category: 'Sample Preparation',
    image: '/images/equipment/drying-oven.png',
    operation: 'Continuous drying of refractory test specimens at controlled 110°C for specified conditioning cycles.',
    keyCapability: 'Removes all free moisture to constant weight prior to physical porosimetry, density, and thermal testing.',
    standardsSupported: ['ISO 5017', 'ISO 1927-6'],
    specifications: {
      'Operating Temperature': '110°C continuous drying baseline',
      'Drying Cycles': '3, 5, 10, or 24 hours programmed conditioning',
      'Circulation': 'Forced hot air convection',
      'Specimen Monitoring': 'Tare weight verification to constant mass'
    }
  },
  {
    id: 'eq-castable-mixer',
    name: 'Heavy-Duty Castable Batch Mixer',
    category: 'Sample Preparation',
    image: '/images/equipment/castable-mixer.png',
    operation: 'High-shear mixing of unshaped refractory formulations with controlled water addition.',
    keyCapability: 'Replicates industrial refractory mixing rheology with precise timing for monolithic specimen fabrication.',
    standardsSupported: ['ISO 1927-4', 'ISO 1927-5'],
    specifications: {
      'Primary Function': 'Uniform mixing of castables and mortars',
      'Batch Capability': 'Dry grog blending followed by controlled hydration',
      'Timing Control': 'Preset mixing cycle recording',
      'Material Handling': 'Dense castables, self-flow mixes, gunning materials'
    }
  },

  // 2. Physical Testing
  {
    id: 'eq-sieve-shaker',
    name: 'Mechanical Sieve Shaker for Grain Size Analysis',
    category: 'Physical Testing',
    image: '/images/equipment/sieve-shaker.png',
    operation: 'Rattling and vibratory particle separation through a nested column of standardized sieves.',
    keyCapability: 'Determines particle size distribution (PSD) curves and percentage retention across mesh fractions.',
    standardsSupported: ['ISO 1927-3', 'ISO 13765-5'],
    specifications: {
      'Analysis Method': 'Mechanical vibratory sieve stack in descending mesh size',
      'Measurement': 'Feed quantity and retained mass per sieve on balance',
      'Calculated Output': 'Cumulative % passing and Andreassen grain grading curve',
      'Tested Materials': 'Raw grog, mortars, taphole clay powders, dry aggregates'
    }
  },
  {
    id: 'eq-hydrostatic-rig',
    name: 'Vacuum Evacuation & Hydrostatic Porosimetry Suite',
    category: 'Physical Testing',
    image: '/images/equipment/vacuum-porosimeter-rig.png',
    operation: 'Vacuum evacuation chamber and precision hydrostatic suspension balance for AP and BD measurement.',
    keyCapability: 'Determines dry weight, water-saturated weight, and suspended hydrostatic weight to calculate bulk density and apparent porosity.',
    standardsSupported: ['ISO 5017', 'ISO 5016', 'ISO 1927-6'],
    specifications: {
      'Test Sequence': 'Evacuation under vacuum -> Liquid impregnation -> Hydrostatic weighing',
      'Derived Properties': 'Bulk Density (BD) and Apparent Porosity (AP)',
      'Balance Configuration': 'Precision digital balance with under-hook suspension cradle',
      'Immersion Medium': 'De-aired distilled water or analytical immersion liquid'
    }
  },

  // 3. Mechanical Testing
  {
    id: 'eq-ccs-machine',
    name: 'PLC-Controlled Cold Crushing Strength (CCS) Machine',
    category: 'Mechanical Testing',
    image: '/images/equipment/ccs-testing-machine.png',
    operation: 'Uniaxial compressive load bearing evaluation with automated Stress vs Strain curve logging.',
    keyCapability: 'Applies continuous rate-controlled compressive load until specimen failure, capturing peak fracture load.',
    standardsSupported: ['ISO 10059-1', 'ISO 8895', 'ISO 1927-6'],
    specifications: {
      'Control System': 'Integrated PLC with real-time rate control',
      'Output Data': 'Compressive fracture strength (MPa) and stress-strain trace',
      'Platens': 'Hardened tool steel spherical seated bearing platens',
      'Specimen Types': '50 mm cubes and Ø50 mm cylindrical cores'
    }
  },

  // 4. High-Temperature Testing
  {
    id: 'eq-furnace-line',
    name: 'High-Temperature Refractory Furnace Line',
    category: 'High-Temperature Testing',
    image: '/images/equipment/furnace-line-1.jpg',
    operation: 'Electric chamber furnaces executing programmed firing and reheat thermal soaking cycles up to high temperatures.',
    keyCapability: 'Accommodates multi-hour thermal soaks (3h, 5h, 10h, 24h, 50h) for Permanent Linear Change (PLC) evaluation.',
    standardsSupported: ['ISO 2478', 'ISO 2477', 'ISO 1927-6'],
    specifications: {
      'Heating System': 'Multi-zone electric resistance furnace bank',
      'Thermal Soak Cycles': 'Controlled multi-segment ramps and isothermal holding',
      'Dimensional Tracking': 'Pre- and post-fire vernier measurement for % linear change',
      'Atmosphere': 'Controlled oxidizing air atmosphere'
    }
  },
  {
    id: 'eq-creep-rul',
    name: 'High-Temperature Creep in Compression & RUL Testing System',
    category: 'High-Temperature Testing',
    image: '/images/equipment/creep-rul-instrument.jpg',
    operation: 'Programmed mechanical compressive loading under continuous high temperature for up to 50 hours.',
    keyCapability: 'Simultaneously evaluates Refractoriness Under Load (RUL T0.5, T2, T5) and long-term isothermal creep deformation.',
    standardsSupported: ['ISO 1893', 'ISO 3187', 'ISO 1927-6'],
    specifications: {
      'Test Modes': 'Differential RUL rising-temperature and 50-hour isothermal Creep',
      'Loading Column': 'Constant static compressive stress (0.2 MPa standard)',
      'Displacement Sensing': 'Differential axial dilatometer measuring specimen strain',
      'Applications': 'Hot blast stove checkers, bosh refractories, runner blocks'
    }
  },
  {
    id: 'eq-thermal-conductivity',
    name: 'High-Temperature Thermal Conductivity Instrument',
    category: 'High-Temperature Testing',
    image: '/images/equipment/thermal-conductivity-rig.png',
    operation: 'Direct measurement of refractory heat transfer rates under programmed high-temperature testing programs.',
    keyCapability: 'Determines thermal conductivity curves across varying temperature steps to verify refractory lining thermal resistance.',
    standardsSupported: ['ISO 8894-2', 'ISO 1927-8', 'DIN 51908'],
    specifications: {
      'Measurement Technique': 'Standardized high-temperature thermal probe method',
      'Calculated Output': 'Thermal Conductivity in W/(m·K)',
      'Test Programs': 'Stepwise isothermal thermal plateaus',
      'Material Scope': 'Dense bricks, insulating firebricks, carbonaceous refractories'
    }
  },
  {
    id: 'eq-dilatometer',
    name: 'High-Temperature Push-Rod Dilatometer',
    category: 'High-Temperature Testing',
    image: '/images/equipment/dilatometer-apparatus.png',
    operation: 'Measures continuous linear thermal expansion and phase transformation behavior during heating and cooling.',
    keyCapability: 'Tracks reversible expansion coefficients and detects silica polymorphic inversions (quartz to cristobalite).',
    standardsSupported: ['EN 993-19', 'ISO 16835'],
    specifications: {
      'Measurement Principle': 'Differential horizontal push-rod dilatometry',
      'Output Metric': 'Reversible Thermal Expansion (% and 10⁻⁶·K⁻¹ coefficient)',
      'Thermal Ramp': 'Controlled heating and cooling gradient',
      'Applications': 'Silica checker bricks, andalusite refractories, corundum blocks'
    }
  },

  // 5. Chemical Analysis
  {
    id: 'eq-xrf-spectrometer',
    name: 'Wavelength Dispersive X-Ray Fluorescence (WD-XRF) Spectrometer',
    category: 'Chemical Analysis',
    image: '/images/equipment/xrf-spectrometer.png',
    operation: 'Automated elemental analysis of prepared refractory specimens to determine chemical oxide concentrations.',
    keyCapability: 'Quantifies major and minor oxides (Al2O3, SiO2, Fe2O3, TiO2, CaO, MgO, K2O, Na2O) against certified reference materials.',
    standardsSupported: ['ISO 12677', 'ISO 1927-3', 'ISO 21068'],
    specifications: {
      'Detection System': 'Wavelength-dispersive X-ray spectrometer with detector channels',
      'Sample Preparation': 'Homogenized refractory powder or fused glass bead',
      'Assay Elements': 'Al2O3, SiO2, Fe2O3, TiO2, CaO, MgO, Alkalies (K2O, Na2O)',
      'Data Integration': 'Digital spectrometry output directly transferred for review'
    }
  },
  {
    id: 'eq-chemical-bench',
    name: 'Wet Chemical Analysis & Loss on Ignition (LOI) Station',
    category: 'Chemical Analysis',
    image: '/images/equipment/chemical-analysis-bench.png',
    operation: 'Standardized wet chemical verification methods and high-temperature Loss on Ignition (LOI) determination.',
    keyCapability: 'Provides wet-chemical cross-validation of elemental compositions and measures volatile mass loss on ignition.',
    standardsSupported: ['ISO 12677', 'ISO 1927-3', 'DIN 51903'],
    specifications: {
      'Analytical Scope': 'Gravimetric and titrimetric chemical verification',
      'Loss on Ignition': 'Thermal calcination mass loss testing',
      'Auxiliary Tests': 'Ash content according to DIN 51903 for carbonaceous grades',
      'Environment': 'Fume-controlled laboratory bench with analytical reagents'
    }
  }
];
