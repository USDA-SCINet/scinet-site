---

title: "Session 4: An introduction to GPU-based computing"
description: An introduction to GPU-based computing

excerpt: What are GPUs, how they differ from CPUs, and what kinds of computing tasks can benefit from GPUs
categories: [2023 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 11:00am-2:00pm EDT

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic Python or other scripting language experience


---

**Leads**: Brian Stucky (SCINet Computational Biologist), Heather Savoy (SCINet Computational Biologist)

<br>

This session will introduce key concepts of GPU-based computing, including how they differ from CPUs and what kinds of computing tasks can benefit from GPUs. There will also be a hands-on tutorial showing how to use the GPUs on the Atlas cluster and how to evaluate the effect of using GPUs on your computation time. A primary goal of this session is to help participants build intuition about when GPUs might be useful in scientific computing and how to use them.

<br>

## Session objectives
{:.border-bottom}

The goals of this session are to:

* Understand the key differences between CPUs and GPUs.
* Build intuition about when GPUs can be helpful in scientific computing.
* Provide a practical introduction to using GPUs for scientific computing with Python.

<br>

## Agenda
{:.border-bottom}

This session will begin with a short presentation followed by an interactive tutorial.

* Presentation: An introduction to GPU-based computing
* Python tutorial:
  * GPU-based computing with CuPy
    * Creating and working with GPU-based multidimensional arrays
    * Accelerated computing with 1D CuPy arrays (vectors)
    * Accelerated computing with 2D CuPy arrays (matrices)
  * GPU-based computing with RAPIDS
    * GPU-based dataframes with RAPIDS
    * GPU-based machine learning with RAPIDS

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

1. **Copy the Session 4 material from the workshop project space to your temporary workshop folder.** 

    ```bash
    mkdir -p /90daydata/shared/$USER/session_4-gpu_computing/
    cd /90daydata/shared/$USER/session_4-gpu_computing/
    cp /project/geospatialworkshop/session_4-gpu_computing/gpu_computing_python.ipynb .
    ```
    
    **If you DID NOT participate in Session 2 or 3, please also follow these steps:**
    
    Create a symbolic link to your temporary workshop folder from your home directory. You will then have a shortcut called `my_geoworkshop` in your home directory that points to your workshop folder. This shortcut will allow you to access your workshop files from JupyterLab:

    ```bash
    ln -s /90daydata/shared/$USER ~/my_geoworkshop
    ```

    **If you participated in Session 2 or 3, you do not need to do anything else except for follow along during the tutorial session!** If you did *not* participate in Session 2 or 3, you will need to complete the additional steps below.

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

1. **Start session and select kernel:** Once you are in JupyterLab, navigate to `~/my_geoworkshop/session_4-gpu_computing` in the left navigation pane, and open the `gpu_computing_python.ipynb` notebook by double-clicking that file. Then, select your kernel by opening the "Kernel" menu then "Change kernel...". A pop-up will appear with a dropdown menu containing the `grwg_workshop` kernel we made above. Click on the `grwg_workshop` kernel and click the *Select* button.

1. **Follow along during the tutorial session!**


