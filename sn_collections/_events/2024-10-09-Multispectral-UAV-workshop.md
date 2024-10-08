---
title: "Multispectral UAV Imagery Workshop"
type: workshop
end_date: 2024-10-09 
provider: Geospatial Working Group
hideprovider: true
description: Event - Processing multispectral UAV imagery and extracting zonal statistics for geospatial modeling using OpenDroneMap on SCINet systems.

tags: UAS
sessions: 
  - session:
    time: 1-5 PM ET
    multiday: "October 9-10"
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
 