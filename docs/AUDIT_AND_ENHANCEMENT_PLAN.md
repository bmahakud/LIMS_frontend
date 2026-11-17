# Danieli Corus Refractory Testing Laboratory
## UI/UX Audit & Industrial Authority 2.0 Enhancement Plan

### 1. Executive Summary & Baseline Metrics
- **URL Audited:** `http://localhost:3000/concepts/industrial`
- **Initial Lighthouse Scores:** Best Practices: 100 | Accessibility: 88 | SEO: 83
- **Primary Finding:** Current foundation is clean and functional, but content density on the homepage is overly heavy (all 13 test methods dumped into a single grid), imagery is sparse, the 5-stage process is static, equipment lacks a visual lightbox gallery, and color contrast on secondary dark elements needs elevation to achieve WCAG 2.2 AA (≥4.5:1 for all text).

---

### 2. Detailed Audit Matrix

| Domain | Current Finding | Proposed Enhancement | Priority |
| :--- | :--- | :--- | :--- |
| **Visual Hierarchy** | Hero and content have good headings, but 13 tests overwhelm homepage. | Streamline home to 6 Featured Tests with deep link to complete 13-test catalogue on Capabilities page. | High |
| **Color Contrast** | Secondary charcoal text (`#666666` on `#171717`) achieves ~3.12:1 to 3.44:1 (below 4.5:1). Small orange tags on white give 3.81:1. | Brighten dark-mode secondary text to `#A3A3A3` / `#D4D4D4` (5.5:1+). Darken small orange badges on light backgrounds to `#B94928` / `#C15431` (4.6:1+). | High |
| **Typography** | Inter & JetBrains Mono are loaded. Hierarchy needs standardized scale. | Standardize Display H1 (clamp 2.5rem–4rem), Section H2 (2rem–2.5rem), Card H3 (1.125rem–1.25rem), Monospace spec tags (0.75rem). | Medium |
| **Spacing & Grid** | Layout follows 12-column grid, but section paddings vary between 5rem and 7rem. | Standardize to responsive vertical spacing: `py-16 sm:py-24`, uniform container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. | Medium |
| **Imagery & Assets** | Relies on Unsplash furnace hero and SVG icons; equipment and tests lack real refractory photography. | Curate authentic refractory industrial assets (bricks, core drills, 1000 kN press, 1750°C furnace, XRF beads). Maintain Asset Provenance Register. | High |
| **Motion & Interaction** | Video hero has play/pause, but page transitions and cards lack subtle interactive tactile feedback. | Implement restrained motion: 150ms button arrow glide, 250ms card elevation, interactive 5-stage timeline with active state selection, accessible modal lightbox for equipment. | High |
| **Accessibility (a11y)**| Form inputs missing explicit `id`/`htmlFor` associations; heading levels skip occasionally. | Add explicit `id` and `htmlFor` to all form controls, fix heading order (H1 -> H2 -> H3), verify keyboard Tab navigation and ARIA modal dialog trapping. | High |
| **Scientific Accuracy**| Mentions general DC-SPEC, but needs strict adherence to verifiable ISO/ASTM methods without fabricated lab IDs. | Keep exact ISO 5017, 10059-1, 2477, 1893, 3187, 12677 norms. Use anonymized illustrative certificate. | High |

---

### 3. Implementation Plan
1. **Asset Register & Curated Imagery:** Create high-resolution optimized web images for refractory bricks, furnaces, compression testing, and chemical analysis.
2. **Hero Refinement:** Smooth poster-to-video crossfade, enhanced dual gradient overlay, responsive framing.
3. **Interactive 5-Stage Process:** Stepper timeline with interactive stage selection, dynamic deliverable inspection, and R-01 reference.
4. **Equipment Lightbox Gallery:** Visual category grid with click-to-zoom modal lightbox and detailed technical parameters.
5. **6 Featured Tests:** Curated 6 core tests on homepage, linking directly to full 13-test directory on `/capabilities`.
6. **Accessibility & Contrast Hardening:** WCAG 2.2 AA compliant contrast ratios across dark and light sections.
