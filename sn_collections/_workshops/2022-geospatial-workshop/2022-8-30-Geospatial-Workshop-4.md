---

title: "Session 4: SCINet interactive environments"
description: SCINet interactive environments

excerpt: An overview of interactive environments available on SCINet - RStudio, Jupyter, etc.
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 10:00am-12:00pm MDT
    materials: 
      - text: You must have a USDA account to access this workshop's recordings.
      - text: Session recording
        url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%204%20-%20Interactive%20Environments-20221213_053646.mp4?csf=1&web=1&e=uRGSOs&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic understanding of partitions and requesting cores. If you are unfamiliar with these topics, please attend Session 3 on parallel processing fundamentals.


subnav:
  - title: Learning objectives
    url: '#learning-objectives'
  - title: Agenda
    url: '#agenda'
  - title: Tutorial material
    url: '#tutorial-material'

summarybox:
  header: Session Rules
  list:
    - point: <b>Green Light, Red Light</b> - Use the Zoom participant feedback indicators to show us if you are following along successfully as well as when you need help. To access participant feed back, click on the “Participants” icon to open the participants pane/window. Click the green “yes” to indicate that you are following along successfully, click the red “no” to indicate when you need help. Ideally, you will have either the red or green indicator displayed for yourself throughout the entire tutorial. We will pause every so often to work through solutions for participants displaying a red light.
    - point: <b>Chat questions/comments take first priority</b> - Chat your question/comments either to everyone (preferred) or to the chat moderator (Ryan Lucas) privately to have your question/comment read out loud anonymously. We will answer chat questions first and call on people who have written in the chat before we take questions from raised hands.
    - point: <b>Share your video when speaking</b> - If your internet plan/connectivity allows, please share your video when speaking.
    - point: <b>Keep yourself on mute</b> - Please mute yourself when not speaking.

---

<br>

## Learning objectives
<br>
{:.border-bottom}

Many of us typically develop our geospatial processing workflows in Integrated Development Environments (IDEs), e.g. RStudio, or other Graphical User Interfaces (GUIs). In the past, using HPC resources required connecting to the cluster, transferring files, and submitting jobs to be all done in Unix commands. Although that is still an option, there are now many options for web access to HPC resources using applications to which users are 
accustomed. This session will cover a few geospatial-relevent applications available via Open OnDemand portals on Ceres and Atlas.

* Launch an interactive session of RStudio and JupyterLab on Ceres from your web browser
* Launch an interactive desktop session on Ceres from your web browser and run QGIS 
* Identify scenarios when interactive environments are or are not advantageous

<br>
## Agenda
<br>
{:.border-bottom}

This is the first interactive tutorial session. We will be accessing the interactive environments available via [Open OnDemand on Ceres](https://ceres-ood.scinet.usda.gov/). There will be a few introductory slides, a period of screen-sharing to navigate the portal in a browser window, and then example scripts to execute within the environments.  We will cover the following content:

* When to use interactive environments (advantages and limitations) 
* Overview of Open OnDemand layout and Ceres/Atlas specifics
* Launch parameters 
* RStudio 
* Jupyter
* Desktops with QGIS

A recording of this presentation and discussion summary notes will be made available here after the workshop is complete.

<br>
## Tutorial material
<br>
{:.border-bottom}

[Watch a recording of this presentation](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%204%20-%20Interactive%20Environments-20221213_053646.mp4?csf=1&web=1&e=uRGSOs&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)


<br>
