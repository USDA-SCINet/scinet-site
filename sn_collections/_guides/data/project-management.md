---
title: SCINet Project Management
description: Guide to managing quotas and permissions for SCINet projects
excerpt: There are multiple places to store data on the Ceres and Atlas clusters that all serve different purposes. 
# author: Marina Kraeva
categories: [Storage]

subnav:
  - title: Request a Project Directory
    url: '#request-a-project-directory'
  - title: Project Management
    url: '#project-management'
  - title: Quotas
    url: '#quotas'
  - title: Improving Storage Management



---

{% include images_path %}


## Request a Project Directory 

To request a new project directory or quota increase, see our [Request Resources page](/support/request), or select one of the following forms (eAuthentication required):  
* [Request a project directory](https://forms.office.com/g/wD9rYarVyn)  
* [Request Project Quota Increase](https://forms.office.com/g/ntnKBzJiKx) 


{% include alert title="Please Note" type="warning" text="Only full-time ARS employees are able to submit these requests. Any requests sent by other individuals will be declined. ORISE participants and term ARS employees are not authorized to have their own project allocations, but they can be added to projects requested by project PIs or managers." %}

## Project Management

Project directories are shared between group members working on the same project. Each project directory has at least one manager (usually the PI on the ARS project who requested the project directory). Project managers can give and revoke access to the project directory to other SCINet users either in FreeIPA or via command line on Ceres or Atlas:  

```
ipa group-add-member proj-<project_name> --users=<scinet_username>  

ipa group-remove-member proj-<project_name> --users=<scinet_username>  
```

{% include alert text='When ssh-ing to the cluster from a connected site, you may need to issue "kinit" command and enter your SCINet password before issuing ipa commands above.' %}

After being added to the proj- project group, users will be able to access `/project/` and `/90daydata/` both on Ceres and Atlas, as well as `/LTS/project/` on Juno.  

If you prefer using a GUI, connect to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). Under the "Interactive Apps" tab, you will launch a Desktop. Once active, open a browser window and navigate to FreeIPA [https://aws-ipa-0.scinet.usda.gov/](https://aws-ipa-0.scinet.usda.gov/). Login using your SCINet user name and password. Then click on "Groups" and search for your project. After clicking on the project group (group-), you will see the list of users in the group. To add new member(s) click on "+Add", this will open a pop-up window where you can search for the user. After selecting the user name, click on ">". Once the user name appears on the right side under "Prospective", click on "Add" button in the bottom right corner of the pop-up window. To revoke user access, check-mark next to the user name and click on "Delete" button.  


## Quotas

Home directories, project directories in `/project` and on [Juno Archive Storage](#juno-archive-storage) have quotas. Home directories have 30GB quota. The default project directory quota in /project is set to 1TB. Note that quotas for project directories on Ceres and Atlas may differ.  

To see the current usage and quotas for your home and project directories on Ceres, as well as on Juno, issue the `my_quotas` command on the Ceres login node. On Atlas, issue "`/apps/bin/reportFSUsage -p proj1,proj2,proj3`", substituting proj# with project name(s).

Quotas on Ceres are based off file group ownership/association. By default, files in a home directory are associated with the user’s primary group that has the same name as the user name, while files in a project directory are associated with the project group (proj-). Sometimes when users move files from one directory to another or rsync files using "`-a`" or "`-g`" and "`-p`" options, files in the new location will retain group from the old location and setgid bit will not be set. (The setgid bit needs to be set so that new files and directories created in the directory in /project would be associated with the project group.) To avoid this, use "`cp`" and "`rm`" instead of "`mv`" to move data between home and project directories, and use "`-rltoD`" rsync options instead of "`-a`" or explicitly specify "`--no-p --no-g`" options.  
