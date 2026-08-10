# Hacker House Goa 2026 ID Card Generator

## Manual Configuration Steps

To fully configure this application, you only need to provide the API key for the AI Tagline generation feature (powered by Inception Labs).

Follow these steps precisely:

### 1. Set up Environment Variables
Rename `.env.example` in the root of the project to `.env`.

### 2. Inception Labs API (for AI Taglines)
Add your Inception API key to your `.env` file like this:
```
VITE_INCEPTION_API_KEY=sk_4ccc94e7c20af22d4af3757348e0ce8e
```

### 3. Run the Project
After setting up the `.env` file, start the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

*(Note: While the app itself is 100% client-side and does not require Firebase Database or Storage, we use Firebase Hosting for deployment).*

### 4. Deployment (Firebase Hosting)
To deploy this project to Firebase Hosting, follow these steps:

1. Install the Firebase CLI globally if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to your Google Account:
   ```bash
   firebase login
   ```
3. Initialize the project (select **Hosting** and choose your project):
   ```bash
   firebase init
   ```
   *(When asked for the public directory, type `dist`. Configure as a single-page app: `Yes`.)*
4. Deploy to the web!
   ```bash
   firebase deploy
   ```
