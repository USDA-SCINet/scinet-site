---
title: "Data Transfer via Café Machine"
description: How to transfer data using SCINet Café Machines

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
    shortname: Data
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

subnav:
  - title: Getting Started
    url: "#getting-started"
  - title: Tranferring Data
    url: "#transferring-data"

fetched: "data-transfer"
order_number: 20
---

If you are at an ARS research facility with a SCINet-X connection, you have access to a SCINet cafe machine - a dedicated computer for high-speed data transfer to SCINet resources. <!--excerpt-->

## Getting Started

Using the café machines typically requires a LincPass.  If you have access to a café machine, but do not have a LincPass, contact the VRSC for assistance to use an alternative eAuth access method.

{: .usa-list }
1. **Log in to the machine using your SCINet username (first.last) and LincPass/PIN.**
  * The login screen should look like a typical desktop login.  If you see a terminal instead, contact the VRSC for assistance.
  * The Café machine may be slow right after login, don’t worry about the extended black screen, it will eventually do something.
  * When you get the start screen you should see icons along the bottom for Firefox, files (cabinet), and terminal.  If you don’t see this, go to 'activities' in the upper left of the screen and it will toggle from the full window so you can access this dock.  
    ![Screenshot of the desktop with icon dock](../assets/cafe_desktop_ribbon.png)

1. **Set up Globus Connect Personal (one time setup – done for each user)**
    1. Run "globusconnect" in a terminal.  This is a script that automates installing, setting up, and running Globus Connect Personal.
        
        {: .copy-code}
        ```
globusconnect
```
    1. The first time you run "globusconnect" it will download, install, and start the setup process for Globus Connect Personal.
    1. The setup process usually, but not always, requires you to login.  (This process may vary depending on how you login) 
      * A globus login popup window will open. Select Log In.  
      * Go to the main Firefox window that opens behind the popup and select Allow.  
      * Select SCINET-ARS/USDA from the dropdown and complete the eAuth login.
      *  **If you have used Globus before, select "link to" to join your globus account to this one.**  Otherwise, click continue.
        * You can also link accounts later using the steps on the [Globus linking account instructions.](https://docs.globus.org/guides/tutorials/manage-identities/link-to-existing/)
      * When registering, type USDA-ARS as your organization and non-profit research – agree to terms and click continue. 
      * Next page will ask you to agree to setup and asks for a name for future reference, keep the default – it should be the name of your SCINet café. Click allow. 
      * Now you get a window for "Collection Details" – give it a name that will make sense to you.  For example:  your-initials and scinet-café (ABC_scinet_cafe).  Description is not necessary.  Do not select the "high assurance" button. Click save. 
      * You should get a "setup successful" popup with the name of your collection. 
        * If you get a collection name that is generic like "scinet_cafe" you can click "show collection details" and, on the right of the collection details page, select "edit attributes" to edit the collection's  name.  
        * If you are happy with it, click "Exit Setup."   
    1. When you run "globusconnect" in the future, it will scan for USB devices, add any that it finds to the globus config, and start the server. You can use "globusconnect -help" to see this information.
    1. If you need to add USB devices after starting the server just run “globusconnect -restart” to rescan devices and restart the server.    


## Transferring Data

**Please do not copy any files onto the café machine as it has limited hard drive space.** 

To move data from an external drive, connect the external drive and restart the server with “globusconnect -restart”


### Using Globus Connect Personal.   

After Globus Connect Personal is set up, you can use the following command in the terminal to open the GCP connection interface and start the connection:

{: .copy-code }
```
globusconnect
```  

Once connected, you can use the window to connect or disconnect your session.  When you are finished transferring data, you can close the window or hit CTRL+C in the terminal to end your session.  

When you start the app and go to globus.org and login, you will be able to select your scinet-café collection, and you should see the files you have on that machine or external drive.  When you stop the app, it will no longer be accessible to you.  Please stop the app after each session. 

![Screenshot of GCP and Globus interface with connected status](../assets/globus_connected.png)
![Screenshot of GCP and Globus interface with disconnected status](../assets/globus_disconnected.png)


For more information on transferring data using Globus, see [Globus Data Transfer](/guides/data/transfer/globus#copying-data)
