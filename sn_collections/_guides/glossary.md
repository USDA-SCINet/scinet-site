---
title: SCINet Nomenclature
description: A quick overview of some of the software, hardware, and confusing nomenclature
categories: [Access]
order_number: 50
subnav:
  - title: SCINet vs. Ceres vs. Atlas
    url: '#scinet-vs-ceres-vs-atlas'
  - title: Open OnDemand
    url: '#open-ondemand'
  - title: SLURM
    url: '#slurm'
  - title: Scientific Coding Languages - Python and R
    url: '#scientific-coding-languages---python-and-r'


---

The software discussed and shown in these user guides is largely open source, can run on a desktop, HPC, or cloud environment, and can be installed with software management systems that support reproducibility (such as Conda, Singularity, and Docker). Below is a quick overview of some of the software, hardware, and confusing nomenclature that is used throughout this site.<!--excerpt-->

## SCINet vs. Ceres vs. Atlas

SCINet is the USDA ARS Scientific Computing INitiative that aims to improve access to high performance and cloud computing, improve networking to facilitate high speed data transfer, and facilitate scientific computational training. The [Virtual Research Support Core (VRSC)]({{ site.baseurl }}/about/vrsc) 

Ceres is one of the HPC systems (located in Iowa) connected to the SCINet infrastucture. The system is largely maintained by staff at Iowa State University. 

Atlas is the more recently added HPC system 

For more information on the HPC systems that SCINet offers, see the [Computer Systems page.]({{ site.baseurl }}/about/compute)

## Open OnDemand

Jupyter is an open-source, non-profit project to support interactive data science and scientific computing. Jupyter is language agnostic with support for >130 different scientific programing language kernels. This workshop will use the following two applications from the Jupyter software stack:

1. Open OnDemand: A software to serve JupyterLab to multiple users (this is how we will launch an instance of JupyterLab on Ceres without having to to SSH into the cluster). Documention at: [https://jupyterhub.readthedocs.io/en/stable/](https://jupyterhub.readthedocs.io/en/stable/)
1. JupyterLab: A web-based interactive development environment. Documentation at: [https://jupyterlab.readthedocs.io/en/stable/](https://jupyterlab.readthedocs.io/en/stable/)

## SLURM

SLURM (Simple Linux Utility for Resource Management) is the workload manager used on the Ceres and Atlas HPC system to allocate computational resources. From the [SLURM documentation](https://slurm.schedmd.com/quickstart.html), SLURM is “an open source… cluster management and job scheduling system for large and small Linux clusters. As a cluster workload manager, SLURM has three key functions. First, it allocates exclusive and/or non-exclusive access to resources (compute nodes) to users for some duration of time so they can perform work. Second, it provides a framework for starting, executing, and monitoring work (normally a parallel job) on the set of allocated nodes. Finally, it arbitrates contention for resources by managing a queue of pending work.”

## Scientific Coding Languages - Python and R

Python and R appear to be the most common scientific programming languages used across ARS. However, many of these examples could also be run in other programming languages such as Julia, Go, IDL/ENVI, etc.
