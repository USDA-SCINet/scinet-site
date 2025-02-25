---
title: New "ceres" partition

---
During the February 2025 maintenance, a new partition, named “ceres”, was added to the cluster. This new partition includes all community nodes, and its addition is the first step towards simplifying the community partitions on Ceres ("short", "medium", "long", "mem", "mem768", and "debug"). In the future, some or all of the legacy community partitions will be removed. <!--excerpt--> This change will bring several important benefits: 

* Placing  Ceres nodes into fewer partitions will result in shorter wait times and better cluster utilization. 
* Ceres will be easier and less confusing to use. 
* The new “ceres” partition is analogous to the “atlas” partition on Atlas and will help make the user experience on both systems more similar. 

At this time, all legacy partitions on Ceres are still available and existing job scripts will continue working without modification. However, we recommend switching to the “ceres” partition as soon as possible. 

The new “ceres” partition has a maximum job time of 3 weeks and a default job time of 2 hours. The shorter default time will help avoid very long wait times in the queue due to accidentally submitting jobs requesting the partition’s maximum job time (which is the default on Ceres’ legacy partitions). This new default behavior on the “ceres” partition will ultimately improve the user experience on Ceres. However, it also means that if the work you do on Ceres requires more than 2 hours, you will need to explicitly request more time.
