---
title: "From reads to variants: a pipeline for variant calling using DeepVariant"
date: 2024-11-21 08:00
categories: [2024 AI User Forum] 
time: 9am-12pm CT
lead: ARS scientists Sheina Sim and Craig Carlson

section: November 21, Morning — Applications of AI

Prerequisites:
  - text: Familiarity with basic command-line concepts. We will offer virtual training for these skills before the Forum begins.
  - text: Understanding of genomic sequencing.
  - text: General optimism.
---

DeepVariant is a DNA sequence variant caller that uses a convolutional neural network (CNN) to call genotypes relative to a reference genome assembly. In this workshop, we will discuss a workflow for calling variants from whole-genome data for multiple individuals. <!--excerpt--> This workflow involves trimming and filtering raw reads, mapping them to a reference assembly, calling variants for each individual, merging the variants of all individuals into a single variant call format file (.vcf), and filtering the resulting variant file. We will guide participants through this pipeline step by step, providing generalized commands for each phase of the process, as well as strategies for optimizing cluster usage and reducing compute time. The final product will be a .vcf containing variants for all individuals which can be used for downstream analyses, along with a solid understanding for performing variant detection using DeepVariant.


## Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/web-based-login). 

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas' login node. 

1. **Request resources on a compute node** by running the following command:  
  
    {: .copy-code }
    ```
    srun --reservation=forum -A scinet_workshop1 -t 03:00:00 -n 1 --mem 8G --pty bash
    ``` 
    {% include reservation-alert reservation="forum" project="scinet_workshop1" %}

1. **Create a workshop working directory** and copy the workshop materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable. 

    {: .copy-code }
    ```
    mkdir -p /90daydata/shared/$USER/deepvariant 
    cd /90daydata/shared/$USER/deepvariant
    
    cp /project/ai_forum/deepvariant/Sample_Data/assembly.fasta . 
    
    mkdir PE_directory 
    cp -r /project/ai_forum/deepvariant/Sample_Data/samplename_R*.fastq.gz .
    
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
    source activate /project/ai_forum/deepvariant/Software/condaenvs/deepvariant 
    
    # Prepare for a fun time 
    
    # Step 1: trimming 
    # Trim adapter artifacts from your reads 
    trim_galore --paired \ 
            --basename samplename \ 
            --output_dir Trimmed \ 
            --cores 24 \ 
            PE_directory/samplename_R1.fastq.gz \ 	 
            PE_directory/samplename_R2.fastq.gz 
            
    # Step 2: mapping 
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
    
    # Step 3: call variants 
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

    # Merge and Filter  
    module load miniconda3 
    module load jemalloc 
    module load bcftools 
    module load htslib 
    conda activate /project/ai_forum/deepvariant/Software/condaenvs/glnexus 

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

1. **Stop the interactive job** on the compute node by running the command exit. 