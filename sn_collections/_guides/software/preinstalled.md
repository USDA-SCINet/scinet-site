---
title: Preinstalled Software
description: Software preinstalled on SCINet
excerpt: Each SCINet cluster has software preinstalled on it. Some general software is available in the global environment but most specialized scientific software is managed by the Module system.<br /> <br />This guide includes information about command-line software, as well as information on graphical software such as Galaxy, CLC, Geneious, RStudio, and Juptyer.
order_number: 10
categories: [Software]

sidenav:
  - title: Graphical Software
    url: '#graphical-software'
  - title: Command-line Software on SCINet Clusters
    url: '#command-line-software-on-scinet-clusters'
  - title: The command-line software I need is not on the list!
    url: '#the-command-line-software-i-need-is-not-on-the-list!'
  - title: Ceres Command-line Software Managed by the Module System
    url: '#ceres-command-line-software-managed-by-the-module-system'

table:
    position: back
    source: modules
    caption: List updated October 9, 2020. To generate this list run  <code>module avail</code>.

graphical-table:
  title: Graphical Software
  class: ""
  data:
    - Software: Galaxy Server
      Information: SCINet Runs its own <a href='https://galaxy.scinet.usda.gov'>Galaxy Server</a>.  Galaxy is an open source, web-based platform for data intensive bioinformatic research.
      url: /guides/analysis/galaxy
    - Software: CLC Server
      Information: SCINet has a license key to <a href='https://digitalinsights.qiagen.com/products-overview/discovery-insights-portfolio/enterprise-ngs-solutions/qiagen-clc-genomics-server/'>CLC Server</a>
      url: /guides/application/clc-workbench
    - Software: Geneious
      Information: SCINet has a license key to Geneious
      url: /guides/application/geneious
    - Software: Rstudio
      Information: SCINet runs a R studio Server
      url: /guides/ide/r-studio
    - Software: Jupyter
      Information:  <a href='https://jupyter.org/'>Project Jupyter</a> notebooks and Lab can be run on Ceres
      url: /guides/ide/jupyter


---

{% include table.html local='graphical-table' %}


## Command-line Software on SCINet Clusters

Each SCINet cluster has software preinstalled on it. Some general software is available in the global environment but most specialized scientific software is managed by the Module system. This software can be loaded with a command like
```
module load bamtools
```
or a specific version can be selected with
```
module load bamtools/2.5.1
```
Available modules are listed below in the section [Ceres Command-line Software Managed by the Module System](#ceres-command-line-software-managed-by-the-module-system).

### The command-line software I need is not on the list!

No problem. You have two options: 1) you can install the software yourself or 2) you can request the software be installed for you.

#### Option 1: Install the software yourself

The easiest way to do this is to use a [conda](https://docs.conda.io/en/latest/) environment. Often times installing the software you need is as easy as typing
```
conda create --name my_environment my_program
```
Thousands of biological packages and their dependencies can be installed with a single command using the Bioconda repository for the Conda package manager. You can also install a package directly from Github or elsewhere and compile it yourself. For more on installing Conda see [User-installed Software on Ceres with Conda]({{ site.baseurl }}/guides/software/conda).

You can also install and or compile software manually in your  `$HOME`  or  `$PROJECT`  directories. This is the fastest and easiest way to get your software.

#### Option 2: Request a new module be installed

If you need software that you think will be useful to many SCINet users you can request that the software be installed as a module. Doing this requires an agency-level security review and takes a few weeks. Modules can be requested with the software request form (eAuthentication required, non-ARS users should contact their sponsor):

[Software Request Form](https://apps.gov.powerapps.us/play/e/a3bf43b2-009c-43c2-9c4f-bcb2d87972fb/a/5b3265ab-3a98-4405-8557-01c1342690f7){: .usa-button .usa-button-big }

### Ceres Command-line Software Managed by the Module System

