from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

# Charge les variables du fichier .env et prompt.txt
load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")

with open("prompt.txt", "r") as f:
    SYSTEM_PROMPT = f.read()


# Crée l'application FastAPI
app = FastAPI()

# Permet au navigateur de communiquer avec FastAPI
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Sert les fichiers HTML/CSS/JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Structure du message reçu depuis le navigateur
class Message(BaseModel):
    messages: list

# L'endpoint principal
@app.post("/chat")
async def chat(msg: Message):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [
                    {"role": "system", "content": f"{SYSTEM_PROMPT}"},
                    *msg.messages  # ← déroule tout l'historique
                ]
            }
        )
    data = response.json()
    return {"response": data["choices"][0]["message"]["content"]}

from fastapi.responses import FileResponse
@app.get("/")
async def root():
    return FileResponse("static/index.html")