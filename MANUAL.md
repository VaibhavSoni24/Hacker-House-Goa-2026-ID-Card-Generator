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

*(Note: The Firebase Storage and Database dependencies were removed from this project to keep the deployment completely free and fully client-side. No Firebase configuration is needed).*
