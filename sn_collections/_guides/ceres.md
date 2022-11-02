---
title: SCINet Ceres
description: Guide to Ceres
excerpt: Guide to Ceres

categories: [HPC Resources]

guidegroup:
    section: subnav

layout: guides

subnav:
  - title: Onboarding Videos
    url: '#onboarding-videos'
  - title: Technical Overview
    url: '#technical-overview'
  - title: System Configuration
    url: '#system-configuration'
    subnav: 
    - title: Software Environment
      url: '#software-environment'
  - title: Additional Guides
    url: '#additional-guides-to-ceres'
  - title: Logging In
    url: /guides/access/login
    internal: true
  - title: Data Transfer
    url: /guides/data/datatransfer
    internal: true
  - title: Modules
    url: /guides/software/modules
    internal: true
  - title: Quotas
    url: /guides/data/quotas
    internal: true
  - title: Running Application Jobs on Compute Nodes
    url: /guides/use/running-jobs
    internal: true
  - title: Compiling Software
    url: /guides/software
    shows_list: true
    internal: true
    categories: [Software]
  - title: Citation/Acknowledgment
    url: /guides/resources/citation
    internal: true


---

## Onboarding Videos
Users who are new to the HPC environment may benefit from the following Ceres onboarding video which covers much of the material contained in this guide plus some Unix basics.

[Ceres Onboarding (Intro to SCINet Ceres HPC) (length 42:13)](https://www.youtube.com/watch?v=FspDMlHaJUY)

Note: /KEEP storage discussed in the video at 16:20 is no longer available. Instead data that cannot be easily reproduced should be manually backed up to [Juno](https://scinet.usda.gov/guide/storage/#juno-archive-storage). The instructional video at [https://www.youtube.com/watch?v=I3lnsCAfx3Q](https://www.youtube.com/watch?v=I3lnsCAfx3Q) demonstrates how to transfer files between local computer, Ceres, Atlas and Juno using Globus.

The video includes:
- logging on to Ceres
- changing your password
- home and project directories
- data transfer to/from SCINet clusters
- basic SLURM job scheduler commands
- computing in interactive mode with salloc
- accessing Ceres software modules
- computing in batch mode with a batch script


## Technical Overview

Ceres is the dedicated high performance computing (HPC) infrastructure for ARS researchers on ARS SCINet. Ceres is designed to enable large-scale computing and large-scale storage. Currently, the following compute nodes are available on the Ceres cluster.

120 regular compute nodes, each having:

* 72 logical cores on 2 x 18 core Intel Xeon Processors (6140 2.30GHz 25MB Cache or 6240 2.60GHz 25MB Cache) with hyper-threading turned ON
* 384GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand

76 regular compute nodes, each having:

* 96 logical cores on 2 x 24 core Intel Xeon Processors (6240R 2.40GHz 36MB Cache) with hyper-threading turned ON
* 384GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand

4 large memory nodes, each having:

* 80 logical cores on 2 x 20 core Intel Xeon Processors (6148 2.40GHz 27.5MB Cache or 6248 2.50GHz 27.5MB Cache) with hyper-threading turned ON
* 768GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand


11 large memory nodes, each having:

* 80 logical cores on 2 x 20 core Intel Xeon Processors (6148 2.40GHz 27.5MB Cache or 6248 2.50GHz 27.5MB Cache) with hyper-threading turned ON
* 1,536GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand


11 large memory nodes, each having:

* 96 logical cores on 2 x 24 core Intel Xeon Processors (6248R 3GHz 27.5MB Cache or 6248 2.50GHz 27.5MB Cache) with hyper-threading turned ON
* 1,536GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand


1 GPU node that has:

* 72 logical cores on 2 x 18 core Intel Xeon Processors (6140 2.30GHz 25MB Cache) with hyper-threading turned ON
* 2 Tesla V100
* 384GB DDR3 ECC Memory
* 250GB Intel DC S3500 Series 2.5” SATA 6.0Gb/s SSDs (used to host the OS and provide small local scratch storage)
* 1.5TB SSD used for temporary local storage
* Mellanox ConnectX®­3 VPI FDR InfiniBand


In addition there are a specialized data transfer node and several service nodes.

In aggregate, there are more than 9000 compute cores (18000 logical cores) with 110 terabytes (TB) of total RAM, 500TB of total local storage, and 3.7 petabyte (PB) of shared storage.

Shared storage consists of 2.3PB high-performance Lustre space, 1.4PB high-performance BeeGFS space and 300TB of backed-up ZFS space.


## System Configuration
Since most HPC compute nodes are dedicated to running HPC cluster jobs, direct access to the nodes is discouraged. The established HPC best practice is to provide login nodes. Users access a login node to submit jobs to the cluster’s resource manager (SLURM), and access other cluster console functions. All nodes run on Linux CentOS 7.8.

### Software Environment

Domain | Software
--- | ---
Operating System	| CentOS
Scheduler	| SLURM
Software | For the full list of installed scientific software refer to the [Software Overview]({{ site.baseurl }}/guide/software) page or issue the  `module spider`  command on the Ceres login node.  
Modeling	| BeoPEST, EPIC, KINEROS2, MED-FOES, SWAT, h2o
Compilers | GNU (C, C++, Fortran), clang, llvm, Intel Parallel Studio
Languages | Java 6, Java 7, Java 8, Python, Python 3, R, Perl 5, Julia, Node
Tools and Libraries | tmux, Eigen, Boost, GDAL, HDF5, NetCDF, TBB, Metis, PROJ4, OpenBLAS, jemalloc
MPI libraries | MPICH, OpenMPI
Profiling and debugging | PAPI

For more information on available software and software installs refer to our guides on [Modules]({{ site.baseurl }}/guides/software/modules), [Singularity Containers]({{ site.baseurl }}/guides/software/singularity) and [Installing R, Python, and Perl Packages]({{ site.baseurl }}/guides/analysis/r-perl-python).


## Additional Guides for Ceres: