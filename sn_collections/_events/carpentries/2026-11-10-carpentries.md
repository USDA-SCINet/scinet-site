---
title: The Carpentries Unix, Git, and R Workshop
type: workshop
cal-titles: show
display: basic
no-caldate: true
end_date: 2026-12-02 
provider: [SCINet Office, ARS-certified Carpentries Instructors]
description: Event - Workshop for basic programming tools and concepts for the Unix command line, version control with Git, and R programming.

tags: [Unix,Git,R-Project]
sessions: 
  - session:
    title: Unix command line and version control with Git
    time: 1:00 PM - 5:00 PM ET
    multiday: "Nov 10 & 12"
  - session:
    title: Programming with R
    time: 1:00 PM - 5:00 PM ET
    multiday: "Nov 30 & Dec 2"
    registration:    
      url: https://forms.cloud.microsoft/g/J0S9Rf5NBW

registration: 
  url: https://forms.cloud.microsoft/g/J0S9Rf5NBW

subnav:
  - title: Pre-Workshop Instructions
    url: '#pre-workshop-instructions'
  - title: The Unix Shell
    url: '#november-10-2026-the-unix-shell'
  - title: Introduction to Git 
    url: '#november-12-2026-introduction-to-git'
 # - title: Programming in R
 #   url: '#programming-in-r'
---

The SCINet Office, in collaboration with ARS's certified Carpentries instructors, is offering a Carpentries workshop that will teach participants the Unix command line, version control with Git, and R programming.<!--excerpt--> The workshop will span two weeks:  
* November 10 & 12, 2026, 1 – 5 PM ET: Unix command line and version control with Git   
* November 30 & December 2, 2026, 1 – 5 PM ET: Programming with R  

This workshop will provide an interactive, hands-on experience that will help you learn valuable skills for data management and analysis.

Please note that you may register for either week 1, week 2, or both, depending on which skills you’d like to learn.

## Pre-Workshop Instructions: 
To help minimize technical issues and delays at the start of the workshop, please try the following three tests prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](https://ceres-ondemand.scinet.usda.gov/):**
  * Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see login instructions here)](/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.   
* **Ceres Shell Access:** 
  * When on Ceres OOD, click on the top navigation bar: "Clusters" > "Ceres Shell Access". A new tab will appear that looks like a shell terminal (e.g., like PowerShell). 
  * Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@ceres ~]$".  
* **RStudio Server:** 
  * Back on the main Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server".  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
      * Account: `scinet_workshop2` or replace with your project account name
      * Queue: ceres
      * QOS: ceres
      * R Version: 4.5.3
      * Number of hours: 1
      * Number of cores: 1
      * Memory required: 8GB
      * Optional Slurm Arguments: (leave empty)
      * Click the "Launch" button.
  * Wait a moment for the job card to update from "Queued" to "Running".
  * Please confirm that clicking on the "Connect to RStudio Server" button opens a new tab with the RStudio Server interface. 

## November 10, 2026: The Unix Shell 
Steps to prepare for the tutorial session: 

* **Login to Ceres Open OnDemand.** For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](/guides/access/web-based-login). 
* **Open a command-line session** by clicking on "Clusters" -> "Ceres Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres' login node. 
* **Request resources** on a compute node by running the following command. 
  ```
  srun --reservation=Nov10_workshop -A scinet_workshop2 -t 05:00:00 -n 1 --mem 8G --pty bash 
  ``` 
  {:.copy-code}

* **Create a workshop working directory** by running the following commands.  
  Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  
  ```
  mkdir -p /90daydata/shared/$USER/carpentries_workshop 
  cd /90daydata/shared/$USER/carpentries_workshop  
  cp -r /reference/workshops/carpentries_workshops/unix_shell/sc-shell-lesson/shell-lesson-data/ . 
  ```
  {:.copy-code}


Link to Carpentries curriculum: [The Unix Shell](https://swcarpentry.github.io/shell-novice/) 


## November 12, 2026: Introduction to Git 
You will need a GitHub account for this training. You can create your account at https://github.com/ Click the Sign-up button.  

Please note that for official USDA work, you may not use a free GitHub account. Instead, you must use USDA's GitHub Enterprise Cloud platform. Your unit can purchase GitHub Enterprise Cloud licenses through the SLIM system, which is also used for purchasing other centrally managed software.   If you are only using GitHub for this Carpentries course, you may use a free account.

Link to Carpentries curriculum: [Introduction to Git](https://swcarpentry.github.io/git-novice/) 

