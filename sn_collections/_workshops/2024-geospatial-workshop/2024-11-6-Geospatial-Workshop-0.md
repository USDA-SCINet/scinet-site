---
title: "Kickoff with lightning talks"
description: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
excerpt: "This session will have an introductory presentation about the working group and workshop goals plus lightning talks by ARS researchers and SCINet fellows about their research."
 
categories: [2024 Geospatial Workshop] 

sidenav_link: /training/resources

lead: Heather Savoy, Amy Hudson
time: 12:00 PM - 1:15 PM ET


---

This session will have an introductory presentation about the working group and workshop goals plus lightning talks by ARS researchers and SCINet fellows about their research. 

## Lightning talk presenters

* **Georgia Harrison**: *An Independent Accuracy Assessment of Satellite-Derived Rangeland Fractional Cover*
* **Efrain Duarte**: *Application of remote sensing tools for monitoring soil moisture in semi-arid ecosystems*
* **Mahesh Lal Maskey**: *A Tool to Extract Actual Evapotranspiration from the USGS MODIS Data Portal*
* **Amitava Chatterjee**: *Soil Health Classification Framework for Florida Soils using K-Means Clustering*
* **Andrea Albright**: *Irrigation pond water storage variability using in situ and UAS data*
* **Kossi Nouwakpo**: *A deep learning approach for irrigation methods mapping*

A recording of the session will be added after the workshop concludes. 


## Tutorial setup instructions

Steps to prepare for the tutorial sessions:

1. **Login to Ceres Open OnDemand** at [https://ceres-ood.scinet.usda.gov/](https://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Open a command-line session** by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. This will open a new tab with a command-line session on Ceres' login node.

1. **Request resources on a compute node** to avoid using the login node for data transfers by running the following command. 

    {:.copy-code}
    ```bash
    srun --reservation=workshop -A geospatialworkshop -t 00:30:00 -n 1 --mem 8G --pty bash
    ```
    {% include reservation-alert reservation="workshop" project="geospatialworkshop" %}

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable.

    {:.copy-code}
    ```bash
    mkdir -p /90daydata/shared/$USER/
    cd /90daydata/shared/$USER/
    cp -r /project/geospatialworkshop/2024/tutorial* .
    ```

1. **Create a symbolic link to the virtual environment.** In the workshop project space, there is a `grwg_2024_env` virtual environment for the Python packages we will be using during the workshop tutorials.You will create a symbolic link to that virtual environment from your workshop working directory. You will then have a shortcut called `my_grwg_2024_env` in your workshop working directory that points to the virtual environment so you can easily access the virtual environment from VS Code. 

    {:.copy-code}
    ```bash
    ln -s /project/geospatialworkshop/2024/grwg_2024_env/ /90daydata/shared/$USER/my_grwg_2024_env
    ```

1. **Setup the kernel for JupyterLab.** You will create a kernel called *grwg_2024_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it:

    {:.copy-code}
    ```bash
    source /project/geospatialworkshop/2024/grwg_2024_env/bin/activate
    ipython kernel install --name "grwg_2024_env" --user
    ```

1. **Stop the interactive job** on the compute node by running the command `exit`.  
