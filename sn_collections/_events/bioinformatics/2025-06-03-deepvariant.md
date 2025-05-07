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
