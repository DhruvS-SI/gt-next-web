# Gujarat Titans - Next.js Web App

A Next.js web application for Gujarat Titans cricket team.

## Getting Started

### 1. Environment Setup

Copy the `.env.example` file to create your local environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual API keys and configuration values.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
gt-next-web/
├── app/                    # App Router pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── team/              # Team page
│   ├── matches/           # Matches page
│   ├── news/              # News page
│   ├── tickets/           # Tickets page
│   ├── shop/              # Shop page
│   ├── gallery/           # Gallery page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.js
│   ├── Footer.js
│   └── Navbar.js
├── lib/                   # Utilities and helpers
│   ├── utils.js
│   └── constants.js
├── public/                # Static files
├── .env.example           # Environment variables template
└── .env.local             # Local environment variables (gitignored)
```

## Available Routes

- `/` - Home page
- `/team` - Team roster and staff
- `/matches` - Match schedules and results
- `/news` - Latest news and updates
- `/tickets` - Ticket booking
- `/shop` - Merchandise store
- `/gallery` - Photos and videos
- `/about` - About Gujarat Titans
- `/contact` - Contact information

## Tech Stack

- Next.js 16.1.0 (App Router)
- React 18.2.0
- JavaScript (No TypeScript)

## Environment Variables

The project uses environment variables for configuration. See `.env.example` for all available variables:

- **NEXT_PUBLIC_APP_URL** - Application URL
- **NEXT_PUBLIC_SITE_NAME** - Site name
- API keys for various services (CMS, Analytics, Payment, etc.)
- Database credentials
- Third-party integrations

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Development

This is a basic setup with routing shells. Styling and functionality will be added in subsequent phases.
