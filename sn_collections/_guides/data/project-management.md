---
title: SCINet Project Management
description: Guide to managing quotas and membership for SCINet projects
excerpt: SCINet projects allow users to store their files in a project directory that has a requested storage quota and that is accessible to other SCINet users in the project. This guide describes how to manage a project's storage quotas and how to add or remove users from a project.
# author: Marina Kraeva
categories: [Storage]

subnav:
  - title: Storage quotas
    url: '#storage-quotas'
  - title: Manage project membership
    url: '#manage-project-membership'



---

{% include images_path %}

SCINet projects provide a structured way for ARS researchers to request storage space, work with collaborators, and submit computational jobs on SCINet infrastructure. Within a SCINet project, there is dedicated space to store and share files and software with other SCINet users who are members of the project. 

Project storage is determined by [storage "quotas"](#storage-quotas) that specify the maximum amount of storage space a project can use. You may request quotas that are as large as needed to support your work. Quotas can be different on each system; e.g., larger on Juno than Ceres or Atlas if you have more data to store long term than process at a given time. 

To read more about storage location options associated with SCINet projects, see the [Storage Locations guide](/guides/data/storage).

When you submit jobs to run on a SCINet cluster, you specify the relevant SCINet project for each job (see the [Slurm Resource Manager guide](/guides/use/slurm#slurm-accounts) for more details). By managing SCINet's storage and computational resources with these projects, we keep track of SCINet's use for and impact on ARS research, including ensuring fair access to storage and computational resources across ARS.

To request a new SCINet project or to increase an existing project's storage quota, see our [resource request page](/support/request#project-request).


## Storage quotas

Project directories in `/project` on Ceres and Atlas and `/LTS/project` on [Juno](/guides/data/storage#juno-permanent-storage) have quotas, i.e., storage limits.  Note that quotas for project directories on Ceres, Atlas, and Juno may differ depending on the storage allocations requested when submitting either the new project or storage quota increase [request forms](/support/request#project-request). 

To see the current usage and quotas for your project directories (as well as your home directory) on Ceres or Atlas, run the `my_quotas` command on either cluster. Juno project directory usage is included in the output of `my_quotas` on Ceres.  

**If the storage quota of a project directory is exceeded**, there will be a 14-day grace period to reduce storage below the project’s quota. During this grace period, you are able to still write to your project space as long as the project’s usage remains no more than 10% or 10 TB, whichever is less, over its quota. Once you exceed 14 days or meet the 10%/10 TB threshold, you will not be able to write to your project space. During the time a project’s quota is exceeded, every project member will receive a daily email notification of the current project storage usage and how many days remain to get under the storage quota. 

To reduce your project’s usage below its quota, files can be moved to Juno for long-term storage, unneeded files can be deleted, or a storage quota increase can be requested. Please see the [Storage Locations guide](/guides/data/storage) for advice on managing project storage among `/project`, `/90daydata`, and on Juno.

## Manage project membership

Project directories are shared among group members working on the same project. Each project directory has at least one manager (usually the PI of the SCINet project who initially requested the project directory). Project managers can give and revoke access to the project directory to other SCINet users by either:

* Emailing the VRSC at scinet_vrsc@usda.gov. Please include the project name and a list of SCINet users to add or remove from the project (include SCINet username and full name).
* Issuing FreeIPA commands on either Ceres or Atlas:  
```
ipa group-add-member proj-<project_name> --users=<scinet_username>  
ipa group-remove-member proj-<project_name> --users=<scinet_username>  
```
**Please Note**: If you try to run the commands above and get "ipa: ERROR: Ticket expired", run the `kinit` command, enter your SCINet password, and try again.

* Using the FreeIPA graphical user interface (GUI) via Open OnDemand:
  * Connect to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). 
  * Under the "Interactive Apps" tab, launch a Desktop session. 
  * Once active, open a browser window and navigate to the FreeIPA web interface at [https://aws-ipa-0.scinet.usda.gov/](https://aws-ipa-0.scinet.usda.gov/). 
  * Login using your SCINet username and password. 
  * Click on "Groups" and search for your project.
  * After clicking on the project group (group-), you will see the list of users in the group. To add a new member, click on "+Add". This will open a pop-up window where you can search for the user. 
  * After selecting the username, click on ">". 
  * Once the username appears on the right side under "Prospective", click on the "Add" button in the bottom right corner of the pop-up window. 
  * To revoke user access, select the username and click on the "Delete" button.  

After being added to the `proj-<project_name>` project group, users will be able to access `/project/<project_name>` and `/90daydata/<project_name>` on both Ceres and Atlas, as well as `/LTS/project/<project_name>` on Juno. **Please note:** it can take time for project membership to sync across systems. 

