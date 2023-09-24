---

title: "Session 3: Geospatial deep learning with Raster Vision"

excerpt: An introduction to deep learning computer vision tasks with geospatial data
categories: [2023 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial
layout: page

sessions:
  - session: 
    time: 1:30pm-4:30pm EDT

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic Python or other scripting language experience
      - text: Basic Unix experience can also be helpful

subnav:
  - title: Pre-workshop suggested material
    url: '#pre-workshop-suggested-material'
  - title: Session objectives
    url: '#session-objectives'
  - title: Agenda
    url: '#agenda'
  - title: Tutorial instructions
    url: '#tutorial-instructions'


---

**Leads**: Noa Mills (SCINet Fellow), Brian Stucky (SCINet Computational Biologist)

<br>

This session will introduce how to use the [Raster Vision](https://rastervision.io/) framework for deep learning computer vision tasks with geospatial data. Attendees will participate in a hands-on tutorial to train semantic segmentation and object detection models on satellite imagery and explore how to modify the code for their own use cases.

<br>

## Pre-workshop suggested material
{:.border-bottom}

This tutorial will be combining raster and vector geospatial datasets. If you would like to review the basics of raster and vector data, there is a recording of last year's workshop session Fundamentals of geospatial data. The ['General geospatial data concepts', 'Vector data', and 'Raster data'](https://web.microsoftstream.com/video/125dba00-b307-4675-8575-c3fe0771d914?st=130) sections of the session cover relevant concepts for this tutorial.

If you would like to have an overview of computer vision concepts covered in this tutorial, there is a recording of the introduction presentation from the SCINet AI Training Images Workshop in February 2023. The workshop was not specific to geospatial data, but the ['What is Computer Vision?' and 'What can we do with Computer Vision?'](https://web.microsoftstream.com/video/1c0939d3-b90c-4ca1-a54e-025604f70366?st=175) sections of the presentation cover relevant concepts for this tutorial.

<br>

## Session objectives
{:.border-bottom}

The goals of this session are to:

* Introduce key concepts about computer vision and what Raster Vision does
* Provide examples in Python on how to train a deep learning model to perform the following tasks for aerial images (or other geospatial raster data)
  * classify pixels
  * detect objects

<br>

## Agenda
{:.border-bottom}

This session will have a short presentation followed by two interactive tutorials:

* Presentation: Introduction to computer vision concepts and Raster Vision
* Python tutorials: example code for using Raster Vision for:
  * Semantic segmentation
  * Object detection

<br>

## Tutorial instructions
{:.border-bottom}

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on SCINet login procedures, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/login).

1. **Copy the Session 3 material from the workshop project space to your temporary workshop folder.** To get to a shell to do so, you can use the *Clusters* tab at the top of your Open OnDemand page to select 'Atlas Shell Access'. If you are comfortable ssh-ing in instead from, e.g., terminal or powershell, feel free to do so. 

    **If you participated in Session 2 already, you only need to make a copy of the Session 3 folder in your workshop folder then proceed to Step 4:**

    ```bash
    cd /90daydata/shared/firstname.lastname
    cp -r /project/geospatialworkshop/session_3-dl_rastervision/ .
    ```
    
    **If you DID NOT participate in Session 2, please follow these steps:**
    
    To create your temporary workshop folder, run these commands after replacing *firstname.lastname* with your actual SCINet username:

    ```bash
    cd /90daydata/shared
    mkdir firstname.lastname
    cd firstname.lastname
    ```

    Create a symbolic link to your new folder from your home directory (replace *firstname.lastname* with your actual SCINet username). You will then have a shortcut called `my_geoworkshop` in your home directory that points to your workshop folder. This is done so you can access your workshop files from JupyterLab:

    ```bash
    ln -s /90daydata/shared/firstname.lastname ~/my_geoworkshop
    ```

    Make a copy of the Session 3 folder in your new workshop folder:

    ```bash
    cp -r /project/geospatialworkshop/session_3-dl_rastervision/ .
    ```

1. **Setup kernel for JupyterLab.** In the workshop project space, there is a `workshop_venv` virtual environment for the packages we will be using during the workshop tutorials. You will create a kernel called *grwg_workshop* to access from JupyterLab.

    To create a new kernelspec from the virtual environment:

    ```bash
    # Move to A100 node first????
    source /project/geospatialworkshop/workshop_venv/bin/activate
    ipython kernel install --name "grwg_workshop" --user
    cp /project/geospatialworkshop/grwg_workshop.json ~/.local/shared/jupyter/kernels/grwg_workshop/kernel.json
    ```

1. **Launch a Jupyter-A100 session.** Under the *Interactive Apps* menu, select *Jupyter-A100*. Specify the following input values on the page:

    * Python Version: 3.10.8 
    * Lab or Notebook: JupyterLab
    * Account Name: geospatialworkshop
    * Partition Name: gpu-a100
    * QOS: ood -- Max Time: 8-00:00:00
    * Number of hours: 4
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: --gres=gpu:a100_1g.10gb:1 --mem=32G --reservation=workshop
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. **Start session and select kernel:** Once you are in JupyterLab, navigate to `~/my_geoworkshop/session_3-dl_rastervision/semantic_segmentation_tutorial/model_base` in the left navigation pane, and open the `RV_Semantic_Segmentation_Tutorial.ipynb` notebook by double-clicking that file. Then, select your kernel by clicking on *Kernel > Change kernel...* within the top navigation menu of the Jupyter window. A pop-up will appear with a dropdown menu containing the `grwg_workshop` kernel we made above. Click on the `grwg_workshop` kernel and click the *Select* button.

1. **Follow along during the tutorial session!**

<br>
