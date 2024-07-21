# Description: This file contains the main FastAPI application that will be used to serve api endpoints related to the chatbot.

from fastapi import FastAPI, HTTPException
import logging
from pydantic import BaseModel
from typing import List, Optional

from utils.chatgpt import ChatGPT

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
chatgpt = ChatGPT()

class Prompt(BaseModel):
    role: str
    prompt: str
    history: Optional[List] = None

@app.post("/generate")
async def generate_text(prompt: Prompt):
    """
    Generate a response from the ChatGPT object based on the role and prompt.
    """
    try:
        response = chatgpt.generate(prompt.role, prompt.prompt, prompt.history)
        return {
            "response": response
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))