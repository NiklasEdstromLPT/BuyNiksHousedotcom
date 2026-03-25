# BuyMyHouse.com — Project Summary

## Tech Stack
- **Vite + React** — single-page app, no SSR
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, utility-first styling
- **Lucide React** — icon library (minimal usage currently)
- **No router library** — stage transitions driven by state integer
- **No state library** — pure React `useState` via custom hook

## Project Structure
```
/src
├── components/
│   ├── AddressEntry.jsx            # Stage 1 — hero + address autocomplete
│   ├── TrustLayer.jsx              # Stage 2 — stats, how-it-works, testimonials, CTA bar
│   ├── EvaluationInterstitial.jsx  # Stage 3 — dark terminal typewriter animation
│   ├── PropertyQualification.jsx   # Stage 4 — tap-card Q&A flow
│   ├── IdentityForm.jsx            # Stage 5 — two-column identity capture
│   ├── ExpertAssignment.jsx        # Stage 6 — agent card + assignment
│   ├── Confirmation.jsx            # Stage 7 — navy hero + summary + next steps
│   └── ProgressBar.jsx             # Shared dot-style 5-step progress indicator
├── config/
│   └── flags.js                    # Feature flags (Q4 OFF, Twilio OFF, Places OFF)
├── data/
│   ├── address_lookup.json         # 31 mock properties (mirrors Pod 2 API shape)
│   └── market_comps.json           # 10 ZIP profiles (mirrors Pod 2 API shape)
├── hooks/
│   └── useFunnelState.js           # Centralized state + stage transition logic
├── index.css                       # Tailwind import + design tokens
├── App.jsx                         # Stage router (if/else on currentStage)
└── main.jsx                        # React entry point
```

## State Management
- Single `useFunnelState` custom hook using React `useState`
- Holds: current stage, A/B variant, address/property data, qualification answers, identity
- No external libraries (no Redux, Zustand, etc.)
- URL param `?v=A` / `?v=B` parsed on init for A/B variant switching

## Routing
- No React Router — stages controlled by `currentStage` integer in state
- Stages 1 + 2 render together on the same page (above-fold hero + scroll-down trust layer)
- Stages 3–7 are full-screen swaps

## Data Flow
1. User types address → autocomplete dropdown filters from `address_lookup.json`
2. On submit → normalize (lowercase + trim) → lookup match in JSON
3. Matched property object + market comps carried through all stages via state
4. Qualification answers (Q1–Q3) stored in state
5. Identity form stored in state + `console.log` mock CRM submission
6. Stage 7 reads everything back for summary display

## Design System
- **Two visual modes** per spec:
  - **Institutional/Calm** (Stages 1, 2, 4, 5, 6, 7): Navy `#1B2B4B`, Gold `#C8A96E`, White
  - **Technical/Precise** (Stage 3 only): Dark `#0D1117`, Green `#30c96e`, Grey
- Design tokens defined in `index.css` via Tailwind `@theme`
- Mobile-first, 390px target viewport

## Feature Flags (`src/config/flags.js`)
- `ENABLE_Q4_STRUCTURAL: false` — Stage 4 structural issues question hidden
- `ENABLE_TWILIO_SMS: false` — Stage 5 SMS verification disabled
- `ENABLE_GOOGLE_PLACES: false` — Stage 1 uses JSON autocomplete instead

## Build Output
- JS: ~240 KB / ~74 KB gzipped
- CSS: ~24 KB / ~5.5 KB gzipped

## Key Files
| File | Purpose |
|------|---------|
| `PLAN2.md` | Detailed implementation plan with NON-NEGOTIABLE rules at top |
| `required-info/spec_extracted.txt` | Full text of the 19-page PDF spec |
| `required-info/stage_mockups.html` | Annotated wireframes for all 7 stages |
| `required-info/address_lookup.json` | Source mock data (31 addresses) |
| `required-info/market_comps.json` | Source mock data (10 ZIP profiles) |
