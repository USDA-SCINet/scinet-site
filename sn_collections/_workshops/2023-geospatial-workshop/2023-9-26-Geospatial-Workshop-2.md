---

title: "Session 2: Spatial modeling with machine learning"
description: Spatial modeling with machine learning

excerpt: An overview of machine learning methods for spatial modeling
categories: [2023 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 1:30pm-4:30pm EDT

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic Python or other scripting language experience

subnav:
- title: Session objectives
  url: '#session-objectives'
- title: Agenda
  url: '#agenda'
- title: Tutorial instructions
  url: '#tutorial-instructions'

---

**Leads**: Heather Savoy (SCINet Computational Biologist), Brian Stucky (SCINet Computational Biologist)

<br>

This session will have a presentation on machine learning methods for spatial modeling use cases followed by a hands-on tutorial implementing some of those methods. This content is a continuation of the [Spatial Interpolation tutorial](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group_%20Spatial%20Interpolation-20230804_061319.mp4?csf=1&web=1&e=NGbUQY&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D) held at a working group meeting in May 2023. Although that previous tutorial was in R, this tutorial will be in Python. 

<br>

## Session objectives
{:.border-bottom}

This session will explore examples of spatial modeling tasks, e.g. spatial interpolation from point data to gridded data, with the machine learning methods Random Forest. The content of the session will primarily focus on the spatial component, e.g., how to include spatial proximity as a predictor, although basic machine learning concepts will be discussed as relevant. 

The goals of this session are to:

* Introduce key concepts about incorporating spatial data in machine learning with examples from recent literature
* Provide examples in Python on how to:
  * read in spatial (vector and raster) datasets and reformat them to use in machine learning functions
  * compare the performance of machine learning approaches for spatial prediction
  * visualize observed spatial data and the prediction results

<br>

## Agenda
{:.border-bottom}

This session will have a short presentation followed by an interactive tutorial:

* Presentation: Introduction to machine learning methods applied to spatial data with examples from recent literature
* Python tutorial: example code for the following spatial modeling tasks with two approaches to including spatial proximity in machine learning models:
  * Spatial interpolation from point observations
  * Spatial prediction from point observations and gridded covariates

<br>

## Tutorial instructions
{:.border-bottom}

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on SCINet login procedures, see the [SCINet access user guide](https://scinet.usda.gov/guides/access).

1. **Launch a Jupyter-A100 session.** Under the *Interactive Apps* menu, select *Jupyter-A100*. Specify the following input values on the page:

    * Python Version: 3.10.8 
    * Lab or Notebook: JupyterLab
    * Account Name: geospatialworkshop
    * Partition Name: gpu-a100
    * QOS: ood -- Max Time: 8-00:00:00
    * Number of hours: 4
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: \-\-gres=gpu:a100_1g.10gb:1 \-\-mem=32G \-\-reservation=workshop
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. **Open a terminal session within JupyterLab.** Within JupyterLab, open the "File" menu, then "New" -> "Terminal".

1. **Setup kernel for JupyterLab.** In the workshop project space, there is a `workshop_venv` virtual environment for the packages we will be using during the workshop tutorials. You will create a kernel called *grwg_workshop* to access from JupyterLab.

    To create a new kernelspec from the virtual environment:

    ```bash
    source /project/geospatialworkshop/workshop_venv/bin/activate
    ipython kernel install --name "grwg_workshop" --user
    cp /project/geospatialworkshop/grwg_workshop.json ~/.local/share/jupyter/kernels/grwg_workshop/kernel.json
    ```

1. **Copy the Session 2 material from the workshop project space to a temporary workshop folder.** To create your temporary workshop folder, run these commands after replacing *firstname.lastname* with your actual SCINet username:

    ```bash
    cd /90daydata/shared
    mkdir firstname.lastname
    cd firstname.lastname
    ```

    Create a symbolic link to your new folder from your home directory (replace *firstname.lastname* with your actual SCINet username). You will then have a shortcut called `my_geoworkshop` in your home directory that points to your workshop folder. This shortcut will allow you to access your workshop files from JupyterLab:

    ```bash
    ln -s /90daydata/shared/firstname.lastname ~/my_geoworkshop
    ```

    Make a copy of the Session 2 folder in your new workshop folder:

    ```bash
    cp -r /project/geospatialworkshop/session_2-spatial_modeling_ml/ .
    ```

1. **Restart JupyterLab.** You will need to restart JupyterLab in order to use the new kernel you created for step 4, above. Follow these steps:

    1. Close the JupyterLab tab in your browser.
    1. Return to the Open OnDemand tab in your browser, and click the *Delete* button that is inside the card for the running "Jupyter-A100" session. (If you do not see the running session cards in Open OnDemand, click the interactive sessions icon next to "Interactive Apps" at the top of the page.) Wait a few seconds for the page to refresh.
    1. Repeat the instructions for step 2, above, to start a new JupyterLab session. Open OnDemand should automatically reuse the settings you entered the first time you launched JupyterLab.

1. **Start session and select kernel:** Once you are in JupyterLab, navigate to `~/my_geoworkshop/session_2-spatial_modeling_ml/` in the left navigation pane, and open the `spatial_modeling_ml.ipynb` notebook by double-clicking that file. Then, select your kernel by clicking on *Kernel > Change kernel...* within the top navigation menu of the Jupyter window. A pop-up will appear with a dropdown menu containing the `grwg_workshop` kernel we made above. Click on the `grwg_workshop` kernel and click the *Select* button.

1. **Follow along during the tutorial session!**

<br>
