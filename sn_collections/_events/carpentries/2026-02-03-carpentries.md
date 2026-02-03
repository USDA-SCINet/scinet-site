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

subnav:
  - title: Pre-Workshop Instructions
    url: '#pre-workshop-instructions'
  - title: The Unix Shell
    url: '#feb-3-the-unix-shell'
  - title: Introduction to Git 
    url: '#feb-5-introduction-to-git'
  - title: Plotting and Programming in Python
    url: '#feb-11-13-plotting-and-programming-in-python'
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

## Feb 3: The Unix Shell 
Steps to prepare for the tutorial session: 

* **Login to Ceres Open OnDemand.** For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](/guides/access/web-based-login). 
* **Open a command-line session** by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. This will open a new tab with a command-line session on Ceres’ login node. 
* **Request resources** on a compute node by running the following command. 
  ```
  srun --reservation=workshop -A scinet_workshop2 -t 05:00:00 -n 1 --mem 8G --pty bash 
  ``` 
  {:.copy-code}

* **Create a workshop working directory** by running the following commands.  
  Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  
  ```
  mkdir -p /90daydata/shared/$USER/carpentries_workshop 
  cd /90daydata/shared/$USER/carpentries_workshop  
  cp -r /90daydata/scinet_workshop2/shell-lesson . 
  ```
  {:.copy-code}


Link to Carpentries curriculum: [The Unix Shell](https://librarycarpentry.github.io/lc-shell/index.html) 

 

## Feb 5: Introduction to Git 
You will need a GitHub account for this training. You can create your account at https://github.com/ Click the Sign-up button.  

Please note that for official USDA work, you may not use a free GitHub account. Instead, you must use USDA’s GitHub Enterprise Cloud platform. Your unit can purchase GitHub Enterprise Cloud licenses through the SLIM system, which is also used for purchasing other centrally managed software.   If you are only using GitHub for this Carpentries course, you may use a free account.

Link to Carpentries curriculum: [Introduction to Git](https://librarycarpentry.github.io/lc-git/index.html) 

 

## Feb 11 & 13: Plotting and Programming in Python 
* **Login to Ceres Open OnDemand.** 
* **Open a command-line session** by clicking on “Clusters” -> “Ceres Shell Access” on the top menu.
* **Copy workshop datafiles** to your working directory: 
  ```
  cd /90daydata/shared/$USER/carpentries_workshop  
  cp -r /project/scinet_workshop2/carpentries_workshop_feb2026/python-lesson . 
  ```
  {:.copy-code}

* **Launch JupyterLab Server:** 
  * Back on the main Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “JupyterLab Server”.  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
      * Account: `scinet_workshop2` or replace with your project account name
      * Queue: ceres
      * QOS: 400 thread
      * Number of hours: 5
      * Number of cores: 1
      * Memory required: 16GB
      * Optional Slurm Arguments: --reservation=workshop
      * JupyterNotebook vs Lab: Lab
      * Working Directory: /90daydata/shared/$USER/carpentries_workshop
  * Click the “Launch” button.
  * Wait a moment for the job card to update from “Queued” to “Running”.
  * Please confirm that clicking on the “Connect to JupyterLab Server” button opens a new tab with the JupyterLab Server interface.  

Link to curriculum: [Plotting and Programming in Python](https://swcarpentry.github.io/python-novice-gapminder/) 