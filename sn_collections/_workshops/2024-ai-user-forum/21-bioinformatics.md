---
title: Predicting functional roles of proteins using AI-driven bioinformatics tools
date: 2024-11-21 08:00
categories: [2024 AI User Forum] 
time: 9am-12pm, 1:30pm-4:30pm CT (All Day)
lead: Genome Informatics Facility at Iowa State University

section: November 21, Morning — Applications of AI

prerequisites:
  - text: Familiarity with basic command-line concepts. We will offer virtual training for these skills before the Forum begins.
---

In this hands-on workshop, participants will learn how to predict the functional roles of proteins by analyzing their sequence data using state-of-the-art bioinformatics tools powered by AI. The focus will be on understanding how AI-based methods are applied to predict protein characteristics and other downstream uses for gene annotations. <!--excerpt--> 

Two such examples will be predicting signal peptides (indicators of protein secretion) and subcellular localization (where the protein operates in the cell). Participants will use sample datasets to explore how computational models can interpret protein sequences and provide insights into their biological roles. By the end of the session, attendees will have the knowledge and skills to functionally annotate proteins in any gene annotation.

## Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/web-based-login). 

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas' login node. 

1. **Request resources on a compute node** by running the following command:  

    {: .copy-code }
    ```
    salloc --reservation=forum-gpu -A scinet_workshop1 -p gpu-a100-mig7 -n1 --gres=gpu:1 -A scinet_workshop1 -t 3:00:00
    ```
    {% include reservation-alert reservation="forum-gpu" project="scinet_workshop1" %}  

    `salloc: Granted job allocation <job-id>`  
    `salloc: Nodes atlas-0245 are ready for job`

    {: .copy-code }
    ```
    srun --jobid=<job-id> --pty bash
    ```

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable. 

    {: .copy-code }
    ```
mkdir -p /90daydata/shared/$USER 
cd /90daydata/shared/$USER 
cp -r /project/ai_forum/functional_annotation . 
```

1. **Stop the interactive job** on the compute node by running the command exit.


## Tutorials

* [Identifying secreted proteins and predicting their subcellular localization](https://bioinformaticsworkbook.org/dataAnalysis/GenomeAnnotation/Secreted_Protein_Prediction_with_SignalP_and_TMHMM)
* [DeepGoPlus -	Using AI to associate GO terms with novel proteins](https://bioinformaticsworkbook.org/dataAnalysis/GenomeAnnotation/DeepGoPlus_AI_Functional_Prediction_of_Proteins)
* [A ProtTrans Pipeline to Differentiate Transmembrane Domains from Other Proteins](https://bioinformaticsworkbook.org/dataAnalysis/GenomeAnnotation/Protein_Classification_with_ProtTrans)
