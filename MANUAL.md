# Hacker House Goa 2026 ID Card Generator

## Manual Configuration Steps

To make this production-ready application fully functional, you need to configure the backend APIs (Firebase and Inception Labs LLM). 

Follow these steps precisely.

### 1. Set up Environment Variables
Rename `.env.example` in the root of the project to `.env` and fill in the values below.

### 2. Inception Labs API (for AI Taglines)
The user has provided this key already:
```
VITE_INCEPTION_API_KEY=sk_4ccc94e7c20af22d4af3757348e0ce8e
```
Paste this into your `.env` file.

### 3. Firebase Configuration (for Database & Image Storage)
You need to create a Firebase Project to store the generated ID Cards and Metadata.
1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**. Name it `hhgoa-id-generator`.
2. Once created, click on the **Web** icon (</>) to add a web app to the project. Register the app.
3. Firebase will provide a `firebaseConfig` object. Copy the values into your `.env` file corresponding to the `VITE_FIREBASE_*` variables.
4. **Enable Firestore Database**:
   - Go to **Firestore Database** in the left menu.
   - Click **Create Database**. Start in **Test Mode** (or configure security rules later).
5. **Enable Firebase Storage**:
   - Go to **Storage** in the left menu.
   - Click **Get Started**. Start in **Test Mode**.
6. **Update Storage CORS Rules (IMPORTANT)**:
   - For `html2canvas` to correctly capture images hosted on Firebase without tainting the canvas, you MUST configure CORS on your Firebase Storage bucket.
   - You can do this using the `gsutil` CLI or Google Cloud Console. 
   - Create a `cors.json` file locally:
     ```json
     [
       {
         "origin": ["*"],
         "method": ["GET"],
         "maxAgeSeconds": 3600
       }
     ]
     ```
   - Run: `gsutil cors set cors.json gs://<YOUR_STORAGE_BUCKET_NAME>`

### 4. Run the Project
After setting up the `.env` file, run:
```bash
npm run dev
```
To build for production:
```bash
npm run build
```
