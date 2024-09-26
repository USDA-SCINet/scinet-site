---
title: FAQs
description: Frequently asked Questions
permalink: /support/faq
author: VRSC
layout: page

subnav:
  - title: General Information
    url: '#general-information'
  - title: Accounts & Login
    url: '#accounts--login'
  - title: Software
    url: '#software'
  - title: Storage Space
    url: '#storage-space'
  - title: Data Transfer
    url: '#data-transfer'
  - title: Support, Policy, O&M
    url: '#support-policy-om'
  - title: Parallel Computing
    url: '#parallel-computing'
  - title: Technical Issues
    url: '#technical-issues'


---


## General Information
---
### What is the difference between Ceres and SCINet?
SCINet is a high-speed network connecting equipment like compute servers, data transfer nodes, scientific instruments, and workstations. Ceres is a high-performance compute cluster at the Ames location that is accessible to all SCINet users.

### Who is eligible for a SCINet account?
ARS employees and those collaborators that are covered under a formal agreement with the ARS.

### How do I find documentation on Ceres and SCINet?
The most up-to-date documentation is available on this website although some information is still in the process of being posted. If you can’t find what you need here, please also check the [SCINet Forum](https://forum.scinet.usda.gov) (must have SCINet account to access).

### How much does a Ceres account cost?
Ceres is currently free to USDA-ARS researchers and collaborators.

### How much does Amazon Web Services (AWS) cost?
SCINet provides AWS at no cost to SCINet users with suitable workloads. A limited amount of funding is available annually. Interested SCINet users must submit a [SCINet AWS Project Request]({{ site.baseurl }}/support/request#aws-request) to be considered for AWS funding.

### Who manages SCINet?
Day to day operations and user support are provided by the Virtual Research Support Core (see [What is the Virtual Research Support Core (VRSC)?](#what-is-the-virtual-research-support-core-vrsc)). Higher level policy and development are managed by the SCINet Executive Committee, including the SCINet program manager Rob Butler, with input from the Scientific Advisory Committee (SAC; see [What is the Scientific Advisory Committee (SAC)?](#what-is-the-scientific-advisory-committee-sac))

### Who can I contact for help using SCINet?
Single user operational questions should be emailed to the VRSC scinet_vrsc@usda.gov (see also [How do I contact the VRSC for assistance?](#how-do-i-contact-the-vrsc-for-assistance)).

Discussion that is relevant to other SCINet users such as questions about the best practices for research computations should be posted on the SCINet VRSC Forum. Access to [SCINet Forum](https://forum.scinet.usda.gov) is provided during the SCINet account application process.

Policy and development questions should be directed to the SCINet program manager, Rob Butler, or to your area representatives on the SCINet Scientific Advisory Committee (SAC), see the [SCINet Organization]({{ site.baseurl }}/about/organization) page.

### How do I use Basecamp?
Basecamp  has been replaced by [SCINet Forum](https://forum.scinet.usda.gov). SCINet documentation previously available on Basecamp can now be found in the User Guides section of the [SCINet website]({{ site.baseurl }})/guides.

### How do I acknowledge SCINet in my publications?

Add the following sentence as an acknowledgment for using SCINet/Ceres as a resource in your manuscripts or datasets meant for publication:

“This research used resources provided by the SCINet project and/or the AI Center of Excellence of the USDA Agricultural Research Service, ARS project numbers 0201-88888-003-000D and 0201-88888-002-000D.”


## Accounts & Login
---
### How do I get an account (I am an ARS employee)?
Please fill out the [SCINet Account Request Form]({{ site.baseurl }}/about/signup). The request will be forwarded to your supervisor for approval. You may want to notify your supervisor so they are aware of the incoming email that requires a response. Once your supervisor has granted approval, an account will be created for you and you will receive an email from the Virtual Research Support Core (VRSC) with logon information.

### How do I get an account for non-ARS collaborators, students, or postdocs?
All students, postdocs, visiting scientists, and collaborators must have an ARS sponsor. All requests must also be approved by the Research Leader.

Please fill out the [Non-ARS SCINet Account Request Form]({{ site.baseurl }}/about/signup). The request will be forwarded to the sponsor’s supervisor for approval. You may want to notify your supervisor so they are aware of the incoming email that requires a response.

Collaborators also have access to this website for user guides and upon account approval, access to the VRSC for operational assistance and the [SCINet VRSC Forum](https://forum.scinet.usda.gov) user forum for user discussion. 

### How do I reactivate my account?
Users whose accounts have been deactivated for inactivity will need to submit a new [SCINet account request form]({{ site.baseurl }}/about/signup).

If you have questions, please email the VRSC: scinet_vrsc@usda.gov

### How do I reset or change my password?
If your password is expired you should be prompted to change your password when you attempt to login. If you are still able to login, do so and type "passwd" you will be prompted for your old password and asked for a new one.

[Read more about logging in to SCINet and changing your password here]({{ site.baseurl }}/guides/access).

[Watch a video demonstration of changing your password here](https://www.youtube.com/watch?v=Amhw2k5mftI).

[Watch a video demonstration of channging your password using LincPass and OOD here](https://youtu.be/tx3sQX7rl70)
```
[first.last@ceres-login ~] $ passwd
Changing password for user first.last
Current Password:

New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```
<!--------------The video [How_to_ssh_to_Ceres_and_change_password.mp4](https://public.3.basecamp.com/p/Rs7pKMzraSnBAPsd1gwN3j4x) on SCINet VRSC Basecamp demonstrates the process.-->

If you have forgotten your login password, please email the VRSC: scinet_vrsc@usda.gov

### What are the SCINet password requirements?

1. AT LEAST 14 characters long
2. Your last 24 passwords cannot be reused.

### How do I login to SCINet?
We offer web-based access to SCINet (Open OnDemand and Galaxy) and command-line access via SSH. See our [login guide](/guides/access) for more information.


### I took my onboarding a long time ago, how do I get a refresher course?
Email the VRSC scinet_vrsc@usda.gov for a time and day. You can also read the [Quick Start Guide]({{ site.baseurl }}/guides/start) or [Ceres User Guide]({{ site.baseurl }}/guides/resources/ceres).


## Software
---
### What software is available on SCINet?
See the Ceres [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) for a list of available software. You can also login to Ceres or Atlas and issue the command “module avail” to see the same list of available software modules.

### How do I request software to be loaded onto Ceres?
For new software requests, go to the [Request Software page]({{ site.baseurl }}/support/request#software-request) and follow the instructions which include 1) checking if the software is already installed, 2) considering whether to install software yourself, and 3) requesting new software to be installed as a module by the VRSC. Software requests sent to the VRSC require USDA Security Operations Center (SOC) review and approval which takes a few weeks.

### How do I install my own software programs?
You may install your own software in your own directories, however, we strongly encourage users to contact the VRSC team to ensure that their required tool(s) might not be better distributed as a shared package within the official software modules tree.

The popular R, Perl and Python languages have many packages/modules available. Some of the programming-language-specific packages are installed on Ceres and are available with the r/perl/python_2/python_3 modules. See the list of installed packages on the [Software Overview page]({{ site.baseurl }}/guides/software/preinstalled) or use “module avail” at the command line. To see more information on a specific module, issue the "module help <module_name>" command. Also see the [Installing R/Python/Perl Packages guide]({{ site.baseurl }}/guides/software/r-perl-python).

Another resource for installing your own software programs is the Conda package manager. See the [User-Installed Software on Ceres Using Conda guide]({{ site.baseurl }}/guides/software/conda)

Experienced command-line users can also install open-source software locally in their project. We recommend installing packages in the project directories since collaborators on the same project most probably would need the same packages. In addition, home quotas are much lower than project directories quotas.

Alternatively, one can use Singularity to run software container images (including Docker images). For more information, see the [Singularity on Ceres guide]({{ site.baseurl }}/guides/software/singularity).

### How do I compile software?
Ceres has development libraries available on all nodes. There is a system version of gcc which is well maintained by CentOS. The VRSC also makes available modules with newer versions of gcc and the intel compilers. See the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) for available versions or use  ```module avail intel```  or  ```module avail gcc```  at the command line to see all of the versions that are available at any given time to make use of them. To access the software use  ```module load gcc```  or  ```module load intel``` . Note that after using these compilers you will probably need to load the modules again in the future to run the code you compiled as well.

### What is Galaxy?
Galaxy is a web-based interface to software on Ceres in which users can build analysis workflows. See [Getting Started with Galaxy on SCINet]({{ site.baseurl }}/guides/analysis/galaxy). General information about Galaxy as well as training guides can be found at [galaxyproject.org](https://galaxyproject.org/).

### How do I login to SCINet Galaxy?
Go to [galaxy.scinet.usda.gov](https://galaxy.scinet.usda.gov/). Enter your email address and SCINet password followed by Verification code. See [Getting Started with Galaxy on SCINet]({{ site.baseurl }}/guides/analysis/galaxy) for more details.

### How do I request software to be loaded onto SCINet Galaxy?
Please submit software install request at https://e.arsnet.usda.gov/sites/OCIO/scinet/Pages/SCINet-New-Application.aspx and check next to Galaxy Application.


## Storage Space
---
### How much data can I store on Ceres?
Each user is allowed 10GB of data in the home directory. 

Additional storage can be provided on Ceres and/or Atlas in /project directories. To request more storage see [How do I request an increase in storage space?](#how-do-i-request-an-increase-in-storage-space). Project directory storage is large, fast, not backed up, and can be requested up to 1TB or larger if justified. Project directory storage is good for fast I/O to large data files from compute nodes. Keep directory storage is smaller and slower, but is backed up nightly and can be requested up to 100GB or larger if justified. Keep directory storage is good for medium-term storage of analysis results and project software/scripts.   

When requesting additional data storage you will be asked for a project summary, a project end date, and to detail your long-term plan for data in your project/keep directories after your project end date.

Besides /project data can be store in the short-term storage /90daydata which has no quotas. For more information refer to the [SCINet Storage Guide]({{ site.baseurl }}/guides/data/storage).

### How do I request an increase in storage space?
Please fill out an application form at [Request Project Storage]({{ site.baseurl }}/support/request#storage-request) (eAuthentication required, non-ARS users should contact their sponsor) to request more storage.

### How do I request access to a project directory?
Only project directory managers can request access to their project space for other users. 


## Data Transfer
---
### How do I get my data onto and off of Ceres?
SCP, SFTP, lftp (to/from Box accounts) Globus, and hard drive shipment are supported. This is described in the [File Transfers section of the User Guides]({{ site.baseurl }}/guides/data/datatransfer). If you work near Beltsville, you may also use the SCINet lab located at the National Agricultural Library (NAL). Two computers with 10GB Internet2 SCINet connections are available.

### How do I get my data onto Ceres via SCINet Galaxy?
See [Getting Started with Galaxy on Ceres]({{ site.baseurl }}/guides/analysis/galaxy).


## Support, Policy, O&M
---
### What is the Virtual Research Support Core (VRSC)?
The Virtual Research Support Core is a team of Iowa State University and ARS personnel who manage the maintenance and operation of the Ceres HPC system and provide user support. See the [Virtual Research Support Core page]({{ site.baseurl }}/about/vrsc) and [How do I contact the VRSC for assistance?](#how-do-i-contact-the-vrsc-for-assistance) for more details.

### How do I contact the VRSC for assistance?
Contact scinet_vrsc@usda.gov for operational issues affecting a single user such as:
* I can't login
* I'm having problems with a batch script
* I'm have a problem with storage
* How do I use software package X?
* Please update software application X on Ceres.
* Please add user X to project Y.

Use the [SCINet Forum](https://forum.scinet.usda.gov) message board (must have SCINet account to access) for discussions/questions about the best practices for research computations.

For Galaxy questions, please use the same email contact scinet_vrsc@usda.gov

### Who is the SCINet program manager?
The current acting SCINet program manager is Rob Butler.

### What is the Scientific Advisory Committee (SAC)?
The Scientific Advisory Committee is composed of ARS scientists across all the five physical Areas, NAL, and a representative from the Area Statisticians. These scientists serve 3-year terms on the committee and represent a broad spectrum of the computational research efforts within ARS. The SAC, which is also referred to as the executive SAC (eSAC), interacts directly with the SCINet Executive Committee on SCINet policy, development, and training.

There is a call for new SAC members every spring. If you would like serve on the SAC, please discuss your interest with your supervisor and email the SAC Chair. Current SAC members can be found on the [SCINet Organization page]({{ site.baseurl }}/about/organization).


## Parallel Computing
---
### How do I write a batch script to submit a compute job?
Please use the [Ceres job script generator]({{ site.baseurl }}/support/ceres-job-script). The [Atlas user guide](https://www.hpc.msstate.edu/computing/atlas/) provides similar generator for the Atlas cluster.

### How do I compile MPI codes?
Load the module for the MPI library you wish to use, generally open openmpi, but mpich is available as well. MPI is included by default with the intel compiler.
```
module avail openmpi
module load openmpi
```
The table below summarizes the relevant GNU compiler names and command line flags for serial, OpenMP and MPI codes.

 |               | Serial      | MPI        | OpenMP                   | MPI+OpenMP
| --- | --- | --- | --- | --- |
| Fortran  | gfortran  | mpif90  | gfortran -fopenmp  | mpif90 -fopenmp
 | C            | gcc          | mpicc   | gcc -fopenmp          | mpicc -fopenmp
 | C++        | g++          | mpicxx  | g++ -fopenmp          | mpicxx -fopenmp


## Technical Issues
---
### My terminal window keeps freezing. Is there something I can do to stop this?
As a result of the current networking infrastructure, working at the command line can be difficult sometimes because displaying hundreds of lines freezes the display. The solution to this is to enable SSH compression. There are a few different ways to do ssh using compression: do  ```ssh -C```  from the command line; or instead of ssh in Putty, click on SSH on the left, then check Enable Compression In Unix; or alter your ~/.ssh/config file to contain these lines:

{:.copy-code}
```
Host ceres.scinet.usda.gov  
Compression yes
```

### I log in at the command line but the system keeps logging me out. Is there something I can do to stop this?
On Linux or Mac OS just create or add the following to a ~/.ssh/config file. If you use Windows Powershell to login to Ceres the config file will be located at C:/Users/username/.ssh/config.

{:.copy-code}
```
Host ceres
HostName ceres.scinet.usda.gov
User  ForwardAgent yes
ForwardX11 yes
TCPKeepAlive yes
ServerAliveInterval 20
ServerAliveCountMax 30
```

That will send a "keepalive" signal every 20 seconds and keep retrying for up to 30 failures. This also simplifies your login to just: `ssh ceres`

If you don't want to use the config file method you can just add these options to the ssh command:

{:.copy-code}
```
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=20 -o ServerAliveCountMax=30 @ceres.scinet.usda.gov -XA
```

Using PuTTY on windows you can do the same via the Connections tab. Set the "Seconds between keepalives" to 20 and check the "Enable TCP keepalives"
