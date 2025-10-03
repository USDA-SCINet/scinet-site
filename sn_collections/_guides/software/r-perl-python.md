---
title: User-installed R, Python, and Perl Packages
description: Installing R, Python, and Perl packages
## author: VRSC

categories: [Software]
redirect_from:
  - /guides/analysis/r-perl-python

subnav:
  - title: Installing R packages
    url: '#installing-r-packages'
  - title: Python
    url: '#python'
  - title: Perl
    url: '#perl'


---

{% include images_path %}




The popular R, Perl and Python languages have many packages/modules available. Some of the packages are installed on Ceres and are available with the r/perl/python_2/python_3 modules. To see the list of installed packages, visit the [Preinstalled Software List]({{ site.baseurl }}/guides/software/preinstalled) page or use  `module help <module_name>`  command. If users need packages that are not available, they can either request VRSC to add packages, or they can download and install packages in their home/project directories. We recommend installing packages in the project directories since collaborators on the same project most probably would need same packages. In addition, home quotas are much lower than quotas for project directories.
<!--excerpt-->

The following instructions are for a few commonly used software packages to help users install these packages without admin intervention.

## Installing R Packages

Users can install R packages using the  `install.packages()`  command.

The default location is the user's home directory. User can specify other directories to which they have access privileges, such as project directory. Installing R packages in a project directory is recommended as users working on the same project have access to the same environment.

To install packages in a project directory, go to the project directory:
```
cd <path/to/the/project/directory>
```
and create a ".Renviron" file containing the following line:

`R_LIBS_USER=<path/to/the/project/directory>/R_packages/%v`

Then when R is started from the directory `<path/to/the/project/directory>`, the R packages for the given version of R will be saved in the above location.

Load an environment module for the desired version of R and start R:
```
$ module load r/4.4.1 # or simply use 'r' to load the latest version
$ R
R version 4.4.1 (2024-06-14) -- "Race for Your Life"
```

To install 'abc' package issue the  `install.packages()`  command and answer "y" to both questions:
```
> install.packages("abc", repos="http://cran.r-project.org")
Warning in install.packages("abc", repos = "http://cran.r-project.org") :
'lib = "/lustre/project/software/7/apps/r/4.4.1/lib64/R/library"' is not writable
Would you like to use a personal library instead? (yes/No/cancel) yes
Would you like to create a personal library
<path/to/the/project/directory>/R_packages/4.0
to install packages into? (yes/No/cancel) yes
```

To see the library paths, issue  `.libPaths()`  command from within R:
```
> .libPaths();
[1] "<path/to/the/project/directory>/R_packages/4.0"
[2] "/lustre/project/software/7/apps/r/4.4.1/lib64/R/library"
```

## Python

Users can install python packages(via pip) to their home directory. This creates a "site-packages" directory within the user's home directory.
```
$ module load python_3
$ python -m pip install --user <package.name>
```

By default the packages for python 3.3 and above are stored in ~/.local/lib/python<version>/site-packages

However, installing packages in the default user location is **discouraged**, as it may lead to conflicts when working with multiple Python environments.

A better approach, especially when working on shared projects or installing packages in non-standard locations, is to use a virtual environment.

After loading the python module, create a virtual environment by:
```
$ python -m venv <path/to/the/project/directory/name.of.the.project>
```

Note that this virtual environment starts clean without using any global python site-packages that are already installed. Use  **`--system-site-packages`**  if you want to use global site-packages.

This creates a directory in your current project directory. This example below shows a virtualenv "virt_test" being created and activated.
```
$ python -m venv virt_test
$ source virt_test/bin/activate
(virt_test) $ pip3 list
Package    Version
---------- -------
pip        24.0
setuptools 65.5.0
```

To exit this environment, run deactivate:
```
(virt_test) $ deactivate
```

This virtual environment can be activated again anytime.

For instructions on how to manage Python packages using Conda, see [User-installed Software on Ceres with Conda]({{ site.baseurl }}/guides/software/conda).

## Perl

There are multiple ways to install modules in Perl and depending on the use case, one may be preferable over the others.

**cpanm** is a convenient tool to install modules in the home directory.
```
$ module load perl
$ cpanm Test::More
```

Running the above command creates a "perl5" directory within the users' home directory and contains all the required binaries and libraries associated with the "Test::More" module. Add **PERL5LIB** to the environment
```
$ export PERL5LIB=$HOME/perl5/lib/perl5:$PERL5LIB
```

Perl modules can also be installed in other directories. For example, the user can have the modules available to the rest of the project members so that everyone involved works in the same environment.

If **local::lib** is not already installed, you can bootstrap it using the following command:
```
$ cpanm --local-lib=~/perl5 local::lib && eval $(perl -I ~/perl5/lib/perl5/ -Mlocal::lib)
```

**local::lib** provides the flexibility for users to install modules in any custom location (as long as they have write permissions).
```
$ eval "$(perl -I/path/to/the/project/dir/perl5/lib/perl5 -Mlocal::lib=/path/to/the/project/dir/perl5)"
```

In addition to creating "perl5" directory within the specified project directory, the above
command adds perl local::lib environment variables.

Then use cpanm to install the required modules.
```
$ cpanm Test::More
```

Note: The package source files will still be downloaded to your home directory (~/.cpanm/sources)

Note: All users working on the project can access modules that were installed using local:lib, but only the original user can perform perl module installs.
