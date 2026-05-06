---
title: Introduction to RNA-seq Analysis
type: workshop
display: basic
provider: [ISU, SCINet Office]
hideprovider: true
description: In this workshop, we will provide an overview of RNA-sequencing (RNA-seq) technology and best practices for experimental design. 
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/


layout_type: workshop
sessions:
  - session:
    time: 1 – 5 PM ET
    date: 2026-05-04
    end_date: 2026-05-07
    multiday: May 4, 6-7
    registration:
      url: https://forms.office.com/g/T2teMegYSW

tags: bioinformatics

prerequisites:
  - text: Familiarity with basic command-line concepts, next-generation sequencing data types, and have a general understanding of gene expression.

# materials:
#   - text: Webinar recording
#     url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EeSXwVxhhixDjy16i6D-hmcBNl5Cezp_yKfWiicczU7bXA
---

In this workshop we will provide an overview of RNA-sequencing (RNA-seq) technology and best practices for experimental design. Participants will also explore preprocessing steps, read alignment using a reference genome, and differential expression analysis using DESeq2. We will also introduce tools for functional analysis and determining the biological relevance of the results. <!--excerpt-->

Additionally, participants will explore the RNA-seq analysis pipeline in the absence of a reference genome using de novo transcriptome assembly.  

We will also introduce pseudoalignment techniques for rapid quantification of transcript abundance without base-by-base alignment. 


## Tutorial Setup Instructions  

Steps to prepare for the tutorial session:  

* Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).
 

* Open a command-line session by clicking on "Clusters" -> "Ceres Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres' login node.

* Create a workshop working directory by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  

  ```bash
  mkdir -p /90daydata/shared/$USER/intro_rnaseq 
  cd /90daydata/shared/$USER/intro_rnaseq
  cp -r /project/scinet_workshop2/foundations_bioinf_2026/rnaseq_analysis/files/* .
  ```
  {:.copy-code}

* Launch VS Code:
  * Under the Interactive Apps menu, select VS Code
  * Specify the following input values on the page:
    * Account: scinet_workshop2
    * Queue: ceres
    * QoS: 400thread
    * Number of cores: 2
    * Memory required: 6 G
    * Number of hours: 5
    * Optional Slurm Parameters: `--reservation=foundations_workshop`
    * Working Directory:  `/90daydata/shared/$USER/intro_rnaseq`
  * Click Launch. The screen will update to the *Interactive Sessions* page. When your VS Code session is ready, the top card will update from *Queued* to *Running* and a *Connect to VS Code* button will appear. Click *Connect to VS Code.*

-----

## RNA-Seq Data Analysis
*by Sivanandan Chudalayandi and Lavida Rogers*

RNA-seq experiments are performed with an aim to comprehend transcriptomic changes in organisms in response to a certain treatment. They are also designed to understand the cause and/or effect of a mutation by measuring the resulting gene expression changes. Robust algorithms specifically designed to map short stretches of nucleotide sequences to a genome while being aware of the process of RNA splicing have led to many advances in RNAseq analysis.  This tutorial will guide you through basic RNAseq analysis, beginning at quality checking of the RNAseq `reads` through to getting the differential gene expression results. We have downloaded an *Arabidopsis* dataset from NCBI for this purpose. Check the [BioProject](https://www.ncbi.nlm.nih.gov/bioproject/PRJNA348194) page for more information. 

### Background Information: Experimental design 
This experiment compares wild type (WT) and *atrx-1* mutant to analyze how the loss of function of ATRX protein results in changes in gene expression. The ATRX protein is a histone chaperone known to be an important player in the regulation of gene expression. RNA was isolated from three WT replicates and three mutant replicates. The transcriptome was enriched/isolated using the plant RiboMinus kit for obtaining total RNA. RNA-seq was carried out on an Illumina Hiseq 2500. The sequencing reads are paired-end data, hence we have 2 files per replicate. 
 

{% include table content="| Condition | replicate 1 | replicate 2 | replicate 3 |
| --- | --- | --- | --- |
| WT | SRR4420293_1.fastq.gz <br> SRR4420293_2.fastq.gz | SRR4420294_1.fastq.gz <br> SRR4420294_2.fastq.gz | SRR4420295_1.fastq.gz <br> SRR4420295_2.fastq.gz |
| atrx-1 | SRR4420296_1.fastq.gz <br> SRR4420296_2.fastq.gz| SRR4420297_1.fastq.gz <br> SRR4420297_2.fastq.gz| SRR4420298_1.fastq.gz <br> SRR4420298_2.fastq.gz |" %}

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Getting Data

#### The Raw sequence data
The files needed for this tutorial have already been downloaded. This will allow us to get started right away with our analyses without waiting on downloads or dealing with connectivity issues. 

#### The Reference Genome: 

We will also need the genome file and associated GTF/GFF file for *Arabidopsis*. These can be downloaded directly from [NCBI](https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=3701), or [plants Ensembl website](http://plants.ensembl.org/info/website/ftp/index.html), or the [Phytozome website\*](https://phytozome.jgi.doe.gov/pz/portal.html#!bulk?org=Org_Gmax).  
**The Phytozome needs logging in and selecting the files.* 

For this tutorial, we have already downloaded the following files from NCBI.

</li> 
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Quality Check 

We use `fastqc`, a tool that provides a simple way to do quality control checks on raw sequence data coming from high-throughput sequencing pipelines ([FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/)). 
 
Script for fastqc
  Ensure that you are in `/90daydata/shared/$USER/intro_rnaseq`. Create the empty script file:

  ```bash
  touch 00_Scripts/01_fastqc.sl
  ```
  {:.copy-code}

  Open `01_fastqc.sl` in the VS Code editor and copy and paste the script below:

  ```bash 
  #!/bin/bash 
  #SBATCH -N1 
  #SBATCH -c8 
  #SBATCH --account=scinet_workshop2
  #SBATCH --reservation=foundations_workshop
  #SBATCH -J fastqc  
  #SBATCH -o slurm_logs/fastqc_%j.out 
  #SBATCH -e slurm_logs/fastqc_%j.err 
  #SBATCH -t 01:00:00 

  # Load required modules 
  module load fastqc 
  module load multiqc 

  # Define Directories: 
  RAW_DIR="/90daydata/shared/$USER/intro_rnaseq/00_RawData" 
  OUT_DIR="$SLURM_SUBMIT_DIR/01_FastqC" 
  # make output directories 
  mkdir -p $OUT_DIR 
  # The main command 
  fastqc -t 8 -o $OUT_DIR $RAW_DIR/*gz 
  multiqc -p -o 01a_MultiQC/ $OUT_DIR --title "Arabidopsis_RNAseq" 
  ``` 
  {:.copy-code}

  Submit the script:

  ```bash 
  sbatch 00_Scripts/01_fastqc.sl 
  ``` 
  {:.copy-code}

</li> 
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Read Quality Trimming

When would you trim?  

* To remove bases of poor quality  
* To remove adapter sequences 
* Reads for demonstrating trimming

We will use BBDUK: Decontamination using kmers ([BBDUK Guide](https://archive.jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/)) 

Script for bbduk:
Ensure that you are in `/90daydata/shared/$USER/intro_rnaseq`. Create the empty script file:

{:.copy-code}
  ```bash
  touch 00_Scripts/02_bbduk.sl
  ```
Open `02_bbduk.sl` in the VS Code editor and copy and paste the script below:

{:.copy-code}
```bash  
#!/bin/bash 
#SBATCH -N1 
#SBATCH -c8 
#SBATCH --account=scinet_workshop2
#SBATCH --reservation=foundations_workshop
#SBATCH -J bbduk
#SBATCH -o slurm_logs/bbduk_%j.out 
#SBATCH -e slurm_logs/bbduk_%j.err 
#SBATCH -t 01:00:00 

module load bbtools
module load parallel

mkdir -p 02_Trimmed
# Define adapters variables 
adapters="/software/el9/apps/bbtools/39.01/resources/adapters.fa"

# Run bbduk in parallel:
ls 00_RawData/*_1.fastq.gz | parallel -j6 "bbduk.sh -Xmx4g in1={} in2={= s/_1.fastq.gz/_2.fastq.gz/ =} \
out1=02_Trimmed/{= s:.*/::; s/_1.fastq.gz/_trimmed_1.fastq.gz/ =} \
out2=02_Trimmed/{= s:.*/::; s/_1.fastq.gz/_trimmed_2.fastq.gz/ =} \
ref=$adapters ktrim=r k=23 mink=11 hdist=1 qtrim=rl trimq=20 minlength=50 tpe tbo"
``` 

**Explanation of options:** 

- ref=adapters.fa: Reference file containing adapter sequences to be trimmed. 
- ktrim=r: Trim adapters from the right end of reads. 
- k=23: K-mer length for matching adapters. 
- mink=11: Minimum k-mer length for adapter matching. 
- hdist=1: Allow one mismatch in k-mer matching. 
- qtrim=rl: Trim both ends of reads based on quality. 
- trimq=20: Quality threshold for trimming. 
- minlength=50: Discard reads shorter than 50 bases after trimming. 
- tpe: Trim both reads of a pair if one is trimmed. 
- tbo: Trim adapters based on pair overlap detection.


Submit the script:

 {:.copy-code}
  ```bash 
  sbatch 00_Scripts/02_bbduk.sl
  ``` 

#### Run a quality check on the trimmed reads

Script for fastqc:
Create the empty script file:

 {:.copy-code}
```bash
touch 00_Scripts/03_fastqc.sl
```

Open `03_fastqc.sl` in the VSCode editor and copy and paste the script below:

{:.copy-code}
```bash 
#!/bin/bash 
#SBATCH -N1 
#SBATCH -c8 
#SBATCH --account=scinet_workshop2
#SBATCH --reservation=foundations_workshop
#SBATCH -J fastqc  
#SBATCH -o slurm_logs/fastqc_%j.out 
#SBATCH -e slurm_logs/fastqc_%j.err 
#SBATCH -t 01:00:00 

# Load required modules 
module load fastqc 
module load multiqc 

# Define Directories: 
RAW_DIR="/90daydata/shared/$USER/intro_rnaseq/02_Trimmed" 
OUT_DIR="$SLURM_SUBMIT_DIR/03_FastqC" 
# make output directories 
mkdir -p $OUT_DIR 
# The main command 
fastqc -t 8 -o $OUT_DIR $RAW_DIR/*gz 
multiqc -p -o 03a_MultiQC/ $OUT_DIR --title "Arabidopsis_RNAseq_TrimmedData"
``` 

Submit the script:

 {:.copy-code}
```bash 
  sbatch 00_Scripts/03_fastqc.sl
``` 
 
</li> 
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}

### Mapping reads to the genome using HISAT2  

There are several mapping programs available for aligning RNAseq reads to the genome. Generic aligners such as `BWA`, `bowtie2`, `BBMap`, etc., are not suitable for mapping RNAseq reads because they are not splice-aware. Because RNA-seq primarily targets mature mRNA, many reads consist of spliced exonic regions. Mapping these specific 'junction reads' back to the genome requires splice-aware aligners to split and bridge them across intronic gaps. In this tutorial, we will use [HISAT2](https://ccb.jhu.edu/software/hisat2/index.shtml), a successor of `Tophat2`. 
 

#### Build genome index 

For `HiSat2` mapping, you first need to index the genome and then use the read pairs to map the indexed genome (one set at a time). For indexing the genome, we use the `hisat2-build` command.

Create the empty script file:

{:.copy-code}
    
```bash
touch 00_Scripts/04a_hisat2_build.sl
```
    

Open the file `04a_hisat2_build.sl` in the VS Code editor and copy and paste the script below:

{:.copy-code}
    
  ```bash
    #!/bin/bash 
    #SBATCH -N1 
    #SBATCH -c8 
    #SBATCH --account=scinet_workshop2
    #SBATCH --reservation=foundations_workshop
    #SBATCH -J hisat2_build
    #SBATCH -o slurm_logs/hisat2_build_%j.out 
    #SBATCH -e slurm_logs/hisat2_build_%j.err 
    #SBATCH -t 01:00:00 
    
    module load hisat2
    DATA_DIR=/90daydata/shared/$USER/intro_rnaseq/00_Genome
    mkdir -p 04_Hisat2_Index/
    
    hisat2-build -p8 $DATA_DIR/GCF_000001735.4_TAIR10.1_genomic.fna 04_Hisat2_Index/Arabidopsis_TAIR10.1
  ```


Submit the script:

 {:.copy-code}
 
 ```bash
  sbatch 00_Scripts/04a_hisat2_build.sl
  ```
   

Once complete, you should see several files with the .ht2 extension in the `04_Hisat2_Index` folder. These are the index files. 

#### Mapping Reads to the index: 
We will do this using `parallel` within a Slurm batch script. First we will need two executable scripts (included): 

* `run_hisat2.sh` (Do not copy; file already included. Contents below are for reference.)
  ```bash 
  #!/bin/bash 
  R1=$1 
  R2=$2 
  SAMPLE=$(basename "$R1" _1.fastq.gz) 
  hisat2 -p 4 -x Arabidopsis_TAIR10.1 -1 "$R1" -2 "$R2" 2> LOG/"${SAMPLE}".log -S SAM/"${SAMPLE}".sam 
  ``` 
* `run_samtools.sh`  (Do not copy; file already included. Contents below are for reference.)
  `cat run_samtools.sh` 
  ```bash 
  #!/bin/bash 
  # Usage: ./run_samtools.sh SAMFILE 
  SAMFILE=$1 
  SAMPLE=$(basename $SAMFILE .sam) 
  samtools view -@ 7 -bS $SAMFILE | samtools sort -@ 7 -o BAM/${SAMPLE}.bam 
  ```  

The two executable shell scripts will be called within a slurm batch script. We will create the slurm script as follows:

Create the empty script:
  ```bash
  touch 00_Scripts/04_hisat2_samtools.sl
  ```
Open the file `00_Scripts/04_hisat2_samtools.sl` in the VS Code editor and copy and paste the script below:

 {:.copy-code}
 ```bash 
 #!/bin/bash 
 #SBATCH --account=scinet_workshop2
 #SBATCH --reservation=foundations_workshop 
 #SBATCH -N1 
 #SBATCH -c24
 #SBATCH -J hisat2  
 #SBATCH -o slurm_logs/hisat2_samtools%j.out 
 #SBATCH -e slurm_logs/hisat2_samtools%j.err 
 #SBATCH -t 08:00:00 
  
 # Load required modules 
 module load hisat2 
 module load samtools 
 module load parallel 
  
 # Define Directories: 
 RAW_DIR="/90daydata/shared/$USER/intro_rnaseq/02_Trimmed" 
 INDEX_DIR="/90daydata/shared/$USER/intro_rnaseq/04_Hisat2_Index" 
 OUT_DIR="$SLURM_SUBMIT_DIR/04_Hisat2_Aligned"
 SCRIPTS="/90daydata/shared/$USER/intro_rnaseq/00_Scripts" 
 mkdir -p $OUT_DIR 
  
 # change to compute node's local dir 
 cd $TMPDIR 
  
 # Set Permissions 
 chgrp -R proj-scinet_workshop2 $TMPDIR 
 chmod -R g+s $TMPDIR 
  
 # make output directories 
 mkdir SAM 
 mkdir BAM 
 mkdir LOG 
  
 # copy input data and shell scripts to the node's scratch dir 
 cp --preserve=ownership $RAW_DIR/*gz . 
 cp --preserve=ownership $INDEX_DIR/Arabidopsis_TAIR10.1*h* .  
 cp --preserve=ownership $SCRIPTS/run_hisat2.sh . 
 cp --preserve=ownership $SCRIPTS/run_samtools.sh . 
  
 # Check if folders are in TMPDIR 
 echo "Files in TMPDIR:"
 find . -type f 
  
 # The main command (run the two executable scripts) 
 parallel -j 6 "./run_hisat2.sh {1} {2}" ::: *_1.fastq.gz :::+ *_2.fastq.gz 
 parallel -j 6 "./run_samtools.sh {}" ::: SAM/*.sam 
  
 # Move the output directories back to the output folder 
 mv BAM $OUT_DIR 
 mv LOG $OUT_DIR  
 ``` 

Submit the script: 
  {:.copy-code}
  ```bash
  sbatch 00_Scripts/04_hisat2_samtools.sl
  ```
  

This will take about 15-30 minutes to complete.  

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Abundance Estimation 

For quantifying transcript abundance from RNA-seq data, there are many programs available. The two most popular tools are featureCounts and HTSeq. We will need a file with aligned sequencing reads (BAM files generated in previous step) and a list of genomic features (from the GFF file). featureCounts is a highly efficient general-purpose read summarization program that counts mapped reads for genomic features such as genes, exons, promoter, gene bodies, genomic bins and chromosomal locations. It also outputs statistics for the overall summarization of results, including the number of successfully assigned reads and the number of reads that failed to be assigned due to various reasons. We can run featureCounts on all SAM/BAM files at the same time or individually. 

You will need to have the [subread](http://subread.sourceforge.net/) and `parallel` modules loaded. They are included in the script below.

Open the file `00_Scripts/05_featurecounts.sl` in the VS Code editor and copy and paste the script below:

```bash 
#!/bin/bash 
#SBATCH --account=scinet_workshop2
#SBATCH --reservation=foundations_workshop 
#SBATCH -N 1 
#SBATCH -c 16 
#SBATCH -t 01:00:00 
#SBATCH -J featCounts 
#SBATCH -o slurm_logs/featCounts.%j.out 
#SBATCH -e slurm_logs/featCounts.%j.err 

# Load required modules 
module purge 
module load subread 
module load parallel 

# Define inputs 
ANNOT_GTF="/90daydata/shared/$USER/intro_rnaseq/00_Genome/GCF_000001735.4_TAIR10.1_genomic.gtf" 
BAMDIR="/90daydata/shared/$USER/intro_rnaseq/04_Hisat2_Aligned/BAM" 
OUTDIR="05_FeatCounts" 
mkdir -p ${OUTDIR} 

# FeatureCounts command 
parallel -j 4 "featureCounts -T 4 -s 2 -p --countReadPairs -t exon -g gene_id -a ${ANNOT_GTF} -o ${OUTDIR}/{/.}.txt {}" ::: ${BAMDIR}/*.bam 

scontrol show job ${SLURM_JOB_ID} 
``` 
{:.copy-code}

**Submit the batch script:**  

{:.copy-code}
```bash 
sbatch 05_featurecounts.sl 
``` 

This creates the following set of files in the specified output folder: 

* Count Files: 
  ``` 
  SRR4420298_trimmed.txt 
  SRR4420293_trimmed.txt 
  SRR4420297_trimmed.txt 
  SRR4420296_trimmed.txt 
  SRR4420295_trimmed.txt 
  SRR4420294_trimmed.txt
  ``` 

* Additionally, summary files are produced. These give the summary of reads that were either ambiguous, multi mapped, mapped to no features, or unmapped among other statistics. We can refer to these to further tweak our analyses etc. 
  ``` 
  SRR4420298_trimmed.txt.summary 
  SRR4420293_trimmed.txt.summary 
  SRR4420295_trimmed.txt.summary 
  SRR4420296_trimmed.txt.summary 
  SRR4420294_trimmed.txt.summary 
  SRR4420297_trimmed.txt.summary 
  ``` 

Using the following Linux commands, we can edit the outputs to produce a single count table. This count table will be loaded into R for differential expression analysis. 

* **Step 1**: From `/90daydata/shared/$USER/rna_seq/05_FeatCounts` edit the count files "in-place" using `sed`

  ```bash
  for f in *txt do
    sed -i '/^#/d' "$f"
    sed -i 's|/90day.*BAM/||g' $f
    sed -i 's|_.*bam||g' $f
    done
  ``` 
  {:.copy-code}

* **Step 2**: Make directory called `06_Combined_Counts` and make a combined count table with the first column as "Gene_IDs" and 6 other columns one for each sample's gene counts. 

  ```bash
  cd 06_Combined_Counts
  COUNTS="/90daydata/shared/$USER/rna_seq/05_FeatCounts"
  
  awk 'BEGIN {OFS="\t"} {print $1,$7}' $COUNTS/SRR4420293_trimmed.txt > col1.txt
  awk 'BEGIN {OFS="\t"} {print $7}' $COUNTS/SRR4420294_trimmed.txt > col2.txt
  awk 'BEGIN {OFS="\t"} {print $7}' $COUNTS/SRR4420295_trimmed.txt > col3.txt 
  awk 'BEGIN {OFS="\t"} {print $7}' $COUNTS/SRR4420296_trimmed.txt > col4.txt 
  awk 'BEGIN {OFS="\t"} {print $7}' $COUNTS/SRR4420297_trimmed.txt > col5.txt 
  awk 'BEGIN {OFS="\t"} {print $7}' $COUNTS/SRR4420298_trimmed.txt > col6.txt 
  paste col1.txt col2.txt col3.txt col4.txt col5.txt col6.txt > Arabidopsis_RNAseq_Counts.txt 
  ``` 
  {:.copy-code}

* The combined count file... a sneak peek: 

  ```bash
  head -4 Arabidopsis_RNAseq_Counts.txt 
  Geneid  SRR4420293      SRR4420294      SRR4420295      SRR4420296      SRR4420297      SRR4420298
  AT1G01010       10      1       8       25      10      13
  AT1G01020       36      3       24      80      21      14
  AT1G03987       0       0       0       0       0       0
  ``` 

* Convert to and save as CSV file 

  ```bash
  sed 's|\t|,|g' Arabidopsis_RNAseq_Counts.txt > Arabidopsis_RNAseq_Counts.csv
  ```
  {:.copy-code}

This file is ready to be imported to R for DESeq2.  
 
</li>

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Differential Gene Expression Analysis  

Make a directory called `07_DESeq2` and copy the R Script to the new directory:

```bash
mkdir 07_DESeq2
cp 00_Scripts/DESeq2.R 07_DESeq2
```
{:.copy-code}

* RStudio Server: Back on the main Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server". 
* Fill the input fields with the following (input fields not listed below can be left at their default values): 
  * Account: scinet_workshop2 
  * Queue: ceres 
  * QOS: 400thread 
  * R Version: 4.4.1 
  * Number of hours: 4 
  * Number of cores: 1 
  * Memory required: 8GB 
  * Optional Slurm Arguments: (leave empty) 
* Click the "Launch" button. 
* Wait a moment for the job card to update from "Queued" to "Running". 
* Please confirm that clicking on the "Connect to RStudio Server" button opens a new tab with the RStudio Server interface. 

We have saved the entire R script for DESeq2 (`DESeq2.R`). The script is partly based on [Stephen Turner's template](https://gist.github.com/stephenturner/f60c1934405c127f09a6). We have displayed the R script here largely for reference.   

<div class="usa-accordion usa-accordion--bordered padding-top-2">

  <div class="usa-accordion__heading">
    <button
      type="button"
      class="usa-accordion__button"
      aria-expanded="false"
      aria-controls="deseq2r"
    >
      DESeq2 R code
    </button>
  </div>

<div id="deseq2r" class="usa-accordion__content usa-prose" markdown=1 hidden>
 
   
```R
## Set working directory in R 
setwd("/90daydata/shared/$USER/intro_rnaseq/07_DESeq2/") 

## Get the latest version of Bioconductor 
if (!require("BiocManager", quietly = TRUE)) 
  install.packages("BiocManager") 
BiocManager::install(version = "3.20") 

## Install libraries needed: 

BiocManager::install("DESeq2") 
library("DESeq2") 
library(readr) 
library(DESeq2) 

## Load the libraries:
library(readr) 
library(DESeq2) 

# Read the data in
df1 <- read_csv("Arabidopsis_RNAseq_Counts.csv")

#Check the type of variable
typeof(df1)

#Find out the dimensions of the dataframe:
dim(df1) 

# Save the gene IDs as a vector 
AT_genes <- df1[1] 
df1 <- df1[,-1] 

# Some diagnoses:
 
# Total reads per sample 
colSums(df1) 

# SRR4420293 SRR4420294 SRR4420295 SRR4420296 SRR4420297 SRR4420298  
# 3703248    1081388    3793357   14588240    4095513    3235033  

# Boxplot of log counts per sample 
boxplot(log10(df1 + 1), las=2, main="Raw log10(counts+1) per sample", col="lightblue") 

#DESeq2 Pipeline 

#Metadata 
# Assign condition (first three are WT, next three are mutants) 
condition <- factor(c(rep("WT",3),rep("Mut",3))) 
condition=relevel(condition,ref = "WT") 

# Create a metadata frame: its rows correspond to columns of dat (i.e., matrix representing the countData) 
metadata <- data.frame(row.names=colnames(df1), condition) 
head(metadata) 

#               condition 
# SRR4420293        WT 
# SRR4420294        WT 
# SRR4420295        WT 
# SRR4420296       Mut 
# SRR4420297       Mut 
# SRR4420298       Mut 

# Create the DeSEQDataSet object  
# This will store the raw count matirx, sample metadata and experimental design 

dds1 <- DESeqDataSetFromMatrix(countData = df1, colData = metadata,design=~ condition) 

#- countData: gene x sample matrix we created from all_counts.txt 
# - colData: sample metadata with rownames matching colnames  
# - design = ~condition: the experimental design formula where ~condition means you want to test for differential gene expression  between the condition variables (e.g treated vs control) 

#Run DESeq2 pipeline 

dds1 <- DESeq(dds1) 
#check sample info 
colData(dds1) 
#check dispersion estimates 
plotDispEsts(dds1) 
#extract results  
head(results(dds1)) 
#summary 
summary(results(dds1)) 
#check available coefficients 
resultsNames(dds1)  
# Extract normalized counts 
norm_counts <- counts(dds1, normalized=TRUE) 

# Boxplot of normalized log counts 
boxplot(log10(norm_counts + 1), las=2, main="Normalized log10(counts+1)", col="lightgreen") 

#Get differential expression results 

#summary table of results: 
table(results(dds1,contrast = c("condition", "WT", "Mut"))$padj<=0.05) 

#store results as a variable 
diff_res <- results(dds1, contrast=c("condition", "WT", "Mut")) 

#filter for significant DEGs 
res_sig<- diff_res[which(diff_res$padj <0.05 & abs(diff_res$log2FoldChange)>1),] 

# Merge with normalized counts 
results_data<- as.data.frame(res_sig) 
results_data$gene <- rownames(results_data) 
norm_counts_df<- as.data.frame(norm_counts) 
norm_counts_df$gene <- rownames(norm_counts_df) 

merged_data<- merge(results_data, norm_counts_df, by = "gene") 
head(merged_data) 
merged_ordered<- merged_data[order(merged_data$padj, abs(merged_data$log2FoldChange)),] 
head(merged_ordered) 

# Write Results 

write.csv(merged_ordered, "DESeq2_results_norm_counts.csv") 

# Visualize Results 
install.packages("pheatmap") 
BiocManager::install("EnhancedVolcano") 
install.packages("ggplot2") 
install.packages("RColorBrewer") 

library(RColorBrewer) 
library(pheatmap) 
library(ggplot2) 
library(EnhancedVolcano) 

#histogram of Log2FC 
hist(merged_ordered$log2FoldChange, breaks=50, col="skyblue", main="Distribution of Log2FC", xlab="Log2FC") 

hist(log10(rowMeans(norm_counts)+1), breaks=50, 

     main = "Distribution of average gene expression (log10)", xlab="log10(normalized count + 1)") 

# MA plot (built-in) 

plotMA(dds1, ylim = c(-5, 5), main = "MA plot") 

# Volcano plot 

res <- results(dds1) 
res$padj[is.na(res$padj)] <- 1  # Replace NAs 
res_df <- as.data.frame(res) 
res_df$gene <- rownames(res_df) 
res_df$sig <- res_df$padj < 0.05 

ggplot(res_df, aes(log2FoldChange, -log10(padj), color = sig)) + 
  geom_point(alpha = 0.4) + 
  scale_color_manual(values = c("gray", "red")) + 
  theme_minimal() + 
  labs(title = "Volcano plot", x = "log2 Fold Change", y = "-log10 Adjusted p-value") 
  

#Transform data for visualization  
#variance-stabilized transformation for PCA  
vsdata<- vst(dds1, blind=FALSE) 

#plot PCA 
plotPCA(vsdata, intgroup="condition") 

#Better PCA using ggplot2 
pcaData<-plotPCA(vsdata, intgroup="condition", returnData=TRUE) 
percentVar <- round(100 * attr(pcaData, "percentVar")) 
ggplot(pcaData, aes(PC1, PC2, color = condition, label=name)) +  
geom_point(size =3)+  
xlab(paste0("PC1: ", percentVar[1], "%"))+ 
ylab(paste0("PC2: ", percentVar[2], "%")) 

# VOLCANO PLOT  

library(EnhancedVolcano) 

EnhancedVolcano(merged_ordered,  
                lab=merged_ordered$gene,  
                x="log2FoldChange", 
                y="padj",  
                pCutoff=0.05,  
                FCcutoff=1) 

# Volcano Plot with Labeled Significant Genes 
#look at top 10 
top10 <- head(merged_ordered,10) 
head(top10) 
top10$gene[1:10] 

EnhancedVolcano(merged_ordered,  
                lab=merged_ordered$gene,  
                x="log2FoldChange", 
                y="padj",  
                pCutoff=0.05,  
                FCcutoff=1, 
                title='Volcano Plot: Top 10 Significant DEGs', 
                xlab='Log2FC', 
                ylab='-Log10 adjpval', 
                selectLab = top10$gene) 

library(pheatmap) 
library(RColorBrewer) 
#select expression columns only  
top50 <- head(merged_ordered,50) 
rownames(top50)<-top50$gene 
expression<- as.matrix(top50[,grep("^SRR", colnames(top50))]) 
head(expression) 

#Scale each gene across samples 
exprs_scaled<-t(scale(t(expression))) 
head(exprs_scaled) 

#Plot heatmap 

pheatmap(exprs_scaled, 
         show_rownames=TRUE, 
         cluster_cols = TRUE, 
         cluster_rows = TRUE, 
         color=colorRampPalette(c("navy","white","firebrick3"))(100)) 
 
 ``` 
</div>

  <div class="usa-accordion__heading">
    <button
      type="button"
      class="usa-accordion__button"
      aria-expanded="false"
      aria-controls="functionalr"
    >
      Functional annotation R code
    </button>
  </div>
<div id="functionalr" class="usa-accordion__content usa-prose" markdown=1 hidden>

```R
###########################################################################
### Functional Annotation 
##Goal: Run GO enrichment analysis & KEGG Pathway analysis
###########################################################################

#1. Install and Load Required Packages
###########################################################################
####install packages 
BiocManager::install("org.At.tair.db")
BiocManager::install(c("AnnotationDbi", "clusterProfiler", "pheatmap"))

####load libraries
library(org.At.tair.db) #provides Arabidopsis gene annotation
library(clusterProfiler) #performs funcitonal enrichment analysis
library(AnnotationDbi) #helps convert between gene ID types
library(pheatmap) #creates clustered heatmaps 

###########################################################################
#2. Gather significant DEGs
###########################################################################
##### get names of the significant genes
sig_gene_names<- merged_ordered$gene


#preview:
head(sig_gene_names)

length(sig_gene_names)

#Remove missing values and duplicates
sig_gene_names <- unique(na.omit(sig_gene_names))

#check how many genes remain: 
length (sig_gene_names)

###########################################################################
# 3. Convert TAIR IDs to Entrez IDs for annotation 
#Some annotation tools require Entrez IDs
###########################################################################

entrez_ids <- mapIds(org.At.tair.db, keys = sig_gene_names, 
                     column="ENTREZID", 
                     keytype = "TAIR", multiVals = "first")

#keys=your input gene list
#keytype = type of input ID
#column = what you want to convert to
#multiVals = how to handle multiple mappings (take first)

### Remove the genes that could not be mapped:
entrez_ids <- na.omit(entrez_ids)

#preview:
head(entrez_ids)
length(entrez_ids)

###########################################################################
# 4. GO enrichment analysis
###########################################################################


go_res<- enrichGO(gene = entrez_ids,
                  OrgDb = org.At.tair.db,
                  keyType = "ENTREZID",
                  ont = "BP", #options: BP, MF, CC
                  pAdjustMethod = "BH",
                  pvalueCutoff = 0.05,
                  qvalueCutoff = 0.05,
                  readable = TRUE)

go_res

####Plot results
dotplot(go_res, showCategory = 15, title="GO BP: Arabidopsis thaliana")


####If few/no GO results, relax thresholds:

go_res<- enrichGO(gene = entrez_ids,
                  OrgDb = org.At.tair.db,
                  keyType = "ENTREZID",
                  ont = "BP", #options: BP, MF, CC
                  pAdjustMethod = "BH",
                  qvalueCutoff = 0.2,
                  pvalueCutoff = 0.1,
                  readable = TRUE)


dotplot(go_res, showCategory = 15, title="GO BP: Arabidopsis thaliana")

#MF = molecular function 
#What molecular activities are enriched?
go_res_MF<- enrichGO(gene = entrez_ids,
                     OrgDb = org.At.tair.db,
                     keyType = "ENTREZID",
                     ont = "MF", #options: BP, MF, CC
                     pAdjustMethod = "BH",
                     qvalueCutoff = 0.2,
                     pvalueCutoff = 0.1,
                     readable = TRUE)


dotplot(go_res_MF, showCategory = 15, title="GO MF: Arabidopsis thaliana")


###########################################################################
# 5. USING SYMBOL instead of using ENTREZ_ID
###########################################################################

symbols <- mapIds(org.At.tair.db, keys = sig_gene_names, 
                  column="SYMBOL", keytype = "TAIR", multiVals = "first")

####get rid of the missing mappings
symbols <- na.omit(symbols)

go_res2<- enrichGO(gene = symbols,
                   OrgDb = org.At.tair.db,
                   keyType = "SYMBOL",
                   ont = "BP", #options: BP, MF, CC
                   pAdjustMethod = "BH",
                   qvalueCutoff = 0.05,
                   pvalueCutoff = 0.05,
                   readable = TRUE)

dotplot(go_res2, showCategory = 15, title="GO BP: Arabidopsis thaliana")

#CC = cellular component
#Where in the cell are these gene products enriched?
go_res_CC<- enrichGO(gene = entrez_ids,
                     OrgDb = org.At.tair.db,
                     keyType = "ENTREZID",
                     ont = "CC", #options: BP, MF, CC
                     pAdjustMethod = "BH",
                     qvalueCutoff = 0.2,
                     pvalueCutoff = 0.1,
                     readable = TRUE)


dotplot(go_res_CC, showCategory = 15, title="GO CC: Arabidopsis thaliana")


###########################################################################
# 6. USING SYMBOL instead of using ENTREZ_ID
###########################################################################

symbols <- mapIds(org.At.tair.db, keys = sig_gene_names, 
                  column="SYMBOL", keytype = "TAIR", multiVals = "first")

####get rid of the missing mappings
symbols <- na.omit(symbols)

go_res2<- enrichGO(gene = symbols,
                   OrgDb = org.At.tair.db,
                   keyType = "SYMBOL",
                   ont = "BP", #options: BP, MF, CC
                   pAdjustMethod = "BH",
                   qvalueCutoff = 0.05,
                   pvalueCutoff = 0.05,
                   readable = TRUE)

dotplot(go_res2, showCategory = 15, title="GO BP: Arabidopsis thaliana")

###########################################################################
# 7. KEGG Enrichment 
###########################################################################

####enrichKEGG identifies over represented KEGG pathways for Arabidopsis. 

ekegg<- enrichKEGG(gene = sig_gene_names,
                   organism = "ath",
                   pvalueCutoff = 0.05)


barplot(ekegg, showCategory = 15, title="KEGG: Arabidopsis thaliana")

###########################################################################
# 8. Optional: GO enrichment for upregulated vs downregulated genes
###########################################################################

#upregulated genes
upreg_genes<- merged_ordered$gene[
  merged_ordered$padj <0.05 & merged_ordered$log2FoldChange > 0 
]

#downregulated genes
downreg_genes<- merged_ordered$gene[
  merged_ordered$padj <0.05 & merged_ordered$log2FoldChange < 0 
]

#clean up gene lists 

upreg_genes<-unique(na.omit(upreg_genes))
downreg_genes<-unique(na.omit(downreg_genes))

#GO BP enrichment for upregulated genes 
go_res_up<- enrichGO(gene = upreg_genes,
                     OrgDb = org.At.tair.db,
                     keyType = "SYMBOL",
                     ont = "BP", #options: BP, MF, CC
                     pAdjustMethod = "BH",
                     qvalueCutoff = 0.05,
                     pvalueCutoff = 0.05,
                     readable = TRUE)

dotplot(go_res_up, showCategory = 15, title="GO BP Enrichment - Upregulated")


#GO BP enrichment for downregulated genes

#GO BP enrichment for upregulated genes 
go_res_down<- enrichGO(gene = downreg_genes,
                     OrgDb = org.At.tair.db,
                     keyType = "SYMBOL",
                     ont = "BP", #options: BP, MF, CC
                     pAdjustMethod = "BH",
                     qvalueCutoff = 0.05,
                     pvalueCutoff = 0.05,
                     readable = TRUE)

dotplot(go_res_down, showCategory = 15, title="GO BP Enrichment - Downregulated")
```
</div>
</div>

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Quantification using Pseudoalignment 

RNA-seq analysis usually involves mapping sequencing reads to a reference genome to quantify gene expression levels. When a high-quality reference genome is unavailable, the transcriptome is typically assembled from the sequencing reads, allowing for the estimation of transcript abundance without performing a full alignment. 

Kallisto is a fast, alignment-free method for estimating transcript abundance from RNA-seq data. Instead of traditional base-by-base alignment, kallisto uses k-mer matching, which involves identifying short, fixed-length sequences (k-mers) shared between reads and transcripts to quickly assign reads to compatible transcripts. 

We will explore how kallisto works by using a transcriptome for *Arabidopsis* which we downloaded from Ensembl. 

Relaunch VS Code and navigate to the working directory: 

{:.copy-code}

```bash
/90daydata/shared/$USER/intro_rnaseq
```

*Load the software

{:.copy-code}
```bash
module load kallisto
```

#### Build an index 

*Create working directories:

{:.copy-code}
```bash
mkdir 08_Kallisto

cd 08_Kallisto

mkdir -p index results
```

*To build the index: 

Code Format: `kallisto index -i [index name.idx] [transcriptome path]`

* `kallisto index`:  builds index
* `-i`: location of index file 
* `.fa`: transcript sequences
* `.idx`: structure that allows Kallisto to run quickly

{:.copy-code}
```bash

TRANS="/90daydata/shared/$USER/intro_rnaseq/00_Transcriptome"

kallisto index -i index/Arabidopsis_thaliana.idx ${TRANS}/Arabidopsis_thaliana.TAIR10.cdna.all.fa.gz
```
* Quantification

`kallisto quant` options:

*`-i : index file
*`-o`: output folder
*`-b`:bootstrap runs / confidence estimations
*`-t`: number of CPU threads
* `paired read 1`
* `paired read 2`

Expected output: 

* `abundance.tsv`: quantification file
* `abundance.h5`: binary HDF5 format of the quantification results
* `run_info`: summary file with information about the job run

Navigate to main working directory: 
{:.copy-code}
```bash
/90daydata/shared/$USER/intro_rnaseq
```

{:.copy-code}
```bash
 touch 00_Scripts/08_kallisto_quant.sl
```

Open the file `00_Scripts/08_kallisto_quant.sl` in the VS Code editor and copy and paste the script below:


{:.copy-code}
```bash
#!/bin/bash
#SBATCH --account=scinet_workshop2
#SBATCH --reservation=foundations_workshop 
#SBATCH --job-name=kallisto_quant
#SBATCH --output=slurm_logs/kallisto_%j.out
#SBATCH --error=slurm_logs/kallisto_%j.err
#SBATCH --time=04:00:00
#SBATCH --cpus-per-task=16
#SBATCH --mem=50G

#Load kallisto
module load kallisto 

#Set paths 
INDEX="/90daydata/shared/$USER/intro_rnaseq/08_Kallisto/index/Arabidopsis_thaliana.idx"
RAW_DIR="/90daydata/shared/$USER/intro_rnaseq/00_RawData"
RESULTS_DIR="/90daydata/shared/$USER/intro_rnaseq/08_Kallisto/results"

#find all read 1 files that end with _1.fastq.gz
for r1 in ${RAW_DIR}/*_1.fastq.gz

do 

#get sample name only
sample=$(basename "$r1" _1.fastq.gz)

#find matching read 2
r2="${RAW_DIR}/${sample}_2.fastq.gz"
 
#echo the sample being processed
echo "Currently processing: ${sample}"

###Run kallisto

kallisto quant -i ${INDEX} -o ${RESULTS_DIR}/${sample} -b 100 -t ${SLURM_CPUS_PER_TASK} ${r1} ${r2}

#Print completion message
echo "Finished with ${sample}"

done

echo "All runs complete" 
```
Submit the slurm script:  
{:.copy-code}
```bash
sbatch 00_Scripts/08_kallisto_quant.sl
```
Let's take a look at the output files: 
{:.copy-code}
```bash
head abundance.tsv
```
{:.copy-code}
```bash
cat run_info
```
Now that we have transcript level expression estimates for each sample, we need to combine them before running DESeq2 for differential gene expression analysis. We will do this in R.

* Launch R Studio


  <div class="usa-accordion__heading">
    <button
      type="button"
      class="usa-accordion__button"
      aria-expanded="false"
      aria-controls="deseq2kallisto"
    >
      DESeq2 workflow after Kallisto R code
    </button>
  </div>
<div id="deseq2kallisto" class="usa-accordion__content usa-prose" markdown=1 hidden>

{:.copy-code}
```R

###########################################################################
#Using Kallisto Results for DESeq2 Workflow 
#Goal: run differential gene expression analysis and visualize results
###########################################################################

###########################################################################
#1. Set your working directory to the folder with the results from Kallisto

#setwd("/90daydata/shared/$USER//intro_rnaseq/08_Kallisto/results")

#replace $USER with your SCINet account username

setwd("/90daydata/shared/lavida.rogers/intro_rnaseq/08_Kallisto/results")


############################################################################
#2. Install and load required packages

BiocManager::install(c("tximport","biomaRt", "DESeq2"))

#Load libraries:

library(tximport) 
#used to import kallisto output files into R 
#helps to summarize transcript-level results to gene-level counts

library(DESeq2) #performs differential gene expression analysis
#library(GenomicFeatures)
#library(readr)
library(biomaRt) 
#used to retrieve transcript-to-gene annotations from Ensembl Plants

############################################################################
#3. Find Kallisto outputs
############################################################################
#Get a list of directories (sample folders) in the current working directory
#Each directory corresponds to one sample and contains abundance.tsv 

samples <-list.dirs(path = ".", recursive = FALSE)
samples

#Create full paths to each sample's abundance.tsv file
#file path() combines folder names with the file name
quant_files<-file.path(samples, "abundance.tsv")

#Use folder names as sample names:
names(quant_files) <- basename(samples)
#These names become the sample names in the count matrix

#Confirm we identified the correct files
quant_files

###############################################################################
#4.  Get the transcript-to-gene mapping file 
#This file connects transcript IDs to gene IDs
###############################################################################
#We have to connect to Ensembl Plants
#Arabidopsis is in Ensembl Plants
#Load biomaRt/install if needed: 


#list of BioMart databases we can connect to:
listMarts(host="https://plants.ensembl.org")

#Connect to Ensembl Plants
mart<-useMart(
  biomart = "plants_mart", 
  host = "https://plants.ensembl.org")

#Find the Arabidopsis dataset
datasets<- listDatasets(mart)
head(datasets)

#Look for Arabidopsis
datasets[grep("thaliana", datasets$description, ignore.case=TRUE),]

#Connect to the dataset

mart<-useMart(
  biomart = "plants_mart", 
  dataset = "athaliana_eg_gene",
  host = "https://plants.ensembl.org"
)

#Get transcript to gene mapping
#Retrieves transcript IDs and their corresponding gene IDs

tx2gene<-getBM(attributes = c("ensembl_transcript_id","ensembl_gene_id"),
               mart=mart)


#Rename columns for tximport
colnames(tx2gene) <- c("transcript","gene")



#Convert tx2gene into a two-column dataframe
tx2gene_update<-data.frame(transcript=as.character(tx2gene[[1]]),
                           gene=as.character(tx2gene[[2]]))


#preview
head(tx2gene_update)

#We have successfully pulled a mapping between transcript IDs and gene IDs.

#We used biomaRt to pull the transcript-to-gene mappings directly
#did not need to build a database from the GTF file

##############################################################################
# 5. Test if IDs match 
##############################################################################
#here we will compare kallisto transcript IDs to tx2gene transcript IDs

#Look at transcript IDs from the first sample 
kallisto_ids<- read.delim(quant_files[1])$target_id
head(kallisto_ids)


head(tx2gene_update$transcript)

#check for overlap

#count how many kallisto transcript IDs match tx2gene
sum(kallisto_ids %in% tx2gene_update$transcript)

##############################################################################
#6. Import Kallisto output with tximport
##############################################################################
#tximport uses tx2gene_update to summarize transcript-level estimates
#to gene-level counts so we can run Deseq2

#import kallisto results and summarize to gene level
txi<-tximport(
  quant_files,
  type = "kallisto",
  tx2gene = tx2gene_update,
  ignoreAfterBar = TRUE
)

#preview:
head(txi$counts)
#dimensions: genes x samples
dim(txi$counts)

#############################################################################
#7.Create sample meta data
#############################################################################
#Let's create sample tble describing each sample
sampleTable <- data.frame(sampleName=names(quant_files), 
                          condition=c("WT","WT","WT","MUT","MUT","MUT"))

#set row names to sample names
#Deseq2 will use the rownames to match the metadata table to count columns
rownames(sampleTable)<-sampleTable$sampleName

#preview
sampleTable

#############################################################################
#8.Create Deseq2 object 
#############################################################################

dds_kallisto<- DESeqDataSetFromTximport(
  txi, #imported gene level counts
  colData=sampleTable, #sample information
  design = ~condition #variable to test/used for comparing samples
)

#filter low-count genes to remove noise
#dds_kallisto<-dds_kallisto[rowSums(counts(dds_kallisto))>10,]

#############################################################################
#### 9.Run DESeq2 analysis
#############################################################################

dds_kallisto <- DESeq(dds_kallisto)

####check sample info
colData(dds_kallisto)

####check dispersion estimates
plotDispEsts(dds_kallisto)

####extract results 
head(results(dds_kallisto))

####summary
summary(results(dds_kallisto))

####check available coefficients
resultsNames(dds_kallisto) 

#### Extract normalized counts
norm_counts_k <- counts(dds_kallisto, normalized=TRUE)

#### Boxplot of normalized log counts
boxplot(log10(norm_counts_k + 1), las=2, main="Normalized log10(counts+1)", col="lightgreen")


#### Get differential expression results

####summary table of results:
table(results(dds_kallisto,contrast = c("condition", "WT", "MUT"))$padj<=0.05)

#219 genes are statistically different and 5968 are not

#store results as variable
dds_results<-results(dds_kallisto)

#############################################################################
#volcano plot
#############################################################################

plot(dds_results$log2FoldChange,
     -log10(dds_results$padj),
     main="Volcano Plot using Kallisto Counts",
     xlab="Log2FC",
     ylab="-log10 adjusted p-val")

#highlight significant genes
significant_genes<- dds_results$padj <0.05

plot(dds_results$log2FoldChange,
     -log10(dds_results$padj),
     pch=20,
     col=ifelse(significant_genes,"red","gray"),
     main="Volcano Plot using Kallisto Counts",
     xlab="Log2FC",
     ylab="-log10 adjusted p-val")

#############################################################################
#PCA plot
#############################################################################
vsd<-vst(dds_kallisto) #stabilizes variance across count levels 

#create pca plot to see how samples cluster
plotPCA(vsd, intgroup="condition")

#############################################################################
#Save results
#############################################################################

DEGs<-significant_genes[which(significant_genes$padj <0.05),]

#Save to file 
write.csv(
  as.dataframe(DEGs),
  file = "Arabidopsis_significant_DEGs_Kallisto.csv")
)

###Next step: Functional annotation of DEGs
```
</div>
</div>

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### De Novo Transcriptome Assembly and Quantification 

De novo RNA-seq analysis is used when a reference genome is not available. In this case, instead of aligning reads to a reference genome, sequence reads are assembled into transcript sequences to generate a sample-specific transcriptome using only the information available in the RNA-seq reads. 

Expression is then quantified by mapping reads to the assembled transcriptome using alignment-free methods. 

</li>


</ol>
