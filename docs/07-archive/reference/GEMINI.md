# GEMINI.md - Project Overview

This document provides a comprehensive overview of the Moon Ring marketing website project for the Gemini AI agent.

## Project Overview

This is a Next.js 15 project for the Moon Ring marketing website. The website is designed to be a high-converting marketing and conversion platform for Moon Ring, a social accountability platform for wearable device users.

The project is located in the `moon-ring-platform` directory. It uses the App Router and Turbopack for development and builds.

### Key Technologies

- **Framework**: Next.js 15 with App Router & Turbopack
- **Frontend**: React 19, TypeScript 5, Tailwind CSS 4
- **Payments**: Stripe integration for product ordering
- **Backend**: Supabase (database, auth, storage)
- **Email**: Brevo for transactional and marketing emails
- **Animations**: Framer Motion
- **Monitoring**: Sentry (currently disabled) and Vercel Analytics
- **Deployment**: Vercel

### Project Structure

The main application code is located in the `moon-ring-platform` directory. The `src/app` directory contains the routes for the website, which include:

- `/`: The homepage
- `/about`: The about page
- `/blog`: The blog
- `/contact`: The contact page
- `/demo`: An interactive demo page
- `/pricing`: The pricing page
- `/privacy`: The privacy policy
- `/research`: The research library
- `/terms`: The terms of service
- `/waitlist`: A waitlist signup page

## Building and Running

To build and run the project, follow these steps:

1.  Navigate to the `moon-ring-platform` directory:
    ```bash
    cd moon-ring-platform
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Configure the environment variables by copying `.env.example` to `.env.local` and filling in the required values.
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  To create a production build, run:
    ```bash
    npm run build
    ```
6.  To start the production server, run:
    ```bash
    npm run start
    ```

### Other Commands

-   `npm run lint`: Run the linter.
-   `npm run build:validate`: Run a validation script for the build.

## Development Conventions

-   The project uses TypeScript.
-   The project uses ESLint for linting.
-   The project uses Prettier for code formatting.
-   The project uses Tailwind CSS for styling.
-   The project has a `CLAUDE.md` file with a development guide for Claude Code.
-   The `docs` directory contains further documentation on development workflow, deployment, and architecture.
