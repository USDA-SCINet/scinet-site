---
title: Partitions or Queues
description: Partitions or Queues

categories: [Use]
order_number: 20

subnav:
  - title: The "ceres" partition
    url: '#the-ceres-partition'
  - title: Legacy community partitions
    url: '#legacy-community-partitions'
  - title: Partitions that allow all users access to priority nodes
    url: '#partitions-that-allow-all-users-access-to-priority-nodes'
  - title: Priority partitions available only to those users who purchased nodes
    url: '#priority-partitions-available-only-to-those-users-who-purchased-nodes'

---

{% include images_path %}




Compute jobs are run on functional groups of nodes called partitions or queues. Each partition has different capabilities (e.g. regular memory versus high memory nodes) and resource restrictions (e.g. time limits on jobs). Nodes may appear in several partitions.<!--excerpt--> 

Some of the Ceres compute nodes have been purchased by individual researchers or research groups. These nodes are available to the owners in the partitions named "priority\*" but can also be used by anyone on the cluster through the "scavenher" partition. The "scavenger" partition increases usage of the priority nodes while still allowing node owners to have guaranteed fast access to priority nodes. The "scavenger" partition has a 3-week time limit, but jobs in this partition will be killed when resources are requested for the jobs in the "priority\*" partitions. Since jobs in the "scavenger" partition can be killed at any moment, running in this partition does not affect job priorities in the "ceres" partition.

## The "ceres" partition

During the February 2025 maintenance, a new partition, named “ceres”, was added to the cluster. This new partition includes all community nodes. The default job time in the “ceres” partition is 2 hours. To specify a different time limit, use “--time”, e.g.:

```
#SBATCH --time=1-00:00:00
```

The maximum time limit depends on the QOS used to submit a job. The default QOS has 3 weeks time limits. "debug" QOS has a 30 minutes time limit. Jobs submitted with “-q debug” on the slurm command or with "#SBATCH -q debug" in the job script file will have higher priority. In addition, "long" QOS allows to run jobs up to 60 days long. This QOS is limited to 144 cores across all running jobs. 


## Partitions that allow all users access to priority nodes

Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |--- |---
scavenger | 87 | 72,80 | 21 days | 3000 MB | priority nodes; scavenger jobs can be killed at any moment

## Priority partitions available only to those users who purchased nodes

Name | Nodes | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |---
priority | 40 | 2 weeks | 3000 MB | priority nodes with 384GB memory
priority-mem | 11 | 2 weeks | 16000 MB | priority nodes with 1.5TB memory


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
