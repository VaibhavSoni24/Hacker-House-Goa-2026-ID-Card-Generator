# Hacker House Goa 2026 - ID Card & Frame Generator

A production-grade, highly interactive, and premium web application for generating Hacker House Goa 2026 PFP Frames and Builder ID Cards. 

Built with React, Vite, Tailwind CSS, and html-to-image.

## Features
- **Format A (PFP Frame)**: Generate a unique Hacker House Goa profile picture frame.
- **Format B (Builder ID Card)**: Generate a unique, premium boarding pass ID card.
- **AI Taglines**: Uses Inception Labs API to generate a fun, punchy tagline based on your interests.
- **Live Preview**: See your ID card generated in real-time.
- **Share to X**: One-click sharing to X with pre-filled captions.
- **100% Client-Side**: Fully processes and generates images on the device without requiring any paid cloud storage backend.

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

## Manual Configuration
Please refer to the `MANUAL.md` file for step-by-step instructions on linking the Inception API key.
