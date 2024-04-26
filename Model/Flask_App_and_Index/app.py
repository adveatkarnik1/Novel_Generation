'''
dependencies to install

!pip install langchain huggingface_hub sentence_transformers faiss-gpu langchain-groq
'''

import langchain
from langchain_groq import ChatGroq
import getpass
import os
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_community.llms import HuggingFaceHub
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.callbacks import StdOutCallbackHandler
from langchain_community.vectorstores import FAISS
import numpy as np

load_dotenv()

inference_api_key = os.getenv('INFERENCE_API_KEY')
os.environ['HUGGINGFACEHUB_API_TOKEN'] = inference_api_key

groq_api_key = os.getenv('GROQ_API_KEY')

chat = ChatGroq(temperature=0, groq_api_key=groq_api_key, model_name="llama3-70b-8192", max_tokens = 600)

embeddings_model_name = "mixedbread-ai/mxbai-embed-large-v1"

embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)

index_loc = "faiss_percy_jackson_index"
index = FAISS.load_local(index_loc, embeddings,allow_dangerous_deserialization=True)


retriever = index.as_retriever()
retriever.search_kwargs['fetch_k'] = 30
retriever.search_kwargs['maximal_marginal_relevance'] = True
retriever.search_kwargs['k'] = 20

handler = StdOutCallbackHandler()



story_template = '''You are a creative and helpful storyteller AI. When given context and question, you get a creative and in depth story based on the question.

context = {context}

question = Write a detailed story based on the context for {question}

Answer:
'''

story_prompt = PromptTemplate(input_variables = ['context','question'], template = story_template)

chain_story = RetrievalQA.from_chain_type(
    llm=chat,
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": story_prompt},
    verbose=True
)





question_template = '''You are a smart AI who responds based on the provided context. When given context and question, you get a creative and in depth explanation based on the question and context.

context = {context}

question = Write a detailed explanation based on the context for {question}

Answer:
'''

question_prompt = PromptTemplate(input_variables = ['context','question'], template = question_template)

chain_query = RetrievalQA.from_chain_type(
    llm=chat,
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": question_prompt},
    verbose=True
)

def story_generator(question):
    return chain_story.invoke(question,callbacks=[handler])

def query_responder(question):
    return chain_query.invoke(question,callbacks=[handler])


from flask import Flask,request,jsonify

app = Flask(__name__)

@app.route('/',methods=['POST'])
def func():
    data=request.json
    response=""
    if(data['questionType']==1):
        response=story_generator(data['question'])
    else:
        response=query_responder(data['question'])

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
