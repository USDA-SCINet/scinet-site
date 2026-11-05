---
title: RStudio
description: Using Rstudio
redirect_from: 
  - /guides/analysis/r-studio

categories: [IDE]

subnav:
  - title: RStudio Server on Ceres
    url: '#rstudio-server-on-ceres'
  - title: RStudio Server in Open OnDemand
    url: '#rstudio-server-in-open-ondemand'
    subnav:
      - title: Access Open OnDemand
        url: '#access-open-ondemand'
      - title: Launch an RStudio Session
        url: '#launch-an-rstudio-session'
      - title: Connect to RStudio
        url: '#connect-to-rstudio'
      - title: Reconnect to a Running Session
        url: '#reconnect-to-a-running-session'
      - title: Stop your RStudio Session
        url: '#stop-your-rstudio-session'

---

{% include images_path %}

[RStudio](https://www.rstudio.com/products/rstudio/) is an integrated development environment (IDE) for the R programming language, with limited support for other programming languages (including Python, bash, and SQL).<!--excerpt--> RStudio provides a powerful graphical environment for [importing data in a number of formats](https://support.rstudio.com/hc/en-us/articles/218611977-Importing-Data-with-RStudio) (including CSV, Excel spreadsheets, SAS, and SPSS); manipulating, analyzing, and visualizing data; version control with git or SVN; a graphical R package manager that provides point/click search/installation/uninstallation of R packages from its substantial ecosystem (including the Bioconductor repository, which provides almost 1500 software tools “for the analysis and comprehension of high-throughput genomic data.”); and [many other features](https://www.rstudio.com/products/rstudio/features/).

RStudio Server is a client/server version of RStudio that runs on a remote server and is accessed via the client’s web browser. A graphical file manager allows file upload/download from Ceres via web browser.

## RStudio Server on Ceres
RStudio Server is currently available on Ceres using a Docker image (imported into Singularity) provided by the Rocker project. The provided geospatial image provides not only geospatial libraries, but also LaTeX / publishing libraries, and Tidyverse data science libraries. Other R packages can be easily installed into your home directory from within RStudio.

Running RStudio Server on Ceres allows SCINet users to access any data on Ceres that they can access from the command line (SSH). 

SCINet users can run RStudio Server on Ceres through Open OnDemand.

A few Ceres-specific notes:
1. **RStudio terminal** (bash command shell): since RStudio Server is running in a container with a Debian base image, you won’t be able to access software environment modules (e.g., that you would normally see when logging into Ceres and issuing the  `module list`  command), as those are installed on the (CentOS) host.
2. **Data access:** your home directory is mounted inside the RStudio Server container, and the VRSC has configured Singularity to mount the /project directory.  $TMPDIR (which on a compute node is per-job local scratch on the compute node’s direct attached storage that gets deleted at the end of SLURM job) is mounted inside the container at /tmp.
3. **Software installation:** The provided SLURM job script creates a ~/.Renviron file in your home directory that allows RStudio to install additional R packages into your home directory (the container image is immutable). Installing a lot of R libraries may contribute to the default 30G soft limit quota on your home directory being surpassed. To overcome this issue you can move R directory from your home directory to your project directory and create a symbolic link to the new location. In RStudio click on "Terminal" and enter the following commands substituting your values:

```
cd
mkdir /project/<your_project_dir>/<account_name>
mv R /project/<your_project_dir>/<account_name>/
chgrp -R proj-<your_project_dir> /project/<your_project_dir>/<account_name>/R
chmod -R g+s /project/<your_project_dir>/<account_name>/R
ln -s /project/<your_project_dir>/<account_name>/R R
```

The ``mv`` and ``chgrp`` commands may take longer time depending on how much data you have in the R directory. You will need to restart R for this new location to take effect. In the "console" window type ``quit()`` and click on "Start New Session".

4. **Default working directory:** By default RStudio sets working directory to your home directory. You can change the default by clicking on Tools -> Global Options... In the General tab click on Browse, then on the three dots on the right and enter path to the folder, e.g. /project/<your_project_dir>. You can then navigate further to a subdirectory. When done click on "Choose" button, and then on "OK". This will be the default working directory that will show in the panel on the right next time you start RStudio or restart R in the RStudio.

## RStudio Server in Open OnDemand

Open OnDemand provides a web-based interface for accessing RStudio Server on Ceres. Follow the steps below to launch RStudio Server, connect to your session, and manage your computing resources.

### Access Open OnDemand

1. In your browser, go to [Ceres Open OnDemand](https://ceres-ondemand.scinet.usda.gov/).
2. Log in using the [SCINet GUI login instructions](/guides/access/web-based-login#accessing-web-based-interfaces)

### Launch an RStudio Session

1. After logging into Open OnDemand, click **Interactive Apps** in the top menu and select **RStudio Server**.
2. Review the form on the **My Interactive Sessions** page and modify the default values as needed,
3. Click **Launch** at the bottom of the page. The session will appear in the list of interactive sessions. It may take several minutes to start.

![Interactive Apps menu showing RStudio Server]({{ images_path }}/rstudio/ood-rstudio-menu.png)

![RStudio Server session launch form]({{ images_path }}/rstudio/ood-rstudio-form.png)

### Connect to RStudio

Once the session starts, a **Connect to RStudio Server** button will appear. Click the button to open the RStudio IDE in a new browser tab.

![Open OnDemand session card with Connect to RStudio Server button]({{ images_path }}/rstudio/ood-rstudio-connect.png)

### Reconnect to a Running Session

While the RStudio session is running, you can connect and disconnect from RStudio Server multiple times. Return to the **My Interactive Sessions** tab and click **Connect to RStudio Server** again. Each click opens a new browser tab. Closing an RStudio browser tab does **not** stop the allocated compute job.

### Stop Your RStudio Session

1. Save your work.
2. Return to the Open OnDemand **My Interactive Sessions** page.
3. Find your RStudio session and click the red **Cancel** button to end the session.

![Open OnDemand RStudio session card with Cancel button]({{ images_path }}/rstudio/ood-rstudio-cancel.png)

Once you click **Launch** and the session starts, the requested resources are allocated to your job and are not available to other users, even when you are not actively using RStudio. Please be considerate: request only the resources you need and delete your session when done.
