---
title: Introduction to Modern Bioinformatics
type: workshop
display: basic
provider: [ISU, SCINet Office]
# instructor: "Lavida Rogers (SCINet Office, USDA-ARS), Siva Chudalayandi, Rick Masonbrink, and Viswanathan Satheesh (Genome Informatics Facility, ISU)"
hideprovider: true
description: This workshop provides an overview of bioinformatics covering applications, sequencing technologies, and basic workflows.
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/

layout_type: workshop
sessions:
  - session: 
    time: 1-5 PM ET
    date: 2026-04-13
    end_date: 2026-04-16
    multiday: April 13, 15-16
    materials:
      - text: Day 1 recording
        url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/IQA7w7XWbn-ySIAWB5eEjOYkAc_xuNjnWpF5M7H4_OAsm6g?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=FKCxex
      - text: Day 2 recording
        url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/IQAV5YzyCf7wRoirLoq7imzCAYEHS9vcqXLNXJJAVySCglY?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=oRJNZe
      - text: Day 3 recording
        url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/IQBMO2PVn5NRTacCUCYKWa0kAV6Rlh4zd9efSQMRvFGz-PQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=eb4pk8

registration:
    url: https://forms.office.com/g/T2teMegYSW

tags: bioinformatics

prerequisites:
  - text: Familiarity with basic command-line concepts. 

# materials:
#  - text: Workshop recording
#    url: https://usdagcc.sharepoint.com/:v:/s/REE-ARS-SCINetOffice/ESK-aPDg0b5Ptb_4i3qL3qwB45qRO-G3XB-7vE1lFYio8g

subnav:
  - title: Pre-Workshop Instructions
  - title:  Tutorial Setup      
    url:  '#tutorial-setup-instructions' 
  - title:  Tutorial Introduction
  - title:  Intro to HPC      
    url:  '#part-1-a-practical-introduction-to-high-performance-computing-hpc-for-bioinformatics'
  - title:  File Formats    
    url:  '#part-2-exploring-bioinformatics-file-formats'
  - title:  Public Repositories   
    url:  '#part-3-exploring-public-repositories-databases' 
  - title:  BLAST   
    url:  '#part-4-blast'
  - title:  Slurm   
    url:  '#part-5-slurm-command-demo-essential-hpc-job-management'
  - title:  Modules and Environments      
    url:  '#part-6-modules-and-environments'
  - title:  Parallelization   
    url:  '#part-7-parallelization-of-simple-tasks'
  - title:  Project Management    
    url:  '#part-8-project-management-in-bioinformatics-and-genomics'
  - title:  Sources


---

This workshop is designed for researchers who are new to bioinformatics or who may want a refresher of the basics. Participants will be introduced to biological sequence data, file formats, command-line tools for navigating these file formats, sequence databases, and an overview of HPC environments used in modern genomics research. <!--excerpt-->

No prior programming experience is required. This workshop is intended as a foundation for more advanced workshops in this series. 


## Pre-Workshop Instructions

To help minimize technical issues and delays at the start of the workshop, please try the following prior to the workshop. 

* **Logging on to [Ceres Open OnDemand (OOD)](http://ceres-ood.scinet.usda.gov/):** Please confirm you can successfully log in to Ceres OOD with your SCINet account [(see instructions here)]({{site.baseurl}}/guides/access/web-based-login). If you are successful, you will be able to see the Ceres OOD home page.
* **Ceres Shell Access:** When on Ceres OOD, click on the top navigation bar: “Clusters” > “Ceres Shell Access”. A new tab will appear that looks like a shell terminal (e.g., like PowerShell). Please confirm you do not receive any error messages or requests to re-authenticate and that the final line looks like "[firstname.lastname@ceres ~]$” 

## Tutorial Setup Instructions 

Steps to prepare for the tutorial session: 

* Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login). 
* Open a command-line session by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. This will open a new tab with a command-line session on Ceres' login node. 
* Request resources on a compute node by running the following command.  
  
  ```bash
  srun --reservation=foundations_workshop -A scinet_workshop2 -t 05:00:00 -N 1 -c 4 --mem 8G --pty bash 
  ```
  {:.copy-code}

  {% include reservation-alert reservation="foundations_workshop" project="scinet_workshop2" %}

* Create a workshop working directory by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  
  
  ```bash
  mkdir -p /90daydata/shared/$USER/intro_bioinformatics 
  cd /90daydata/shared/$USER/intro_bioinformatics 
  cp -r /project/scinet_workshop2/foundations_bioinf_2026/intro_bioinf/ . 
  ```
  {:.copy-code}

* Load the environment:

  ```bash
  module load miniconda 
  source activate /project/scinet_workshop2/Bioinformatics_series/conda/ 
  ```
  {:.copy-code}

    
-----  

## Tutorial Introduction

In this tutorial, we will use the command line and bioinformatics tools to explore, manipulate, and analyze the different types of biological data you will encounter in bioinformatics. We will also look at how to access data from public databases, conduct sequence searches using BLAST, explore HPC environments, learn how to schedule jobs using Slurm and discuss best practices for project organization.


**Throughout the tutorial we will use the following command-line tools:**
- Basic text processing: `grep`, `cut`, `awk`,`bioawk`, `wc`, `cut`, `sort`,`uniq`
- File exploration: `head`, `tail`, `less`
- Quality control: `fastqc`
- Filtering variants: `bcftools`
- Downloading public data: `wget`
- Raw sequences from NCBI SRA: `SRA Toolkit`
- Sequence analysis: `blastn`
- HPC and workflow management: `module`, `srun`, `sbatch`, `squeue`

    
-----


## Part 1: A Practical Introduction to High-Performance Computing (HPC) for Bioinformatics

### What Is an HPC System?

* **Login node**:  
  On Ceres, when you first log in you are in the login node and in your home directory or folder. You can prepare your work while here. (Note that if you followed the tutorial setup instructions above, you will no longer be on a login node at this point - you will be on a compute node.)

  ```
  pwd
  ```
  {:.copy-code}


  You can navigate to your folder, list your files and check file sizes
* **Compute nodes**: Where jobs are executed.
  * Request an interactive (shell) session on a compute node by using `srun`: 

    ```
    srun --reservation= -A  -t  -N  -c  --mem  --pty bash
    ```
    
    Options:
    * --reservation: name of the reservation if available
    * -A: account
    * -t: time/duration
    * -N: number of nodes
    * -c: number of CPUs per node
    * --mem: memory
    * --pty bash: pseudoterminal (opening an interactive node) 

 
* **Storage system**:  
  Shared file system accessible by all nodes.
* **Project space**:  
  To check the size of your project space, we will use the commmand `du` - which will check the disk usage: 
  
  ```
  du -hs
  ```
  {:.copy-code}

* **90daydata**:  
  This is where you made your folder and where you will work from today.

  ```bash
  pwd
  cd /90daydata/shared/$USER/intro_bioinformatics/
  ```
  {:.copy-code}

### Getting to know the command line:

What is the command line?
* Text-based interface to interact with the operating system (Linux, in the case of all supercomputers).
* The "interpreter" is the shell. The most common is `bash`.
* No clicking; only typing.
* Excellent for scripting and automation.
* More control to you.

You can ask the shell to print a character or string of text:

{:.copy-code}
```
echo "How are you?"
```

Note: The quotes above aren't strictly needed but it is safer with quotes.

Date time calendar:

{:.copy-code}
```bash
date 
```

{:.copy-code}
```bash
cal
```

On the HPC, you are one among many users. You can ask the interpreter:

{:.copy-code}
```
whoami
```
Note: $USER is a special variable that contains your username (typically first name.last_name on SCINet).

{:.copy-code}
```
who
```
Note: Shows all logged-in users.

**Demo**: 

* Navigate to a directory, view files.
  Some basic navigation

  * Print the working directory:

    ```
    pwd
    ```
    {:.copy-code}

  * We can also change directories:
    * One directory "above":

      ```
      cd ..
      ```
      {:.copy-code}

    * You can move to a directory by using a full path: 

      ```
      cd /90daydata/shared/$USER/intro_bioinformatics/ # FULL path
      ```
      {:.copy-code}

    * To navigate back to the home directory: 

      ```
      cd ~
      cd /home/$USER
      ```
      {:.copy-code}


* Create a test file and write something to it  
  
  ```
  echo "hello, this is $USER" >> test.txt
  ```
  {:.copy-code}

* copy a file

  ```
  cp test.txt test1.txt
  ```
  {:.copy-code}

* Make a new directory and copy files to it
  
  ```
  mkdir folder1
  cp test* folder1
  ```
  {:.copy-code}

* Copy one directory to another directory  
  ***Note:*** *the flag -r stands for recursive, the command will fail without "-r"*
  
  ```bash
  cp -r folder1 folder2
  ```
  {:.copy-code}

* We can also move a file from one location to another or rename the file
  The `mv` command is used to rename and move files.

  ```
  mv test1.txt test1a.txt  # Rename test1.txt to test1a.txt
  mv test1a.txt folder2  # Move file test1a to folder2
  ```
  {:.copy-code}

* **Danger Zone:** We can delete/remove a file or folder using `rm`.
  There is no recycle bin or trashcan from where you can restore the file!
  
  ```
  rm test1.txt
  ```
  {:.copy-code}

  ```
  rm -r folder2 # use the recursive (-r) flag
  ```
  {:.copy-code}

  ```
  rmdir folder2 # use rmdir
  ```
  {:.copy-code}

* Listing the files 
  
  ```
  ls  # List files and directories in the current directory 
  ```
  {:.copy-code}

  ```
  ls -l # Long format listing with more details 
  ```
  {:.copy-code}

  ```
  ls -a # Show hidden files too 
  ```
  {:.copy-code}

  ```
  ls -lh # Human-readable file sizes 
  ```
  {:.copy-code}

  ```
  ls -t # List files sorted by time; most recent first
  ```
  {:.copy-code}

  ```
  ls -tr # Sorted by time; most recent last
  ```
  {:.copy-code}

* View file contents
  
  ```
  cat Arabidopsis.gtf     # Display entire file 
  ```
  {:.copy-code}

  ```
  less Arabidopsis.gtf    # View file page by page 
  ```
  {:.copy-code}

  ```
  head -5 Arabidopsis.gtf  # View first 5 lines 
  ```
  {:.copy-code}

  ```
  tail -5 Arabidopsis.gtf  # View last 5 lines 
  ```
  {:.copy-code}

-----


## Part 2: Exploring Bioinformatics File Formats

{% include table caption="Common file formats in bioinformatics" content="|Format | Description | Use case|File extensions|
|---|---|---|---|
|FASTA | text file with nucleotide or protein sequences | stores raw sequence data| `.fa, .fasta, .fna`|
| FASTQ | text file with sequences and quality scores | next-generation sequencing reads| `.fq, .fastq`|
|SAM/BAM| sequence alignment map (SAM) and binary alignment map (BAM)| stores aligned reads | `.sam, .bam` |
|VCF| variant call format | stores genomic variants (e.g. SNPs)| `.vcf`|
|GFF/GTF| 9 column text format with genomic features| stores information about gene annotation| `.gff, .gtf`|" %}

### Exploring FASTA Files
FASTA files contain a single-line description and ID followed by one or more lines of sequence data. 

*Line 1: starts with “>” followed by ID*  
*Line 2: Sequence data*

**Let's take a look at an actual file:**
1. Are you in the right working directory? 

   **Quick refresher:**
     * where am I?: `pwd`
     * what is here?: `ls`
     * how do I move to a new location?: `cd`
       
       ```bash
       cd /90daydata/shared/$USER/intro_bioinformatics
       ```
       {:.copy-code}


1. We can look at the beginning of the file by using `head`, which displays the first few lines of files. 
   
   ```bash
   head files/GCF_000001735.4_TAIR10.1_genomic.fna 
   ```  
   {:.copy-code}

1. We can also view the first 4 lines using `-n`: 

   ```bash
   head -n 4 files/GCF_000001735.4_TAIR10.1_genomic.fna
   ```
   {:.copy-code}  

   The `-n` option lets you control how many lines to display. 

1. We can also look at the last few lines of the file by using `tail`: 
   
   ```bash
   tail files/GCF_000001735.4_TAIR10.1_genomic.fna
   ```
   {:.copy-code}  

1. For a scrollable view of the file we can use less:  

   ```bash
   less files/ GCF_000001735.4_TAIR10.1_genomic.fna
   ```
   {:.copy-code}

{% include alert no_icon=true type="success" title="You try:" text="How would you look at the last 20 lines of the file?

How would you view only the last 2 lines?" %}


<ol class="usa-process-list">
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Counting the number of sequences with `grep`:  

`grep` is a search tool that is commonly used to find lines that match a pattern.  

In a FASTA file, each sequence begins with a header line that starts with `>`. 

So, first let us find those matching lines: 

```
grep "^>" files/GCF_000001735.4_TAIR10.1_genomic.fna
```
{:.copy-code}

This may return many lines depending on the size of the file. 

One way to limit the output is to use a pipe: `|`. A `|` sends the output from one command into another. 

```
grep "^>" files/GCF_000001735.4_TAIR10.1_genomic.fna | head -n 2
```
{:.copy-code}

Note: The first command finds all the lines that start with `>` and `head`` then takes that output and shows only the first few lines. 


{% include alert no_icon=true type="success" title="You try:" text="Modify the command to show only the first 5 matches." %}

Now instead of printing the matches - let us count them to figure out the number of sequences in the file:

{:.copy-code}
```bash
grep -c "^>" files/GCF_000001735.4_TAIR10.1_genomic.fna
```
- `-c`: count; prints number of matching lines
- `"^>"`: regular expression pattern that matches any line that starts with `>`

{% include alert no_icon=true type="success" title="You try:" text="Pick another fasta file in the directory and count the number of sequences." %}

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Determine sequence lengths with `bioawk`:  

<div class="bg-primary-lighter padding-3 margin-3 radius-md" markdown="1"> 

{:.margin-0.font-heading-md}
##### Quick Guide on `bioawk`
    
-----
`bioawk` is an extension of `awk`, which is a tool used for parsing and processing text files. `bioawk` has specialized features to handle biological file formats.

{% include table fixed=true content="| <code>awk</code> | <code>bioawk</code> |
| --- | --- |
| general text processing | specialized for biological files |
| does not understand the format of biological files|  aware of biological file formats |
| manually split fields that are identified only by number (e.g., `$1`, `$2`) | Automatically generates named fields from file contents (e.g., `$seq`, `$qual`) |
| requires extra code/logic to parse biological data | has built-in functions for parsing sequences, reads and variants |" %}

{% include table content="| Command | Description | Fields |
| --- | --- | --- |
| `bioawk -c fastx` | parses FASTA and FASTQ files | `$name`, `$seq`, `$qual` |
| `bioawk -c vcf` | parses genetic variants (VCF) | `$chrom`, `$pos`,`$ref`,`$qual`, etc. |" %}

**Basic format of a `bioawk` command:**
```
bioawk -c <file format> 'action' input_file
```
</div>

**Step 1: Get sequence names and lengths**

{:.copy-code}
```bash
bioawk -c fastx '{print $name, length($seq)}' files/GCF_000001735.4_TAIR10.1_genomic.fna | head
```

***Note:*** *The pipe `|` in the line of code above is taking the output of the command on the left and using it as the input for the command on the right.*

***Note:*** *The `{}` is telling bioawk to perform the action provided on each line/record*

{% include alert no_icon=true type="success" title="You try:" text="Print only sequence names." %}

{% include alert no_icon=true type="success" title="You try:" text="How would you modify the command above to print sequences with lengths longer than 400,000 bp?" %}

{% include alert no_icon=true type="info" title="Discussion Questions:" text="<ul><li>Why is it important to look at sequence lengths?</li>
<li>What could the sequence header information be used for in analysis downstream?</li></ul>" %}

</li>
</ol>


### Exploring FastQ files
FastQ files are similar to fasta files, but also contain the quality scores of the sequence data. 

***Line 1: starts with “@” followed by ID  
Line 2: Sequence data  
Line 3: Starts with “+”    
Line 4: Quality score for each base in the sequence***

Quality scores indicate the confidence of the base call by the sequencer. 

- Quality scores are encoded as American Standard Code for Information Interchange (ASCII) characters. 
- Different types of encodings are available and vary across sequencing technologies 

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Phred quality score \(Q\) calculation: 

$Q= -10 \log_{10}(P)$

Where:   
- \(Q\) = Phred quality score
- \(P\) = probability that base call is incorrect

{% include table fixed=true content="| ASCII Char | Phred Score | Error Probability |
| --- | --- | --- |
| ! | 0 | 1.00 |
| I | 40 | 0.0001 |
| @ | 31 | 0.00079 |" %}

{% include table fixed=true content="
| Phred Score | Error Probability | Interpretation |
| --- | --- | --- |
| 10 | 1 in 10 | 90% accurate |
| 20 | 1 in 100 | 99% accurate |
| 30 | 1 in 1000 | 99.9% accurate |
| 40 | 1 in 10000 | 99.99% accurate |" %}

**Let's take a look at an actual file:**

{:.copy-code}
```bash
head files/SRR4420293_1.fastq
```

{:.copy-code}
```bash
head -n 4 files/SRR4420293_1.fastq
```

We can also use `bioawk` on FASTQ files:  

Reminder: Format of bioawk commands:  
```
bioawk -c <file format> 'action' input_file
```  

{:.copy-code}
```bash
bioawk -c fastx '{print $name, length($seq), $qual}' files/SRR4420293_1.fastq | head 
```

***Note:*** *The pipe `|` in the line of code above is taking the output of the command on the left and using it as the input for the command on the right.*

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Counting reads with `bioawk`

Bioawk allows us to count reads directly instead of counting lines. 

{:.copy-code}
```bash
bioawk -c fastx 'END {print NR}' files/SRR4420293_1.fastq 
```
  - `NR` - a built in variable in `bioawk` that stands for the number of records/reads
  - `END`: end of the file

{% include alert no_icon=true type="success" title="You try:" text="Count the number of reads in SRR4420294_1.fastq" %}

**What's the average read length?** 

{:.copy-code}
```bash
bioawk -c fastx '{sum += length($seq)} END {print sum/NR} files/SRR4420293_1.fastq
```
  - `sum += length($seq)` keeps adding each read's length to a running total 
	  


</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Other ways to count the number of reads: 

* **Count lines using wc:**

  1. Count the total number of lines: 
     
     ```bash
     wc -l files/SRR4420293_1.fastq
     ```
     {:.copy-code} 

     ***But this gives line counts. Is that what we want? What should we do here to get the number of reads?***

  2. Let's get the number of lines without the file name: 
    
     ```bash
     wc -l < files/SRR4420293_1.fastq
     ```
     {:.copy-code}

     “<” here is feeding the contents of the file into wc without passing the filename as an argument. This is called input redirection.  

  3. Calculate the number of reads.  
     In order for us to do integer math directly in bash we need: `$((….))` and for us to see the result of the calculation in the shell we will use echo. 
    
     ```bash
     echo $(( $(wc -l < files/SRR4420293_1.fastq)/4)) 
     ```
     {:.copy-code}

     * We also need to put the wc function in `$()`, which will cause bash to execute the command inside the parentheses and then use the output when evaluating the rest of the command: 
    
       ```bash
       echo $(( $(wc -l < files/SRR4420293_1.fastq)/4)) 
       ```
       {:.copy-code}

  Let's again break down the pieces of this solution: 
    - `$(wc -l < files/SRR4420293_1.fastq)`: to get line count
    -  `$((....))`: Do integer math directly in Bash:
    - `echo`: prints the result    

</li>
</ol>

{% include alert no_icon=true type="success" title="You try:" text="Count reads in the FASTQ file using <code>grep</code>" %}

**Reflection:**
1. Which method is easier?
1. Which method helps with understanding the file structure better?

### Exploring Variant Call Format (VCF) Files
These files store sequence variants, SNPs and indels. 

A VCF file has three main parts: 
- Metadata lines: each line starts with ## followed by key=value pairs
- single header line: starts with single # and describes columns in the data lines
- data lines: sequence variation data

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Understanding the layout and structure of VCF files:

* **View the header only** 
  
  ```bash
  grep '^#' files/chinook.vcf | less
  ```
  {:.copy-code}

  `| less` lets us scroll through the output. 

* **View the first few variant lines:** 
  
  ```bash
  grep -v '^#' files/chinook.vcf | less
  ```
  {:.copy-code}

  ***Note:*** *`-v` tells grep to invert the match and only show lines that do *not* match the pattern provided*

{% include alert no_icon=true type="success" title="You try:" text="View the first 10 variant lines" %}

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Inspecting columns in VCF files

{% include table content="| Column No. | Name | Description |
| --- | --- | --- |
| 1 | CHROM | Chromosome name or contig |
| 2 | POS | Position of variant |
| 3 | ID | Identifier |
| 4 | REF | Reference alle |
| 5 | ALT | Alternate allele(s) |
| 6 | QUAL | Quality score for the variant |
| 7 | FILTER | Pass/fail status |
| 8 | INFO | Additional annotation |" %}

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Extracting columns using `cut` 

* The `cut` command can be used to extract specific columns/fields from a file.  

  ```bash
  cut -f1 files/chinook.vcf | head -n 5 
  ```
  {:.copy-code}

  `-f1-: extracts field 1
  {% include alert no_icon=true type="success" title="You try:" text="Extract columns 2 and 5." %}

* Let's remove the header:  

  ```bash
  cut -f1 files/chinook.vcf | grep -v '^#' | head -n 5 
  ```
  {:.copy-code}

  Break it down:
  `-f1`: field 1
  `grep -v '^#'`: removes the header lines
  `head -n 5`: shows first 5 lines
 
* What chromosomes/contigs are in this file?  
  * Let us look at the first column, remove the header and sort the chromosomes/contigs:   

    ```bash
    cut -f1 files/chinook.vcf | grep -v '^#' | sort | less 
    ```
    {:.copy-code}

  * Now, let's get unique chromosome names by using uniq:    

    ```bash
    cut -f1 files/chinook.vcf | grep -v '^#' | sort | uniq | less 
    ```
    {:.copy-code}

* What's in the INFO column? 

  ```bash
  cut -f8 files/chinook.vcf | grep -v '^#' | head -n 5
  ```
  {:.copy-code}

* Let's look at the kinds of mutations.  
  The ALT column tells us the alternate allele at each variant position.

  * To do this we will extract column 5 (ALT) and remove the header: 

    ```bash
    cut -f5 files/chinook.vcf | grep -v '^#' | head 
    ```
    {:.copy-code}

  * Next, we will sort the variants :  

    ```bash
    cut -f5 files/chinook.vcf | grep -v '^#' | sort | head 
    ```
    {:.copy-code}

  * Let's get rid of the repeats and count how many times each uniq variant appears: 

    ```bash
    cut -f5 files/chinook.vcf | grep -v '^#' | sort | uniq -c | head 
    ```

  * Lastly, let's sort the results with the most frequent variant at the top 

    ```bash
    cut -f5 files/chinook.vcf | grep -v '^#' | sort | uniq -c | sort -nr| head 
    ```

    ***Note:*** *using -nr sorts the results numerically and in reverse order*


{% include alert no_icon=true type="success" title="Discussion question:" text="What is the most common ALT allele?" %}

</li>
</ol>


### `bcftools` for VCF files:

For more format-aware exploration of VCF files, we will use `bcftools`. `bcftools` is a command-line tool used for viewing, filtering and manipulating VCF files. We will use `bcftools` to help us summarize variant info and for extracting and selecting variants. 

{% include table caption="Options associated with bcftools" content="| Option | Explanation |
| --- | --- |
| -r | the output is restricted to a specific region |
| i | include records that satisfy the given condition |
| -v | filter to show the variant type |
| -H | skips the VCF header lines and prints the variant lines only |" %}

{% include table content="| command | function |
| --- | --- |
| view | Filter and subset VCFs |
| query | Extract custom fields from VCF |
| stats | Generate VCF summary statistics |" %}

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Viewing a VCF file with `bcftools`

{:.copy-code}
```bash
module load bcftools
bcftools view files/chinook.vcf | head -n 20
```

**How does this output compare to when we used `grep` earlier?**

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Extracting fields with `bcftools query`

We can use the bcftools query command to inspect columns similar to how we used cut, but instead of calling column numbers we can use the column name:  

* **Extract the INFO field**

  ```bash
  bcftools query -f '%INFO\n' files/chinook.vcf | head 
  ```
  {:.copy-code}

* **Extract the chromosome names**

  ```bash
  bcftools query -f '%CHROM\n' files/chinook.vcf | head 
  ```
  {:.copy-code}

* **Extract the quality scores**

  ```bash
  bcftools query -f '%QUAL\n' files/chinook.vcf | head 
  ```
  {:.copy-code}

{% include alert no_icon=true type="success" title="You try:" text="Extract the ATL values." %}

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Counting the total number of variants

{:.copy-code}
```bash
bcftools view -H files/chinook.vcf| wc -l
```

Note: -H skips the header lines

</li>
<li class="usa-process-list__item" markdown=1>

{:.usa-process-list__heading}
#### Filtering variants

  * By quality: 
    
    ```bash
    bcftools view -i 'QUAL>1000' files/chinook.vcf > high_qual_bcf.vcf 
    ```
    {:.copy-code}
      
    ```bash
    head high_qual_bcf.vcf
    ```
    {:.copy-code} 

    If we want to remove the headers, what can we do here?

  * By variant type: 
    * `-v snps`: keeps only SNPs  
      `-H`: removes header lines

      ```bash
      bcftools view -v snps -H  files/chinook.vcf | less
      ```
      {:.copy-code}
    
    * `-Oz`: output format a compressed vcf file
    
      ```bash
      bcftools view -v snps files/chinook.vcf -Oz -o snps_only_bcf.vcf
      ```
      {:.copy-code}

  * By the number of reads supporting the variant (Depth): 
    
    ```bash
    bcftools view -i 'INFO/DP>10' -H files/chinook.vcf | less 
    ```
    {:.copy-code}

  * Can we combine filters?  
    For example, what if we wanted to filter for QS >=1000 and depth >=30: 
      
    ```bash
    bcftools view -i 'QUAL >= 1000 && INFO/DP>30' -H files/chinook.vcf > filtered_chinook.vcf
    ```
    {:.copy-code}

    ```bash
    grep -v "^#" filtered_chinook.vcf
    ```
    {:.copy-code}

* **VCF file summary with `bcftools`**  
  `bcftools` can generate summary statistics file on your VCF files: 
  
  ```bash
  bcftools stats files/chinook.vcf > stats_vcf.txt
  ```
  {:.copy-code} 

  ```bash
  less stats_vcf.txt
  ```
  {:.copy-code}

  * To plot: 

    ```bash
    plot-vcfstats -p stats_output stats_vcf.txt
    ```

</li>
</ol>

{% include alert no_icon=true type="info" title="Discussion Questions:" text="<ul><li>Why is filtering by quality important?</li>
<li>Why might SNPs be prioritized over other variant types?</li>
<li>How would you decide which variants are biologically relevant?</li>
<li>How might filters change depending on if you were studying disease vs breeding?</li></ul>" %}

    
### GTF Files in Bioinformatics
A GTF (Gene Transfer Format) is a tab delimited text file. It describes genes and other features, exons, CDS etc.bGTF (Gene Transfer Format) files are essential for describing gene and transcript structures in genome annotation. Below are the most common uses:

{% include table content="| Use Case | Description |
| ---------- | ------------- |
| **Gene Annotation** | GTF files define genes, transcripts, exons, CDS, start/stop codons, and their genomic positions and relationships. |
| **Read Quantification** | Tools like `featureCounts`, `HTSeq`, and `StringTie` use GTF files to assign reads to gene features such as exons. |
| **Transcript Assembly** | Tools like `Cufflinks` and `StringTie` use GTFs to guide transcript reconstruction or compare with known annotations. |
| **Differential Expression Analysis** | Count matrices derived using GTF annotations feed into tools like `DESeq2` or `edgeR`. |
| **Gene Model Visualization** | Genome browsers like IGV and UCSC display gene models using GTF annotations. |
| **Genome Annotation Conversion** | GTF files can be converted to/from other formats like GFF3 or BED. |
| **Custom Feature Extraction** | GTFs are parsed to extract specific features (e.g., all exons, all CDSs, or specific genes of interest). |" %}

* Count the number of lines or characters in the file:
  
  ```bash
  wc Arabidopsis.gtf
  ```
  {:.copy-code}

  ```bash
  wc -l Arabdopsis.gtf
  ```
  {:.copy-code}

  Note: Its a lot: 888100  24503892 272940122 Arabidopsis.gtf  

  * Let's make a smaller file:

    ```bash
    head Arabidopsis.gtf > Arabidopsis_head.gtf 
    ```
    {:.copy-code}

  * Now let's count again:
    
    ```bash
    wc Arabidopsis_head.gtf
    ```
    {:.copy-code}

    Output: #10  142 1607 Arabidopsis_head.gtf  

  * Count only the number of lines:

    ```bash
    wc -l Arabidopsis_head.gtf
    ```
    {:.copy-code}

* Count unique features
  
  ```
  grep -v '^#' Arabidopsis_head.gtf | cut -f3 | sort | uniq -c
  ```
  {:.copy-code}

  Expected output: 
  * 1 CDS
  * 2 exon
  * 1 gene
  * 1 transcript

* Extract only genes
  
  ```
  awk '$3 == "gene"' Arabidopsis_head.gtf
  ```

* Extract all exons and the correponding coordinates

  ```
  awk '$3 == "exon" {print $1, $4, $5}' Arabidopsis_head.gtf 
  ```

* View and parse 9th column (the attributes)

  ```
  cut -f9 Arabidopsis_head.gtf
  awk '{match($0, /gene_name "([^"]+)"/, arr); if (arr[1] != "") print arr[1]}' Arabidopsis_head.gtf | sort | uniq | head
  ```
  {:.copy-code}

	* awk `...`: An awk command
	* RegEx pattern `/gene_name "([^"]+)"/`
	* `gene_name "`: match this pattern literally
	* `([^"]+)"`: Captures what is within quotes
		-`([^"]+)`: one or more characters that isn't double quote
		-`+`: Match one or more "non-quote" characters
		-`"`: Match the closing quote
	* `arr`: Our name for the array/list that grows with each line 

* Make separate feature files

  ```
  awk '$3=="CDS"' Arabidopsis_head.gtf > Arabidopsis_cds.gtf  
  ```
  {:.copy-code}
  
  ```
  awk '$3=="exon"' Arabidopsis_head.gtf > Arbaidopsis_exons.gtf
  ```
  {:.copy-code}

* Modify selected words/string:

  ```
  sed 's/gene_id/GENE/g' Arabidopsis_head.gtf 
  ```
  {:.copy-code}

**EXERCISE:**
1. Download the Saccharomyces cerevisiae [GTF file](https://ftp.ensembl.org/pub/current_gtf/saccharomyces_cerevisiae/)
2. Extract the file from the gzipped archive
3. Count the total number of lines
4. Count the total number of Gene feature lines
5. Count the numbers of each unique feature type
6. Extract the gene ids and save as a separate file
7. Make a newer GTF file with only CDSs  

-----


## Part 3: Exploring public repositories/databases 

We will now explore a few public repositories. The most commonly used repositories/public databases are hosted by NCBI [National Center for Biotechnology Information.](https://www.ncbi.nlm.nih.gov/) 

**Let's explore the website:**

* Multiple Databases 
* Landing Page: 
  * Submitting sequences 
  * Downloading sequences 
  * Tutorials 
  * Developing APIs/Code libraries 
  * Various tools 
  * Explore research 
  * Popular Resources 

**Use cases for a scientist**

* Literature search 
* Exploring a gene sequence 
* Exploring genomes 
* Downloading data 

Another popular public database is the [European Nucleotide Archive](https://www.ebi.ac.uk/ena/browser/home). This archive primarily started as a repository for storing raw sequence data, metadata etc. In this respect it is similar to the databases hosted by NCBI but they have different toolsets. 

{% include table caption="Core Role & Data Sharing: NCBI vs ENA" content="| Feature | NCBI (USA) | ENA (Europe) |
| --- | --- | --- |
| **Main Role** | Central US resource for genomic data storage and retrieval | Central European resource for nucleotide data archiving |
| **Organization** | National Center for Biotechnology Information (NIH) | European Nucleotide Archive (EMBL-EBI) |
| **Key Databases** | SRA, GenBank, RefSeq, GEO, dbSNP | ENA (includes raw reads, assemblies, annotations) |
| **Data Submission** | Accepts direct submissions via [SRA Submission Portal](https://submit.ncbi.nlm.nih.gov/subs/sra/) | Submissions via [Webin Portal](https://www.ebi.ac.uk/ena/submit) |
| **Data Access** | Via web, `sra-tools`, and E-utilities API | Via web, RESTful APIs, FTP, and direct links |
| **Data Sharing** | Collaborates with INSDC (ENA & DDBJ) for daily sync | Also part of INSDC — fully synchronized with NCBI and DDBJ |
| **Data Format** | `.sra` format (needs `fastq-dump` to convert) | Direct FASTQ/FASTA/TSV downloads (simpler access) |
| **Typical Use Case** | US-based research and NIH-funded data | EU-based research or quick bulk access |" %}


**International Collaboration**  

Both NCBI and ENA are members of the INSDC (International Nucleotide Sequence Database Collaboration), along with DDBJ (Japan).   

They synchronize data daily, so any data submitted to one appears in the others. 

{% include table caption="User Interfaces & Portals: NCBI vs ENA" content="| Feature | NCBI (National Center for Biotechnology Information) | ENA (European Nucleotide Archive) |
| --- | --- | --- |
| Primary Portal | https://www.ncbi.nlm.nih.gov/ | https://www.ebi.ac.uk/ena |
| Search Interface | Entrez (integrated search for all databases) | ENA Browser (data-centric search) |
| BLAST Access | NCBI BLAST web interface | EMBL-EBI BLAST service |
| FTP Access | ftp.ncbi.nlm.nih.gov | ftp.ebi.ac.uk/pub/databases/ena |
| APIs & Programmatic Access | E-utilities (Entrez API), Datasets, SRA-tools | ENA Portal API, ENA REST API |
| Submission Portals | BioProject, SRA, GenBank, GEO, dbGaP submission tools | Webin (single portal for all data types) |
| Visualization Tools | Genome Data Viewer, GEO Profiles | Interactive web viewers for entries |
| Data Download Options | Datasets command-line tool, direct FTP/HTTP links | Direct FTP, programmatic downloads |
| Help & Documentation | Extensive help docs, NCBI Handbook, video tutorials | ENA Docs, FAQs, webinars |" %}

*Both portals are interoperable through the INSDC framework. Tools and formats often overlap in functionality.* 

### Download data with SRA toolkit
**Demonstrate some SRA sequence downloads from NCBI and compare with ENA**

There are two ways to get the SRR list:
1. From the website:
  * [**SRP433780**](https://www.ncbi.nlm.nih.gov/sra/SRX20051287[accn])  
  * Go to the link above and send the results to run selector  
2. Command line step-by-step:  

   ```
   # Load the modules 
   module load  edirect/23.6.20250307 
   module load sratoolkit 

   # get the complete SRA run information file and cull the SRR accesion list and save in a file 
   esearch -db sra -query SRP433780 | efetch -format runinfo > SRP433780_runinfo.csv 
   cut -d ',' -f1 SRP433780_runinfo.csv | grep SRR > SRR_accessions.txt 

   # check SRR_accessions.txt and select one to download in two steps: 
   prefetch SRR24255343 
   fasterq-dump SRR24378108 --split-files --threads 4 
   ```
   {:.copy-code} 


{% include alert no_icon=true type="success" title="You try:" text="<ul>
<li>In The European Nucleotide archive: How do we download the fastq associated with this SRR accession?</li>
<li>Choose a database and search for a dataset of interest.</li>
<li>Download one FASTQ, FASTA or VCF file and use some of the commands discussed to examine the file.</li>
<li>Share something you learned about your dataset. For example: How many reads or variants are present in the file?</li></ul>"%}

    
-----



## Part 4: BLAST

The [NCBI blast website](https://blast.ncbi.nlm.nih.gov/Blast.cgi) is NCBI's most popular tool.

{% include table content="| Tool | Query Type | Database Type | Description |
| --- | --- | --- | --- |
| blastn | Nucleotide | Nucleotide | Compares nucleotide query to nucleotide DB |
| blastp | Protein | Protein | Compares protein query to protein DB |
| blastx | Nucleotide (translated) | Protein | Translates nucleotide query, searches protein DB |
| tblastn | Protein | Nucleotide (translated) | Translates nucleotide DB, searches with protein query |
| tblastx | Nucleotide (translated) | Nucleotide (translated) | Translates both query and DB, compares proteins |" %}

### NCBI Web-Based BLAST

* Go to: “Nucleotide BLAST” 
* Paste a sample sequence: 

  ```bash 
  >sample_seq 
  AGTGTCTCCCGGTCGCGCGTGGAGGTCGGTCGCTCAGAGCTGCTGGGCGCAGTTTCTCCGCCTGCTGCTT 
  CGGCGCGGCTGTATCGGCGAGCGAGCGAGTTCCCGCGAGTTCTCGGTGGCGCTCCCCCTTCCTTTCAGTC 
  TCCACGGACTGGCCCCTCGTCCTTCTACTTGACCGCTCCCGTCTTCCGCCGCCTTCTGGCGCTTTCCGTT 
  GGGCCGATTCCCGCCCGCTTCCTCCTGCTTCCCATCGAAGCTCTAGAAATGAATGTTTCCATCTCTTCAG 
  AGATGAACCAGGTAATACGCGCTGGTTCTACGAACGACAGATGAGGGAGACGGCGCGGCTAGAATCCGAG 
  AAGAAGGGATGGCGCCGGCGGATGGGAAGAGGGTGGGAGGCGCGGAAGCGGTGTCCTCATCAGGGGAGGC 
  AGCCCCAAGCGGCCGCCGCCGCCCTCTGGGACGTGAAGCCCGCGCCGCGCTGGGCCCGCGCTCCAGCGCT 
  GCCATGGTTGCCAAGTTGCGTTGGCGGCCGAGAGCGGGCGCCGGTCGCCTCGGAGAGCGCGGAGGCTGGA 
  GCCCCTTTGCTACACTGGCGCGGGTGAGGCAGGCTGGGAGGAACAAGAGTTTTTTGTTCGAAGGGTTTTG 
  GGGGGCCTGGGTTAGGGCGCCGCGGGCGGGGATGACCCGCCGGAAGGAGGGCGCGGGACTCCCCGTTCTT 
  GCTGTCAGGAACGGACGCCTCGCCTCGGGTTTGCCTGGGGTTTGGGATTCTCTTCTGGAAGAGCTCTCGA 
  GACTCGGCTCGTGTGGGCGGGCAGCCAGCCCCGGGCCTGGAGTAGGGTGGCACGGAGTCCCCGATCGCCG 
  TGGGCCGCGGGGTCCTTTGTTCCCGCTCCACGTTGCCCGCTTTTCTTGCCAAGCGCGGGGAGAAGGGGGC 
  GGGAGGAGGGAGGGAGCGGCTGCCCTGACGTGTCGGTACTGAGTGACTGCGGGGCTGGCCAATCCGGGGC 
  GGGGGTGTGCGGGTGCTGGGGGCCTCGCCTCGCAGCCTGCGGAGTGGGCGCCGGCCTGGCTGCGCGAGGA 
  GGAAGGCCTGGGACGCTCTTTCTTTTTTATGAAAGAAATCAGTGGCAAGATTTGCTCTTTTTCCGTCCCT 
  CCACGCTTTTGGTTAAGTGTCTCTGATTATAAGCTCTTGATGATAGGAAGGTATCAGGCTGAGGGTTGAA 
  CCTAGGGTAACTTGAACCACTACTTGAGAACTACATTTACTTTTTCCCCCAATAGGTAGTGGACATATCT 
  ATTGGTTTGAGACAGCTGACATTTCAAGGAGAAATCAGATGTCCAAAAGGGCGCATTTTTGTGATGGAGC 
  GTGCAGTGATGGAGCGTTAGAACACCTTGGCATCAAGCTGTTCGTTGAGTGTGTCGTGGTCTTCTGTCTA 
  CTAATAGATGACAACTCTGGAAGCCTAGTACCACTCTTAACAGATGAATAAGTACAGCATGGACTAGACT 
  GCCACAGGCCATGCTTTCTTTTAATAATTCTAGCACCAGTGATTGATTTAGGAAAAACAAAATACTGATG 
  ATTACTTTTAGGCTAAAGCCTGCTGACACTTCTGTCTTAAAGATACTGAAAGAGTAGTTGTATTTGTTAA 
  GTCTGGACGTGAGGTAAACATGGACTTTAGAATTGAATTGAGACTAGTATCATTTAACGCCAGCTGGCAG 
  GCTGCTTATCAAGCTTATAATTTGGTAGCCAGAGGTAAACGGAACTTGAGCCACTGACCAAAGAGAGCCC 
  TGGAATGGTTTTCCTCTGTGTTTTCCTAATAGATGATATCTCTGGTTAACTAATAGATACTAATTTCTAT 
  AGCCATTGTCTTAATTTGTAGTTGATTTTCTAACTTTCCCCCCAAGACAAAACATTTCAGGTTTTAGTCT 
  TAGTTTTAAATTAGTGTCTTTTTGGCTACTTGCTTTTGGAAGGTGGGATTTTTTCTTGCTTGAAGGATTT 
  GTTAGATGGTAATTAAATGTAGTTTTGCAAATACGTTTTTAAATATAAATGTTTTCCTGTTAAGGAAGTA 
  TCTTAATTGATATTAAGATGAAGTAACACTAAGTAAGTCATTTCATCCACTTTTTAGCAGTGCGATTGTA 
  ``` 
  {:.copy-code}

* Select Database: `core_nt` or `Nucleotide collection` (or try each one separately) 
* Organism (Optional): Homo sapiens (if necessary) 
* Select program/algorithm and Click: "BLAST" 
* Output: 
  * Descriptions: Score, E-value, identities 
  * Graphical alignment 
  * Pairwise-matches 
  * Taxonomy etc. 

### Command-line BLAST

**Requisites:** 

{:.copy-code}
``` 
module load blast+/2.15.0 
# check help 
blastn -help 

``` 

 
{:.copy-code}
``` 
# We already have the NT database available on Ceres 
export NT=/reference/data/NCBI/blast/2026-01-13/ 

blastn -query gene.fna -task blastn -db $NT/nt -num_threads 36 -out gene-nt1.blast.xml 

``` 

 

If the database weren't already available, we would have to make the blast database:

{:.copy-code}
``` 
makeblastdb -in db.fa -dbtype nucl -out db 
``` 

Then run blastn 

{:.copy-code}
``` 
blastn -query query.fa -db db -out results.txt -outfmt 6 
```


## Part 5: Slurm Command Demo: Essential HPC Job Management

Slurm ("Slurm" originally stood for "Simple Linux Utility for Resource Management") is an open-source job scheduler widely used in high-performance computing (HPC) environments. It manages job allocation, job queuing, and resource scheduling on compute clusters. Slurm is responsible for distributing computational tasks across available nodes and optimizing resource usage, ensuring that jobs run efficiently according to the specified requirements (e.g., CPU cores, memory, and time). Users submit job scripts with resource requests, and Slurm handles the execution, monitoring, and completion of these jobs. It also provides commands like `sbatch` for submitting jobs, `squeue` for checking job status, and `scontrol` for querying job details. Here are some commonly used Slurm commands on HPC systems.

1. Check available partitions (queues)
   
   ```bash
   sinfo
   sinfo --partition=short
   sinfo --partition=ceres
   ```
   {:.copy-code}

2. View my running Jobs

   ```bash
   squeue --me
   squeue -u $USER
   ```
   {:.copy-code}

3. Cancel a Job:

   ```bash
   scancel <jobid>
   ```
   {:.copy-code}

4. Show Job Details:
   
   ```bash
   scontrol show jobs <jobid>
   ```
   {:.copy-code}

5. Show node details:

   ```bash
   scontrol show nodes <nodeid>
   ```
   {:.copy-code}

6. View Job History:

   ```bash
   sacct -u $USER
   ```
   {:.copy-code}

7. Specific Job History:

   ```bash
   sacct --jobs=<jobid>
   ```
   {:.copy-code}

8. Estimate Job Start time

   ```bash
   squeue --start -u $USER
   ```
   {:.copy-code}

9. View the cluster's Slurm configuration:

   ```bash
   scontrol show config | less
   ```
   {:.copy-code}

10. Determine job efficiency (accurate only after job ends)

    ```bash
    seff <jobid>
    ```
    {:.copy-code}

11. Interactive job (we are already on a interactive node)
    Let's start another for one minute

    ```bash
    salloc --account=scinet_workshop2 --nodes=1 --ntasks=2 --partition=ceres --time=00:01:00
    ```
    {:.copy-code}

12. Batch Script and Batch Job
    Use your favorite editor (nano) or use VS code or notepad to write the batch script

    ```bash
    #!/bin/sh 
    #SBATCH --nodes=1
    #SBATCH --ntasks=8
    #SBATCH --job-name=blast
    #SBATCH --output=log/blast.o%j
    #SBATCH --error=log/blast.e%j
    
    cd $SLURM_SUBMIT_DIR
    scontrol show job ${SLURM_JOB_ID}
    export NT=/reference/data/NCBI/blast/2026-01-13/
    module load blast+/2.15.0
    blastn -query gene.fna -task blastn -db $NT/nt -num_threads 8 -out gene-nt.bl.out.xml
    ```
    {:.copy-code}

    Save the file as `blast.sh`
    Run the batch script as `sbatch blast.sh`

    Explanation of the batch script
    * Line 1: Use the bash shell
    * Line 2: Use one Node
    * Line 3: Use 8 tasks in this case same as processors or threads
    * Line 4: Job name: blast
    * Line 5: Write std output to a folder called `log` in a file named blast.o<jobid>
    * Line 6: Write std output to a folder called `log` in a file named blast.e<jobid>
    * Line 7: Change to the dir from which we are submitting the slurm script
    * Line 8: Print job details, this will be appended to the std output
    * Line 9: export the blast database to a variable called NT
    * Line 10: Load the Blast module/spftware
    * Line 11: The `blastn` command


**Additional resource:** 
Ceres Job [Script Generator:](https://scinet.usda.gov/support/ceres-job-script#ceres-job-script-generator)


**EXERCISE**
Submit the blastn job and monitor the run:

1. Use `scontrol`.
2. You could `ssh` to the compute node on which the jobs is running.
3. While in the compute node, use `top` to monitor the run.



## Part 6: Modules and Environments

On Ceres, we have several software packages available as modules and also as isolated environments and apptainer (formerly singularity) images.

* **Modules:** Pre-configured software packages that can be loaded when needed.
* **Conda Environments:** Isolated "workspaces" for managing software dependencies specific to a project.
* **Apptainer:** Portable containers that bundle software and its environment for consistent execution across different systems.


### Modules

Load the `blast+` module so that we can use BLAST software. Run `blastn` to check the version.

{:.copy-code}
```
module load blast+
blastn -version

#blastn: 2.15.0+
# Package: blast 2.15.0, build Oct 19 2023 13:35:57
```

Check if there are modules named `hisat2` and `samtools`.

{:.copy-code}
```bash
module spider hisat
```

{:.margin-y-1}
```
------------------------------------------------------------------------------------
  hisat2:
------------------------------------------------------------------------------------
     Versions:
        hisat2/2.2.1-py313-6sta5wz
        hisat2/2.2.1

------------------------------------------------------------------------------------
  For detailed information about a specific "hisat2" package (including how to load the 
modules) use the module's full name.  
  Note that names that have a trailing (E) are extensions provided by other modules.
  For example:

     $ module spider hisat2/2.2.1
```



{:.copy-code}
```bash
module spider sam
```

{:.margin-y-1}
```
------------------------------------------------------------------------------------
  samtools:
------------------------------------------------------------------------------------
     Versions:
        samtools/1.16.1
        samtools/1.17
        samtools/1.19.2-py311-py313-btw6g6q

------------------------------------------------------------------------------------
  For detailed information about a specific "samtools" package (including how to load th
e modules) use the module's full name.
  Note that names that have a trailing (E) are extensions provided by other modules.
  For example:

     $ module spider samtools/1.19.2-py311-py313-btw6g6q
------------------------------------------------------------------------------------
```

### Conda Environments

On Ceres, in order to run `conda`, we have to load a module called `miniconda`. On Atlas, the module is called `miniconda3`.

* Check your conda environment list
  
  ```bash
  module load miniconda
  conda env list
  ```
  {:.copy-code}

* Check which environment is active currently

  ```bash
  echo $CONDA_DEFAULT_ENV
  conda list 
  ```
  {:.copy-code}

* Check details about the environment:

  ```bash
  conda info
  ```
  {:.copy-code}

* Activate a specific environment:

  ```bash
  source activate <name of environemnt>
  ```
  {:.copy-code}

* Deactivate the environment:

  ```bash
  conda deactivate
  ```
  {:.copy-code}

### Apptainer

Apptainer (fornerly singulaity) is a container system for HPCs. It let's us package the entire software including dependencies, Operating system, scripts, etc. Like mininconda, it is also available as a module on Ceres.  

```bash
module load apptainer
apptainer -h
apptainer version
```
{:.copy-code}

* Build a blast software image  

  ```bash
  apptainer build blast_quay.sif docker://quay.io/biocontainers/blast:2.12.0--pl5262h3289130_0
  apptainer exec blast_quay.sif blastn -version
  #blastn: 2.12.0+
  # Package: blast 2.12.0, build Jul 13 2021 09:03:00
  ```
  {:.copy-code}

-----


## Part 7: Parallelization of simple tasks

Some analyses take a long time because they run on a single processor and must process lots of data. Distributing the analysis among multiple CPUs can reduce the total time required, sometimes dramatically so!

### What kinds of problems can be (easily) parallelized?

A problem is considered "trivially parallelizable" if the data can be chunked into pieces and each piece processed independently. So, for example, a problem might be trivially parallelizable when:
* Each line of a file can be processed independently.
* Each chromosome of a genome can be processed independently.
* Each scaffold of an assembly can be processed independently.

Here are some specific examples of such problems:
* Zipping or unzipping 10s to 100s of files.
* Counting the number of lines in a large file.
* Aligning raw sequencing data files of many samples to a genome.

Examples of problems that are not trivially parallelizable:
* Genome assembly is not trivially parallelizable because the first step requires alignment of each read to each other read in order to find which ones are similar and should be joined (assembled). Taking a subset of the reads would result in a bunch of small, poor assemblies.

### Using GNU parallel

There are _many_ ways to implement parallel computing! GNU parallel is one option, and can be used on many trivially parallelizable problems, including in bioinformatics. GNU parallel is “a shell tool for executing jobs in parallel using one or more compute nodes”. You can check the [GNU parallel website](https://www.gnu.org/software/parallel/) to learn more about it. On Ceres, `parallel` is available as a module.

Load the module and check the version:

```
module load parallel

parallel --version
GNU parallel 20230222
Copyright (C) 2007-2023 Ole Tange, http://ole.tange.dk and Free Software
Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
GNU parallel comes with no warranty.

Web site: https://www.gnu.org/software/parallel

When using programs that use GNU Parallel to process data for publication
please cite as described in 'parallel --citation'.

```

We will be using COVID-19 data collated by the New York Times and available in a GitHub repository.

```
mkdir parallel_test

wget https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv
```
This is a comma-separated file so let’s convert that to a tab delimitated file

```
cat us-counties.csv  | tr ',' '\t' > us-counties.txt
```
As you can see, this dataset contains the county and state information about the pandemic over time.

```
head us-counties.txt 
date	county	state	fips	cases	deaths
2020-01-21	Snohomish	Washington	53061	1	0
2020-01-22	Snohomish	Washington	53061	1	0
2020-01-23	Snohomish	Washington	53061	1	0
2020-01-24	Cook	Illinois	17031	1	0
2020-01-24	Snohomish	Washington	53061	1	0
2020-01-25	Orange	California	06059	1	0
2020-01-25	Cook	Illinois	17031	1	0
2020-01-25	Snohomish	Washington	53061	1	0
2020-01-26	Maricopa	Arizona	04013	1	0
```
Instead of one large file, let’s separate the data by county/state.

Using `sort` and `awk` we can first sort the file by county/state and then use `awk` to print each line ($0) to a file named `county-state.txt`.

```
sort -k 2,3 us-counties.txt | awk '{print $0 > $2"_"$3".txt"}'
```

This will currently generate 3,241 files (3,243 including the two files we made first):

```
ls | wc -l
3243

```

Let's compress each of the 3,243 files using `gzip`. This is a trivially prallelizable problem!

```
parallel -j 10 "gzip {}" ::: *.txt


```
The syntax:

* parallel 
* -j10 number of jobs or cpus to use for processing. Here we are using 10 cpus.
* "command" in this case gzip {} where `{}` is a place holder for substituting a list of files defined after the delimiter
`:::` the delimiter
* *.txt the list of files using the * operator for any file that ends in tab

We could use the same logic to uncompress the files.

**Splitting a big job to make use of all the available cpus**

Let's download a large fasta file, `test.fa`. Our aim is simply to count the lines in this fasta file.

You can download the example fasta file like this.

```
cd parallel_test
wget www.bioinformaticsworkbook.org/Appendix/GNUparallel/test.fa
```

```
head test.fa

>TRINITY_DN22368_c0_g1_i1 len=236 path=[427:0-235] [-1, 427, -2]
ATTGGTTTTCTACGGAGAGAGAGAAAATGGAGACGGCGAGTGTCTAAAGCTAGAGCTTGT
GTTGGAGAAGGAAACGGAGATTTGCGTAGTAGTGGAAGCTTTAGGTATTTGTTGTGGTTA
CTCACGGCGGCGATATTTGACGGCGGGAGGAGGAAAAGAGAGAGGAAAGAACAGAGGAAG
AAGATGAGAGGAAACATTGAGAGAGAGTGAGAAGGGTTTTGTGATTTTTGTGTCTG
>TRINITY_DN22345_c0_g1_i1 len=615 path=[593:0-614] [-1, 593, -2]
GCCGGATTCAGATACGCAAGGAGAATCTGAGCAGGTCGAATGTTGATGGTATGCTTTCAT
CGGCACTTCCAGGTGGTCAGGAGAAGATCCCCATACGACTGCACTCTCTTTGCTATATGA
TGAAGCAGGAACTGTCACAAGAGGCAGAGAAGTACTGGACTCTGCCATTTGCTCATTTGT
AGCATGATTTCCTTCCCCATTCTCAGTTCCGGGAGTGCAGTGAAAGCAACAATCATTATT
```

Let's run the `wc -l` command to find the number of lines. We can also use the unix command `time` to see how much time it takes to run the command (optional).

```
time wc -l test.fa
1082567 test.fa

real    0m1.237s
user    0m0.025s
sys     0m0.057s

```

Now, using `parallel`, we can take advantage of multiple CPUs. We'll distribute our job across all available CPUs.

```
parallel -a test.fa --pipepart --block -1  time wc -l
```
***Note:***
1. `-a` option means input is read from a file            
1. `--pipepart`: pipe parts of a file


```
111748
real    0m0.021s
user    0m0.005s
sys     0m0.002s

104450

real    0m0.023s
user    0m0.002s
sys     0m0.005s
111050

real    0m0.026s
user    0m0.002s
sys     0m0.005s
108797

real    0m0.023s
user    0m0.005s
sys     0m0.002s
108114

real    0m0.021s
user    0m0.005s
sys     0m0.002s
109001

real    0m0.021s
user    0m0.003s
sys     0m0.003s
106528

real    0m0.022s
user    0m0.002s
sys     0m0.004s
109069

real    0m0.019s
user    0m0.002s
sys     0m0.005s
104735

real    0m0.020s
user    0m0.003s
sys     0m0.003s
109075

real    0m0.021s
user    0m0.003s
sys     0m0.003s

```

Notice we use less time with each block being counted by each cpu. The longest time in this case is `0.026 seconds` compared to `1.237 seconds` when not making use of `parallel`.



## Part 8: Project Management in Bioinformatics and Genomics

Project management through careful directory organization is clear and intuitive for beginners as well as experts. Proper documentation saves a lot of time and reduces the potential for errors down the line.

[Data Carpentry Project Organization and Management for Genomics curriculum:](https://datacarpentry.github.io/organization-genomics/01-tidiness.html)

Project organization is important:  
* Reproducibility  
* Collaboration  
* Scalability  
* Debugging and Maintenance  
* Transparency and Pubblications  
	

**Mock Project Directory structutre**

```bash
.
├── 00_Raw_Data
├── 01_QC
├── 02_Trimming
├── 03_Trimmed_Data
├── 04_Alignment
├── 05_Counts
├── 06_DE_Analysis
├── 07_Plots
├── 08_Manuscript
├── 09_Processed_Data
├── README.md
├── config
├── envs
└── scripts
```

* `00_Raw_Data`: Raw FASTQs, from sequencing core
* `01_QC → 07_DE_Analysis`: analysis steps and results
* `08_Plots`: Figures for interpretation and further ivestigation if needed
* `09_Manuscript`: Final figures, text, references
* `10_Processed_Data`: Final processed data for publication
* `config/`: parameters for scripts, metadata etc.
* `scripts/`: reusable bash/R/python scripts
* `envs/`: Conda environment YAMLs or Apptainer images
* `README.md`: General overview of the project, inputs, steps etc.


    
-----



## Sources

- Bioinformatics Workbook [Online] Available at: https://bioinformaticsworkbook.org/#gsc.tab=0 (Accessed April 5, 2025)
- Anderson, E.C (2024). Practical Computing and Bioinformatics for Conservation and Evolutionary Genomics. Accessed April 11, 2025
