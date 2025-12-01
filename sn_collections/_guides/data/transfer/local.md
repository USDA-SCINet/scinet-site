---
title: "Data Transfer to and from Local Computers"
description: How to transfer data to and from your local computer via a variety of methods.

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
    shortname: Data
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

fetched: "data-transfer"
order_number: 10

subnav:
  - title: Open OnDemand
    url: '#open-ondemand'
  - title: Globus Connect Personal
    url: '#globus-connect-personal'
  - title: scp or rsync
    url: '#scp-or-rsync'
  - title: Cyberduck
    url: '#cyberduck'

---

To transfer files between your local computer and SCINet storage locations, there are multiple methods available:

* For smaller (e.g., less than 1 GB) data transfers:
  * [Open OnDemand (recommended)](#open-ondemand), a web-based graphical interface.
  * [`scp` or `rsync`](#scp-or-rsync), commands to run from your local computer.
  * [Cyberduck](#cyberduck), a graphical user interface on your local computer.
* For larger (e.g., greater than 1 GB) data transfers:
  * [Globus Connect Personal](#globus-connect-personal), an application on your local computer that allows you to transfer files via the web-based graphical interface Globus.
<!--excerpt-->


## Open OnDemand
The Open OnDemand interface includes a file manager that allows you to upload and download files between a SCINet cluster and your local computer via your web browser. To upload or download files using the Open OnDemand file manager: 
1. Click the "Files" dropdown menu from the top navigation bar.
1. Click one of the listed directory shortcuts that appear below to start your navigation to the location on the cluster in which you want to start a file transfer.
1. Use the file browser to navigate to the subdirectory to or from which to transfer files.
1. Click either the "Upload" or "Download" buttons in the top right corner of the file browser to open a pop-up window to complete your upload or download. 
  * Uploads support either dragging and dropping files or folders on the pop-up window or browsing your local file system. 
  * Downloads will initiate a download via your web browser to your browser's default download location.  

To read more about accessing Open OnDemand and its other features, see the [Open OnDemand Interface guide](/guides/use/open-ondemand). 

**Please note:** Using Open OnDemand for file transfer is only for transfers between your local computer and Ceres or Atlas. Transfers to and from Juno are not supported as Open OnDemand software is intended for compute clusters and is not available on Juno. 

## Globus Connect Personal

To transfer files between your local computer and either Ceres, Atlas, or Juno, you can use Globus Connect Personal (GCP). For more information on using Globus and GCP, see [the Globus guide](/guides/data/transfer/globus#globus-connect-personal). 



## `scp` or `rsync`

`scp` is usually available on any Linux or MacOS computer and on Microsoft Windows 10 (in PowerShell). 
It is best used when you need to transfer a single file.

Below are examples of `scp` commands to be issued on your local computer. In these examples:
* `<local_path_to_file/>` can be omitted to use the current directory on your local computer.
* `<remote_path_to_file/>` can be omitted to use your home directory on Ceres or Atlas.
* `dest.ext` can be omitted to use the name of the file being transferred.

Transfer To Ceres:
```
scp <local_path_to_file/>file.ext  <scinet_username>@ceres-dtn.scinet.usda.gov:<remote_path_to_file/>dest.ext
```
Transfer To Atlas:
```
scp <local_path_to_file/>file.ext <scinet_username>@atlas-dtn.hpc.msstate.edu:<remote_path_to_file/>dest.ext
```

Transfer From Ceres:
```
scp <scinet_username>@ceres-dtn.scinet.usda.gov:<remote_path_to_file/>file.ext  <local_path_to_file/>dest.ext
```
Transfer From Atlas:
```
scp <scinet_username>@atlas-dtn.hpc.msstate.edu:<remote_path_to_file/>file.ext  <local_path_to_file/>dest.ext
```

It is not advised to use the `scp -r` command to transfer directories to SCINet, since the setgid bit on directories at destination is not inherited. 
This is not a problem if directories are copied to `/home/$USER` but is a problem when copying to `/project` areas and usually results in quota exceeded errors.

If you decide to use `scp` to transfer directories to `/project`, you will have to manually set a setgid bit on the directory and all subdirectories after the transfer using the `chmod g+s <dir_name>` command. The following command will set ownership of the files in a directory in `/project` to the project group and set the setgid bit:
```
find /project/<project_name>/<dir> -exec chgrp proj-<project_name> {} + -a -type d -exec chmod g+s {} + 
```
To learn more about `scp` command and all available options, run `man scp`.

Instead of `scp`, you can use the `rsync` command for bulk transfers. `rsync` synchronizes files and directories from one location to another while minimizing data transfer as only the outdated or nonexistent elements are transferred. It is installed by default on macOS and is available on many Linux hosts. The following command will recursively transfer all new and updated files in the directory `<dir_name>` on the local computer into directory `/project/<project_name>/<dir_name>` on Ceres:
```
rsync -avz --no-p --no-g <dir_name> <scinet_username>@ceres-dtn.scinet.usda.gov:/project/<project_name>
```
Or on Atlas:
```
rsync -avz --no-p --no-g <dir_name> <scinet_username>@atlas-dtn.hpc.msstate.edu:/project/<project_name>
```
To learn more about `rsync` command and all available options, run `man rsync`.

## Cyberduck

Another supported GUI method for smaller file transfers is Cyberduck ([https://cyberduck.io/](https://cyberduck.io/)). Cyberduck supports multiple protocols (including Amazon S3, iRODS, and Google Drive) and is compatible with phishing-resistant authentication methods used by SCINet (i.e., SmallStepCLI). Cyberduck has been certified by USDA CEC for installation on USDA local computers. 

**Please Note:** Similar programs such as WinSCP and FileZilla are not currently supported with the new phishing-resistant authentication methods and will not work for transfer to SCINet storage locations.

To transfer files to and from the clusters using Cyberduck:
1. Download Cyberduck from [https://cyberduck.io/](https://cyberduck.io/) and install it.
    * This may require local IT assistance if you are on a USDA-managed computer.
2. [SSH into SCINet via the command line](https://scinet.usda.gov/guides/access/ssh-login).
    * This authentication is valid for 16 hours.
3. Open Cyberduck.
4. Click "Open Connection" in the menu bar.
5. In the "Open Connection" window that appears, enter the following information:
    * **Protocol:**  `SFTP (SSH File Transfer Protocol)`
    * **Server:** `ceres-dtn.scinet.usda.gov` for accessing Ceres or `atlas-dtn.hpc.msstate.edu` for accessing Atlas
    * **Username:** Your SCINet username.
    * **Password:** Leave blank! You have already authenticated with SmallStepCLI in step 2.
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
