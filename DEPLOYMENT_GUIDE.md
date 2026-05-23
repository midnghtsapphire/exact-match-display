# Deployment Guide

## Prerequisites

- Node.js 20+
- npm
- Supabase project credentials
- Vercel project connected to this repository

## Environment Variables

Create `.env` with:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Local validation

1. `npm install`
2. `npm run baseline:test`
3. `npm test`
4. `npm run build`

## Vercel deployment

1. Import this repository into Vercel.
2. Set framework preset to **Vite**.
3. Add the required Supabase environment variables in Vercel project settings.
4. Enable automatic deployments for pushes to the desired branch.

## Post-deploy checks

1. Open the deployed URL.
2. Verify landing page renders.
3. Verify sign-up and sign-in flows.
4. Verify dashboard loads after authentication.
