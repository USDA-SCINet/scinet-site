---
title: 2024 Annual GRWG Workshop
type: workshop
date: 2024-11-06
end_date: 2024-11-07
description: Event - Annual Workshop for the SCINet Geospatial Research Working Group
excerpt: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
categories: [2024 Geospatial Workshop] 
tags: Geospatial

layout_type: workshop
cal-titles: show
post_type: calendar

provider: Geospatial Working Group
sessions: 
  - session:
    time: 12:00 PM - 4:00 PM ET
    multiday: "November 6-7"

registration: 
  url: https://forms.office.com/g/XqvSkCMeM2


---

On November 6-7, 2024, the SCINet Geospatial Research Working Group (GRWG) will be hosting their 2024 Annual Workshop. The workshop is split over two half-days that will have sessions including:

* Lightning talks on geospatial analyses and workflows that use SCINet resources
* Hands-on tutorials that cover a variety of topics:
  * Applying computational methods such as environmental niche modeling and graph convolutional neural networks
  * Using Python packages for multidimensional arrays to process geospatial data
  * Migrating your workflow to SCINet
* Discussions on GRWG activities for the new year, including desired training topics and collaboration opportunities.


## Workshop Goals

The two overarching goals of the GRWG Annual Workshop are to:

1. Provide hands-on tutorials on workflows to access the SCINet high-performance computing (HPC) systems and conduct geospatial research at scale.
1. Foster research efforts that had previously been unattainable due to computational limitations or technical bottlenecks. 

## Organizing Committee
{:.border-bottom}

The organizing committee for the 2024 Annual Workshop comprises:

* Andrea Albright, SCINet Postdoctoral Fellow
* Amira Burns, SCINet Fellow
* Amy Hudson, Research Ecologist and working group co-lead
* Erika Peirce, Remote Sensing Specialist
* Lavida Rogers, SCINet Training Coordinator
* Heather Savoy, SCINet Computational Biologist and working group co-lead
* Brian Stucky, SCINet Computational Biologist and acting CSIO
* Melanie Veron, SCINet Fellow


## How to Participate
{:.border-bottom}

To participate in the workshop, please register by submitting [the registration form](https://forms.office.com/g/XqvSkCMeM2). A calendar event with the Zoom call-in information will be sent after you register. 

The form asks for your SCINet account since full participation in hands-on activites will require an account. **If you do not have a SCINet account already, [please apply for one]({{ site.baseurl }}/about/signup).** We recommend applying for an account as soon as possible, as the process can take time for final approval. All registrants will be invited to a pre-workshop support session the week before the workshop to test logging into their SCINet account. 

-----


### Pre-Workshop Instructions: 

To help minimize technical issues and delays at the start of the workshop, please try the following four tests prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](https://ceres-ood.scinet.usda.gov/):** Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see instructions here)]({{site.baseurl}}/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.
* **Ceres Shell Access:** When on Ceres OOD, click on the top navigation bar: “Clusters” > “Ceres Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@ceres ~]$". 
* **RStudio Server:** Back on the main Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server".  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
    * Queue: short
    * Number of hours: 1
    * Number of cores: 2
    * Memory required: 6G
    * Optional Slurm Arguments: (leave empty)
  * Click the "Launch" button. 
  * Wait a moment for the job card to update from "Queued" to "Running". 
  * Please confirm that clicking on the "Connect to RStudio Server" button opens a new tab with the RStudio Server interface. 
* **JupyterLab Server:** Back on the main Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "Jupyter".  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
     * Queue: short
    * Number of hours: 1
    * Number of cores: 2
    * Memory required: 6G
    * Optional Slurm Arguments: (leave empty)
    * Jupyter Notebook vs Lab: Lab
    * Working Directory: $HOME
  * Click the "Launch" button. 
  * Wait a moment for the job card to update from "Queued" to "Running". 
  * Please confirm that clicking on the "Connect to Jupyter" button opens a new tab with the JupyterLab Server interface. 

## Workshop Sessions