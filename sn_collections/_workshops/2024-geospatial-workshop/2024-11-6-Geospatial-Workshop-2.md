---
title: "Tutorial: Geospatial code development using VS Code and Python"
description: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
excerpt: "This tutorial will illustrate how to use Visual Studio (VS) Code, a flexible development environment available on SCINet's Ceres cluster, to develop Python scripts. By the end of the tutorial, participants will know how to access VS Code in Open OnDemand and use it to navigate files on Ceres, access Python packages, and develop and execute Python scripts."
 
categories: [2024 Geospatial Workshop] 

sidenav_link: /training/resources

time: 2:45 PM - 3:45 PM ET
lead: Andrea Albright
prerequisites:
  - text: Have a SCINet account and be able to login 
    url: /about/signup
  - text: Experience with scripting languages, e.g., Python. 
---

This tutorial will illustrate how to use Visual Studio (VS) Code, a flexible development environment available on SCINet's Ceres cluster, to develop Python scripts. By the end of the tutorial, participants will know how to access VS Code in Open OnDemand and use it to navigate files on Ceres, access Python packages, and develop and execute Python scripts. 

Additional details and instructions for the tutorial will be added closer to the event. A recording of the tutorial will be added after the workshop concludes. 


## Tutorial setup instructions

Steps to prepare for the tutorial sessions:

1. **Login to Ceres Open OnDemand** at [https://ceres-ood.scinet.usda.gov/](https://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Launch a VS Code session.** Under the *Interactive Apps* menu, select *VS Code*. Specify the following input values on the page:

    * Account: geospatialworkshop
    * Queue: short---------Max Time: 2-00:00:00
    * QOS: 400thread
    * Number of cores: 2
    * Memory required: 16 GB
    * Number of hours: 2
    * Optional Slurm Arguments: \-\-reservation=workshop
    * Working Directory: /90daydata/shared/${USER}
    * Codeserver Version: 4.17
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to VS Code* button will appear. Click *Connect to VS Code*.

