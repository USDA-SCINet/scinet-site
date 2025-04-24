---
title: Data preparation and quality assessment in genome assembly and annotation
date: 2024-11-20 12:00
categories: [2024 AI User Forum] 
time: 1-4 pm CT
lead: Genome Informatics Facility at Iowa State University

section: November 20, Afternoon — Foundational Skills and Concepts

materials:
  - text: Data Prep Markdown File
    url: https://github.com/ISUgenomics/genome_assembly_workshop/blob/main/AIUserForum_Workshop_Nov2024/01_DataPrep.md
  - text: Assembly and Assessment Markdown File
    url: https://github.com/ISUgenomics/genome_assembly_workshop/blob/main/AIUserForum_Workshop_Nov2024/02_AssemblyAssessment.md
  - text: Genome Annotation Markdown File
    url: https://github.com/ISUgenomics/genome_assembly_workshop/blob/main/AIUserForum_Workshop_Nov2024/03_GenomeAnnotation.md

prerequisites:
  - text: Familiarity with basic command-line concepts. We will offer virtual training for these skills before the Forum begins.
---

In this workshop, participants will explore techniques for evaluating the accuracy and completeness of genome assemblies and annotations, helping attendees understand key metrics and statistical methods used to assess the quality of genomic data. <!--excerpt--> 

Knowing how to evaluate a genome will ensure reliable results for downstream, AI-based analyses like gene model prediction, variant detection, or comparative studies. Participants will also learn how to extract the transcripts and proteins from their genomes, to enable a variety of downstream AI-based applications, such as protein structure prediction. By the end of the workshop, attendees will be better equipped with the practical skills necessary to evaluate genomes and annotations for a range of bioinformatics applications.

## Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/web-based-login). 

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas' login node. 

1. **Request resources on a compute node** by running the following command:  

    {: .copy-code }
    ```
    srun --reservation=forum -A scinet_workshop1 -t 00:30:00 -n 1 --mem 8G --pty bash 
    ``` 
    {% include reservation-alert reservation="forum" project="scinet_workshop1" %}

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable. 

    {: .copy-code }
    ```
    mkdir -p /90daydata/shared/$USER 
    cd /90daydata/shared/$USER 
    cp -r /project/ai_forum/assembly_prep . 
    ```
 

1. **Stop the interactive job** on the compute node by running the command exit.