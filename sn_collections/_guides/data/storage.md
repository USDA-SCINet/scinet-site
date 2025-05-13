---
title: SCINet Storage
description: Guide to storage options on SCINet infrastructure
excerpt: There are multiple places to store data on the Ceres and Atlas clusters that all serve different purposes. 
# author: Marina Kraeva
categories: [Data]

subnav:
  - title: Storage Options
    subnav:
      - title: Home Directories
      - title: Project Directories
        url: '#project-directories'
      - title: Large Short-term Storage
        url: '#large-short-term-storage'
      - title: Temporary Local Node Storage
        url: '#temporary-local-node-storage'
      - title: Juno Permanent Storage
        url: '#juno-permanent-storage'
  - title: Quotas
    url: '#quotas'
  - title: Improving Storage Management



---

{% include images_path %}


This document provides detailed information about the storage options provided by SCINet and how to use them.

## Storage Options

There are multiple places to store data on the Ceres and Atlas clusters that all serve different purposes. 

### Home Directories  

Home directories are private directories that are only accessible to the user (and the system administrators when necessary). When a user logs into Ceres or Atlas, they automatically start in their home directory `/home/<scinet_username>`. 

Home directories have 30 GB quotas and are intended to be mainly used for configuration and login files. Computations should be run from project directories in `/project` and `/90daydata`. Software installs that require a lot of space, such as virtual environments, should be done in [`/project`](#project-directories).

### Project Directories  

Project directories are typically associated with ARS research projects. While it's possible to perform computational work on Ceres or Atlas using only home directories and [Large Short-term Storage](#large-short-term-storage) in `/90daydata/shared`, it is highly recommended to request a project directory. Having a project directory will allow you to install software packages in `/project` and keep important data on [Juno Permanent Storage](#juno-permanent-storage).

**Directories in `/project` are not automatically backed up. Data that cannot be easily reproduced should be copied to Juno.**



### Large Short-term Storage

`/90daydata/shared` is open to all users on Ceres and Atlas. Anyone can create a directory in `/90daydata/shared` and put data which will be readable 
by everyone on the system unless file owner limits access using `chmod` command. 

**Files older than 90 days will be automatically deleted.** This is permanent and the files cannot be recovered. Just like /project there is no backup for this space. Data that cannot be easily reproduced should be copied to [Juno](#juno-permanent-storage).  

{% include alert type="warning" title="Warning" text="If you download archived files, they may contain files with an access date from long ago. This date will still trigger deletion, so make sure that the files have a new access date. For example, when you untar a .tar or .tgz file, use the `-m` flag. If you use `rsync` to the space, do not use the `-a` flag, as that preserves date stamps." %}


### Temporary Local Node Storage

One can use the storage on the disk drive on each of the compute nodes by reading and writing to `$TMPDIR` (1.5TB on most compute nodes).  This is temporary storage that can be used only during the execution of your job. Only processes executing on a node have access to this space.  Multiple jobs running on the same node share this space, so an individual job may be able to use less than total available space. If all local space is needed for a job, request the whole node.

To use this local storage, the following workflow should be used.  These steps may be taken interactively (when using salloc or srun) or in batch-mode. In batch mode, the copy commands below should be added to the job script.

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

Note that files in `$TMPDIR` will disappear at the conclusion of your job.  Any data which is not copied out of `$TMPDIR` cannot be recovered after your job has finished.

This storage is useful for workflows that extensively use disk space reading and writing multiple small files.

### Juno Permanent Storage

Project directories are not meant to be used as a data archive. Data that cannot be easily reproduced should be manually backed up to Juno. Juno is a large, multi-petabyte ARS storage device at the National Agricultural Library in Maryland. For instructions on how to transfer data to and from Juno, see [our Data Transfer Guide](/guides/data/transfer)

## Improving Storage Management 

Many software applications are available on the clusters as [modules]({{ site.baseurl }}/guides/software/modules), however sometimes users need to install software by themselves. Since home directories have a small quota, it is recommended to install software, such as Python, Perl, R packages and conda virtual environments in `/project/<project_name>`. The [Conda Guide](/guides/software/conda#example-2-installing-tensorflow-into-a-project-directory) provides instructions 
on how to install conda virtual environments in `/project`, while [Guide to Installing R, Python, and Perl Packages](/guides/software/r-perl-python) has examples of
installing packages in a project directory.