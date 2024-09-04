---
title: SMRTLink/SMRTAnalysis
description: Guide to use SMRTLink via CLI
# author: Yasasvy Nanyam
excerpt: Guide to use SMRTLink via CLI
categories: [Application]

redirect_from: 
  - /guides/analysis/smrtlink

subnav:
  - title: Instructions for SMRTLink v10+
    url: '#instructions-for-smrtlink-v10+'
    subnav:
      - title: View the available workflows
        url: '#view-the-available-workflows'
      - title: View input options for a workflow
        url: '#view-input-options-for-a-workflow'
      - title: Use cromwell config files for Ceres
        url: '#use-cromwell-config-files-for-ceres'
      - title: Sample batch script
        url: '#sample-batch-script'




---
## Instructions for SMRTLink v10+

SMRTLink v10+ uses [Cromwell workflow manager](https://cromwell.readthedocs.io/en/stable/) which offers additional flexibility and compatibility with SLURM. Commandline version of v10 does not depend on web GUI service and is always available.

There are two main steps involved - provide input parameters for your workflow and then submit the job via SLURM. 

### View the available workflows

```bash
module load smrtlink/13
$ pbcromwell show-workflows

cromwell.workflows.pb_detect_methyl: 5mC CpG Detection
cromwell.workflows.pb_ccs: Circular Consensus Sequencing (CCS)
cromwell.workflows.pb_demux_ccs: Demultiplex Barcodes
cromwell.workflows.pb_export_ccs: Export Reads
cromwell.workflows.pb_assembly_hifi: Genome Assembly
cromwell.workflows.pb_align_ccs: HiFi Mapping
cromwell.workflows.pb_target_enrichment: HiFi Target Enrichment
cromwell.workflows.pb_sars_cov2_kit: HiFiViral SARS-CoV-2 Analysis
cromwell.workflows.pb_isoseq: Iso-Seq Analysis
cromwell.workflows.pb_mark_duplicates: Mark PCR Duplicates
cromwell.workflows.pb_microbial_analysis: Microbial Genome Analysis
cromwell.workflows.pb_segment_reads: Read Segmentation
cromwell.workflows.pb_segment_reads_and_isoseq: Read Segmentation and Iso-Seq
cromwell.workflows.pb_segment_reads_and_sc_isoseq: Read Segmentation and Single-Cell Iso-Seq
cromwell.workflows.pb_sc_isoseq: Single-Cell Iso-Seq
cromwell.workflows.pb_sv_ccs: Structural Variant Calling
cromwell.workflows.pb_trim_adapters: Trim Ultra-Low Adapters
cromwell.workflows.pb_undo_demux: Undo Demultiplexing
cromwell.workflows.pb_variant_calling: Variant Calling
```

### View input options for a workflow

Using *Genome Assembly* as an example - 

```bash
$ pbcromwell show-workflow-details pb_assembly_hifi


Workflow Summary
Workflow Id    : cromwell.workflows.pb_assembly_hifi
Name           : Genome Assembly
Description    : Cromwell workflow pb_assembly_hifi
Required Inputs: 
Optional Inputs: ConsensusReadSet XML
Tags           : auto-analysis, analysis, assembly, ccs 
Task Options:
  reads = None
    reads (file)
  ipa2_genome_size = 0k
    Genome Length (string)
  ipa2_downsampled_coverage = 0
    Downsampled coverage (integer)
  ipa2_advanced_options = 
    Advanced Assembly Options (string)
  ipa2_run_polishing = True
    Run polishing (boolean)
  ipa2_run_phasing = True
    Run phasing (boolean)
  ipa2_run_purge_dups = True
    Purge duplicate contigs from the assembly (boolean)
  ipa2_ctg_prefix = ctg
    ipa2_ctg_prefix (string)
  ipa2_reads_db_prefix = reads
    ipa2_reads_db_prefix (string)
  ipa2_cleanup_intermediate_files = True
    Cleanup intermediate files (boolean)
  dataset_filters = 
    Filters to Add to the Data Set (string)
  filter_min_qv = 20
    Min. CCS Predicted Accuracy (Phred Scale) (integer)
  downsample_factor = 0
    Downsampling Factor (integer)
  mem_scale_factor = 8
    Memory Scale Factor (EXPERIMENTAL) (integer)
  add_memory_mb = 0
    Add task memory (MB) (integer)


Example Usage:

  $ pbcromwell run pb_assembly_hifi \

  $ pbcromwell run pb_assembly_hifi \
      -e input1.consensusreadset.xml \
      --task-option reads=None \
      --task-option ipa2_genome_size="0k" \
      --task-option ipa2_downsampled_coverage=0 \
      --task-option ipa2_advanced_options="" \
      --task-option ipa2_run_polishing=True \
      --task-option ipa2_run_phasing=True \
      --task-option ipa2_run_purge_dups=True \
      --task-option ipa2_ctg_prefix="ctg" \
      --task-option ipa2_reads_db_prefix="reads" \
      --task-option ipa2_cleanup_intermediate_files=True \
      --task-option dataset_filters="" \
      --task-option filter_min_qv=20 \
      --task-option downsample_factor=0 \
      --task-option mem_scale_factor=8 \
      --task-option add_memory_mb=0 \
      --config cromwell.conf \
      --nproc 8
```   

### Use cromwell config files for Ceres

As shown above, the *pbcromwell run* command requires a cromwell config file for the jobs to be submitted via SLURM. On ceres, the config files are avaiable in a central location. Users can point to the files directly or can copy and modify based on their individual requirements. The config files are located at 
```bash
/system/smrtanalysis/10/slurm_template/cromwell-slurm-short.conf
/system/smrtanalysis/10/slurm_template/cromwell-slurm-medium.conf
/system/smrtanalysis/10/slurm_template/cromwell-slurm-mem.conf
```
The file names correspond to the partitions the jobs will be submitted to. 

Priority users can copy those files to their work directory and modify the following (lines 130-131)

```bash
        runtime-attributes = """
        Int cpu = 8
        Int requested_memory_mb_per_core = 8000
        String queue_name = "short"
        String? jms_args
        """
```

to

```bash
        runtime-attributes = """
        Int cpu = 8
        Int requested_memory_mb_per_core = 8000
        String queue_name = "priority"
        String? jms_args = "--qos=your_QOS --time=14:00:00" 
        """
```
 
Users can also modify the CPU threads or memory per core values but these default values should suffice for most workflows. 

### Sample batch script

```bash
#!/bin/bash

#SBATCH -N 1 # No. of nodes used
#SBATCH -n 4      # Threads 
#SBATCH -t 240    # Minutes

module load smrtlink/10

pbcromwell run pb_assembly_hifi \
      -e input1.consensusreadset.xml \
      --task-option reads=None \                       # Task options vary based on the workflow
      --task-option ipa2_genome_size=0 \               # These task options are optional and will use default values if not specified
      --task-option ipa2_downsampled_coverage=0 \
      --task-option ipa2_advanced_options="" \
      --task-option ipa2_run_polishing=True \
      --task-option ipa2_run_phasing=True \
      --task-option ipa2_run_purge_dups=True \
      --task-option ipa2_ctg_prefix="ctg." \
      --task-option ipa2_reads_db_prefix="reads" \
      --task-option ipa2_cleanup_intermediate_files=True \
      --task-option dataset_filters="" \
      --task-option filter_min_qv=20 \
      --config /system/smrtanalysis/10/slurm_template/cromwell-slurm-short.conf \
      --nproc 8 \                                     # this option is required for some stages in the pipeline
      --backend SLURM \                               # Set the default backend
      --tmp-dir \${TMPDIR} \                          # Use TMPDIR variable
      -c 8 \                                          # Number of chunks
      --output-dir hifi-out			      # 
```
