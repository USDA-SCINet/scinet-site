---
title: An Introduction to Machine Learning for Science
type: workshop
provider: SCINet
date: 2025-02-10
end_date: 2025-02-21
description: Event - Workshop for AI and Machine Learning
categories: [2025 02 Intro ML] 
tags: Artificial-Intelligence Machine-Learning
layout_type: workshop
#cal-titles: show
registration: 
  url: https://forms.office.com/g/mcAbYXjuGJ

display: basic
no-caldate: true
time: 1-4 PM ET

has-sessions: true
parent: 
  title: AI Workshop Series
  url: /events/2025-ai

multiday: Feb 10, 12, and 14

excerpt: This workshop will give participants a hands-on introduction to the basic concepts and techniques needed to understand machine learning and to apply machine learning methods to scientific research.

materials:
  - text: Day 1 recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/ET-LfOoVNcxKuO1TY8YnNPgBg3UwGpr5-gUbLsYhutTtdg
  - text: Day 2 recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EV-WPZG5V61IrL3wiuWXYcYB-xLsb6khv6nLGzi2GLdcQw
  - text: Day 3 recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EdTS_yjHG2dNpTU0K9LY7fABcbgcB16m2qjQC5m9PMEUJg
---

Machine learning underlies the vast majority of modern AI methods, including the ever-expanding applications of deep learning and generative AI. This workshop will give participants a hands-on introduction to the basic concepts and techniques needed to understand machine learning and to apply machine learning methods to scientific research.

Participants will learn how to train, evaluate, and use a variety of machine learning models for data analysis tasks. This session will also help participants critically evaluate the use and application of machine learning in science.

## Pre-workshop instructions 

To help minimize technical issues and delays at the start of the workshop, please try the following three tests prior to the workshop. 

* **Logging on to [Atlas Open OnDemand (OOD)](https://atlas-ood.hpc.msstate.edu/):** Please confirm you can successfully log in to Atlas OOD with your SCINet account [(see instructions here)]({{site.baseurl}}/guides/access/web-based-login). If you are successful, you will be able to see the Atlas OOD home page.
* **Atlas Shell Access:** When on Atlas OOD, click on the top navigation bar: “Clusters” > “Atlas Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@atlas-login-1 ~]$". 
* **JupyterLab Server:** Back on the main Atlas OOD tab, click on the top or side navigation bar: "Interactive Apps" > "JupyterLab Server".  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
    * Partition: atlas
    * Number of hours: 1
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: (leave empty)
  * Click the "Launch" button. 
  * Wait a moment for the job card to update from "Queued" to "Running". 
  * Please confirm that clicking on the "Connect to JupyterLab Server" button opens a new tab with the JupyterLab Server interface. 

-----

## Tutorial setup instructions

Steps to prepare for the tutorial each day of the workshop:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login). If it is the first day of the workshop, go to step 2. For the second or third day of the workshop, go to step 7.

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas's login node.

1. **Request resources on a compute node** by running the following command: 

    {:.copy-code}
    ```bash
srun --reservation=ml_workshop -A scinet_workshop1 -t 00:30:00 -n 1 --mem 8G --pty bash 
```
    {% include reservation-alert reservation="ml_workshop" project="scinet_workshop1" %}

1. **Create and/or update your workshop working directory** and copy the tutorial materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable. 

    {:.copy-code}
    ```bash
mkdir -p /90daydata/shared/$USER/intro_ml
cd /90daydata/shared/$USER/intro_ml
cp -r /project/scinet_workshop1/intro_ml/*.ipynb .
```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *intro_ml_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
source /project/scinet_workshop1/intro_ml/intro_ml_env/bin/activate
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
--reservation=ml_workshop --mem=32G
```
        {% include reservation-alert reservation="ml_workshop" %}
    * Working Directory: 
        
        {: .copy-code }
        ```
/90daydata/shared/${USER}/intro_ml
```
    
1. If this is the first day, then follow along with the notebook available in JupyterLab. If this is the second day, open up a terminal in JupyterLab and run the following command to retrieve the second notebook:

    {:.copy-code}
    ```bash
cd /90daydata/shared/${USER}/intro_ml
cp /project/scinet_workshop1/intro_ml/intro_ml-2.ipynb .
```
If this is the third day, open up a terminal in JupyterLab and run the following command to retrieve the third notebook:

    {:.copy-code}
    ```bash
cd /90daydata/shared/${USER}/intro_ml
cp /project/scinet_workshop1/intro_ml/intro_ml-3.ipynb .
```
