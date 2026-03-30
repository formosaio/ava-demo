# Ava Demo — Quinyx Customer Event

AI-powered workforce assistant demo with two views showing both sides of the same data flywheel:

- **Employee view**: Sarah Mitchell, barista at Costa Coffee Manchester Arndale, manages her shifts, pay, training, and holidays through a mobile chat in an iPhone 15 Pro frame
- **Employer view**: James Whitfield, Regional Manager for Costa Coffee North West (6 stores), uses a dashboard with Ava as a conversational intelligence sidebar

Built with Next.js, Tailwind CSS, and Claude (Anthropic API). Designed for live presentation on a projector.

## Setup

```bash
git clone <repo-url>
cd ava-demo
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Launcher — choose Employee or Employer view |
| `/employee` | Sarah's mobile chat experience (iPhone frame) |
| `/employer` | James's regional manager dashboard with Ava sidebar |

## Keyboard shortcuts

| Key | Action | Available on |
|-----|--------|-------------|
| `0` | Go to launcher menu | All pages |
| `1` | Switch to employee view | All pages |
| `2` | Switch to employer view | All pages |
| `F` | Toggle fullscreen | All pages |
| `Escape` | Exit fullscreen | All pages |
| `+` / `-` | Scale UI up/down (projector adjustment) | Employee + Employer |
| `S` | Open Arndale store drill-down | Employer |
| `G` | Toggle guided demo mode | Employer |
| `Ctrl+Shift+R` | Reset conversation (panic button) | Employee + Employer |

## Demo script

### Act 1 — The employee experience (press 1)

1. App loads with Ava greeting Sarah — today's shift, training, overtime
2. "When's my next shift?" — schedule card appears
3. "How much will I earn this month?" — pay card with overtime opportunity
4. "Show my holiday balance" — holiday card
5. Tap "Any overtime available?" — overtime slots with rates

### Act 2 — The employer dashboard (press 2)

1. Dashboard loads with morning briefing — compliance alert for Bolton, network insight
2. "Why is Stockport struggling compared to Trafford?" — store comparison cards
3. Click Bolton compliance alert in dashboard — Ava explains the rest-period risk
4. "What would fixing turnover save me?" — cost analysis with prioritised actions
5. "How are we doing vs the network?" — all stores benchmarked against 823 locations

### Act 3 — The crossover moment (press S or click Arndale)

1. Press S to open Manchester Arndale drill-down
2. Audience recognises Sarah from Act 1 — same data, manager's perspective
3. See Sarah Mitchell in the team list with her training progress and skills
4. See Callum Reid flagged with young worker compliance
5. Click "View as employee" — transitions back to Sarah's chat
6. Both views show the same data from different vantage points — the Quinyx flywheel

### Guided mode (press G)

Guided mode pre-populates suggestion chips with the ideal demo narrative. Each step's chips lead naturally to the next, giving the presenter a safety net without being a canned demo.

## Reliability

- Pre-built golden responses for the 6 most common questions in each view
- 8-second timeout: if the API is slow, golden responses appear seamlessly
- If the API key is missing or invalid, fallbacks work without any visible errors
- Ctrl+Shift+R resets everything instantly

## Deployment

Push to main branch — Vercel auto-deploys.

Set `ANTHROPIC_API_KEY` in Vercel project settings under Environment Variables.

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude (claude-sonnet-4-20250514)
- **Hosting**: Vercel
