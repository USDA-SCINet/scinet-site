---
title: "Data Transfer via Café Machine"
description: How to transfer data using SCINet café machines

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

If you are at an ARS research location with a SCINet-X connection, you have access to a SCINet café machine - a dedicated computer for high-speed data transfer to and from SCINet’s supercomputers and long-term storage system. <!--excerpt--> You do not need to use the café machine to use SCINet’s computing systems. Computing work should be done from your regular workstation or laptop. 

## Getting Started

Using the café machines requires a LincPass. If you have access to a café machine, but do not have a LincPass, contact the VRSC for assistance to use an alternative eAuth access method. The recommended way to perform large file transfers to and from SCINet infrastructure is using Globus, and doing that from a SCINet café machine first requires installing Globus Connect Personal (GCP). Instructions for installing and setting up GCP are below:

{: .usa-list }
1. **Log in to the café machine using your SCINet username and LincPass/PIN.**
  * The login screen should look like a desktop login.  If you see a terminal instead, contact the VRSC (scinet_vrsc@usda.gov) for assistance.
  * The café machine may show an extended black screen right after logging in, but this is expected. 
  * When you get to the start screen, you should see icons along the bottom for Firefox, files (cabinet), and terminal.  If you don’t see these icons, click on "Activities" in the upper left of the screen to make them visible.  
    ![Screenshot of the desktop with icon dock](../assets/cafe_desktop_ribbon.png)

1. **Set up Globus Connect Personal (GCP) (one time setup done for each user)**
  1. Open a terminal by clicking the terminal icon (black box with ">_" in white) on the bottom of the screen. 
  1. Type "globusconnect" in the terminal to run a script that automates installing, setting up, and running Globus Connect Personal.
  
      {: .copy-code}
      ```
globusconnect
```
      The first time you run the `globusconnect` script, it will download, install, and start the setup process for Globus Connect Personal.
  1. The setup process usually, but not always, requires you to login.  (This process may vary depending on how you log in.)  
      * A Globus login pop-up window will open. Select "Log In".  
      * Go to the main Firefox window that opens behind the pop-up and select "Allow".  
      * Select "SCINet-ARS/USDA" from the dropdown menu and complete the eAuth login procedure.  
        * **If this is your first time authenticating via your SCINet account and you already have a Globus account with another authentication identity (e.g., via ORCID or a university), select "Link to" to join your SCINet-ARS/USDA Globus identity to your existing account.**  Otherwise, click "Continue".  
        * You can also link identities later using the steps on the [Globus linking account instructions](https://docs.globus.org/guides/tutorials/manage-identities/link-to-existing/).  
      * When registering, type "USDA-ARS" as your organization and non-profit research – agree to the terms and click "continue".  
      * The next page will ask you to agree to set up GCP and ask for a name for the machine for future reference. You can keep the default value which should be the name of your SCINet café machine. Click "Allow".  
      * Now a window for "Collection Details" will appear. For "Collection Name", provide a name that will be recognizable to you as the café machine.  For example:  your initials and "_scinet_cafe" (i.e., ABC_scinet_cafe). Providing a description is optional. Do not select the "High Assurance" checkbox (read about sensitive data on SCINet infrastructure [here]({{ site.baseurl }}/support/faq#can-i-store-sensitive-data-on-scinet-infrastructure)). Click "Save".  
      * You should get a "Setup Successful!" pop-up with the name of your collection.  
        * If you get a collection name that is generic like "scinet_cafe" you can click "show collection details" and, on the right of the collection details page, select "edit attributes" to edit the collection's  name.  
        * If you are happy with the collection name, click "Exit Setup".  


## Transferring Data 

To begin transferring data using GCP on the café machine, connect an external drive to the machine. At minimum, the external drive should support the USB 3.0 standard to ensure sufficient data throughput. Bitlocker-encrypted external drives can be accessed on the café machine using software called “dislocker”. **Please do not copy any files onto the café machine as it has limited hard drive space.** 

* If GCP is not currently running, open a terminal and run the following command to scan for external drives, to open the GCP connection interface, and to start the GCP connection with access to the found external drives:
  {: .copy-code }
```
globusconnect
``` 
* If GCP was already running before connecting the external drive, run the following command to restart the GCP connection and to rescan for the external drive:
  {: .copy-code }
```
globusconnect -restart
```   

Now that your GCP connection is running and can access your external drive, you can go to [Globus.org](https://www.globus.org/) to perform data transfers from or to the café machine. You should find the "*_scinet_cafe" collection made [above](#getting-started) in your list of collections, and you will be able to connect to it while the local GCP connection is running on the café machine. After selecting your café machine collection, you should see the files you have on that machine or external drive. For detailed instructions on transferring data using Globus, see [Globus Data Transfer](/guides/data/transfer/globus#copying-data). 

On the café machine, you can use the GCP window to disconnect your session (or reconnect after disconnecting).  When you are finished transferring data, you can close the window or hit CTRL+C in the terminal to end your session. When you stop the GCP connection, it will no longer be accessible to you.  Please stop the connection after each session. 

![Screenshot of GCP and Globus interface with connected status](../assets/globus_connected.png)
![Screenshot of GCP and Globus interface with disconnected status](../assets/globus_disconnected.png)

You can use `globusconnect -help` on the café machine for additional information. If you run into any issues using the café machine, please contact the VRSC by emailing scinet_vrsc@usda.gov.  


