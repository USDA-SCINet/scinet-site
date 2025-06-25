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

Some of the Ceres compute nodes have been purchased by individual researchers or research groups. These nodes are available to the owners in the partitions named "priority\*" but can also be used by anyone on the cluster through the "scavenger" partition. The "scavenger" partition increases usage of the priority nodes while still allowing node owners to have guaranteed fast access to priority nodes. The "scavenger" partition has a 3-week time limit, but jobs in this partition will be killed when resources are requested for the jobs in the "priority\*" partitions. Since jobs in the "scavenger" partition can be killed at any moment, running in this partition does not affect job priorities in the "ceres" partition.

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

## Alternative Partitions

{% include table caption="Partitions that allow all users access to priority nodes" content="| Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function |
| --- | --- |--- |--- |--- |--- |
| scavenger | 51 | 96 | 21 days | 3000 MB | priority nodes; scavenger jobs can be killed at any moment |" %}

{% include table caption="Priority partitions available only to those users who purchased nodes" content ="| Name | Nodes | Maximum Simulation Time | Default Memory per Core | Function |
| --- | --- |--- |--- |--- |
| priority | 40 | 2 weeks | 3000 MB | priority nodes with 384GB memory |
| priority-mem | 11 | 2 weeks | 16000 MB | priority nodes with 1.5TB memory |" %}


**At most 2000 cores and 13TB of memory can be used by all simultaneously running jobs per user** in the "ceres" partition. In addition, up to 800 cores and 6TB of memory can be used by jobs in the "scavenger" partition. Additional jobs will be queued but will not start if doing so would exceed those limits. At times these limits can be lowered to prevent a small group of users overtaking the whole cluster. To check current limits for community/low partitions, issue: 
```
sacctmgr show qos memlimit format=MaxTRESPU%30
```

While the following command will show current limits for scavenger partition:
```
sacctmgr show qos 400thread format=MaxTRESPU%30
```

Users that have access to priority partitions are limited by the amount of resources purchased by the group. For example, if a group has purchased one 1.5TB node, then group members cannot use more than an equivalent of one 1.5TB node across all jobs simultaneously running in priority-mem partition even when there are idle nodes in the partition. However, all users on the system can use these idle nodes through the "scavenger" partition. Each group that has purchased nodes on Ceres has a special QOS created for it. To list QOSes for your account, run `sacctmgr -Pns show user format=qos`. The group's QOS needs to be specified when submitting a job to a priority partition via the `-q` salloc/sbatch/srun option. When users submit a job to a priority partition, any node in the partition can be assigned to the job. 

To get current details on all partitions use the following scontrol command:
```
$ scontrol show partitions
```
