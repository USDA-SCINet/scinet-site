---
title: Protein structure prediction, search, and analysis with AI
date: 2024-11-21 12:30
categories: [2024 AI User Forum] 
time: 1:30-4:30pm CT
lead: ARS scientists Hye-Seon Kim and Carson Andorf

section: November 21, Afternoon — Applications of AI

prerequisites:
  - text: Familiarity with basic command-line concepts. We will offer virtual training for these skills before the Forum begins.
---

In this workshop, participants will learn how to use cutting-edge, AI-based tools for analyzing protein structure and function. <!--excerpt-->  

The workshop will start by exploring 3D protein structure prediction using AlphaFold for alignment-based structure prediction and ESMFold for single-sequence structure prediction. Participants will then learn how to use FoldSeek for structure-based protein similarity search. The last part of the workshop will bring all of these concepts together by using PanEffect to explore how genetic variations in protein sequence can influence an organism’s phenotype.

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
    mkdir -p /90daydata/shared/$USER/ 
    cd /90daydata/shared/$USER/ 
    cp -r /project/ai_forum/protein_structure . 
    ```
 

1. **Stop the interactive job** on the compute node by running the command exit.

## Schedule


<div class="usa-table-container usa-table-container--scrollable">
  <table class="usa-table width-full">
        <thead>
            <tr>
                <th role="columnheader">Materials</th>
                <th role="columnheader">Start</th>
                <th role="columnheader">Est. minutes</th>
                <th role="columnheader">Topic</th>
                <th role="columnheader">Presenter</th>
            </tr>
        </thead>
        <tbody>
          <tr class="border-top-2px">
            <th scope="row" data-label="Materials" tabindex="0">
              <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Introduction_Slides.pdf" target="_blank">Introduction</a>            
            </th>
            <td data-label="Start"> 1:30 PM </td>
            <td data-label="Est. minutes"> 10 minutes </td>
            <td data-label="Topic"> Introduction </td>
            <td data-label="Presenter">Hye-Seon Kim & Carson Andorf </td>
        </tr>
        <tr class="border-top-2px">
          <th scope="row" data-label="Materials" rowspan="5" tabindex="0">
            <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Protein_Structure_Prediction.pdf" target="_blank">Protein Structure Prediction</a>
          </th>
          <td data-label="Start" rowspan="2"> 1:40 PM </td>
          <td data-label="Est. minutes" rowspan="2"> 30 minutes </td>
          <td data-label="Topic"> AlphaFold 2 & 3 </td>
          <td data-label="Presenter"> Hye-Seon Kim </td>
        </tr>
        <tr>
          <td data-label="Topic"> AlphaFold online </td>
          <td data-label="Presenter"> Hye-Seon Kim </td>
        </tr>
        <tr>
          <td data-label="Start" rowspan="2"> 2:10 PM </td>
          <td data-label="Est. minutes" rowspan="2"> 30 minutes </td>
          <td data-label="Topic"> ESMFold </td>
          <td data-label="Presenter"> Carson Andorf </td>
        </tr>
        <tr>
          <td data-label="Topic"> ESMFold online </td>
          <td data-label="Presenter"> Carson Andorf </td>
        </tr>
        <tr>
          <td data-label="Start"> 2:40 PM </td>
          <td data-label="Est. minutes"> 20 minutes </td>
          <td data-label="Topic"> OmegaFold </td>
          <td data-label="Presenter"> Stephen Harding </td>
        </tr>
        <tr class="border-top-2px">
          <th scope="row" data-label="Materials" rowspan="2" tabindex="0">
            <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Protein_Structure_Search.pdf" target="_blank">Protein Structure Search</a>
          </th>
          <td data-label="Start" rowspan="2"> 3:00 PM </td>
          <td data-label="Est. minutes" rowspan="2"> 30 minutes </td>
          <td data-label="Topic"> FoldSeek </td>
          <td data-label="Presenter"> Olivia Haley </td>
        </tr>
        <tr>
          <td data-label="Topic"> FoldSeek Online </td>
          <td data-label="Presenter"> Stephen Harding </td>
        </tr>
        <tr class="border-top-2px">
          <th scope="row" data-label="Materials" rowspan="3" tabindex="0">
            <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Variant_Effect_Scores.pdf" target="_blank">Missense Variant Effect Predictions</a>
          </th>
          <td data-label="Start" rowspan="3"> 3:30 PM </td>
          <td data-label="Est. minutes" rowspan="3"> 30 minutes </td>
          <td data-label="Topic"> ESM-variant </td>
          <td data-label="Presenter"> Carson Andorf </td>
        </tr>
        <tr>
          <td data-label="Topic"> PanEffect (Fusarium) </td>
          <td data-label="Presenter"> Hye-Seon Kim </td>
        </tr>
        <tr>
          <td data-label="Topic"> PanEffect (Maize) </td>
          <td data-label="Presenter"> Carson Andorf </td>
        </tr>
        <tr class="border-top-2px">
          <th scope="row" data-label="Materials" rowspan="2" tabindex="0">
            <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Protein_Binder_Prediction.pdf" target="_blank">Protein Binder Predictions</a>
          </th>
          <td data-label="Start" rowspan="2"> 4:00 PM </td>
          <td data-label="Est. minutes" rowspan="2"> 30 minutes </td>
          <td data-label="Topic"> RFdiffusion </td>
          <td data-label="Presenter"> Olivia Haley </td>
        </tr>
        <tr>
          <td data-label="Topic"> RFdiffusion online </td>
          <td data-label="Presenter"> Olivia Haley </td>
        </tr>
      </tbody>
    </table>
</div>

Additional Resources:
* <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Tool_Descriptions.pdf" target="_blank">Tool Descriptions</a>
* <a href="/assets/pdf/workshops/2024-ai-user-forum/21-protein-structure/Conda_Environments.pdf" target="_blank">Conda Environments</a>
