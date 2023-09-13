---

title: "Session 1: Kickoff with lightning talks"

excerpt: Introduction to the workshop plus lightning presentations from ARS researchers and SCINet Fellows on their research
categories: [2023 Geospatial Workshop]  
provider: Geospatial Working Group
type: workshop
tags: Geospatial
layout: page

sessions:
  - session: 
    time: 11:00am-1:30pm EDT
#    materials: 
#      - text: You must have a USDA account to access this workshop's recordings.
#      - text: Session recording
#        url: https://web.microsoftstream.com/video/d4cac1a5-bafc-409d-b8fd-fd7127a262a8

subnav:
  - title: What is the SCINet Geospatial Research Working Group?
    url: '#what-is-the-scinet-geospatial-research-working-group'
  - title: Review of previous workshops
    url: '#review-of-previous-workshops'
  - title: Overview presentation
    url: '#Overview-presentation'
  - title: Lightning talks
    url: '#lightning-talks'

---

<br>

## Agenda
{:.border-bottom}

* Overview presentation: describe past workshops, current goals, and overview of sessions
* Lightning presentations on the intersection of geospatial analyses, machine learning, and deep learning in ARS research
* Discussion about the use of machine learning and deep learning in our geospatial research



<br>

## What is the SCINet Geospatial Research Working Group?
{:.border-bottom}

See our [working group page]({{ site.baseurl }}/research/working-groups/geospatial) for general information about the working group. 

Our main goals are to:
* provide continued input on the development of SCINet,
* improve the computational capacity of ARS geospatial researchers, and
* develop collaborative research projects.

The goals of the 2023 workshop are to:
* provide hands-on learning on how to incorporate machine learning and deep learning in geospatial research,
* foster research efforts that had previously been un-attainable due to technical limitations or inexperience, and
* inspire new working group objectives.

<br>

## Review of previous workshops
{:.border-bottom}

### 2019 Workshop (Las Cruces, NM)

At the 2019 workshop, we heard from ARS scientists about successes and challenges of using SCINet for geospatial analysis, identified common issues and barriers to using SCINet for geospatial research workflows, generated recommendations for overcoming these issues/barriers, created the SCINet Geospatial Research Working Group to follow through with workshop recommendations, and learned about machine learning, deep learning, and some of the ways ML/DL are being used for research at New Mexico State University and the Jornada Experimental Range.

### 2020 Workshop (Virtual)

The 2020 Workshop was planned following the key needs identified in the community in 2019 workshop. The workshop opened with short introductions of the first cohort of SCINet postdocs and a discussion on the status and needs for the SCINet geospatial common data library and workbooks. Participants were introduced to the Ceres HPC and worked through several tutorials ranging in complexity from the basic various ways to run jobs on Ceres, to running on clusters in parallel, reproducible research best practices, and a real world example of running an analysis on Ceres. Most of these tutorials were in a Python and JupyterLab framework. The workshop closed with seminars and a panel of researchers in academia and industry discussing their machine learning workflows to improve agricultural practices.

### 2022 Workshop (Virtual)

The [2022 Workshop]({{ site.baseurl }}/events/2022-08-25-Geospatial-Workshop) was designed to help reduce the barrier to entry in migrating geospatial workflows to SCINet resources. Presentations and tutorials focused on showcasing how to perform basic geospatial operations and analyses in R and Python, discern which operations are embarassingly parallel, employ basic parallel processing options in R and Python, submit SLURM jobs, and use the interactive environments available via Open OnDemand. 

# Overview presentation
A recording of the working group and workshop overview presentation will be made available here after the end of the workshop. 

# Lightning talks

The tentative schedule of lightning talks is as follows:

{: .usa-table .usa-table--compact }
Presenter | Topic
---|---
Amira Burns | I develop and maintain CameraTrapDetectoR, a fleet of deep learning object detection models that classify and count animals in camera trap images. The models are deployed within an R package, which also contains helpful organizational and post-processing tools.
Noa Mills | My research focuses on using deep learning tools to identify agricultural field boundaries in satellite imagery. I am currently in the process of transitioning from using the Rastervision framework to torchgeo to use instance segmentation, which is not supported by rastervision. The biggest issue I face in my research is noisy data.
Andrea Albright | UAS image processing using ODM on the HPC
Piyush Pandey | I will present my work in using deep learning models for object detection with UAV images. I have used several approaches to accomplish this including the creation of synthetic training images. I will present tools that may be useful for researchers trying to identify objects and extract traits from UAV imagery.
Laura Tibbs-Cortes | Switchgrass is not only a native North American prairie grass, but also a biofuel crop, and its response to climate change will have impacts on both conservation and agriculture. This project identifies genetic and environmental factors affecting important fitness and agronomic traits in switchgrass including flowering time, biomass, and winter survival. These results, combined with future climate predictions, indicate that a major shift in the distribution of switchgrass subpopulations is likely by the end of this century as warming temperatures alter the competitive advantage of alleles.
Kevin Li | Landscapes can support multiple ecosystem services, or benefits from nature to people. The requirements for these ecosystem services may result in trade-offs and synergies when considering alternative landscape scenarios. The goal of our project is to use machine learning to identify scenarios that optimize multiple ecosystem services within a landscape.
Dalmo Vieira | A methodology was developed to estimate soil erosion for large watersheds using machine learning and RUSLE2.  The approach uses improved terrain analysis methods to define surface runoff patterns and subdivide the study area into hillslopes for erosion calculation.  Machine learning was used to speed up RUSLE2 erosion calculations by a factor of 65,000, allowing for the production of erosion maps for very large areas at 10-meter resolution.
James Zollweg | Using the principle of soil thermal inertia to measure soil moisture from remote sensing data.
Lucas Heintzman | Ditch networks enhance field drainage, mediate runoff contamination, and are crucial habitat for species. However, our understanding of ditch networks (and associated ecological dynamics) has been constrained due to private land access and insufficient elevation models. Thus, our project aims to develop a regional classification and accounting system to accurately delineate and quantify ditch networks via LiDAR and ML.
Zhanyou Xu | Machine and deep learning for root system architecture classification and selection
Amy Hudson | Generating random disease movement and identifying what environmental conditions are different between random possibilities and observed spread

A recording of the lightning talks will be made available here after the end of the workshop. 


<br>