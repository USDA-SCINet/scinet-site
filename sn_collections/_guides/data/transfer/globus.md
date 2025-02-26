---
title: "Globus Data Transfer"
description: How to transfer data using Globus

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

subnav:
  - title: Login
    url: '#login'
  - title: Copying Data
    url: '#copying-data'
  - title: Globus Connect Personal
    url: '#globus-connect-personal'

fetched: "data-transfer"
order_number: 10
---

Globus Online is the recommended method for transferring data to, from, or among Ceres, Atlas, and Juno. It provides faster data transfer speeds compared to scp, has a graphical interface, and does not require authentication for every file transfer. To transfer data to or from a local computer, users will need to install Globus Connect Personal which does NOT require admin privileges. <!--excerpt-->

The [instructional video here](https://www.youtube.com/watch?v=BAodkpwOJuA) demonstrates how to transfer files using Globus as well as how to authenticate with LincPass or Login.gov.

## Login
* In a browser, navigate to [https://www.globus.org/](https://www.globus.org/), click "Log In" in the upper right corner.
* Select "SCINet - ARS/USDA" in the existing organizational login dropdown menu to [use your SCINet credentials to log in](/guides/access/web-based-login)  
  ![selection of SCINet - ARS/USDA in the 'Look up your organization' dropdown menu](../assets/globus-selection.png)
* You should now be on the Globus "File Manager" page. You should see two panels. If you don't, click on the 2-panels icon at the top right of the screen. You should now see two panels:
![Globus online homescreen showing two panels](../assets/globus-homescreen.png)

## Copying Data
* The two panels represent the two systems that you want to copy data between. You will need to select a Collection (also kown as an endpoint) for each panel and possibly authenticate.
* Click in the "Collection" box on one of the panels. A selection window will appear. Recent collections will be listed under "Recent" tab. Click on other tabs to see collections that you've bookmarked, created, or have been shared with you. In the "Recent" tab you will also see the "Install Globus Connect Personal" button. See below for [how to install Globus Connect Personal on your computer](#globus-connect-personal) to transfer data to/from this computer.
* If you see your desired collection, click it and continue. If you do not see your desired collection, start typing the name in the box at the top. When your collection appears, select it.
  * Type or select "SCINet-Ceres" for Ceres DTN, "SCINet-Atlas" for Atlas DTN or "SCINet-Juno" for Juno.
  * If authentication is required for the selected collection, required fields or other instructions will appear.
* To transfer data between the Ceres and Atlas clusters, log into SCINet-Ceres in one panel and to SCINet-Atlas  in the other panel. Similarly, to transfer data to/from Juno, log into SCINet-Juno in one of the panels.
* Once you have logged in on both panels you will need to navigate to the data you want to copy in one panel (source panel) and navigate to the location you want it copied to on the other panel (destination panel). You can either click on directory names or type the full path in the "Path" box (under the "Collection" box).
* **If you are attempting to access 90 Day Data on Atlas**, you will use the following path:  
`/project/90daydata/<project_name>`  
If you do not include /project/, you will receive an error.
* Before you start your copy, look at the Transfer & Sync Options at the bottom of the page (click on arrow to see available options). To see a short description of each option click on "i" next to the option.
* To start the transfer click the blue box with the arrow at the bottom of the page pointing in the direction of the destination pane.
* You may now click "Activity" at the left to see a list of current and prior transfers. Click on "File Manager" at the top left of the page to get back to the main page.

## Globus Connect Personal

To transfer files to or from your personal computer, you may use Globus Connect Personal.  

* **If you are on a USDA-managed Windows laptop or workstation:**
  * If your workstation has CEC support, you can install Globus Connect Personal directly from the Software Center. If Software Center fails to install Globus Connect Personal, please contact your IT Specialist prior to continuing. 
* **If you are not on a USDA-managed laptop:**
  * A link "Install Globus Connect Personal" can be found in the "Recent" tab and in the "More Options" tab in the list of Collections. Click on "Collection" box to get to the list. 
  * The installation instructions for Globus Connect Personal are available here: 
    * [Windows Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-windows/)
    * [Mac Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-mac/)
    * [Linux Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-linux/)

By default on Windows, Globus Connect Personal prompts to be installed in C:\Program Files which requires administrator rights. However, you don’t need Administrator rights to install Globus Connect Personal on your local machine. If you do not have Administrator rights, browse to a place you have write access to (e.g., your Desktop folder) or contact your local IT staff for assistance. 