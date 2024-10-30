---
title: "Software Package/Environment Management Workshop: R"
description: In this workshop presented by the SCINet Office, we will cover best practices for managing software packages and computing environments on SCINet's supercomputers.
excerpt: "In this session, we will begin by using R from the command line. Later, we will cover similar steps using RStudio Server available on Open OnDemand. We will primarily focus on using the `renv` package for package management, but we will also note alternatives at the end."
categories: [2024 10 SPEMW] 

sidenav_link: /training/resources

materials:
  - text: Session Recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EXDitJDkH8JBoPwUwmZryoABJ40oa6XL2K6CDOv4FgWlkA?e=BATq8f
---

## Managing packages and environments in command-line R

In this session, we will begin by using R from the command line. Later, we will cover similar steps using RStudio Server available on Open OnDemand. We will primarily focus on using the `renv` package for package management, but we will also note alternatives at the end. 

### Choosing which version of R to use 

Multiple R versions are available in the environment module system. Note that modules are named with 'r' and the program available after the module is loaded is 'R'. With each new minor version of R you use, the `renv` package will need to be installed.

1. First, use the cluster's environment module system to find and load the version of R you want to use for your project: `module spider r` or `ml spider r` (note the lower-case 'r'!).
1. Load the version of R you'd like to use. E.g., `module load r/4.4.0` or `ml load r/4.4.0`. 
1. Run `R` to open an R session of the version of R you loaded from a module. 
1. Run the R command `install.packages('renv')` to install `renv` for this version of R. 
1. Run `q()` to exit R, and enter `n` when prompted to save the workspace image.

### Creating and managing R environments with the `renv` package

To use `renv` for package management, it needs to be associated with an R project. This could be an empty directory if you are just starting a project or it could be one or more R scripts within a directory. Either way, the scope of the `renv` environment will be dictated by the working directory in which it is initialized. To initialize an `renv` environment, you use the `renv::init()` command. **For getting started and for this workshop, we recommend passing two arguments when initializing the environment: `renv::init(settings = list(use.cache = FALSE, ppm.enabled = FALSE))`.** These arguments keep package installations within the project directory instead of your home directory and prevent some potentially faulty URL translations from happening when packages are downloaded from repositories. 

1. If you are not already in your workshop directory, change into it by running `cd /90daydata/shared/$USER/`.
1. Create and change directory to a project directory: 
    
    {:.copy-code}
    ```
    mkdir my_project
    cd my_project
    ```
1. Start an R session with `R`.
1. Initialize `renv` by running `renv::init(settings = list(use.cache = FALSE, ppm.enabled = FALSE))`. Some handy messages will appear to describe what `renv` has done. 

> **Exercise 1:** What files have been added to the project directory? (Hint: use `ls -a` to include hidden files). What kind of content do they contain? (Hint: use `cat filename` to print file contents to the screen.)

> **Exercise 2:** Return to /90daydata/shared/$USER/, create and change directory to a new project folder `project1`, and save the following R code into a file named `exercise2.R`. (Hint: use `nano exercise2.R`.) Open an R session and initialize `renv` for the project. What kinds of messages appear now?

{:.copy-code}
```
library(magrittr)

x <- help.search("*", package="base")

N <- 3
for(i in c(1:N,N:1)){
    string <- x$matches$Title %>% 
        sample(i) %>%
        cat('\n')
}
```

R will have to be restarted before the project library is setup, i.e., our `exercise2.R` script won't run successfully. 

1. Quit the current session and run `R` to open a new one.
1. Run the script with `source('exercise2.R')`. 

Now we are set up with a project with an `renv` environment!

### Installing and managing R packages in your project library

Next, we will expand our project with additional packages! 

1. You can install packages into your environment as you normally would with `install.packages('PACKAGE')`, or `renv` does have an expanded installation function `renv::install('PACKAGE')` that supports additional remote package sources, e.g., GitHub. If you are interested in learning more about `renv::install()`, please see the documentation [here](https://rstudio.github.io/renv/reference/install.html). 
1. To have `renv` save the state of the project (i.e., capture all the metadata of the used packages) in the environment configuration file called a 'lockfile', run `renv::snapshot()`. 
1. If you want to assess the state of the environment, (i.e., which packages are installed but not used, or which packages are used but not recorded), run `renv::status()`.
1. Let's save the script below in our project and install an old version of the `cli` package so we can simulate needing to update to the latest version next: `install.packages("https://cran.r-project.org/src/contrib/Archive/cli/cli_3.6.1.tar.gz", repos=NULL,type="source")`. 
1. If we call `renv::status()`, it will tell us we are out of sync. If we then call `renv::snapshot()`, it will update the project.

{:.copy-code}
```
library(magrittr)
library(cli)

x <- help.search("*", package="base")

N <- 3
for(i in c(1:N,N:1)){
    string <- x$matches$Title %>% 
        sample(i) %>%
        col_magenta() %>%
        cat('\n')
}
``` 

> **Exercise 3:** Update the version of `cli` with:  `install.packages('cli')`. Modify the environment to be consistent.

1. Another `renv` function to make your project environment consistent is `renv::restore()`. It helps update your project library to match your lockfile.
1. For example, if we install the `MASS` library because we think we may need it but later don't, `renv::restore(clean=TRUE)` will help remove the unused package from the project library.
1. `renv::restore()` can also be used to revert package version discrepancies like for `cli` above. 

### Reproduce renv projects 

In order to make environments and package management _truly_ useful, we need a mechanism to easily reproduce environments. With the `renv` project files we looked at before, you can have `renv` reproduce the same environment in a new project directory.

1. The `renv` directories and files that should remain with the project are the `renv.lock` file, the `renv/activate.R` and `renv/settings.json` files, and the `.Rprofile` file. With these files, the project environment can be easily recreated, therefore helping to ensure that your code and analyses are fully reproducible.
1. If you are using git for version control for the project, `renv` adds the `renv` files that do not need to be tracked (i.e., the packages themselves) to the `.gitignore` file for you. 

> **Exercise 4:** Create a new project directory in your workshop directory. Copy over the script and lockfile from `project1` into the new project. From the new project directory, run `R`. What happens? Try initializing. 

> **Exercise 5:** Create another new project directory in your workshop directory. Copy over all of `project1`'s files except `renv/library` and `renv/staging` (the package files) into the new project. From the new project directory, run `R`. What happens? 



## Managing packages and environments in RStudio Server

The approach of using `renv` in RStudio is very similar to using `renv` with command-line R. For completeness, we will create another environment in RStudio Server. 

### Choosing which version of R to use

Multiple R versions are available when requesting RStudio Server sessions on Open OnDemand. From the [Open OnDemand](https://atlas-ood.hpc.msstate.edu/) page, select "Interactive Apps" > "RStudio Server". You will be taken to a page with multiple input fields to configure your RStudio Server session and one of those is "R Version". 

1. For the following exercise, select the following inputs: 
    * R Version: 4.3.3
    * Account Name: scinet_workshop1
    * Partition: atlas
    * QOS: normal 14-00:00:00
    * Number of hours: 2
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: \-\-reservation=workshop \-\-mem=8G
1. When you are in RStudio Server, install `renv`. Note, we only need to install `renv` because we chose a different version of R. 


### Creating and managing R environments with the `renv` package

Since `renv` is project specific, you need to change the working directory to the project directory in which you would like to use `renv`. Once in the project directory, you can run `renv::init(settings = list(use.cache = FALSE, ppm.enabled = FALSE))` to start managing the project environment with `renv`. 

In RStudio Server, there are also additional graphical features in the interface when `renv` is active. E.g., note that there is an "renv" button at the top of the "Packages" pane. If you click on it, there is a dropdown menu that includes shortcuts to the `renv::snapshot()` and `renv::restore()` functions. 

1. Create a new project directory.
2. Initialize `renv` for the new project with `renv::init(settings = list(use.cache = FALSE, ppm.enabled = FALSE))`. If you do not see the activation message when R restarts, you will have to manually call it with `source(renv/activate.R)`.
3. Add at least one script to the project and install the packages it uses with either `install.packages('PACKAGE')` or `renv::install('PACKAGE')`.
4. Take a snapshot of the environment with `renv::snapshot()` to update the lockfile. 


> **Exercise 6:** Use the `renv::install()` function to download the development version of the 'nsyllable' package on GitHub at 'quanteda/nsyllable'. Save the script below as an R script in your project directory. What does the program do? Use the "renv" button in the "Packages" pane to make sure this project's lockfile captures the new package. Open the `renv.lock` file to see the entry for the new package. 

{:.copy-code}
```
library(magrittr)
library(nsyllable)

x <- help.search("*", package="base")
x$matches["nsyl"] <- nsyllable(x$matches$Title)

for(i in c(5,7,5)){

correct_length <- x$matches$nsyl == i 

string <- x$matches$Title[correct_length] %>%
        sample(1) %>%
        cat('\n')
}
```

## If you don't want to use `renv`

`renv` is the main solution if you want a handful of commands to manage a project's packages with a project-specific library and also document that process to increase reproducibility. If, for any reason, you are not a fan of `renv`, there are some commands and R-related files that can help you at least manage the locations of package installations. 

R commands:
* `.libPaths()`: This function returns the path(s) of available libraries from which packages may be loaded. If there are multiple libraries available (i.e., if `.libPaths()` returns multiple paths), R will search for packages across libraries in the order in which `.libPaths()` lists the library paths. The function can also be used to add additional available libraries: e.g., `.libPaths('/path/to/new/library')` will prepend "/path/to/new/library" to the list of available libraries, making it the first library searched in when loading packages. It is thus very handy to call `.libPaths('/path/to/project/library')` to make your project-specific library the first place in which packages are searched for loading. However, changes to `.libPaths()` only persist during the R session in which it was run.
* `install.packages()`: When you install R packages with `install.packages()`, the default location for installing those packages is in the first library path returned by `.libPaths()`. If you want a package installed somewhere else besides that first library path, you can specify the desired path with the `lib` parameter in `install.packages()`: e.g., `install.packages('PACKAGE', lib=‘path/to/the/project/library’)`. 
* `library()`: When loading a package with `library()`, R will search for packages across libraries in the order in which `.libPaths()` lists the library paths. If you instead want to specify the library path from which a package should be loaded, you can use the `lib.loc` parameter in `library()`: e.g., `library(PACKAGE, lib.loc='path/to/the/project/library')`.

R-related file:
* `.Renviron`: You can specify R environment variables in this file, including `R_LIBS_USER` which is a path that will be prepended to the library paths maintained by `.libPaths()`. For example, if you have `R_LIBS_USER=path/to/the/project/library/%v` in your `.Renviron` file in a directory, any R session started from that directory will first look in `R_LIBS_USER=path/to/the/project/library/%v`, where `%v` is the version of R being used, for packages to load. 

