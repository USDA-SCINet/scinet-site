---
title: NEON High Resolution Hyperspectral Data Exercise
description: Tutorial example from LTAR webinar series HPC for geospatial analysis
author: Rowan Gaffney
redirect_to: /assets/html/Tutorial1_Example2_Hyperspectral.html
class: usa-link--external
excerpt: Explore NEON AOP hyperspectral data, calculate/visualize spectral indices, unsupervised ML (clustering)
search_redirect: "Explore NEON AOP hyperspectral data, calculate/visualize spectral indices, unsupervised ML (clustering)
Data: NEON AOP hyperspectral data from LTAR CPER

Strategy:

    Load data and visualize at specific points.

    Calculate and visualize spectral indices.

    Subset and scale data to develop kmeans model.

    Fit a Kmeans model with 8 clusters to data (we will impliment two different methods).

    Predict and visualize entire dataset.

Parallel Algorithm Detail

For parts 1 - 3 we will rely on Dask to extract, transform, and load (ETL) the hyperspectral data. Parts 4 - 5 we will use Dask-ML wrappers on top of scikit-learn (a well-known machine learning library) classifiers to parallelize computations across the cluster.

%pylab inline

Populating the interactive namespace from numpy and matplotlib

import os
os.environ['GDAL_DATA'] = '/opt/conda/share/gdal'
import dask_jobqueue as jq
#import time
from dask.distributed import progress,wait,Client
import dask.array as da
import dask
import dask.dataframe as dd
import numpy as np
import pandas as pd
import xarray as xr

from sklearn.cluster import MiniBatchKMeans
from dask_ml.wrappers import Incremental
from dask_ml.wrappers import ParallelPostFit
from dask_ml.preprocessing import StandardScaler
from dask_ml.cluster import KMeans

partition='short,debug,brief-low,mem'
num_processes = 3
num_threads_per_processes = 20
mem = 3.2*num_processes*num_threads_per_processes
n_cores_per_job = num_processes*num_threads_per_processes
container = '/project/geospatial_tutorials/data_science_im_rs_latest.sif'

clust = jq.SLURMCluster(queue=partition,
                        processes=num_processes,
                        cores=n_cores_per_job,
                        memory=str(mem)+'GB',
                        interface='ib0',
                        local_directory='$TMPDIR',
                        death_timeout=60,
                        python='singularity exec --bind /usr/lib64 --bind /scinet01 --bind /software/7/apps/envi/bin/ '+container+' python',
                        walltime='00:30:00')
cl=Client(clust)

dash_board = cl.scheduler.address.split('//')[1].split(':')[0]+:+str(cl.scheduler_info()['services']['dashboard'])
ssh_command = 'ssh -N -L 8787:'+dash_board+' '+os.environ[USER]+'@login.scinet.science'
print('To port forward diagnostics use:\n'+ssh_command)
cl

To port forward diagnostics use:
ssh -N -L 8787:10.1.8.20:8787 rowan.gaffney@login.scinet.science

Client

    Scheduler: tcp://10.1.8.20:46840
    Dashboard: http://10.1.8.20:8787/status 

	
Cluster

    Workers: 0
    Cores: 0
    Memory: 0 B

clust.scale(n=18)

cl

Client

    Scheduler: tcp://10.1.8.20:46840
    Dashboard: http://10.1.8.20:8787/status 

	
Cluster

    Workers: 18
    Cores: 360
    Memory: 1.15 TB

Load and Visualize Spectral Data

#Function to exclude bands with H2O or CO2 absorption
def band_list():
    good_bands1 = np.linspace(0,188,189).astype(int)
    good_bands3 = np.linspace(211,269,269-211+1).astype(int)
    good_bands5 = np.linspace(316,425,425-316+1).astype(int)
    good_bands = np.hstack([good_bands1,good_bands3,good_bands5])
    bad_bands2 = np.linspace(189,210,210-189+1).astype(int)
    bad_bands4 = np.linspace(270,315,315-270+1).astype(int)
    bad_bands = np.hstack([bad_bands2,bad_bands4])
    return(good_bands,bad_bands)

#Persist the data to memory
d_all = xr.open_zarr('/project/geospatial_tutorials/tutorial_1/data/neon_2017_mosaic_brdf_corr.zarr',group='reflectance').isel(wl=band_list()[0]).chunk({'x':'auto','y':'auto','wl':-1}).persist()
d_all

<xarray.Dataset>
Dimensions:      (wl: 358, x: 12050, y: 13092)
Coordinates:
  * wl           (wl) float64 381.3 386.3 391.3 ... 2.5e+03 2.505e+03 2.51e+03
  * x            (x) float64 5.166e+05 5.166e+05 ... 5.287e+05 5.287e+05
  * y            (y) float64 4.526e+06 4.526e+06 ... 4.513e+06 4.513e+06
Data variables:
    reflectance  (y, x, wl) int16 dask.array<shape=(13092, 12050, 358), chunksize=(776, 241, 358)>

#Plot the spectral signature at point
plt.figure(figsize=(8,6))
d_all.reflectance.interp(x=520002.5554,y=4520000.78758,method='linear').plot.line('b.')
plt.ylabel('Reflectance * 10000')
plt.xlabel('Wavelength (nanometers)')
plt.grid()

Calculate and visualize spectral indices

#Calculate the spectral indices and add to the d_all variable
d_all['indices'] = xr.concat([((d_all.reflectance.sel(wl=858.6,method='nearest')-d_all.reflectance.sel(wl=648.2,method='nearest'))/(d_all.reflectance.sel(wl=858.6,method='nearest')+d_all.reflectance.sel(wl=648.2,method='nearest'))).assign_coords(index='ndvi').expand_dims('index'),
                            ((0.5*(d_all.reflectance.sel(wl=2000,method='nearest')/10000.+d_all.reflectance.sel(wl=2200,method='nearest')/10000.))-d_all.reflectance.sel(wl=2100.,method='nearest')/10000.).drop('wl').assign_coords(index='cai').expand_dims('index'),
                            ((xr.ufuncs.log(1./(d_all.reflectance.sel(wl=1754.,method='nearest')/10000.))-xr.ufuncs.log(1./(d_all.reflectance.sel(wl=1680.,method='nearest')/10000.)))/(xr.ufuncs.log(d_all.reflectance.sel(wl=1754.,method='nearest')/10000.)+xr.ufuncs.log(d_all.reflectance.sel(wl=1680,method='nearest')/10000.))).assign_coords(index='ndli').expand_dims('index'),
                            ((d_all.reflectance.sel(wl=750.,method='nearest')-d_all.reflectance.sel(wl=705.,method='nearest'))/(d_all.reflectance.sel(wl=750.,method='nearest')+d_all.reflectance.sel(wl=705.,method='nearest')-(2.*d_all.reflectance.sel(wl=445.,method='nearest')))).drop('wl').assign_coords(index='mrendvi').expand_dims('index'),
                            ((d_all.reflectance.sel(wl=800.,method='nearest')-d_all.reflectance.sel(wl=445.,method='nearest'))/(d_all.reflectance.sel(wl=800.,method='nearest')-d_all.reflectance.sel(wl=680.,method='nearest'))).assign_coords(index='sipi').expand_dims('index'),
                            ((xr.ufuncs.log(10000./d_all.reflectance.sel(wl=1510.,method='nearest'))-xr.ufuncs.log(10000./d_all.reflectance.sel(wl=1680.,method='nearest')))/(xr.ufuncs.log(10000./d_all.reflectance.sel(wl=1510.,method='nearest'))+xr.ufuncs.log(10000./d_all.reflectance.sel(wl=1680.,method='nearest')))).assign_coords(index='ndni').expand_dims('index'),
                            ((1./(d_all.reflectance.sel(wl=510.,method='nearest')/10000.))-(1./(d_all.reflectance.sel(wl=550.,method='nearest')/10000.))).assign_coords(index='cri1').expand_dims('index'),
                            ((1./(d_all.reflectance.sel(wl=510.,method='nearest')/10000.))-(1./(d_all.reflectance.sel(wl=700.,method='nearest')/10000.))).assign_coords(index='cri2').expand_dims('index')],dim='index').chunk((1.,d_all.reflectance.data.chunksize[0],d_all.reflectance.data.chunksize[1])).transpose('y','x','index').chunk(('auto','auto',1))
#persist the data to memory
d_all['indices'].data = d_all['indices'].data.persist()
#wait for the computation to complete
wait(d_all)
#show the xarray
d_all

<xarray.Dataset>
Dimensions:      (index: 8, wl: 358, x: 12050, y: 13092)
Coordinates:
  * wl           (wl) float64 381.3 386.3 391.3 ... 2.5e+03 2.505e+03 2.51e+03
  * x            (x) float64 5.166e+05 5.166e+05 ... 5.287e+05 5.287e+05
  * y            (y) float64 4.526e+06 4.526e+06 ... 4.513e+06 4.513e+06
  * index        (index) object 'ndvi' 'cai' 'ndli' ... 'ndni' 'cri1' 'cri2'
Data variables:
    reflectance  (y, x, wl) int16 dask.array<shape=(13092, 12050, 358), chunksize=(776, 241, 358)>
    indices      (y, x, index) float64 dask.array<shape=(13092, 12050, 8), chunksize=(6984, 2169, 1)>

#Plot the Indices
fig, axes = plt.subplots(nrows=4,ncols=2,figsize=(24,30))
ax = axes.flatten()

#Loop through each indices a plot at a 1/(50*50) resolution
i=-1
for ind in d_all.coords['index'].values:
    print('Plotting '+ind+' ...')
    i=i+1
    d_all.indices.sel(index=ind).where(d_all.reflectance.isel(wl=22)>-10.).isel(x=slice(None,None,50),y=slice(None,None,50)).plot(ax=ax[i])

Plotting ndvi ...
Plotting cai ...
Plotting ndli ...
Plotting mrendvi ...
Plotting sipi ...
Plotting ndni ...
Plotting cri1 ...
Plotting cri2 ...

Subset and Scale Data

#Select an observation in each 5*5 region
d_sl = d_all.isel(x=slice(None,None,4),y=slice(None,None,4))

#Reshape the data from 3d (x,y,wavelength) to 2d (x*y,wavelength)
wl_col = d_sl.wl.values
d_sl = d_sl.reflectance.data.reshape((-1,len(wl_col))).rechunk(('auto',-1))
#Exclude Null Values and convert to regular partitions/blocks (this is somewhat convoluted, but will be streamlined in future versions)
d_sl = dd.from_dask_array(d_sl[(~da.any(d_sl==-9999,axis=1))&(~da.any(da.isnan(d_sl),axis=1))],columns=wl_col).reset_index(drop=True).to_dask_array(lengths=True).rechunk(('auto',-1)).persist()

#Check for null values
print('All the data is finite: '+str(da.all(da.isfinite(d_sl)).compute()))
print('There are NaNs in the data: '+str(da.any(da.isnan(d_sl)).compute()))

All the data is finite: True
There are NaNs in the data: False

#Scale the Data with a standard scaler
scaler = StandardScaler().fit(d_sl)
d_train = scaler.transform(d_sl).rechunk(('auto',-1)).persist()
print('There are '+str(d_train.shape[0])+' records in the fit data spread over '+str(d_train.npartitions)+' partitions.')

There are 7365717 records in the fit data spread over 158 partitions.

Fit a Kmeans model

Here we will fit two different implimentations of the KMeans cluster. The first version (est1) uses a parallel implimentation of the KMEANS algorithm. It is an iterative method, so time to convergence is quite variable. The second method (est2) uses a minibatch approach. Each partition fits the model sequentially, and then models results are combined. This approach uses the scikit-learn package, and then is wrapped with dask_ml ParallelPostFit so the resulting model can be applied to the entire dataset (prediction) in a distributed manner. The same methods can apply to any scikit-learn model that impliments a partial fit method.

#Define the estimator (from dask-learn library - iterative method)
est1 = KMeans()

#Fit the model and time
s = time.time()
k1 = est1.fit(d_train)
print('Total time to complete fitting the model: '+str(round((time.time()-s)/60.,2))+' minutes')

Total time to complete fitting the model: 7.62 minutes

#Define the estimator (from scikit-learn library) and wrap with Dask Functions
est2 = ParallelPostFit(Incremental(MiniBatchKMeans(n_clusters=8,compute_labels=False)))

#Fit the model and time
s = time.time()
k2 = est2.fit(d_train)
print('Total time to complete fitting the model: '+str(round((time.time()-s)/60.,2))+' minutes')

Total time to complete fitting the model: 0.72 minutes

Predict and Visualize

We can use either model (k1 or k2) to predict on the entire dataset.

#Reshape ALL the data from 3d (x,y,wavelength) to 2d (x*y,wavelength)
d_final = d_all.reflectance.data.reshape((-1,len(band_list()[0]))).rechunk(('auto',-1))
#Transform the data with the same scaler as used with the fitting
d_final = scaler.transform(d_final)

#Predict the cluster for the entire domain, and then transform back to a 3d dataarray (x,y,wavelength)
s = time.time()
f_shape=xr.open_zarr('/project/geospatial_tutorials/tutorial_1/data/neon_2017_mosaic_brdf_corr.zarr',group='reflectance').reflectance.shape
d_kmeans = k1.predict(d_final).persist().reshape(f_shape[0:2])
wait(d_kmeans)
print('Total time to predict the entire domain: '+str(round((time.time()-s)/60.,2))+' minutes')

Total time to predict the entire domain: 1.28 minutes

#Convert results to xarray data
base_dat=xr.open_zarr('/project/geospatial_tutorials/tutorial_1/data/neon_2017_mosaic_brdf_corr.zarr',group='reflectance')
d_final2=xr.DataArray(data=d_kmeans,coords={'x':base_dat.coords['x'].values,'y':base_dat.coords['y'].values},dims=('y','x')).to_dataset(name='kmean_clust')

#Plot the results for the entire domain at a 1/(10*10) resolution
plt.figure(figsize=(16,12))
d_final2.isel(x=slice(None,None,10),y=slice(None,None,10)).kmean_clust.plot()

<matplotlib.collections.QuadMesh at 0x2ad73d757f98>

#Close-up plot of the results
plt.figure(figsize=(16,12))
d_final2.isel(x=slice(5000,6000,1),y=slice(5000,6000,1)).kmean_clust.plot()

<matplotlib.collections.QuadMesh at 0x2ad73d753198>"
published: false
---

[link to tutorial](/assets/html/Tutorial1_Example2_Hyperspectral.html)