---
title: "Rclone: Moving Data to and from Cloud Resources"
description: Using rclone

parents:
  - title: Storage and Data Management
    url: /guides/data
    class: "guide-nav"
    shortname: Data
  - title: SCINet File Transfer
    url: /guides/data/transfer
    class: "emph-nav"

subnav:
  - title: Setting up rclone
    url: '#setting-up-rclone'
    subnav:
      - title: Configuring rclone
        url: '#configuring-rclone-on-scinet-to-access-remote-file-storage'
      - title: Access and copy files
        url: '#use-rclone-to-access-and-copy-files'
  - title: Advanced commands
    url: '#advanced-commands'



fetched: "data-transfer"
order_number: 20
---

Rclone is already installed on all SCINet data transfer and compute nodes. Please do not use the `rclone` command from the login node. Attempting to do so will remind you to use a data transfer or compute node instead.<br>
To learn more about `rclone`, see [https://rclone.org](https://rclone.org).<!--excerpt-->

## Setting up rclone 
Before transferring files to or from cloud resources, rclone must first be configured to access cloud storage resources, e.g., a USDA-ARS Box account or AWS S3 buckets. If authentication with eAuth is required to access the cloud resource (e.g., your Box account), you will need to also install and configure rclone on your local computer for authenticating with eAuth and generating an authentication token to use on SCINet systems. 

**Please note:** Although rclone supports data transfer to and from Microsoft OneDrive accounts, rclone is not currently authorized to access USDA OneDrive accounts, so rclone cannot facilitate data transfers directly between your OneDrive account and SCINet systems. 

### Configuring `rclone` on SCINet to access remote file storage

Here, we illustrate setting up access to Box; the process for configuring access to other cloud resources is similar.

You will need to be able to log on to Ceres using SSH from your local computer. Please see [https://scinet.usda.gov/guides/access/ssh-login](https://scinet.usda.gov/guides/access/ssh-login) if you need help setting that up.

{: .usa-list }
1. Open Windows PowerShell or macOS Terminal.
2. Run (replace "user.name" with your SCINet username)

   {:.copy-code}
   ```bash
   ssh -L localhost:53682:localhost:53682 user.name@ceres.scinet.usda.gov
   ```
2. This will open a new terminal session on Ceres. In the Ceres terminal, run

   {:.copy-code}
   ```bash
   rclone config
   ```

3. Type `n` for "n) New remote".
4. Enter any name you like for the new Box connection; e.g. "usdabox".
5. For "Storage>" you can enter the appropriate number, but it is easier to just type `box`.
6. For "client_id>", "client_secret>", "box_config_file>", and "access_token>", leave blank, just hit enter.
7. For "box_sub_type>" enter `2` for "enterprise".
8. For "Edit advanced config?" enter `n`.
9. For "Use auto config?" enter `y`.
10. Copy the URL that starts with `http://127.0.0.1:53682/auth?state=`, paste it into your web browser, and hit enter.
11. When the web page loads, click on "Use Single Sign On (SSO)".
12. Enter your USDA email address and click "Authorize".
13. Login with eAuthentication, if prompted.
14. Click on the "Grant access to Box" button.
15. Return to the Ceres terminal session. Type `y` for "y) Yes this is OK".
11. Type `q` to quit.

You are now ready to access your Box files using `rclone` from Ceres!


### Use rclone to access and copy files

`rclone` supports many commands for browsing and copying files on a remote resource. For complete details, please see [https://rclone.org/docs/#subcommands](https://rclone.org/docs/#subcommands). Or, you can run `man rclone` for help. Here, we cover some key commands that will let you copy files from a remote location to Ceres.

1. First, you can use rclone to list the files and folders that are available on your remote location (replace "usdabox" with whatever you named your remote connection).

   {:.copy-code}
   ```bash
   rclone lsf usdabox:
   ```

2. You can use `rclone` to copy files from the remote location to Ceres. For example:

   {:.copy-code}
   ```bash
   rclone copy usdabox:/scinetbackup/bogus_genome /project/bogus_genome --verbose
   ```


## Advanced commands

This advanced guide assumes you have read the previous section and have some familiarity with `rclone` already.

Rclone supports "overlay" file systems which can be then be overlayed in multiple layers. 

In this guide we will discuss the "crypt" and "chunk" overlays.  Using these 2 in combination can overcome virtually all of the limitations of any of the remote services.  i.e.. no 5, 10, or 15GB limit per file, no restrictions on special characters in filenames, etc. The overlays also provide some data protection by doing md5 checksums on the files transferred, if desired.  You should very much desire this.

The process here is:

*  Create a basic store
*  Apply a crypt overlay.  This gets you encryption and works around filename limitations.
*  Apply a chunk overlay.  This gets around file size limitations.


The following instructions assume you have already created a basic functional remote called "google:".

First we create a folder in the remote to hold our encrypted data.  I called mine "crypt"

```bash
$ rclone mkdir google:crypt
```

Next run `rclone config` choosing crypt as the remote type and then use the name of your new folder as the path.  You will want to encrypt the directory names to avoid character limitation issues in the path. 

You must remember the password(s) you choose here. Your data will not be recoverable by anyone if your forget or lose it. There is no "password recovery."

```bash
$ rclone config

Current remotes:

 

Name                 Type
====                 ====
boxsecret            crypt
boxsecretchunked     chunker
cybox                box
google               drive
onedrive             onedrive
onedrivechunker      chunker
onedrivecrypt        crypt

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> n
name> googlecrypt

Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value

 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Provider (AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, etc)
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Box
   \ "box"
 7 / Cache a remote
   \ "cache"
 8 / Citrix Sharefile
   \ "sharefile"
 9 / Dropbox
   \ "dropbox"
10 / Encrypt/Decrypt a remote
   \ "crypt"
11 / FTP Connection
   \ "ftp"
12 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
13 / Google Drive
   \ "drive"
14 / Google Photos
   \ "google photos"
15 / Hubic
   \ "hubic"
16 / JottaCloud
   \ "jottacloud"
17 / Koofr
   \ "koofr"
18 / Local Disk
   \ "local"
19 / Mail.ru Cloud
   \ "mailru"
20 / Mega
   \ "mega"
21 / Microsoft Azure Blob Storage
   \ "azureblob"
22 / Microsoft OneDrive
   \ "onedrive"
23 / OpenDrive
   \ "opendrive"
24 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
25 / Pcloud
   \ "pcloud"
26 / Put.io
   \ "putio"
27 / QingCloud Object Storage
   \ "qingstor"
28 / SSH/SFTP Connection
   \ "sftp"
29 / Transparently chunk/split large files
   \ "chunker"
30 / Union merges the contents of several remotes
   \ "union"
31 / Webdav
   \ "webdav"
32 / Yandex Disk
   \ "yandex"
33 / http Connection
   \ "http"
34 / premiumize.me
   \ "premiumizeme"
Storage> crypt

** See help for crypt backend at: https://rclone.org/crypt/ **

Remote to encrypt/decrypt.
Normally should contain a ':' and a path, eg "myremote:path/to/dir",
"myremote:bucket" or maybe "myremote:" (not recommended).
Enter a string value. Press Enter for the default ("").
remote> google:crypt
How to encrypt the filenames.
Enter a string value. Press Enter for the default ("standard").
Choose a number from below, or type in your own value
 1 / Don't encrypt the file names.  Adds a ".bin" extension only.
   \ "off"
 2 / Encrypt the filenames see the docs for the details.
   \ "standard"
 3 / Very simple filename obfuscation.
   \ "obfuscate"
filename_encryption> 
Option to either encrypt directory names or leave them intact.
Enter a boolean value (true or false). Press Enter for the default ("true").
Choose a number from below, or type in your own value
 1 / Encrypt directory names.
   \ "true"
 2 / Don't encrypt directory names, leave them intact.
   \ "false"
directory_name_encryption> 1
Password or pass phrase for encryption.
y) Yes type in my own password
g) Generate random password
n) No leave this optional password blank
y/g/n> y
Enter the password:
password:
Confirm the password:
password:
Password or pass phrase for salt. Optional but recommended.
Should be different to the previous password.
y) Yes type in my own password
g) Generate random password
n) No leave this optional password blank
y/g/n> n
Remote config
--------------------
[googlecrypt]
type = crypt
remote = google:crypt
directory_name_encryption = true
password = *** ENCRYPTED ***
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
Current remotes:
 
Name                 Type
====                 ====
boxsecret            crypt
boxsecretchunked     chunker
cybox                box
google               drive
googlecrypt          crypt
onedrive             onedrive
onedrivechunker      chunker
onedrivecrypt        crypt
 
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
$ rclone ls googlecrypt:
$
```


At this point you have a working encryption overlay.  You will want to add a "chunking" overlay on top on that.
As before, first create a folder in the encrypted overlay to hold your chunked overlay.  In this case I called mine "chunk"

```bash
$ rclone mkdir googlecrypt:chunk 
```

Now create a chunk overlay, the defaults should be fine.

```bash
$ rclone config
Current remotes:
 
Name                 Type
====                 ====
boxsecret            crypt
boxsecretchunked     chunker
cybox                box
google               drive
googlecrypt          crypt
onedrive             onedrive
onedrivechunker      chunker
onedrivecrypt        crypt
 
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> n
name> googlechunk
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Provider (AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, etc)
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Box
   \ "box"
 7 / Cache a remote
   \ "cache"
 8 / Citrix Sharefile
   \ "sharefile"
 9 / Dropbox
   \ "dropbox"
10 / Encrypt/Decrypt a remote
   \ "crypt"
11 / FTP Connection
   \ "ftp"
12 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
13 / Google Drive
   \ "drive"
14 / Google Photos
   \ "google photos"
15 / Hubic
   \ "hubic"
16 / JottaCloud
   \ "jottacloud"
17 / Koofr
   \ "koofr"
18 / Local Disk
   \ "local"
19 / Mail.ru Cloud
   \ "mailru"
20 / Mega
   \ "mega"
21 / Microsoft Azure Blob Storage
   \ "azureblob"
22 / Microsoft OneDrive
   \ "onedrive"
23 / OpenDrive
   \ "opendrive"
24 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
25 / Pcloud
   \ "pcloud"
26 / Put.io
   \ "putio"
27 / QingCloud Object Storage
   \ "qingstor"
28 / SSH/SFTP Connection
   \ "sftp"
29 / Transparently chunk/split large files
   \ "chunker"
30 / Union merges the contents of several remotes
   \ "union"
31 / Webdav
   \ "webdav"
32 / Yandex Disk
   \ "yandex"
33 / http Connection
   \ "http"
34 / premiumize.me
   \ "premiumizeme"
Storage> chunker
** See help for chunker backend at: https://rclone.org/chunker/ **
 
Remote to chunk/unchunk.
Normally should contain a ':' and a path, eg "myremote:path/to/dir",
"myremote:bucket" or maybe "myremote:" (not recommended).
Enter a string value. Press Enter for the default ("").
remote> googlecrypt:chunk
Files larger than chunk size will be split in chunks.
Enter a size with suffix k,M,G,T. Press Enter for the default ("2G").
chunk_size> 
Choose how chunker handles hash sums. All modes but "none" require metadata.
Enter a string value. Press Enter for the default ("md5").
Choose a number from below, or type in your own value
 1 / Pass any hash supported by wrapped remote for non-chunked files, return nothing otherwise
   \ "none"
 2 / MD5 for composite files
   \ "md5"
 3 / SHA1 for composite files
   \ "sha1"
 4 / MD5 for all files
   \ "md5all"
 5 / SHA1 for all files
   \ "sha1all"
 6 / Copying a file to chunker will request MD5 from the source falling back to SHA1 if unsupported
   \ "md5quick"
 7 / Similar to "md5quick" but prefers SHA1 over MD5
   \ "sha1quick"
hash_type> 
Edit advanced config? (y/n)
y) Yes
n) No
y/n> 
y/n> n
Remote config
--------------------
[googlechunk]
type = chunker
remote = googlecrypt:chunk
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
Current remotes:
 
Name                 Type
====                 ====
boxsecret            crypt
boxsecretchunked     chunker
cybox                box
google               drive
googlechunk          chunker
googlecrypt          crypt
onedrive             onedrive
onedrivechunker      chunker
onedrivecrypt        crypt
 
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q 
$ rclone ls googlechunk:

```

You now have an encrypted chunked storage remote, that is fully md5 checksummed. 

