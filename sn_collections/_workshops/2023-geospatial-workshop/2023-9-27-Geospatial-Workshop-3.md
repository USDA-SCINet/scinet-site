---

title: "Session 3: Geospatial deep learning with Raster Vision"
description: Geospatial deep learning with Raster Vision

excerpt: An introduction to deep learning computer vision tasks with geospatial data
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
      - text: Basic knowledge of geospatial data concepts
      - text: Basic knowledge of computer vision concepts
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

This session will introduce how to use the [Raster Vision](https://rastervision.io/) framework for deep learning computer vision tasks with geospatial data. Attendees will participate in hands-on tutorials to train semantic segmentation and object detection models on satellite or other aerial imagery and explore how to modify the code for their own use cases.

<br>

## Pre-workshop suggested material
{:.border-bottom}

This tutorial will be combining raster and vector geospatial datasets. If you would like to review the basics of raster and vector data, there is a recording of last year's workshop session Fundamentals of geospatial data. The ['General geospatial data concepts', 'Vector data', and 'Raster data'](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%202%20-%20Fundamentals%20of%20geospatial%20data-20220928_022343.mp4?csf=1&web=1&e=GFlJ2w&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D) sections of the session cover relevant concepts for this tutorial.

If you would like to have an overview of computer vision concepts covered in this tutorial, there is a recording of the introduction presentation from the SCINet AI Training Images Workshop in February 2023. The workshop was not specific to geospatial data, but the ['What is Computer Vision?' and 'What can we do with Computer Vision?'](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/2023%20AI%20Training%20Images%20Workshop%20-%20Introduction-20230321_045040.mp4?csf=1&web=1&e=ovAzz6&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D) sections of the presentation cover relevant concepts for this tutorial.

<br>

## Session objectives
{:.border-bottom}

The goals of this session are to:

* Introduce Raster Vision as a framework for implementing key computer vision tasks for satellite or aerial geospatial imagery
* Provide examples in Python on how to use Raster Vision to train a deep learning model for the following tasks for aerial images (or other geospatial raster data)
  * Semantic segmentation (pixel classification)
  * Object detection

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

1. **Copy the Session 3 material from the workshop project space to your temporary workshop folder.** 

    ```bash
    mkdir -p /90daydata/shared/$USER/session_3-dl_rastervision/
    cd /90daydata/shared/$USER/session_3-dl_rastervision/
    cp /project/geospatialworkshop/session_3-dl_rastervision/semantic_segmentation/semantic_segmentation.ipynb .
    cp /project/geospatialworkshop/session_3-dl_rastervision/object_detection/object_detection.ipynb .
    ```
    
    **If you DID NOT participate in Session 2, please also follow these steps:**
    
    Create a symbolic link to your temporary workshop folder from your home directory. You will then have a shortcut called `my_geoworkshop` in your home directory that points to your workshop folder. This shortcut will allow you to access your workshop files from JupyterLab:

    ```bash
    ln -s /90daydata/shared/$USER ~/my_geoworkshop
    ```

    **If you participated in Session 2, you do not need to do anything else except for follow along during the tutorial session!** If you did *not* participate in Session 2, you will need to complete the additional steps below.

1. **Setup kernel for JupyterLab.** In the workshop project space, there is a `workshop_venv` virtual environment for the packages we will be using during the workshop tutorials. You will create a kernel called *grwg_workshop* to access from JupyterLab.

    To create a new kernelspec from the virtual environment:

    ```bash
    source /project/geospatialworkshop/workshop_venv/bin/activate
    ipython kernel install --name "grwg_workshop" --user
    cp /project/geospatialworkshop/grwg_workshop.json ~/.local/share/jupyter/kernels/grwg_workshop/kernel.json
    ```

1. **Restart JupyterLab.** You will need to restart JupyterLab in order to use the new kernel you created for step 5, above. Follow these steps:

    1. Close the JupyterLab tab in your browser.
    1. Return to the Open OnDemand tab in your browser, and click the *Delete* button that is inside the card for the running "Jupyter-A100" session. (If you do not see the running session cards in Open OnDemand, click the interactive sessions icon next to "Interactive Apps" at the top of the page.) Wait a few seconds for the page to refresh.
    1. Repeat the instructions for step 2, above, to start a new JupyterLab session. Open OnDemand should automatically reuse the settings you entered the first time you launched JupyterLab.

1. **Start session and select kernel:** Once you are in JupyterLab, navigate to `~/my_geoworkshop/session_3-dl_rastervision/semantic_segmentation` in the left navigation pane, and open the `semantic_segmentation.ipynb` notebook by double-clicking that file. Then, select your kernel by opening the "Kernel" menu then "Change kernel...". A pop-up will appear with a dropdown menu containing the `grwg_workshop` kernel we made above. Click on the `grwg_workshop` kernel and click the *Select* button.

1. **Follow along during the tutorial session!**


<br>
