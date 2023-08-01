---
title: Open OnDemand Interface Guide
description: Using Open OnDemand on the HPC
# author: VRSC
order_number: 40


categories: [Access]

subnav:
  - title: Access
    url: '#access'
  - title: Using
    url: '#using-ood'

---


[Open OnDemand](https://openondemand.org/) is an intuitive, innovative, and interactive interface to remote computing resources. The key benefit for SCINet users is that they can use any web browser, including browsers on a mobile phone, to access Ceres. <!--excerpt-->

---
## Access
If you are using Open OnDemand on the Atlas cluster, visit the [Atlas Open OnDemand Guide](https://www.hpc.msstate.edu/computing/atlas/ood.php).

To access Open OnDemand on the Ceres cluster, go to [Ceres OpenOndemand](http://ceres-ood.scinet.usda.gov/)
![screenshot of Open OnDemand Ceres login page]({{ site.baseurl }}/assets/img/guides/access/ood/ceres-loginpage.png)
The login page, titled SCINet Two Factor Login, prompts for your SCINet username and then your combined password and Google Authenticator code. If your password were `password` and your code were `123456`, your entry for this field would be:
```
password123456
```

---
## Using OOD
![screenshot of Open OnDemand Ceres Dropdowns Banner]({{ site.baseurl }}/assets/img/guides/access/ood/ceres-banner.png)
### Shell Access
To open a shell, select the **Clusters** dropdown menu and choose `>_Ceres Shell Access`. This will open a new tab with an interactive console session on the login node.

### Files
Open OnDemand includes a file manager. To open it, select the **Files** dropdown menu and choose the desired directory. Files can be uploaded, downloaded, viewed, and edited all from the web browser.

### Interactive Apps
Several interactive apps are available on Open Ondemand, and more can be added later. 

To launch an interactive app, select the **Interactive Apps** dropdown menu and choose the desired app. It will open the *My Interactive Sessions* page where settings for app can be selected such as the partition or app version to run. 
![screenshot of Open OnDemand Ceres interactive apps configuration page]({{ site.baseurl }}/assets/img/guides/access/ood/ceres-interactive-setup.png)
After selections have been made, pressing **Launch** will submit an interactive job. This job will be displayed as the topmost entry in the *My Interactive Sessions* page. The bottom of the intaractive app's job information card will display text saying the job is starting or, if it has already started, "Connect to `Interactive App Name`." Press the **Connect** button to launch the app in a new tab. 
![screenshot of Open OnDemand Ceres interactive apps job card with connect to button highlighted]({{ site.baseurl }}/assets/img/guides/access/ood/ceres-interactive-card.png)
### Logging Out
To log out of Ceres Open OnDemand, click the **Log Out** button. 
