---
title: SCINet Ceres
description: Guide to Ceres
excerpt: Guide to Ceres

categories: [Resources]

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
  - title: Additional Guides
    url: '#additional-guides-for-ceres'
  - title: Logging In
    url: /guides/access/
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
  - title: SLURM Resource Manager
    url: /guides/use/slurm
    internal: true
  - title: Compiling Software
    url: /guides/software/
    shows_list: true
    internal: true
    categories: [Software]
  - title: Citation/Acknowledgment
    url: /guides/resources/citation
    internal: true

hardware-table:
  class: ""
  flex: true
  relabel: true
  caption: Detailed Hardware Specifications
  data:
    - Number of Nodes: 100
      Processors per Node: Two 18-core Intel Xeon 6240
      Logical Cores per Node: 72
      Memory per Node: 381 GB DDR3 ECC
      Local Storage: 1.5 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, INTEL, CASCADELAKE, CERES19
    - Number of Nodes: 76
      Processors per Node: Two 24-core Intel Xeon 6240R
      Logical Cores per Node: 96
      Memory per Node: 381 GB DDR3 ECC
      Local Storage: 1.5 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, INTEL, CASCADELAKE, CERES20
    - Number of Nodes: 20
      Processors per Node: One 128-core AMD Epyc 9754
      Logical Cores per Node: 256
      Memory per Node: 2,305 GB DDR5 ECC
      Local Storage: 2.9 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, AMD, EPYC9754, BERGAMO, CERES24  
    - Number of Nodes: 11
      Processors per Node: Two 24-core Intel Xeon 6248R
      Logical Cores per Node: 96
      Memory per Node: 1,546 GB DDR3 ECC
      Local Storage: 1.5 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, INTEL, CASCADELAKE, CERES20
    - Number of Nodes: 6  
      Processors per Node: Two 20-core Intel Xeon 6248
      Logical Cores per Node: 80
      Memory per Node: 1,546 GB DDR3 ECC
      Local Storage: 1.5 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, INTEL, CASCADELAKE, CERES19
    - Number of Nodes: 2  
      Processors per Node: Two 20-core Intel Xeon 6248
      Logical Cores per Node: 80
      Memory per Node: 772 GB DDR3 ECC
      Local Storage: 1.5 TB SSD
      Constraint Flags: AVX, AVX2, AVX512, INTEL, CASCADELAKE, CERES19

software-table:
    local: software-data
    class: ""
    caption: Software Environment
    announcement: "For more information on available software and software installs refer to our guides on [Modules](/guides/software/modules), [Singularity Containers](/guides/software/singularity) and [Installing R, Python, and Perl Packages](/guides/software/r-perl-python)."
    data:
      - Domain: Operating System  
        Software: Red Hat Enterprise Linux
      - Domain: Scheduler
        Software: SLURM
      - Domain: Software
        Software: "For the full list of installed scientific software refer to the <a href='/guides/software/preinstalled'>Preinstalled Software List</a> page or issue the  `module spider`  command on the Ceres login node."
      - Domain: Modeling  
        Software: "BeoPEST, EPIC, KINEROS2, MED-FOES, SWAT, h2o"
      - Domain: Compilers
        Software: "GNU (C, C++, Fortran), clang, llvm, Intel Parallel Studio"
      - Domain: Languages
        Software: Java 6, Java 7, Java 8, Python, Python 3, R, Perl 5, Julia, Node
      - Domain: Tools and Libraries
        Software: tmux, Eigen, Boost, GDAL, HDF5, NetCDF, TBB, Metis, PROJ4, OpenBLAS, jemalloc
      - Domain: MPI libraries
        Software: MPICH, OpenMPI
      - Domain: Profiling and debugging
        Software: PAPI

---

{% include images_path %}




## Onboarding Videos
Users who are new to the HPC environment may benefit from the following Ceres onboarding video which covers much of the material contained in this guide plus some Unix basics.

[Ceres Onboarding (Intro to SCINet Ceres HPC) (length 42:13)](https://www.youtube.com/watch?v=FspDMlHaJUY)

Note: /KEEP storage discussed in the video at 16:20 is no longer available. Instead data that cannot be easily reproduced should be manually backed up to [Juno]({{ site.baseurl }}/guides/data/storage/#juno-archive-storage). The instructional video at [https://www.youtube.com/watch?v=I3lnsCAfx3Q](https://www.youtube.com/watch?v=I3lnsCAfx3Q) demonstrates how to transfer files between local computer, Ceres, Atlas and Juno using Globus.

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

{% include table.html local='hardware-table' %}

For details on how to request a node with specific hardware, see the [SLURM Resource Manager]({{ site.baseurl }}/guides/use/slurm).

In addition there is a specialized data transfer node and several service nodes.

In aggregate, there are more than 10,500 compute cores (21,000 logical cores) with 138 terabytes (TB) of total RAM, 350 TB of total local storage, and 5.5 petabyte (PB) of shared storage.

Shared storage consists of 5.5 PB high-performance BeeGFS space and 300TB of backed-up ZFS space.


## System Configuration
Since most HPC compute nodes are dedicated to running HPC cluster jobs, direct access to the nodes is discouraged. The established HPC best practice is to provide login nodes. Users access a login node to submit jobs to the cluster’s resource manager (SLURM), and access other cluster console functions. All nodes run on Linux CentOS 7.8.

{% include table.html local='software-table' %}


## Additional Guides for Ceres:
