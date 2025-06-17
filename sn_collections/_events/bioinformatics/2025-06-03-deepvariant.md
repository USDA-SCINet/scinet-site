---
title: "From Reads to Variants"
date: 2025-06-03 13:00
type: workshop
display: basic
no-caldate: true
provider: SCINet
hideprovider: true
description: This workshop demonstrates how RNA data can be used for genome annotation.
categories: [2025 Bioinfo]

parent: 
  title: Bioinformatics Workshop Series
  url: /events/2025-bioinfo


layout_type: workshop
has-sessions: true
time: 1 – 5 PM ET
registration:
    url: https://forms.office.com/g/dERg7vbS9B
tags: bioinformatics




---

DeepVariant is a DNA sequence variant caller that uses a convolutional neural network (CNN) to call genotypes relative to a reference genome assembly. In this workshop, we will discuss a workflow for calling variants from whole-genome data for multiple individuals. <!--excerpt--> This workflow involves trimming and filtering raw reads, mapping them to a reference assembly, calling variants for each individual, merging the variants of all individuals into a single variant call format file (.vcf), and filtering the resulting variant file. We will guide participants through this pipeline step by step, providing generalized commands for each phase of the process, as well as strategies for optimizing cluster usage and reducing compute time. The final product will be a .vcf containing variants for all individuals which can be used for downstream analyses, along with a solid understanding for performing variant detection using DeepVariant.

## Pre-workshop instructions

To help minimize technical issues and delays at the start of the workshop, please try the following tests prior to the workshop.  
* **Logging on to [Atlas Open OnDemand (OOD)](https://atlas-ood.hpc.msstate.edu/):** Please confirm you can successfully log in to Atlas OOD with your SCINet account ([see instructions here](/guides/access/web-based-login)). If you are successful, you will be able to see the Atlas OOD home page.
* **Atlas Shell Access:** When on Atlas OOD, click on the top navigation bar: "Clusters" > "Atlas Shell Access". A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@atlas-login-1 ~]$".
