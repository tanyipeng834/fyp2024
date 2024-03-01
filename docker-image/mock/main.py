# Description: Streamlit app for LLM-chat interface
import streamlit as st
from chatgpt import ChatGPT

# create a ChatGPT instance
chat = ChatGPT()

# setting page description
st.set_page_config(page_title="RAG Mockup", page_icon=":smiley:")
st.markdown("<h1 style='text-align: center; color: white;'>What would you like to talk about today?</h1>", unsafe_allow_html=True)
st.divider()
st.markdown("<h3 style='text-align: center; color: white;'>This Chatbot is a mockup for how the actual RAG system will function. </h3>", unsafe_allow_html=True)
st.divider()

# creating session states to store the chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# setting up the sidebar
st.sidebar.title("LLM Chatbot")
counter_placeholder = st.sidebar.empty()
with st.sidebar:
    st.markdown("<h3 style='text-align: center; color: white;'>Clear chat history here</h3>", unsafe_allow_html=True)
    clear_button = st.button("Clear history")

# clearing history
if clear_button:
    st.session_state.messages = []
    counter_placeholder.empty()

# main chat interface
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# query input
if prompt := st.chat_input("What is up?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message('user'):
        st.markdown(prompt)
    
    with st.chat_message('assistant'):
        stream = chat.generate("assistant", prompt, st.session_state.messages)
        st.session_state.messages.append({"role": "assistant", "content": stream})
        response = st.write(stream)