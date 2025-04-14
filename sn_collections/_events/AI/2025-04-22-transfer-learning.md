---
title: Transfer Learning
end_date: 2025-04-24 17:00
type: workshop
display: basic
no-caldate: true
provider: ISU
hideprovider: true
description: This workshop provides the foundational concepts and practical applications of transfer learning

tags: Artificial-Intelligence Machine-Learning

registration: 
  url: https://forms.office.com/g/c1bTdxKqJi
time: 1 – 5 PM ET
multiday: April 22, 24
---

This workshop provides the foundational concepts and practical applications of transfer learning, a powerful technique in deep learning that allows AI models to leverage pre-trained knowledge to improve performance on new tasks. The sessions will cover different types of transfer learning techniques, such as feature extraction and fine-tuning. This includes hands-on experience in applying these techniques to computer vision and language models. <!--excerpt-->

**Prerequisites:**
* Active SCINet Account
* Familiarity with accessing Open OnDemand on Atlas and launching a JupyterLab session (we will offer a pre-workshop help session for those who need assistance with this)
* Basic Python programming skills (how to read Python syntax, call functions, use arguments, etc.). 
* Basic understanding of deep learning principles (understanding the basic structure of a deep neural network, what parameters and hyperparameters are, how to read model evaluation metrics, etc.). 

**Objectives – By the end of this workshop, participants will be able to:**
* Define transfer learning and explain its advantages in deep learning. 
* Differentiate between various transfer learning techniques, including domain adaptation, feature extraction, fine-tuning, and LoRA. 
* Implement transfer learning in computer vision and LLMs using Python and Jupyter Notebooks. 
* Evaluate the effectiveness of transfer learning models compared to other training regimes such as pre-training on a limited dataset. 
* Troubleshoot common challenges in transfer learning, such as catastrophic forgetting and negative transfer.


## Pre-workshop instructions 

To help minimize technical issues and delays at the start of the workshop, please try the following three tests prior to the workshop. 

* **Logging on to [Atlas Open OnDemand (OOD)](https://atlas-ood.hpc.msstate.edu/):** Please confirm you can successfully log in to Atlas OOD with your SCINet account [(see instructions here)]({{site.baseurl}}/guides/access/web-based-login). If you are successful, you will be able to see the Atlas OOD home page.
* **Atlas Shell Access:** When on Atlas OOD, click on the top navigation bar: “Clusters” > “Atlas Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@atlas-login-1 ~]$". 
* **JupyterLab Server:** Back on the main Atlas OOD tab, click on the top or side navigation bar: "Interactive Apps" > "JupyterLab Server".  
  * Fill the input fields with the following (input fields not listed below can be left at their default values):  
    * Partition: atlas
    * Number of hours: 1
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: (leave empty)
  * Click the "Launch" button. 
  * Wait a moment for the job card to update from "Queued" to "Running". 
  * Please confirm that clicking on the "Connect to JupyterLab Server" button opens a new tab with the JupyterLab Server interface. 
