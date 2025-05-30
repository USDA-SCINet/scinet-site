---
title: Software Package/Environment Management Workshop
type: workshop
date: 2024-07-19
description: Event - Workshop for managing software packages and computing environments
excerpt: In this workshop presented by the SCINet Office, we will cover best practices for managing software packages and computing environments on SCINet’s supercomputers. This will be a hands-on workshop that will provide you with the practical knowledge and skills you need to spend less time worrying about package management and more time focusing on your research!
categories: [2024 07 SPEMW] 
duplicate: true ## Added with the expectation of the Oct one using the same workshop pages
tags: Software Package-Management
layout_type: workshop
provider: SCINet

cal-titles: show

sessions: 
  - session:
    time: 12 PM – 5 PM ET

registration: 
  url: https://forms.office.com/Pages/ResponsePage.aspx?id=5zZb7e4BvE6GfuA8-g1Gl9poyUcOaMNCuMezzydam55UM1I2VUNIVVRRREFLUzBHWlVRNDFYWUs5UyQlQCN0PWcu

subnav:
- title: Tutorial instructions
  url: '#tutorial-instructions'
- title: Recording
  url: '#recording'
---

Package and computing environment management systems for R, Python, and Anaconda make it easy to install the software you need for your research projects. They also make it easy to accidentally use up all of the space in your home directory or end up with frustrating software conflicts! 

In this workshop presented by the SCINet Office, we will cover best practices for managing software packages and computing environments on SCINet’s supercomputers. This will be a hands-on workshop that will provide you with the practical knowledge and skills you need to spend less time worrying about package management and more time focusing on your research! 

At least some experience with the command line will be helpful for working through the exercises. 

[To register, please fill out this form](https://forms.office.com/Pages/ResponsePage.aspx?id=5zZb7e4BvE6GfuA8-g1Gl9poyUcOaMNCuMezzydam55UM1I2VUNIVVRRREFLUzBHWlVRNDFYWUs5UyQlQCN0PWcu)

**Remote**

<br>

## Tutorial instructions
{:.border-bottom}

Steps to prepare for the tutorial sessions:

1. **Login to Ceres Open OnDemand** at [https://ceres-ondemand.scinet.usda.gov/](https://ceres-ondemand.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/web-based-login).

1. **Open a command-line session** by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. This will open a new tab with a command-line session on Ceres' login node.

1. **Request resources on a computer node** by running the following command. 
    ```bash
    salloc --reservation=scinet_workshop1 -A scinet_workshop1 -t 05:00:00 -n 1 --mem 8G 
    ```
    {% include reservation-alert reservation="scinet_workshop1" project="scinet_workshop1" %}

1. **Create a workshop working directory** by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable. 
    ```bash
    mkdir /project/scinet_workshop1/$USER/
    cd /project/scinet_workshop1/$USER/
    ```


<br>

## Recording
{:.border-bottom}

[A recording of this workshop is available here](https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/ERrAoOxWYKRHrn4qU8EgyUoBSggB17qoTLkCoMXFoyB6ug). 
