---
title: Web-Based Access to SCINet
description: Instructions for web-based access to SCINet
categories: [Access]
order_number: 2
layout: guides

redirect_from: 
  - /guides/access/gui

guidegroup:
    section: GUIs
manual_subnav: 'true'
#author: VRSC and Jordan Hoosman

GUIs:
  - title: Open OnDemand Interface
    url: /guides/use/open-ondemand
    internal: true
  - title: Galaxy on SCINet
    url: /guides/application/galaxy
    internal: true
  - title: Globus Online
    url: /guides/data/datatransfer#globus-data-transfer
    excerpt: "Globus Online is the recommended method for transferring data to or among Ceres, Atlas, and Juno. It provides faster data transfer speeds compared to scp, has a graphical interface, and does not require authentication for every file transfer. To transfer data to or from a local computer, users will need to install Globus Connect Personal which does NOT require admin privileges."
    internal: true

subnav:
  - title: Accessing Web-Based Interfaces
    url: '#accessing-web-based-interfaces'
  - title: Available Web-Based Interfaces
    url: '#available-web-based-interfaces'
    subnav:
      - title: Open OnDemand Interface
        url: '#open-ondemand-interface'
      - title: Galaxy on SCINet
        url: '#galaxy-on-scinet'
      - title: Globus Online
        url: '#globus-online'

excerpt: "<p><strong>How to access SCINet's web-based user interfaces.</strong></p>
<div>
SCINet offers three main web-based interfaces:

      <ul>
        <li>Open OnDemand
          <ul>
            <li><a href='http://ceres-ood.scinet.usda.gov/' target='_blank' class=' usa-link--external' rel='noreferrer'>Open OnDemand for Ceres</a></li>
            <li><a href='https://atlas-ood.hpc.msstate.edu/' target='_blank' class=' usa-link--external' rel='noreferrer'>Open OnDemand for Atlas</a></li>
          </ul>
        </li>
        <li>Galaxy
          <ul>
            <li><a href='https://galaxy.scinet.usda.gov' target='_blank' class=' usa-link--external' rel='noreferrer'>Galaxy for Ceres</a></li>
          </ul>
        </li>
        <li><a href='https://www.globus.org/' target='_blank' class=' usa-link--external' rel='noreferrer'>Globus</a> (for file transfers)</li>
      </ul>
</div>

"
#fetched: "login-help"
---

{% include images_path %}



<div class="usa-summary-box" role="region" aria-labelledby="key-information">
  <div class="usa-summary-box__body">
    <h3 class="usa-summary-box__heading" id="key-information">
      SCINet offers three main web-based interfaces:
    </h3>
    <div class="usa-summary-box__text"  markdown='1'>

* **Open OnDemand**
  * [Open OnDemand for Ceres](http://ceres-ood.scinet.usda.gov/)
  * [Open OnDemand for Atlas](https://atlas-ood.hpc.msstate.edu/)
* **Galaxy**
  * [Galaxy for Ceres](https://galaxy.scinet.usda.gov)
* [**Globus**](https://www.globus.org/) (for file transfers)

See ["Available Web-Based Interfaces"](#available-web-based-interfaces) below for more information about using SCINet's web-based interfaces.

</div>
</div>
</div>

## Accessing Web-Based Interfaces

The process for logging on to SCINet via Open OnDemand or Galaxy is the same. The process is also the same for Globus, but you access this login method by selecting "SCINet - ARS/USDA" from the organization drop-down menu on the Globus Login page. 

* To access SCINet's web-based interfaces, start by following the relevant link below.
  * Open OnDemand:
    * [Open OnDemand for Ceres](http://ceres-ood.scinet.usda.gov/)
    * [Open OnDemand for Atlas](https://atlas-ood.hpc.msstate.edu/)
  * Galaxy
    * [Galaxy for Ceres](https://galaxy.scinet.usda.gov)
  * [Globus](https://www.globus.org/) (for file transfers) 

* You will be presented with the USDA eAuthentication login page.  
  ![SCINet login page]({{ images_path }}/eAuth_login1.PNG)
  
* Select the login option that is appropriate for you (Sponsored, non-USDA SCINet users should choose "Customer"):
  * If you have a LincPass/AltLinc, you will authenticate as usual with eAuth. 
  * If you _do not_ have a LincPass/AltLinc:
    * Sponsored, non-USDA SCINet users will authenticate using Login.gov. Please see the [detailed instructions for logging on to SCINet using Login.gov](/guides/access/login/alt-login#non-usda-users---logingov).
    * USDA employees without a LincPass/AltLinc should enroll in Windows Hello for Business or apply for a PIV Exemption. More detailed information is available in the [Alternative Login guide](/guides/access/login/alt-login#usda-users-without-a-lincpassaltlinc).
* After successful authentication, you will automatically be redirected to Open OnDemand, Galaxy, or the Globus file management interface.

If you have further questions or issues, please email [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
 

## Available Web-Based Interfaces

Please see below for more information about using SCINet's web-based interfaces. 
