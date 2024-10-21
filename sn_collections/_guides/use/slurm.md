---
title: SLURM Resource Manager
description: Using SLURM to manage application jobs on the HPC

categories: [Use]
order_number: 40

redirect_from: 
  - /guides/use/running-jobs

subnav:
  - title: Interactive Mode
    url: '#interactive-mode'
  - title: Requesting the Proper Number of Nodes and Cores
    url: '#requesting-the-proper-number-of-nodes-and-cores'
  - title: Batch Mode
    url: '#batch-mode'
  - title: Recurring Jobs - Scrontab
    url: '#recurring-jobs---scrontab'
  - title: Useful SLURM Commands
    url: '#useful-slurm-commands'

---

{% include images_path %}




Ceres uses Simple Linux Utility for Resource Management (SLURM) to submit interactive and batch jobs to the compute nodes. Requested resources can be specified either within the job script or using options with the  `salloc`,  `srun`, or  `sbatch`  commands.<!--excerpt-->

Users will run their applications on the cluster in either interactive mode or in batch mode. Interactive mode ( `salloc`  or  `srun`  command) is familiar to anyone using the command line: the user specifies an application by name and various arguments, hits Enter, and the application runs. However, in interactive mode on a cluster the user is automatically switched from using a login node to using a compute node. This keeps all the intense computation off the login nodes, so that login nodes can have all the resources necessary for managing the cluster. You should always use interactive mode when you are running your application but not using batch mode. **Please do not run your applications on the login nodes, use the interactive mode.**

Interactive mode should only be used when interaction is required, for example when preparing or debugging a pipeline. Otherwise the batch mode should be used. Batch mode requires the user to write a short job script (see examples at section [Batch Mode]({{ site.baseurl }}/guides/use/slurm#batch-mode)) or use the [Ceres Job Script Generator]({{ site.baseurl }}/support/ceres-job-script).


## Slurm Accounts

 All users have been assigned Slurm accounts based on their project groups. If you don't have a project, then your default and only Slurm account is sandbox. If you have more than one project, then your default Slurm account is one of the project names. You can specify a different Slurm account when submitting a job by using “-A <account_name>” option on salloc/srun/sbatch command or adding “#SBATCH -A <account_name>” to the job script.
  
To see all your Slurm accounts and your default account at any time, use “sacctmgr -Pns show user format=account,defaultaccount”
  
You can change your default Slurm account running slurm-account-selector.sh on the login node.


## Interactive Mode

A user can request an interactive session on Ceres using SLURM's  `srun`  or  `salloc`  commands. The simplest way to request an interactive job is by entering the command  `salloc`:
```
$ salloc
```

which will place you in an interactive shell. This interactive shell has a duration of 2 days and will request a single hyper-threaded core (2 logical cores) with 6000 MB of allocated memory on one of the compute nodes.

To prevent users from requesting interactive nodes and then not using them, there is an inactivity timeout set up. If there is no command running on a node for an hour and a half, the job will be terminated. Otherwise the interactive job is terminated when the user types exit or the allocated time runs out.

For more fine grained control over the interactive environment you can use the  `srun`  command. Issue the  `srun`  command from a login node. Command syntax is:
```
$ srun --pty -p queue -t hh:mm:ss -n tasks -N nodes -C constraints /bin/bash -l
```

{: .usa-table .usa-table--compact }
Option |Value
--- | ---
-p |	queue (partition)
-t	| maximum runtime
-n	| number of cores
-N	| number of nodes
-C  | constraints (optional)

The following example commands illustrate an interactive session where the user requests 1 hour in the short queue, using 1 compute node and 20 logical cores (half of the cores available on the original compute node), using the bash shell, followed by a BLAST search of a protein database.

Start the interactive session:
```
$ srun --pty -p short -t 01:00:00 -n 20 -N 1 /bin/bash -l
```

Load NCBI-BLAST+ on the compute node:
```
$ module load blast+
```

Uncompress the nr.gz FASTA file that contains your sequence database:
```
$ gzip -d nr.gz
```

Generate the blast database:

```
$ makeblastdb -in nr -dbtype prot
```

Search the nr database in serial mode with a set of queries in the FASTA file blastInputs.fa:

```
$ blastp -db nr -query blastInputs.fa -out blastout
```

Return to the login node:

```
$ exit
```

## Requesting the Proper Number of Nodes and Cores

SLURM allows you to precisely choose the allocation of compute cores across nodes. Below are a number of examples that show different ways to allocate an 8 core job across the Ceres cluster

{: .usa-table .usa-table--compact }
`salloc/srun/sbatch`  options | core distribution across nodes
--- | ---
`-n 8`                       | pick any available cores across the cluster (may be on several nodes or not)
`-n 8 -N 8`                  | spread 8 cores across 8 distinct nodes (i.e. one core per node)
`-n 8 --ntasks-per-node=1`   | same as  `-n 8 -N 8`
`-n 8 -N 4`                 |  request 8 cores on 4 nodes (however the spread might be uneven, i.e. one node could end up with 5 cores and one core each for the remaining 3 nodes)
`-n 8 --ntasks-per-node=2`  |  request 8 cores on 4 nodes with 2 cores per node
`-n 8 -N 1`                  | request 8 cores on a single node
`-n 8 --ntasks-per-node=8`   | same as  `-n 8 -N 1`

## Resource Constraints

Slurm permits you to restrict your jobs to only run on nodes with specific hardware features using constraints. This is generally not necessary and can result in longer queue times on jobs while waiting for appropriate hardware to be available.  However, hardware feature constraints are available for those users with software that requires it.

If you have a software package that requires using constraints, you can specify the requirement with interactive jobs by adding the `-C constraint` option to your `salloc` or `srun` command.  For example:
```bash
salloc -n 1 -n 4 -t 60 -C INTEL
```
launches an interactive sessions for 60 minutes on a single node with an Intel processor with access to four CPU cores.  The same limitation to only run on Intel processors can be achieved in an sbatch script by adding the line:
```bash
#SBATCH -C INTEL
```
For a complete list of available hardware feature constraints, please see the [Ceres hardware guide]({{ site.baseurl }}/guides/resources/ceres#technical-overview).

## Batch Mode
### Serial Job

Jobs can be submitted to various partitions or queues using SLURM's `sbatch` command. The following is an example of how to run a blastp serial job using a job script named "blastSerialJob.sh". The content of blastSerialJob.sh is as follows:
```bash
#!/bin/bash
#SBATCH --job-name="blastp"   #name of this job
#SBATCH -p short              #name of the partition (queue) you are submitting to
#SBATCH -N 1                  #number of nodes in this job
#SBATCH -n 40                 #number of cores/tasks in this job, you get all 20 physical cores with 2 threads per core with hyper-threading
#SBATCH -t 01:00:00           #time allocated for this job hours:mins:seconds
#SBATCH --mail-user=emailAddress   #enter your email address to receive emails
#SBATCH --mail-type=BEGIN,END,FAIL #will receive an email when job starts, ends or fails
#SBATCH -o "stdout.%j.%N"     # standard output, %j adds job number to output file name and %N adds the node name
#SBATCH -e "stderr.%j.%N"     #optional, prints our standard error
date                          #optional, prints out timestamp at the start of the job in stdout file
module load blast+            #loading latest NCBI BLAST+ module
blastp -db nr -query blastInputs -out blastout  # protein blast search against nr database
date                          #optional, prints out timestamp when the job ends
#End of file
```

Launch the job like this:
```
$ sbatch blastSerialJob.sh
```

### Running a Simple OpenMP Job

The following example will demonstrate how to use threads. We will use the following OpenMP C code to print "hello world" on each thread. First copy and paste this code into a file, e.g. "testOpenMP.c".
```
#include <omp.h>
#include <stdio.h>
int main(int argc, char* argv[]){
 int id;
 #pragma omp parallel private(id)
  {
  id=omp_get_thread_num();
  printf("%d: hello world \n",id);
 }
 return 0;
}
```

Now load the gcc module and compile the code :
```
$ module load gcc
$ gcc testOpenMP.c -fopenmp -o testOpenMP
```

Now create a batch job script (OMPjob.sh) to test number of threads you requested:
```bash
#!/bin/bash
#SBATCH --job-name=OpenMP
#SBATCH -p short
#SBATCH -N 1
#SBATCH -n 20
#SBATCH --threads-per-core=1
#SBATCH -t 00:30:00
#SBATCH -o "stdout.%j.%N"
#SET the number of openmp threads
export OMP_NUM_THREADS=20
./testOpenMP
# End of file
```

Launch the job using the batch script like this:
```
$ sbatch OMPjob.sh
```

The stdout* file from the above job script should contain 20 lines with "hello world" from each thread.

### Parallel MPI Job

The following is the example to run Hybrid RAxML which uses both MPI and PTHREADS. It will start 2 MPI processes (one per node) and each process will run 40 threads (one thread per logical core).

Create a SLURM script like this (for example, RAxMLjob.sh, but use your own alignment file rather than "align.fasta"):
```bash
#!/bin/bash
#SBATCH --job-name=raxmlMPI
#SBATCH -p short
#SBATCH -N 2
#SBATCH --ntasks-per-node=40
#SBATCH -t 01:00:00
#SBATCH -o "stdout.%j.%N"
# We requested 2 nodes, 40 logical cores per node for a total of 80 logical cores for this job
module load raxml            #loading latest raxml module, which will also load an MPI module
mpirun -np 2 raxmlHPC-MPI-AVX -T 40 -n raxmlMPI -f a -x 12345 -p 12345 -m GTRGAMMA -# 100 -s align.fasta
# End of file
```

And execute it with sbatch:
```
$ sbatch RAxMLjob.sh
```

## Recurring Jobs - Scrontab

**scrontab** is slurm-managed crontab. It is used to submit recurring jobs via slurm scheduler. 

scrontab uses syntax that is similar to [crontab](https://man7.org/linux/man-pages/man5/crontab.5.html)

### Setup
Issue `scrontab -e` to edit scrontab. 

Lines starting with `#SCRON` indicate a recurring batch job. It is equivalent to `#SBATCH` in normal batch jobs and users can use the `sbatch` options. 

scrontab uses the same syntax for date and time specifiers as cron. Each line has five fields that have the following meanings:

{: .usa-table .usa-table--compact }
|field| allowed values|
|-----|--------------|
|minute| 0-59
|hour| 0-23
|day of month |1-31
|month| 1-12 (or name)
|day of week| 0-7 (0 and 7 are Sunday, or use name)

The entries follow the same syntax as cron. Websites like [https://crontab.cronhub.io/](https://crontab.cronhub.io/) provide useful information on when your job will be executed. 

### Basics

#### Submit job
<pre>
$ scrontab FILE.job
</pre>

#### Check scrontab status
<pre>
$ scrontab -l
</pre>

#### Clear scrontab
<pre>
$ scrontab -r
</pre>

#### Check job queue 
<pre>
$ squeue
</pre>

#### Cancel job
<pre>
$ scancel ID
</pre>

#### Example jobs

A python script that runs every 30 minutes and requests 1 node with 4 cores and a timelimit of 1 hour. 
<pre>
#SCRON -t 1:00:00
#SCRON -o $HOME/JOB_OUTPUT.txt
#SCRON -N 1
#SCRON -n 4
30 * * * * python $HOME/PYTHON_SCRIPT.py
</pre>

Runs every hour with a timelimit of 1 minute.
```
DIR=/home/user1
#SCRON -p high
#SCRON -A sub1
#SCRON -t 1:00
@hourly $DIR/date.printer.job
```
Note that the default working directory is `$HOME` and can be modified with either setting `DIR` variable or with `#SCRON --chdir`

### Helpful links

* [https://slurm.schedmd.com/scrontab.html](https://slurm.schedmd.com/scrontab.html)

## Useful SLURM Commands

{: .usa-table .usa-table--compact }
Command | Description | Example
--- | --- | ---
`squeue`	| Gives information about jobs	| `squeue`  or  `squeue -u jane.webb`
`scancel`	| Stop and remove jobs	| `scancel <job id>`  or  `scancel -u jane.webb`
`sinfo`	| Gives information about queues (partitions) or nodes	| `sinfo`  or  `sinfo -N -l`
`scontrol` | Provides more detailed information about jobs, partitions or nodes | `scontrol show job <job id>`  or  `scontrol show partition <partition name>`  or  `scontrol show nodes`
`seff` | Provides resource usage report for a finished job | `seff <job id>`
