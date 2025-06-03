---
title: "From Reads to Variants"
date: 2025-06-03 13:00
type: workshop
display: basic
no-caldate: true
provider: SCINet
hideprovider: true
description: This workshop demonstrates how RNA data can be used for genome annotation.
categories: [2025 Bioinfo]

parent: 
  title: Bioinformatics Workshop Series
  url: /events/2025-bioinfo


layout_type: workshop
has-sessions: true
time: 1 – 5 PM ET
registration:
    url: https://forms.office.com/g/dERg7vbS9B
tags: bioinformatics




---

DeepVariant is a DNA sequence variant caller that uses a convolutional neural network (CNN) to call genotypes relative to a reference genome assembly. In this workshop, we will discuss a workflow for calling variants from whole-genome data for multiple individuals. <!--excerpt--> This workflow involves trimming and filtering raw reads, mapping them to a reference assembly, calling variants for each individual, merging the variants of all individuals into a single variant call format file (.vcf), and filtering the resulting variant file. We will guide participants through this pipeline step by step, providing generalized commands for each phase of the process, as well as strategies for optimizing cluster usage and reducing compute time. The final product will be a .vcf containing variants for all individuals which can be used for downstream analyses, along with a solid understanding for performing variant detection using DeepVariant.

## Pre-workshop instructions

To help minimize technical issues and delays at the start of the workshop, please try the following tests prior to the workshop.  
* **Logging on to [Atlas Open OnDemand (OOD)](https://atlas-ood.hpc.msstate.edu/):** Please confirm you can successfully log in to Atlas OOD with your SCINet account ([see instructions here](/guides/access/web-based-login)). If you are successful, you will be able to see the Atlas OOD home page.
* **Atlas Shell Access:** When on Atlas OOD, click on the top navigation bar: "Clusters" > "Atlas Shell Access". A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@atlas-login-1 ~]$".

## Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](/guides/access/web-based-login). 

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas' login node. 

1. **Request resources on a compute node** by running the following command:  
  
    {: .copy-code }
    ```
    srun --reservation=workshop -A scinet_workshop1 -t 05:00:00 -n 1 --mem 8G --pty bash
    ``` 
    {% include reservation-alert reservation="workshop" project="scinet_workshop1" %}

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable. 

{: .copy-code }
```
mkdir -p /90daydata/shared/$USER/deepvariant 
cd /90daydata/shared/$USER/deepvariant

cp /project/scinet_workshop1/deepvariant/Sample_Data/assembly.fasta . 

mkdir PE_directory 
cp -r /project/scinet_workshop1/deepvariant/Sample_Data/samplename_R*.fastq.gz .

# Create a directory for trimmed reads 
mkdir Trimmed 

# Create a directory for mapped reads 
mkdir Mapped 

# Create a directory for variants 
mkdir Variants 

# Create a directory for intermediate files 
mkdir Int 

# Activate your conda environment 
module load miniconda3 
module load samtools 
module load apptainer 
source activate /project/scinet_workshop1/deepvariant/Software/condaenvs/deepvariant
``` 

## Tutorial Instructions

### Step 1: trimming 

{: .copy-code }
```
# Trim adapter artifacts from your reads 
trim_galore --paired \ 
        --basename samplename \ 
        --output_dir Trimmed \ 
        --cores 24 \ 
        PE_directory/samplename_R1.fastq.gz \ 	 
        PE_directory/samplename_R2.fastq.gz 
```

### Step 2: mapping 

{: .copy-code }
```
# Index your reference assembly 
bwa-mem2 index assembly.fasta 

# Index reference assembly using Samtools (for later) 
samtools faidx assembly.fasta >assembly.fasta.fai 

# For each of your trimmed and paired reads:  
bwa-mem2 mem –t 48 assembly.fasta \ 	 
      Trimmed/samplename_val_1.fq.gz \ 	 
      Trimmed/samplename_val_2.fq.gz | \ 
      samblaster | \ 	 
      samtools sort -@ 48  –o Mapped/samplename.bam 
```

### Step 3: call variants 

{: .copy-code }
```
apptainer exec Software/sifs/deepvariant_1.6.0.sif \ 
          python3 Software/deepvariant/scripts/run_deepvariant.py \ 	 
          --num_shards=48 \ 
          --model_type WGS \ 
          --output_vcf Variants/samplename.vcf.gz \ 
          --output_gvcf Variants/samplename.g.vcf.gz \ 
          --ref assembly.fasta \ 
          --reads Mapped/samplename.bam \ 
          --sample_name samplename \ 
          --intermediate_results_dir Int/samplename_int \ 
          --make_examples_extra_args "normalize_reads=true” \\ 
          --dry_run 
```

### Merge and Filter  

{: .copy-code }
```
module load miniconda3 
module load jemalloc 
module load bcftools 
module load htslib 
conda activate /project/scinet_workshop1/deepvariant/Software/condaenvs/glnexus 

# Use GLNexus for joint calling .g.vcf samples: 
glnexus_cli --threads 48 --config DeepVariantWGS *.g.vcf.gz > cohort.bcf 

# Convert raw bcf results to vcf format: 
bcftools convert -Oz -o cohort.vcf.gz cohort.bcf 

# Fill tags and drop DP<=1 calls 
bcftools +setGT cohort.bcf --threads 46 -Ob -- -t q -n . -e 'FMT/DP>=1' | \ 
bcftools +fill-tags --threads 46 - -Ob -- -t AF,AN,AC | \ 
bcftools annotate --threads 46 - -Ov -x FORMAT/RNC -o cohort.clean.vcf 

# Filter 
plink2 --vcf cohort.clean.vcf --geno 0.5 --vcf-min-qual 20 --min-alleles 2 --max-alleles 2 --vcf-half-call missing --allow-extra-chr --recode vcf --out cohort.clean.diploid 

# Make numeric (0,1,2) 
plink2 --vcf cohort.clean.diploid.vcf --allow-extra-chr --recode A-transpose –out cohort.clean.diploid.Atranspose 

# See results 
head -n 20 cohort.clean.diploid.Atranspose.traw 
```

**Stop the interactive job** on the compute node by running the command exit. 
