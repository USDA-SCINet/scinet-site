---
title: "Tutorial: Applying Graph CNNs in disease ecology modeling"
description: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
excerpt: "This tutorial will illustrate a workflow using a Graph Convolutional Neural Network with LSTM layers (GLSTM model) to classify West Nile Virus disease presence or absence in horses across counties in a subset of states in the US."
 
categories: [2024 Geospatial Workshop] 

sidenav_link: /training/resources

time: 12:00 PM - 1:00 PM ET
lead: Amber Mooney
prerequisites:
  - text: Have a SCINet account and be able to login 
    url: /about/signup
  - text: Basic understanding of neural networks. 
  - text: Familiarity with Python and Jupyter notebooks. 
  - text: Familiarity with handling data in geopandas. 
---



This tutorial will illustrate a workflow using a Graph Convolutional Neural Network with LSTM layers (GLSTM model) to classify West Nile Virus disease presence or absence in horses across counties in a subset of states in the US.  

Additional details and instructions for the tutorial will be added closer to the event. A recording of the tutorial will be added after the workshop concludes. 


## Tutorial setup instructions

Steps to prepare for the tutorial sessions:

1. **Login to Ceres Open OnDemand** at [https://ceres-ood.scinet.usda.gov/](https://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Launch a JupyterLab Server session.** Under the *Interactive Apps* menu, select *Jupyter*. Specify the following input values on the page:

    * Account: geospatialworkshop
    * Queue: short---------Max Time: 2-00:00:00
    * QOS: 400thread
    * Number of hours: 2
    * Number of cores: 8
    * Memory required: 16 GB
    * Optional Slurm Arguments: \-\-reservation=workshop
    * Jupyter Notebook vs Lab: Lab
    * Working Directory: /90daydata/shared/${USER}
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. For the notebook used in the tutorial, select the *grwg_2024_env* kernel.

