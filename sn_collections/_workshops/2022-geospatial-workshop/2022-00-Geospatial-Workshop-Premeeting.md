---

title: "Pre-meeting Tech Support"
# 
excerpt: Please complete this pre-meeting checklist ahead of any workshop sessions you plan to attend.
description: Geospatial workshop Pre-meeting Tech Support
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: orientation
tags: Geospatial


subnav:
  - title: Tutorials
    url: '#tutorials'
  - title: Access to the SCINet HPC Systems
    url: '#access-to-the-scinet-ceres-or-atlas-hpc-systems'
  - title: Software + Hardware + Nomenclature Overview
    url: '#software--hardware--nomenclature-overview'


---

<br>

## Pre-meeting checklist

Please complete this pre-meeting checklist ahead of time if you plan to participate in any of the interactive follow-along tutorials (Sessions 4-10).

<div class="usa-card max-tablet">
    <div class="usa-card__container">
      <div class="usa-card__header bg-primary-lighter">
        <h2 class="usa-card__heading">Pre-Meeting Checklist</h2>
      </div>
      <div class="usa-card__body">
            <ol>
          <li>Have a SCINet account and be able to login. If you don't have one, <a href="../about/signup">apply for one</a> ASAP.</li>
          <li>If you need help accessing your SCINet account, attend <a href="../workshops/2022-8-25-Geospatial-Workshop-0/">Session 0: Pre-meeting Technical Support on 8/25/2020 at 10am MDT</a>.</li>
          <li>Register for the sessions you wish to attend before 8/25/2022.</li>
          <li>Familiarize yourself with the background information on this page.</li>
          <li>Optional but suggested: If using your laptop for these tutorials you may want to connect to a larger monitor so that you will have enough monitor space to see the zoom demonstration while also having your browser or terminal workspace open at the same time.</li>
        </ol>
      </div>
    </div>
  </div>


<br>
{:.border-bottom}


## Tutorials

The tutorials span the range from beginner to more advanced. If you have questions about the material, please do not hesitate to contact the organizing committee.

In general, these tutorials assume some level of knowledge in scientific programming, but beginners are still welcome.

<br>


## Access to the SCINet Ceres or Atlas HPC Systems

You must apply for a SCINet account to get access to the Ceres or Atlas HPC systems. After your account is approved, there are a couple more steps to complete before you will be able to successfully login to your account. You will receive instructions by email on how to access your account for the first time upon account approval. Please make sure you can login to your account before joining our tutorial sessions.

Visit the [Ceres]({{ site.baseurl }}/guides/resources/ceres) and [Atlas](https://www.hpc.msstate.edu/computing/atlas/) user guides for more information about how to login and brief information about the HPC systems.

**If you have issues accessing Ceres or Atlas, please attend Session 0: Pre-meeting SCINet Account Login Assistance on 8/25/2022 at 10am MDT. We cannot provide individual assistance for login issues in any other session.**

<br>

## Software + Hardware + Nomenclature Overview

The software discussed and shown in the workshop is largely open source, can run on a desktop, HPC, or cloud environment. Below is a quick overview of some of the software, hardware, and confusing nomenclature that will be used during this workshop.

**SCINet vs. Ceres vs. Atlas**

SCINet is the USDA ARS Scientific Computing INitiative that aims to improve access to high performance and cloud computing, improve networking to facilitate high speed data transfer, and facilitate scientific computational training. A part of SCINet is its computing infrastructure, including the Ceres and Atlas high-performance computing (HPC) clusters. For most of the tutorials, we will default to running them on Ceres but session material will provide information about both clusters. For more information on computing systems that SCINet offers, see the [Computer Systems page of the SCINet website.]({{ site.baseurl }}/about/compute).

**Open OnDemand**

Open OnDemand ([https://openondemand.org](https://openondemand.org)) allows end users to use a web browser to access resources with graphical applications at HPCs such as Ceres and Atlas. This workshop will use Open OnDemand on Ceres to access three applications: 

1. RStudio Server: A web-based version of RStudio, an integrated development environment for the language R.
1. JupyterLab: A web-based interactive development environment which we will use for python.
1. Desktop: A virtual desktop which we will use to run the QGIS graphical user interface. 

**SLURM**

SLURM (Simple Linux Utility for Resource Management) is the workload manager used on the Ceres and Atlas HPC systems to allocate computational resources. From the [SLURM documentation](https://slurm.schedmd.com/quickstart.html), SLURM is “an open source… cluster management and job scheduling system for large and small Linux clusters. As a cluster workload manager, SLURM has three key functions. First, it allocates exclusive and/or non-exclusive access to resources (compute nodes) to users for some duration of time so they can perform work. Second, it provides a framework for starting, executing, and monitoring work (normally a parallel job) on the set of allocated nodes. Finally, it arbitrates contention for resources by managing a queue of pending work.” 

**Scientific Coding Languages - Python and R**

The tutorials in this workshop will use both R and Python due to previous working group survey results indicating that most members either use these languages or are interested in learning them. 



