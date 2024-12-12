---
title: "Software Package/Environment Management Workshop: Python and conda"
description: In this workshop presented by the SCINet Office, we will cover best practices for managing software packages and computing environments on SCINet's supercomputers.
excerpt: "We will begin by focusing on package and environment management with the standard Python toolset: the `venv` and `pip` modules that are usually included with Python. Later, we will learn package and environment management with conda."
categories: [2024 10 SPEMW] 
sidenav_link: /training/resources

materials:
  - text: Session Recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/Ef55DPFjTMdOqzMwxs4UAtYBDwq4xzLT5qp4M9jzOSZLIg
---

## Managing packages and environments in Python

We will begin by focusing on package and environment management with the standard Python toolset: the `venv` and `pip` modules that are usually included with Python. Later, we will learn package and environment management with conda.

### Choosing which version of Python to use

1. First, use the cluster's environment module system to find and load the version of Python you want to use for your project: `module spider python` or `ml spider python`.
1. Load the version of Python you'd like to use. E.g., `module load python/3.12.5` or `ml load python/3.12.5`. (Note that you can use tab completion for module names!)
1. It is a good idea to run `python` or `python3` and verify that you get the version you want!

Note: After you create your virtual environment, you no longer need to load the associated Python environment module. You can simply activate the virtual environment!

### Creating and managing virtual environments with `venv`

1. If you are not already in your workshop directory, change to it by running `cd /90daydata/shared/$USER/`.
1. Use the `venv` module and command to create a new virtual environment: `python -m venv demo_venv`.
1. You should now see a new folder called `demo_venv`. Let's take a look inside and explore a bit!
1. You now have a virtual environment that is ready to use. The easiest way to use the environment is to _activate_ it. Run `source demo_venv/bin/activate`. After running this command, notice that the command prompt has changed to indicate that you are working in the virtual environment named "demo_venv".
1. To deactivate the environment and return to the "normal" command environment you had before, run `deactivate`.
1. To remove the environment, delete its directory: `rm -I -r demo_venv`.

That is pretty much everything you need to know about how to use and manage Python virtual environments! The `venv` command does have [more options](https://docs.python.org/3/library/venv.html), but you most likely won't need them.

### Installing and managing Python packages in a virtual environment

The standard software tool for managing Python packages is `pip`, which is included with Python. If a Python virtual environment is activated, `pip` commands will automatically be applied to the active virtual environment.

1. If you have not already done so, create and activate a Python virtual environment using `venv`.
1. Use `python -m pip install PACKAGE` to install one or more Python packages. E.g., `python -m pip install termcolor`.
1. Try importing the newly installed package in Python to confirm the installation succeeded.
1. To upgrade a package that is already installed, use `python -m pip install --upgrade PACKAGE`.
1. To remove a package, use `python -m pip uninstall PACKAGE`.

`pip` is a fairly complex piece of software with many commands and options. (Fortunately, it also has [good, detailed documentation](https://pip.pypa.io/en/stable/)!) However, the basic commands above, plus a few more we'll learn in the next section, will likely be all that you need!

> **Exercise 1:** Use `nano` (or the text editor of your choice) to save the following Python program to a file called `print_data.py` (e.g., `nano print_data.py`). Try running the program: `python print_data.py`. What happens? Create a virtual environment for the program and use it to run the program. What does the program do?

{:.copy-code}
```
from termcolor import cprint
from faker import Faker

fake = Faker()
n = 4

def print_fake_data():
    cprint(f'Name: {fake.name()}', 'cyan')
    cprint(f'Company: {fake.company()}', 'white')
    cprint(f'Job: {fake.job()}\n', 'green')

for i in range(n):
    print_fake_data()
```

### Using `requirements.txt` to automate package management

In order to make virtual environments and package management _truly_ useful, we need a mechanism to easily and precisely record all of the packages an environment requires. `pip` can use a special "requirements file", usually named `requirements.txt`, to do this. In its simplest form, `requirements.txt` simply lists the names of packages that are needed for an environment, with one package on each line. For example:
```
package_one
package_two
```

The requirements file can also provide information about the _versions_ of a package that are acceptable.
```
package_one == 2.4.1
package_two > 1.3
```

The example above specifies that `package_one` _must_ be version 2.4.1, and `package_two` can be any version as long as it is more recent than 1.3. There are many more possibilities; see [the official documentation](https://pip.pypa.io/en/stable/reference/requirements-file-format/) to learn more.

Not only are requirements files handy for documenting the packages in an environment, they also make it very easy to install the packages an environment requires! To install all packages specified in `requirements.txt`, run `python -m pip install -r requirements.txt`.

You can of course write `requirements.txt` by hand, but is often quite helpful to let `pip` make it for you! Once you have your virtual environment set up the way you want, you can use `python -m pip freeze` to generate the contents of `requirements.txt` that will exactly recreate the environment. To write the command output directly to a file, run `python -m pip freeze > requirements.txt`. (Be careful, though, because that command will overwrite `requirements.txt` if it already exists.)

It is a good practice to include a `requirements.txt` file along with the code and documentation for a project. That way, you or anyone else who uses your code can easily create a suitable virtual environment for the project. Using a `requirements.txt` file therefore helps ensure that your code and analyses are fully reproducible.

> **Exercise 2:** Create a `requirements.txt` file for the virtual environment you created for the previous exercise. How many packages are included in the file? Why?

> **Exercise 3:** Create a _new_ virtual environment and install all packages from `requirements.txt` from Exercise 2 into the virtual environment. Confirm that the program from Exercise 1 runs in your new virtual environment.

### Using virtual environments with Jupyter notebooks

What we've learned so far is all you need for using Python from the command line. How, though, do you access your virtual environment from a Jupyter notebook? For this, we need to create a "Jupyter kernel" to make our environment available in notebooks.

1. From the command line, make sure the target virtual environment for the kernel is activated.
1. Install the `ipykernel` package: `python -m pip install ipykernel`.
1. Create a "kernel specification" that will make the virtual environment available to Jupyter notebooks: `python -m ipykernel install --user --name "KERNEL NAME"`.

You should now see your new kernel available for use with Jupyter notebooks. (It might take a minute or two for Jupyter to detect the new kernel.)

What if, after creating the Jupyter kernel, you need to change your virtual environment by adding or removing packages? That is no problem, and you do _not_ need to create the kernel specification again. The kernel specification merely provides access to the virtual environment. If you modify the virtual environment, the changes will automatically be available to notebooks that use the environment via a Jupyter kernel.

If you want to remove a Jupyter kernel, you can run `jupyter kernelspec uninstall KERNELNAME` from the command line. To see the names of all installed kernels, run `jupyter kernelspec list`. (Installing the `ipykernel` package should also give you the `jupyter` command, but you will need to be sure your Python virtual environment is active in order to use it.)

For the next exercise, we will use [Open OnDemand on Atlas](https://atlas-ood.hpc.msstate.edu/).

1. Log on to [Open OnDemand on Atlas](https://atlas-ood.hpc.msstate.edu/).
1. From the Open OnDemand landing page, select "Interactive Apps" > "Jupyter". You will be taken to a page with multiple input fields to configure your Jupyter session. 
1. Select the following inputs: 
    * Account: scinet_workshop1
    * Partition: atlas
    * QOS: normal 14-00:00:00
    * Number of hours: 2
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: \-\-reservation=workshop \-\-mem=8G
    * Working Directory: /90daydata/shared/${USER}

> **Exercise 4:** Using Open OnDemand, launch a new JupyterLab session and open a new Jupyter notebook using the default "Python 3" kernel. Paste the following into a code cell and run the code. What happens?

{:.copy-code}
```
import plotnine as pn
import numpy as np
import pandas as pd

df = pd.DataFrame({
    'x': np.arange(100),
    'y': np.cumsum(np.random.randn(100))
})
(pn.ggplot(df, pn.aes(x='x', y='y'))
    + pn.geom_line()
    + pn.xlab('Time')
    + pn.ylab('An important measurement!')
)
```
> Create a suitable virtual environment for this code, then create a Jupyter kernel for your notebook from the environment. Verify that the code runs.


## Managing packages and environments with Anaconda

If all of the software components you need to manage in your virtual environment are Python packages, we strongly recommend using the `venv` and `pip` workflow described in detail above. Why? Because `pip` and `venv`:
* Are included with Python and therefore available pretty much anywhere Python is available. This helps ensure that your workflow is portable and easy to share.
* Install packages from PyPI, the Python Package Index, which ensures you have access to the most recent versions of Python packages.
* Are officially supported by the Python project. This helps ensure future reproducibility.

However, if you need to manage other kinds of software, too, `conda` can provide a useful alternative. Conceptually, the process of managing software using `conda` is the same: you create a virtual environment and then manage software packages within that environment. We will go over the basics in this workshop; please see [the official documentation](https://conda.io/projects/conda/en/latest/user-guide/index.html) for more information!

### Load and initialize miniconda

First, load the environment module for miniconda so that you have access to the `conda` command:
* On Ceres: `module load miniconda` or `ml load miniconda`.
* On Atlas: `module load miniconda3` or `ml load miniconda3`.

If you've not used `conda` before on the system, you will need to run `conda init`. By default, this will cause the conda "base" environment to automatically be activated every time you log in. This can be annoying! If you want to disable this, run `conda config --set auto_activate_base false`. (You can also undo _all_ changes made by `conda init` by running `conda init --reverse`.) After running `conda init` for the first time, you will need to either exit your shell session and start a new one or run `source ~/.basrc`.

Note: `mamba` is a drop-in replacement for `conda` that is generally faster and more robust. However, recent versions of `conda` have adopted code from the `mamba` project so that there is now less of a performance gap between the two. If `mamba` is available (`mamba` is currently available on Ceres but not on Atlas), you can simply replace `conda` with `mamba` in the commands below.

**An important note about conda channels:** `conda` installs software from a "channel", which is essentially a remote software repository. By default, `conda` attempts to install software from a channel called "defaults". However, use of the "defaults" channel requires a paid license, so USDA employees should _not_ install software from "defaults"! Instead, we recommend you use the "conda-forge" channel, which is free to use. To see which channel(s) you are using, run `conda config --show channels`. If you see "defaults" listed, complete the following steps:

1. Run `conda config --add channels conda-forge` to add the "conda-forge" channel.
1. Run `conda config --remove channels defaults` to remove the "defaults" channel.

### Creating and managing environments with `conda`

First, let's cover what _not_ to do! Most online documentation will tell you to create a new conda environment by running `conda create -n ENVNAME`, where "ENVNAME" is the name of the new environment. E.g., `conda create -n conda_env`. The problem with this is that all packages will be installed into a hidden directory inside your home directory (typically `~/.conda/envs`) and you will quickly run out of space!

Instead, we need to tell `conda` to create the environment in a location that we choose. Proceed as follows:

1. Run `conda create --prefix ENVNAME`, where "ENVNAME" is the name of the new environment. E.g., `conda create --prefix conda_env`. This will create a directory called "ENVNAME" for the new environment.
1. Activate the environment by running `conda activate /path/to/ENVNAME`, where "path/to/ENVNAME" is the file system path to the environment location. E.g., `conda activate ./conda_env`.
1. To deactivate the environment and return to the "normal" command environment you had before, run `conda deactivate`.
1. To remove the environment, delete its directory: e.g., `rm -I -r conda_venv`. Alternatively, you can run the command `conda remove --prefix /path/to/ENVNAME --all`.

### Installing and managing software in a conda environment

The `conda` command is also used to install and remove software from a conda environment.

1. Make sure the target conda environment is activated.
1. Run `conda install PACKAGE` to install software into a conda environment.
1. Run `conda remove PACKAGE` to uninstall software.

Note that a conda environment does not automatically include Python, so you will need to tell `conda` to install it!

> **Exercise 5:** If you have not already done so, create a new conda environment called `conda_env`. Activate the environment and launch Python (`python`). The most recent version of Python available from the `conda-forge` channel is 3.12.6. What do you notice? Use `conda` to install the latest version of Python from `conda-forge` into your conda environment and verify that it works.

Conda provides an alternative way to manage Python packages. Although you can still use `pip` from within a conda environment, doing so can introduce a variety of complications, and the [official recommendation](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-non-conda-packages) is to use `conda` to manage Python packages within a conda environment whenever possible.

> **Exercise 6:** Modify your conda environment so that you can run the Python script you created for Exercise 1.

### Using `environment.yml` to automate package management

Just as we can use `requirements.txt` to specify the packages to include in a Python virtual environment, we can use a file typically called `environment.yml` to specify the packages to include in a conda environment.

To automatically generate the contents of `environment.yml` for an activated conda environment, run `conda export --from-history`. To save the output directly to a file, run `conda export --from-history > environment.yml`.

To create a new conda environment that matches the contents of an environment file, run `conda env create --prefix ENVNAME --file environment.yml`, where "ENVNAME" is the name of the new environment. E.g., `conda env create --prefix conda_env --file environment.yml`.

> **Exercise 7:** Save the configuration of the conda environment you created for Exercise 6 and use it to create a new conda environment. Verify that you have the correct version of Python in the new environment and are able to run the Python script you created for Exercise 1.

### Using conda environments with Jupyter notebooks

The process to make a conda environment available to Jupyter notebooks is nearly the same as for Python virtual environments.

1. Make sure the target conda virtual environment for the kernel is activated.
1. Install the `ipykernel` package: `conda install ipykernel`.
1. Create a "kernel specification" that will make the virtual environment available to Jupyter notebooks: `python -m ipykernel install --user --name "KERNEL NAME"`.

You should now see your new kernel available for use with Jupyter notebooks. (It might take a minute or two for Jupyter to detect the new kernel.)

> **Exercise 8:** Create a new conda environment, install Python into it, and create a Jupyter kernel for the environment. Modify the environment so that you can use the kernel to run the code from Exercise 4 in a Jupyter notebook.

