---

title: "Session 1: Introduction to SCINet with lightning presentations"
description: Introduction to SCINet with lightning presentations

excerpt: Introduction to the workshop objectives plus lightning presentations on geospatial workflows
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 10:00am-11:00am MDT
    materials: 
      - text: You must have a USDA account to access this workshop's recordings.
      - text: Session recording
        url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%201%20-%20Introduction%20to%20SCINet-20221003_091307.mp4?csf=1&web=1&e=Y2BaUB&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D


# alerts: 
#   - alert: 
#     type: info
#     slim: true
#     text: Zoom session recording (USDA eAuthentication required)
#    url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%201%20-%20Introduction%20to%20SCINet-20221003_091307.mp4?csf=1&web=1&e=Y2BaUB&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D
#   - alert:
#     type: info
#     slim: true
#     text: Zoom session chat
#    url: https://kerriegeil.github.io/SCINET-GEOSPATIAL-RESEARCH-WG/docs/2020-08-25_SCINet-Geospatial-WG_Workshop-Session1-Annual-Meeting_CHAT.txt

subnav:
  - title: What is the SCINet Geospatial Research Working Group?
    url: '#what-is-the-scinet-geospatial-research-working-group'
  - title: Review of previous workshops
    url: '#review-of-previous-workshops'
  - title: Lightning talks
    url: '#lightning-talks'

summarybox:
  header: Session Rules
  list:
    - point: <b>Chat questions/comments take first priority</b> - Chat your question/comments either to everyone (preferred) or to the chat moderator (Ryan Lucas) privately to have your question/comment read out loud anonymously. We will answer chat questions first and call on people who have written in the chat before we take questions from raised hands.
    - point: <b>Share your video when speaking</b> - If your internet plan/connectivity allows, please share your video when speaking.
    - point: <b>Keep yourself on mute</b> - Please mute yourself when not speaking.


---

<br>

## Agenda
<br>
{:.border-bottom}

* Overview of SCINet resources
* Introduce SCINet office, organizing committee, and helpers 
* Describe past workshops, current goals, and overview of sessions
* Lightning presentations on geospatial workflows

## What is the SCINet Geospatial Research Working Group?

<br>
{:.border-bottom}

See our [working group page]({{ site.baseurl }}/research/working-groups/geospatial) for general information about the working group. 

Our main goals are to:
* provide continued input on the development of SCINet,
* improve the computational capacity of ARS geospatial researchers, and
* develop collaborative research projects.

The goals of the 2022 workshop are to:
* provide hands-on learning on how to modify geospatial research workflows to take advantage of SCINet HPC systems,
* foster research efforts that had previously been un-attainable due to technical limitations or inexperience, and
* inspire new working group objectives.



## Review of previous workshops

<br>
{:.border-bottom}

### 2019 Workshop (Las Cruces, NM)

At the 2019 workshop, we:
* heard from ARS scientists about successes and challenges of using SCINet for geospatial analysis,
* identified common issues and barriers to using SCINet for geospatial research workflows,
* generated recommendations for overcoming these issues/barriers,
* created the SCINet Geospatial Research Working Group to follow through with workshop recommendations, and
* learned about machine learning, deep learning, and some of the ways ML/DL are being used for research at New Mexico State University and the Jornada Experimental Range.

The resulting recommendations for improving access to SCINet HPC/cloud computing and enhancing general computational skill in the ARS geospatial research community are as follows:

A) Improve data access, sharing, and storage.

* Implement better methods for getting massive input data into the computational environment.
* Build/expand higher speed connections to SCINet.
* Build a common data library on SCINet to reduce duplication of popular datasets and reduce the barrier to adopting HPC workflows.
* Hold trainings in data management for long-term datasets and archiving of data from retired scientists.

B) Enhance reproducibility of our science and increase collaboration.

* Hold trainings on using Git, containers, and other reproducibility tools.
* Hold hands-on group work sessions in R and Python.

C) Build capacity for using HPC/cloud computing.

* Hold trainings on how to access and compute on the SCINet HPC systems (including how to parallelize code) to reduce the learning curve.
* Develop a collection of tutorials from ag/geo-relevant applications with example scripts that run on the SCINet HPCs, including ML/DL techniques. (Geospatial Workbook)
* Hire personnel, including postdocs, with multi-disciplinary computational backgrounds.
* Hold trainings in R, Python, and Unix through The Carpentries or similar.
* Repeat the 2019 AI Training by Adam Rivers and University of Florida collaborators.
* Hold trainings in image processing.

D) Expand SCINet HPC system software, hardware, and support to focus on our research community needs.

* Contract a “GeoTeam” that would help our research community with workflow development, parallelization, and code optimization.
* Deploy a better forum for searchable SCINet questions/answers.
* Purchase community GPUs when the priority GPU gets to be a limited resource.
* Install Pix4D Engine software on SCINet.

### 2020 Workshop (Virtual)

The 2020 Workshop was planned following the key needs identified in the community in 2019 workshop. The workshop opened with short introductions of the first cohort of SCINet postdocs and a discussion on the status and needs for the SCINet geospatial common data library and workbooks. Participants were introduced to the Ceres HPC and worked through several tutorials ranging in complexity from the basic various ways to run jobs on Ceres, to running on clusters in parallel, reproducible research best practices, and a real world example of running an analysis on Ceres. Most of these tutorials were in a Python and JupyterLab framework. The workshop closed with seminars and a panel of researchers in academia and industry discussing their machine learning workflows to improve agricultural practices.


# Lightning talks

[Watch a recording of this presentation and lightning talks](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%201%20-%20Introduction%20to%20SCINet-20221003_091307.mp4?csf=1&web=1&e=Y2BaUB&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D). 


<br>