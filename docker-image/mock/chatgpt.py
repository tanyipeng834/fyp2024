# Description: This file contains the ChatGPT class which is used to interact with the OpenAI GPT-3.5 API.
import openai
import os
from time import sleep
from dotenv import load_dotenv

load_dotenv()

class ChatGPT(object):
    """
    Main class to interact with OpenAI.
    """
    def __init__(self, num_tries=1):
        """
        Initialize the ChatGPT class.
        ::num_tries:: number of times to try to reconnect to the API in case of network error.
        """
        self.key = os.getenv("OPENAI_KEY")
        self.client = openai.OpenAI(api_key=self.key)
        self.num_tries = num_tries
        
    def generate(self, role, prompt, history=None):
        """
        Generate a response from the LLM.
        ::role:: role of the speaker (user or assistant)
        ::prompt:: user input
        ::history:: chat history
        """
        is_done = False
        num_tries = self.num_tries
        response_str = "Error"
        while not is_done and num_tries > 0:
            try:
                if history:
                    updated_history = history + [{"role": role, "content": prompt}]
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=updated_history if history else [{"role": role, "content": prompt}],
                    max_tokens=150,
                    temperature=1.0,
                )
                response_str = response.choices[0].message.content
                is_done = True
            except Exception as err:
                # retry in 5 seconds in case of network error
                print(f"Error: {err}")
                num_tries -= 1
                sleep(5)
                pass
        return response_str

if __name__ == "__main__":
    chat = ChatGPT()
    print(chat.generate("user", "What is the meaning of life?"))