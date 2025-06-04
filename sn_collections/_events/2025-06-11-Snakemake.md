---
title: Automate your SCINet pipeline with Snakemake 
type: workshop
description: Event - Introduction to Snakemake for SCINet
cal-titles: show
display: basic

sessions: 
  - session:
    title: Introduction to Snakemake
    date: 2025-06-11
    time: 2-4 PM ET
  - session:
    title: Individual Snakemake assistance
    date: 2025-06-13
    time: 2-4 PM ET

prerequisites:
  - text: Have a SCINet account and be able to login 
    url: /about/signup
  - text: Familiarity with basic command-line tools and navigation on the cluster. 
  - text: Familiarity with the concepts of Slurm job submission and Conda environments. 


instructor: "Aaron Yerke - SCINet/AI-COE fellow"

registration: 
  text: "Register for the workshop"
  url: https://forms.office.com/g/75XdzcfEL1
---

[Snakemake](https://snakemake.readthedocs.io/en/stable/index.html) is a popular workflow management tool that can help organize, document, scale, run, and reproduce your workflows. Snakemake workflows are described via a human-readable, Python-based language, and can be integrated into SCINet high-performance computing (HPC) clusters via Slurm and Conda. 

In this workshop, Aaron Yerke (SCINet/AI-COE fellow) will introduce the basics of a Snakemake workflow and demonstrate how to run it on a SCINet cluster. After attending this workshop, you should be able to integrate Snakemake into your own projects on SCINet HPC clusters. 
<!--excerpt-->

## Pre-Workshop Instructions: 
To help minimize technical issues and delays at the start of the workshop, please try the following tests prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](http://ceres-ood.scinet.usda.gov/):** 
  * Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see login instructions here)](/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.   
* **Ceres Shell Access:** 
  * When on Ceres OOD, click on the top navigation bar: “Clusters” > “Ceres Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). 
  * Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like “[firstname.lastname@ceres ~]$”.
