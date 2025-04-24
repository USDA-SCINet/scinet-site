---
title: "Multispectral UAV Imagery Workshop"
type: workshop
display: basic
end_date: 2024-10-10 21:00
provider: Geospatial Working Group
hideprovider: true
description: Event - Processing multispectral UAV imagery and extracting zonal statistics for geospatial modeling using OpenDroneMap on SCINet systems.

tags: UAS
time: 1-5 PM ET
prerequisites:
  - text: Familiarity with the Python programming language
  - text: Experience with the command line will be very helpful for working through the exercises
  - text: Some basic knowledge about remote sensing (i.e., digital numbers vs reflectance, vegetation indices) and geospatial (i.e., zonal statistics) concepts will be beneficial.

registration: 
  url: https://forms.office.com/g/jQQN0iyHHT

---

This workshop will focus on processing multispectral imagery from unoccupied aerial vehicles (UAVs) and extracting zonal statistics for geospatial modeling using OpenDroneMap on SCINet systems. <!--excerpt--> Participants will be introduced to the different stages of processing multispectral imagery collected using UAVs, and the development of tools for the extraction of zonal statistics in a format that can be directly used in geospatial modeling will be shared. Topics covered in the workshop will include:

* Installation and set up of the miniconda environment
* Pre-processing: Tools to filter out redundant imagery by altitude and location
* Pre-processing: Conversion of multispectral imagery digital numbers to reflectance
* Processing: OpenDroneMap to generate multispectral orthophotos
* Tools to generate vegetation indices from multispectral imagery, volume estimates from digital surface models, and extraction of zonal statistics

**Prerequisites:** Workshop participants should have some familiarity with Python, using the command line, and basic knowledge about remote sensing and geospatial concepts. 

To register for the Multispectral UAV Imagery Workshop, [please fill out this form](https://forms.office.com/g/jQQN0iyHHT). 

**Leads:**  
  * Alexander Hernandez, Research Biologist (Computational), Forage and Range Research Unit
  * Efrain Duarte, SCINet/AI-COE Postdoctoral Fellow, Forage and Range Research Unit
  * Kaden Patten, Biological Science Technician, Forage and Range Research Unit

-----


## Pre-Workshop Instructions: 

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

## Tutorial Setup Instructions

Steps to prepare for the tutorial session each day:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Open a command-line session** by clicking on “Clusters” -> “Atlas Shell Access” on the top menu. This will open a new tab with a command-line session on Atlas's login node.

1. **Request resources on a compute node** to avoid using the login node for data transfers by running the following command. 

    {:.copy-code}
    ```bash
    srun --reservation=workshop2 -A scinet_workshop2 -t 00:30:00 -n 1 --mem 8G --pty bash
    ```  
      {% include reservation-alert reservation="workshop2" project="scinet_workshop2" %}

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable.

    {:.copy-code}
    ```bash
    mkdir -p /90daydata/shared/$USER/
    cd /90daydata/shared/$USER/
    cp -r /project/scinet_workshop2/multispectral_UAV/detect_GCPs .
    cp -r /project/scinet_workshop2/multispectral_UAV/flight_filtering .
    cp -r /project/scinet_workshop2/multispectral_UAV/Workshop3 .
    ```

1. **Setup kernel for JupyterLab.** In the workshop project space, there is a `geospatial_conda` conda environment for the packages we will be using during the workshop tutorials. You will create a kernel called *uav_workshop* to access from JupyterLab. 

    First load the necessary module:
    
    {:.copy-code}
    ```bash
    module load miniconda3
    ```

    If you have not used conda on Atlas before, you will first need to run these commands:

    {:.copy-code}
    ```bash
    conda init
    conda config --set auto_activate_base false
    source ~/.bashrc
    ```
    
    For everyone, you will create a new kernelspec from the conda environment with these commands:

    {:.copy-code}
    ```bash
    conda activate /project/scinet_workshop2/multispectral_UAV/geospatial_conda
    ipython kernel install --name "uav_workshop" --user
    ```

1. **Stop the interactive job** on the compute node by running the command `exit`.   

1. **Launch a JupyterLab Server session.** Under the *Interactive Apps* menu, select *JupyterLab Server*. Specify the following input values on the page:

    * Account: scinet_workshop2
    * Partition: atlas
    * QOS: normal 14-00:00:00
    * Number of hours: 4
    * Number of nodes: 1
    * Number of tasks: 16
    * Additional Slurm Parameters: \-\-mem\-per\-cpu=6G \-\-reservation=workshop2
    * Home Directory: /90daydata/shared/${USER}
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. For each notebook used in the tutorial, select the *uav_workshop* kernel.
