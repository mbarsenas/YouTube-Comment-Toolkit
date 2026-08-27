# YouTube Comment Toolkit

CommentKit is a self-service web app for loading public YouTube comments, exploring audience feedback, exporting results, and selecting fair giveaway winners with duplicate-author removal.

## Current capabilities

- Live YouTube Data API v3 comment imports
- Free and paid comment limits
- Search, question, and unique-author filters
- Secure random giveaway selection
- CSV exports
- Stripe-hosted Checkout with server-side payment verification

## Local setup

Copy `.env.example` to `.env.local` and provide restricted test credentials. Never commit `.env.local` or API keys.

```bash
npm install
npm run dev
```
