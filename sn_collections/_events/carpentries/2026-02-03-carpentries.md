---
title: The Carpentries Unix, Git, and Python Workshop
type: workshop
cal-titles: show
display: basic
no-caldate: true
end_date: 2026-02-13 
provider: [SCINet Office, ARS-certified Carpentries Instructors]
description: Event - Workshop for basic programming tools and concepts for the Unix command line, version control with Git, and Python programming.

tags: [Unix,Git,R-Project]
sessions: 
  - session:
    title: Unix command line and version control with Git
    time: 1:00 PM - 5:00 PM ET
    multiday: "Feb 3 & 5"
  - session:
    title: Programming with Python
    time: 1:00 PM - 5:00 PM ET
    multiday: "Feb 11 & 13"
    registration:    
      text: Join the waitlist
      url: https://forms.office.com/g/viLFLk2sch

registration: 
  text: Join the waitlist
  url: https://forms.office.com/g/viLFLk2sch
---

The SCINet Office, in collaboration with ARS’s certified Carpentries instructors, is offering a Carpentries workshop that will teach participants the Unix command line, version control with Git, and Python programming.<!--excerpt--> The workshop will span two weeks:
* Unix command line and version control with Git: February 3 & 5, 2026, 1 – 5 PM ET
* Programming with Python February 11 & 13, 2026, 1 – 5 PM ET

This workshop will provide an interactive, hands-on experience that will help you learn valuable skills for data management and analysis.  

Please note that you may register for either week 1, week 2, or both, depending on which skills you’d like to learn.

**At this time, registration is closed as we have reached maximum capacity for all workshops. However, you may [complete the registration form](https://forms.office.com/g/viLFLk2sch) to be added to our waitlist for future offerings.** 



## Pre-Workshop Instructions: 
To help minimize technical issues and delays at the start of the workshop, please try the following three tests prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](http://ceres-ood.scinet.usda.gov/):** 
  * Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see login instructions here)](/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.   
* **Ceres Shell Access:** 
  * When on Ceres OOD, click on the top navigation bar: “Clusters” > “Ceres Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). 
  * Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like “[firstname.lastname@ceres ~]$”.  
* **JupyterLab Server:** 
  * Back on the main Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “JupyterLab Server”.  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
      * Account: `scinet_workshop2` or replace with your project account name
      * Queue: ceres
      * QOS: 400 thread
      * Number of hours: 1
      * Number of cores: 1
      * Optional Slurm Arguments: (leave empty)
      * Memory required: 8GB
      * JupyterNotebook vs Lab: Lab
      * Working Directory: $HOME
  * Click the “Launch” button.
  * Wait a moment for the job card to update from “Queued” to “Running”.
  * Please confirm that clicking on the “Connect to JupyterLab Server” button opens a new tab with the JupyterLab Server interface. 