---
title: Web-Based Access to SCINet
description: Instructions for web-based access to SCINet
categories: [Access]
order_number: 2
layout: guides
layout_type: guides

guidegroup:
    section: GUIs
manual_subnav: 'true'
#author: VRSC and Jordan Hoosman

GUIs:
  - title: Open OnDemand Interface
    url: /guides/software/open-ondemand
    internal: true
    shows_list: subnav
  - title: Galaxy on SCINet
    url: /guides/software/galaxy
    internal: true
    shows_list: subnav

subnav:
  - title: GUI Login
    url: '#gui-login'
    subnav:
      - title: Accessing Using LincPass
        url: '#accessing-using-lincpass'
      - title: Accessing Using login.gov
        url: '#accessing-using-logingov'
  - title: Available GUI Interfaces
    url: '#available-gui-interfaces'
    subnav:
      - title: Open OnDemand Interface
        url: '#open-ondemand-interface'
      - title: Galaxy on SCINet
        url: '#galaxy-on-scinet'

excerpt: How to access SCINet's web-based user interfaces (Open OnDemand and Galaxy).
---

## Web-based SCINet interfaces

SCINet offers three main web-based interfaces:
* Open OnDemand
  * [Open OnDemand for Ceres](http://ceres-ood.scinet.usda.gov/)
  * [Open OnDemand for Atlas](https://atlas-ood.hpc.msstate.edu/)
* [Galaxy](https://galaxy.scinet.usda.gov)
* [Globus](https://www.globus.org/) (for file transfers)

See ["Available Web-Based Interfaces"](#available-web-based-interfaces), below, for more information about using SCINet's web-based interfaces.

The process for logging on to SCINet via Open OnDemand or Galaxy is the same. Because Globus is not hosted on SCINet systems, it [uses a different login procedure](/guides/data/datatransfer#globus-data-transfer). To log on to Open OnDemand or Galaxy, start by following the relevant link above.

* You will initially be presented with the SCINet login page:

![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/linpassorlogingov.png)

* Choose "Login.gov or USDA LincPass" as your sign-in option.
  * If you have a LincPass/AltLinc or PIV Exemption, you will authenticate as usual with eAuth.
  * If you _do not_ have a LincPass/AltLinc or PIV Exemption, you will authenticate using Login.gov. Please see the [detailed instructions for logging on to SCINet using Login.gov](/guides/access/login/logingov).
* After successful authentication, you will automatically be redirected to Open OnDemand or Galaxy.

If you have further questions or issues, please email [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
 

## Available Web-Based Interfaces

Please see below for more information about using SCINet's web-based interfaces. 
