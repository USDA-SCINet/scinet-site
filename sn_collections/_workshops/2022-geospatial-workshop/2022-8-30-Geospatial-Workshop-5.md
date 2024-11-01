---

title: "Session 5: SCINet Geospatial Common Data Library"
description: SCINet Geospatial Common Data Library

excerpt: An overview of the status of the GeoCDL project and hands-on tutorials showcasing its features
categories: [2022 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial


sessions:
  - session: 
    time: 12:30pm-1:30pm MDT
    materials: 
      - text: You must have a USDA account to access this workshop's recordings.
      - text: Session recording
        url: https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%205%20-%20SCINet%20Geospatial%20Common%20Data%20Library-20221101_030251.mp4?csf=1&web=1&e=ZcaRJE&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D
      - text: Written tutortials
        url: https://geospatial.101workbook.org/ExampleGeoWorkflows/GRWG22_GeoCDL_R

    prerequisites:
      - text: Have a SCINet account and be able to login 
        url: /about/signup
      - text: Basic R or other basic programming skill helpful (expertise not required). 
      - text: Interactive environments will be used, so attending Session 4 may be helpful. 


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

The Geospatial Common Data Library (GeoCDL) is a community-driven product inspired by the computational needs discussions in the previous working group workshops. This effort is motivated by the desire to reduce duplication of effort across ARS scientists in downloading and curating large geospatial datasets, avoid the storage of duplicate data on HPC resources, and lower the barrier of entry to new users interested in leveraging SCINet computing resources to analyze large and complex geospatial data. This session will include tutorials using the pilot version of the GeoCDL on Ceres.

* Access the GeoCDL API via the *rgeocdl* R package 
* Query the API to list the datasets currently available
* Download raster data within an area of interest
* Download extracted raster data at points of interest

## Agenda
<br>
{:.border-bottom}

* Purpose and current status
* Interface options
* Tutorial 1: Area of interest
* Tutorial 2: Points of interest
* Discussion: desired datasets and features

<br>
## Tutorial material
<br>
{:.border-bottom}

[Watch a recording of this tutorial](https://usdagcc-my.sharepoint.com/:v:/r/personal/moe_richert_usda_gov/Documents/Stream%20Migrated%20Videos/SCINet%20Geospatial%20Working%20Group%20Workshop%202022%20-%20Session%205%20-%20SCINet%20Geospatial%20Common%20Data%20Library-20221101_030251.mp4?csf=1&web=1&e=ZcaRJE&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

A written version of this tutorial, modified to be accessible to any SCINet user,
is available on the [Geospatial Workbook](https://geospatial.101workbook.org/ExampleGeoWorkflows/GRWG22_GeoCDL_R).


<br>
