# Security

## Reporting a vulnerability

Please report security issues privately by opening a private advisory in GitHub Security Advisories for this repository.

## Security controls in this project

- Authentication is handled via Supabase Auth.
- Sensitive keys are loaded from environment variables.
- Production artifacts are generated from the Vite build process.

## Secure development baseline

1. Never commit secrets to the repository.
2. Validate dependencies and update vulnerable packages regularly.
3. Run `npm test` and `npm run build` before release.
4. Keep Supabase policies and auth flows reviewed as schema changes are introduced.
