---
title: Running Application Jobs on Compute Nodes
description: Running Application Jobs on Compute Nodes

categories: [Use]
order_number: 10

---


Users will run their applications on the cluster in either interactive mode or in batch mode. Interactive mode ( `salloc`  or  `srun`  command) is familiar to anyone using the command line: the user specifies an application by name and various arguments, hits Enter, and the application runs. However, in interactive mode on a cluster the user is automatically switched from using a login node to using a compute node. This keeps all the intense computation off the login nodes, so that login nodes can have all the resources necessary for managing the cluster. You should always use interactive mode when you are running your application but not using batch mode. **Please do not run your applications on the login nodes, use the interactive mode.**
<!--excerpt-->

Interactive mode should only be used when interaction is required, for example when preparing or debugging a pipeline. Otherwise the batch mode should be used. Batch mode requires the user to write a short job script (see examples at section [Batch Mode]({{ site.baseurl }}/guides/use/slurm#batch-mode)) or use the [Ceres Job Script Generator]({{ site.baseurl }}/support/ceres-job-script).

Ceres uses Simple Linux Utility for Resource Management (SLURM) to submit interactive and batch jobs to the compute nodes. Requested resources can be specified either within the job script or using options with the  `salloc`,  `srun`, or  `sbatch`  commands.
