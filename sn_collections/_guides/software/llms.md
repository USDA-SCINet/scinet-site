---
title: Large Language Model Support
description: A guide for accessing large language models (LLMs) on SCINet
order_number: 50
categories: [Software]

subnav:
  - title: Responsible use
    url: '#responsible-use'
  - title: SCINet Chat
    url: '#scinet-chat'
  - title: API queries
    url: '#api-queries'


##  - title: Model weights
##    url: '#model-weights'

---
Generative large language models (LLMs) can accelerate and augment multiple facets of agricultural research across a wide range of scientific disciplines. USDA policy allows for the use of generative AI (including LLMs) for scientific research, and, since SCINet is intended exclusively for scientific research, the use of locally hosted LLMs is allowed on SCINet. 
<!--excerpt-->

SCINet is an excellent environment for research applications of LLMs, and we provide access to a variety of local, open-weight LLMs for research use as well as a variety of software tools for interacting with LLMs. Using LLMs directly on SCINet’s supercomputers has several advantages: 

* Open-weight models support the principles of open, reproducible science. 
* All model hosting and queries are confined within SCINet’s boundaries, greatly reducing the risks of leaking valuable research data, results, or intellectual property in comparison to external AI services. Hosting LLMs locally on SCINet also avoids additional required approvals and concerns about the security of cloud-based platforms. 
* SCINet is ideal for experimental research use of LLMs because users are not charged per model query or token, which encourages thorough testing without the burden of worrying about fees. Locally hosting LLMs also leverages investments already made in on-premises HPC infrastructure instead of incurring additional costs. 
* SCINet’s GPU resources allow for LLM customization and fine-tuning for specific research use cases. 
* User interfaces can be customized to best meet SCINet users’ needs while still providing familiar, user-friendly tools for applying LLMs to scientific research.  

LLMs on SCINet infrastructure are available in a variety of access modes: 

* For a familiar web-based graphical user interface, [SCINet Chat](https://atlas-llm.hpc.msstate.edu/)  can be used for chat sessions, including using retrieval-augmented generation (RAG), in which a user can specify a constrained knowledge base (i.e., chat with your data). See the [SCINet Chat](#scinet-chat) section below for more details on how to access and use SCINet Chat. 
* For programmatic access, there is an OpenAI-compatible API available to query the locally hosted LLM service. The API is available at `https://atlas-llm.hpc.msstate.edu/v1` and can be queried, for example, using the Python library LangChain. See the [API queries](#api-queries) section below for more details on how to query the API.

<!--  
* Model weights for several open-weight LLMs are available in the `/reference/llms` directory on both clusters and can be used with a variety of software tools and packages. See the [Model weights](#model-weights) section below for more details on the LLM models supported and how to use the weights.  
-->

Please note that *all* access to LLMs on SCINet, including via the web-based interface and API, requires a SCINet account. 

## Responsible use
AI and machine learning tools on SCINet should only be used in support of scientific research (as with all SCINet computing infrastructure). PII, CUI, or other kinds of sensitive information should never be stored or processed on SCINet systems. 

It is strongly recommended that all users take generative AI fundamentals, security and ethics training prior to using LLM services. For USDA employees, the [Using Generative AI at Work](https://aglearn.usda.gov/enrol/index.php?id=73547) course is available in AgLearn, along with many others.

## SCINet Chat
To access SCINet Chat, go to [https://atlas-llm.hpc.msstate.edu/](https://atlas-llm.hpc.msstate.edu/). You can also find an “SCINet Chat" option on the top navigation bar in [Atlas Open OnDemand](https://atlas-ood.hpc.msstate.edu). When you first load SCINet Chat, you will be prompted to log in. Click on the "Continue with SCINet” button which will authenticate your SCINet account like any other [SCINet web-based interface](guides/access/web-based-login#accessing-web-based-interfaces). 
 
Once logged in, you will see a page with a chat interface. You can click on the "+” button in the central dialog box for options to attach context to your chat such as files on your local computer or the text of webpages via their URLs. Chat conversations are saved automatically and will appear on the left-side navigation bar.  

## API queries
For greater flexibility and automation in using the locally hosted LLM service (e.g., for batch text processing), you can write scripts to programmatically access the API directly instead of using the SCINet Chat user interface. The API follows OpenAI’s API specification. 

To use the local LLM API, you will need to log in to [SCINet Chat](#scinet-chat) at least once to register your SCINet account with the API service (you don’t need to do anything besides logging in). After that, you will need the following pieces of information when accessing the API: 

* Endpoint URL: `https://atlas-llm.hpc.msstate.edu/v1` 
* Model id: `openai/gpt-oss-120b` 

<!-- 
## Model weights
All LLM weights curated on SCINet infrastructure are from U.S. model developers (e.g., OpenAI, Meta, and Google) and include model families such at `gpt-oss`, `llama`, `gemma`, and `olmo`. Model weights are available in the `/reference/llms` directory on both Ceres and Atlas in safetensors and  GGUF formats. GGUF is a convenient, single-file format that is readable by llama.cpp software which is available as the `llama.cpp` module on Ceres and Atlas, and it can also be used with various Python packages, such as LangChain. 
-->
