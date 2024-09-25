---
title: CLC Genomics Workbench
description: Using CLC Server
## author: VRSC
excerpt: "Before You Begin, email scinet_vrsc@USDA.GOV so that the admins can setup the import/export directories and permissions for access."

redirect_from: 
  - /guides/analysis/clc-workbench

categories: [Application]

subnav:
  - title: Before You Begin
    url: '#before-you-begin'
  - title: Access CLC Genomics Workbench via Open OnDemand
    url: '#access-clc-genomics-workbench-via-open-ondemand'
  - title: CLC Server Login
    url: '#clc-server-login'
  - title: CLC Grid
    url: '#clc-grid'
  - title: CLC discussion group on Scinet Forum
    url: '#clc-discussion-group-on-scinet-forum'
  - title: Current Licenses on Ceres
    url: '#current-licenses-on-ceres'  
---

{% include images_path %}




## Before You Begin

Email [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=CLC%20setup) so that the admins can setup the import/export directories and permissions for access.

We need the following information:
1.	Path to your project directory.
2.	Any additional users that are part of the said project. 

## Access CLC Genomics Workbench via Open OnDemand

Step 1: Access Open OnDemand:

* Open your web browser and navigate to the Open OnDemand login page provided by SCINet
* Link to Open OnDemand User Guide: https://scinet.usda.gov/guides/access/open-ondemand
* Log in using your SCINet credentials to access the Open OnDemand dashboard

Step 2: Launch CLC Genomics Workbench via Open OnDemand:

* Return to the Open OnDemand dashboard and click on the "Interactive Apps" section.
 ![OpenOnDemand1]({{ images_path }}/clc/clc-ood1.jpg)

* Look for the "CLC Genomics Workbench" app and click on it to launch the Workbench.

Step 3: Connecting to CLC Server:

* After launching CLC Genomics Workbench, you will see the main interface with various tools and functionalities.
  ![Connections]({{ images_path }}/clc/clc-ood2.jpg)

* To connect to CLC Server, go to "Connections" -> "CLC Server Connection."

  ![ConnectionsServer]({{ images_path }}/clc/clc-ood3.jpg)

* A dialog box will appear for server configuration. Depending on your network setup, choose the appropriate server configuration:
  ![CLCServerConnection]({{ images_path }}/clc/clc-ood4.jpg)

## CLC Server Login

1.	File -> Connections -> CLC Server Connection
2.	Server Name and Port
	
  * **If connecting via Ceres Open On Demand**
```
Server name: 10.1.9.210
Server port: 7777
```
  * **If connecting from elsewhere**
```
Server host: 199.245.99.12
Server port: 7777
```
3.	Username and Password(GA code not required) 

4.	Log in.

![screenshot of CLC Genomics Workbench 22.0.2 software homescreen]({{ images_path }}/clc/CLC2.png)

After successful login, you should see a directory CLC-\<your project> in the top left window.

## CLC Grid

![screenshot of CLC Genomics Workbench 22.0.2 Server Options]({{ images_path }}/clc/CLC3.png)

**Grid** can be used to run tasks on Ceres compute nodes, users also have the option to select the slurm queue. 

## CLC discussion group on Scinet Forum

Scinet Forum has a discussion group for CLC users at https://forum.scinet.usda.gov/c/special-topic-discussion/clc/14

## Current Licenses on Ceres

CLC Workbench - 3
CLC Grid - 4

If the license requests exceed the number of seats -  CLC Workbench will open in read-only mode - The CLC Grid waits for existing jobs to complete and then launches your job. 

   
