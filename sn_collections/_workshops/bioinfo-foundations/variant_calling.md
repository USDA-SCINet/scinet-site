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
    time: 2-5 PM ET
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

This workshop will introduce participants to variant calling using two methods: Genome analysis toolkit (GATK) and Deep Variant. We will develop a complete workflow for calling variants from whole-genome data for multiple individuals.<!--excerpt-->

On day 1 we will have a hands-on workshop taking attendees through the complete GATK germline variant calling pipeline using *Arabidopsis thaliana* as the dataset. The heavy computational steps (alignment, MarkDuplicates, BQSR, per-sample GVCF generation) are **pre-computed by the instructor** and provided as ready-to-use files. Attendees run HaplotypeCaller on one sample themselves, then perform joint genotyping on all 6 pre-built GVCFs. Toward the end we will introduce Deepvariant which will be then covered in detail on Day2.


## Day 1: GATK germline variant calling pipeline using *Arabidopsis thaliana* 
3 Hours | Single-Sample Hands-On Guide  
*by Sivanandan Chudalayandi*  

### Tutorial Setup Instructions

Steps to prepare for the tutorial session:  

* Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).
 

* Open a command-line session by clicking on "Clusters" -> "Ceres Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres' login node.

* Create a workshop working directory by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  

  ```bash
  mkdir -p /90daydata/shared/$USER/variant_calling
  cd /90daydata/shared/$USER/variant_calling
  cp -r /project/scinet_workshop2/foundations_bioinf_2026/variant_calling/files/* .
  ```
  {:.copy-code}

* Launch VS Code:
  * Under the Interactive Apps menu, select VS Code
  * Specify the following input values on the page:
    * Account: scinet_workshop2
    * Queue: ceres
    * QoS: 400thread
    * Number of cores: 32
    * Memory required: 50 G
    * Number of hours: 6
    * Optional Slurm Parameters: `--reservation=foundations_workshop`
    * Working Directory:  `/90daydata/shared/$USER/variant_calling`
  * Click Launch. The screen will update to the *Interactive Sessions* page. When your VS Code session is ready, the top card will update from *Queued* to *Running* and a *Connect to VS Code* button will appear. Click *Connect to VS Code.*



### Overview

This guide walks through the complete GATK germline variant calling pipeline using
*Arabidopsis thaliana* (TAIR10) and a single sample (SRR1945435) from the
1001 Genomes Project. All heavy pre-computation has been done by the instructor.
You are encouraged to run the commands yourself during or after the workshop.

**Dataset:** *Arabidopsis thaliana* TAIR10, all 5 nuclear chromosomes  
**Sample:** SRR1945435 (Col-0 accession, ~21x coverage)  
**Environment:** GATK 4.x, bwa-mem2, samtools, bcftools  

---

#### Directory Structure

```
playground/
├── 10_Reference
├── 11_Raw
|
├── 12_Align
├── 13_Markdup
├── 14_BQSR
├── 15a_GVCF
│   ├── SRR1945435.chr4a.g.vcf.gz
│   ├── SRR1945435.chr4a.g.vcf.gz.tbi
│   ├── SRR1945436.chr4a.g.vcf.gz
│   ├── SRR1945436.chr4a.g.vcf.gz.tbi
│   ├── SRR1945437.chr4a.g.vcf.gz
│   ├── SRR1945437.chr4a.g.vcf.gz.tbi
│   ├── SRR1945438.chr4a.g.vcf.gz
│   ├── SRR1945438.chr4a.g.vcf.gz.tbi
│   ├── SRR1945439.chr4a.g.vcf.gz
│   ├── SRR1945439.chr4a.g.vcf.gz.tbi
│   ├── SRR1945440.chr4a.g.vcf.gz
│   └── SRR1945440.chr4a.g.vcf.gz.tbi
├── 15_GVCF
│   ├── SRR1945435.chr4.g.vcf.gz
│   └── SRR1945435.chr4.g.vcf.gz.tbi
├── 16_Joint
├── known_sites
│   ├── 1001genomes_snps_indels_chr4.vcf.gz
│   └── 1001genomes_snps_indels_chr4.vcf.gz.tbi

#### General Structure:
workshop/
├── 00_Reference/          # TAIR10 reference genome and indexes
├── 01_Raw/                # Raw FASTQ files
├── 02_Align/              # Sorted BAMs
├── 03_Markdup/            # MarkDuplicates BAMs and metrics
├── 04_BQSR/               # Recalibrated BAMs and tables
├── 05_GVCF/               # Per-sample GVCFs
├── 06_Joint/              # Joint genotyping outputs
├── known_sites/           # 1001 Genomes known variants VCF
├── tmp/                   # Temporary files
└── logs/                  # Log files
```

---

#### Environment Setup

```bash
# Load modules (HPC)
module load bwa_mem2
module load samtools
module load gatk
module load bcftools

# Or activate conda environment
conda activate gatk_workshop

# Set working directory
WORKDIR=/path/to/workshop
cd ${WORKDIR}

# Key variables used throughout — set these once
REF=00_Reference/TAIR10.fna
SAMPLE=SRR1945435
KNOWN=known_sites/1001genomes_snps_pass.vcf.gz
CHRS=(NC_003070.9 NC_003071.7 NC_003074.8 NC_003075.7 NC_003076.8)
```

---


### Reference Preparation, Alignment & BQSR

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Reference Genome Indexing

Three separate indexes are required by different tools. Each is built once
and reused for all samples.

**samtools faidx — random access index**

Required by GATK and samtools to jump to any genomic position without
reading the whole file.

```bash
samtools faidx 00_Reference/TAIR10.fna

# Output
# 00_Reference/TAIR10.fna.fai
```

**GATK CreateSequenceDictionary — contig catalogue**

Required by GATK and Picard. Records chromosome names and lengths.

```bash
gatk CreateSequenceDictionary \
  -R 10_Reference/TAIR10.Chr4.fna \
  -O 10_Reference/TAIR.Chr4.dict

# Output
# 00_Reference/TAIR10.dict
```

**bwa-mem2 index — alignment search structure**

Required by bwa-mem2 for alignment. Different from the bwa index —
index files must share the reference filename as prefix.

```bash
bwa-mem2 index 10_Reference/TAIR10.Chr4.fna

# Output — all must be present
# 10_Reference/TAIR10.Chr4.0123
# 10_Reference/TAIR10.Chr4.amb
# 10_Reference/TAIR10.Chr4.ann
# 10_Reference/TAIR10.Chr4.bwt.2bit.64
# 10_Reference/TAIR10.Chr4.pac
```

**Verify all index files**

```bash
ls -lh 00_Reference/TAIR10.Chr4.fna*
```


</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Known Sites VCF Preparation

BQSR requires a set of known variant sites to distinguish true variants
from sequencing errors. We use the 1001 Genomes Project SNP VCF.

**Arabidopsis caveat:** No curated truth set like dbSNP exists for
Arabidopsis. The 1001 Genomes VCF was itself called with GATK — there
is a circularity here. It is acceptable in practice but something that is worth noting.

**Check contig naming**

TAIR10 uses NCBI accession names (`NC_003075.7`).
The 1001 Genomes VCF uses integers (`1, 2, 3, 4, 5`). These must match.

```bash
# Reference contig names
grep ">" 00_Reference/TAIR10.fna | head -5

# VCF contig names
zcat known_sites/1001genomes_snp-short-indel_only_ACGTN.vcf.gz \
  | grep -v "^#" | cut -f1 | sort -u
```

**Create chromosome rename map**

```bash
cat > known_sites/chr_rename.txt << 'EOF'
1 NC_003070.9
2 NC_003071.7
3 NC_003074.8
4 NC_003075.7
5 NC_003076.8
EOF
```

**Filter, rename, compress and index**

```bash
bcftools view \
  -v snps \
  -f PASS \
  --threads 8 \
  known_sites/1001genomes_snp-short-indel_only_ACGTN.vcf.gz | \
bcftools annotate \
  --rename-chrs known_sites/chr_rename.txt \
  --threads 8 \
  -Oz -o known_sites/1001genomes_snps_pass.vcf.gz

tabix -p vcf known_sites/1001genomes_snps_pass.vcf.gz
```

**Always Verify**

```bash
tabix known_sites/1001genomes_snps_pass.vcf.gz NC_003075.7:1-100000 | head -5
```

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Alignment

Align raw reads to the reference with read groups. Read groups are
mandatory for GATK — without them HaplotypeCaller will refuse to run.


{% include table content="| Tag | Meaning | Required |
| ----- | --------- | --------- |
| ID | Read group identifier — must be unique | Yes |
| SM | Sample name — used by GATK to identify the individual | Yes |
| PL | Sequencing platform | Recommended |
| LB | Library — used by MarkDuplicates | Recommended |" %}

**bwa alignment**

```bash
bwa-mem2 mem -t8 \
-R '@RG\tID:SRR1945435\tSM:SRR1945435\tPL:ILLUMINA\tLB:lib1' \
10_Reference/TAIR10.Chr4 \
11_Raw/SRR1945435_1.fastq.gz 11_Raw/SRR1945435_2.fastq.gz \
| samtools sort -@8 -o 12_Align/SRR1945435.bam

#Index the sorted BAM
samtools index 12_Align/SRR1945435.bam

```

**Verify alignment**

```bash
# Overall alignment statistics
samtools flagstat 12_Align/SRR1945435.bam

# Check read groups are present
samtools view -H 12_Align/SRR1945435.bam | grep "^@RG"

# Check mean coverage
samtools depth -r NC_003075.7 12_Align/SRR1945435.bam | \
  awk '{sum+=$3; n++} END {printf "Mean depth chr4: %.1fx\n", sum/n}'
```

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Mark Duplicates

PCR duplicates inflate variant counts and must be flagged before calling.
Duplicates are marked, not removed — they remain in the BAM but are
excluded by HaplotypeCaller.

```bash
gatk MarkDuplicates \
-I 12_Align/SRR1945435.bam \
-O 13_Markdup/SRR194543.markdup.bam \
-M 13_Markdup/SRR194543.metrics.txt

# Index
samtools index 13_Markdup/${SAMPLE}.markdup.bam
```

**Inspect duplication metrics**

```bash
cat 13_Markdup/SRR194543.metrics.txt
```

Key metric: `PERCENT_DUPLICATION` — values above 30% suggest
over-amplification during library preparation.

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Base Quality Score Recalibration (BQSR)

Sequencers systematically mis-estimate base quality scores. BQSR corrects
this by modelling errors against known variant sites.

**Key concept:** BQSR does not change the reads — it corrects the
quality scores. Two steps: model the errors, then apply the correction.

**Phred quality score for reference**

{% include table content="| Phred Score | Error Rate | Accuracy | 1 error in... |
| ------------- | ----------- | ---------- | -------------- |
| Q10 | 10% | 90% | 10 bases |
| Q20 | 1% | 99% | 100 bases |
| Q23 | 0.50% | 99.50% | 200 bases |
| Q28.7 | 0.135% | 99.865% | 740 bases |
| Q30 | 0.10% | 99.90% | 1,000 bases |
| Q40 | 0.01% | 99.99% | 10,000 bases |" %}

**Step 1 — BaseRecalibrator (build the model)**

```bash
gatk BaseRecalibrator \
-I 13_Markdup/SRR194543.markdup.bam \
-R 10_Reference/TAIR10.Chr4.fna \
--known-site known_sites/1001genomes_snps_indels_chr4.vcf.gz \
-O 14_BQSR/SRR1945435.recal.table
```
Step 1 takes about 30 mins

**Step 2 — ApplyBQSR (apply the correction)**

```bash
gatk ApplyBQSR \
-I 13_Markdup/SRR194543.markdup.bam \
-R 10_Reference/TAIR10.Chr4.fna \
--bqsr-recal-file 14_BQSR/SRR1945435.recal.table \
--tmp-dir tmp/ \
-O 14_BQSR/SRR1945435.recal.bam
# index the recal bam file
samtools index 14_BQSR/SRR1945435.recal.bam
```
Step 1 takes about 30 mins

<u>A Note</u>: The code below runs BQSR (both step 1 and step2) in parallel across all 5 chromosomes — adapt it to your own samples by updating the paths at the top of the script.

<div class="usa-accordion usa-accordion--bordered padding-top-2">
  <div class="usa-accordion__heading">
    <button
      type="button"
      class="usa-accordion__button"
      aria-expanded="false"
      aria-controls="deseq2kallisto"
    >
      Script to run on each chromosome in parallel and gather into a single table
    </button>
  </div>
<div id="deseq2kallisto" class="usa-accordion__content usa-prose" markdown=1 hidden>

```bash
# Run one job per chromosome
for CHR in "${CHRS[@]}"; do
  gatk BaseRecalibrator \
    -I 03_Markdup/${SAMPLE}.markdup.bam \
    -R ${REF} \
    --known-sites ${KNOWN} \
    -L ${CHR} \
    --tmp-dir tmp/ \
    -O 04_BQSR/${SAMPLE}.recal.${CHR}.table \
    > logs/${SAMPLE}.${CHR}.bqsr.log 2>&1 &
done
wait

# Gather per-chromosome tables into one
gatk GatherBQSRReports \
  -I 04_BQSR/${SAMPLE}.recal.NC_003070.9.table \
  -I 04_BQSR/${SAMPLE}.recal.NC_003071.7.table \
  -I 04_BQSR/${SAMPLE}.recal.NC_003074.8.table \
  -I 04_BQSR/${SAMPLE}.recal.NC_003075.7.table \
  -I 04_BQSR/${SAMPLE}.recal.NC_003076.8.table \
  -O 04_BQSR/${SAMPLE}.recal.table
```
</div>
</div>

**Step 3 — AnalyzeCovariates (visualize before/after)**

For plotting we need R in the path

```bash
module load r/4.4.1
R --vanilla -e "install.packages('gsalib', repos='http://cran.r-project.org')
```
* First we need to run BaseRecalibrator on the recalibrated BAM (second pass)

```bash
gatk BaseRecalibrator \
-I 14_BQSR/SRR1945435.recal.bam \
-R 10_Reference/TAIR10.Chr4.fna \
--known-sites known_sites/1001genomes_snps_indels_chr4.vcf.gz \
-O 14_BQSR/SRR1945435.recal2.table
```

* Generate before/after plot 

```bash
gatk AnalyzeCovariates \
  -before 14_BQSR/SRR1945435.recal.table \
  -after  14_BQSR/SRR1945435.recal2.table \
  -plots  14_BQSR/SRR1945435.AnalyzeCovariates.pdf
```

Open `SRR1945435.AnalyzeCovariates.pdf` — the reported vs empirical quality plot should show points much closer to the diagonal after recalibration.
</li>
</ol>
---

### HaplotypeCaller & Per-Sample GVCF

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### HaplotypeCaller — Concepts

HaplotypeCaller's core differentiator is **local de novo assembly**:

1. **Active region detection** — identifies regions with elevated mismatch rate
2. **De Bruijn graph assembly** — assembles reads into candidate haplotypes
3. **Smith-Waterman alignment** — re-aligns reads to candidate haplotypes
4. **PairHMM likelihoods** — computes genotype likelihoods for each haplotype pair
5. **Genotype assignment** — assigns most likely genotype using Bayes' theorem

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### GVCF Mode

GVCF mode (`-ERC GVCF`) records evidence at **every site** — not just
variant sites. This is essential for joint genotyping.

{% include table content="| Format | Records | Use case |
| -------- | --------- | --------- |
| VCF | Variant sites only | Final output |
| GVCF | All sites including reference blocks | Joint genotyping input |" %}

A reference block (`<NON_REF>`) confirms a site is homozygous reference —
it is not missing data. This distinction is critical.

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Run HaplotypeCaller — Single Sample

**This is the command you run yourself.** Pre-built GVCFs are available as a fallback if needed.

**Quick test — run on a 2 MB region of chromosome 4 only (~10-20 minutes)**

```bash
gatk HaplotypeCaller \
  -R 10_Reference/TAIR10.Chr4.fna \
  -I 14_BQSR/SRR1945435.recal.bam \
  -L NC_003075.7:1000000-3000000
  -ERC GVCF \
  --native-pair-hmm-threads 4 \
  --tmp-dir tmp/ \
  -O 15_GVCF/SRR1945435.chr4.g.vcf.gz
```

**Inspect the GVCF**

```bash
# Look at the header
zcat 05_GVCF/SRR1945435.chr4.g.vcf.gz | grep "^#" | tail -10

# Look at variant records
zcat 05_GVCF/SRR1945435.chr4.g.vcf.gz | grep -v "^#" | \
  | grep -v "END="  | head 

# Look at a reference block
zcat 05_GVCF/$SRR1945435.chr4.g.vcf.gz | grep -v "^#" | \
  | grep "END=" | head 

# Count variant records
zcat 05_GVCF/SRR1945435.chr4.g.vcf.gz | grep -v "^#" | \
  | grep -v "END="  | wc -l
```

**Understand the GVCF fields**
```
CHROM  POS  ID  REF  ALT          QUAL  FILTER  INFO      FORMAT          SAMPLE
Chr4   100  .   A    T,<NON_REF>  .     .       .         GT:AD:DP:GQ:PL  0/1:15,12,0:27:99:350,0,480,395,516,911
```

{% include table content="| Field | Meaning |
| ------- | --------- |
| GT | Genotype — 0/0 ref, 0/1 het, 1/1 hom-alt |
| AD | Allele depth — reads supporting each allele |
| DP | Total depth at this site |
| GQ | Genotype quality — confidence in the GT call |
| PL | Phred-scaled likelihoods for each possible genotype |" %}

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Run HaplotypeCaller — All Chromosomes

**This is for all chromosomes; don't run it during workshop**
Run one job per chromosome in parallel, then merge into a single GVCF.

```bash
# Run all chromosomes in parallel
for CHR in "${CHRS[@]}"; do
  gatk HaplotypeCaller \
    -R ${REF} \
    -I 04_BQSR/${SAMPLE}.recal.bam \
    -ERC GVCF \
    -L ${CHR} \
    --native-pair-hmm-threads 2 \
    --tmp-dir tmp/ \
    -O 05_GVCF/${SAMPLE}.${CHR}.g.vcf.gz \
    > logs/${SAMPLE}.${CHR}.hc.log 2>&1 &
done
wait

# Check variant counts per chromosome
for CHR in "${CHRS[@]}"; do
  N=$(zcat 05_GVCF/${SAMPLE}.${CHR}.g.vcf.gz | \
      grep -v "^#" | grep -v "<NON_REF>" | wc -l)
  echo "${CHR}: ${N} variant records"
done
```
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Merge per-chromosome GVCFs into one

```bash
gatk MergeVcfs \
  -I 05_GVCF/${SAMPLE}.NC_003070.9.g.vcf.gz \
  -I 05_GVCF/${SAMPLE}.NC_003071.7.g.vcf.gz \
  -I 05_GVCF/${SAMPLE}.NC_003074.8.g.vcf.gz \
  -I 05_GVCF/${SAMPLE}.NC_003075.7.g.vcf.gz \
  -I 05_GVCF/${SAMPLE}.NC_003076.8.g.vcf.gz \
  -O 05_GVCF/${SAMPLE}.g.vcf.gz \
  > logs/${SAMPLE}.merge.log 2>&1

# Verify
zcat 05_GVCF/${SAMPLE}.g.vcf.gz | grep -v "^#" | \
  grep -v "END" | wc -l
```

</li>
</ol>

---

### Joint Genotyping & Variant Filtering

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Joint Genotyping — Concepts

**We are better off with separate GVCFs:**

1. Scalability  
Running HaplotypeCaller on 1000 BAMs simultaneously is impractical — memory, I/O, and runtime all scale badly. Separate GVCFs let you process one sample at a time on whatever hardware you have.
2. The N+1 benefit  
With separate GVCFs you can add sample 1001 without touching the other 1000. With a joint GVCF you'd need to rerun HaplotypeCaller on all samples together.
3. Error isolation  
If one sample fails you rerun only that sample. With a joint GVCF approach a single bad sample requires rerunning everything.
4. Parallelisation  
Separate per-sample GVCFs are trivially parallelisable — one job per sample. A single joint HaplotypeCaller run cannot be split across nodes.


We will do this in a two-step process

```
6 × .g.vcf.gz  →  GenomicsDBImport  →  GenotypeGVCFs  →  cohort.vcf.gz
```

</li> 

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### GenomicsDBImport

Consolidates all 6 GVCFs into an efficient database. This step is
**pre-computed** — it is slow and provided ready for you.

```bash
# Pre-built — shown for reference
gatk GenomicsDBImport \
  -V 05_GVCF/SRR1945435.g.vcf.gz \
  -V 05_GVCF/SRR1945436.g.vcf.gz \
  -V 05_GVCF/SRR1945437.g.vcf.gz \
  -V 05_GVCF/SRR1945438.g.vcf.gz \
  -V 05_GVCF/SRR1945439.g.vcf.gz \
  -V 05_GVCF/SRR1945440.g.vcf.gz \
  --genomicsdb-workspace-path 06_Joint/arabidopsis_db \
  -L NC_003070.9 \
  -L NC_003071.7 \
  -L NC_003074.8 \
  -L NC_003075.7 \
  -L NC_003076.8 \
  --tmp-dir tmp/ \
  > logs/genomicsdb.log 2>&1
```

</li> 

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### GenotypeGVCFs

**This is the command you run yourself.**

```bash
gatk GenomicsDBImport \
-V 15a_GVCF/SRR1945435.chr4a.g.vcf.gz   \
-V 15a_GVCF/SRR1945436.chr4a.g.vcf.gz   \
-V 15a_GVCF/SRR1945437.chr4a.g.vcf.gz   \
-V 15a_GVCF/SRR1945438.chr4a.g.vcf.gz   \
-V 15a_GVCF/SRR1945439.chr4a.g.vcf.gz   \
-V 15a_GVCF/SRR1945440.chr4a.g.vcf.gz   \
--genomicsdb-workspace-path 16_Joint/arabidopsis_db   \
-L NC_003071.7   \
--tmp-dir tmp/
```

```bash
gatk GenotypeGVCFs \
-R 10_Reference/TAIR10.Chr4.fna   \
-V gendb://16_Joint/arabidopsis_db   \
-O 16_Joint/cohort_raw.vcf.gz   \
--tmp-dir tmp/

```

**Inspect the raw cohort VCF**

```bash
# Summary statistics
bcftools stats cohort_raw.vcf.gz | grep "^SN"

# Total variant count
zcat cohort_raw.vcf.gz | grep -v "^#" | wc -l

# SNPs vs indels
bcftools view -v snps  cohort_raw.vcf.gz | grep -v "^#" | wc -l
bcftools view -v indels cohort_raw.vcf.gz | grep -v "^#" | wc -l

# Look at the multi-sample genotype columns
zcat cohort_raw.vcf.gz | grep -v "^#" | head -5 | \
  cut -f1-9,10-15
```

**Understanding the multi-sample VCF**

```
CHROM  POS  REF  ALT  FORMAT    SRR1945435  SRR1945436  SRR1945437 ...
Chr4   500  A    T    GT:AD:GQ  0/1:10,8:99  1/1:0,20:99  0/0:15,0:99
```

Each sample has its own genotype column — this is what joint genotyping
produces. A `0/0` call is a *confirmed* reference genotype, not missing data.

</li> 

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Variant Filtering

Raw calls need filtering to remove false positives caused by strand bias,
low depth, and mapping artifacts. With 6 samples we use **hard filtering**
— VQSR requires ≥30 samples.

**Key annotation thresholds for Arabidopsis**

{% include table content="| Annotation | Meaning | SNP filter | Indel filter |
| ----------- | --------- | ----------- | ------------- |
| QD | Quality by depth — normalises QUAL by depth | < 2.0 | < 2.0 |
| FS | Fisher strand bias — phred-scaled p-value | > 60.0 | > 200.0 |
| MQ | Mapping quality of reads supporting variant | < 40.0 | — |
| SOR | Strand odds ratio — alternative strand bias metric | > 3.0 | > 10.0 |
| MQRankSum | Mapping quality difference ref vs alt reads | < -12.5 | — |
| ReadPosRankSum | Position of alt allele in reads | < -8.0 | < -20.0 |" %}

**Filter SNPs**

```bash
gatk VariantFiltration \
  -R ${REF} \
  -V 06_Joint/cohort_raw.vcf.gz \
  --select-type-to-include SNP \
  --filter-expression "QD < 2.0"    --filter-name "QD2" \
  --filter-expression "FS > 60.0"   --filter-name "FS60" \
  --filter-expression "MQ < 40.0"   --filter-name "MQ40" \
  --filter-expression "SOR > 3.0"   --filter-name "SOR3" \
  --filter-expression "MQRankSum < -12.5" --filter-name "MQRankSum-12.5" \
  --filter-expression "ReadPosRankSum < -8.0" --filter-name "ReadPosRankSum-8" \
  -O 06_Joint/cohort_snps_filtered.vcf.gz \
  > logs/filter_snps.log 2>&1
```

**Filter indels**

```bash
gatk VariantFiltration \
  -R ${REF} \
  -V 06_Joint/cohort_raw.vcf.gz \
  --select-type-to-include INDEL \
  --filter-expression "QD < 2.0"    --filter-name "QD2" \
  --filter-expression "FS > 200.0"  --filter-name "FS200" \
  --filter-expression "SOR > 10.0"  --filter-name "SOR10" \
  --filter-expression "ReadPosRankSum < -20.0" --filter-name "ReadPosRankSum-20" \
  -O 06_Joint/cohort_indels_filtered.vcf.gz \
  > logs/filter_indels.log 2>&1
```

**Merge filtered SNPs and indels**

```bash
gatk MergeVcfs \
  -I 06_Joint/cohort_snps_filtered.vcf.gz \
  -I 06_Joint/cohort_indels_filtered.vcf.gz \
  -O 06_Joint/cohort_filtered.vcf.gz \
  > logs/merge_filtered.log 2>&1
```

**Compare raw vs filtered**

```bash
# Raw counts
echo "=== Raw ==="
bcftools stats 06_Joint/cohort_raw.vcf.gz | grep "^SN"

# PASS counts only
echo "=== Filtered (PASS only) ==="
bcftools view -f PASS 06_Joint/cohort_filtered.vcf.gz | \
  bcftools stats | grep "^SN"

# Per-sample PASS variant counts
echo "=== Per-sample variant counts ==="
bcftools query \
  -f '[%SAMPLE\t%GT\n]' \
  -s SRR1945435,SRR1945436,SRR1945437,SRR1945438,SRR1945439,SRR1945440 \
  -i 'FILTER="PASS"' \
  06_Joint/cohort_filtered.vcf.gz | \
  grep -v "0/0\|\./\." | \
  awk '{count[$1]++} END {for(s in count) print s, count[s]}' | \
  sort
```

</li> 

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Inspect Results in IGV

```bash
# Extract PASS variants for IGV
bcftools view -f PASS \
  06_Joint/cohort_filtered.vcf.gz \
  -Oz -o 06_Joint/cohort_pass.vcf.gz

tabix -p vcf 06_Joint/cohort_pass.vcf.gz
```

Load in IGV:
1. Genome → Load from file → `00_Reference/TAIR10.fna`
2. File → Load from file → `04_BQSR/SRR1945435.recal.bam`
3. File → Load from file → `06_Joint/cohort_pass.vcf.gz`

**What to look for:**
- A good SNP call: reads clearly split between two alleles, balanced strand representation, high mapping quality
- A filtered call: strand bias (all alt reads on one strand), soft-clipped reads at the variant site, low depth

</li> 

<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
#### Transition/Transversion Ratio (Ti/Tv)

A useful quality metric for SNP calls. For Arabidopsis whole-genome data
the expected Ti/Tv ratio is ~2.0–2.5. Values well below 2.0 suggest
excess false positives.

```bash
bcftools stats -f PASS \
  06_Joint/cohort_filtered.vcf.gz | \
  grep "Ts/Tv"
```

</li>
</ol>

---

#### Summary — What You Have Built

```
Raw FASTQs
    ↓  bwa-mem2 (with read groups)
Sorted BAM
    ↓  gatk MarkDuplicates
Markdup BAM + metrics
    ↓  gatk BaseRecalibrator + ApplyBQSR
Recalibrated BAM + BQSR table
    ↓  gatk HaplotypeCaller -ERC GVCF
Per-sample GVCF (all sites)
    ↓  gatk GenomicsDBImport
Genomics database (6 samples)
    ↓  gatk GenotypeGVCFs
Raw cohort VCF
    ↓  gatk VariantFiltration
Final filtered VCF ✓
```

---

#### Quick Reference — Key Commands

```bash
# Check alignment
samtools flagstat sample.bam

# Check coverage
samtools depth -r NC_003075.7 sample.bam | awk '{s+=$3;n++} END{print s/n}'

# Count GVCF variants
zcat sample.g.vcf.gz | grep -v "^#" | grep -v "<NON_REF>" | wc -l

# Count VCF PASS variants
bcftools view -f PASS cohort_filtered.vcf.gz | grep -v "^#" | wc -l

# Check Ti/Tv ratio
bcftools stats -f PASS cohort_filtered.vcf.gz | grep "Ts/Tv"

# Inspect a region in terminal
bcftools view cohort_filtered.vcf.gz NC_003075.7:1-100000 | grep -v "^#" | head
```

---

### Further Reading

- [GATK Best Practices](https://gatk.broadinstitute.org/hc/en-us/sections/360007226651)
- [1001 Genomes Project](https://1001genomes.org)
- [TAIR10 Reference](https://www.arabidopsis.org)
- Next workshop: DeepVariant — A different variant calling approach




## Day 2: Deep Variant  

### Pre-workshop instructions

To help minimize technical issues and delays at the start of the workshop, please try the following tests prior to the workshop.  
* **Logging on to [Atlas Open OnDemand (OOD)](https://atlas-ood.hpc.msstate.edu/):** Please confirm you can successfully log in to Atlas OOD with your SCINet account ([see instructions here](/guides/access/web-based-login)). If you are successful, you will be able to see the Atlas OOD home page.
* **Atlas Shell Access:** When on Atlas OOD, click on the top navigation bar: "Clusters" > "Atlas Shell Access". A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@atlas-login-1 ~]$".

### Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

1. **Login to Atlas Open OnDemand** at [https://atlas-ood.hpc.msstate.edu/](https://atlas-ood.hpc.msstate.edu/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](/guides/access/web-based-login). 

1. **Open a command-line session** by clicking on "Clusters" -> "Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Atlas' login node. 

1. **Request resources on a compute node** by running the following command:  
  
    {: .copy-code }
    ```
    srun --reservation=foundations_workshop -A scinet_workshop1 -t 05:00:00 -n 1 --mem 8G --pty bash
    ``` 
    {% include reservation-alert reservation="foundations_workshop" project="scinet_workshop1" %}

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


<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Trimming 

{: .copy-code }
```
# Trim adapter artifacts from your reads 
trim_galore --paired --basename samplename --output_dir Trimmed --cores 24 PE_directory/samplename_R1.fastq.gz PE_directory/samplename_R2.fastq.gz
```

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Mapping 

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

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Call variants 

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

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Joint Genotyping

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

conda activate /project/scinet_workshop1/deepvariant/Software/condaenvs/glnexus

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
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Variant Filtration

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

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
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

</li>
</ol>
