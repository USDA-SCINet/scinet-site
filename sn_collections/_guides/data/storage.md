---
title: SCINet Storage
description: Guide to storage options on SCINet HPC clusters
# author: Marina Kraeva
categories: [Data]

subnav:
  - title: Quotas
    url: '#quotas'
  - title: Home Directories
    url: '#home-directories'
  - title: Project Directories
    url: '#project-directories'
  - title: Large Short-term Storage
    url: '#large-short-term-storage'
  - title: Temporary Local Node Storage
    url: '#temporary-local-node-storage'
  - title: Juno Archive Storage
    url: '#juno-archive-storage'



---

{% include images_path %}






This document provides detailed information about the storage options provided by SCINet and how to use them.  For a simpler overview of suggested procedures for managing data on SCINet, please see [Managing Data on ARS HPC and Storage Infrastructure]({{ site.baseurl }}/guides/data/data-management).


There are multiple places to store data on the Ceres and Atlas clusters that all serve different purposes. 

<!--excerpt-->

## Quotas

Home directories, project directories in `/project` and on [Juno Archive Storage](#juno-archive-storage) have quotas. Home directories have 10GB quota. The default project directory quota in /project is set to 1TB. Note that quotas for project directories on Ceres and Atlas may differ.
To see the current usage and quotas for your home and project directories on Ceres, as well as on Juno, issue the `my_quotas` command on the Ceres login node. On Atlas, issue "`/apps/bin/reportFSUsage -p proj1,proj2,proj3`", substituting proj# with project name(s).

Quotas on Ceres are based off file group ownership/association. By default files in a home directory are associated with the user's
primary group that has the same name as the user name, while files in a project directory are associated with the project
group (proj-<project_name>). Sometimes when users move files from one directory to another or rsync files using "`-a`" or "`-g`" and "`-p`" 
options, files in the new location will retain group from the old location and setgid bit will not be set. (The setgid bit needs to be set so that new files and directories created in the directory in /project would be associated with the project group.) To avoid this, use "`cp`" and "`rm`" instead of "`mv`" 
to move data between home and project directories, and use "`-rltoD`" rsync options instead  of "`-a`" or explicitly specify "`--no-p --no-g`" options. 

The "`beegfs-ctl --getquota --gid $USER --cfgFile=/etc/beegfs/beegfs-client-project.conf`" command will report usage and quota for your primary group in `/project`. This quota is 
intentionally set to a small value. The non-zero usage indicates that there are files associated with the user's primary group
in /project . To set ownership of the files in a directory in /project to the project group and to set the setgid bit, the user can issue the following command:
```
find /project/<project_name>/<dir> -exec chgrp proj-<project_name> {} + -a -type d -exec chmod g+s {} + 
```

## Home Directories

Home directories are private, they are only accessible to the user and the system administrators. When a user logs 
into Ceres or Atlas, they are automatically logged into their home directory `/home/firstname.lastname`. 

Home directories have 10GB quotas and are intended to be mainly used for configuration and login files. Computations 
should be run from project directories in `/90daydata` or in `/project`. Software installs that require a lot of space, 
such as conda virtual environments, should be done in [`/project`](#project-directories).

## Project Directories

Project directories are usually associated with ARS Research Projects. While it's possible to run simulations on Ceres or Atlas using only home directories and [Large Short-term Storage](#large-short-term-storage) in `/90daydata/shared`, it is recommended to request a project directory. Having a project directory will allow to install software packages in /project and keep important data on [Juno Archive Storage](#juno-archive-storage).

Please Note: Only full-time ARS employees are able to submit these requests. Any requests sent by other individuals will be declined. ORISE and other term USDA employees are not authorized to have their own project allocations, but they can be added to projects requested by PIs or Project Managers.

To request a new project directory see [Request Project Storage]({{ site.baseurl }}/support/request#storage-request). Here is a direct link to the form (eAuthentication required) which includes submitting a Data Management Plan:

[Request a project directory](https://forms.office.com/g/wD9rYarVyn){: .usa-button }

To request a quota increase for an existing project see [Request Quota Increase](https://scinet.usda.gov/support/request#to-request-a-quota-increase-for-an-existing-scinet-project-allocation). Here is a direct link to the form (eAuthentication required). Please be aware that only a project manager or PI has the ability to request a quota increase for their projects. 

[Request Project Quota Increase](https://forms.office.com/g/ntnKBzJiKx){: .usa-button .usa-button-big }

Default quota for `/project/<project_name>` is set to 1TB. Historically, before [Juno Archive Storage](#juno-archive-storage) has been deployed, large space had routinely been allocated in /project, but going forward, additional space in /project will only be allocated on an as-needed basis. Most users should use /90daydata to run analysis, and the results should be copied to [Juno Archive Storage](#juno-archive-storage).


Many software applications are available on the clusters as [modules]({{ site.baseurl }}/guides/software/modules), however sometimes 
users need to install software by themselves. Since home directories have a small quota, it is recommended to install software, 
such as Python, Perl, R packages and conda virtual environments in `/project/<project_name>`. 
The [Conda Guide]({{ site.baseurl }}/guides/software/conda#example-2-installing-tensorflow-into-a-project-directory) provides instructions 
on how to install conda virtual environments in `/project`, while 
[Guide to Installing R, Python, and Perl Packages]({{ site.baseurl }}/guides/software/r-perl-python) has examples of
installing packages in a project directory.

Directories in /project are not automatically backed up. Data that cannot be easily reproduced should be manually copied to [Juno](#juno-archive-storage).

Project directories are usually shared between group members working on the same project. Each project directory has a manager (usually the PI on the ARS project who requested the project directory). Project manager can give and revoke access to the project directory to other SCINet users either in FreeIPA or via command line on Ceres or Atlas:

```
ipa group-add-member proj-<project_name> --users=<scinet_username>
ipa group-remove-member proj-<project_name> --users=<scinet_username>
```

Note: When ssh-ing to the cluster from a connected site, you may need to issue “kinit” command and enter your SCINet password before issuing ipa commands above.
 
After being added to the proj-<project_name> project group, users will be able to access `/project/<project_name>` and `/90daydata/<project_name>` both on Ceres and Atlas, as well as `/LTS/project/<project_name>` on Juno.
 
If you prefer using GUI, connect to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). Under the "Interactive Apps" tab, you will launch a Desktop. Once active, open a browser window and navigate to FreeIPA [https://aws-ipa-0.scinet.usda.gov/](https://aws-ipa-0.scinet.usda.gov/). Login using your SCINet user name and password. Then click on “Groups” and search for your project. After clicking on the project group (group-<project_name>), you will see the list of users in the group. To add new member(s) click on “+Add”, this will open a pop-up window where you can search for the user. After selecting user name click on “>”. Once the user name appears on the right side under “Prospective”, click on “Add” button in the bottom right corner of the pop-up window. To revoke user access, check-mark next to the user name and click on “Delete” button.


## Large Short-term Storage

Since project directories in `/project` have limited quotas, in most cases computations should be run from `/90daydata/<project_name>` which does 
not have quota. However, files with an access time (atime) older than 90 days will be automatically deleted. This is permanent and the files cannot 
be recovered. Just like `/project` there is no backup for this space. Data that cannot be easily reproduced should be manually copied to [Juno](#juno-archive-storage).

`/90daydata/shared` is open to all users on Ceres and Atlas. Anyone can create a directory in `/90daydata/shared` and put data which will be readable 
by everyone on the system unless file owner limits access using `chmod` command. Files older than 90 days will be automatically deleted.

Warning: If you download archived files, they may contain files with an access date from long ago. This date will still trigger deletion, 
so make sure that the files have a new access date. For example, when you untar a .tar or .tgz file, use the `-m` flag. If you use `rsync` to 
the space, do not use the `-a` flag, as that preserves date stamps.

## Temporary Local Node Storage

One can use the storage on the disk drive on each of the compute nodes by reading and writing to `$TMPDIR` (1.5TB on most compute nodes).  This is temporary storage that can 
be used only during the execution of your job. Only processes executing on a node have access to this space.  Multiple jobs running on the 
same node share this space, so an individual job may be able to use less than total available space. If all local space is needed for a job, 
request the whole node.

To use this local storage the following workflow should be used.  These steps may be taken interactively (when salloc'd to a compute node) 
or in batch-mode. In batch mode the copy commands below should be added to the job script.

1.	Copy calculation input to the local filesystem, e.g., 
```
cp /project/<project_name>/<input files> $TMPDIR
``` 
where `<project_name>` is the name of your project directory and `<input files>` contains the folders/files to be used by your job (to copy the 
whole folder use `-r` option).

2.	Run your code, getting input from files located in `$TMPDIR` and writing output to `$TMPDIR`

3.	Copy final results to storage location, e.g.:
```
cp $TMPDIR/<final results> /project/<project_name>/<final results>
```

Note that files in `$TMPDIR` will disappear at the conclusion of your job.  Any data which is not copied out of `$TMPDIR` cannot be recovered 
after your job has finished.

This storage is useful for workflows that extensively use disk space reading and writing multiple small files.


# Juno Archive Storage

Project directories are not meant to be used as a data archive. Data that cannot be easily reproduced should be manually backed up to Juno. Juno is a large, multi-petabyte ARS storage device at the National Agricultural Library in Maryland. For instructions on how to transfer data to and from Juno, see [Managing Data on ARS HPC and Storage Infrastructure]({{ site.baseurl }}/guides/data/data-management)
