# Changelog

## [Unreleased]

### Changed

- `npm test` now runs `scripts/test-baseline.js` before Vitest.
- `npm run build` now runs `scripts/build-baseline.js` before Vite build.
- Added a test assertion that baseline checks are wired into the core `test` and `build` scripts.

### Added

- revvel-standards baseline documentation set:
  - `DEPLOYMENT_GUIDE.md`
  - `GO_TO_MARKET.md`
  - `BRAND_GUIDELINES.md`
  - `SECURITY.md`
  - `research/ASSETS.md`
  - `research/ARTIFACTS.md`
- Baseline validation scripts:
  - `scripts/test-baseline.js`
  - `scripts/build-baseline.js`
- Baseline validation tests in `src/test/revvel-baseline.test.ts`.
