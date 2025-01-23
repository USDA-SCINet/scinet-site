---
title: AlphaFold 3
description: AlphaFold 3 on Ceres and Atlas
## author: VRSC
excerpt: "AlphaFold 3 on Ceres and Atlas"

categories: [Application]

subnav:
  - title: Before You Begin
    url: '#before-you-begin'
  - title: AlphaFold 3 Input and Database 
    url: '#alphafold3-input-and-database'
  - title: Running AlphaFold 3 on Ceres and Atlas 
    url: '#running-af3-on-ceres-and-atlas'
---

## Before You Begin
AlphaFold 3 requires users to accept terms of use. [Click here](https://forms.office.com/g/0y6uAYeSrw) for the request form and to accept the terms of use. 

You will be notified once you have access to AlphaFold 3.

## AlphaFold 3 Input and Database
Unlike AlphaFold 2, AlphaFold 3 requires the input file to be formatted as a JSON file.  

For example, 

```
{
  "name": "2PV7",
  "sequences": [
    {
      "protein": {
        "id": ["A", "B"],
        "sequence": "GMRESYANENQFGFKTINSDIHKIVIVGGYGKLGGLFARYLRASGYPISILDREDWAVAESILANADVVIVSVPINLTLETIERLKPYLTENMLLADLTSVKREPLAKMLEVHTGAVLGLHPMFGADIASMAKQVVVRCDGRFPERYEWLLEQIQIWGAKIYQTNATEHDHNMTYIQALRHFSTFANGLHLSKQPINLANLLALSSPIYRLELAMIGRLFAQDAELYADIIMDKSENLAVIETLKQTYDEALTFFENNDRQGFIDAFHKVRDWFGDYSEQFLKESRQLLQQANDLKQG"
      }
    }
  ],
  "modelSeeds": [1],
  "dialect": "alphafold3",
  "version": 1
}
```

For the full documentation on formatting input files, see [https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md](https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md)

The database is located at the following location on both Ceres and Atlas:

```
/reference/data/alphafold/3.0.0
```
**Note:** The version may be updated to reflect the most stable version; please update the path to the database in your scripts as needed.

## Running AlphaFold 3 on Ceres and Atlas
AlphaFold 3 provides options to split the workflow into [separate CPU and GPU tasks](https://github.com/google-deepmind/alphafold3/blob/main/docs/performance.md#running-the-pipeline-in-stages). This is useful because it allows you to run the "data pipeline", which does not use GPUs, on normal compute nodes and then run the model inference on GPU nodes. 

* To run only the data pipeline use the `--norun_inference` option.
* To run only the model inference use the `--norun_data_pipeline` option.

If you do not specify the above options, AlphaFold 3 will try to run the full pipeline, which means it will only run on the GPU nodes.  

Please note that by default, the maximum protein sequence length that AlphaFold 3 can analyze is limited by the amount of GPU memory available. SCINet's A100 GPUs have 80 GB of memory each, which limits the maximum protein sequence length to 5,120 residues. Longer protein sequences can be analyzed by enabling features that allow the GPU to utilize system memory; please see [the AlphaFold 3 documentation for more information](https://github.com/google-deepmind/alphafold3/blob/main/docs/performance.md#unified-memory).

Below are suggested scripts to run AlphaFold 3 on the clusters.

### CPU-only data pipeline (Ceres and Atlas)
```
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 16
#SBATCH -A <Account>

module load alphafold/3.0.0
export DATA_DIR=/reference/data/alphafold/3.0.0
run_alphafold.py \
   --db_dir=$DATA_DIR \
   --model_dir=$DATA_DIR/model_parameters \
   --json_path=/full/path/to/input.json \
   --output_dir=/full/path/to/output_dir \
   --norun_inference
```

### GPU-only model inference (Atlas only)
```
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 8
#SBATCH -A <Account>
#SBATCH -p gpu-a100
#SBATCH --gres=gpu:1

module load alphafold/3.0.0
export DATA_DIR=/reference/data/alphafold/3.0.0
run_alphafold.py \
   --db_dir=$DATA_DIR \
   --model_dir=$DATA_DIR/model_parameters \
   --json_path=/full/path/to/input.json \
   --output_dir=/full/path/to/output_dir \
   --norun_data_pipeline
```
The GPU-only model inference task requires the JSON file generated from the above `--norun_inference` job.

### Full pipeline (Atlas only)
```
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 8
#SBATCH -A <Account>
#SBATCH -p gpu-a100
#SBATCH --gres=gpu:1

module load alphafold/3.0.0
export DATA_DIR=/reference/data/alphafold/3.0.0
run_alphafold.py \
   --db_dir=$DATA_DIR \
   --model_dir=$DATA_DIR/model_parameters \
   --json_path=/full/path/to/input.json \
   --output_dir=/full/path/to/output_dir 
```
