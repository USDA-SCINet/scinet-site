---
title: Request Resources
description: request scinet resources
permalink: /support/request
layout: page

subnav:
  - title: Project Request
    url: '#project-request'
    subnav:
      - title: Request a New SCINet Project
        url: '#to-request-a-new-scinet-project'
      - title: Modify an Existing SCINet Project
        url: '#to-modify-an-existing-scinet-project'
      - title: Request a Quota Increase for an Existing SCINet Project
        url: '#to-request-a-quota-increase-for-an-existing-scinet-project'
  - title: Software Request
    url: '#software-request'
  - title: AWS Request
    url: '#aws-request'
    subnav: 
      - title: Add/Modify AWS Resources 
        url: '#to-add/modify-aws-resources-for-an-existing-scinet-project'
      - title: Request a New AWS Project 
        url: '#to-request-a-new-scinet-funded-aws-project'

---

Below are instructions for how to make a request for a SCINet project, new software, or AWS resources.

## Project Request
---

When a user applies for a SCINet account, they are allocated space on Ceres and Atlas in a home directory (/home/\<username>/). Each user is allowed 15 GB of data in their home directory.

Users are advised to request additional storage space with a SCINet project. SCINet project storage allocations are located in project directories: /project/\<projectname>/ on Ceres and Atlas and /LTS/project/\<projectname>/ on Juno. Project storage allocation sizes, or storage 'quotas', can be requested to be as large as you need to support your work and can be different on each system, e.g., larger on Juno than Ceres or Atlas if you have more data to store long term than process at a given time. SCINet projects also come with a /90daydata directory (/90daydata/\<projectname>/) that is useful for storing intermediate files.

Requests for new projects or changes to existing projects must be submitted by the project’s Principal Investigator (PI) who needs to be a full-time ARS employee. 

### To Request a New SCINet Project
When requesting a new project, you will be asked for details including:
* a project summary, 
* requested storage amounts, and
* other SCINet users who you want to have access to the project. 

To request a new project, please fill out the request form (eAuthentication required, non-ARS users should contact their sponsor):

[Request a Project](https://forms.office.com/g/wD9rYarVyn){: .usa-button .usa-button-big }

### To Modify an Existing SCINet Project
If changes need to be made to an existing SCINet project, e.g., adding a new member, the project's PI should send an email that includes:
* the name of the project directory (/project/\<projectname>/) and 
* the requested changes 

to the SCINet Virtual Research Support Core (VRSC) [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=modify%20project%20allocation).

### To Request a Quota Increase for an Existing SCINet Project
When requesting a project quota increase on Ceres or Atlas, you will be asked to briefly explain why using /90daydata and/or permanent storage on Juno does not cover your storage needs.  

To request a project quota increase for storage on Ceres, Atlas and/or Juno, please have the project PI or manager fill out the following request form:

[Request a Project Quota Increase](https://forms.office.com/g/ntnKBzJiKx){: .usa-button .usa-button-big }



<br>

## Software Request
---
### Before sending VRSC a software request do the following:

1. Make sure the software isn't already available as a module by checking the lists of module software on the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) page.

   If you only need a different version of a software package that is already installed on CERES please email [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=software%20request%20-%20add%20different%20version).

2. Consider whether you should install the software yourself in your home or project directory - see the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) for more details.

   You may want to use Conda for package, dependency, and environment management- see this [guide about how to use conda on SCINet]({{ site.baseurl }}/guides/software/conda).

   If you're not sure whether you should install software yourself or if you need help, email [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=help%20with%20software). Software that will be useful to many SCINet users should be installed as a module by the VRSC.


### How to send a software request
If you've done the above but need new software installed as a module, use the software request form (eAuthentication required, non-ARS users should contact their sponsor):

[Software Request Form](https://apps.gov.powerapps.us/play/e/a3bf43b2-009c-43c2-9c4f-bcb2d87972fb/a/5b3265ab-3a98-4405-8557-01c1342690f7){: .usa-button .usa-button-big }

**Note: doing this requires an agency-level security review and takes a few weeks.**

<br>

## AWS Request
---
SCINet provides AWS at no cost to SCINet users with suitable workloads. A limited amount of funding is available annually. Interested SCINet users must submit a SCINet AWS Project Request to be considered for AWS funding.

### To Add/Modify AWS Resources for an Existing SCINet Project 
Send an email that includes:
* the name of the project directory (/project/\<projectname>/) and 
* the requested changes

to the SCINet Virtual Research Support Core [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=add%20AWS%20to%20SCINet%20project). 

This includes requests for additional funding.


### To Request a New SCINet-funded AWS Project 
Fill out an application form (eAuthentication required, non-ARS users should contact their sponsor)

[Request AWS Project](https://usda-scinet.atlassian.net/servicedesk/customer/portal/4/group/13/create/63){: .usa-button .usa-button-big }

Requests will be reviewed and projects funded based on criteria such as suitability for AWS versus other SCINet computing resources (e.g., Ceres, Atlas), resource requirements estimated from the project description, and availability of SCINet funding.
