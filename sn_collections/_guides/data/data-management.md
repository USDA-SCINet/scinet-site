---
title: Data and Storage
description: Suggested best practices for managing data on SCINet infrastructure
#author: Brian Stucky et al.

categories: [Data]

subnav:
  - title: Definitions
    url: '#definitions'
  - title: Standards of Practice
    url: '#standards-of-practice'

# excerpt: 'This page describes recommended procedures for managing data on SCINet HPC and storage infrastructure.  The key concept is to use “co-located storage” (that is, storage that is local to a given HPC cluster) as needed for active computational work. Co-located storage is not backed up and should not be relied on for long-term storage purposes.  For long-term and permanent storage, use Juno instead.'

published: false
---

{% include images_path %}


This page describes recommended procedures for managing data on SCINet HPC and storage infrastructure.

<div class="usa-summary-box" role="region" aria-labelledby="summary-box-key-information">
  <div class="usa-summary-box__body">
    <h3 class="usa-summary-box__heading" id="summary-box-key-information">
      Key Concept:
    </h3>
    <div class="usa-summary-box__text">
    <p>Use “co-located storage” (that is, storage that is local to a given HPC cluster) as needed for active computational work. Co-located storage is not backed up and should not be relied on for long-term storage purposes.</p>
    
    <p>For long-term and permanent storage, use Juno instead.</p>
    </div>
  </div>
</div>

<!--excerpt-->

## Definitions
* **Juno:** Large, multi-petabyte ARS storage device at the National Agricultural Library in Beltsville,Maryland, accessed by users; periodically backed up to tape device.  Includes periodic file system snapshots that allow users to recover accidentally deleted files.
* **Tape backup:** Off-site backup of Juno, located at Mississippi State University and accessible by VRSC staff for disaster recovery following major system data loss.
* **Co-located storage:** Storage on either of the HPC clusters, local to computing resources. This storage is for storing code, data, and intermediate results that support on-going computational work. This storage is not backed up. Two storage locations are available on each HPC cluster, `/project` and `/90daydata`. Space in `/project` has a SCINet project-specific quota, while `/90daydata` does not have a quota and is best suited for intermediate results.

## Standards of Practice

![Figure 1]({{ images_path }}/data_management_sop-fig_1.png)
*Figure 1. Recommended procedures for managing data on SCINet HPC infrastructure using Globus.*

1. Move data to Juno
1. Copy data to target HPC (Ceres or Atlas)
1. Run compute tasks
1. Copy Results to Juno
1. Copy results to local machine, if desired
{: class="usa-sr-only"}
{: aria-describedby="source"}
{: title="Diagram of Recommended Data Management Workflow - Screen Reader Text" }  



Given the space and access limitations of a home directory, large amounts of data or data that will be used collaboratively should be transferred to a project directory. See the User Guide section on [SCINet Storage](/guides/storage) for more information on home and project directory quotas.  


If you have issues with or questions about transferring data, please contact the VRSC at scinet_vrsc@USDA.GOV. 
