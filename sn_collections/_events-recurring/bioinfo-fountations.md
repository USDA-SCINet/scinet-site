---
title: Bioinformatics Foundations
description: Foundations of Bioinformatics Workshop Series hosted by SCINet
categories: [Bioinfo Foundations]
permalink: /events/bioinfo-foundations/

time: 1-5 PM ET
registration:
    url: https://forms.office.com/g/T2teMegYSW
course-list:
  - title: Introduction to Modern Bioinformatics
  - title: Genome Assembly
  - title: Introduction to RNA-seq Analysis
  - title: Genome Annotation
  - title: "From reads to variants: GATK & Deepvariant"
  - title: RNAseq and Variant calling pipelines in Galaxy
  - title: Automating Bioinformatics Pipelines with Nextflow
  - title: Automating Bioinformatics Pipelines with Snakemake
  
---

The workshops in this series are designed to provide a thorough introduction to modern bioinformatics concepts, best practices, and practical skills. If that is of interest, we recommend registering for all workshops in this series. However, registration for all workshops is not required, and you may register for only the workshops that are most relevant to your work. <!--excerpt-->

You will need a SCINet account to actively participate in this workshop. [If you do not have a SCINet account, you may request one](https://scinet.usda.gov/about/signup).

## Pre-Workshop Instructions: 
To help minimize technical issues and delays at the start of the workshop, please try the following tests prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](http://ceres-ood.scinet.usda.gov/):** 
  * Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see login instructions here)](/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.   
* **Ceres Shell Access:** 
  * When on Ceres OOD, click on the top navigation bar: “Clusters” > “Ceres Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). 
  * Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like “[firstname.lastname@ceres ~]$”.  
* **RStudio Server:** 
  * Back on the main Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “RStudio Server”.  
  * Fill the input fields with the following:  
      * Account: scinet_workshop2
      * Queue: ceres
      * QOS: 400thread
      * R Version: 4.4.1
      * Number of hours: 1
      * Number of cores: 1
      * Memory required: 8GB
      * Optional Slurm Arguments: (leave empty)
  * Click the “Launch” button.
  * Wait a moment for the job card to update from “Queued” to “Running”.
  * Please confirm that clicking on the “Connect to RStudio Server” button opens a new tab with the RStudio Server interface. 

<br>
