# 🐾 Maître Chien — Redpill Chatbot

> A French-language AI chatbot with a sharp, no-nonsense personality. Built with FastAPI, vanilla JavaScript, and deployed on Railway.

---

## Overview

Maître Chien is a conversational chatbot designed around the "maître chien" cultural trend an ambiguous, aura-heavy persona that gives direct advice on personal development and relationships. No fluff. No filter.

The project is a full-stack web application: a Python backend handles API calls and serves the frontend, while the browser manages conversation history and UI interactions.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python · FastAPI · httpx |
| AI Model | LLaMA 3.3 70B via Groq API |
| Frontend | HTML · CSS · Vanilla JavaScript |
| Hosting | Railway |

---

## Features

- Conversational memory within a session (localStorage)
- Token-limited history to control API usage
- Custom system prompt defining the bot's personality
- Responsive UI for mobile and desktop
- Secure API key management via environment variables

---

## Project Structure

```
chatbot/
├── main.py           # FastAPI backend
├── prompt.txt        # System prompt — bot personality
├── requirements.txt  # Python dependencies
├── Procfile          # Railway deployment config
└── static/
    ├── index.html    # Chat interface
    ├── style.css     # Styling
    └── script.js     # Frontend logic
```

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/fobahsalomon/chatbot.git
cd chatbot

# 2. Create and activate a conda environment
conda create -n chatbot python=3.11
conda activate chatbot

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create a .env file with your Groq API key
echo "GROQ_API_KEY=your_key_here" > .env

# 5. Run the server
uvicorn main:app --reload
```

Then open `http://127.0.0.1:8000` in your browser.

---

## Deployment

The app is deployed on [Railway](https://railway.app). Environment variables (`GROQ_API_KEY`) are configured directly in the Railway dashboard never committed to the repository.

**Live demo:** [dawgsensei.up.railway.app](https://dawgsensei.up.railway.app)

---

## Author

**Fobah Salomon** — B3 Data Science student at ASE, Abidjan.
