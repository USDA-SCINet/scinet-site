---
title: Spatial modeling with machine learning
date: 2024-11-21 12:30
categories: [2024 AI User Forum] 
time: 1:30-4:30pm CT
lead: ARS SCINet Office

section: November 21, Afternoon — Applications of AI

prerequisites:
  - text: Familiarity with basic machine learning concepts. The workshop on November 20 will provide this background, if needed.
  - text: Familiarity with basic Python concepts and Jupyter notebooks. We will offer virtual training for these skills before the Forum begins.
---

This workshop will explore examples of spatial modeling tasks (e.g., spatial interpolation from point data to gridded data) with machine learning methods. The content of the session will primarily focus on the spatial component (e.g., how to include spatial proximity as a predictor) although machine learning concepts will be discussed as relevant. <!--excerpt--> 

The goals of this session are to 
1) introduce key concepts about incorporating spatial data in machine learning and 
2) provide examples in Python on how to manipulate spatial datasets to use in machine learning functions, compare the performance of machine learning approaches for spatial prediction, and visualize observed spatial data and the prediction results.


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
    mkdir -p /90daydata/shared/$USER/spatial_modeling
    cd /90daydata/shared/$USER/spatial_modeling
    cp -r /project/ai_forum/spatial_modeling/spatial_modeling.ipynb .
    cp -r /project/ai_forum/spatial_modeling/data .
    ```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *spatial_modeling_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
    source /project/ai_forum/spatial_modeling/spatial_modeling_env/bin/activate
    ipython kernel install --name "spatial_modeling_env" --user
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
    * Number of tasks: 16
    * Additional Slurm Parameters:
       
        {: .copy-code }
        ```
--reservation=forum --mem=32G
```
        {% include reservation-alert reservation="forum" %}
    * Working Directory: 
        
        {: .copy-code }
        ```
/90daydata/shared/${USER}/spatial_modeling
```
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to JupyterLab Server* button will appear. Click *Connect to JupyterLab Server*.

1. **Select the `spatial_modeling_env` kernel** for the `spatial_modeling.ipynb` notebook.


