---
title: "From reads to variants: GATK & Deepvariant"
date: 2025-06-19 13:00
type: workshop
display: basic
provider: [ISU, SCINet Office]
hideprovider: true
description: This workshop demonstrates how RNA data can be used for genome annotation.
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/


layout_type: workshop
sessions: 
  - session:
    time: 1-5 PM ET
    date: 2026-05-19    
    end_date: 2026-05-20 
    multiday: May 19 & 20
registration:
    url: https://forms.office.com/g/T2teMegYSW
tags: bioinformatics

prerequisites:
  - text: Familiarity with basic command-line concepts and next-generation sequencing data types. 

# materials:
#   - text: Workshop recording
#     url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EZE9sRitKJVNjfZ1JJiWaRUBPuPEG1hk-ejQ1YNb5s86Zg?e=T6qcZo

---

This workshop will introduce participants to variant calling using two methods: Genome analysis toolkit (GATK) and Deep Variant. We will develop a complete workflow for calling variants from whole-genome data for multiple individuals.<!--excerpt--> The workflow will include trimming and filtering raw reads, mapping them to a reference assembly, calling variants for each individual, merging the variants of all individuals into a single variant call format file (.vcf), and filtering the resulting variant file. In addition, we will discuss strategies for reducing compute time and the comparative strengths and weaknesses of GATK and DeepVariant.   
 
{% comment %}

## Overview

A hands-on workshop covering the GATK best practices pipeline for germline and somatic variant calling. Designed to pair with a follow-up DeepVariant workshop, with explicit framing of how the two approaches relate.

**Duration:** 4 hours  
**Dataset:** Downsampled chr20 slice from Genome in a Bottle (HG001/NA12878)  
**Environment:** `broadinstitute/gatk:latest` Docker image

---

## Hour 1 — Foundations (60 min)

### Why Variant Calling Matters (15 min)
- From raw reads to biological insight
- Clinical vs. research contexts
- SNPs, indels, CNVs — what you're looking for and why

### The GATK Ecosystem (20 min)
- Brief history: GATK3 → GATK4, Broad Institute context
- Key tools in the toolkit (HaplotypeCaller, Mutect2, CNVkit, etc.)
- GATK vs. other callers — where it sits in the landscape (good to frame the DeepVariant contrast early)

### Pre-GATK: Getting Your Data Ready (25 min)
- Reference genomes: GRCh37 vs. GRCh38, choosing wisely
- BWA-MEM alignment
- MarkDuplicates (Picard/GATK)
- BAM sorting and indexing
- Read groups — why they matter and what breaks without them

---

## Hour 2 — The GATK Best Practices Pipeline (60 min)

### Base Quality Score Recalibration (BQSR) (20 min)
- Why sequencer quality scores are biased
- Known variant sites (dbSNP, Mills indels)
- `BaseRecalibrator` → `ApplyBQSR`
- How to assess before/after

### HaplotypeCaller Deep Dive (30 min)
- Local de novo assembly — what makes GATK's approach distinctive
- GVCF mode vs. direct calling — when to use which
- Key parameters to understand (`-ERC GVCF`, `--sample-ploidy`, intervals)
- Handling non-human genomes

### Hands-On Exercise (10 min)
- Run HaplotypeCaller on a small example BAM
- Inspect the GVCF output

---

## Hour 3 — Joint Genotyping & Filtering (60 min)

### Joint Genotyping (20 min)
- Why joint calling improves sensitivity (the N+1 problem)
- `GenomicsDBImport` → `GenotypeGVCFs`
- Cohort size considerations and scaling

### Variant Filtering (30 min)
- Hard filtering vs. VQSR — when to use each (sample size thresholds)
- VQSR: tranches, truth sets, the annotation space (QD, MQ, FS, SOR, etc.)
- CNNScoreVariants as an alternative for small cohorts
- Practical filtering thresholds and how to tune them

### Hands-On Exercise (10 min)
- Joint genotype a small multi-sample GVCF
- Apply hard filters and inspect the VCF

---

## Hour 4 — Practical Skills & Transition to DeepVariant (60 min)

### Somatic Variant Calling with Mutect2 (20 min)
- Germline vs. somatic calling — key differences in the model
- Tumor-normal pairs vs. tumor-only mode
- Panel of Normals (PoN), `GetPileupSummaries`, `FilterMutectCalls`
- Common pitfalls

### Evaluating Your Results (20 min)
- `hap.py` for benchmarking against truth sets (Genome in a Bottle)
- Key metrics: precision, recall, F1 by variant type
- IGV for manual inspection — what a good vs. bad call looks like
- Common failure modes (strand bias, low complexity regions, mapping artifacts)

### Framing DeepVariant (20 min)
- GATK's probabilistic model vs. DeepVariant's image-based CNN approach
- Where each tends to excel (indels, low-coverage, non-human genomes)
- Shared concepts your colleagues' workshop will build on:
  - BQSR
  - GVCF-style outputs (DeepVariant also produces GVCFs)
  - `hap.py` benchmarking
- Questions to keep in mind as you move to the next workshop

---

## GATK vs. DeepVariant — Quick Reference

| Feature | GATK HaplotypeCaller | DeepVariant |
|---|---|---|
| Approach | Probabilistic / HMM | Deep learning (CNN) |
| SNP accuracy | High | Very high |
| Indel accuracy | Good | Generally better |
| Non-human genomes | Well supported | Requires retraining |
| Small cohorts | Good (hard filter / CNN) | Strong |
| Large cohorts | Excellent (VQSR) | Improving |
| GVCF output | Yes | Yes |
| Somatic calling | Yes (Mutect2) | No (germline only) |
| Interpretability | High | Lower (black box) |

---

## Logistics & Tips

- **Pacing:** Hours 2 and 3 are the densest — build in buffer or trim the somatic section if running long
- **Dataset:** A downsampled chr20 slice from NA12878 is small enough to run live and well-characterized for benchmarking
- **Environment:** Distribute a pre-built Docker image (`broadinstitute/gatk:latest`) to save setup time
- **Handoff:** End with the comparison table above so participants arrive at the DeepVariant workshop with a clear mental model of what changes and what stays the same



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
cd PE_directory 
cp -r /project/scinet_workshop1/deepvariant/Sample_Data/samplename_R*.fastq.gz .  
cd ..

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

### Step 4: Joint Genotyping

{: .copy-code }
```
#!/bin/bash

#SBATCH --time=08:00:00   # walltime limit (HH:MM:SS)
#SBATCH --nodes=1   # number of nodes
#SBATCH --ntasks-per-node=48   # 20 processor core(s) per node X 2 threads per core
#SBATCH --partition=atlas    # standard node(s)
#SBATCH --job-name="step4:joint_genotyping"
#SBATCH --mail-user=$USER@usda.gov   # email address
#SBATCH --mail-type=BEGIN
#SBATCH --mail-type=END
#SBATCH --mail-type=FAIL
#SBATCH --output="deepvariant-std-%j-%N.out" # job standard output file (%j replaced by job id)
#SBATCH --error="deepvariant-std-%j-%N.err" # job standard error file (%j replaced by job id)
#SBATCH --account=scinet_workshop1

module load miniconda3
module load bcftools
module load htslib

conda activate /project/ai_forum/deepvariant/Software/condaenvs/glnexus

# Scalable gVCF merging and joint variant calling 
glnexus_cli \
    --threads 48 \
    --config DeepVariant_WGS \
    Variants/*.g.vcf.gz > Variants/cohort.bcf

conda deactivate

# Convert raw bcf results to vcf format
bcftools convert -Oz -o Variants/cohort.vcf.gz Variants/cohort.bcf

# Set GT (DP < 1 then GT = ./.) then re-calculate AF and fill AN,AC INFO tags
# Only keep standard FORMAT fields: GT:DP:AD:GQ:PL
bcftools +setGT Variants/cohort.bcf --threads 48 -Ob -- -t q -n . -e 'FMT/DP>=1' | \
bcftools +fill-tags --threads 48 - -Ob -- -t AF,AN,AC | \
bcftools annotate --threads 48 - -Ov -x FORMAT/RNC -o Variants/cohort.clean.vcf

# End
```

### Step 5: Variant Filtration

{: .copy-code }
```
#!/bin/bash

#SBATCH --time=08:00:00   # walltime limit (HH:MM:SS)
#SBATCH --nodes=1   # number of nodes
#SBATCH --ntasks-per-node=48   # 20 processor core(s) per node X 2 threads per core
#SBATCH --partition=atlas    # standard node(s)
#SBATCH --job-name="step5:variant_filtration"
#SBATCH --mail-user=$USER@usda.gov   # email address
#SBATCH --mail-type=BEGIN
#SBATCH --mail-type=END
#SBATCH --mail-type=FAIL
#SBATCH --output="deepvariant-std-%j-%N.out" # job standard output file (%j replaced by job id)
#SBATCH --error="deepvariant-std-%j-%N.err" # job standard error file (%j replaced by job id)
#SBATCH --account=scinet_workshop1

module load htslib
module load plink 2

# Many ways to filter variants... Here are a couple examples:

# Example 1 - AWK

chmod +x Scripts/filter_vcf.awk

./Scripts/filter_vcf.awk \
    -v dphom=2 \
    -v dphet=4 \
    -v minqual=20 \
    -v mindp=100 \
    -v minhomn=1 \
    -v minhomp=0.9 \
      -v tol=0.2 \
      -v minmaf=0.01 \
      -v minpresent=0.35 \
    Variants/cohort.clean.vcf > Variants/cohort.clean.filt.vcf

# "filter_vcf" parameters:
# dphom ... minimum read depth to accept a homozygous genotype call
# dphet ... minimum read depth to accept a heterozygous genotype call
# minqual ... minimum SNP quality (6th column of the VCF)
# mindp ... SNPs with a total depth (parsed from DP subfield of the INFO field) will be discarded.
# minhomn ... SNPs with fewer than minhomn homozygous calls for the REF and/or the ALT allele will be discarded.
# minhomp ... SNPs with a fraction of heterozygous calls among all present genotye calls exceeding 1 - minhomp will be discarded.
# tol ... Genotypes with DV/DP <= tol will be called 0/0; genotypes with DV/DP >= 0.5 - tol & DV/DP <= 0.5 + tol will be called 0/1; and genotypes with DV/DP >= 1 - tol will be called 1/1.
# minmaf ... SNPs with a minor allele frequency below minmax will be discarded.
# minpresent ... SNPs with a fraction of present data less than minpresent will be discarded.

# Compress results
bgzip --threads 48 Variants/cohort.clean.filt.vcf
tabix -p vcf Variants/cohort.clean.filt.vcf.gz

# Example 2 - Plink2

# Filter
plink2 \
    --vcf Variants/cohort.clean.vcf \
    --geno 0.35 \
    --maf 0.05 \
    --vcf-min-qual 16 \
    --min-alleles 2 \
    --max-alleles 2 \
    --vcf-half-call missing \
    --allow-extra-chr \
    --recode vcf \
    --out Variants/cohort.clean.filt

# Convert filtered .vcf to numeric [snps, inds] ".traw" file extension:
plink2 \
    --vcf Variants/cohort.clean.filt.vcf.gz \
    --allow-extra-chr \
    --recode A-transpose \
    --out Variants/cohort.clean.filt.numeric

# End
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

{% endcomment %}