---
title: Resource Allocation
description: Allocation of job resources
excerpt: Allocation of cores, memory, and time on Ceres

categories: [Use]
order_number: 45
#published: false

subnav:
  - title: Allocation of Cores
    url: '#allocation-of-cores'
  - title: Allocation of Memory
    url: '#allocation-of-memory'
  - title: Allocation of Time
    url: '#allocation-of-time'

---

{% include images_path %}





## Allocation of Cores

On Ceres hyper-threading is turned on. That means that each physical core on a node appears as two separate processors to the operating system and can run two threads. The smallest unit of allocation per job is a single hyper-threaded core, or 2 logical cores, corresponding to specifying  `-n 2`  on  `salloc/srun/sbatch`  commands (i.e. jobs cannot access a single hyper-thread within a core). If a job requests an odd number of cores (`-n 1, -n 3,`...) SLURM will automatically allocate the next larger even number of cores.

## Allocation of Memory

Each allocated core comes with a default amount of memory listed in on the [Partitions or Queues page](/guides/use/partitions-queues) for different SLURM partitions. If a job attempts to use more memory than what was allocated to a job it will be killed by SLURM. In order to make more memory available to a given job, users can either request the appropriate total number of cores or request more memory per core via the  `--mem-per-cpu`  flag to  `salloc/srun/sbatch`  commands.

For example, to support a job that requires 60GB of memory in the short partition, a user could request 20 logical cores (`-n 20`) with their default allocation of 3000MB or 2 logical cores with 30GB of memory per core via  `--mem-per-cpu 30GB`. Please note that a single hyper-threaded core (2 logical cores) is the smallest unit of allocation. Of course, any other mix of memory per core and total number of cores totaling 60GB would work as well depending on the CPU characteristics of the underlying simulation software.

## Allocation of Time

When submitting interactive or batch job users can specify time limit by using the  `-t`  (`–time=`) option on  `salloc/srun/sbatch`  commands. If the time limit is not explicitly specified, it will be set to the partition's Maximum Simulation Time (see the tables on the [Partitions or Queues](/guides/use/partitions-queues) page).
