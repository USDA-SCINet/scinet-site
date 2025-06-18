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
  - title: Globus Data Transfer
    url: /guides/data/transfer/globus
    internal: true
    shows_list: subnav
  - title: Data Transfer via Café Machine
    url: /guides/data/transfer/cafe
    internal: true
    shows_list: subnav
  - title: Data Transfer from Local Machine
    url: /guides/data/transfer/local
    internal: true
    shows_list: subnav
  - title: "Rclone: Moving Data to and from Cloud Resources"
    url: /guides/data/transfer/rclone
    internal: true
  - title: "Large Data Transfer by Shipping Hard Drives"
    url: /guides/data/transfer/shipping
    internal: true

---

Globus Online is the recommended method for transferring data to, from, or among Ceres, Atlas, and Juno. It provides faster data transfer speeds compared to `scp`, has a graphical interface, and does not require authentication for every file transfer.  

Given the space and access limitations of a home directory, large amounts of data or data that will be used collaboratively should be transferred to a project directory. See the User Guide section on [SCINet Storage](/guides/data/storage) for more information on home and project directory quotas.  

1. For most data transfer needs, we recommend that you use [Globus](/guides/data/transfer/globus).  
    1. If you would like to transfer data from your local machine, see [Data Transfer from Local Machine](/guides/data/transfer/local).
    1. If you are at a SCINet-X location, see [Transferring data via Café Machine](/guides/data/transfer/cafe).
    1. If you would like to transfer data between SCINet infrastructure and a non-SCINet Globus endpoint, please go directly to [Globus Data Transfer](/guides/data/transfer/globus).  
1. If you are transferring small amounts of data (10s to 100s of MB), it is typically fine to use other file transfer protocols. See [Data Transfer from Local Machine](/guides/data/transfer/local).
1. If you are moving data to and from cloud resources, see [Rclone](/guides/data/transfer/rclone).
1. Lastly, if you have to transfer very large amounts of data and network speed at your location is slow, please submit a request to the Virtual Research Support Core (VRSC) to ingress data from a hard drive as described in [Large Data Transfer by Shipping Hard Drives](/guides/data/transfer/shipping).

<!--excerpt-->