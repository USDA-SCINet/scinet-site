---

title: "Session 2: Spatial modeling with machine learning"

excerpt: An overview of machine learning methods for spatial modeling
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

subnav:
- title: Learning objectives
  url: '#learning-objectives'
- title: Agenda
  url: '#agenda'
- title: Tutorial instructions
  url: '#tutorial-instructions'

---

**Leads**: Heather Savoy (SCINet Computational Biologist), Brian Stucky (SCINet Computational Biologist)

<br>

This session will have a presentation on machine learning methods for spatial modeling use cases followed by a hands-on tutorial implementing those methods. This content is a continuation of the [Spatial Interpolation tutorial](https://web.microsoftstream.com/video/3a7e35a4-7355-418e-a85d-84a7edeece95) held at a working group meeting in May 2023. Although that previous tutorial was in R, this tutorial will be in Python. 

<br>

## Learning objectives
{:.border-bottom}

This session will include a presentation and tutorial exploring examples of spatial modeling tasks, e.g. spatial interpolation from point data to gridded data, with machine learning methods, e.g. random forest, ...

* obj 1....
* obj 2...

<br>

## Agenda
{:.border-bottom}

This session will be an interactive tutorial that covers:

* Using ML for spatial interpolation...
* ...

<br>

## Tutorial instructions
{:.border-bottom}

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on SCINet login procedures, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/login).

1. **Copy the Session 2 material from the workshop project space to your temporary workshop folder.** To get to a shell to do so, you can use the *Clusters* tab at the top of your Open OnDemand page to select 'Atlas Shell Access'. If you are comfortable ssh-ing in instead from, e.g., terminal or powershell, feel free to do so.

    To create your temporary workshop folder, run these commands after replacing *firstname.lastname* with your actual SCINet username:

    ```bash
    cd /90daydata/shared
    mkdir firstname.lastname
    cd firstname.lastname
    ```

    Copy the Session 2 folder:

    ```bash
    cp -r /project/geospatialworkshop/session_2-spatial_modeling_ml/ .
    ```

    Create symbolic links to this folder and the project folder from your home directory (after replacing *firstname.lastname* with your actual SCINet username):

    ```bash
    ln -s /90daydata/shared/firstname.lastname ~/my_geoworkshop
    ln -s /project/geospatialworkshop ~/proj_geoworkshop
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
    * Number of nodes: 1???
    * Number of tasks: 1???
    * Additional Slurm Parameters: --gres=gpu:a100_1g.10gb:1????  --reservation=workshop
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. **Start session and select kernel:** Once you are in JupyterLab, navigate to `my_geoworkshop/session_2-spatial_modeling_ml/` in the left navigation pane, and open the `spatial_modeling_ml.ipynb` notebook by double-clicking. Then, select your kernel by clicking on *Kernel > Change kernel...* within the top navigation menu of the Jupyter window. A pop-up will appear with a dropdown menu containing the `grwg_workshop` kernel we made above. Click on the `grwg_workshop` kernel and click the *Select* button.

1. Follow along during the tutorial session!

<br>
