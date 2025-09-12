---
title: What's New?
layout: page
permalink: /news/announcements
description: A history of SCINet developments such as added software features, user experience improvements, login procedure updates, policy changes, and new working groups.
filter: check
collecting: 
  collections: announcements
  yml: news

news:
  - title: "Increased memory on Ceres nodes"
    date: 2025-08-06
    excerpt: "32 TB of memory from the recently decommissioned ceres19 nodes were installed in 76 operational ceres20 nodes to increase overall available memory. The minimum amount of memory per node on Ceres has now increased from 384 to 768 GB. See the [Ceres technical overview](/guides/resources/ceres#technical-overview) for current detailed hardware specifications."
  - title: "New Atlas storage system"
    date: 2025-07-08
    excerpt: "Atlas’s July 8 maintenance included replacing Atlas’s original data storage hardware with a completely new data storage system. This new system brings several important improvements, including:
    * Nearly 3.4 times more storage space (increased from ~2.2 PB to ~6 PB). 
    * All solid-state storage that provides read/write performance superior to the previous storage system. This should be especially beneficial for data-intensive GPU workloads. 
    * Significant power and space savings compared to the previous storage system."
  - title: "New GPU node limits on Atlas"
    date: 2025-07-08
    excerpt: "To help promote resource sharing, jobs submitted to each of the GPU partitions (“gpu-v100”, “gpu-a100”, “gpu-a100-mig7”, and “gpu-l40s”) now have a maximum running time of 2 days and a maximum number of GPUs of 25% of all GPUs of the same type (e.g., there are 48 L40S GPUs, so one user can be using up to 12 L40S GPUs at once)."
  - title: "New GPUs available on Atlas"
    date: 2025-06-25
    excerpt: "Twelve new GPU nodes with a total of 48 GPUs are now available to all SCINet users on SCINet’s Atlas supercomputer. These nodes each have 4 NVIDIA L40S GPUs, 64 CPU cores, and 1.5 TB of memory. The L40S GPU features 48 GB of GPU memory and was designed for general-purpose workloads, including deep learning and AI applications. These new nodes are available in the “gpu-l40s” partition/queue on Atlas."
  - title: "Job submission changes on Ceres"
    date: 2025-06-20
    excerpt: "When submitting jobs, it is now required to explicitly specify a Slurm account (Slurm accounts have the same names as SCINet projects). For example, to use the account/project “myproject” when submitting an sbatch script, add the following line to the script file: 
    #SBATCH --account=myproject"
  - title: "Partition/queue changes on Ceres"
    date: 2025-06-20
    excerpt: "During Ceres’ June maintenance, legacy community partitions (“short”, “medium”, “long”, “long60”, etc.) were removed, and nearly all compute jobs on Ceres should now be submitted to the “ceres” partition. Note that compute jobs in the “ceres” partition are limited to 3 weeks of run time by default. If you require very long run times, you may submit jobs using the “long” QOS (“quality of service”) specification. This will allow jobs to run for up to 60 days, but they will be limited to using no more than 144 CPU cores. See the February 18 update below for more information about the “ceres” partition and its benefits."
  - title: "New image annotation software on Atlas"
    date: 2025-03-31
    excerpt: "You can now easily create computer vision model training datasets directly on Atlas without needing to transfer image files to and from local laptops or workstations for annotation. Labelme, an image annotation application, is now available as an interactive app on Open OnDemand on Atlas. Labelme supports a variety of annotation types, including bounding boxes and custom polygons, and it also supports automated and semi-automated annotation using pretrained, general computer vision AI models."
  - title: "CLC Workbench and Server upgraded"
    date: 2025-02-18
    excerpt: "CLC Workbench and Server, a bioinformatics application available on the Ceres cluster's Open OnDemand interface, has been upgraded to version 25."
  - title: "New Animal Behavior AI Working Group"
    date: 2025-02-04
    excerpt: "This SCINet working group aims to explore the potential benefits of Artificial Intelligence (AI) in animal behavior research. To learn more about the working group, please [see the working group description here](/research/working-groups/behavior)."
  - title: "LincPass login for café machines"
    date: 2025-01-15
    excerpt: "The SCINet café machines offer high-speed data transfer capabilities to and from SCINet’s supercomputers and data storage infrastructure. These machines have been updated to support streamlined logins with a LincPass."
  - title: "Streamlined web-based login"
    date: 2025-01-28
    excerpt: "SCINet users will no longer see the SCINet login page that asks for a username and password when they access SCINet systems. Instead, SCINet logins immediately redirect to USDA’s eAuthentication (eAuth) site, at which point they continue to authenticate as usual using either their LincPass/AltLinc card or Login.gov credentials."
  - title: "AlphaFold 3 Available on SCINet Clusters"
    date: 2025-01-28
    excerpt: "The AlphaFold 3 software, databases, and model weights are now available on both Ceres and Atlas! To learn more about how to use AlphaFold 3 on SCINet clusters, please [see instructions here](/guides/application/alphafold3)."
  - title: "Simplified Globus login"
    date: 2024-12-11
    excerpt: "SCINet users can now log in to Globus using their SCINet accounts like any other web-based SCINet access (previously, logging in to Globus required ORCiD credentials). When logging into Globus.org, you can select 'SCINet - ARS/USDA' in the existing organizational login dropdown menu."
  - title: "New Breeding AI and ML Working Group"
    date: 2024-10-31
    excerpt: "The focus of this group is to create a space where researchers working on addressing problems in breeding using artificial intelligence (AI) and machine learning (ML) methods can exchange knowledge and build community support. To learn more about the working group, please [see the working group description here](/research/working-groups/breeding)."
  - title: "Expanded memory in A100 GPU nodes"
    date: 2024-10-30
    excerpt: "All five A100 GPU nodes on Atlas have had their available memory doubled from 1TB to 2TB. This improvement allows for more efficient use of the GPUs and helps support larger input datasets."
  - title: "Atlas OOD terminal"
    date: 2024-07-02
    excerpt: "When in [Open OnDemand on Atlas](https://atlas-ood.hpc.msstate.edu/), the terminal created by clicking on *Clusters* > *Atlas Shell Access* no longer prompts users to re-authenticate."
  - title: "SCINet Login Updates"
    date: 2024-06-26
    excerpt: "Legacy authentication using SCINet usernames, passwords, and authentication codes is no longer supported. Access to SCINet is now limited to authentication with a LincPass or a Login.gov account, with the exception of some sponsored accounts still using YubiKey devices. These accounts will be transitioned to Login.gov over the next few months. See detailed instructions on our [Logging Into SCINet Guide]({{ site.baseurl }}/guides/access)."
  - title: "Ceres OS upgraded"
    date: 2024-06-26
    excerpt: "The Linux distribution on Ceres has been changed from AlmaLinux to Red Hat Enterprise Linux 9.2. This should not cause complications with previously installed software or workflows."
  - title: "SCINet Login Updates"
    date: 2024-06-17
    excerpt: "Getting collaborators set up with sponsored SCINet accounts is now much quicker because non-LincPass holders can use Login.gov credentials. We are no longer relying on the physical devices, YubiKeys, that had to be mailed to such users. See detailed instructions on our [Logging Into SCINet Guide]({{ site.baseurl }}/guides/access)."
  - title: "Home directory quota increase"
    date: 2023-12-05
    excerpt: "Users can now have up to 15 GB of files in their home directories."
  - title: "New Graphics Processing Unit (GPU) nodes on Atlas"
    date: 2023-08-29
    excerpt: "Five new nodes on Atlas with a total of 40 NVIDIA A100 GPUs are now available. This drastically increases SCINet's GPU computing capacity and offers SCINet users access to state-of-the-art GPU technology for running AI and deep learning workflows, large-scale data analyses, and other computationally intensive tasks."
  - title: "Scheduling recurring jobs on Ceres and Atlas"
    date: 2023-04-10
    excerpt: "All SCINet users now have access to Slurm's \"scrontab\" feature, which makes it possible to schedule jobs that automatically run on a recurring basis."
  - title: "Atlas nodes have internet access"
    date: 2022-12-07
    excerpt: "All nodes on Atlas can now access resources on the Internet, which drastically simplifies many scientific computing workflows. For example, it is now possible to update software packages or access external data resources from any node on the system."
  - title: "New SCINet website launched"
    date: 2022-12-01
    excerpt: "The redesigned site includes a consolidated event calendar, improved user guide navigation, and a more informative landing page."
  - title: "QGIS added to Open OnDemand"
    date: 2022-08-23
    excerpt: "QGIS, an open-source, graphical software for geographic information systems, has been added to Open OnDemand on both Ceres and Atlas."
  - title: "SCINet Office staff"
    date: 2021-04-11
    excerpt: "The SCINet Office now has its first permanent staff member with more expected to onboard in the coming months."

---

Have you not used SCINet in a while, or just want to make sure you haven't missed any changes? See below for a history of SCINet developments such as added software features, user experience improvements, login procedure updates, policy changes, and new working groups. 

For general announcements (e.g., training opportunities and system status updates), please see the [SCINet Forum Announcements page](https://forum.scinet.usda.gov/c/announcements/6). For past and upcoming events, please see the [SCINet Events Calendar](/events).
 
