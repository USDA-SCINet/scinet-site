---
title: "Tutorial: Species distribution modeling with MaxEnt"
description: Provides hands-on tutorials on workflows to access the SCINet HPC systems and conduct geospatial research at scale and fosters geospatial research efforts.
excerpt: "During this session, we will explore the topic of species distribution / environmental niche modeling (SDM/ENM), with a particular focus on MaxEnt (maximum entropy), a popular SDM/ENM algorithm used to estimate species habitats from presence-only occurrence records. You will have an opportunity to put the concepts you’ve learned into practice by creating a species range map from real-world data in a hands-on MaxEnt workflow tutorial. "
 
categories: [2024 Geospatial Workshop] 

sidenav_link: /training/resources

time: 1:30 PM - 2:30 PM ET
lead: Melanie Veron
prerequisites:
  - text: Have a SCINet account and be able to login 
    url: /about/signup
  - text: Familiarity with R and the RStudio environment.

---


During this session, we will explore the topic of species distribution / environmental niche modeling (SDM/ENM), with a particular focus on MaxEnt (maximum entropy), a popular SDM/ENM algorithm used to estimate species habitats from presence-only occurrence records. You will have an opportunity to put the concepts you’ve learned into practice by creating a species range map from real-world data in a hands-on MaxEnt workflow tutorial. 

Additional details and instructions for the tutorial will be added closer to the event. A recording of the tutorial will be added after the workshop concludes. 


## Tutorial setup instructions

Steps to prepare for the tutorial sessions:

1. **Login to Ceres Open OnDemand** at [https://ceres-ood.scinet.usda.gov/](https://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

1. **Launch an RStudio Server session.** Under the *Interactive Apps* menu, select *RStudio Server*. Specify the following input values on the page:

    * Account: geospatialworkshop
    * Queue: short---------Max Time: 2-00:00:00
    * QOS: 400thread
    * R Version: 4.4.1
    * Number of hours: 2
    * Number of cores: 8
    * Memory required: 16GB
    * Optional Slurm Arguments: \-\-reservation=workshop
  
    Click *Launch*. The screen will update to the *Interactive Sessions* page. When your Jupyter session is ready, the top card will update from *Queued* to *Running* and a *Connect to RStudio Server* button will appear. Click *Connect to RStudio Server*.

