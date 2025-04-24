---
title: Introduction to Jupyter Notebooks and Python
type: training
description: Training - learning tools and techniques that are fundamental for building, testing, and deploying AI models in Jupyter Notebooks with Python.

tags: Python Jupyter Artificial-Intelligence
time: 1-5 PM ET

# details:
#   - text: Registration reserved for AI User Forum participants

materials:
  - text: Workshop recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EVh7jdve53JApdx89HA2Ay4BTjC-t9aAneNJzchDe_VEkQ?e=xtc6hV&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D
  - text: Workshop Materials
    url: https://github.com/PracticumAI/python-crash-course-ars

# registration: 
#   text: Register for the AI User Forum
#   url: https://events.tti.tamu.edu/conference/2024-forum-on-ai-applications-to-usda-science/

---

In this workshop, which assumes no prior coding experience, you will begin to learn the tools and techniques that are fundamental for building, testing, and deploying AI models in Jupyter Notebooks with Python.<!--excerpt--> Participants will explore Jupyter Notebooks as an interactive platform for coding and data analysis. The workshop will introduce participants to Python, including popular data exploration and visualization libraries such as pandas and plotnine.
 
## Learning Objectives:
By the end of this workshop, participants will be able to:
* Use Jupyter Notebooks for coding Python. 
* Understand the basics of Python code. 
* Begin troubleshooting common coding errors.
* Practice data manipulation and visualization using Python libraries.

## Tutorial setup instruction

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Open a command-line session** by clicking on “Clusters” -> “Atlas Shell Access” on the top menu. This will open a new tab with a command-line session on Atlas's login node.

1. **Request resources on a compute node** by running the following command: 

    {:.copy-code}
    ```bash
    srun --reservation=preforum -A scinet_workshop1 -t 00:30:00 -n 1 --mem 8G --pty bash 
    ```
    {% include reservation-alert reservation="preforum" project="scinet_workshop1" %}

1. **Create and/or update your workshop working directory** and copy the tutorial materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable. 

    {:.copy-code}
    ```bash
    mkdir -p /90daydata/shared/$USER/intro_python
    cd /90daydata/shared/$USER/intro_python
    cp -r /project/ai_forum/intro_python/python-crash-course-ars/* .
    ```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *intro_python_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
    source /project/ai_forum/intro_python/intro_python_env/bin/activate
    ipython kernel install --name "intro_python_env" --user
    ```

1. **Stop the interactive job** on the compute node by running the command:

    {:.copy-code}
    ```bash
    exit
    ```

1. **Launch a JupyterLab Server session.** Under the *Interactive Apps* menu, select *JupyterLab Server*. Specify the following input values on the page:

    * Account: scinet_workshop1
    * Partition: atlas
    * QOS: normal 14-00:00:00
    * Number of hours: 4
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: \-\-reservation=preforum \-\-mem=16G
    * Working Directory: /90daydata/shared/${USER}
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to JupyterLab Server* button will appear. Click *Connect to JupyterLab Server*.

1. **Select the *intro_python_env* kernel** for each notebook.
