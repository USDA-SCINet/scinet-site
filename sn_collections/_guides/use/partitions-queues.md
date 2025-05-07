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

Some of the Ceres compute nodes have been purchased by individual researchers or research groups. These nodes are available to the owners in the partitions named "priority\*" but can also be used by anyone on the cluster through the partitions named "\*-low" and "scavenger\*". These partitions increase usage of the priority nodes while still allowing node owners to have guaranteed fast access to priority nodes. All "\*-low" partitions have a 2-hour time limit. The "scavenger\*" partitions have a 3-week time limit, but jobs in this partition will be killed when resources are requested for the jobs in the "priority\*" partitions. Since jobs in the "scavenger\*" partitions can be killed at any moment, running in those partitions does not affect job priorities in the community partitions.

## The "ceres" partition

During the February 2025 maintenance, a new partition, named “ceres”, was added to the cluster. This new partition includes all community nodes, and its addition is the first step towards simplifying the community partitions on Ceres ("short", "medium", "long", "long60", "mem", "longmem", "mem768", and "debug"). In the future, some or all of the legacy community partitions will be removed. This change will bring several important benefits: 

* Placing  Ceres nodes into fewer partitions will result in shorter wait times and better cluster utilization. 
* Ceres will be easier and less confusing to use. 
* The new “ceres” partition is analogous to the “atlas” partition on Atlas and will help make the user experience on both systems more similar. 

At this time, all legacy partitions on Ceres are still available and existing job scripts will continue working without modification. However, we recommend switching to the “ceres” partition as soon as possible. 

The new “ceres” partition has a maximum job time of 3 weeks and a default job time of 2 hours. The shorter default time will help avoid very long wait times in the queue due to accidentally submitting jobs requesting the partition’s maximum job time (which is the default on Ceres’ legacy partitions). This new default behavior on the “ceres” partition will ultimately improve the user experience on Ceres. However, it also means that if the work you do on Ceres requires more than 2 hours, you will need to explicitly request more time.


## Legacy community partitions
*Please see the above information regarding the new partition "ceres".*

The following table lists available community partitions. Number of nodes in a specific partition can be adjusted from time to time and may differ from the table.

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

## Partitions that allow all users access to priority nodes

Name | Nodes | Logical Cores per Node | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |--- |---
mem768-low | 3	| 80 | 2 hours	| 7900 MB | priority nodes with 768GB of memory
mem-low	| 16 | 80,96 | 2 hours | 16000 MB | priority nodes with 1.5TB of memory
brief-low | 92 | 72,96 | 2 hours | 3000 MB | all new nodes with 384GB of memory
scavenger | 49 | 72,80 | 21 days | 3000 MB | priority nodes; scavenger jobs can be killed at any moment

## Priority partitions available only to those users who purchased nodes

Name | Nodes | Maximum Simulation Time | Default Memory per Core | Function
--- | --- |--- |--- |---
priority | 49 | 2 weeks | 3000 MB | priority nodes with 384GB memory
priority-mem | 16 | 2 weeks | 16000 MB | priority nodes with 1.5TB memory
priority-mem768 | 3 | 2 weeks | 7900 MB | priority nodes with 768 GB memory


**At most 2000 cores and 6TB of memory can be used by all simultaneously running jobs per user** across all community and "\*-low" partitions. In addition, up to 800 cores and 3TB of memory can be used by jobs in the "scavenger\*" partitions. Additional jobs will be queued but will not start if doing so would exceed those limits. At times these limits can be lowered to prevent a small group of users overtaking the whole cluster. To check current limits for community/low partitions, issue: 
```
sacctmgr show qos memlimit format=MaxTRESPU%30
```

While the following command will show current limits for scavenger* partitions:
```
sacctmgr show qos 400thread format=MaxTRESPU%30
```

Users that have access to priority partitions are limited by the amount of resources purchased by the group. For example, if a group has purchased one 768GB node, then group members cannot use more than an equivalent of one 768GB node across all jobs simultaneously running in priority-mem768 partition even when there are idle nodes in the partition. However, all users on the system can use these idle nodes through the "\*-low" and "scavenger\*" partitions. Each group that has purchased nodes on Ceres has a special QOS created for it. To list QOSes for your account, run `sacctmgr -Pns show user format=qos`. The group's QOS needs to be specified when submitting a job to a priority partition via the `-q` salloc/sbatch/srun option. When users submit a job to a priority partition, any node in the partition can be assigned to the job. 

To get current details on all partitions use the following scontrol command:
```
$ scontrol show partitions
```
