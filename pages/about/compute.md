---
title: SCINet High-Performance Computer Systems
description: SCINet High-Performance Computer Systems
permalink: /about/compute
author: Kerrie Geil
layout: page
alt_nav: About

subnav:
  - title: Ceres HPC Cluster
    url: '#ceres-hpc-cluster--ames-ia'
  - title: Atlas HPC Cluster
    url: '#atlas-hpc-cluster--starkville-ms'
  - title: SCINet Cloud Computing Services
    url: '#scinet-cloud-computing-services'


---

## Ceres HPC Cluster | Ames, IA
Ceres is an ARS-owned high-performance computing (HPC) cluster connected to SCINet and located in Ames, IA. The cluster has over 2600 logical cores, 240TB of memory and 5.4 petabyte (PB) of VAST storage. The ['Technical Overview' in the Ceres User Manual]({{ site.baseurl }}/guides/resources/ceres#technical-overview) describes the number of logical cores and available memory for each type of node.

All nodes run on RedHat Enterprice Linux (RHEL) and compute jobs are managed by the SLURM scheduler. The system is configured with a login node, which users access to submit compute jobs to the SLURM scheduler.

Compute jobs are run on functional groups of nodes called partitions or queues. For details on the current partitions/queues, see ['Partitions or Queues' in the User Guides]({{ site.baseurl }}/guides/use/partitions-queues).

Members of the SCINet Virtual Research Support Core (VRSC) in Ames, IA are the operational administrators of the Ceres HPC cluster. The VRSC maintains the system hardware, software, and provides user support. To learn more about the VRSC, visit the [VRSC page]({{ site.baseurl }}/about/vrsc). For a list of command-line software managed by the VRSC through the module system, see the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled).

All Ceres users (ARS and formal collaborators) receive 30GB of storage in their /home directory and can request additional storage in a /project directory.

Additional technical information about the Ceres HPC cluster can be found in the [Ceres User Manual]({{ site.baseurl }}/guides/resources/ceres).

New users may also want to reference the [Quick Start Guide]({{ site.baseurl }}/guides/start).

Many additional user guides are available under the "User Guides" dropdown list.

Other helpful links:<br>
[Apply for a SCINet Account]({{ site.baseurl }}/about/signup) to access Ceres<br>
[SCINet/Ceres FAQs]({{ site.baseurl }}/support/faq)<br>
[Request Project Storage]({{ site.baseurl }}/support/request#storage-request)<br>
[Request Software]({{ site.baseurl }}/support/request#software-request)<br>


## Atlas HPC Cluster | Starkville, MS 
ARS researchers also have access to a Cray system in Starkville, MS through an agreement with the Mississippi State University (MSU) to supplement Agency scientific computing capacity. Same SCINet credentials are used to connect to Atlas as to other SCINet HPC clusters.

Atlas cluster consists of 228 standard compute nodes, 8 high memory compute nodes and 21 GPU nodes. All nodes run on Linux Centos and compute jobs are managed by the SLURM scheduler. The system is configured with a login node, which users access to submit compute jobs to the SLURM scheduler. More information about Atlas cluster can be found in the [Atlas User Guide](https://www.hpc.msstate.edu/computing/atlas). Also, ARS has an agreement with MSU that supports the [Advancing Agricultural Research through High-Performance Computing project](https://storymaps.arcgis.com/stories/38dcc50ccb8147f4b31b9fe20d19a66a). 


## SCINet Cloud Computing Services
In addition to the ARS in-house compute infrastructure, cloud computing services are available to augment the HPC capability of Ceres with cloud resources.<br>
[Request SCINet Cloud Computing]({{ site.baseurl }}/support/request#aws-request)

<!--
## Page specific instructions
Ceres
configuration
nodes storage queues
operators
network connections
links to operating docs
Info on next generation HPS's coming online
-->
