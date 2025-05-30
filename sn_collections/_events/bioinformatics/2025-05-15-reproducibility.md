---
title: RNA for Genome Annotation and Reproducibility in Bioinformatics
type: workshop
display: basic
no-caldate: true
provider: ISU
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
    url: https://forms.office.com/g/8qFLk99g5c
tags: bioinformatics

prerequisites:
  - text: Familiarity with basic command-line concepts.

materials:
  - text: Workshop recording
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/EVNFEq4hxqJOjF-m8d7dtuwBtriwiDz8DqPtQbksUqq1Og?e=5NJQ8J
---

This workshop demonstrates how RNA data can be used for genome annotation. Participants will explore using RNA-derived evidence to improve genome annotations, distinguish coding from non-coding regions, and validate. We will also explore strategies for increasing reproducibility in bioinformatics. <!--excerpt-->

## Tutorial Setup Instructions

Steps to prepare for the tutorial session:

* Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).
* Open a command-line session by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. This will open a new tab with a command-line session on Ceres' login node.
* Request resources on a compute node by running the following command.

    {:.copy-code}
```bash
srun --reservation=wk3_workshop -A scinet_workshop2 -t 05:00:00 -N1 -c2 --pty bash
```
    {% include reservation-alert reservation="wk3_workshop" project="scinet_workshop2" %}

* Create a workshop working directory by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  

    {:.copy-code}
```bash
mkdir -p /90daydata/shared/$USER/genome_annotation 
cd /90daydata/shared/$USER/genome_annotation
cp -p /project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/repeats.sl .
cp -p /project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/braker.sl .
```
-----

## Genome Annotation
*by Viswanathan Satheesh, Sivanandan Chudalayandi and Rick Masonbrink*

Genome assemblies, especially in plants and eukaryotes in general, contain a significant proportion of repetitive elements: transposons, retroelements, simple repeats, and satellite DNA. These elements can make it harder to perform genome annotation, confound gene prediction tools, and inflate assembly size. To accurately annotate genomes, it is crucial to identify and mask these repeats prior to downstream analyses like gene prediction (e.g., with BRAKER) or comparative genomics. Two widely used tools in this process are [RepeatModeler](https://github.com/Dfam-consortium/RepeatModeler) and [RepeatMasker](https://www.repeatmasker.org/).

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Repeat Identification and Masking

#### RepeatModeler – Building a Custom Repeat Library
RepeatModeler is a *de novo* transposable element (TE) discovery tool. It identifies repeat families in a genome without prior knowledge by combining multiple tools like RECON, RepeatScout, and LTR structural analyzers.

Main points:
* Input: A genome assembly (FASTA) file.
* RepeatModeler scans the genome to identify repeated regions and clusters them into repeat families.
* It classifies known elements (e.g., LINEs, SINEs, LTRs, DNA transposons) and labels unknown families as “Unknown”.
* The output is a custom repeat library (consensi.fa) containing representative consensus sequences of repeat families.

Note: Reference repeat databases (e.g., RepBase, Dfam) may not contain species-specific repeats. RepeatModeler ensures that the masking step is informed by repeats unique to the genome, improving masking sensitivity and annotation accuracy.

#### RepeatMasker – Masking Repeats for Accurate Annotation
RepeatMasker uses a library of known or *de novo* identified repeats (e.g., from RepeatModeler) to scan a genome and “mask” those regions. It has two masking modes:

* Softmasking: Converts repeat bases to lowercase. Allows gene predictors to consider masked regions but with reduced weight.
* Hardmasking: Converts repeats into Ns, effectively hiding them from downstream tools.
* Input: The genome file and a repeat library (from RepeatModeler or Dfam).
* Masking options: -xsmall for softmasking, -nolow to avoid masking simple repeats.
* Optional, use -gff to output a GFF annotation file of repeats.

#### Using the modules

For this step we will use the repeatmodeler and repeatmasker module in the script below (included)

`repeats.sl`

```bash
#!/bin/bash
#SBATCH -N1
#SBATCH -c16
#SBATCH -J repeats
#SBATCH --reservation=wk3_workshop # FYI: This reservation expires May 16, 2025
#SBATCH -A scinet_workshop2
#SBATCH -o LOG/repeats_%j.out
#SBATCH -e LOG/repeats_%j.err
#SBATCH -t 08:00:00

########################
# Load required modules
#########################

module load repeatmodeler/2.0.5
module load repeatmasker

#################
# Define Variable
#################

TAIR_REF="/project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/01_Files/TAIR_Assembly/chr2.fa"
BASENAME="chr2"
DBNAME="ATNDB"

####################
# Exercise for Later
####################

#OUR_REF="/project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/01_Files/Our_Assembly/Arabidopsis_chr2.fa"
#BASENAME="Arabidopsis_chr2"
#DBNAME="ATNDB"

#############
# Permissions
#############

chgrp -R proj-scinet_workshop2 $TMPDIR
chmod -R g+s $TMPDIR

##############################
#copy to $TMPDIR and change dir
#############################

cp -p "$TAIR_REF" "$TMPDIR"
cd "$TMPDIR"

###################
# The main commands
###################

BuildDatabase -engine ncbi -name "$DBNAME" "$BASENAME.fa"
RepeatModeler -database "$DBNAME" -engine ncbi -threads 16
RepeatMasker -pa 4 -gff -xsmall -nolow -engine ncbi -lib RM*/consensi.fa.classified -dir RepeatMaskOut "$BASENAME.fa"

##############################################
# Move the output folders to working directory
##############################################

mv RM* "$SLURM_SUBMIT_DIR/."
mv RepeatMaskOut "$SLURM_SUBMIT_DIR/."  
```

Submit the script:

{:.copy-code}
```bash 
sbatch repeats.sl  
``` 

#### Best Practices

* Use RepeatModeler on your genome especially if no curated repeat libriary exists in the species.
* Mask the genome before gene prediction with tools like BRAKER or Augustus to avoid false gene calls in repetitive regions.
* Softmasking prefered over hard masking.
* Visualize repeat annotations alongside genes in JBrowse2 to better understand genome structure.

</li> 
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### BRAKER: Genome Annotation with RNA-Seq and/or Protein Evidence

[BRAKER](https://github.com/Gaius-Augustus/BRAKER) (Biological Reference Annotation and KEyword Retrieval) is an automated pipeline designed to predict protein-coding genes in eukaryotic genomes. It integrates *ab initio* gene prediction with evidence from RNA-seq and/or protein alignments, providing high-quality annotations even for model and non-model organisms.

BRAKER uses two main gene prediction tools:

* GeneMark:
    - ES mode for unsupervised direct training from the genome. This uses codon usage and intron/exon structure.
    - EP+ mode uses protein alignments to help with gene prediction.

* AUGUSTUS:
    - An *ab initio* gene predictor that uses a Hidden Markov Model (HMM) to model gene structures. AUGUSTUS uses training parameters produced by Genemark and further refines those predictions using hints from RNA-seq or proteins.

Evidence types in BRAKER:

* RNA-seq only
* Protein only
* Combined RNAseq and protein

#### Best Practices for Using BRAKER
* Input Genome:
    - Provide a softmasked genome (lowercase for repeats) signaling prediction algorithms to de-emphasize them.
    - RNA-seq alignments:
        - Use high-quality, strand-specific RNA-seq if available.
        - Trim adapters and low-quality bases before alignment.
    - Protein Data:
        - Use a comprehensive and evolutionarily related protein set (OrthoDB; Uniprot etc.)
        - Diverse proteins improve prediction
    - Computational Considerations:
        - BRAKER is parallelizable (multi-threaded)
        - Monitor log files


#### Using the module
In this step we will use the `braker` module as described in the script below (included)

**braker.sl**

```bash
#!/bin/bash
#SBATCH -N1
#SBATCH -c16
#SBATCH -p ceres
#SBATCH -t 12:00:00
#SBATCH --reservation=wk3_workshop # FYI: Reservation expires on May 16, 2025
#SBATCH -A scinet_workshop2
#SBATCH -o "LOG/Braker_%j.out"
#SBATCH -e "LOG/Braker_%j.err"

###################
# Permissions
##################
chgrp -R proj-scinet_workshop2 $TMPDIR
chmod -R g+s $TMPDIR

############################
# VARIABLES #
############################
BAM=/project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/02_Hisat2/CHR2/chr2.bam
MASKED_GENOME=/project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/03_Repeats/RepeatMaskOut/chr2.fa.masked
PROTEINS=/project/scinet_workshop2/Bioinformatics_series/wk3_workshop/day2/01_Files/TAIR_Assembly/chr2_proteins.fasta
BASENAME="chr2"

##############################
# loading modules
##############################
module load braker/3.0.8
module load augustus

###################################
# Change to compute node's Temp Dir
##################################
cd $TMPDIR

############################
# copying config directory 
############################
cp -r /software/el9/apps/augustus/3.5.0/config/ .
AUGUSTUS_CONFIG="$PWD/config/"

cp -p "$BAM" .
cp -p "$MASKED_GENOME" .
cp -p "$PROTEINS" .

#################################
# Check if folders are in TMPDIR
#################################
echo "Files in TMPDIR:"
find . -type f
echo "--genome=$BASENAME.fa.masked --prot_seq=$BASENAME_proteins.fasta --bam=$BASENAME.bam"

############
# Braker run
############
braker.pl --threads 16 \
--AUGUSTUS_CONFIG_PATH="$AUGUSTUS_CONFIG" \
--species=Athaliana \
--genome="$BASENAME".fa.masked \
--prot_seq="$BASENAME"_proteins.fasta \
--bam="$BASENAME".bam \
--gff3 \
--workingdir=braker_out \
--stranded=- \

###################
# Move outputs back 
####################
mv braker_out "$SLURM_SUBMIT_DIR"
```

Submit the script:

{:.copy-code}
```bash 
sbatch braker.sl  
``` 
</li> 
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Visualizing using JBrowse2 Desktop:

[JBrowse2](https://jbrowse.org/jb2/download/) Desktop is a powerful standalone genome browser that enables interactive visualization of genome assemblies, annotations, and sequencing data without a web server. We can quickly inspect results from gene prediction pipelines like BRAKER, visualizing RNA-seq alignments, or comparing annotations. We will use JBrowse 2 Desktop on Ceres via Open OnDemand, focusing on gene annotation visualization and comparison.

1. **Launch JBrowse 2 on Open OnDemand**
    - Open an OOD interactive desktop session
    - Launch a terminal and load the module
    - Run the program

        {:.copy-code}
        ```bash
module load jbrowse
jbrowse-desktop
```

1. **Create a New Session**  
    When JBrowse 2 Desktop launches, you will be prompted to "Create a New Session".
    - Click "New Session".
    - Start with an empty workspace.

1. **Load Genome Assembly**  
    - Click "File → Open" and choose "Add assembly".
    - Browse to your FASTA file (e.g., chr2.fasta) and load it. If the fasta index is missing, JBrowse will generate it.

1. **Add Annotation Tracks**  
    Add GFF3, BED, or GTF files that represent different BRAKER runs:
    - Click "Track" → "Add track".
    - Select the GFF3 file (e.g., braker_rnaseq.gff3.gz).
    - JBrowse will ask for the index and if missing, generate it:

1. **Add the RNAseq alignments**  
    Note: The BAM file must be indexed (.bai file). Before indexing the BAM file, it must be sorted.
    - Click "Track" → "Add track".
    - Select only the BAM file (ensure that the index file is present as well).
    - JBrowse will load both the BAM and the index.

1. **Visualize and Compare**  
    Use zoom and pan to explore gene structures. Compare exon-intron organization between annotation runs.  
      * Inspect:
        - Missing/extra exons or genes
        - Differences in gene boundaries
        - Evidence of alignment (BAM files)

1. **Save and Share Sessions**  
    Save the session using:  
    File → Export Session  
      * Save it as `file.jbrowse` for reloading later or sharing with collaborators.


</li>
</ol>


