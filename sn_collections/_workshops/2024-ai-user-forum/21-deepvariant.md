---
title: "From reads to variants: a pipeline for variant calling using DeepVariant"
date: 2024-11-21 08:00
categories: [2024 AI User Forum] 
time: 9am-12pm CT
lead: ARS scientists Sheina Sim and Craig Carlson

section: November 21, Morning — Applications of AI

Prerequisites:
  - text: Familiarity with basic command-line concepts. We will offer virtual training for these skills before the Forum begins.
  - text: Understanding of genomic sequencing.
  - text: General optimism.
---

DeepVariant is a DNA sequence variant caller that uses a convolutional neural network (CNN) to call genotypes relative to a reference genome assembly. In this workshop, we will discuss a workflow for calling variants from whole-genome data for multiple individuals. <!--excerpt--> This workflow involves trimming and filtering raw reads, mapping them to a reference assembly, calling variants for each individual, merging the variants of all individuals into a single variant call format file (.vcf), and filtering the resulting variant file. We will guide participants through this pipeline step by step, providing generalized commands for each phase of the process, as well as strategies for optimizing cluster usage and reducing compute time. The final product will be a .vcf containing variants for all individuals which can be used for downstream analyses, along with a solid understanding for performing variant detection using DeepVariant.
