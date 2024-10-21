---
title: A Quick Guide to getting started with SCINet
description: A Quick Guide to getting started with SCINet
permalink: /guides/start
redirect_from: 
  - /guide/quickstart/
layout: guides
layout_type: guides

#alerts:
#  - alert:
#    title: Currently in Development
#    type: info
#    text: "If you have feedback on the organization of the User Guides sections, or notice broken links or missing images, please email us at <a href='mailto:moe.richert@usda.gov?subject=SCINet Website Feedback'>moe.richert@usda.gov.</a>"

guidegroup:
    section: subnav
#  - category: Resources
#  - getpage: /guides/access/mfa
#  - category: Access
#  - getpage: /guides/data/storage
#  - getpage: /guides/data/transfer
#  - category: Software
#  - category: Use

subnav:
  - title: What is SCINet?
    url: '#what-is-scinet'
  - title: User Guides
    url: '#user-guides'
  - title: SCINet HPC Resources
    url: /guides/resources/
    internal: true
  - title: Logging In
    url: /guides/access/
    internal: true
    shows_list: subnav
  - title: Data Storage
    url: /guides/data/storage
    internal: true
    shows_list: subnav
  - title: Data Transfer
    url: /guides/data/datatransfer
    internal: true
    shows_list: subnav
  - title: Software
    url: /guides/software/
    internal: true
    shows_list: true
    categories: [Software]
  - title: Open OnDemand Interface
    url: /guides/use/open-ondemand
    internal: true

sidenav_append:
  - title: SEARCH
    url: /search
    class: "sidenav-search"
---

[No account? Signup here.]({{ site.baseurl }}/about/signup){: .usa-button .usa-button-big }

## What is SCINet?

SCINet is the USDA-ARS's initiative for scientific computing. It consists of:

1. High performance computer clusters for running command-line and graphical programs. There are currently two clusters: Ceres cluster in Ames IA and Atlas cluster in Starkville MS. SCINet also offers AWS cloud computing. See [SCINet HPC Systems]({{ site.baseurl }}/about/compute) for more detail.
2. Network improvements across ARS.
3. Support for computing through the Virtual Research Support Core (VRSC). See [VRSC Support]({{ site.baseurl }}/about/vrsc) for more detail.
4. Training and workshop opportunities in multiple areas of scientific computing. See [our event calendar]({{ site.baseurl }}/events) for more information.

Users who are new to the HPC environment may benefit from the [SCINet/Ceres onboarding video](https://www.youtube.com/watch?v=d7oKSL4aitw) which covers most of the material contained in this guide. Note that /KEEP storage discussed in the video at 16:20 is no longer available. Instead data that cannot be easily reproduced should be manually backed up to [Juno]({{ site.baseurl }}/guides/data/storage#juno-archive-storage). The instructional video at [https://www.youtube.com/watch?v=I3lnsCAfx3Q](https://www.youtube.com/watch?v=I3lnsCAfx3Q) demonstrates how to transfer files between local computer, Ceres, Atlas and Juno using Globus.

## User Guides

**Use the navgation options or select one of the guides below to get started with SCINet**
