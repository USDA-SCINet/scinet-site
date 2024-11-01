---

title: "Session 3: Fundamentals of parallel processing"
description: Fundamentals of parallel processing

excerpt: How to approach parallelization of workflows with a geospatial example
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 2:00pm-3:00pm MDT
    materials: 
      - text: You must have a USDA account to access this workshop's recordings.
      - text: Session recording
        url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%203%20-%20Fundamentals%20of%20parallel%20processing-20220928_023657.mp4?csf=1&web=1&e=lV5K5W&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

subnav:
  - title: Learning objectives
    url: '#learning-objectives'
  - title: Agenda
    url: '#agenda'


summarybox:
  header: Session Rules
  list:
    - point: <b>Chat questions/comments take first priority</b> - Chat your question/comments either to everyone (preferred) or to the chat moderator (Ryan Lucas) privately to have your question/comment read out loud anonymously. We will answer chat questions first and call on people who have written in the chat before we take questions from raised hands.
    - point: <b>Share your video when speaking</b> - If your internet plan/connectivity allows, please share your video when speaking.
    - point: <b>Keep yourself on mute</b> - Please mute yourself when not speaking.


---

<br>

## Learning objectives
<br>
{:.border-bottom}

The overall objective of this session is to provide a foundation in parallel processing terminology and HPC-usage basics before applying these concepts in the upcoming tutorials. Please see the links listed in Session 11 for additional parallel processing training opportunities.

* Define an 'embarassingly parallel' problem
* Apply a parallelization approach flowchart to a geospatial problem
* Describe the basic SLURM job submission parameters
* Identify the appropriate Ceres or Atlas partition for a job

## Agenda
<br>
{:.border-bottom}

This session will be a lecture with slides covering the following content:

* Trade-offs in parallel processing: effort, time, communication
* How to approach parallelization: a geospatial example
  * Determine where in your workflow the most time is spent 
  * Flow chart: parallelization approaches 
  * Choosing number of cores  
* SLURM jobs, nodes, and partitions

[Watch a recording of this presentation](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%203%20-%20Fundamentals%20of%20parallel%20processing-20220928_023657.mp4?csf=1&web=1&e=lV5K5W&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D). 
 

<br>