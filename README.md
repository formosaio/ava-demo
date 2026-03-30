# Ava Demo — Quinyx Customer Event

AI-powered workforce assistant demo. Ava helps Sarah, a barista at Costa Coffee Manchester Arndale, manage her shifts, pay, training, holidays, and shift swaps through a natural chat interface.

Built with Next.js, Tailwind CSS, and Claude (Anthropic API). Designed for live presentation on a projector — includes an iPhone 15 Pro frame, fullscreen mode, and scalable UI.

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

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `F` | Toggle fullscreen (hides browser chrome) |
| `+` / `-` | Scale phone frame up/down (for projector adjustment) |
| `Escape` | Exit fullscreen |
| `Ctrl+Shift+R` | Reset conversation (panic button) |

## Demo flow

1. App loads with Ava's proactive greeting (today's shift, upcoming training, overtime)
2. Tap suggestion chips or type questions
3. Ava responds with text + rich cards (schedule, pay, overtime, swaps, training, holiday)
4. Full conversation context maintained across messages

Pre-built golden responses kick in automatically if the API is slow (>8s) or unavailable.

## Deployment

Push to main branch — Vercel auto-deploys.

Set `ANTHROPIC_API_KEY` in Vercel project settings under Environment Variables.

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude (claude-sonnet-4-20250514)
- **Hosting**: Vercel
