---
title: Software Package/Environment Management Workshop
type: workshop
date: 2024-10-03
end_date: 2024-10-04
description: Event - Workshop for managing software packages and computing environments
excerpt: "In this workshop, we will cover best practices for managing software packages and computing environments on SCINet’s supercomputers. This will be a hands-on workshop that will provide you with the practical knowledge and skills you need to spend less time worrying about package management and more time focusing on your research!"
categories: [2024 10 SPEMW] 
tags: Software Package-Management
layout_type: workshop
provider: SCINet

cal-titles: show

sessions: 
  - session:
    time: 1:00 PM - 4:30 PM ET
    multiday: "October 3-4"

registration: 
  url: https://forms.office.com/g/ZbWf2Qtyi7


---

On October 3-4, 2024, the SCINet Office will be leading a 2-day workshop on Software Package/Environment Management.

In this workshop, we will cover best practices for managing software packages and computing environments on SCINet’s supercomputers. This will be a hands-on workshop that will provide you with the practical knowledge and skills you need to spend less time worrying about package management and more time focusing on your research!

Here is a daily breakdown of the topics:

*  **Day 1, October 3, 1:00 PM - 4:30 PM ET: Introduction, Python & conda**  
*  **Day 2, October 4, 1:00 PM - 4:00 PM ET: R**

[To register for the Software Package and Environment Management Workshop, please fill out this form.](https://forms.office.com/g/ZbWf2Qtyi7)

-----


## Pre-Workshop Instructions: 

To help minimize technical issues and delays at the start of the workshop, please try the following four tests prior to the workshop. 

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
* **RStudio Server:** Back on the main Atlas OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server". Repeat the same steps as for JupyterLab Server to confirm you can launch an RStudio Server session. 

-----

## Tutorial Setup Instructions

Steps to prepare for the tutorial session each day:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Open a command-line session** by clicking on “Clusters” -> “Atlas Shell Access” on the top menu. This will open a new tab with a command-line session on Atlas' login node.

1. **Request resources on a compute node** by running the following command. 

    {:.copy-code}
    ```bash
    srun --reservation=workshop -A scinet_workshop1 -t 05:00:00 -n 1 --mem 8G --pty bash
    ```
    {% include reservation-alert reservation="workshop" project="scinet_workshop1" %}

1. **Create a workshop working directory** by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable.

    {:.copy-code}
    ```bash
    mkdir -p /90daydata/shared/$USER/
    cd /90daydata/shared/$USER/
    ```
