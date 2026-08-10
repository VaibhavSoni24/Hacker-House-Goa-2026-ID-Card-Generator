# Hacker House Goa 2026 - ID Card & Frame Generator

A production-grade, highly interactive, and premium web application for generating Hacker House Goa 2026 PFP Frames, Builder ID Cards, and Team Squad Cards. 

Built with React, Vite, Tailwind CSS, and `html-to-image`.

## Features
- **Format A (PFP Frame)**: Generate a unique Hacker House Goa profile picture frame.
- **Format B (Builder ID Card)**: Generate a unique, premium boarding pass ID card with dynamic flight details and role configurations.
- **Format C (Team Card)**: A fully responsive, landscape Team Card supporting 1 to 3 members with a premium cyberpunk/hacker aesthetic (crosshairs, custom barcodes, grid layouts).
- **AI Taglines**: Uses the Inception Labs API to dynamically generate a fun, punchy tagline based on your interests. Built-in failsafes ensure layout stability.
- **Flawless Export & Scaling**: Uses custom CSS scaling via `ResizeObserver` to ensure perfect responsiveness on mobile without breaking the un-cropped `html-to-image` full-resolution PNG export.
- **Share to X**: One-click sharing to X with pre-filled, format-aware captions.
- **100% Client-Side Image Generation**: Fully processes and generates images on the device without requiring any paid cloud storage backend.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Fill in your `VITE_INCEPTION_API_KEY` for AI taglines.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment (Firebase Hosting)

Since this project is a static React application (Vite), it can be deployed easily to Firebase Hosting.

1. Install the CLI: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Initialize (if not already done): `firebase init` (Select Hosting, set public directory to `dist`, configure as SPA: Yes)
4. Deploy to production: `firebase deploy`

## Manual Configuration
Please refer to the `MANUAL.md` file for step-by-step instructions on linking the Inception API key and setting up the project locally.
