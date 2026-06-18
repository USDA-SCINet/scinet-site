---
title: Partitions or Queues
description: Partitions or Queues

categories: [Use]
order_number: 20

subnav:
  - title: The "ceres" partition
    url: '#the-ceres-partition'
  - title: Alternative Partitions
    url: '#alternative-partitions'

---

{% include images_path %}




Compute jobs are run on functional groups of nodes called partitions or queues. Partitions can have different capabilities (e.g. regular memory versus high memory nodes) and resource restrictions (e.g. time limits on jobs). Nodes may appear in several partitions.<!--excerpt--> 

The "scavenger" partition has a 3-week time limit. Since jobs in the "scavenger" partition can be killed at any moment, running in this partition does not affect job priorities in the "ceres" partition.

## The "ceres" partition

During the February 2025 maintenance, a new partition, named "ceres", was added to the cluster. This new partition includes all community nodes and replaces the previous multitude of community partitions ("short", "medium", "long", "long60", etc.). This change has several important benefits: 

* Placing Ceres nodes into fewer partitions results in shorter wait times and better cluster utilization. 
* A simpler partition scheme makes Ceres easier and less confusing to use. 
* The new "ceres" partition is analogous to the "atlas" partition on Atlas and makes the user experience on both systems more similar. 

The "ceres" partition has a maximum job time of 3 weeks and a default job time of 2 hours. The shorter default time will help avoid very long wait times in the queue due to accidentally submitting jobs requesting the partition's maximum job time (which was the default on Ceres' legacy partitions). This new default behavior on the "ceres" partition will ultimately improve the user experience on Ceres. However, it also means that if the work you do on Ceres requires more than 2 hours, you will need to explicitly request more time.

To specify a different time limit, use Slurm's `--time` option. For example, to request a maximum job time of 1 day:

```
#SBATCH --time=1-00:00:00
```

For more information about how to use `--time`, please see the [official Slurm documentation](https://slurm.schedmd.com/sbatch.html#OPT_time).

The maximum time limit also depends on the QOS ("quality of service") used to submit a job. There are currently three options:

* The default QOS has a maximum job time of 3 weeks. In other words, you cannot request more than 3 weeks using `--time`.
* The "debug" QOS has a maximum job time ot 30 minutes. However, jobs running with the "debug" QOS will have higher priority.
* The "long" QOS allows jobs to run for up to 60 days, but this QOS is limited to 144 cores across all running jobs.

To use a non-default QOS ("debug" or "long"), use Slurm's [`--qos` option](https://slurm.schedmd.com/sbatch.html#OPT_qos). For example:
```
#SBATCH --qos=debug
```

## Alternative Partition

{% include table caption= content="| Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function |
| --- | --- |--- |--- |--- |--- |
| scavenger | 51 | 96 | 21 days | 3000 MB | scavenger jobs can be killed at any moment |" %}


**At most 2000 cores and 13TB of memory can be used by all simultaneously running jobs per user** in the "ceres" partition. In addition, up to 800 cores and 6TB of memory can be used by jobs in the "scavenger" partition. Additional jobs will be queued but will not start if doing so would exceed those limits. At times these limits can be lowered to prevent a small group of users overtaking the whole cluster. To check current limits for community/low partitions, issue: 
```
sacctmgr show qos memlimit format=MaxTRESPU%30
```

While the following command will show current limits for scavenger partition:
```
sacctmgr show qos 400thread format=MaxTRESPU%30
```

All users on the system can use these idle nodes through the "scavenger" partition. 
To get current details on all partitions use the following scontrol command:
```
$ scontrol show partitions
```
