# Portable Workforce Identity — Strategic Direction (Draft)

> Status: Early exploration. Parked for now — revisit after customer event.

## Core insight

Many frontline employers can't justify the cost of a proper digital identity for each worker (e.g. an email account with SSO). This means employees often lack unique identifiers across the systems they interact with. A **Portable Workforce Identity** — owned by the worker, useful across employers — could solve this while creating a new value layer for Quinyx.

## What it is

A persistent digital identity for frontline workers that:
- Lives with the **person**, not the employer
- Accumulates verified skills, training credentials, and work history
- Enables frictionless hiring for ad-hoc, seasonal, and peak-period work
- Is powered by Ava as the conversational interface on both sides

## The employee value proposition

Why would someone install this app?

- **Verifiable work history** they control (like LinkedIn for frontline, but data-driven not self-reported)
- **Instant access to shifts** without re-applying — one profile, many employers
- **Portable training record** — skills earned at one employer transfer to the next
- **Financial tools** — pay tracking across multiple jobs, tax help for gig workers
- **Professional reputation** — reliability scores and references that follow them

## The employer value proposition

- **Fill peak-period shifts** from a pre-verified pool of workers
- **Reduce re-onboarding cost** — seasonal workers keep their identity between engagements, certs stay valid
- **Trust signals** — verified credentials, work history, reliability scores vs. unvetted CV applicants
- **"Internal first, then pool"** — extend existing Quinyx WFM to tap the external pool only when internal scheduling can't fill demand

## Key strategic question: extension or platform?

| | Product extension | Platform play |
|---|---|---|
| **Scope** | Feature of Quinyx WFM | Identity layer for all frontline work |
| **User acquisition** | Existing Quinyx customer employees | Any frontline worker |
| **Employer access** | Quinyx customers only | Any employer |
| **Revenue model** | Bundled with WFM subscription | Marketplace fees, per-hire, credential verification |
| **Cold-start risk** | Low (seed from existing base) | High (classic marketplace chicken-and-egg) |
| **Customer perception** | "Quinyx helps me hire for peak periods" | "Quinyx is building a staffing marketplace with my employees" |

## Monetisation options (handle with care)

1. **Employer pays for pool access** — post shifts to verified workers within radius. Workers pay nothing. Most aligned with existing business.
2. **Employer pays per verified credential** — "This candidate has verified Level 2 Food Hygiene + 400 hours barista experience" is worth more than an unverified CV.
3. **Training marketplace** — employers/providers pay to list courses, workers complete them, credentials go on their identity. Quinyx takes a cut.
4. **Seasonal retention tool** — employers pay to keep their seasonal workers "warm" between periods via the portable identity.

### Monetisation risk

The main concern: employers feeling that Quinyx is helping their staff leave, or that Quinyx is building a competing staffing product using employer data. The framing matters — **retention tool** (your workers come back to you) vs **marketplace** (your workers find other work). The former is an easier sell to existing customers.

## Open questions

- Who is the target worker? Students, gig workers, seasonal, all?
- What data does the worker own vs the employer? If Sarah leaves Costa, what goes with her?
- How are credentials verified? Self-reported, employer-confirmed, third-party?
- Regulatory implications: does Quinyx become an employment agency? Worker vs contractor status?
- How does this differentiate from Indeed Flex, Coople, Temper?
- What's the "moment of signup"? Employer-initiated (onboarding) → worker-claimed? Or worker-initiated?

## Connection to the Ava demo

The current demo already shows the data flywheel: Sarah's employee experience feeds James's employer dashboard. A portable identity extends this — Sarah's profile, training, and reliability data become valuable *beyond* Costa Coffee, and Quinyx sits at the centre of that exchange.

## Next steps (when revisited)

- [ ] Interview 5-10 frontline workers about identity/portability pain points
- [ ] Interview 3-5 Quinyx customers about peak-period hiring challenges
- [ ] Competitive analysis: Indeed Flex, Coople, Temper, Stint, Syft
- [ ] Legal review: UK agency worker regulations, data portability (GDPR)
- [ ] Prototype: "claim your identity" flow from employer-initiated to worker-owned
