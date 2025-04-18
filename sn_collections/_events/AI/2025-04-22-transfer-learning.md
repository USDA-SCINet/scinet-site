---
title: Transfer Learning
end_date: 2025-04-24 17:00
type: workshop
layout_type: workshop
display: basic
no-caldate: true
provider: University of Florida
hideprovider: true
description: This workshop provides the foundational concepts and practical applications of transfer learning

tags: Artificial-Intelligence Machine-Learning

registration: 
  url: https://forms.office.com/g/c1bTdxKqJi
time: 1 – 5 PM ET
multiday: April 22, 24

materials:
  - text: Workshop materials
    url: https://github.com/PracticumAI/transfer_learning

materialsdesc: "Workshop materials available at the links below."

subnav:
  - title: Tutorial setup instruction
  - title: Workshop Materials

parent: 
  title: AI Workshop Series
  url: /events/2025-ai
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


## Tutorial setup instruction

Steps to prepare for the tutorial:

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).
1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas's login node.
1. **Request resources on a compute node** by running the following command:  
 
    {:.copy-code}
    ```bash
srun -A scinet_workshop1 -t 00:30:00 -n 1 --mem 8G --pty bash  
```

1. **Create your workshop working directory** and copy the tutorial materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable.  

    {:.copy-code} 
    ```bash
mkdir -p /90daydata/shared/$USER/transfer_learning
cd /90daydata/shared/$USER/transfer_learning
cp -r /project/scinet_workshop1/transfer_learning/*.ipynb .
cp -r /project/scinet_workshop1/ transfer_learning /*.py .
``` 

1. **Setup the kernel for JupyterLab.** You will create a kernel called *computer_vision_1_env* to access from JupyterLab Server. Run the following commands to activate the workshop's virtual environment and create a new kernelspec from it: 

    {:.copy-code} 
    ```bash 
source /project/scinet_workshop1/ transfer_learning /tl_env/bin/activate 
ipython kernel install --name "tl_env" --user 
``` 

1. **Stop the interactive job** on the compute node by running the command:

     {:.copy-code} 
    ```bash 
exit 
``` 

1. **Launch a JupyterLab Server session.** Under the *Interactive Apps* menu, select *JupyterLab Server*.
  * Specify the following input values on the page:
      * Account: scinet_workshop1 
      * Partition: gpu-a100-mig7 
      * QOS: normal 14-00:00:00 
      * Number of hours: 4 
      * Number of nodes: 1 
      * Number of tasks: 4 
      * Additional Slurm Parameters:
  
          {: .copy-code } 
          ``` 
--reservation=workshop --gres=gpu:1 --mem=32G --ntasks-per-node=4 
```

    * Working Directory:  

        {: .copy-code } 
        ``` 
/90daydata/shared/${USER}/transfer_learning 
``` 

  * Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to JupyterLab Server* button will appear. Click *Connect to JupyterLab Server*. 
