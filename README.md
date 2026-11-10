# RENDRD Media

Technology strategy, creative campaigns and practical tools for marketing and sales teams.

Production: https://rendrd.tech

## Development

Requires Node.js 22. Run npm ci, then npm run dev.

Run npm run build for a production build and npm start to preview it.

## Deployment

Vercel builds the main branch. Pull requests receive preview deployments. Content is in app/data.ts; web media is in public/media. No environment variables are required.

The contact form prepares an email in the visitor mail application.

Private source documents and original media are stored outside this repository.
