# Exact Match Display (SubKill)

Exact Match Display is a React + Supabase web app for tracking recurring subscriptions, spotting waste, and managing cancellations from a single dashboard.

## Website in Test (Vercel)

- **Vercel URL:** https://exact-match-display.vercel.app
- **Deployment automation:** connect this repo to Vercel Git integration so pushes to the active branch deploy automatically.

## What this repository does

- Provides a conversion-focused landing page for subscription cost pain points.
- Supports user authentication (email/password + Google + Apple OAuth via Supabase).
- Provides an authenticated dashboard to track active subscriptions, spending, renewals, and cancelled services.

## How it can be used now

1. Install dependencies: `npm install`
2. Run locally: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`

## Revvel-standards baseline

This repository includes the required baseline docs and validation checks:

- `CHANGELOG.md`
- `DEPLOYMENT_GUIDE.md`
- `GO_TO_MARKET.md`
- `BRAND_GUIDELINES.md`
- `SECURITY.md`
- `research/ASSETS.md`
- `research/ARTIFACTS.md`
- `scripts/test-baseline.js`
- `scripts/build-baseline.js`

Run baseline checks with:

- `npm run baseline:test`
- `npm run baseline:build`

Baseline checks also run automatically when executing `npm test` and `npm run build`.

## Project value and priority

SubKill is positioned as a cost-optimization and retention-intelligence product for consumers and SMB owners. The immediate priority is reliable auth, accurate recurring-spend visibility, and fast onboarding, because those are the highest-leverage drivers for trial-to-paid conversion.
