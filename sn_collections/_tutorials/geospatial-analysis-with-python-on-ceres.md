---
title: Geospatial Analysis with Python on Ceres
description: tutorial from LTAR webinar series HPC for geospatial analysis
author: Rowan Gaffney
redirect_to: /assets/html/Tutorial1-JHub.html
class: usa-link--external
excerpt: Efficient data practices, using JupyterHub and Lab on Ceres, using Dask for parallel computing
---

[link to tutorial](/assets/html/Tutorial1-JHub.html)

<div style="display: none;">

Outline

    Efficient Data Practices on Ceres
    1.1 Transferring Data
    1.2 Reducing Size

    Python Setup
    2.1 Overall Setup - Background
    2.2 Step by Step Instructions

    Cluster Setup
    3.1 Overall Setup - Background
    3.2 Step by Step Instructions

1. Data on Ceres

Transferring Data

    I2 Connection (at select locations)
        For very large data transfers
        Secure Copy (SCP) to transfer data
        Additional documentation on Scinet Basecamp
    Globus
        Specifically designed for HPC data transfer. Intuitive web based GUI. Globus Link
        Additional documentation on Scinet Basecamp
    JupyterLab
        Upload files (from local storage to Ceres) by using the upload icon within the files tab
        Download files (from Ceres to local storage) by right clicking file/folder and choosing "Download" or "Download Current Folder as Archive"

Reducing Data Size
Data Type

Scaling and changing the data type is an effective way to reduce the overall size of your data. A common datatype is floating point 64 bit, which has a level of precision that is often far greater than the precision in the data. Consider reflectance data ranging from 0.0 to 1.0 in floating point representation. Scaling by 10,000, and converting to int16 (16 bits) perserves the precision of the data and can reduce the size by a factor of 4.

Consider the Below Example:

import numpy as np

array1 = np.random.random((1000,10000)).astype(np.float64)
print('This array, in '+str(array1.dtype)+', is '+str(array1.nbytes*1e-6)+' MB')

array2 = np.round(array1*10000.,0).astype(np.int16)
print('Scaling and converting the array to '+str(array2.dtype)+' results in a size of '+str(array2.nbytes*1e-6)+' MB')

This array, in float64, is 80.0 MB
Scaling and converting the array to int16 results in a size of 20.0 MB

Data Compression

Most raster formats have internal lossless compression options. Depending on the nature of your data, this can reduce the size substantially. For detailed specifications of raster formats see the GDAL specifications. Other common file formats, such as Zarr (Zarr Compression) and NetCDF (NetCDF Compression) have internal compression options as well.
Virtual Rasters

A common issue with geospatial analysis is working with data in different projections. A typical workflow may be to reproject data into a common projection, which results in duplication. An alternative is to use Virtual Raster Files (.VRT), which a simple .xml files that describe how the data should be transformed when opened.

In addition to re-projecting, Virtual Raster Files can be used to mosaic, alter resolutions, resample, etc... An efficient tool for building VRT files is gdalbuildvrt

2. Python Setup

Overall Setup - Background

Interface

    JupyterLab: Web-based user interface (IDE for Python, R, IDL, etc...)
    JupyterHub A multi-user Hub that spawns, manages, and proxies multiple instances of the single-user Jupyter notebook server

Packages / Resouces

    Dask: Parallel Computing Library
    Xarray: Labelled multi-dimensional array package
    Numpy: Fundamental package for scientific computing with Python
    Rasterio: Raster IO and processing.
    Pangeo : NSF funded project for Big Data Geoscience. Implements a system very similiar to the container used on Ceres (titled: data_science_im_rs)
    EarthML: Examples of machine learning and visualization for Earth science. Supported and maintained by Anaconda, as a collaboration with the NASA Goddard Space Flight Center.

Cluster

    Dask Distributed (a python library for parallel and distributed computing) uses Direct Acyclic Graphs to distribute data and processing across the cluster (very different from a MPI style cluster). Components of a dask cluster include:
        Client
        Scheduler
        Workers

Container

    Singularity Container which can be found on Docker Hub
        Location URL: docker://rowangaffney/data_science_im_rs:latest
        Modified from the data_science docker stack
        Thanks to Yasasvy (Yash) Nanyam (Scinet VRSC) for helping getting it working
        Github: https://github.com/rmg55/data_science_im_rs/blob/master/data_science_im_rs
        Dockerhub: https://cloud.docker.com/repository/docker/rowangaffney/data_science_im_rs/general

Step by Step Instructions

Below are the steps/commands to setup the Python/JupyterLab environment followed by a soundless video of the process on Ceres. Note that you will need to already have a SCINet account. Please visit the SCINet website for detailed instructions to setup an account.

    Access JupyterHub

    Currently, to access JupyterHub, you need to port forward the application to your local system. However, in the future there will be a public URL, and you will not longer need to do this step. To port forward JupyterHub, run the following command in the PowerShell (windows) or terminal (linux). Note that you will need to replace your USER.NAME with your SciNET user name.

        ssh -N -L 8000:jupyterhub.scinet.local:80 USER.NAME@login.scinet.science

    Open in Browser

    Open a web browser (firefox, chrome, edge, etc...) and go to localhost:8000

    Spawn JupyterLab

    Once logged into JupyterHub, you are given a set of options when launching JupyterLab. Below are brief descriptions of each option, followed by the value to use for this tutorial. If this is the first time spawning a notebook from a container on Docker or Singularity Hub (as in this example), it will take 4-10 minutes to donwload and build the container. The container is then cached in your home directory, so on subsequent tries, JupyterLab should spawn in 10 - 30 seconds.

        Node Type: Ceres partition to use when running JupyterLab
              short OR brief-low (ethier works)
        Number of Cores: Number of Cores to allocate
              4
        Job Duration: Length of Job (HH:MM:SS)
              00:30:00
        Additional Slurm Options: Sbatch Options
              (leave blank)
        Notebook/Lab Options: Additional JupyterLab or Jupyter Notebook options
              --notebook-dir=/project/geospatial_tutorials/
        Enter the full path to the container image: Location of the container to use
              docker://rowangaffney/data_science_im_rs:latest
        Container Exec Options: Additional options for the singularity exec command
              --bind /etc/munge --bind /var/log/munge --bind /var/run/munge --bind /usr/bin/squeue --bind /usr/bin/sinfo --bind /usr/bin/scancel --bind /usr/bin/sbatch --bind /usr/bin/scontrol --bind /scinet01/gov/usda/ars/scinet/system/slurm:/etc/slurm --bind /run/munge --bind /usr/lib64 --bind /scinet01 --bind $HOME --bind /software/7/apps/envi -H $HOME:/home/jovyan

    Please be cognizant of the compute resources you are requesting (see best practices below).

    Best Practices
        For short sessions (2hrs or less) please choose the brief-low partition in the "Node Type" drop down, if available.
        For serial computing (non-parallel code) enter 2 or 4 for number of cores.
        For parallel computing choose a reasonable number of cores to meet your needs.
        Choose a reasonable job duration (e.g. Do not choose 48hr job duration so you can leave your session open overnight).
        Remember to stop the jupyter server when you are done working (file --> Hub Control Panel --> Stop Server).

    Note that this data_science_im_rs container has two main environments which include (as of March 18, 2020):
    ► geo (python geospatial - click to see all packages)

    ► r_geo (R geospatial - click to see all packages)
    Furthermore, you can launch the RStudio (which uses the r_geo environment), a terminal, a help window, markdown, text file, and IDL kernel. To access the IDL library, you need to check-out the license from SCINet license server and bind-mounted properly (this is not shown in this example).

The following silent video is a media alternative for the text in steps 1-3 in the "Python Setup" Section above.
Link To Video

3. Cluster Setup

Overall Setup - Background

    Uses the Dask Jobqueue Library to submit jobs to SLURM. Each "Slurm job" has X number of "Python workers".

    Scales across nodes and partitions.

    Number of workers can be scaled up or down dynamically.

    Subject to SLURM resource allocation.

    JupyterLab has a Dask add-on to monitor the cluster.

    Dask includes a Dataframe (ie: Pandas) and Array (ie: Numpy) equivalent features.
        Dask Dataframes
        Dask Array
    Dask is used by Xarray - a geospatial/multidimensionial data package.

Step by Step Instructions

Below are the steps/commands to setup the cluster. Below these steps is a gif of the process on Ceres.

    Load Relevant Libraries

import os
import time
import dask_jobqueue as jq
from dask.distributed import Client,wait
import dask.array as da

    Setup the Client

Need to specify:

    Partition: You may want to change the partition (short, mem, brief-low, etc...) to whatever is available.
    Location of Singularity Image/Container
    SLURM job and python worker structure. In this example, for each SLURM JOB there are:
        2 Python workers (i.e. processes)
        6 cores per Python worker
        3.2 GB per core
        The SLURM job will last 2 hours (wall time)
        The SLURM job will be run on the short and brief-low partitions
        Dask will launch using the docker://rowangaffney/data_science_im_rs:latest image and the geo environment

partition='short,brief-low'
container_url = 'docker://rowangaffney/data_science_im_rs:latest'
conda_env = 'geo'
num_processes = 2
num_threads_per_processes = 6
mem = 3.2*num_processes*num_threads_per_processes
n_cores_per_job = num_processes*num_threads_per_processes

clust = jq.SLURMCluster(queue=partition,
                        processes=num_processes,
                        cores=n_cores_per_job,
                        memory=str(mem)+'GB',
                        interface='ib0',
                        local_directory='$TMPDIR',
                        tmpdir_ssh='/project/cper_neon_aop/neon_2017/analysis/prepocessing/',
                        death_timeout=30,
                        python="singularity -vv exec --bind /usr/lib64 --bind /scinet01 --bind /software/7/apps/envi/bin/ {} /opt/conda/envs/{}/bin/python".format(container_url,conda_env),
                        walltime='02:00:00',
                        job_extra=["--output=/dev/null","--error=/dev/null"])
cl=Client(clust)
dash_addr = '''/user/{}/proxy/{}/status'''.format(os.environ['USER'],cl.scheduler_info()['services']['dashboard'])
print('Dask Lab Extention Address (paste into the dask search box): '+dash_addr)
cl

Dask Lab Extention Address (paste into the dask search box): /user/rowan.gaffney/proxy/8787/status

Client

    Scheduler: tcp://10.1.8.38:43284
    Dashboard: http://10.1.8.38:8787/status 

	
Cluster

    Workers: 0
    Cores: 0
    Memory: 0 B

num_jobs=12
clust.scale(n=num_jobs*num_processes)
while (((cl.status == "running") and (len(cl.scheduler_info()["workers"]) < num_jobs*num_processes))):
    time.sleep(.1)
cl

Client

    Scheduler: tcp://10.1.8.38:43284
    Dashboard: http://10.1.8.38:8787/status 

	
Cluster

    Workers: 24
    Cores: 144
    Memory: 460.80 GB

A few quick example.

    60 GB data: Calculate the mean without holding the data in memory
    600 GB data: Calculate the mean without holding the data in memory
    60 GB data: Persist the data to memory and calculate the mean

t = da.random.random((10000,7500,100),chunks=(400,400,-1))
t

	Array 	Chunk
Bytes 	60.00 GB 	128.00 MB
Shape 	(10000, 7500, 100) 	(400, 400, 100)
Count 	475 Tasks 	475 Chunks
Type 	float64 	numpy.ndarray
	
100 7500 10000

t2 = t.mean()
t2

	Array 	Chunk
Bytes 	8 B 	8 B
Shape 	() 	()
Count 	1132 Tasks 	1 Chunks
Type 	float64 	numpy.ndarray
	

Now we will dynamically load the data, compute the results, and drop the data.

t2.compute()

0.49999816307535666

Lets try working with data larger than memory

t = da.random.random((100000,7500,100),chunks=(400,400,-1))
t

	Array 	Chunk
Bytes 	600.00 GB 	128.00 MB
Shape 	(100000, 7500, 100) 	(400, 400, 100)
Count 	4750 Tasks 	4750 Chunks
Type 	float64 	numpy.ndarray
	
100 7500 100000

t2 = t.mean()
t2

	Array 	Chunk
Bytes 	8 B 	8 B
Shape 	() 	()
Count 	11208 Tasks 	1 Chunks
Type 	float64 	numpy.ndarray
	

t2.compute()

0.5000005197202411

Alternatively, we can load the data to the cluster with the "persist" option

t = da.random.random((10000,7500,100),chunks=(400,400,-1)).persist()
wait(t)
t

	Array 	Chunk
Bytes 	60.00 GB 	128.00 MB
Shape 	(10000, 7500, 100) 	(400, 400, 100)
Count 	475 Tasks 	475 Chunks
Type 	float64 	numpy.ndarray
	
100 7500 10000

t.mean().compute()

0.4999999739855532

The following silent video is a media alternative for the text in the "Cluster Setup" Section above.
Link To Video

</div>