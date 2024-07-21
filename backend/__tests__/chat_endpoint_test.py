# This test script is specifically for testing the Chat api endpoints.
# Make sure you run this file from the backend directory i.e.python -m pytest -s ./__tests__/chat_endpoint_test.py --log-cli-level=INFO

import logging
import os
import sys
from fastapi.testclient import TestClient

from src.app import app

# setting directory as backend/src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../src")))

# setting up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.warning("Logging is active.")
client = TestClient(app)

def test_generate_text_no_history():
    # Test without history
    response = client.post("/generate", json={"role": "user", 
                                              "prompt": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                              })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200
    assert "42" in response.json()["response"]

def test_generate_text_with_history():
    # Test with history
    response = client.post("/generate", json={"role": "assistant", 
                                              "prompt": "Hello, how can I help you today?", 
                                              "history": [{
                                                  "role": "user", 
                                                  "content": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                                  }]
                                            })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200
    assert "42" in response.json()["response"]

def test_generate_text_invalid_role():
    # Test with missing role
    response = client.post("/generate", json={"prompt": "Hello, how can I help you today?"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422

def test_generate_text_invalid_prompt():
    # Test with missing prompt
    response = client.post("/generate", json={"role": "user"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422