---
title: An introduction to machine learning for science
date: 2024-11-20 12:00
categories: [2024 AI User Forum] 
time: 1-4 pm CT
lead: ARS SCINet Office

section: November 20, Afternoon — Foundational Skills and Concepts

prerequisites:
  - text: Familiarity with basic Python concepts and Jupyter notebooks. We will offer virtual training for these skills before the Forum begins.

materials:
  - text: Presentation slides
    url: https://usdagcc.sharepoint.com/:b:/s/REE-ARS-SCINetOffice/EcNkufANGD1Eqq0-1gObIJYBe2LKKjfQN2OmKgmEDDaKLA?e=aNepOW
  - text: Jupyter Notebook
    url: https://usdagcc.sharepoint.com/:u:/s/REE-ARS-SCINetOffice/Ea9eC98vRYBHuhCKGHD0TLwBiX6N9GgNuOAKUHzarU45OQ?e=8vP2dS
    
---

Machine learning underlies the vast majority of modern AI methods, including the ever-expanding applications of deep learning and generative AI. This workshop will give participants a hands-on introduction to the basic concepts and techniques needed to understand machine learning and to apply machine learning methods to scientific research. <!--excerpt--> 

Participants will learn how to train, evaluate, and use a variety of machine learning models for data analysis tasks. This session will also help participants critically evaluate the use and application of machine learning in science.


## Tutorial setup instruction

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas's login node.

1. **Request resources on a compute node** by running the following command: 

    {:.copy-code}
    ```bash
srun --reservation=forum -A scinet_workshop1 -t 00:30:00 -n 1 --mem 8G --pty bash 
```
    {% include reservation-alert reservation="forum" project="scinet_workshop1" %}

1. **Create and/or update your workshop working directory** and copy the tutorial materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable. 

    {:.copy-code}
    ```bash
mkdir -p /90daydata/shared/$USER/intro_ml
cd /90daydata/shared/$USER/intro_ml
cp -r /project/ai_forum/intro_ml/intro_ml.ipynb .
```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *intro_ml_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
source /project/ai_forum/intro_ml/intro_ml_env/bin/activate
ipython kernel install --name "intro_ml_env" --user
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
    * Number of tasks: 6
    * Additional Slurm Parameters: 
        
        {: .copy-code }
        ```
--reservation=forum --mem=32G
```
        {% include reservation-alert reservation="forum" %}
    * Working Directory: 
        
        {: .copy-code }
        ```
/90daydata/shared/${USER}/intro_ml
```
    
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to JupyterLab Server* button will appear. Click *Connect to JupyterLab Server*.

1. **Open the `intro_ml.ipynb` notebook.**
  
1. **Select the `intro_ml_env` kernel** for the notebook.


