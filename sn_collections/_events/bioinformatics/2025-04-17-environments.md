---
title: Introduction to HPC Environments and Project Management and Organization
type: workshop
display: basic
no-caldate: true
provider: ISU
hideprovider: true
description: This workshop provides hands-on training in using SCINet’s high-performance computing (HPC) clusters for bioinformatics workflows. 
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
---

This workshop provides hands-on training in using SCINet’s high-performance computing (HPC) clusters for bioinformatics workflows. Participants will learn how to access and navigate SCINet’s systems as well as command line basics for managing and analyzing bioinformatics data including running BLAST and handling FASTA and FASTQ files. The workshop also covers project management and organization strategies to improve data organization and workflow efficiency.  <!--excerpt-->

# Tutorial Setup Instructions 

### Steps to prepare for the tutorial session each day: 

#### Login to Ceres Open OnDemand: http://ceres-ood.scinet.usda.gov/
For more information on login procedures for web-based SCINet access, see the SCINet access user guide. 

#### Open a command-line session by clicking on “Clusters” -> “Ceres Shell Access” on the top menu. 
This will open a new tab with a command-line session on Ceres’ login node. 


### Create a workshop working directory by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable. 

mkdir -p /90daydata/shared/$USER/intro_hpc 

cd /90daydata/shared/$USER/intro_hpc 

cp –r /project/scinet_workshop2/Bioinformatics_series/wk1_workshop/day2/ . 

 

# High-Performance Computing (HPC) for Bioinformatics: A Practical Introduction


---


# 1. What Is an HPC System?
- **Login node**: On ceres, when you first login you are in the login node and in your home directory or folder. You can prepare your work while here.
```
ceres $ pwd
/home/$USER
```
* You can navigate to your folder, list your files and check file sizes

```
- **Compute nodes**: Where jobs are executed.
#### Request resources on a compute node by running the following command. 

Copy: srun --reservation=wk1_workshop -A scinet_workshop2 -t 05:00:00 -N1 -n4 --mem 8G --pty bash 
 
```
ceres20-compute-67 $ pwd

/project/scinet_workshop2/Bioinformatics_series/wk1_workshop/day2

```
- **Storage system**: Shared file system accessible by all nodes.

```
## project space
To check the size of your project space, we will use the commmand `du` - which will check the disk usage: 

`du -hs`

## 90daydata
This is where you made your folder and work from today.
```
ceres $ pwd
/90daydata/shared/sivanandan.chudalayandi/intro_bioinformatics/day2
```
# Long term: JUNO
```bash
ssh nal-dtn.scinet.usda.gov
Last login: Wed Apr 16 14:24:55 2025 from 199.245.99.3
[$USER@nal-dtn-0 ~]$ 

```
# 2. Getting to know the command-line:

What is the command line:
* Text based intertace to interact with the CPU
* The "interpreter" is the shell. The most common is `BASH`
* No clicking only typing
* Scripting and Automation
* More control to you

You can ask the shell to print a character
```
echo "How are you?"
# the quotes above aren't strictly needed but it is safer with quotes

```
Date time calendar:
```bash
date
#Wed Apr 16 19:52:14 CDT 2025

cal
#     April 2025     
#Su Mo Tu We Th Fr Sa
#       1  2  3  4  5
# 6  7  8  9 10 11 12
#13 14 15 16 17 18 19
#20 21 22 23 24 25 26
#27 28 29 30    

```

On the HPC, you are one among many users. You can ask the interpreter:

```
whoami
# $USER (your first name.last name)

who
# All logged-in users
```

**Demo**: Navigate to a directory, view files.
Some basic navigation

```
pwd
# prints the working directory
# /90daydata/shared/$USER/intro_bioinformatics/day2 (this is the full path)

# We can also change directories
# go one directory "above" day2
cd ..
# come back to day2 by using full path or relative path
cd /90daydata/shared/$USER/intro_bioinformatics/day2 # FULL path
cd day2

# go home 

cd ~ # tilde the shortcut to go home
cd /home/$USER # the full path
```
* Create a test file and write something to it
```
touch test.txt
 
echo "hello, this is $USER" >>test.txt
```
* copy a file

```
cp test.txt test1.txt
```
* Make a new directory and copy files to it

```
mkdir folder1
cp test* folder1
```

* Copy one directory to another directory
**Special Note:** the flag -r stands for recursive, the command will fail without "-r"


```bash
cp -r folder1 folder2
```

* We can also move a file from one location to another or also to rename the file

The `mv` command is used to rename and move files.
``` 
mv test1.txt test1a.txt  # Rename test1.txt to test1a.txt
mv test1a.txt folder2  # Move file test1a to folder2
 
```

* Danger Zone: We can delete/remove a file or folder using `rm`.
There is no recycle bin or trash can from where you can restore the file

```
rm test1.txt
rm -r folder2 # use the recursive (-r) flag
rmdir folder2 # use rmdir
```
* Listing the files 

```
ls  # List files and directories in the current directory 
ls -l # Long format listing with more details 
ls -a # Show hidden files too 
ls -lh# Human-readable file sizes 
ls -t # list files sorted by time; most recent first
ls -tr # sorted by time; most recent last
```


* View file contents
```
cat Arabidopsis.gtf     # Display entire file 
less Arabidopsis.gtf    # View file page by page 
head -5 Arabidopsis.gtf  # View first 5 lines 
tail -5 Arabidopsis.gtf  # View last 5 lines 
```

## 3. GTF Files in Bioinformatics
A GTF (Gene Transfer Format) is a tab delimited text file. It describes genes and other features, exons, CDS etc.bGTF (Gene Transfer Format) files are essential for describing gene and transcript structures in genome annotation. Below are the most common uses:

| Use Case | Description |
|----------|-------------|
| **Gene Annotation** | GTF files define genes, transcripts, exons, CDS, start/stop codons, and their genomic positions and relationships. |
| **Read Quantification** | Tools like `featureCounts`, `HTSeq`, and `StringTie` use GTF files to assign reads to gene features such as exons. |
| **Transcript Assembly** | Tools like `Cufflinks` and `StringTie` use GTFs to guide transcript reconstruction or compare with known annotations. |
| **Differential Expression Analysis** | Count matrices derived using GTF annotations feed into tools like `DESeq2` or `edgeR`. |
| **Gene Model Visualization** | Genome browsers like IGV and UCSC display gene models using GTF annotations. |
| **Genome Annotation Conversion** | GTF files can be converted to/from other formats like GFF3 or BED. |
| **Custom Feature Extraction** | GTFs are parsed to extract specific features (e.g., all exons, all CDSs, or specific genes of interest). |

* Count the number of lines or characters in the file:
```
wc Arabidopsis.gtf
wc -l Arabdopsis.gtf

## Its a lot: 888100  24503892 272940122 Arabidopsis.gtf

# Let's make a smaller file
head Arabidopsis.gtf > Arbaidopsis_head.gtf

# Now let's count again

wc Arabidopsis_head.gtf
#10  142 1607 Arabidopsis_head.gtf

# Count only the number of lines

wc -l Arabidopsis_head.gtf
10
```
* Count unique features

```bash
grep -v '^#' Arabidopsis_head.gtf | cut -f3 | sort | uniq -c
      1 CDS
      2 exon
      1 gene
      1 transcript
```
* Extract only genes

```bash
awk '$3 == "gene"' Arabidopsis_head.gtf
```

* Extract all exons and the correponding coordinates

```bash
awk '$3 == "exon" {print $1, $4, $5}' Arabidopsis_head.gtf 
```

* View and parse 9th column (the attributes)

```bash
cut -f9 Arabidopsis_head.gtf

awk '{match($0, /gene_name "([^"]+)"/, arr); if (arr[1] != "") print arr[1]}' Arabidopsis_head.gtf | sort | uniq | head
```

	* awk `...`: An awk command
	* RegEx pattern `/gene_name "([^"]+)"/`
	* `gene_name "`: match this pattern literally
	* `([^"]+)"`: Captures what is within quotes
		-`([^"]+)`: any character that isn't double quote
		-`+`: Match one or more "non-quote" characters
		-`"`: Match the closing quote
	* `arr`: Our name for the array/list that grows with each line 

* Make separate feature files

```
awk '$3=="CDS"' Arabidopsis_head.gtf > Arabidopsis_cds.gtf
awk '$3=="exon"' Arabidopsis_head.gtf > Arbaidopsis_exons.gtf
```
* Modify selected words/string:

```bash
sed 's/gene_id/GENE/g' Arabidopsis_head.gtf 
```

**EXERCISE:**
1. Download the Saccharomyces cerevisiae [GTF file](https://ftp.ensembl.org/pub/current_gtf/saccharomyces_cerevisiae/)
2. Extract the file from the gzipped archive
3. Count the total number of lines
4. Count the total number of Gene feature lines
5. Count the numbers of each unique feature type
6. Extract the gene ids and save as a separate file
7. Make a newer GTF file with only CDSs  


## SLURM Command Demo: Essential HPC Job Management
SLURM (Simple Linux Utility for Resource Management) is an open-source job scheduler widely used in high-performance computing (HPC) environments. It manages job allocation, job queuing, and resource scheduling on compute clusters. SLURM is responsible for distributing computational tasks across available nodes and optimizing resource usage, ensuring that jobs run efficiently according to the specified requirements (e.g., CPU cores, memory, and time). Users submit job scripts with resource requests, and SLURM handles the execution, monitoring, and completion of these jobs. It also provides commands like `sbatch` for submitting jobs, `squeue` for checking job status, and `scontrol` for querying job details. Here are some commonly used SLURM commands on HPC systems.

1. Check available partitions (queues)

```bash
sinfo
sinfo -p short
sinfo -p ceres
```

2. View my running Jobs

```bash
squeue --me
squeue -u $USER
```

3. Cancel a Job:

```bash
scancel <jobid>
```

4. Show Job Details:

```bash
scontrol show jobs <jobid>
```

5. Show node details:

```bash
scontrol show nodes <nodeid>
```

6. View Job History:

```bash
sacct -u $USER
```

7. Specific Job History:

```bash
sacct -j <jobid>

```

8. Estimate Job Start time

```bash
squeue --start -u $USER
```

9. View the HPCs SLURM configuration:

```bash
scontrol show config | less
```
10. Determine Job efficiency (accurate only after job ends)

```bash
seff <jobid>
```

11. Interactive Job (we are already on a interactive node)
Lets start another for one minute
```bash
salloc -N1 -n2 -p ceres -t 00:01:00
```

12. Batch Script and Batch Job

Use your favorite editor (nano) or use VS code or notepad to write the batch script
```bash

#!/bin/sh 
#SBATCH -N 1
#SBATCH -n 8
#SBATCH -J blast
#SBATCH -o log/blast.o%j
#SBATCH -e log/blast.e%j
cd $SLURM_SUBMIT_DIR
scontrol show job ${SLURM_JOB_ID}
export NT=/reference/data/NCBI/blast/2025-01-16/
module load blast+/2.15.0
blastn -query gene.fna -task blastn -db $NT/nt -num_threads 8 -out gene-nt.bl.out.xml
```
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

#### Additional resource: 
Ceres Job [Script Generator:](https://scinet.usda.gov/support/ceres-job-script#ceres-job-script-generator)

**EXERCISE**
Submit the blastn job and monitor the run:

1. Use `scontrol`
2. You could `ssh` to the compute node on which the jobs is running
3. While in the compute node, use `top` to monitor the run

## 3. Modules and Environments

On Ceres, we have several software packages available as modules and also as isolated environments and apptainer (formerly singularity) images.

**Modules:** Pre-configured software packages that can be loaded when needed.

**Conda Environments:** Isolated "workspaces" for managing software dependencies specific to a project.

**Apptainer:** Portable containers that bundle software and its environment for consistent execution across different systems.


**Modules**: 

Load and run `blast`, check version. Check if there is a module named `hisat2` and `samtools`


```
module load blast+
blastn -version

#blastn: 2.15.0+
# Package: blast 2.15.0, build Oct 19 2023 13:35:57
```

```bash
module spider hisat
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


```bash
module spider sam
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

**Conda Environments**
On Ceres, in order to run `conda`, we have load a module called `miniconda`

* Check your conda environment list
```bash
module load miniconda
conda env list
```
* Check which environment is active currently

```bash
echo $CONDA_DEFAULT_ENV
conda list 
```
* Check details about the environment:

```bash
conda info
```

* Activate a specific environment:

```bash
source activate <name of environemnt>
```

* Deactivate the environment:

```bash
conda deactivate
```

**Apptainer**
 Apptainer (fornerly singulaity) is a container system for HPCs. It let's us package the entire software including dependencies, Operating system, scripts, etc. Like mininconda, it is also available as a module on Ceres.

```bash
module load apptainer
apptainer -h
apptainer version

``` 	
* Build a blast software image
```bash
apptainer build blast_quay.sif docker://quay.io/biocontainers/blast:2.12.0--pl5262h3289130_0

apptainer exec blast_quay.sif blastn -version
#blastn: 2.12.0+
# Package: blast 2.12.0, build Jul 13 2021 09:03:00
```

