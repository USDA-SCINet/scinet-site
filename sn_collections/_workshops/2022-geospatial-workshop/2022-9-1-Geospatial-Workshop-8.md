---

title: "Session 8: Geospatial analyses and how to parallelize them in python"
description: Geospatial analyses and how to parallelize them in python

excerpt: Python packages for geospatial analyses and parallel processing with multiple tutorials 
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial, python


sessions:
  - session: 
    time: 10:00am-12:00pm MDT
    materials: 
      - text: You must have a USDA account to access this workshop's recordings.
      - text: Session recording
        url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%208%20-%20Geospatial%20Analyses%20in%20Parallel%20-%20Python-20230419_051352.mp4?csf=1&web=1&e=R1Gmkm&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D
      - text: Written tutortials
        url: https://geospatial.101workbook.org/ExampleGeoWorkflows/GRWGWorkshop

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic python or other basic programming skill helpful (expertise not required)
      - text: JupyterLab on Ceres via Open OnDemand will be used, so attending Session 4 may be helpful

alerts: 
  - alert: 
    type: info
    slim: true
    text: This session overlaps with Session 6 which covers the same content but in R instead of python.

subnav:
  - title: Learning objectives
    url: '#learning-objectives'
  - title: Agenda
    url: '#agenda'
  - title: Tutorial material
    url: '#tutorial-material'

summarybox:
  header: Session Rules
  list:
    - point: <b>Green Light, Red Light</b> - Use the Zoom participant feedback indicators to show us if you are following along successfully as well as when you need help. To access participant feed back, click on the “Participants” icon to open the participants pane/window. Click the green “yes” to indicate that you are following along successfully, click the red “no” to indicate when you need help. Ideally, you will have either the red or green indicator displayed for yourself throughout the entire tutorial. We will pause every so often to work through solutions for participants displaying a red light.
    - point: <b>Chat questions/comments take first priority</b> - Chat your question/comments either to everyone (preferred) or to the chat moderator (Ryan Lucas) privately to have your question/comment read out loud anonymously. We will answer chat questions first and call on people who have written in the chat before we take questions from raised hands.
    - point: <b>Share your video when speaking</b> - If your internet plan/connectivity allows, please share your video when speaking.
    - point: <b>Keep yourself on mute</b> - Please mute yourself when not speaking.

---

<br>

## Learning objectives
<br>
{:.border-bottom}

This session will include tutorials exploring examples of handling geospatial data, performing geospatial calculations, and applying parallel processing approaches to geospatial processing workflows in python. JupyterLab via Open OnDemand (see [Session 4]({{ site.baseurl }}/workshops/2022-8-30-Geospatial-Workshop-4)) will be used for a portion of the tutorials. 

* Read in and manipulate raster data with the *rioxarray* package
* Read in and manipulate vector data with the *geopandas* package
* Time chunks of code in your python script
* Identify package functions with parallelization options built-in
* Parallelize python code of many independent geospatial tasks 

## Agenda
<br>
{:.border-bottom}

This session will be an interactive tutorial:

* Geospatial packages
* Parallel processing packages
* Vector tutorial 
* Raster tutorial 
* Vector-raster tutorial


<br>
## Tutorial material
<br>
{:.border-bottom}

[Watch a recording of this tutorial](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%208%20-%20Geospatial%20Analyses%20in%20Parallel%20-%20Python-20230419_051352.mp4?csf=1&web=1&e=R1Gmkm&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

Written versions of these tutorials, modified to be accessible to any SCINet user,
are available on the [Geospatial Workbook](https://geospatial.101workbook.org/ExampleGeoWorkflows/GRWGWorkshop)

The workshop-specific instructions are kept below.

Steps to prepare for the tutorial:

1. **Login to Ceres Open OnDemand** at [https://ceres-ood.scinet.usda.gov](https://ceres-ood.scinet.usda.gov). Your username is typically *firstname.lastname*. For the password, enter your SCINet account password followed by the 6-digit verification code, e.g. from a Google Authenticator app on your phone, with no spaces. Do not add a '+' between your password and code. 

2. **Copy the Session 6-8 material from the workshop project space to your temporary workshop folder.** The contents of this session have been added to the Session 6 folder since they share the same data. To get to a shell to do the copying, you can use the *Clusters* tab at the top of your Open OnDemand page to select 'Ceres Shell Access' (if prompted for a password, enter your SCINet account password without the verification code). If you are comfortable ssh-ing in instead from terminal or powershell, feel free to do so.

    If you have already made your workshop folder in previous sessions, you will only need to run the following commands, replacing *firstname.lastname* with your actual name: 

    ```bash
    cd /90daydata/shared/firstname.lastname
    cp -r /project/geospatialworkshop/session6/ .
    module load miniconda
    source activate /project/geospatialworkshop/gwenv
    ipython kernel install --user --name=grwg_workshop
    ```

    If you have not created your workshop folder yet, run these commands instead, replacing *firstname.lastname* with your actual name:

    ```bash
    cd /90daydata/shared
    mkdir firstname.lastname
    cd firstname.lastname
    cp -r /project/geospatialworkshop/session6/ .
    module load miniconda
    source activate /project/geospatialworkshop/gwenv
    ipython kernel install --user --name=grwg_workshop
    ```

3. **Launch a JupyterLab session.** Choose the following values from the menu:

    * Account: geospatialworkshop
    * Slurm Partition: workshop
    * Number of hours: 3
    * Number of cores: 16
    * Jupyter Notebook vs Lab: Lab
    * Working Directory: /90daydata/shared/firstname.lastname
  
    Click *Launch*.

4. **The tutorials:** Two tutorials will follow python notebooks in JupyterLab. For the third tutorial, we will submit a job to SLURM directly. If your shell from Step 2 has expired when we start this tutorial, please reconnect, and change directory to your session 6 folder:

    ```bash
    cd /90daydata/shared/firstname.lastname/session6
    ```

<br>
