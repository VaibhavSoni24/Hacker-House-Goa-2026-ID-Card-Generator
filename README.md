# Hacker House Goa 2026 - ID Card & Frame Generator

A production-grade, highly interactive, and premium web application for generating Hacker House Goa 2026 PFP Frames and Builder ID Cards. 

Built with React, Vite, Tailwind CSS, and Firebase.

## Features
- **Format A (PFP Frame)**: Generate a unique Hacker House Goa profile picture frame.
- **Format B (Builder ID Card)**: Generate a unique, premium boarding pass ID card.
- **AI Taglines**: Uses Inception Labs API to generate a fun, punchy tagline based on your interests.
- **Live Preview**: See your ID card generated in real-time.
- **Save to Firebase**: Uploads the ID card image to Firebase Storage and saves metadata to Firestore.
- **QR Code Verification**: Generates a verifiable QR code pointing to a verification page.
- **Share to X**: One-click sharing to X with pre-filled captions.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Fill in your `VITE_INCEPTION_API_KEY` for AI taglines.
   - Fill in your Firebase configuration keys (see `MANUAL.md` for detailed instructions).

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Manual Configuration
Please refer to the `MANUAL.md` file for step-by-step instructions on setting up the Firebase Project, enabling Firestore, configuring Storage CORS rules, and linking the Inception API key.
