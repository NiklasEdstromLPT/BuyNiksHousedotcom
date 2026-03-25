# BuyMyHouse.com Pod 1 Execution Plan

Primary source: required-info/BuyMyHouse_Hackathon_Spec_v2.pdf (extracted to required-info/spec_extracted.txt for working reference).

## 1. Overarching Structure

This plan follows the exact structure and intent of the PDF spec:

1. Product objective and conversion doctrine
2. Success criteria and scope controls
3. Seven-stage funnel build sequence (strict order)
4. Technical and design guardrails
5. Implementation tracks and delivery timeline
6. Demo readiness and acceptance gates
7. Post-hackathon hardening roadmap

## 2. Product Goals (From Spec)

## 2.1 Primary Goal
Ship a working, click-through prototype of all seven funnel stages, fully demonstrable from address entry to confirmation.

## 2.2 Conversion Doctrine (Non-Negotiable)
- This is a seller funnel, not a buyer product.
- Stages are sequential and must not be merged, reordered, or simplified.
- Pod 1 scope ends at confirmation (stages 1-7); downstream layers are out of scope.

## 2.3 Demo Success Criteria
- Stage 1 above-fold fits 390px mobile viewport without scroll.
- Stage 2 trust modules visible on scroll.
- Stage 3 interstitial animates and auto-advances.
- Stage 4 renders tap-friendly qualification cards with progress.
- Stage 5 captures identity fields with TCPA placeholder.
- Stage 6 renders expert assignment headline/body copy correctly.
- Stage 7 shows property summary and next steps with no pricing.

## 3. Scope Controls

## 3.1 In Scope
- Full UI for all 7 stages.
- Stage 1 address entry with Google Places if available, otherwise fallback input.
- Stage 3 pure CSS/JS interstitial.
- Stage 4 qualification flow using client-side state.
- Stage 5 identity form with mock submit.
- Stages 6-7 static content with spec-accurate copy.
- Mobile-first behavior at 390px.
- Mock data integration from address_lookup.json and market_comps.json.

## 3.2 Out of Scope
- Live Pod 2 API.
- Twilio SMS verification (flag OFF).
- Real CRM submission.
- Full analytics pipeline and GTM integrations.
- Buyer-facing flows, listing/search/map features.
- Pricing estimates, offer amounts, scheduling widgets.

## 4. Build Strategy and Workstreams

## 4.1 Workstream A: Shell, Routing, and Foundation
- Set app shell and stage routing/state machine.
- Establish design tokens and mode system:
  - Institutional/Calm for stages 1,2,4,5,6,7.
  - Technical/Precise for stage 3 only.
- Add feature flags and URL variant parsing (?v=A, ?v=B).
- Add event logging placeholders per stage transitions.

Deliverable: navigable stage framework with placeholder screens.

## 4.2 Workstream B: Stage 1 and Stage 2 Trust Entry
- Build Stage 1 with exact copy hierarchy and dominant address CTA flow.
- Enforce no-scroll above-fold behavior at 390px.
- Build Stage 2 trust modules:
  - Billboard continuity block
  - 3-step process
  - Credibility block
  - Optional testimonial variant (URL-driven)

Deliverable: entry experience that resolves objections and drives CTA.

## 4.3 Workstream C: Stage 3 Evaluation Interstitial
- Build sequential terminal-style line rendering with timed intervals.
- Inject entered address and ZIP from mock lookup.
- Map alignment tier text (strong/within/additional).
- Auto-advance to Stage 4 after sequence.

Critical constraints:
- Stage 3 is the only dark/terminal stage.
- No progress bars, percentages, spinners, countdown timers, or fabricated pricing metrics.

Deliverable: convincing evaluation scene (not a generic loading screen).

## 4.4 Workstream D: Stages 4-7 Conversion Completion
- Stage 4: one-question-per-screen qualification cards, Q1-Q3 ON, Q4 OFF by flag.
- Stage 5: identity form (first, last, email, mobile) with validation and TCPA placeholder.
- Stage 6: expert assignment page with exact headline/subline/body intent.
- Stage 7: confirmation with property + answer summary and next steps.

Deliverable: complete committed-lead journey through confirmation.

## 4.5 Workstream E: Data and State Orchestration
- Normalize address input (lowercase + trim).
- Lookup in address_lookup.json; carry parsed property context forward.
- Use market_comps.json ZIP profile for interstitial narrative context.
- Persist all answers in client-side session state through Stage 7.

Deliverable: realistic data-backed stage transitions with Pod 2-compatible shapes.

## 5. Stage-by-Stage Implementation Plan

## Stage 1: Above the Fold
Objective: reduce friction and capture address.
Steps:
1. Render exact stage copy and CTA.
2. Implement address input and fallback behavior.
3. Enforce 390px no-scroll layout.
4. Add trust micro-reassurance line.
Acceptance gate: mobile screenshot confirms full above-fold fit and dominant address entry.

## Stage 2: Trust Layer
Objective: resolve doubt through credibility and process clarity.
Steps:
1. Implement billboard continuity module.
2. Implement 3-step process copy block.
3. Add credibility and testimonial sections with variant toggle.
4. Wire sticky or repeated CTA back to address path.
Acceptance gate: all trust modules visible on scroll and variants switch via URL param.

## Stage 3: Evaluation Interstitial
Objective: create labor illusion and evaluation legitimacy.
Steps:
1. Render monospaced technical scene with dark palette.
2. Animate sequential lines with delays.
3. Inject address/ZIP and alignment tier output.
4. Auto-advance to Stage 4 after terminal sequence.
Acceptance gate: full sequence runs cleanly, then transitions without user dead-end.

## Stage 4: Qualification
Objective: continue momentum via low-friction questions.
Steps:
1. Render step-progress context (3 of 5 active).
2. Present Q1-Q3 cards as full-width tap targets.
3. Auto-advance question flow on answer selection.
4. Store answers in state.
Acceptance gate: user can complete all qualification steps on mobile without keyboard-heavy input.

## Stage 5: Identity
Objective: convert anonymous visitor to contactable lead.
Steps:
1. Render required fields and reassurance copy.
2. Add form validation for required values and basic formats.
3. Include TCPA placeholder text.
4. Mock-submit to state and proceed to Stage 6.
Acceptance gate: valid data advances; invalid data shows clear inline errors.

## Stage 6: Expert Assignment
Objective: reinforce reciprocity and expectation setting.
Steps:
1. Render exact assignment framing copy.
2. Show brief assignment-in-progress pulse effect.
3. Confirm continue action to Stage 7.
Acceptance gate: copy and progression match spec language and intent.

## Stage 7: Confirmation
Objective: lock commitment and hand off to offline process.
Steps:
1. Render success confirmation headline.
2. Display property + answer summary card (read-only).
3. Show next steps and expectation timing.
4. Verify prohibited elements are absent (pricing/scheduling).
Acceptance gate: confirmation is complete, clear, and policy-compliant.

## 6. Design and Technical Guardrails

## 6.1 Visual Rules
- Institutional/Calm palette and sans-serif for stages 1,2,4,5,6,7.
- Technical/Precise palette and monospaced font for stage 3 only.
- No purple gradients, generic AI styling, buyer-style map/listing visuals.

## 6.2 Performance/Architecture Targets (Hackathon-Friendly)
- Keep JS bundle lean and above-fold assets light.
- Defer non-critical script.
- Prefer static imports and local JSON over API fetch for hackathon.

## 6.3 Compliance/Prohibition Checklist
- No pricing, estimates, or offer amounts anywhere in funnel.
- No confirmation scheduling widgets.
- No buyer-facing navigation/features.
- No collapsing stages 4-7.

## 7. Delivery Timeline (Aligned to Spec Time Plan)

## Hour 0:00-1:00 Foundation
- Scaffold app and routing shell.
- Build Stage 1 baseline.
- Wire Stage 3 animation scaffold.
- Import mock data and start Stage 4 skeleton.

## Hour 1:00-2:00 Features
- Complete Stage 2 and mobile behavior.
- Finish Stage 3 alignment + auto-advance.
- Complete Stages 5-7 and Stage 5 validation.

## Hour 2:00-2:40 Integration
- Merge all workstreams.
- Resolve routing/state bugs.
- Finalize URL variants and data injection.
- Add transition polish and event logs.

## Hour 2:40-3:00 Demo Prep
- Full mobile run-through at 390px.
- Walk scripted demo sequence for stages 1-7.
- Prepare optional deployment handoff.

## 8. Acceptance Test Plan

Run this in order before sign-off:
1. Mobile viewport test at 390px for stages 1-7.
2. Happy path from address entry to confirmation with state retained.
3. Stage 3 timing and auto-advance behavior.
4. Variant URL checks (?v=A / ?v=B) for stage 2 modules.
5. Validation checks for Stage 5 (required fields and format).
6. Prohibited-content audit (pricing, scheduling, buyer UI, stage collapse).
7. Final scripted stakeholder demo dry run.

## 9. Risks and Mitigations

- Risk: Stage 3 becomes a generic loader.
  - Mitigation: enforce exact narrative sequence and evaluation tone.
- Risk: Mobile layout overflow on stage 1.
  - Mitigation: lock above-fold dimensions early and test first.
- Risk: State loss between stages.
  - Mitigation: centralize flow state and stage navigation guards.
- Risk: Scope creep into backend integrations.
  - Mitigation: keep all blocked integrations mocked behind clear adapters.

## 10. Post-Hackathon Path (From PDF Roadmap)

P0 priorities:
- Replace mock imports with live Pod 2 property/comps APIs.
- Connect Stage 5 submission to CRM.
- Move A/B and feature flags to edge middleware.

P1 priorities:
- Add Google Places production integration.
- Enable analytics pipelines and conversion tags.
- Complete TCPA legal copy and optionally enable Twilio flag.

P2/P3 priorities:
- Enable structural issues question (Q4).
- Build server-side analytics pipeline.
- Implement post-assessment dual-path reveal UI.

---

Definition of done: A full 7-stage, mobile-first seller funnel prototype that is spec-faithful, sequential, psychologically coherent, and demo-ready without violating any prohibited content or out-of-scope constraints.
