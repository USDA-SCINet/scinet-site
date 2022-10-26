---
title: Storage Quotas
description: Quotas on Home and Project Directories
categories: [Data]

subnav:
  - title: Quotas on Home and Project Directories
    url: '#quotas-on-home-and-project-directories'



---

Each file on a Linux system is associated with one user and one group. On Ceres, files in a user's home directory by default are associated with the user's primary group, which has the same name as user's SCINet account. Files in the project directories by default are associated with the project groups. Group quotas that control the amount of data stored are enabled on both home and project directories.

At login, current usage and quotas are displayed for all groups that a user belongs to. The `my_quotas` command provides the same output:
```
$ my_quotas
```

<!--more-->

If users need more storage than what is available in the home directory, they should visit the [Request a Project Storage]({{ site.baseurl }}/support/request-storage) page. Several users may work on the same project and share the same project directory.

Project directories are located in the 2.3PB Lustre space that is mounted on all nodes as /lustre/project and is also accessible as /project. Directories in /project are not backed up. **It is not recommended to run jobs from a directory in /KEEP.**

Since on Ceres usage and quotas are based on groups, it's important to have files in the home directories to be associated with the users' primary groups, and files in the project directories to be associated with project groups. Sometimes it may happen that files that were originally located in a home directory, were later moved to a project directory with the group ownership preserved. In this case even though files will be located in a project directory, they still will count against home directory quota. To fix this, change the group ownership of these files to the project directory group. The following command will change group association of all files in the project directory in /project (it may take a while if there are too many files in the directory):
```
$ chgrp -R proj-<project_directory_name> /project/<project_directory_name>
```

To search for files owned by your primary group in a project directory, issue:
```
$ find /project/<project_directory_name> -group <SCINet UserID> -type f
```

For more information about storage options, refer to [SCINet Storage Guide]({{ site.baseurl }}/guide/storage).

## Local Sharing of Files with Other Users
Users who would like to share files with other users can use /90daydata/shared directory. Files older than 90 days will be automatically deleted.

NOTE: Files in /90daydata/shared folder by default are accessible to everybody on the system. Thus, this mechanism for sharing should only be used for files of a non-confidential nature.
