title: AlphaFold3
description: AlphaFold3 on Ceres and Atlas
## author: VRSC
excerpt: "Alphafold3 on Ceres and Atlas"

categories: [Analysis]

subnav:
  - title: Before You Begin
    url: '#before-you-begin'
  - title: Alphafold3 Input and Database 
    url: '#alphafold3-input-and-database'
  - title: Running AF3 on Ceres and Atlas 
    url: '#running-af3-on-ceres-and-atlas'
---

## Before You Begin
Alphafold3 requires users to accept terms of use. [Click here](https://forms.office.com/g/0y6uAYeSrw) for the request form and to accept the terms of use. 

You will be notified once you have access to Alphafold3.

## Alphafold3 Input and Database
Unlike Alphafold2, Alphafold3 requires the input file to be formatted as a JSON file.  

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

For the full documentation on formatting input files, see - https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md

The database is located at the following location on both Ceres and Atlas

```
/reference/data/alphafold/3.0.0
```
**Note:** The version may be updated to reflect the most stable version, update path to DB as availability changes 

## Running AF3 on Ceres and Atlas
Alphafold3 now provides option to split the workflow into [CPU and GPU tasks seperately](https://github.com/google-deepmind/alphafold3/blob/main/docs/performance.md#running-the-pipeline-in-stages). This is useful as users can run the "Data Pipeline" on normal compute nodes and then the model inference on GPU nodes. 

To run only the data pipeline use `--norun_inference` option

To run only the model inference use `--norun_data_pipeline` option

If you do not specify the above options, AF3 will try to run the full pipeline. This is only valid on the GPU nodes.  

Below are suggested scripts to run AF3 on the clusters

### CPU Only data pipeline (Ceres and Atlas)
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

### GPU only model inference(Atlas only)
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
The GPU only model inference task requires JSON file generate from the above `--norun_inference` job

### Full Pipeline (Atlas only)
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
