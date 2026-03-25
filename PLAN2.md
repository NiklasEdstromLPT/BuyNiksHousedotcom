# PLAN2.md — BuyMyHouse.com Pod 1 Detailed Implementation Plan

Source: `required-info/spec_extracted.txt` (19-page PDF spec from LPT Holdings, March 2026)

---

## ⛔ NON-NEGOTIABLE RULES — READ BEFORE WRITING ANY CODE

### Identity Rules
- This is a **SELLER funnel**, NOT a buyer product. The user is a homeowner who may want to sell.
- There are **NO property listings. NO buyer-facing features. NO search. NO map.**
- Every UI decision advances the seller through 7 psychological states. Nothing else.

### Stage Architecture Rules
- Stages are **strictly sequential**. Do NOT merge, reorder, or simplify — the conversion architecture collapses.
- **Combining Stages 4–7 to "reduce friction" is a documented conversion killer.** Each stage depends on the psychological state created by the previous stage. Execute with zero deviation.
- No back buttons between stages (by design — increases commitment).

### Visual Prohibitions (Applies to ALL Stages)
- **No purple gradients** or generic "AI aesthetic"
- **No hero images** of houses, smiling families, outdoor photos
- **No Zillow-esque green-and-blue palette**
- **No proptech clichés** (illustrated maps, decorative pin icons, neighborhood guides)

### Stage 3 Specific Prohibitions
- **No progress bars** inside Stage 3
- **No percentage scores**
- **No countdown timers**
- **No spinners**
- **No fabricated metrics**
- Stage 3 is NOT a loading screen — it is an **evaluation scene**

### Content Prohibitions (Applies to ENTIRE Funnel)
- **No pricing, estimates, or offer amounts ANYWHERE**
- **No scheduling widgets** (especially not on confirmation page)
- **No Zestimate-style numbers**
- The dual-path offer reveal happens **in-person, NOT in the digital funnel**

### Copy Rules
- Use **exact copy from the spec** — do not rephrase, rewrite, or "improve" headlines/sublines/body text
- All copy is psychologically calibrated; changing wording breaks the conversion architecture

### Scope Boundaries
- **No live Pod 2 API** — use mock JSON only
- **Twilio SMS = OFF** — ship with flag OFF
- **No real CRM submission** — `console.log` mock only
- **No GA4 / analytics pipes** — `console.log` placeholders only
- **No edge middleware A/B** — URL param only (`?v=A` / `?v=B`)
- **Q4 (structural issues question) = OFF** — ship with flag OFF

---

## 1. Product Context & Vision

### 1.1 What BuyMyHouse.com Is
- A **seller origination** and dual-path conversion platform operated by **LPT Holdings, Inc.**
- NOT a real estate search site, NOT a buyer product
- A multi-stage psychological conversion architecture targeting homeowners at the moment of financial decision-making — upstream of MLS listings
- Goal: move sellers from **curious → committed → assessed** via a no-cost, in-person Professional Property Assessment

### 1.2 Critical Reframe (Doctrinal)
- The user is a **homeowner who may want to sell**
- Every UI decision advances the seller through **7 psychological states**
- There are **no property listings, no buyer-facing features**
- The product moves them toward a **Professional Property Assessment** (in-person, offline)

### 1.3 The Dual-Path Offer System
The funnel culminates in an in-person assessment where the seller receives two options:
1. **Certainty Path**: Firm cash offer — speed, certainty, no repairs, no showings
2. **Market Path**: Traditional listing with a licensed local LPT Realtor — maximum market value

**Critical**: The dual-path reveal happens during the in-person assessment — **NOT in the digital funnel**. Pod 1's job is to deliver a committed seller. Do not price, estimate, or preview either path in the UI.

### 1.4 LPT Holdings Business Model (4 Layers)
| Layer | Name | What It Does |
|-------|------|-------------|
| 1 | BuyMyHouse.com | Intent Origination — captures sellers before open market |
| 2 | Transaction Routing | Brokerage control plane with 20,000 managed professionals |
| 3 | Agent Products | CRM, lead gen, tech tools sold as SaaS to agent network |
| 4 | Placement Layer | Workforce infrastructure — recruits and allocates agents |

**Pod 1 owns Layer 1 only.** Layers 2–4 are downstream and out of scope.

---

## 2. Hackathon Goals & Success Criteria

### 2.1 Primary Goal
Ship a working, click-through prototype of all 7 funnel stages — functional in a browser, pixel-honest to the design rules, and demonstrable as a complete user journey from address entry to confirmation.

### 2.2 Demo Success Criteria (must pass by end of Hour 3)
| # | Stage | Criteria |
|---|-------|---------|
| 1 | Stage 1 | Landing page renders above the fold at 390px with no scroll. Address input prominent. |
| 2 | Stage 2 | Below-fold trust modules (billboard, 3-step, credibility) visible on scroll. |
| 3 | Stage 3 | Terminal interstitial runs its animation sequence and auto-advances. |
| 4 | Stage 4 | Qualification questions render as tap-friendly cards with progress bar. |
| 5 | Stage 5 | Identity form captures name, email, phone with TCPA notice. |
| 6 | Stage 6 | Expert assignment page with correct headline and body copy. |
| 7 | Stage 7 | Confirmation page shows property summary, next steps. No pricing. |

### 2.3 Stretch Goals
- A/B test variant toggle via URL param (`?v=A` or `?v=B`)
- Mock property lookup — entering a real address populates the interstitial
- Smooth stage-to-stage transitions (fade or slide)
- Deployed to Vercel for a shareable demo URL

---

## 3. Scope Definition

### 3.1 In Scope
| Feature | Notes |
|---------|-------|
| All 7 funnel stage pages/screens | Complete UI for every stage |
| Address entry field (Stage 1) | Google Places if key available; fallback to styled text input |
| Terminal interstitial animation (Stage 3) | Pure CSS/JS, no API needed |
| Property qualification questions (Stage 4) | Tap-card UI, progress bar, client-side state |
| Identity capture form (Stage 5) | Name, email, phone — mock submit only |
| Expert assignment + confirmation (Stages 6 & 7) | Static pages with correct spec copy |
| Two visual modes | Institutional/Calm + Terminal/Precise |
| Mobile-first, 390px viewport | Desktop secondary; full experience above fold on mobile |
| Mock data layer | `address_lookup.json` + `market_comps.json` (mirrors Pod 2 API) |

### 3.2 Out of Scope
| Feature | Why |
|---------|-----|
| Live Pod 2 API | Requires LPT backend credentials — use mock JSON |
| Twilio SMS verification | Spec flags OFF at launch — ship OFF |
| Real CRM / lead submission | Requires LPT backend — `console.log` mock |
| GA4 + analytics pipes | Needs GTM + data warehouse — skip |
| Edge middleware A/B | Too complex for 3 hrs — use URL param |
| Google Ads conversion tags | No live campaign |
| Any buyer-facing features | Wrong product — no listings, no search, no map |

---

## 4. The 7-Stage Seller Funnel — Psychological Architecture

**DOCTRINAL WARNING**: Combining Stages 4–7 to "reduce friction" is a documented conversion killer. Each stage depends on the psychological state created by the previous stage. Execute with zero deviation.

| Stage | Screen | Psych Trigger | Seller State After |
|-------|--------|---------------|--------------------|
| 1 | Above the Fold | Cognitive fluency | Low friction — just enter address |
| 2 | Below the Fold | Offline recognition + credibility | Doubt resolved |
| 3 | Interstitial | Labor illusion + evaluation anxiety | Evaluator → evaluated |
| 4 | Qualification | Validation release (Endowed Progress) | "Passed screening" momentum |
| 5 | Identity | Micro-commitment escalation | Anonymous → verified lead |
| 6 | Expert Assignment | Reciprocity reframe | Platform invests → obligation |
| 7 | Confirmation | Commitment & consistency | Socially committed |

---

## 5. Stage-by-Stage Detailed Implementation

### Stage 1: Above the Fold — Landing Page

**Psychological Trigger**: Cognitive fluency + ad-to-page congruence
**Goal**: Pure motion. Get the seller to enter their property address without cognitive overload.

#### Component: `AddressEntry`

#### UI Specs
- Google Places autocomplete address field = **dominant visual anchor** (location pin icon)
- Mobile (390px): **entire above-fold experience visible with zero scroll**
- PROHIBITED: house hero images, FAQs, process graphics above the fold

#### Exact Copy
| Element | Copy |
|---------|------|
| Headline | **Sell Your House for Cash. No Repairs. No Surprises.** |
| Subheadline | Enter your address to check eligibility for a firm cash offer. |
| CTA Button | **Check My Property** |
| Micro Reassurance | Check eligibility first. No contact details required. |
| Credibility | Backed by LPT Aperture Holdings \| Deloitte Fast 500 \| Inman Innovator \| Training Magazine |

#### Implementation Details
- Google Places: Use if API key available (~5 min setup). **Fallback**: styled text input + lookup against `address_lookup.json`
- Address normalization: lowercase + trim before lookup
- On submit: normalize input → look up in `address_lookup.json` → if found, carry parsed property context forward → advance to Stage 2/3
- If not found in lookup: still advance (use default/fallback data)
- Pin icon: use Lucide React `MapPin` icon
- CTA: full-width, navy `#1B2A4A` background, white text
- Layout must be verified at exactly 390px viewport width — no vertical scroll to reach CTA

#### Acceptance Gate
Mobile screenshot confirms full above-fold fit and dominant address entry at 390px.

---

### Stage 2: Below the Fold — Trust Layer

**Psychological Trigger**: Offline recognition + institutional credibility
**Goal**: Stabilize confidence for sellers who scroll instead of immediately entering their address.

#### Modules (in order)

| Module | Content | A/B Test |
|--------|---------|----------|
| Billboard Continuity | Photo of real BuyMyHouse.com billboard. "You may have seen us around town." | None |
| 3-Step Process | 1. Enter address, 2. We review details [**Split Test 2**: "with a licensed local Realtor" vs. "Professional Property Assessment"], 3. Receive options | Split Test 2 |
| Credibility | "Backed by LPT Aperture Holdings. Not an automated estimate." | None |
| Testimonial | One calm 2–3 sentence homeowner quote. No photos, no stars. | Split Test 3: None vs. one testimonial |

#### Implementation Details
- Implement Split Tests 2 & 3 via URL param: `?v=A` (default) or `?v=B`
  - `?v=A`: Step 2 says "with a licensed local Realtor" + no testimonial
  - `?v=B`: Step 2 says "Professional Property Assessment" + testimonial visible
- Billboard photo: **grey placeholder rectangle** with label "Billboard photo TBD"
- Wire sticky or repeated CTA back to address input path
- This is a scroll-down section below Stage 1 — same page, not a separate route

#### Acceptance Gate
All trust modules visible on scroll and variants switch via URL param.

---

### Stage 3: The Evaluation Interstitial

**Psychological Trigger**: Labor illusion + evaluation anxiety
**Goal**: Not a loading screen. An **evaluation scene** proving the system is doing real work. Visual aesthetic: serious, technical organization processing your property right now.

#### Component: `EvaluationInterstitial`
**Props**: `address` (string), `zip` (string), `onComplete` (callback)

#### UI Specs
- Background: **dark `#0D1117`**
- Font: **monospaced** (Courier New or JetBrains Mono)
- Sequential line rendering with **~400ms delay** (typewriter effect)
- Checkmarks: **green/teal `#39D353`**; grey `#AAA` for in-progress
- **PROHIBITED**: progress bars, percentage scores, countdown timers, spinners, fabricated metrics

#### Terminal Animation Sequence (exact lines)
```
> Locating property details for [entered address]...
  Querying county assessor records...
✓ Property found. Parcel ID confirmed.
> Checking public records...
  Cross-referencing ownership and title history...
✓ Ownership and property profile confirmed.
> Running market alignment check...
  Analyzing current buyer demand in ZIP [XXXXX]...
✓ Initial screening complete — strong alignment with current buying criteria.

  Let's confirm a few details to continue.
```

#### Alignment Tiers (final status line varies by `alignmentTier` from address_lookup.json)
| Tier | Final Line Text |
|------|----------------|
| `strong` | "...strong alignment with current buying criteria." |
| `within` | "...within current buying criteria." |
| `additional` | "...additional details required to confirm alignment." |

#### Implementation Details
- Pure CSS/JS typewriter — no API needed
- Inject address + ZIP from `address_lookup.json` matched property
- Total animation duration: **~4–6 seconds**, then auto-advance to Stage 4
- Use `strong` alignment for all demos (default)
- After last line, wait **1.5 seconds**, then call `onComplete()`
- This is the **only dark/terminal stage** — all others use Institutional/Calm palette
- Green checkmarks (`✓`) appear when a line "completes"
- Lines appear one at a time with ~400ms between them

#### Acceptance Gate
Full sequence runs cleanly, then transitions to Stage 4 without user dead-end.

---

### Stage 4: Qualification & Property Refinement

**Psychological Trigger**: Validation release (Endowed Progress Effect)
**Goal**: Collect property data using light, tap-based questions. The seller has "passed" — these feel like formalities. Each tap increases sunk investment.

#### Component: `PropertyQualification`
**Props**: `onComplete(answers)` callback

#### UI Specs
- **Stepped progress bar** appears here first: **Step 3 of 5 active** (stages 1–2 counted as steps 1–2)
- Mobile tap targets: **minimum 48px height, full-width**
- **One question per screen** — no back button visible
- Auto-advance on selection (300ms delay)

#### Exact Copy
| Element | Copy |
|---------|------|
| Headline | **Your Property Has Passed Initial Screening.** |
| Subline | To continue, we need a few quick details about the property. |
| Transition (after Q3) | Thank you. We're ready to move forward. |

#### Questions
| # | Question | Options | Flag |
|---|----------|---------|------|
| Q1 | Current condition of the property? | Move-in ready / Minor updates / Needs repairs / Major renovation | **ON** |
| Q2 | How soon looking to sell? | ASAP / 30 days / 1–3 months / Just exploring | **ON** |
| Q3 | Current occupancy? | Owner / Tenant / Vacant | **ON** |
| Q4 | Known structural issues? | No known / Yes minor / Yes significant | **OFF** (feature flag) |

#### Implementation Details
- Ship Q1–Q3 only (Q4 is flagged OFF via `flags.js`)
- Store answers in component/app state
- Each option renders as a full-width tap card with navy border
- Progress bar: 5 total steps, step 3 highlighted at start of Stage 4
- Progress increments: step 3 → step 3 (Q1) → step 3 (Q2) → step 3 (Q3) → advance
- On completion of all questions: show transition text, then advance to Stage 5
- Design: Institutional/Calm — Navy + white

#### Acceptance Gate
User can complete all qualification steps on mobile without keyboard-heavy input.

---

### Stage 5: Identity Confirmation

**Psychological Trigger**: Micro-commitment escalation
**Goal**: Convert anonymous seller into a verified, contactable lead. By this point they've invested effort — revealing contact details feels like a natural next step.

#### UI Specs
| Element | Spec |
|---------|------|
| Headline | **Confirm Your Details to Continue.** |
| Fields | First Name, Last Name, Email, Mobile Phone (**all required**) |
| Reassurance | "Used only to coordinate next steps. No obligation." |
| CTA | **Confirm My Details** |
| TCPA | Include placeholder: `[TCPA consent language — provided by LPT legal]` |
| SMS (Twilio) | Built but **OFF** via feature flag at launch — ship OFF |
| Progress | **Step 4 of 5** active |

#### Implementation Details
- Basic form validation:
  - First Name: required, non-empty
  - Last Name: required, non-empty
  - Email: required, valid email format (basic regex)
  - Mobile Phone: required, valid phone format (basic — 10+ digits)
- On invalid submission: show **clear inline errors** per field
- On valid submission: store to app state, advance to Stage 6 (no API call)
- `console.log('LEAD_SUBMIT:', { firstName, lastName, email, phone })` for mock CRM
- Design: Institutional/Calm palette

#### Acceptance Gate
Valid data advances; invalid data shows clear inline errors.

---

### Stage 6: Resource Commitment & Expert Assignment

**Psychological Trigger**: Reciprocity reframe
**Goal**: Formalize the platform's investment. A licensed professional is being assigned to their property. Creates powerful reciprocity obligation.

#### Exact Copy
| Element | Copy |
|---------|------|
| Headline | **We're Assigning a Property Assessment Expert to Your Property.** |
| Subline | All Property Assessment Experts are licensed local Realtors. |
| Body | Your assigned expert will reach out within 24 hours to schedule a no-cost, in-person Professional Property Assessment. |
| CTA | **Confirm & Continue** |
| Progress | **Step 5 of 5** active |

#### Implementation Details
- Static page with exact copy above
- Add a **~1 second pulsing dot** before content appears to reinforce "assignment in progress"
- After pulsing animation: reveal full content
- On CTA click: advance to Stage 7
- Design: Institutional/Calm palette

#### Acceptance Gate
Copy and progression match spec language and intent.

---

### Stage 7: Confirmation Page

**Psychological Trigger**: Commitment & consistency
**Goal**: Final digital impression. Reinforce the decision, set expectations, create clean handoff to offline.

#### Content
| Element | Copy / Content |
|---------|---------------|
| Headline | **You're All Set.** |
| Property summary | Show entered address + qualification answers as **read-only card** |
| Next steps | 1. Expert calls/texts within 24 hrs. 2. Schedules no-cost assessment. 3. You receive both cash offer and market listing options. |
| What to expect | Assessment takes 20–30 minutes. No obligation, no cost. |
| Fallback | Questions? Call or text us at `[LPT phone placeholder]` |

#### PROHIBITED on this page
- Scheduling widgets
- Pricing estimates
- Zestimate-style numbers
- Any offer amounts

#### Implementation Details
- Read-only property summary card showing:
  - Entered address (from state)
  - Qualification answers (Q1–Q3 from state)
  - Property details from lookup (beds, baths, sqft if available)
- Next steps rendered as numbered list
- No further navigation — this is the terminal screen
- Design: Institutional/Calm palette

#### Acceptance Gate
Confirmation is complete, clear, and policy-compliant. No prohibited elements present.

---

## 6. Design Rules & Visual System

### 6.1 Two Visual Modes

| Mode | Used On | Palette | Typography |
|------|---------|---------|------------|
| Institutional / Calm | Stages 1, 2, 4, 5, 6, 7 | Navy `#1B2A4A`, Charcoal `#222`, White, single accent | Sans-serif, high contrast, generous whitespace |
| Technical / Precise | Stage 3 only | Dark `#0D1117`, Green `#39D353`, Grey `#AAA` | Monospaced (Courier New / JetBrains Mono) |

### 6.2 Strict Visual Prohibitions
- No purple gradients or generic "AI aesthetic"
- No hero images of houses, smiling families, outdoor photos
- No Zillow-esque green-and-blue palette
- No proptech clichés (illustrated maps, pin icons as decorative elements, neighborhood guides)
- No progress bars, percentages, or timers inside Stage 3
- No pricing, estimates, or offer amounts anywhere in the funnel
- No scheduling widgets on the confirmation page

### 6.3 Design Tokens (recommended)
```
--color-navy: #1B2A4A
--color-charcoal: #222222
--color-white: #FFFFFF
--color-terminal-bg: #0D1117
--color-terminal-green: #39D353
--color-terminal-grey: #AAAAAA
--font-sans: system sans-serif stack
--font-mono: 'Courier New', 'JetBrains Mono', monospace
```

---

## 7. Data Layer & Mock Data

### 7.1 File Locations
Both JSON files go in `/src/data/`:
- `address_lookup.json` — 31 properties keyed by normalized address
- `market_comps.json` — 10 ZIP code profiles

### 7.2 address_lookup.json Structure
- **Key**: lowercased, trimmed address string (e.g., `"1247 maple grove drive, austin, tx 78701"`)
- **Fields per entry**:

| Field | Type | Mirrors (Pod 2 API) |
|-------|------|---------------------|
| `normalizedAddress` | string | display-formatted address |
| `parcelId` | string | `parcel_id` |
| `street`, `city`, `state`, `zip`, `county` | string | municipality fields |
| `beds`, `baths`, `sqft`, `lotSqft`, `yearBuilt` | number | `property_attributes` |
| `propertyType` | string | property type |
| `ownerName` | string | always "Property Owner" in mock |
| `lastSaleDate`, `lastSalePrice` | string/number | historical sale data |
| `estimatedOwnerEquity` | string | equity range |
| `marketDemandScore` | number (0–100) | `demand_index` |
| `alignmentTier` | `'strong'` \| `'within'` \| `'additional'` | drives Stage 3 final line |

### 7.3 market_comps.json Structure
- **Key**: ZIP code string (e.g., `"78701"`)
- **Fields per entry**:

| Field | Type | Mirrors (Pod 2 API) |
|-------|------|---------------------|
| `zip` | string | `zip_code` |
| `city`, `state`, `neighborhood` | string | location context |
| `medianSalePrice` | number | `median_sold_price_90d` |
| `avgDaysToOffer` | number | days to offer |
| `buyerDemandScore` | number (0–100) | `demand_index` |
| `marketVerb` | string | e.g., "Active", "Strong" |
| `inventoryMonths` | number | months of inventory |
| `recentComps` | array | `comparable_sales` — each has `address`, `soldPrice`, `soldDate`, `sqft`, `pricePerSqft` |

### 7.4 Data Flow
1. User enters address in Stage 1
2. Normalize: `input.toLowerCase().trim()`
3. Look up in `address_lookup.json`
4. If match found: carry full property object into app state
5. Use `zip` from property to look up `market_comps.json` for Stage 3 context
6. Inject `address`, `zip`, `alignmentTier` into Stage 3 animation
7. Persist all data + qualification answers through Stages 4–7 in client-side state
8. Display property summary in Stage 7

### 7.5 Post-Hackathon Swap
```js
// Hackathon:
import addressData from '../data/address_lookup.json';
const property = addressData[normalizedAddress];

// Production:
const res = await fetch(`/api/pod2/property?address=${encodeURIComponent(address)}`);
const property = await res.json();
// Same shape — drop-in replacement
```

---

## 8. Technical Requirements

### 8.1 Framework Choice
| Option | Notes |
|--------|-------|
| **Next.js** (production-aligned) | `npx create-next-app@latest buymyhouse --js --no-tailwind --no-eslint` then add Tailwind |
| **Vite + React** (fastest) | `npm create vite@latest buymyhouse -- --template react` then add Tailwind |

Both options then:
```bash
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
```

### 8.2 Performance Targets
| Metric | Production Target | Hackathon Approach |
|--------|-------------------|--------------------|
| LCP | < 1.5s on throttled mobile 4G | Keep bundle lean, < 150 KB JS |
| FID | < 100ms | Defer non-critical JS |
| Above-fold weight | < 200 KB total | No large images above fold |

### 8.3 Feature Flags
Located in `/src/config/flags.js`:
```js
export const FLAGS = {
  ENABLE_Q4_STRUCTURAL: false,   // Stage 4 Q4 question
  ENABLE_TWILIO_SMS: false,      // Stage 5 SMS verification
  ENABLE_GOOGLE_PLACES: false,   // Stage 1 autocomplete (set true if key available)
};
```

### 8.4 A/B Testing
- URL param: `?v=A` (default) or `?v=B`
- Parse on app load, store in state/context
- Affects Stage 2 modules:
  - Split Test 2: 3-step process wording
  - Split Test 3: testimonial visibility

### 8.5 Analytics (Mock)
```js
// Placeholder for all stage transitions:
console.log('EVENT:', { stage: 'stage_1', action: 'address_submitted', timestamp: Date.now() });
```

### 8.6 Pod 2 API Simulation
- Use `setTimeout(400)` + JSON import to simulate Pod 2 API latency
- Production targets: < 500ms property, < 1,200ms comps

---

## 9. App Architecture & State Management

### 9.1 Routing / State Machine
Stages are **strictly sequential**. Navigation:
- Stage 1 → (address submitted) → Stage 2 (scroll) → Stage 3 → Stage 4 → Stage 5 → Stage 6 → Stage 7
- No back navigation between stages (by design — increases commitment)
- Stage 1 + Stage 2 may be on the same page (above/below fold)
- Stages 3–7 are separate screens/routes

### 9.2 Centralized State Shape
```js
{
  currentStage: 1,               // 1-7
  variant: 'A',                  // from URL param
  address: {
    raw: '',                     // user input
    normalized: '',              // lowercased + trimmed
    property: null,              // matched object from address_lookup.json
    marketComps: null,           // matched object from market_comps.json
  },
  qualification: {
    condition: null,             // Q1 answer
    timeline: null,              // Q2 answer
    occupancy: null,             // Q3 answer
    structuralIssues: null,      // Q4 answer (flagged OFF)
  },
  identity: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
}
```

### 9.3 Stage Navigation Guards
- Cannot advance to Stage 3 without address entry
- Cannot advance to Stage 5 without completing qualification
- Cannot advance to Stage 6 without valid identity submission
- State persists through all stages (no page reloads between stages)

---

## 10. Component Breakdown

### 10.1 Shared Components
| Component | Purpose |
|-----------|---------|
| `AppShell` | Top-level layout, routing, state provider |
| `ProgressBar` | 5-step progress indicator (visible Stages 4–7) |
| `StageTransition` | Fade/slide wrapper for stage changes (stretch goal) |

### 10.2 Stage Components
| Component | Stage | Key Props |
|-----------|-------|-----------|
| `AddressEntry` | 1 | `onSubmit(address)` |
| `TrustLayer` | 2 | `variant` ('A' or 'B') |
| `EvaluationInterstitial` | 3 | `address`, `zip`, `alignmentTier`, `onComplete` |
| `PropertyQualification` | 4 | `onComplete(answers)` |
| `IdentityForm` | 5 | `onSubmit(identity)` |
| `ExpertAssignment` | 6 | `onContinue` |
| `Confirmation` | 7 | `address`, `qualification`, `identity`, `property` |

### 10.3 Config Files
| File | Purpose |
|------|---------|
| `/src/config/flags.js` | Feature flags (Q4, Twilio, Google Places) |
| `/src/data/address_lookup.json` | 31 mock properties |
| `/src/data/market_comps.json` | 10 ZIP profiles |

---

## 11. File Structure (Recommended)

```
/src
├── app/ or pages/          # Next.js routing (or single SPA route)
│   └── page.jsx            # Main funnel page
├── components/
│   ├── AppShell.jsx
│   ├── ProgressBar.jsx
│   ├── AddressEntry.jsx    # Stage 1
│   ├── TrustLayer.jsx      # Stage 2
│   ├── EvaluationInterstitial.jsx  # Stage 3
│   ├── PropertyQualification.jsx   # Stage 4
│   ├── IdentityForm.jsx    # Stage 5
│   ├── ExpertAssignment.jsx # Stage 6
│   └── Confirmation.jsx    # Stage 7
├── config/
│   └── flags.js
├── data/
│   ├── address_lookup.json
│   └── market_comps.json
├── hooks/
│   └── useFunnelState.js   # Centralized state hook
└── styles/
    └── globals.css         # Tailwind + design tokens
```

---

## 12. Team Tracks & Time Plan

### 12.1 Track Assignments
| Track | Owner | Owns |
|-------|-------|------|
| A — Shell + Stages 1–2 | Designer + Dev | App routing, design tokens, landing page, mobile layout |
| B — Interstitial (Stage 3) | Dev | Terminal animation, address injection, alignment tier, auto-advance |
| C — Stages 4–7 + Data | Dev | Qualification flow, identity form, expert + confirmation pages, mock data |
| D — Polish (Hour 3) | All | Integration, A/B param switching, mobile QA, demo prep |

### 12.2 Hour-by-Hour Schedule

#### Hour 0:00–1:00 — Foundation
| Track A | Track B | Track C |
|---------|---------|---------|
| Scaffold app + routing shell | Wire interstitial animation | Import mock data files |
| Set up design tokens + Tailwind | Build typewriter line renderer | Build Stage 4 card UI |
| Build Stage 1 (above-fold) | Dark palette + monospace styling | Set up state management |
| Verify 390px layout | Test line timing (~400ms) | Build Q1–Q3 question flow |

#### Hour 1:00–2:00 — Features
| Track A | Track B | Track C |
|---------|---------|---------|
| Build Stage 2 trust modules | Add address/ZIP injection | Build Stage 5 identity form |
| Implement A/B variant switching | Implement alignment tier text | Add form validation |
| Mobile QA for Stages 1–2 | Wire auto-advance to Stage 4 | Build Stage 6 static page |
| Polish above-fold layout | Test full animation sequence | Build Stage 7 confirmation |

#### Hour 2:00–2:40 — Integration
| All Tracks |
|------------|
| Merge all tracks into main branch |
| Fix routing and state passing bugs |
| Finalize URL variant switching (`?v=A`, `?v=B`) |
| Verify data injection through all stages |
| Add transition polish (fade/slide if time) |
| Add `console.log` event tracking placeholders |
| Full state persistence test: address → qualification → identity → confirmation |

#### Hour 2:40–3:00 — Demo Prep
| All Tracks |
|------------|
| Full mobile run-through at 390px viewport |
| Walk scripted demo sequence (Stages 1–7) |
| Verify all prohibited content is absent |
| Optional: deploy to Vercel |
| Record screen demo as backup |

---

## 13. Demo Script

Present on a **390px mobile viewport**. Walk through in this order:

1. **Stage 1**: Open landing page on mobile. Full above-fold, no scroll. Type a sample address from `address_lookup.json` (e.g., "1247 Maple Grove Drive, Austin, TX 78701").
2. **Stage 2**: Scroll down. Show billboard, 3-step, credibility, testimonial (`?v=B`). These resolve objections before the seller enters their address.
3. **Stage 3**: Hit CTA. Terminal runs. *"This is not a loading screen — this is an evaluation scene. The seller is now being assessed, not assessing us."*
4. **Stage 4**: Tap through 3 qualification questions. Show progress bar + full-width tap cards.
5. **Stage 5**: Fill identity form. Point out TCPA placeholder + reassurance copy.
6. **Stage 6**: Expert assignment. Read headline aloud. *"This is the reciprocity moment."*
7. **Stage 7**: Confirmation. No pricing, no scheduling. Property summary + next steps only. Clean handoff to offline.

**Key demo line**: *"All mock data mirrors our Pod 2 API shapes. Post-hackathon it's a one-line swap — import becomes fetch."*

---

## 14. Acceptance Test Plan

Run in this order before sign-off:

| # | Test | Pass Criteria |
|---|------|---------------|
| 1 | Mobile viewport test | All stages render correctly at 390px |
| 2 | Happy path | Address entry → confirmation with state retained throughout |
| 3 | Stage 3 timing | Animation runs ~4–6 seconds, auto-advances, no dead-end |
| 4 | A/B variants | `?v=A` and `?v=B` change Stage 2 modules correctly |
| 5 | Stage 5 validation | Required fields enforced, inline errors shown for invalid input |
| 6 | Prohibited content audit | No pricing, scheduling, buyer UI, or stage collapsing |
| 7 | State persistence | Qualification answers + identity visible in Stage 7 summary |
| 8 | Feature flags | Q4 question hidden, Twilio SMS off |
| 9 | Demo dry run | Full scripted walkthrough without errors |

---

## 15. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stage 3 becomes a generic loader | Breaks psychological trigger | Enforce exact narrative sequence and evaluation tone — no spinners/bars |
| Mobile layout overflow on Stage 1 | Fails primary demo criteria | Lock above-fold dimensions early, test at 390px first |
| State loss between stages | Broken demo flow | Centralize flow state in context/hook, add navigation guards |
| Scope creep into backend integrations | Time blown | Keep all blocked integrations mocked behind clear adapters |
| Copy deviates from spec | Fails acceptance | Use exact copy from spec tables — do not rephrase |
| Progress bar confusion | UX friction | Clear "Step X of 5" labeling, consistent across stages 4–7 |

---

## 16. Post-Hackathon Roadmap

### P0 — Critical (ship within weeks)
| Item | Effort |
|------|--------|
| Wire live Pod 2 API (property + comps) | 1–2 weeks |
| Real CRM lead submission on Stage 5 | 3–5 days |
| Next.js edge middleware for A/B + feature flags | 1 week |

### P1 — Important
| Item | Effort |
|------|--------|
| Google Places API (address autocomplete) | 2–3 days |
| GA4 + Google Ads conversion tags | 3–5 days |
| TCPA consent copy + Twilio SMS (enable flag) | 1 week (legal) |
| LCP performance audit + optimization | 1 week |

### P2–P3 — Enhancements
| Item | Effort |
|------|--------|
| Enable Q4 structural issues question | 1 day |
| Server-side analytics pipeline | 2–3 weeks |
| Dual-path reveal UI (post-assessment) | TBD |

---

## 17. Reference Files

| File | Location | Purpose |
|------|----------|---------|
| Full spec (PDF) | `required-info/BuyMyHouse_Hackathon_Spec_v2.pdf` | Source of truth |
| Spec (text extract) | `required-info/spec_extracted.txt` | Searchable text version |
| Address mock data | `required-info/address_lookup.json` | 31 properties, copy to `/src/data/` |
| Market comps mock data | `required-info/market_comps.json` | 10 ZIP profiles, copy to `/src/data/` |
| Stage wireframes | `required-info/stage_mockups.html` | All 7 stages as annotated wireframes |

### Stage 3 Interactive Prototypes (in `required-info/`)
| File | Variant | Description |
|------|---------|-------------|
| `stage3_animated.html` | System-Log / Dark Terminal | Sequential line disclosure, sub-source expansion, labor illusion delay, master progress bar, typewriter reveal |
| `stage3_skeuomorphic.html` | Premium Hardware | Physical chassis: brushed-metal casing, inset CRT display, phosphor scanlines, LED indicators |
| `stage3_light.html` | Light / Institutional | Navy/gold/white palette, no terminal aesthetics. Micro-animations, spring-complete dots, shimmer. Best for mobile UX + A/B test against dark |

All HTML files are self-contained with zero external dependencies. Use pure CSS + vanilla JS.

---

**Definition of Done**: A full 7-stage, mobile-first seller funnel prototype that is spec-faithful, strictly sequential, psychologically coherent, and demo-ready — without violating any prohibited content or out-of-scope constraints.
