---
title: "Data Transfer from Local Machines"
description: How to transfer data from your local machine

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
    shortname: Data
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

fetched: "data-transfer"
order_number: 30

subnav:
  - title: "Globus Connect Personal"
    url: '#globus-connect-personal'
  - title: Small Data Transfer Using scp and rsync
    url: '#small-data-transfer-using-scp-and-rsync'
  - title: Other Ways to Transfer Data
    url: '#other-ways-to-transfer-data'

---

To transfer files to your personal computer you may use Globus Connect Personal, or you can transfer small amounts of data using scp and rsync.<!--excerpt-->


## Globus Connect Personal

To transfer files to or from your personal computer, you may use Globus Connect Personal.  

### Installation

* **If you are on a USDA-managed Windows laptop or workstation:**
  * If your workstation has CEC support, you may be able to install Globus Connect Personal directly from the Software Center.
* **If you are not on a USDA-managed laptop, or do not see GCP in the Software Center:**
  * A link "Install Globus Connect Personal" can be found once you have [logged into Globus](/guides/data/transfer/globus) in the Recent tab and in the "More Options" tab in the list of Collections. Click on "Collection" box to get to the list. 
  * The installation instructions for Globus Connect Personal are available here: 
    * [Windows Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-windows/)
    * [Mac Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-mac/)
    * [Linux Install Instructions](https://docs.globus.org/how-to/globus-connect-personal-linux/)

By default on Windows, Globus Connect Personal prompts to be installed in C:\Program Files which requires administrator rights. However, you don’t need Administrator rights to install Globus Connect Personal on your local machine. If you do not have Administrator rights, browse to a place you have write access to (e.g., your Desktop folder) or contact your local IT staff for assistance. 

### Setup

1. Once installed, launch the application and a Globus login popup window will open.  
  * Select Log In.  
  * Go to the main Firefox window that opens behind the popup and select Allow.  
  * Select SCINET-ARS/USDA from the dropdown and complete the eAuth login. 
1. **If you have used Globus before, select "link to" to join your globus account to this one.**  Otherwise, click continue.
  * You can also link accounts later using the steps on the [Globus linking account instructions.](https://docs.globus.org/guides/tutorials/manage-identities/link-to-existing/)
1. When registering, type USDA-ARS as your organization and non-profit research – agree to terms and click continue. 
1. Next page will ask you to agree to setup and asks for a name for future reference, you can keep the default. Click allow. 
1. Now you get a window for "Collection Details" – give it a name that will make sense to you.  For example:  your-initials and local (ABC_local).  Description is not necessary.  Do not select the "high assurance" button. Click save. 
1. You should get a "setup successful" popup with the name of your collection. 
  * If you want to edit your collection name, you can click "show collection details" on the right of the collection details page and select "edit attributes" to edit the collection's name.  
  * If you are happy with it, click "Exit Setup." 

You can now transfer data from your local machine using Globus when Globus Connect Personal is running. 
You can check the status of your connection by clicking the GCP icon in your task bar.  
![Globus Connect Personal icon in windows taskbar](../assets/taskbar_gcp_icon.png)

For more information on transferring data using Globus, see [Globus Data Transfer](/guides/data/transfer/globus#copying-data)

## Small Data Transfer Using scp and rsync

scp is usually available on any Linux or MacOS machine, and on Microsoft Windows 10 (in PowerShell). 
It’s best used when you need to transfer a single file.

Below are examples of scp commands to be issued on your local machine. In these examples
* `<local_path_to_file/>` can be omitted, in this case current directory on your local machine will be used
* `<remote_path_to_file/>` can be omitted, in this case home directory on Ceres or Atlas will be used
* `dest.ext` can be omitted, in this case the name of the file being transferred will be used.

Transfer To Ceres:
```
scp <local_path_to_file/>file.ext  <SCINetID>@ceres-dtn.scinet.usda.gov:<remote_path_to_file/>dest.ext
```
Transfer To Atlas:
```
scp <local_path_to_file/>file.ext <SCINetID>@atlas-dtn.hpc.msstate.edu:<remote_path_to_file/>dest.ext
```

Transfer From Ceres:
```
scp <SCINetID>@ceres-dtn.scinet.usda.gov:<remote_path_to_file/>file.ext  <local_path_to_file/>dest.ext
```
Transfer From Atlas:
```
scp <SCINetID>@atlas-dtn.hpc.msstate.edu:<remote_path_to_file/>file.ext  <local_path_to_file/>dest.ext
```


It is not advised to use "`scp -r`" command to transfer directories to Ceres, since the setgid bit on directories at destination is not inherited. 
This is not a problem if directories are copied to /home/$USER but is a problem when copying to /project area and usually results in quota exceeded errors.

If you decide to use scp to transfer directories to /project, you will have to manually set a setgid bit on the directory and all subdirectories after the transfer using "`chmod g+s <dir_name>`" command. The following command will set ownership of the files in a directory in /project to the project group and set the setgid bit:
```
find /project/<project_name>/<dir> -exec chgrp proj-<project_name> {} + -a -type d -exec chmod g+s {} + 
```
To learn more about `scp` command and all available options issue "`man scp`".

Instead of `scp` one can use `rsync` command for bulk transfers. `rsync` synchronizes files and directories from one location to another while minimizing data transfer as only the outdated or inexistent elements are transferred. It is installed by default on macOS and is available on many Linux hosts. The following command will recursively transfer all new and updated files in the directory `<dir_name>` on the local machine into directory `/project/<project_name>/<dir_name>` on Ceres:
```
rsync -avz --no-p --no-g <dir_name> <SCINetID>@ceres-dtn.scinet.usda.gov:/project/<project_name>
```
To learn more about `rsync` command and all available options issue "`man rsync`".

## Other Ways to Transfer Data

Another supported GUI method for smaller file transfers is Cyberduck ([https://cyberduck.io/](https://cyberduck.io/)). Cyberduck supports multiple protocols (including Amazon S3, iRODS, and Google Drive) and is compatible with the new phishing resistant authentication methods (i.e. SmallStepCLI).

**Please Note:** Programs such as WinSCP and FileZilla are not currently supported with the new phishing resistant authentication methods and will not work.

### Using Cyberduck

To transfer files to and from the clusters using Cyberduck
1. Download Cyberduck from [https://cyberduck.io/](https://cyberduck.io/) and install it.
    * This may require local IT assistance if you are on a USDA managed machine.
2. [SSH into SCINet via the command line](https://scinet.usda.gov/guides/access/ssh-login).
    * This authentication is valid for 16 hours
3. Open Cyberduck
4. Click "Open Connection" in the menu bar.
5. In the "Open Connection" window that appears, enter the following information:
    * **Protocol:**  `SFTP (SSH File Transfer Protocol)`
    * **Server:** `ceres-dtn.scinet.usda.gov` for accessing Ceres or `atlas-dtn.hpc.msstate.edu` for accessing Atlas
    * **Username:** Your SciNet user name
    * **Password:** Leave blank!  You have already authenticated with SmallStepCLI in step 2.
6. Click the "Connect" button.
7. You may receive a warning about an "Unknown Fingerprint." If you do, click "Allow."
8. To upload a file:
   1. In Cyberduck, navigate to the remote directory you want to upload the file to.
   2. Click the upload button from the main toolbar.
   3. From the file browser that opens, select the file you want to upload from your local computer and click "Choose."
9. To download a file:
   1. In Cyberduck, navigate to the remote directory where the file is stored.
   2. Right click on the file you want to downlad.
   3. From the context menu that opens, select "Download."

## Data Transfer to NCBI

To transfer data to/from NCBI, ssh to a DTN node and use either ncftp commands (ncftpput, ncftpget) or Aspera command (ascp). Since ftp connections can be unstable we recommend using Aspera for large file transfers.

To use Aspera, you will need a private key file that you can acquire by following instructions listed on Page 3 of the document at [https://www.ncbi.nlm.nih.gov/books/NBK242625](https://www.ncbi.nlm.nih.gov/books/NBK242625)
