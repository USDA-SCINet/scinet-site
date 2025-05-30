---
title: "Computer vision II: object detection and instance segmentation"
date: 2024-11-21 12:30
categories: [2024 AI User Forum] 
time: 1:30-4:30pm CT
lead: ARS SCINet Office

section: November 21, Afternoon — Applications of AI

prerequisites:
  - text: Familiarity with basic machine learning concepts. The workshop on November 20 will provide this background, if needed.
  - text: Familiarity with basic computer vision concepts (e.g., an understanding of how image data are structured in computer memory). The morning computer vision workshop will provide this background.
  - text: Familiarity with basic Python concepts and Jupyter notebooks. We will offer virtual training for these skills before the Forum begins.
---

In this workshop, participants will learn the key concepts and techniques needed to use modern, deep learning-based computer vision methods for object detection and instance segmentation. Learners will practice training and evaluating state-of-the-art computer vision models on custom image datasets. 

This workshop is intended as a continuation of “Computer vision I: introduction and image classification”, but participants do not need to take the earlier workshop if they already have a basic knowledge of machine learning and computer vision concepts.<!--excerpt--> 


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
    mkdir -p /90daydata/shared/$USER/computer_vision2
    cd /90daydata/shared/$USER/computer_vision2
    cp /project/ai_forum/computer_vision2/*.ipynb .
    cp /project/ai_forum/computer_vision2/*.py .
    ```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *computer_vision_2_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
    source /project/ai_forum/computer_vision2/computer_vision_2_env/bin/activate
    ipython kernel install --name "computer_vision_2_env" --user
    ```

1. **Stop the interactive job** on the compute node by running the command:

    {:.copy-code}
    ```bash
    exit
    ```

1. **Launch a JupyterLab Server session.** Under the *Interactive Apps* menu, select *JupyterLab Server*. Specify the following input values on the page:

    * Account: scinet_workshop1
    * Partition: gpu-a100-mig7
    * QOS: normal 14-00:00:00
    * Number of hours: 4
    * Number of nodes: 1
    * Number of tasks: 2
    * Additional Slurm Parameters: 
        
        {: .copy-code }
        ```
--reservation=forum-gpu --gres=gpu:1 --mem=32G --ntasks-per-node=2
```
        {% include reservation-alert reservation="forum-gpu" %}
    * Working Directory: 
        
        {: .copy-code }
        ```
/90daydata/shared/${USER}/computer_vision2
```
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to JupyterLab Server* button will appear. Click *Connect to JupyterLab Server*.

1. **Open the `computer_vision_2.ipynb` notebook.**
  
1. **Select the `computer_vision_2_env` kernel** for the notebook.
