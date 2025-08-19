# BaliBlissed - Deployment Guide

This guide provides instructions for deploying the BaliBlissed application to Firebase App Hosting.

## Prerequisites

Before you begin, ensure you have the following:

1.  **A Firebase Project**: If you don't have one, create a project in the [Firebase Console](https://console.firebase.google.com/).
2.  **Firebase CLI**: Make sure you have the Firebase Command Line Interface installed and authenticated.

    ```bash
    # Install the CLI if you haven't already
    npm install -g firebase-tools

    # Log in to your Firebase account
    firebase login
    ```

3.  **Blaze Plan**: The project uses Genkit AI flows which make external network requests (e.g., to the Gemini API and to Nodemailer for sending emails). This requires your Firebase project to be on the "Blaze (pay as you go)" plan.

## 1. Link Your Project to Firebase

From your project's root directory, link your local code to your Firebase project:

```bash
firebase use --add
```

Select your Firebase project from the list when prompted. This will create a `.firebaserc` file that associates your local directory with your Firebase project.

## 2. Configure Environment Variables for Production

Your application requires environment variables for the Gemini API key and your email credentials. For security, these should not be stored in your code. Firebase App Hosting allows you to set these as secrets in Google Cloud's Secret Manager.

1.  **Open the Google Cloud Console** for your project. You can do this by navigating to your Project Settings in the Firebase Console and clicking the link under "Google Cloud Platform (GCP) resource name".

2.  **Navigate to Secret Manager**: In the Cloud Console, use the search bar to find and navigate to "Secret Manager".

3.  **Enable the Secret Manager API** if it's not already enabled.

4.  **Create the necessary secrets**:
    You need to create three secrets. For each one, click **"+ Create Secret"**:
    - **Secret 1: Gemini API Key**
        - **Name**: `GEMINI_API_KEY`
        - **Secret value**: Paste your Google AI (Gemini) API key.
        - Leave other settings as default and click "Create secret".

    - **Secret 2: Email User**
        - **Name**: `EMAIL_USER`
        - **Secret value**: Paste the Gmail address you are sending emails from (e.g., `youremail@gmail.com`).
        - Click "Create secret".

    - **Secret 3: Email Password**
        - **Name**: `EMAIL_PASS`
        - **Secret value**: Paste your Gmail [app-specific password](https://support.google.com/accounts/answer/185833).
        - Click "Create secret".

5.  **Grant Access to Your App**:
    - After creating the secrets, you need to give your App Hosting backend permission to access them.
    - Find the **principal (service account)** for your backend. It's usually named `app-hosting-backend-....@<project-id>.iam.gserviceaccount.com`. You can find this in the "Details" tab of your App Hosting backend page in the Firebase console.
    - For each of the three secrets, grant the **"Secret Manager Secret Accessor"** role to this principal. You can do this from the Secret Manager page by selecting the secret, going to the "Permissions" tab, and clicking "Grant Access".

## 3. Deploy the Application

Once your secrets are configured, you can deploy the application.

1.  **Build the application for production:**

    ```bash
    npm run build
    ```

2.  **Deploy to Firebase App Hosting:**
    Run the following command from your project's root directory:
    ```bash
    firebase apphosting:backends:deploy
    ```
    You will be prompted to select the backend to deploy. Choose the one associated with your project. The CLI will then deploy your application.

After the deployment is complete, the CLI will provide you with the URL where your live application is hosted.
