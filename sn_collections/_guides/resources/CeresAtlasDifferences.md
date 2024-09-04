---
title: Differences between Ceres and Atlas
description: A guide to the differences between the Ceres cluster and the Atlas cluster
### author: Marina Kraeva

categories: [Resources]

subnav:
  - title: Quotas
    url: '#quotas'
  - title: Software
    url: '#software'
    subnav:
      - title: Using Containers
        url: '#using-containers'
      - title: Seeing All Environment Modules
        url: '#seeing-all-environment-modules'
      - title: Conda
        url: '#conda'
  - title: Submitting a Job
    url: '#submitting-a-job'
    subnav:
      - title: Slurm account
        url: '#slurm-account'
      - title: Partitions
        url: '#partitions'
      - title: Nodes
        url: '#nodes'


---

{% include images_path %}




This guide lists differences between the Atlas and Ceres clusters to ease transition from one cluster to another.

<!--excerpt-->

## Quotas

All project directories exist on both clusters, however they may have different quotas. Data in the project (and home) directories is not automatically synced between the clusters. The default project directory quota on Atlas is 1TB. 

On Ceres usage and quota information for home and project directories that user belongs to is displayed at login (to speed-up logins, the usage data is calculated once a day). To get the current usage information, users can issue the "`my_quotas`" command. On Atlas "`quota -s`" command reports usage and quota for the home directory and "`/apps/bin/reportFSUsage -p proj1,proj2,proj3`" provides that information for specific projects.

## Software

Not all software installed on Ceres is available on Atlas. However software packages provided as Apptainer/Singularity container image files in the [Ceres Container Repository]({{ site.baseurl }}/guides/software/singularity#ceres-container-repository) are synced to Atlas daily.

### Using Containers

On both clusters some modules are installed as apptainer/singularity containers. On Ceres, all modules, including container based, are displayed in the output of the "module avail" command. On Atlas one needs to load an apptainer module ("`module load apptainer`" or "`module load apptainer/<version>`") to make the "apptainer" command accessible and to see container based modules:

```
module load apptainer
module avail
```

Furthermore, on Atlas one needs to explicitly issue singularity command to use a container based software:
```
apptainer exec <container image>
```

On Ceres, loading a container-based module will also load an apptainer module, and one does not need to type the "`apptainer exec ...`" command since it's already built in the module. One can use "`module help <module_name>`" command to get information on how to use the software package provided by the module.


### Seeing All Environment Modules

Similar to containers, some modules on Atlas are not reported by the "`module avail`" command and can not be loaded without loading an appropriate gcc module: 

```
module load gcc/10.2.0
module avail
module load canu/2.2
```

To see all available modules on Atlas, one can use "`module spider`" command instead of the "`module avail`" command. This command will also work on Ceres, but it's not necessary to use it.

```
Atlas-login-1[7] marina.kraeva$ module spider canu

--------------------------------------------------------------------------------------------------------------------
  canu:
--------------------------------------------------------------------------------------------------------------------
     Versions:
        canu/2.1.beta
        canu/2.1
        canu/2.2

--------------------------------------------------------------------------------------------------------------------
  For detailed information about a specific "canu" package (including how to load the modules) use the module's full name.
  Note that names that have a trailing (E) are extensions provided by other modules.
  For example:

     $ module spider canu/2.2
--------------------------------------------------------------------------------------------------------------------
```

### Conda

To build a Conda environment on Ceres, one can load miniconda module ("`module load miniconda`"). On Atlas one needs first to install miniconda in their home directory:

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

Since home directories on both clusters have 10GB quota, it's recommended to move the installed miniconda to a project directory and create a symbolic link to the new location in the home directory:

```
mv ~/miniconda3 /project/project_folder/software/.
ln -s /project/project_folder/software/miniconda3 ~/.
```

## Submitting a Job

Job scripts from one cluster may not work on the other cluster. See below what needs to be changed in the script to make it work. This also applies to the salloc/srun commands.

### Slurm account

To run jobs on compute nodes of either cluster, the jobs need to be associated with a slurm account. For users that have access to one or more project directories, their slurm accounts have same names as the project directories. The slurm account for users without project directories is called sandbox. On Ceres cluster all users have a default slurm account, and thus when submitting a job, they don't need to specify a slurm account for the job unless they want to associate the job with a non-default slurm account (this concerns only users with multiple slurm accounts; see the [SCINet Ceres User Manual "Slurm Accounts" section]({{ site.baseurl }}/guides/use/slurm) for how to list and change the default Slurm account). On Atlas one needs to specify a slurm account when submitting a job. To specify slurm account, either use "`-A <slurm_account_name>`" on the slurm command (srun, salloc, sbatch) or add the following line to your job script:
```
#SBATCH -A <slurm_account_name>
```

### Partitions

One does not have to specify a partition when submitting a job to a default partition on either Ceres or Atlas. However scripts that have a partition specified will need to be updated when used on a different cluster. To see the list of available partitions on a cluster, either issue "`sinfo`" command or consult the appropriate user guide: [Ceres]({{ site.baseurl }}/guides/use/partitions-queues) or [Atlas](https://www.hpc.msstate.edu/computing/atlas).

### Nodes

Two clusters have different node types, that have different numbers of compute cores and amounts of memory. For most jobs the scripts already specify resources that are available on either cluster, so no changes need to be made. However if a job relies on the default amount of memory being large, it may fail on the other cluster that has smaller defaults. Some jobs may have high number of cores specified. On Ceres hyper-threading is turned on, meaning that each physical core on a node appears as two separate processors to the operating system and can run two threads. Because of that setting all nodes have at least 72 cores available. On Atlas, nodes have 48 cores. Thus if a script specifies more than 48 cores per node, it won't be accepted on Atlas.

### salloc

On Ceres issuing "`salloc`" command will allocate resources for an interactive job and log you into the node assigned to the job. On Atlas the "`salloc -A <slurm_account_name>`" command will only allocate resources, but one will still need to use srun command to utilize resources assigned to the job. To login to the node, issue "`srun --pty --preserve-env bash`". Note that exiting from that session will not kill the job, and to release resources assigned to the job, you will need to issue "`scancel <job_number>`" command. Note that salloc command is not needed, and one can only use the "`srun -A <slurm_account_name> --pty --preserve-env bash`" command to use a node interactively. 

