---
title: Scratch Space
description: Using local scratch space

categories: [Use]
order_number: 50

---

{% include images_path %}





All compute nodes have 1.5 TB of fast local temporary data file storage space supported by SSDs. This local scratch space is significantly faster and supports more input/output operations per second (IOPS) than the mounted filesystems on which the home and project directories reside.<!--excerpt--> A job sets up a unique local space accessible available only with the job script via the environmental $TMPDIR variable. You can use this for any scratch space disk space you need, or if you plan to compute on an existing large data set (such as a sequence assembly job) it might be beneficial to copy all your input data to this space at the beginning of your job, and then do all your computation on $TMPDIR. You must copy any output data you need to keep back to permanent storage before the job ends, since $TMPDIR will be erased upon job exit. The following example shows how to copy data in, and then run from $TMPDIR.

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

