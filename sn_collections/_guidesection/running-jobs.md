---
title: Running Application Jobs on Compute Nodes
description: Running Application Jobs on Compute Nodes

categories: [Use]

subnav:
  - title: Partitions or Queues
    url: '#partitions-or-queues'
    subnav:
      - title: Community partitions
        url: '#community-partitions'
      - title: Partitions that allow all users access to priority nodes
        url: '#partitions-that-allow-all-users-access-to-priority-nodes'
      - title: Priority partitions available only to those users who purchased nodes
        url: '#priority-partitions-available-only-to-those-users-who-purchased-nodes'
  - title: Resource Allocation
    url: '#resource-allocation'
    subnav:
      - title: Allocation of Cores
        url: '#allocation-of-cores'
      - title: Allocation of Memory
        url: '#allocation-of-memory'
      - title: Allocation of Time
        url: '#allocation-of-time'
  - title: Slurm accounts
    url: '#slurm-accounts'
  - title: Interactive Mode
    url: '#interactive-mode'
  - title: Requesting the Proper Number of Nodes and Cores
    url: '#requesting-the-proper-number-of-nodes-and-cores'
  - title: Batch Mode
    url: '#batch-mode'
    subnav:
      - title: Serial Job
        url: '#serial-job'
      - title: Running a Simple OpenMP Job
        url: '#running-a-simple-openmp-job'
      - title: Parallel MPI Job
        url: '#parallel-mpi-job'
  - title: Useful SLURM Commands
    url: '#useful-slurm-commands'
  - title: Local Scratch Space 
    url: '#local-scratch-space-'





---


Users will run their applications on the cluster in either interactive mode or in batch mode. Interactive mode ( `salloc`  or  `srun`  command) is familiar to anyone using the command line: the user specifies an application by name and various arguments, hits Enter, and the application runs. However, in interactive mode on a cluster the user is automatically switched from using a login node to using a compute node. This keeps all the intense computation off the login nodes, so that login nodes can have all the resources necessary for managing the cluster. You should always use interactive mode when you are running your application but not using batch mode. **Please do not run your applications on the login nodes, use the interactive mode.**

Interactive mode should only be used when interaction is required, for example when preparing or debugging a pipeline. Otherwise the batch mode should be used. Batch mode requires the user to write a short job script (see examples at section [Batch Mode](#batch-mode)) or use the [Ceres Job Script Generator]({{ site.baseurl }}/support/ceres-job-script).

Ceres uses Simple Linux Utility for Resource Management (SLURM) to submit interactive and batch jobs to the compute nodes. Requested resources can be specified either within the job script or using options with the  `salloc`,  `srun`, or  `sbatch`  commands.

## Partitions or Queues

Compute jobs are run on functional groups of nodes called partitions or queues. Each different partition has different capabilities (e.g. regular memory versus high memory nodes) and resource restrictions (e.g. time limits on jobs). Nodes may appear in several partitions. 

Some of the Ceres compute nodes have been purchased by individual researchers or research groups. These nodes are available to the owners in the priority* partitions but can also be used by anyone on the cluster through \*-low and scavenger* partitions. These partitions have been introduced to increase usage of the priority nodes while still allowing node owners to have guaranteed fast access to priority nodes. All \*-low partitions have 2-hour time limit. Scavenger* partitions have 3-weeks time limit, but jobs in this partition will be killed when resources are requested for the jobs in priority* partitions. Since jobs in the scavenger* partitions can be killed at any moment, running in those partitions does not affect job priorities in the community partitions.

The following table lists partitions. Number of nodes in a specific partition can be adjusted from time to time and be different from the one published in this document.

#### Community partitions

Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |--- |---
short	| 41 | 72,96 | 48 hours | 3000 MB | short simulation queue (default)
medium	| 32 | 72,96 | 7 days | 3000 MB | medium length simulation queue
long	| 11 | 72,96 | 21 days | 3000 MB | long simulation queue
long60	| 2 | 72 | 60 days	| 3000 MB | extra long simulation queue
mem	| 4 | 80 | 7 days	| 16000 MB | large memory queue
longmem	| 1 | 80 | 1000 hours | 16000 MB | long simulation large memory queue
mem768	| 1 | 80 | 7 days | 7900 MB | new node with 768GB of memory
debug	| 2 | 72,96 | 1 hour | 3000 MB | for testing scripts and runs before submitting them

#### Partitions that allow all users access to priority nodes

Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |--- |---
mem768-low | 3	| 80 | 2 hours	| 7900 MB | priority nodes with 768GB of memory
mem-low	| 16 | 80,96 | 2 hours | 16000 MB | priority nodes with 1.5TB of memory
gpu-low	| 1 | 72 | 2 hours | 3000 MB | priority GPU node
brief-low | 92 | 72,96 | 2 hours | 3000 MB | all new nodes with 384GB of memory
scavenger | 49 | 72,80 | 21 days | 3000 MB | non-GPU priority nodes; scavenger jobs can be killed at any moment
scavenger-gpu | 1 | 72 | 21 days | 3000 MB | GPU priority node; jobs can be killed at any moment

#### Priority partitions available only to those users who purchased nodes

Name | Nodes | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |---
priority | 49 | 2 weeks | 3000 MB | priority nodes with 384GB memory
priority-mem | 16 | 2 weeks | 16000 MB | priority nodes with 1.5TB memory
priority-mem768 | 3 | 2 weeks | 7900 MB | priority nodes with 768 GB memory
priority-gpu | 1 | 2 weeks | 3000 MB | priority GPU node


**At most 1440 cores and 5760 GB of memory can be used by all simultaneously running jobs per user** across all community and \*-low partitions. In addition, up to 800 cores and 2100 GB of memory can be used by jobs in scavenger* partitions. Any additional jobs will be queued but won't start. At times these limits can be lowered to prevent a small group of users overtaking the whole cluster.

Users that have access to priority partitions are limited by the amount of resources purchased by the group. For example, if a group has purchased one 768GB node, then group members cannot use more than an equivalent of one 768GB node across all jobs simulteniously running in priority-mem768 partition even when there are idle nodes in the partition. However all users on the system can use these idle nodes through \*-low and scavenger* partitions. Each group that has purchased nodes on Ceres, has a special QOS created for it. To list QOSes for your account, issue "sacctmgr -Pns show user format=qos". The group's QOS needs to be specified when submitting a job to a priority partition via the "-q" salloc/sbatch/srun option. When users submit a job to a priority partition, any node in the partition can be assigned to the job. 

To get current details on all partitions use the following scontrol command:
```
$ scontrol show partitions
```

## Resource Allocation

### Allocation of Cores

On Ceres hyper-threading is turned on. That means that each physical core on a node appears as two separate processors to the operating system and can run two threads. The smallest unit of allocation per job is a single hyper-threaded core, or 2 logical cores, corresponding to specifying  `-n 2`  on  `salloc/srun/sbatch`  commands (i.e. jobs cannot access a single hyper-thread within a core). If a job requests an odd number of cores (`-n 1, -n 3,`...) SLURM will automatically allocate the next larger even number of cores.

### Allocation of Memory

Each allocated core comes with a default amount of memory listed in the table above for different SLURM partitions. If a job attempts to use more memory than what was allocated to a job it will be killed by SLURM. In order to make more memory available to a given job, users can either request the appropriate total number of cores or request more memory per core via the  `--mem-per-cpu`  flag to  `salloc/srun/sbatch`  commands.

For example, to support a job that requires 60GB of memory in the short partition, a user could request 20 logical cores (`-n 20`) with their default allocation of 3000MB or 2 logical cores with 30GB of memory per core via  `--mem-per-cpu 30GB`. Please note that a single hyper-threaded core (2 logical cores) is the smallest unit of allocation. Of course, any other mix of memory per core and total number of cores totaling 60GB would work as well depending on the CPU characteristics of the underlying simulation software.

### Allocation of Time

When submitting interactive or batch job users can specify time limit by using the  `-t`  (`–time=`) option on  `salloc/srun/sbatch`  commands. If the time limit is not explicitly specified, it will be set to the partition's Maximum Simulation Time (see the table above).


## Slurm accounts

To provide better Ceres usage report all Ceres users have been assigned Slurm accounts based on their project groups. If you don't have a project, then your default and only Slurm account is scinet. If you have more than one project, then your default Slurm account is one of the project names. You can specify a different Slurm account when submitting a job by using “-A <account_name>” option on salloc/srun/sbatch command or adding “#SBATCH -A <account_name>” to the job script.
  
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
$ srun --pty -p queue -t hh:mm:ss -n tasks -N nodes /bin/bash -l
```

Option |Value
--- | ---
-p |	queue (partition)
-t	| maximum runtime
-n	| number of cores
-N	| number of nodes

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

`salloc/srun/sbatch`  options | core distribution across nodes
--- | ---
`-n 8`                       | pick any available cores across the cluster (may be on several nodes or not)
`-n 8 -N 8`                  | spread 8 cores across 8 distinct nodes (i.e. one core per node)
`-n 8 --ntasks-per-node=1`   | same as  `-n 8 -N 8`
`-n 8 -N 4`                 |  request 8 cores on 4 nodes (however the spread might be uneven, i.e. one node could end up with 5 cores and one core each for the remaining 3 nodes)
`-n 8 --ntasks-per-node=2`  |  request 8 cores on 4 nodes with 2 cores per node
`-n 8 -N 1`                  | request 8 cores on a single node
`-n 8 --ntasks-per-node=8`   | same as  `-n 8 -N 1`

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

## Useful SLURM Commands

Command | Description | Example
--- | --- | ---
`squeue`	| Gives information about jobs	| `squeue`  or  `squeue -u jane.webb`
`scancel`	| Stop and remove jobs	| `scancel <job id>`  or  `scancel -u jane.webb`
`sinfo`	| Gives information about queues (partitions) or nodes	| `sinfo`  or  `sinfo -N -l`
`scontrol` | Provides more detailed information about jobs, partitions or nodes | `scontrol show job <job id>`  or  `scontrol show partition <partition name>`  or  `scontrol show nodes`
`seff` | Provides resource usage report for a finished job | `seff <job id>`

## Local Scratch Space 

All compute nodes have 1.5 TB of fast local temporary data file storage space supported by SSDs. This local scratch space is significantly faster and supports more input/output operations per second (IOPS) than the mounted filesystems on which the home and project directories reside. A job sets up a unique local space accessible available only with the job script via the environmental $TMPDIR variable. You can use this for any scratch space disk space you need, or if you plan to compute on an existing large data set (such as a sequence assembly job) it might be beneficial to copy all your input data to this space at the beginning of your job, and then do all your computation on $TMPDIR. You must copy any output data you need to keep back to permanent storage before the job ends, since $TMPDIR will be erased upon job exit. The following example shows how to copy data in, and then run from $TMPDIR.

```bash
#!/bin/bash
#SBATCH --job-name="my sequence assembly"   #name of the job submitted
#SBATCH -p short              #name of the queue you are submitting job to
#SBATCH -N 1                  #number of nodes in this job
#SBATCH -n 40                 #number of cores/tasks in this job, you get all 20 cores with 2 threads per core with hyper-threading
#SBATCH -t 01:00:00           #time allocated for this job hours:mins:seconds
#SBATCH --mail-user=emailAddress   #enter your email address to receive emails
#SBATCH --mail-type=BEGIN,END,FAIL #will receive an email when job starts, ends or fails
#SBATCH -o "stdout.%j.%N"     # standard out %j adds job number to output file name and %N adds the node name
#SBATCH -e "stderr.%j.%N"     #optional, it prints out standard error

# start staging data to the job temporary directory in $TMPDIR
MYDIR=`pwd`
/bin/cp –r $MYDIR $TMPDIR/
cd $TMPDIR
 
# add regular job commands like module load and running scientific software
 
# copy output data off of local scratch
/bin/cp -r output $MYDIR/output
 
# If you do not know the output names, you can issue:
#   rsync –a $TMPDIR/*  $MYDIR/
# which will only copy back new or changed files, but rsync takes longer.
 
#End of file
```  

