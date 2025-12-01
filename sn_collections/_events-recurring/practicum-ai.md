---
title: Practicum AI
description: Practicum AI is a hands-on applied artificial intelligence (AI) curriculum intended for learners with limited coding and math background.
categories: [Practicum AI]
permalink: /events/practicum-ai/

registration:
    text: Practicum AI Registration
    url: https://forms.office.com/g/LRgw4gGWKq

time: 2-5 PM ET

course-list:
  - title: Computing for AI
  - title: Python for AI
  - title: Deep Learning Foundations
  - title: Transfer Learning


---

Developed and presented by the University of Florida and customized for USDA-ARS with funding from ARS’s AI Center of Excellence, *Practicum AI* is a hands-on applied artificial intelligence (AI) curriculum intended for learners with limited coding and math background. Using hands-on exercises and graphically based, conceptual content, the program starts from introductory content and builds your AI knowledge, enabling you to design and conduct AI work. **Starting this fall, the University of Florida Research Computing team will be offering a series of courses to help ARS researchers begin using AI.** 

To register for these courses, please [fill out the registration form]({{ page.registration.url }}). You do not need to register for all courses and may instead register for only the courses that are most relevant to your work. You will need a SCINet account for all but our "Getting Started with AI" course. If you do not have a SCINet account, you may [request one](/about/signup).

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
