# BaliBlissed Journeys - Development Guide

Welcome, developer! This guide will walk you through setting up the project locally after cloning it from a Git repository.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or another package manager like Yarn or pnpm.

## 1. Clone the Repository

First, clone the project repository to your local machine using Git:

```bash
git clone <your-repository-url>
cd <project-directory>
```

## 2. Install Dependencies

Once you are inside the project directory, install all the necessary dependencies using npm:

```bash
npm install
```

This will download and install all the packages listed in `package.json`.

## 3. Set Up Environment Variables

The application uses environment variables to handle sensitive information like API keys.

1. **Create a local environment file:**
    In the root of the project, create a new file named `.env.local`. You can do this by copying the example file:

    ```bash
    cp .env.example .env.local
    ```

2. **Add your API Key:**
    Open the `.env.local` file. You will see the following line:

    ```plaintext
    GEMINI_API_KEY=""
    ```

    You need to add your Google AI (Gemini) API key here. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey). This is required for the AI-powered features (itinerary generation, AI assistant, etc.) to work.

    **Note:** The `.env.local` file is listed in `.gitignore` and should never be committed to your repository.

## 4. Run the Development Servers

This project requires two separate processes to be running simultaneously in two different terminal tabs or windows.

## **Terminal 1: Run the Next.js App**

This command starts the main web application on `http://localhost:9002`.

```bash
npm run dev
```

## **Terminal 2: Run the Genkit AI Flows**

This command starts the Genkit server, which powers the AI functionality. It watches for changes in your AI flow files.

```bash
npm run genkit:watch
```

Once both servers are running, you can open `http://localhost:9002` in your browser to see the application.

## Project Structure Overview

Here's a quick look at the key folders:

- `src/app/`: Contains the main pages and routes for the Next.js application (using the App Router).
- `src/ai/flows/`: Contains the Genkit AI flows that define the logic for interacting with the language model.
- `src/components/`: Contains all the reusable React components used throughout the application, including UI components from `shadcn/ui`.
- `src/lib/`: Contains utility functions.
- `public/`: Contains static assets like images and fonts.

Happy coding!
