---
title: SCINet Policy
description: SCINet policies and procedures
permalink: /about/policies
layout: page
alt_nav: About

subnav:
  - title: Accounts 
    url: '#accounts'
  - title: Storage
    url: '#storage'
  - title: Job Queues 
    url: '#job-queues'
  - title: Software 
    url: '#software'
  - title: Data Management
    url: '#data-management'


---

## Accounts

**Account Request:**  

:  To obtain a SCINet account, a SCINet Account Request must be submitted.  The approval process depends on the affiliation of the requester. 

   * ARS: [SCINet Account Request]({{ site.baseurl }}/about/signup#ars-employees)
   * Other: [Non-ARS SCINet Account Request]({{ site.baseurl }}/about/signup#non-ars-employees)  
   {: .padding-bottom-2}

**Terms and Conditions:**  

:  All SCINet Users must agree to the [Terms and Conditions](https://usdagcc.sharepoint.com/sites/REE-ARS-OCIO/scinet/accounts/SitePages/Terms-and-Conditions.aspx).
:  You can review more about SCINet Policies [here](https://usdagcc.sharepoint.com/sites/REE-ARS-OCIO/scinet/accounts/SitePages/SCINet_Policies.aspx).

**Password Expiration:**  

:  SCINet passwords do not expire. 

**Multi-factor authentication (MFA)**  

:  SCINet users are required to use second factor when authenticating to SCINet resources.

**Security Awareness Training:**  

:  Each Non-USDA SCINet account user will atttest to taking Annual Security Awareness Training.

**Account Deactivation:**  

:  SCINet accounts are subject to deactivation.  Collaborator (Non-ARS) accounts expire.

**Re-establishing account:**  

:  SCINet users whose account has been deactivated for any reason will need to submit a new account request.



## Storage


**Home Directories:**  

:  Home directory quota on all HPC clusters is automatically granted to all SCINet user accounts.  You have space by default as a user, but you can request Project Allocation.

   * Project Allocation Request: A [SCINet Project Allocation Request]({{ site.baseurl }}/support/request#to-request-a-quota-increase-for-an-existing-scinet-project-allocation) form must be submitted by the project's Principal Investigator (PI).


## Job Queues


**Job queue policies are described in the User Guide for each of the clusters.**

:  Queue policies are subject to periodic change.

   *  [Ceres User Guide]({{ site.baseurl }}/guides/use/partitions-queues)
   *  [Atlas User Guide](https://www.hpc.msstate.edu/computing/atlas/)



## Software


**SCINet is a community resource.** 

:  Thus, all SCINet users have a responsibility to the other users on the system. There are restrictions on what software you can install.


## Data Management


**Users are responsible for securing their data.**

:  Certain public datasets are made available to all SCINet users.

   *  A [Galaxy](https://galaxyproject.org/) web-based graphical workflow management system is available to all SCINet users. This is accessible via SCINet login credentials at [https://galaxy.scinet.usda.gov](https://galaxy.scinet.usda.gov).
   *  Public-facing websites are currently not available from SCINet.

**Data Retention:** Upon SCINet account deactivation (see Accounts section), the following data retention policies go into effect for files owned by the deactivated SCINet user:
- Home directory: supervisor (non-ARS: ARS sponsor) will be given access by the VRSC and required to take action within 90 days to preserve any files
- Project directories:
	- If there are no other active users on the project, the supervisor will be required to take action within 90 days
	- If there are active users on the project, and the deactivated user was the project PI (requestor), then the supervisor must select another PI
	- If there are active users on the project, and the deactivated user was not the project PI, then no further action need be taken
