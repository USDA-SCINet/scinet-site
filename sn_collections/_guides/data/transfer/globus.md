---
title: "Globus Data Transfer"
description: How to transfer data using Globus

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
    shortname: Data
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

subnav:
  - title: Login
    url: '#login'
  - title: Copying data
    url: '#copying-data'
  - title: Globus Connect Personal
    url: '#globus-connect-personal'

fetched: "data-transfer"
order_number: 10
---

Globus is the recommended method for transferring data to, from, or among Ceres, Atlas, and Juno. It provides faster data transfer speeds compared to `scp`, has a graphical interface, and does not require authentication for every file transfer. To transfer data to or from a local computer, users will need to install Globus Connect Personal which does NOT require admin privileges. <!--excerpt-->

The [instructional video here](https://www.youtube.com/watch?v=BAodkpwOJuA) demonstrates how to transfer files using Globus as well as how to authenticate with LincPass or Login.gov.

## Login
1. In a browser, navigate to [https://www.globus.org/](https://www.globus.org/) and click "Log In" in the upper right corner.
1. Select "SCINet - ARS/USDA" in the existing organizational login dropdown menu to [use your SCINet credentials to log in](/guides/access/web-based-login).  
  ![selection of SCINet - ARS/USDA in the 'Look up your organization' dropdown menu](../assets/globus-selection.png)
1. You should now be on the Globus "File Manager" page. You should see two panels. If you don't, click on the 2-panels icon at the top right of the screen. You should now see two panels:  
  ![Globus online homescreen showing two panels](../assets/globus-homescreen.png)

## Copying data
1. The two panels represent the two systems that you want to copy data between. You will need to select a Collection for each panel and possibly authenticate.
  * Click in the "Collection" box on one of the panels. A selection page will appear. Recent collections will be listed under the "Recent" tab. Click on the other tabs to see collections that you've bookmarked, created, or have been shared with you. In any of these tabs, you will also see the "Get Globus Connect Personal" button. See below for [how to install Globus Connect Personal on your computer](#globus-connect-personal) to transfer data to and from your local computer.
  * If you see your desired collection in the "Recent" tab, click it and continue. If you do not see your desired collection, start typing the name in the box at the top. When your collection appears, select it.
    * Type or select "SCINet-Ceres" for Ceres, "SCINet-Atlas" for Atlas, or "SCINet-Juno" for Juno.
    * If authentication is required for the selected collection, click "Continue" and then your SCINet-associated identity (i.e., <scinet_username>@scinet.usda.gov) to reauthenticate.
        ![If prompted, click Continue and then your SCINet-associated email address](../assets/globus_reauth.png)
  * To transfer data between the Ceres and Atlas clusters, log in to SCINet-Ceres in one panel and to SCINet-Atlas in the other panel. Similarly, to transfer data to/from Juno, log into SCINet-Juno in one of the panels.
1. Once you have a selected a Collection on both panels, you will need to navigate to the files you want to copy in one panel (source panel) and navigate to the location to which you want them copied on the other panel (destination panel). You can either click on directory names or type the full path in the "Path" box (under the "Collection" box).
1. Before you start your copy, look at the "Transfer & Timer Options" near the top of the page between the two panels (click on the down arrow to see available options). To see a short description of each option, click on the "i" next to the option.
1. To start copying files, click the blue box with the arrow at the bottom of the page pointing in the direction of the destination pane.
1. You may now click "Activity" on the left-side menu to see a list of current and prior transfers. Click on "File Manager" at the top left of the page to get back to the main page.

## Globus Connect Personal

To transfer files to or from your personal computer, you may use Globus Connect Personal (GCP).  

* **If you are on a USDA-managed Windows laptop or workstation:**
  * If your workstation has CEC support, you may be able to install GCP directly from the Software Center.
* **If you are not on a USDA-managed laptop, or do not see GCP in the Software Center:**
  * A link "Get Globus Connect Personal" can be found in the Collection Search page (by clicking on the "Collection" box in the "File Manager"). 
  * The installation instructions for Globus Connect Personal are available here: 
    * [Windows Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-windows/)
    * [Mac Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-mac/)
    * [Linux Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-linux/)

By default on Windows, GCP prompts to be installed in `C:\Program Files` which requires administrator rights. However, you don’t need administrator rights to install GCP on your local machine. If you do not have administrator rights, browse to a place to which you have write access (e.g., your Desktop folder) when prompted for an installation location. If you encounter further permission issues, contact your local IT staff for assistance. 

For more information on using GCP, see [transferring data from your local machine](/guides/data/transfer/local#globus-connect-personal).