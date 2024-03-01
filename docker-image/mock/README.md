# Mock up
This folder is a mock up for how the Chatbot system utilising the RAG system would work.

Currently, the front-end is handled by Streamlit while the back-end is an API call to OpenAI. Chatbot memory is simulated by storing all chat history in session state.

Goals:
- replace/update front-end & back-end?
- replace OpenAI call with a open-source LLM
- create and integrate Information Retrieval System to extract related documents in the reference library
- create and integrate "System" to ingest extracted documents and feed to LLM before passing to user
- save unique chat history in a separate database
- save reference library in a separate vector database

How to Use (Without Docker):

Pull from repo.
Navigate to "mock" and install requirements using "pip install -r requirements.txt"
To load chat interface, launch Streamlit using "python -m streamlit run app.py"
Web interface should automatically load.

How to View (Using Docker):

Pull from repo.
Create your own .env file and add it to the "mock" folder, setting your API Key in the following format:
"OPENAI_KEY = {API_KEY}"

Run "docker build -t {image_name}:{version}"
Run "docker run -d -p {port}:8501 --name {webserver_name} {image_name}:{version}"
Visit the webpage at "http://localhost:9090/" in your browser