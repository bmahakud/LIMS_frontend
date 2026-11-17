# Danieli Corus — Refractory Testing Laboratory
## Design Concept 1: Industrial Authority

A premium, responsive, public-facing laboratory website designed for **Danieli Corus — Refractory Testing Laboratory** in Velsen-Noord, The Netherlands.

This repository serves as **Design Concept 1** for executive and stakeholder review prior to development of the internal Laboratory Information Management System (LIMS).

---

## Brand Positioning & Design Concept

- **Concept Name:** Design 1 — Industrial Authority
- **Public Concept URL:** `/concepts/industrial`
- **Concept Selection Hub:** `/concepts`
- **Target Audience:** Steel plant managers, refractory procurement heads, project engineers, blast furnace managers, EPC contractors.
- **Design Language:** Confident, high-contrast, technical, precise, and structurally grounded. Avoids generic SaaS cards, unnecessary gradients, and medical/biological imagery.

### Brand Palette

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Charcoal** | `#171717` | Dominant structural contrast, navigation accents, deep hero backgrounds |
| **Industrial Orange** | `#D75D36` | Signature Danieli Corus high-temperature accent, CTAs, highlight borders |
| **Dark Orange** | `#C15431` | Hover states, active borders, emphasis |
| **Teal** | `#367786` | Technical badges, calibration verification indicators, secondary accents |
| **White** | `#FFFFFF` | Spacious editorial content backgrounds |
| **Light Gray** | `#F2F2F2` | Subtle section alternations, card backgrounds |

---

## Four Mandatory Design Principles

1. **Contrast:** Bold light-on-dark hero, high-contrast CTA actions, accessible WCAG 2.2 AA text ratios.
2. **Repetition:** Strict styling across buttons, technical cards, monospace measurement badges, section headers, and tabular specs.
3. **Alignment:** 12-column grid system with clean gutters, aligned section margins, and structured visual baselines.
4. **Proximity:** Related tests, equipment categories, and quality controls are grouped logically by engineering discipline.

---

## Public Website Pages

The website provides seven complete, functional pages alongside a design concept switcher:

1. **Home (`/concepts/industrial`)**
   - Full-width hero with high-temperature furnace photography and dark contrast overlay.
   - Core eyebrow: `"REFRACTORY TESTING LABORATORY"`.
   - Headline: `"Confidence in Every Refractory Material."`
   - Supporting text: `"Physical, chemical and thermal testing for performance-critical refractory applications."`
   - Primary CTA: *"Explore Testing Capabilities"* & Secondary CTA: *"Our Testing Procedure"*.
   - Four Core Testing Discipline Cards (Physical, Mechanical, Thermal, Chemical).
   - Horizontal 5-stage R-01 Laboratory Workflow stepper.
   - Complete 13-test interactive filterable catalogue.
   - Curated high-temperature testing equipment preview.
   - Quality & DC-SPEC compliance explanation.
   - Interactive Consultation & Specimen Intake form with validation.

2. **About Laboratory (`/concepts/industrial/about`)**
   - 70+ year metallurgical engineering legacy at Velsen-Noord.
   - Operational purpose: extending blast furnace campaigns to 20–30 years through empirical refractory verification.
   - Three engineering pillars: Empirical Rigor, Independence, and DC-SPEC Calibration.
   - Pyrometallurgist & Testing Technologist team credentials.

3. **Testing Capabilities (`/concepts/industrial/capabilities`)**
   - Deep directory covering all 13 core tests with real ISO/ASTM/EN standards.
   - Filter by discipline and instant keyword search.
   - Interactive modal inspecting specimen geometry, tolerances, DC-SPEC references, and industrial applications.

4. **Testing Process (`/concepts/industrial/process`)**
   - Comprehensive documentation of Danieli Corus Procedure **R-01**:
     - *Stage 01:* Sampling & Pallet Selection (§3.2 / ISO 5022)
     - *Stage 02:* Laboratory Intake & Quarantine Verification (§4.1)
     - *Stage 03:* Specimen Diamond Sectioning, Lapping & Testing (§5.0)
     - *Stage 04:* Quality Review & Four-Eyes Sign-Off (§6.2)
     - *Stage 05:* Certified Report Issuance & Archive (§7.0)
   - Lead times and non-conformance retesting policy (§8.0).

5. **Equipment & Facilities (`/concepts/industrial/equipment`)**
   - Comprehensive equipment catalog across 5 physical categories:
     - Sample Preparation (Diamond cutting saw, Core drill with water induction, Surface lapping rig, 110°C forced drying oven).
     - Physical Testing (Vacuum hydrostatic porosity rig, Laser diffraction particle size analyzer, Flow table).
     - Mechanical Testing (1000 kN servo-hydraulic compression press, 50 kN flexural MOR frame, ASTM C704 abrasion sandblast chamber).
     - High-Temperature Testing (1750°C MoSi2 electric furnaces, Computer-controlled RUL/Creep rig up to 1650°C, Differential push-rod dilatometer, Hot-wire thermal conductivity analyzer).
     - Chemical Analysis (4 kW WDXRF spectrometer, Automatic bead fusion fluxer, NDIR carbon/sulfur analyzer).
   - Metrological calibration traceable to European CRMs.

6. **Quality & Standards (`/concepts/industrial/quality`)**
   - DC-SPEC acceptance criteria philosophy.
   - Four-eyes peer review workflow (Testing Engineer + Senior Quality Specialist).
   - ISO/ASTM/EN/DC-SPEC normative standards matrix.
   - Interactive modal displaying an illustrative Danieli Corus **Certificate of Analysis & Refractory Inspection Report**.

7. **Contact & Consultation Desk (`/concepts/industrial/contact`)**
   - Sample delivery logistics guidelines for suppliers and steel plants.
   - Laboratory physical address at Rooswijkweg 291, Velsen-Noord.
   - Validated consultation form with demonstration confirmation and unique inquiry reference token.

8. **Concept Selection Hub (`/concepts`)**
   - Central portal for stakeholders to toggle between design iterations.
   - Highlights active Concept 1 (Industrial Authority) with planned Concepts 2 and 3.

---

## Lab Portal (Future LIMS Gateway)

The navigation bar features a visible **"Lab Portal"** button. Clicking this button triggers a dedicated modal explaining that the internal Laboratory Information Management System (sample barcode registries, live instrument telemetry, QA queues) is slated for Phase 2 implementation. Public routes remain clean, fast, and free of mock logins or exposed internal data.

---

## Technical Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Routing:** React Router DOM 6
- **Styling:** Tailwind CSS with custom industrial color tokens and typography
- **Icons:** Lucide React
- **Typography:** Inter (editorial body) & JetBrains Mono (technical specifications)

---

## Local Development & Setup

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Installation & Execution

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Production build (TypeScript validation + Vite bundle)
npm run build

# 4. Preview production build locally
npm run preview
```

The application runs by default at `http://localhost:3000/`.

---

## Quality & Accessibility Verification

- **Accessibility:** Semantic HTML elements, ARIA labels on all modal triggers and navigation links, high-contrast text conforming to WCAG 2.2 AA.
- **Responsiveness:** Fluid grid and drawer navigation adapting across mobile, tablet, and desktop viewports.
- **Integrity:** Strictly uses verified ISO/ASTM refractory norms without fabricated formulas or medical lab imagery.
