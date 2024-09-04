---
title: Environment Modules
description: The Environment Modules package provides dynamic modification of your shell environment. 
order_number: 30
categories: [Software]

subnav:
  - title: Useful Modules Commands
    url: '#useful-modules-commands'
  - title: Loading and Unloading Modules
    url: '#loading-and-unloading-modules'
  - title: Module - command not found
    url: '#module-command-not-found'


---

{% include images_path %}




The Environment Modules package provides dynamic modification of your shell environment. This also allows a single system to accommodate multiple versions of the same software application and for the user to select the version they want to use. Module commands set, change, or delete environment variables, typically in support of a particular application.<!--excerpt-->

## Useful Modules Commands

Here are some common module commands and their descriptions:

Command | Description
--- | ---
`module list` | List modules currently loaded in your environment
`module avail` / `module spider` | List available modules
`module unload <module name>` | Remove \<module name> from the environment
`module load <module name>` | Load \<module name> into the environment
`module help <module name>`	| Provide information about \<module name>
`module swap <module one> <module two>` | Replace \<module one> with \<module two> in the environment

For example to use NCBI-BLAST installed on Ceres, follow these steps:
```
$ module load blast+
```

This will load latest version of NCBI-BLAST into your environment and you can use all commands that come with this installation. To see the path to the loaded software and the version type
```
$ which blastp
```

which should display something like:
```
/software/7/apps/blast+/2.9.0/bin/blastp
```

If you want to load legacy NCBI-BLAST on Ceres, follow the example below:
```
$ module load blast
$ which blastall
```
should display something like
```
/software/7/apps/blast/2.2.26/bin/blastall
```

If you would like to find out more about a particular software module, you can use the  `module help`  command, e.g.
```
$ module help blast
```

will output basic information about the blast package, including an URL to the package website.

## Loading and Unloading Modules

You must remove some modules before loading others, to switch versions or dependencies.

For example, if you have already loaded a blast+ module using the "module load blast+" command to use latest version of NCBI-BLAST, but later you want to load a previous version of blast+ (2.2.30), then follow the steps below:
```
$ module swap blast+ blast+/2.2.31
```
or:

```
$ module unload blast+
$ module load blast+/2.2.31
```
```
$ which blastp
```

The last command should display
```
/software/7/apps/blast+/2.2.31/bin/blastp
```

Another example. If you want to compile parallel C, C++, or Fortran code and wanted to use OpenMPI instead of MPICH which is currently loaded in your environment, you can use  `module swap`  or  `module unload`:
```
$ module swap mpich openmpi
```
or:
```
$ module unload mpich
$ module load openmpi
```

Some modules depend on other modules, so additional modules may be loaded or unloaded with one module command. For example, BEAST requires a Java module, so loading the "beast" module automatically loads the correct Java version:
```
$ module load beast
$ which java
```
should display something like:
```
/software/7/apps/java/1.8.0_121/bin/java
```

If you find yourself regularly using a set of module commands, you may want to add these to your configuration files (.bashrc for Bash users, .cshrc for C shell users).

## Module: command not found

The error message module: command not found is sometimes encountered when switching from one shell to another or attempting to run the module command from within a shell script or batch job. The reason that the module command may not be inherited as expected is that it is defined as a function for your login shell. If you encounter this error execute the following from the command line (interactive shells) or add to your shell script:
```
$ source /etc/profile.d/modules.sh
```
