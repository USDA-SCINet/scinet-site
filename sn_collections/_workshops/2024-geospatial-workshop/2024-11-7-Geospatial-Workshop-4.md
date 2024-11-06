---
title: "Tutorial: Using xarray to work with multidimensional geospatial datasets"
description: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
excerpt: "In this tutorial you will learn the basic concepts of the Python library `xarray` while exploring its capabilities when working with multidimensional datasets with dimensions of time, latitude, and longitude. We will also touch on the capabilities of parallel processing using another Python library called `dask`."
 
categories: [2024 Geospatial Workshop] 

sidenav_link: /training/resources

time: 1:15 PM - 2:45 PM ET
lead: Erika Peirce
prerequisites:
  - text: Have a SCINet account and be able to login 
    url: /about/signup
  - text: Familiarity with Python and Jupyter notebooks. 
  - text: Familiarity with handling data using pandas.  
---

In this tutorial you will learn the basic concepts of the Python library `xarray` while exploring its capabilities when working with multidimensional datasets with dimensions of time, latitude, and longitude. We will also touch on the capabilities of parallel processing using another Python library called `dask`. 

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
    * Memory required: 16GB
    * Optional Slurm Arguments: \-\-reservation=workshop
    * Jupyter Notebook vs Lab: Lab
    * Working Directory: /90daydata/shared/${USER}
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to Jupyter* button will appear. Click *Connect to Jupyter*.

1. For the notebook used in the tutorial, select the *grwg_2024_env* kernel.

