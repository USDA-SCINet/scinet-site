---
title: Software Installation and Access
description: Guide to installing Software on SCINet
sorting: index
layout: "guides"
class: "guide-nav"


short_title: Software Installation and Access

categories: [Software]
order_number: 50
sorted: true
excerpt: "The login node provides access to a wide variety of scientific software tools that users can access and use via the module system. These software tools were compiled and optimized for use on SCINet by members of the Virtual Research Support Core (VRSC) team. Most users will find the software tools they need for their research among the provided packages and thus will not need to compile their own software packages. <br /> <br />To learn more about graphical software such as Galaxy, CSC, Geneious, RStudio, and Juptyer, please select the <a href='/guides/software/preinstalled'>Software Preinstalled on Ceres</a> guide"
---

The login node provides access to a wide variety of scientific software tools that users can access and use via the module system. These software tools were compiled and optimized for use on SCINet by members of the Virtual Research Support Core (VRSC) team. Most users will find the software tools they need for their research among the provided packages and thus will not need to compile their own software packages.

The popular R, Perl, and Python languages have many packages/modules available. Some of the packages are installed on Ceres and are available with the r/perl/python_2/python_3 modules. To see the list of installed packages, visit the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) page or use  `module help <module_name>`  command. If users need packages that are not available, they can either request VRSC to add packages, or they can download and install packages in their home/project directories. We recommend installing packages in the project directories since collaborators on the same project most probably would need the same packages. In addition, home quotas are much lower than project directories quotas. See the [Guide to Installing R, Python, and Perl Packages]({{ site.baseurl }}/guides/software/r-perl-python) for instructions and examples on how to add packages/modules for these languages.

If users would like to compile their own software with GNU compilers, they will need to load the gcc module. It is recommended to **compile on compute nodes and not on the login node**. However, before embarking on compiling their own software packages we strongly encourage users to contact the VRSC team to ensure that their required tool(s) might not be better distributed as a shared package within the official software modules tree. All new software needs to be approved by SOC committee before being centrally installed on the system. To request a new software package to be installed, visit the [Request Software]({{ site.baseurl }}/support/request#software-request) page.