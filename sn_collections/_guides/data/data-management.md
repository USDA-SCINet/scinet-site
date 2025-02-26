---
title: Data and Storage SOP
description: Suggested best practices for managing data on SCINet infrastructure
#author: Brian Stucky et al.

categories: [Data]

subnav:
  - title: Definitions
    url: '#definitions'
  - title: Standards of Practice
    url: '#standards-of-practice'

# excerpt: 'This document describes recommended procedures (SOP) for managing data on ARS HPC and storage infrastructure.  The key concept is to only use “Tier 1 storage” (that is, storage that is local to a given HPC cluster) as required for actively running compute jobs. Tier 1 storage is not backed up and should not be used for archival purposes.  For permanent and archival storage, use of Juno is recommended'
---

{% include images_path %}




This document describes recommended procedures (SOP) for managing data on ARS HPC and storage infrastructure.

<div class="usa-summary-box" role="region" aria-labelledby="summary-box-key-information">
  <div class="usa-summary-box__body">
    <h3 class="usa-summary-box__heading" id="summary-box-key-information">
      Key Concept:
    </h3>
    <div class="usa-summary-box__text">
    <p>Only use “Tier 1 storage” (that is, storage that is local to a given HPC cluster) as required for actively running compute jobs. Tier 1 storage is not backed up and should not be used for archival purposes.</p>
    
    <p>For permanent and archival storage, use of Juno is recommended.</p>
    </div>
  </div>
</div>

<!--excerpt-->

## Definitions
* **Juno:** Large, multi-petabyte ARS storage device at the National Agricultural Library in Maryland, accessed by users; periodically backed up to tape device.  Includes periodic file system snapshots that allow users to recover accidentally deleted files.
* **Tape backup:** Off-site backup of Juno, located at Mississippi State University, accessible by VRSC staff for disaster recovery following major system data loss.
* **Tier 1 Storage:** Storage on either of the HPC clusters, local to computing resources at the National Centers for Animal Health in Ames, Iowa or Mississippi State University. These locations are for storing code, data, and intermediate results while performing a series of computational jobs. This storage is not backed up. Two storage locations are available on each HPC cluster, `/project` and `/90daydata`. Space in `/project` is allocated on an as-needed basis. Most users should use `/90daydata` for routine Tier 1 storage.

## Standards of Practice

![Figure 1]({{ images_path }}/data_management_sop-fig_1.png)
*Figure 1. Recommended procedures for managing data on ARS HPC infrastructure using Globus.*

1. Move data to Juno
1. Copy data to target HPC (Ceres or Atlas)
1. Run compute tasks
1. Copy Results to Juno
1. Copy results to local machine, if desired
{: class="usa-sr-only"}
{: aria-describedby="source"}
{: title="Diagram of Recommended Data Management Workflow - Screen Reader Text" }  

Globus Online is the recommended method for transferring data to, from, or among Ceres, Atlas, and Juno. It provides faster data transfer speeds compared to scp, has a graphical interface, and does not require authentication for every file transfer.  

Given the space and access limitations of a home directory, large amounts of data or data that will be used collaboratively should be transferred to a project directory. See the User Guide section on [SCINet Storage](/guides/storage) for more information on home and project directory quotas.  

1. For most data transfer needs, we recommend that you use [Globus](/guides/data/transfer/globus).  
  1. If you would like to transfer data from your local machine, see [Data Transfer from Local Machine](/guides/data/transfer/local)  
  1. If you are at a SCINetX location, see [Transferring data via Cafe Machine](/guides/data/transfer/cafe). 
  1. If you would like to transfer data between Ceres/Atlas and a Non-SCINet Globus endpoint, please go directly to Section [Globus Data Transfer](/guides/data/transfer/globus).  
1. If you are transferring small amounts of data (10s to 100s of MB) it is typically fine to use other file transfer protocols. See [Data Transfer from Local Machine](/guides/data/transfer/local) 
1. If you are moving data to and from cloud resources, see [Rclone](/guides/data/transfer/rclone) 
1. If you have to transfer very large amounts of data or if network speed at your location is slow, please submit a request to the Virtual Research Support Core (VRSC) to ingress data from a hard drive as described in [Large Data Transfer by Shipping Hard Drives](/guides/data/transfer/shipping).  

If you have issues with transferring data, please contact the VRSC at scinet_vrsc@USDA.GOV. 
