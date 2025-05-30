---
title: Genome Assembly Validation and Improvement
type: workshop
display: basic
no-caldate: true
provider: ISU
hideprovider: true
description: In this workshop, participants will learn how to understand and validate a genome assembly.
categories: [2025 Bioinfo]
parent: 
  title: Bioinformatics Workshop Series
  url: /events/2025-bioinfo

instructor: "Rick Masonbrink, Sivanandan Chudalayandi, and Satheesh Viswanathan"

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
    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/ERTmIW73KilAkiOe74KQXHsBZ8eKElIadzk4dpKZDZ6hNg
---

In this workshop, participants will learn how to understand and validate a genome assembly. The participants will appreciate why genome assembly is often an iterative process, where you start with a draft and constantly improve using techniques such as polishing and scaffolding. Participants will also be introduced to gene annotation. <!--excerpt-->



## Introduction to Hi-C Data and Genome Scaffolding with Juicer, 3D-DNA, and Juicebox

* **What is Hi-C?**
  * Hi-C is a chromosome conformation capture technique that measures the 3D spatial organization of genomes.
  * It captures physical proximity between different regions of the genome by crosslinking, digesting, and ligating DNA, followed by paired-end sequencing.
  * Hi-C reads represent pairs of DNA fragments that were close together in the nucleus, even if they are distant in the linear genome sequence.
  * Hi-C data can reveal:
      * Chromosome territories
      * Topologically associating domains (TADs)
      * Fine-scale contacts are valuable for genome assembly

* **Why Use Hi-C for Genome Scaffolding?**
  * Proximity information from Hi-C contacts can be used to:
      * Order contigs along chromosomes
      * Orient contigs correctly
      * Detect misassemblies in initial genome drafts

  * Hi-C offers long-range linking information (>1 Mb) that is difficult to obtain from short-read sequencing alone.
* **How does `juicer` and `3D-DNA` use Hi-C Data for Scaffolding**
  * **Juicer** is a pipeline for processing raw Hi-C reads into a contact map.
      * Aligns Hi-C read pairs to the draft genome assembly (e.g., using BWA or other aligners).
      * Filters and deduplicates valid Hi-C contacts.
      * Generates .hic files — compressed, indexed contact maps.
      * Provides quality control statistics on the data (e.g., contact matrices at various resolutions).

  * **3D-DNA** is a pipeline that uses Juicer outputs to scaffold and improve genome assemblies.
      * Takes the initial assembly and Hi-C contact map as input.
      * Identifies and breaks potential misassemblies based on inconsistent Hi-C signals.
      * Clusters contigs into chromosomes using contact frequencies.
      * Orders and orients contigs within each chromosome.
      * Outputs a new assembly with chromosome-length scaffolds.
      * Optionally, the assembly can be manually curated using Juicebox Assembly Tools to correct or refine scaffolding.



Getting started:

{:.copy-code}
```bash
srun --reservation=wk2_workshop -A scinet_workshop2 -t 08:00:00 -p ceres -N1 -c8 --pty bash

mkdir -p /90daydata/shared/$USER/genome_assembly
cd /90daydata/shared/$USER/genome_assembly
cp -r /project/scinet_workshop2/Bioinformatics_series/wk2_workshop/day2/ .
cd day2
```


### Run juicer pipeline

* Setting up subfolders

  {:.copy-code}
  ```bash
mkdir references
mkdir fastq
mkdir splits
```

* The reference folder should contain the genome and its BWA-mem index

  {:.copy-code}
  ```bash
cp ../../02_Files/Genome.fasta references/
```

* Build Index
  
  {:.copy-code}
  ```bash
module purge
module load bwa
time bwa index references/Genome.fasta
```

* Make the chrome.sizes file

  {:.copy-code}
  ```bash
module load samtools
samtools faidx references/Genome.fasta
cut -f 1,2 references/Genome.fasta.fai > chrom.sizes
```

* Copy the fastq files to the fastq folder and explore  
  *Note:* Juicer requires that the fastq files be named with this extension `_R1.fastq` and `_R2.fastq`. Any other naming scheme will fail, and the files must not be compressed.

  {:.copy-code}
  ```bash
cp ../02_Files/*.fastq fastq
wc -l fastq/*
../02_Files/new_Assemblathon.pl references/Genome.fasta
```

* Change to `splits folder` and split the fastq files

  {:.copy-code}
  ```bash
cd splits/
split -a 3 -l 240000 -d --additional-suffix=_R1.fastq ../fastq/2MAtHiCDedup_R1.fastq&
split -a 3 -l 240000 -d --additional-suffix=_R2.fastq ../fastq/2MAtHiCDedup_R2.fastq &
```

* Run juicer

  {:.copy-code}
  ```bash
cd /90daydata/shared/$USER/genome_assembly/day2/01_TestJuicer/
module purge
module load juicer
export _JAVA_OPTIONS=-Djava.io.tmpdir=${TMPDIR}
time JUICER juicer.sh -d $PWD -p chrom.sizes -s none -z references/Genome.fasta -t 8 --assembly
```

  Essential output files reside within the `aligned` folder.
  ```bash
tree aligned/
aligned/
├── header
├── inter.txt
├── inter_30.txt
├── inter_30_hists.m
├── inter_hists.m
├── merged1.txt
├── merged30.txt
├── merged_dedup.bam
└── merged_nodups.txt
```


{% include table caption="Juicer2 Output Files — Basic Definitions" content="| File | Definition | Use |
|:-----|:-----------|:----|
| `header` | Text file with metadata about the Hi-C run (e.g., genome version, parameters). | Used internally by Juicer; small summary of the processing run. |
| `merged1.txt` | List of Hi-C read pairs at 1 bp resolution (raw, not normalized). | Can be used to build low-resolution contact maps. |
| `merged30.txt` | List of Hi-C read pairs at 30 bp resolution (binning shortens file size). | Used for making higher-level, binned contact maps more efficiently. |
| `merged_dedup.bam` | BAM file of aligned, deduplicated Hi-C reads (valid pairs only). | Useful for visualization in genome browsers like IGV, JBROWSE, etc. |
| `inter.txt` | Contact statistics between contigs/scaffolds (raw form). | Basic QC: shows how reads link different parts of the genome. |
| `inter_hists.m` | MATLAB script with histograms of Hi-C contact distributions. | Helps visualize contact decay with distance; used for QC. |
| `inter_30.txt` | Same as `inter.txt`, but based on reads binned at 30 bp resolution. | Faster/lighter version for QC and distance plotting. |
| `inter_30_hists.m` | MATLAB script plotting histograms for 30 bp binned contacts. | Visual QC of contact maps at lower resolution. |
| `merged_nodups.txt` | Full list of valid Hi-C contacts, deduplicated, in tab-separated text format. | **Main input** for 3D-DNA scaffolding and for building `.hic` files for Juicebox visualization. |" %}


#### Troubleshooting common problems

* Deduplication is not finishing:

  If this occurs, it is likely due to a low complexity region that has too many reads and thus too much depth for deduplication and becomes a memory hog without any progress. 

  You can create a blacklist for these regions in your genome. Typically you can find those regions by running a repeat finder on your genome, and then masking those regions so reads will not map there. Then before you run 3ddna you can swap your genome back to the unmasked version.  Tandem repeats and low complexity repeats are usually the culprit, ribosomal DNA may cause problems as well.  


* My juicer script wont submit any jobs:

  Juicer has not been modified suitably to use your HPC system. If this is not the issue, then it is likely that you must make -q and -l match the names of your queue's. We are using the CPU version of Juicer today, so we should not see any of these issues.


* My alignments are not finishing:

  Create a larger number of split fastq files within splits/.


### Run 3D-DNA pipeline

* Set up folder

  {:.copy-code}
  ```bash
module purge
module load dna_3d
module load parallel
module load java
mkdir 3D_DNA/
cd 3D_DNA/
```

* Softlink the two main input files for 3D-DNA

  {:.copy-code}
  ```bash
ln -s ../aligned/merged_nodups.txt 
ln -s ../references/Genome.fasta
```

* Main 3D-DNA pipeline command

  {:.copy-code}
  ```bash
time run-asm-pipeline.sh Genome.fasta merged_nodups.txt
# approx 25 mins
``` 

#### Appendix: more about 3d_DNA

There are many ways to optimize 3D-dna. Those options can be seen with sh run-asm-pipeline.sh --help . In my experience I have found the manual scaffolding with Juicebox to be much easier when I use the initial scaffolding that 3D-dna produces: Genome.0.hic and Genome.0.assembly. So I typically use the default parameters.


##### Basic commands

```bash
ml dna_3d; bash run-asm-pipeline.sh -h 

3D de novo assembly: version 190716

USAGE: ./run-asm-pipeline.sh [options] path_to_input_fasta path_to_input_mnd
```

DESCRIPTION:
This is a script to assemble draft assemblies (represented in input by draft fasta and deduplicated list of alignments of Hi-C reads to this fasta as produced by the Juicer pipeline) into chromosome-length scaffolds. The script will produce an output fasta file, a Hi-C map of the final assembly, and a few supplementary annotation files to help review the result in Juicebox.

##### ARGUMENTS:

- `path_to_input_fasta`  
  Specify file path to draft assembly FASTA file.

- `path_to_input_mnd`  
  Specify path to deduplicated list of alignments of Hi-C reads to the draft assembly FASTA, as produced by the Juicer pipeline (i.e., the `merged_nodups` file).

---

##### OPTIONS:

- `-m | --mode haploid/diploid`  
  Runs in specific mode, either **haploid** or **diploid** (default is *haploid*).

- `-i | --input input_size`  
  Specifies threshold input contig/scaffold size (default is *15000*).  
  Contigs/scaffolds smaller than `input_size` will be ignored.

- `-r | --rounds number_of_edit_rounds`  
  Specifies number of iterative rounds for misjoin correction (default is *2*).

- `-s | --stage stage`  
  Fast forward to later assembly steps.  
  Accepted values: `polish`, `split`, `seal`, `merge`, `finalize`.

- `-h | --help`  
  Shows this help message. Use `--help` for a full set of options.


##### for advanced parameters
ml dna_3d; bash run-asm-pipeline.sh --help


##### Different ways to run 3d-dna

* **Set the temp directory for java before you run 3D-dna**

  {:.copy-code}
  ```bash
_JAVA_OPTIONS=-Djava.io.tmpdir=${TMPDIR}
```

* **Default run of 3D-dna**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module java;bash run-asm-pipeline.sh Genome.fasta merged_nodups.txt 
```

* **3D-dna run that will scaffold all contigs >1000bp**  
  Default skips anything smaller than has anything smaller than 15,000 skipped.

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module load java;bash run-asm-pipeline.sh -i 1000 Genome.fasta merged_nodups.txt 
```

* **3D-dna run that allows a larger variation of repeat coverage**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel; module load java;bash run-asm-pipeline.sh --editor-repeat-coverage 20 Genome.fasta merged_nodups.txt 
```

* **3D-dna run that trys to assemble unmapped reads with Lastz, if installed**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module load java; bash run-asm-pipeline.sh -m diploid Genome.fasta merged_nodups.txt
```

* **3D-dna run that only uses reads with a mapping quality greater than 30**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module load java; bash run-asm-pipeline.sh -q 30 Genome.fasta merged_nodups.txt
```

* **3D-dna run that increases stringency for misjoin detection for less fragmentation**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module load java; bash run-asm-pipeline.sh -q 30 --editor-coarse-stringency 90 --editor-repeat-coverage 20 --splitter-coarse-stringency 80 --splitter-coarse-resolution 250000 --editor-coarse-resolution 250000 --editor-fine-resolution 25000 --editor-coarse-region 500000 Genome.fasta merged_nodups.txt
```

* **3D-dna run that was the best for this arabidopsis dataset**

  {:.copy-code}
  ```bash
module load dna_3d;module load parallel;module load java; bash run-asm-pipeline.sh --editor-coarse-stringency 90 --editor-coarse-resolution 125000 --editor-coarse-region  250000 --editor-repeat-coverage 30 Genome.fasta merged_nodups.txt
```


## Running JuiceBox on Ceres Desktop

{:.copy-code}
```bash
mkdir /90daydata/shared/$USER/genome_assembly/day2/03_JuiceBox
cd /90daydata/shared/$USER/genome_assembly/day2/03_JuiceBox

##Download Juicebox
wget https://github.com/aidenlab/JuiceboxGUI/releases/download/v3.1.4/juicebox.jar
```

{:.copy-code}
```bash
module load java
java -Xms512m -Xmx2048m -jar juicebox.jar
```

{:.copy-code}
```bash
module load dna_3d;module load java;module load parallel; bash run-asm-pipeline-post-review.sh --sort-output -s seal -i 100 -r Genome.0.review.assembly Genome.fasta merged_nodups.txt
```
