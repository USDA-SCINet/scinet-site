---
title: Genome Assembly
type: workshop
display: basic
provider: [ISU, SCINet Office]
hideprovider: true
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/

tags: Genomics Genome-Assembly
sessions: 
  - session:
    time: 1-5 PM ET
    date: 2026-04-20    
    end_date: 2026-04-24 
    multiday: April 20, 22 & 23

registration:
    url: https://forms.office.com/g/T2teMegYSW

Prerequisites: 
  - text: Familiarity with basic command-line concepts and next-generation sequencing data types.
---

In this interactive, hands-on workshop, you will learn how to use SCINet's computing resources to convert raw DNA sequencing data into a complete genome assembly. Along the way, you will also learn best practices for ensuring that your genome assemblies are robust and useful for downstream analyses. <!--excerpt--> 

In this workshop, participants will learn:
* Different techniques to build and evaluate the accuracy and completeness of genome assemblies
* How to understand and improve a genome assembly
* Why genome assembly is often an iterative process, where you start with a draft and repeatedly improve upon it using techniques for scaffolding.  

---
title: "Genome Assembly"
authors:
  - "Viswanathan Satheesh"
  - "Rick Masonbrink"
  - "Sivanandan Chudalayandi"
date: "April 20, 22 and 23 2026"
---

# Sequencing Technologies, QC, and Profiling

Welcome to Day 1. During this session we will briefly review sequencing technologies, evaluate the quality of short and long-read data, estimate vital genome metrics using K-mers, and initiate the primary genome assembly step using `hifiasm`.


---

## 1. Data Quality Control

### Short Read Quality Assessment: `FastQC`
To check the raw sequence quality from the Illumina data, we use FastQC. 

```bash
module load fastqc
module list # to confirm the module was loaded
mkdir -p 03_IlluminaQC
time fastqc -o 03_IlluminaQC -t 2 01_Data/AT_Illumina_paired_*fastq
```

Once completed, you can view the `.html` report output to evaluate Per-base Sequence Quality, Duplication levels, and Adapter content.

### Long Read Quality Assessment: `NanoPlot`
For PacBio HiFi reads (and optionally, Oxford Nanopore), we need tools specialized in longer lengths.

```bash
module purge 
module load miniconda 
source activate /project/scinet_workshop2/Bioinformatics_series/nanoplot_conda/NP/ 
mkdir -p 04_NanoPlotQC

time NanoPlot --fastq 01_Data/mapped_reads.chr2.filtlong.fastq.gz-o 04_NanoPlotQC --threads 8
```

*Expected time: ~1m31s*

Review the generated plots, specifically the length vs quality scatterplot and the histogram of read lengths to understand your sample's characteristics.


---

## 2. Genome Profiling with K-mers

Before assembly, we should estimate the genome size, heterozygosity, and repetition frequency. We use counting tools on our high-accuracy Illumina reads.

### Counting K-mers with `Jellyfish`

```bash
module purge
module use /software/el9/spack/lmod/Core
module load jellyfish
mkdir -p 05_GenomeScope

# Count k-mers of length 21
time jellyfish count -m 21 -s 100M -t 8 \
  -C 01_Data/AT_Illumina_paired_*fastq -o 05_GenomeScope/reads.jf
```
- `-m 21`: 21-mers
- `-s 100M`: Hash size for estimating expected unique k-mers
- `-t 20`: 20 threads

*Expected time: ~24s*

Generate the K-mer histogram:
```bash
time jellyfish histo -t 8 05_GenomeScope/reads.jf > 05_GenomeScope/reads.histo
```

### Analyzing with `GenomeScope`
You will now take your `reads.histo` output and navigate to the web application: [GenomeScope](http://genomescope.org/).

Interpret the visual reports carefully. Key points include:
- What is the estimated total Genome Size? 
- What is the total estimated Unique Sequence (%)?

---

## 3. Initial De Novo Assembly

Let us proceed to generate our primary contig structures using the PacBio HiFi data. 

### Running `hifiasm`

```bash
module purge
module load hifiasm
mkdir -p 06_Assembly

time hifiasm -o 06_Assembly/chr2_hifi.asm -t 8 -m 10 -f 0 01_Data/mapped_reads.chr2.filtlong.fastq.gz > 06_Assembly/chr2_hifi.asm.log 2>&1 &
# Run hifiasm with the following parameters: 
# -o: output prefix 
# -t: number of threads (8 in this case) 
# -m: minimum number of overlaps to keep a contig (10 in this case) 
# -f: bloom filter parameter (0 in this case)
```

*Expected time: ~3m48s for small subsets (Chr2), but significantly longer on complete genomes.*

While you wait for `hifiasm` to run, review the theory behind the String Graph methodology and phase variations.

## 4. Checking Assembly Output

### Converting the String Graph (GFA to FASTA)
`hifiasm` output generates a graphical format. We must extract the linear sequence.

```bash
# Example pulling sequence out of the primary contig assembly graph
awk '/^S/ { print ">"$2; print $3 }' 06_Assembly/chr2_hifi.asm.bp.p_ctg.gfa > 06_Assembly/chr2_hifi.asm.bp.p_ctg.fa

# Counting the number of raw contigs generated
grep ">" -c 06_Assembly/chr2_hifi.asm.bp.p_ctg.fa
```

*(Additional Exercise: If you ran parallel ONT workflows, parse through your generated `Flye` output files for comparison).*

We recommend visualizing the raw `.gfa` file locally using [Bandage](https://rrwick.github.io/Bandage/) if you would like to explore telomere loops and structural bubbles visually.

### Assembly Statistics

```bash
00_Scripts/new_Assemblathon.pl 06_Assembly/chr2_hifi.asm.bp.p_ctg.fa > 06_Assembly/chr2_AssemblyStats.txt

less 06_Assembly/chr2_AssemblyStats.txt 
```

---

## 5. Quality Assessment

**BUSCO Analysis with compleasm**

BUSCO (Benchmarking Universal Single-Copy Orthologs) is a crucial tool for assessing genome assembly completeness. It searches for highly conserved genes that should be present in all species of a given lineage. The presence, absence, or fragmentation of these genes gives us insight into the quality of our assembly.

**Key BUSCO metrics:**

- **Complete (S):** Single-copy complete genes
- **Duplicated (D):** Complete genes present multiple times
- **Fragmented (F):** Partially assembled genes
- **Missing (M):** Genes not found in the assembly
- **Total (N):** Total number of genes in the BUSCO dataset

We’ll use compleasm, a faster implementation of BUSCO, with the embryophyta_odb12 database which is specific for plants:
 
```bash
module purge 
module load busco6

time busco \
  -i 06_Assembly/chr2_hifi.asm.bp.p_ctg.fa \
  -l 01_Data/busco/lineages/eukaryota_odb12 \
  -o 07_BUSCO \
  -m genome \
  -c 16 \
  --offline
```

```
    -------------------------------------------------------------------------------------------
    |Results from dataset eukaryota_odb12                                                      |
    -------------------------------------------------------------------------------------------
    |C:20.9%[S:20.9%,D:0.0%],F:2.3%,M:76.7%,n:129,E:11.1%                                      |
    |27    Complete BUSCOs (C)    (of which 3 contain internal stop codons)                    |
    |27    Complete and single-copy BUSCOs (S)                                                 |
    |0    Complete and duplicated BUSCOs (D)                                                   |
    |3    Fragmented BUSCOs (F)                                                                |
    |99    Missing BUSCOs (M)                                                                  |
    |129    Total BUSCO groups searched                                                        |
    -------------------------------------------------------------------------------------------

```

**Interpreting the results:** 

Since we're only assembling chromosome 2 (not the complete genome), the high "Missing" percentage (76.7%) is expected. The complete single-copy BUSCOs (20.9%) represent the genes that happen to be located on this chromosome. The absence of duplicated BUSCOs (0.0%) indicates good haplotype resolution without collapsed repeats.

---

## 6. Reference-Free Assessment (`meryl` and `merqury`)

We evaluate how thoroughly our assembly represents the K-mers contained within the input raw reads themselves.

```bash
module load meryl
module load merqury

mkdir -p 09_Merqury_Output_HiFi && cd 09_Merqury_Output_HiFi

# Step 1: Count K-mers from raw reads again (k=17 optimal for 19Mb genome)
time meryl k=17 count output ../08_AT_HiFi.meryl ../01_Data/AT_HiFi_chr2.fastq.gz

# Step 2: Compare to the assembly FASTA
merqury.sh ../08_AT_HiFi.meryl \
  ../06_Assembly/chr2_hifi.asm.bp.p_ctg.fa merqury_out
```

### Analyzing the Merqury Output
- Open `merqury_out.qv`. Look for the Quality Value (`70.88` implies high base quality > Q70).
- Open `merqury_out.completeness.stats`. A value around `99.8%` confirms nearly all read-based k-mers are represented in your linear assembly.

---

## 7. Preparation for Scaffolding (`Juicer`)

Connecting overlapping contigs properly into whole chromosome-length scaffolds requires conformational capture (Hi-C) mapping. We must prepare a directory for `Juicer` to perform this mapping.

### Setting Up Reference Folders
Juicer strictly requires certain file locations, headers without special characters, and a FASTA format. Avoid placing contigs smaller than 5kb in the assembly prior to running juicer to reduce `Juicebox` lag.

```bash
module load samtools

mkdir -p HiC_Mapping/references && cd HiC_Mapping/references

# Linking your formatted fasta assembly for juicer
ln -s /project/scinet_workshop2/foundations_bioinf_2026/genome_assembly/01_Data/HiCGenome.fasta

# Indexing the assembly for BWA mapping
ml bwa
bwa index HiCGenome.fasta
cd ..

# Creating a required chromosome sizes file
samtools faidx references/HiCGenome.fasta 
cut -f 1,2 references/HiCGenome.fasta.fai >chrom.sizes
```

### Creating the FASTQ Folder
Juicer requires naming the input files distinctly as `*_R1.fastq` and `*_R2.fastq`.

```bash
cd ..
mkdir fastq && cd fastq

# Linking the provided HiC Reads (must be unzipped)
ln -s /project/scinet_workshop2/foundations_bioinf_2026/genome_assembly/01_Data/AtHic_R1.fastq
ln -s /project/scinet_workshop2/foundations_bioinf_2026/genome_assembly/01_Data/AtHic_R2.fastq
```

### Splitting Files
Instead of letting juicer do this natively, you manually split the `.fastq` files in a `splits` directory to push more parallel SLURM jobs concurrently inside shorter queue times.

```bash
cd ..
mkdir splits && cd splits
# Split the unzipped FASTQ files 
split -a 3 -l 600000 -d --additional-suffix=_R1.fastq ../fastq/AtHic_R1.fastq &
split -a 3 -l 600000 -d --additional-suffix=_R2.fastq ../fastq/AtHic_R2.fastq &

```

### Executing `Juicer`

```bash
cd ..  # Move back to HiC_Mapping directory

module load juicer
module load bwa

# Assuming 'nova' is your local SLURM partition:
JUICER juicer.sh -d $(pwd) -p chrom.sizes -s none -z references/HiCGenome.fasta -t 96 --assembly 
```

Once submitted, the `aligned/merged_nodups.txt` map table will be generated! 

## 8: Completing Your Genome

---

### A. Automated Scaffolding (`3D-DNA`)

The tool `3d-dna` converts Hi-C connectivity frequency into distance and biological associations, joining the raw assembly together.

```bash
module load dna_3d
module load parallel
module load java
```
*(Note: Because `3D-DNA` is constantly updated, we'll clone it actively)*

```bash
# Clone the repository
git clone https://github.com/aidenlab/3d-dna.git
cd 3d-dna

# Softlink your merged Juicer outputs
ln -s ../aligned/merged_nodups.txt
ln -s ../references/HiCGenome.fasta
```

### B. Running the Assembly Pipeline
By default, `3d-dna` skips scaffolding contigs under 15kb in size. This improves visual rendering in `Juicebox`. 

```bash
# set temp directory
export _JAVA_OPTIONS=-Djava.io.tmpdir=${TMPDIR}
# Standard 3d-dna scaffold (default params)
bash run-asm-pipeline.sh HiCGenome.fasta merged_nodups.txt
```

*This generates two important files: `HiCGenome.0.assembly` and your initial Hi-C map `HiCGenome.0.hic`.*

---

### C. Manual Scaffolding (`Juicebox`)

No automated Hi-C scaffolder is perfect. Reviewing the initial output manually is highly recommended.

#### Setting Up 
Start Ceres Desktop open on demand with 12 cores and 200G of memory for 2 hours. Open the terminal emulator at the bottom of the screen and navigate to your Juicer directory.

**Download and run [Juicebox]**
```
git clone https://github.com/aidenlab/3d-dna.git

java -Xmx200g -jar Juicebox_1.11.08.jar
```

1. Open Juicebox. Use **File -> Open**, and select the produced `.hic` file.
2. Select **Assembly -> Import Map Assembly**, and load the `HiCGenome.0.assembly` file generated by `3d-dna`.

### D. Modifying and Curation
Look for clear squares along the interaction diagonal indicating scaffolds. If there is intense "butterfly" signal bridging squares, those scaffolds generally need merging. 
* Selecting contigs (shift + left click)
* Change contig orientaton (select and hover your mouse over the top left or lower right corner of the contig)
* Moving contigs (select the contig and hover between two contigs on the diagonal to see an arrow)
* Scaffolds/Contigs and Chromosomes (green boxes vs blue boxes)
* Telomeres and centromeres (Cross signal between chromosomes and complete lack of signal due to dedupication)

**Save your work constantly!**
Select **Assembly -> Export Assembly**. Juicebox will generate a `.assembly.review` file containing instructions of the edits you have made.

*(To reload your progress later, re-load the Hi-C file, re-import the unedited `.assembly`, and then select **Assembly -> Load Modified Assembly** and target your `.review.assembly` file).*

### E. Finalization
Once satisfied, return to the HPC:
```bash
bash run-asm-pipeline-post-review.sh --sort-output -s seal -g 100 -r HiCGenome.0.review.assembly HiCGenome.fasta merged_nodups.txt
```

This generates your final `FINAL.fasta` containing 100bp structural gaps representing the scaffold breaks you confirmed.
**output**

HiCGenome.FINAL.fasta -- final fasta assembly with gaps added
HiCGenome.final.hic -- final .hic file that you can load into Juicebox for viewing the contact map
HiCGenome.FINAL.assembly -- final .assembly that you can load into Juicebox to view your scaffolding on the contact map.

---

### F. Gene Space Completeness Evaluation

To prove your assembly represents biological truth, we test for the presence of widespread, conserved orthologs (`BUSCO/compleasm` and OMArk). 

* Evaluating with `compleasm`
We compare the final sequence against a specific lineage database (e.g. `embryophyta_odb12`).

```bash
# Set module paths depending on cluster setup. 
# Below paths assume local /project installation logic for the workshop
software=/project/gif_vrsc_workshop/software/

time $software/compleasm_kit/compleasm.py run -t 20 \
  -l eukaryota -L 01_Data/busco_downloads/lineages/embryophyta_odb10/ \
  -a FINAL.fasta -o 11_Compleasm 
```

**Understanding the output line:** `S:90.59%, 231 | D:9.41%, 24 | F:0.00%, 0 | M:0.00%, 0`
- `S`: Single-copy complete (the ideal goal)
- `D`: Duplicated (indicates uncollapsed heterozygosity if higher than typical ploidy)
- `F`: Fragmented (misassembled or low depth)
- `M`: Missing

### Advanced Assessment with `OMArk`
While `BUSCO\compleasm` uses single-copy assumptions, `OMArk` leverages broader clade-specific databases (OMA) to evaluate the completeness of *any* gene model without penalizing biologically valid duplications typical in plant genomes. It identifies "alien" or fragmented genes via read mapping coverage correlation.

---

## Congratulations!
You've progressed from a pile of raw, uncharacterized reads into a solid, chromosome-scale pseudo-assembly complete with validation statistics! From here, the genome is ready for polishing, gap closing (e.g., TGS-GapCloser), repeat identification (e.g. RepeatMasker), and structural gene annotation (e.g. TSEBRA).


---



