---
title: File Transfer Methods
description: Best practices for transferring files
categories: [Storage]
order_number: 60

redirect_from: 
  - /guides/datatransfer/

# guidegroup:
#     compile: true
#     fetch: "data-transfer"

layout: guides
layout_type: guides

guidegroup:
    section: subnav

subnav:
  - title: Data Transfer to and from Local Computers
    url: /guides/data/transfer/local
    internal: true
    shows_list: subnav
  - title: "Rclone: Moving Data to and from Cloud Resources"
    url: /guides/data/transfer/rclone
    internal: true
    shows_list: subnav
  - title: Globus Data Transfer
    url: /guides/data/transfer/globus
    internal: true
    shows_list: subnav
  - title: Data Transfer via Café Machine
    url: /guides/data/transfer/cafe
    internal: true
    shows_list: subnav
  - title: Large Data Transfer by Shipping Hard Drives
    url: /guides/data/transfer/shipping
    internal: true

---

{% include images_path %}


To help identify the file transfer method and documentation you should use, determine the scenario below that best matches your use case: 
1. If you are transferring small amounts of data (less than 1 GB), it is typically fine to use other file transfer protocols. See [Data Transfer to and from Local Computers](/guides/data/transfer/local).
1. If you are moving data to and from cloud resources, see [Rclone](/guides/data/transfer/rclone).
1. For most other data transfer needs, we recommend that you use [Globus](/guides/data/transfer/globus).  
    * If you would like to transfer data from your local computer, see [Globus Connect Personal](/guides/data/transfer/globus#globus-connect-personal).
    * If you are on a SCINet café machine at a SCINet-X location, see [Data Transfer via Café Machine](/guides/data/transfer/cafe).
    * If you would like to transfer data between SCINet infrastructure and a non-SCINet Globus endpoint, please go directly to [Globus Data Transfer](/guides/data/transfer/globus).  
1. Lastly, if you have to transfer very large amounts of data and network speed at your location is slow, please submit a request to the Virtual Research Support Core (VRSC) to ingress data from a hard drive as described in [Large Data Transfer by Shipping Hard Drives](/guides/data/transfer/shipping).

<!--excerpt-->

Figure 1 below depicts a recommended workflow for managing data across SCINet storage locations. See the User Guide section on [SCINet Storage](/guides/data/storage) for more information on available storage locations and their intended use.

![Figure 1]({{ images_path }}/data_management_sop-fig_1.png)
*Figure 1. Recommended procedures for managing data on SCINet HPC infrastructure using Globus.*

1. Move data to Juno
1. Copy data to target HPC (Ceres or Atlas)
1. Run compute tasks
1. Copy Results to Juno
1. Copy results to local computer, if desired
{: class="usa-sr-only"}
{: aria-describedby="source"}
{: title="Diagram of Recommended Data Management Workflow - Screen Reader Text" } 