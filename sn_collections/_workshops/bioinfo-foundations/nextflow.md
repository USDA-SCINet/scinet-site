---
title: Automating Bioinformatics Pipelines with Nextflow
type: workshop
display: basic
provider: [ISU, SCINet Office]
hideprovider: true
description: This hands-on workshop introduces Nextflow, a workflow management system built for scalable, reproducible computational pipelines. 
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/


layout_type: workshop
sessions:
  - session:
    time: 1 – 5 PM ET
    date: 2026-07-07
    end_date: 2026-07-09
    multiday: Jul 7 & 9
    registration:
      url: https://forms.office.com/g/xU75HyHQKi

tags: bioinformatics


---

This hands-on workshop introduces Nextflow, a workflow management system built for scalable, 
reproducible computational pipelines that can run seamlessly across laptops, HPC clusters, and cloud environments.
Starting from simple examples, we'll progressively build toward a real-world bioinformatics pipeline — 
learning how Nextflow's dataflow programming model and channel-based design enable elegant parallel processing of multiple files, 
portable integration of tools via containers and modules, and production-ready pipelines.<!--excerpt-->


**No prior Nextflow experience is required.** Basic command-line familiarity (navigating directories, running a program, editing a file) is assumed.


---

## Tutorial Setup Instructions  

Steps to prepare for the tutorial session:  

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). 

For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).

</li> 
<li class="usa-process-list__item usa-prose" markdown="1">
  
{:.usa-process-list__heading}
### Set up your working directory

* Open a command-line session by clicking on "Clusters" -> "Ceres Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres' login node.

* Create a workshop working directory (and the `pipelines/bin/` subdirectory you'll write scripts into) by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  

  ```bash
  mkdir -p /90daydata/shared/$USER/nextflow 
  cd /90daydata/shared/$USER/nextflow
  mkdir -p pipelines/bin
  ```
  {:.copy-code}

* Create a symbolic link to the tutorial data
  
  ```bash
  ln -s  /project/scinet_workshop2/foundations_bioinf_2026/nextflow_data/* .
  ls 
  ```
  {:.copy-code}

  You should see a small set of paired-end FASTQ files (`*_R1.fastq.gz` / `*_R2.fastq.gz`).

</li>
<li class="usa-process-list__item usa-prose" markdown="1">
  
{:.usa-process-list__heading}
### Launch VS Code

* Under the Interactive Apps menu, select VS Code
* Specify the following input values on the page:
  * Account: scinet_workshop2
  * Queue: ceres
  * QoS: 400thread
  * Number of cores: 16
  * Memory required: 50G
  * Number of hours: 6
  * Optional Slurm Parameters: `--reservation=foundations_workshop`
  * Working Directory:  `/90daydata/shared/$USER/nextflow`
* Click Launch. The screen will update to the *Interactive Sessions* page. When your VS Code session is ready, the top card will update from *Queued* to *Running* and a *Connect to VS Code* button will appear. Click *Connect to VS Code.*

</li>
</ol>

-----
## An Introduction to Nextflow

*Instructors: Viswanathan Satheesh · Siva Chudalayandi*

### Learning Objectives

By the end of this workshop, you will be able to:

1. **Write Nextflow pipelines from scratch** — defining processes, channels, and workflows, and wiring command-line tools together.
2. **Process many files in parallel automatically** — letting Nextflow handle scheduling, isolation, and failure recovery instead of hand-written loops.
3. **Make pipelines configurable, portable, and reproducible** — using parameters, configuration files, profiles, and software environments (modules/containers) so Nextflow pipelines can easily be shared and run anywhere.

### What You'll Build

Across the two days you'll progress from a one-line "hello world" process to a complete genomics pipeline:

```
Raw reads ──► FastQC (quality control)
          └─► Fastp (adapter trimming) ──► ReadLenDist (read-length analysis)
                                       └─► FastQC on trimmed reads
```

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Load Nextflow

```bash
module load nextflow/25.04.6
nextflow -version
```

You're ready to go.

---

**Naming Conventions (Read This First!)**

Nextflow code mixes several naming styles on purpose: the style of a name tells you *what kind of thing* it is. Knowing the conventions before you start makes every script on this page easier to read. You'll see all of these today.

{% include table caption="Naming conventions" content="| Thing                          | Convention                                                        | Examples (used in this workshop)                                   |
| -------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Process names**              | `PascalCase` (capitalized words, no spaces)                       | `FastQC`, `Fastp`, `ReadLenDist`, `FastQC_Trimmed`                |
| **Parameters**                 | `snake_case`, lowercase with underscores, always via `params.`    | `params.reads`, `params.output_qc`, `params.output_trim`          |
| **Channels & variables**       | `snake_case`, often with a `_ch` suffix                           | `fastqc_ch`, `read_pairs`, `trimmed_output_ch`                    |
| **Script / config files**      | `.nf` for pipelines, `nextflow.config` for config                 | `10_implementation_full.nf`, `nextflow.config`                    |
| **Output / publish directories** | numbered prefix so results sort in pipeline order               | `01_data/`, `02_illuminaQC/`, `03_trimmed/`, `04_read_len_dist/`  |
| **Paired-end read files**      | shared sample name + `_{R1,R2}` token                             | `bio_sample_01_R1.fastq.gz`, `bio_sample_01_R2.fastq.gz`          |" %}

> 💡 The numbered output directories (`01_…`, `02_…`) are *our* workshop convention, not a Nextflow rule — they keep results in the order the pipeline produces them. Process and parameter casing, however, are strong community conventions you should follow.

**The one gotcha: `$variable` is Nextflow, `\$variable` is bash.**

Inside a process `script:` block, a bare `$name` is a **Nextflow** variable (an input or param), substituted *before* the command runs. To use a **bash/shell** variable, you must escape the dollar sign as `\$name`:

```nextflow
script:
"""
echo "$sample_id"        # Nextflow variable  → filled in by Nextflow
echo "\$HOSTNAME"        # shell variable      → evaluated by bash at runtime
"""
```

Forgetting the backslash is one of the most common Nextflow errors — Nextflow will try (and fail) to resolve a shell variable as one of its own.

> 💡 **Naming tip for your own pipelines:** name a process after *what it does* (`AlignReads`, not `Step3`), and name a channel after *what it carries* (`aligned_bams_ch`, not `out2`). Future-you will thank you.

---


**Goal for today:** understand the Nextflow building blocks — processes, the work directory, publishing outputs, inputs, and parameters — by writing five small pipelines. We'll introduce these concepts one at a time, building on the previous scripts as we go.

**Why Nextflow?**

A typical analysis run by hand means bash scripts with nested loops, manual file tracking, custom parallelization, and results that are hard to reproduce. Nextflow takes over task parallelization, data-flow management, failure recovery and checkpointing, and tool integration — so your code is as clean as possible and your results are reproducible. The key idea: **Nextflow doesn't care what your tools do; it manages how data flows between them.**

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Hello World: your first process

**Concept:**   
Nextflow scripts are built from two kinds of components — **processes** (what to do) and **workflows** (which processes to run, and in what order).

The glue between a process and a workflow is the **channel**. A channel is an asynchronous stream — think of it as a queue — of data items that flow through your pipeline. Channels are *how data moves* in Nextflow, and there are only two rules to remember:

- **Every process output is emitted into a channel.**
- **Every process input is read from a channel.**

So a channel is the "wiring" that connects one step to the next: one process's output channel becomes the next process's input channel. In our first script, the `hello` process emits its text into an output channel, and the `.view()` operator simply prints whatever is flowing through a channel (handy for debugging). Right now we're only looking at a channel *coming out* of a process — later, in the FastQC section, you'll see the other side: building a channel of input files and feeding it *into* a process.


#### Execution
* **Create a file:** 

  ```bash
  touch pipelines/01_hello_screen.nf
  ```
  {:.copy-code}

* **Script contents:**
  Open `01_hello_screen.nf` in the VS Code editor and copy and paste the script below:
  
  ```bash
  #!/usr/bin/env nextflow

  /*
   * Use echo to print a message to the screen
   */

  process hello {

      output:
      stdout

      script:
      """
      echo "Welcome to the world of Nextflow!"
      """
  }

  workflow {
      // Run the hello process
      hello().view()
  }
  ```
  {:.copy-code}

* **Run the script:**

  ```bash
  nextflow run pipelines/01_hello_screen.nf
  ```
  {:.copy-code}


#### What to expect

```
executor >  local (1)
[9c/4c931d] process > hello [100%] 1 of 1 ✔
Welcome to the world of Nextflow!
```


#### Reading the output
- `[9c/4c931d]` is the task hash → the work subdirectory `work/9c/4c931d…/`.
- `1 of 1 ✔` means one task ran and succeeded.
- The last line is the process's stdout, shown because of `.view()`.


#### Your turn
Change the message in the `script:` block and re-run. Where does the new text appear?

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Writing to files & the work directory

**Concept:**   
Nextflow pipelines usually save results to files. Switch `output: stdout` to `output: path 'result.txt'` and use a bash redirect operator (`>`) inside the script to write to the file. Every task runs in its own isolated **work directory**.


#### Execution
* **Create a file:** 

  ```bash
  touch pipelines/02_hello_redirect.nf
  ```
  {:.copy-code}

* **Script contents:**
  Open `02_hello_redirect.nf` in the VS Code editor and copy and paste the script below:

  ```nextflow
  #!/usr/bin/env nextflow

  /*
  * Hello redirect: write greeting to file
  */

  process hello {
      output:
      path 'result.txt'

      script:
          """
          echo "Welcome to the world of Nextflow!" > result.txt
          """
  }

  workflow {
      hello()
  }
  ```
  {:.copy-code}

  ```bash
  nextflow run pipelines/02_hello_redirect.nf
  tree -a work        # or: find work -type f
  ```
  {:.copy-code}


#### What to expect
No text is printed (the result was written to a file instead of the console). Inside `work/xx/xxxx…/` you'll find `result.txt` alongside Nextflow's bookkeeping files.


#### Reading the output
**the `.command.*` files:**
- `.command.sh` — the exact script Nextflow ran (great for debugging).
- `.command.out` / `.command.err` — stdout / stderr.
- `.exitcode` — `0` means success.


#### Your turn
Open `.command.sh` for this task. How does it differ from what you wrote in the `script:` block?

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Publishing outputs

**Concept:**   
Work-directory hashes are great for Nextflow, terrible for humans. `publishDir` copies (or links) outputs to a more human-friendly location.


#### Execution
* **Create a file:** 

  ```bash
  touch pipelines/03_hello_publishdir.nf
  ```
  {:.copy-code}

* **Script contents:**
  Open `03_hello_publishdir.nf` in the VS Code editor and copy and paste the script below:

  ```nextflow
  #!/usr/bin/env nextflow

  /*
  * Create an output directory where the output will be saved
  */

  process hello {
  publishDir 'output', mode: 'copy'

  output:
  path 'result.txt'

  script:
  """
  echo "Hello Nextflow World!" > result.txt
  """
  }

  workflow {
  // Run the hello process
  hello()
  }
  ```
  {:.copy-code}

* **Run the script:**

  ```bash
  nextflow run pipelines/03_hello_publishdir.nf
  cat output/result.txt
  ```
  {:.copy-code}


#### What to expect
The result now appears in `output/result.txt` *and* still exists in the work directory (needed for `-resume`).


#### Modes worth knowing
* `copy` (safe, default choice)
* `symlink` (saves space, breaks if you clean `work/`)
* `move` (saves space, blocks resume).


#### Your turn
Change `mode: 'copy'` to `mode: 'symlink'` and inspect `output/` with `ls -l`. What's different?

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Process inputs

**Concept:**   
Scripts with hard-coded inputs aren't easily reusable. An `input:` block lets a process accept data. `val` passes a simple value (string/number) and assigns it to a variable. For example, if the `input` block for a process includes `val var1`, the script can access the value passed to the process as `$var1`.


#### Execution
  * **Create a file:** 

    ```bash 
    touch pipelines/04_hello_input.nf 
    ```
    {:.copy-code}

  * **Script contents:**    
    Open `04_hello_input.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    process hello {
        publishDir 'output', mode: 'copy'

        input:
        val welcome

        output:
        path 'result.txt'

        script:
        """
        echo "$welcome" > result.txt
        """
    }

    workflow {
        hello("Hello, welcome to the world of Nextflow!")
    }
    ```
    {:.copy-code}

  * **Run the script**

    ```bash
    nextflow run pipelines/04_hello_input.nf
    cat output/result.txt
    ```
    {:.copy-code}


#### What to expect
The message now comes from the workflow call `hello("…")`, not from inside the process.


#### Your turn
Give the process a **second input**. Add `val name` to the `input:` block, use it in the script (e.g. `echo "$welcome $name" > result.txt`), and update the workflow call to pass both values: `hello("Hello,", "Nextflow learner")`. Re-run and check `output/result.txt`.

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Parameters

**Concept:**   
`params` make a pipeline configurable *without editing code*. You can set default values in the script and override them on the command line.


#### Execution
  * **Create a file:**

    ```bash
    touch pipelines/05_hello_default.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `05_hello_default.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    process hello {
        publishDir 'output', mode: 'copy'

        input:
        val welcome

        output:
        path 'result.txt'

        script:
        """
        echo "$welcome" > result.txt
        """
    }

    params.welcome = "Hello, welcome to the world of Nextflow!"

    workflow {
        hello(params.welcome)
    }
    ```
    {:.copy-code}

  * **Run the script**

    ```bash
    nextflow run pipelines/05_hello_default.nf
    nextflow run pipelines/05_hello_default.nf --welcome "Greetings from the command line!"
    cat output/result.txt
    ```
    {:.copy-code}


#### What to expect
The second run overrides the default. **Priority:** command line > config file > script default.


#### Your turn
Add a second parameter `params.output_name` and use it to name the output file. Override both from the command line.

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Checkpoints and the `-resume` feature

**Concept:**   
Nextflow caches the result of every task it runs. When you re-run a pipeline with `-resume`, Nextflow reuses the cached result of any task whose script, inputs, and parameters are unchanged, and re-runs only the tasks that actually changed. This checkpointing is what makes long pipelines easier to iterate on and safe to restart after a failure — you never redo work you've already completed.

You now understand processes, the work directory, publishing, inputs, and parameters. Before the break, try Nextflow's caching:

{:.copy-code}
```bash
nextflow run pipelines/05_hello_default.nf
nextflow run pipelines/05_hello_default.nf -resume    # note the "cached" tasks
```


#### Reading the output
With `-resume`, unchanged tasks show as `cached` and are skipped. Nextflow decides this from a hash of the script, inputs, and parameters — change any one and the task re-runs.


#### Discussion
Why is this so valuable when a pipeline fails on sample 95 of 100?

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### FastQC: our first bioinformatics process

**Concept:**   
This is the first time we feed a channel *into* a process. `Channel.fromPath(params.reads)` scans the filesystem for every file matching the pattern specified by `params.reads` and creates an **input channel** that emits one item per file. When you hand that channel to a process, Nextflow launches a **separate, independent task for each item** — so ten FASTQ files become ten FastQC tasks that run **in parallel**, each in its own isolated work directory. You never write a loop: the channel *is* the loop, and Nextflow schedules the tasks across available cores for you. If we point `params.reads` at more files (e.g., via the `--reads` flag), the pipeline scales automatically, with no code changes. The `tag` directive labels each task with its associated filename so you can tell the parallel tasks apart in the log.


#### Execution
  * **Create a file:**

    ```bash
    touch pipelines/06_implementation_fastqc.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `06_implementation_fastqc.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    params.reads = "01_data/*fastq.gz"
    params.output_qc = "02_illuminaQC"

    process FastQC {
        tag "${sample_id}"

        publishDir params.output_qc, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html"
        path "*.zip"

        script:
        """
        module load fastqc
        fastqc -o . -t 2 ${sample_id}
        """
    }

    workflow {
        Channel
        .fromPath(params.reads)
        .set { illumina_reads_ch }

        FastQC(illumina_reads_ch)
    }
    ```
    {:.copy-code}

  * **Run the script**

    ```bash
    nextflow run pipelines/06_implementation_fastqc.nf
    ls 02_illuminaQC/
    ```
    {:.copy-code}


#### What to expect
An `.html` and `.zip` report per input FASTQ in `02_illuminaQC/`. In the log you'll see one `FastQC` task per file, each tagged with its filename.


#### Reading the output
Open one `_fastqc.html` in the VS Code file browser — FastQC's per-base quality and adapter-content plots tell you whether trimming is needed.


#### Your turn
Override the input glob to QC only the R1 files: `--reads "01_data/*_R1.fastq.gz"`. How many tasks run now?

---
</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Paired-end reads with Fastp

**Concept:**   
Paired-end data comes as R1/R2 pairs that must travel together. `Channel.fromFilePairs(params.reads, flat: true)` groups them and emits a **tuple** `(sample_id, R1, R2)`, unpacked in the process with `tuple val(sample_id), path(read1), path(read2)`.


#### Execution
  * **Create a file:**

    ```bash
    touch pipelines/07_implementation_fastp.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `07_implementation_fastp.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_trim = '03_trimmed'

    process Fastp {
    tag "${sample_id}"

    publishDir params.output_trim, mode: 'copy'

    input:
    tuple val(sample_id), path(read1), path(read2)

    output:
    tuple val(sample_id), 
        path("${sample_id}_1.trimmed.fastq.gz"),
        path("${sample_id}_2.trimmed.fastq.gz")

    script:
    """
    module load miniconda
    source activate /90daydata/scinet_workshop2/nextflow_env

    fastp \
        -i ${read1} \
        -I ${read2} \
        -o ${sample_id}_1.trimmed.fastq.gz \
        -O ${sample_id}_2.trimmed.fastq.gz
    """
    }

    workflow {
    Channel
        .fromFilePairs(params.reads, flat: true)
        .set { read_pairs_ch }

    Fastp(read_pairs_ch)
    }
    ```
    {:.copy-code}

  * **Run the script**

    ```bash
    nextflow run pipelines/07_implementation_fastp.nf
    ls 03_trimmed/
    ```
    {:.copy-code}


#### What to expect
Trimmed pairs in `03_trimmed/`, e.g. `bio_sample_01_1.trimmed.fastq.gz` and `..._2.trimmed.fastq.gz`, one pair per sample.


#### Reading the output
Fastp prints a JSON/HTML summary (reads before/after, % passing filter) — a quick sanity check that trimming did something reasonable.


#### Your turn
Temporarily add a `read_pairs_ch.view()` line in the workflow to see the tuple structure before it reaches the process. What does `flat: true` change?

---
</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Two processes in parallel

**Concept:**   
From the **same** input you can build **two differently shaped channels** — `fromPath` (individual files, for FastQC) and `fromFilePairs` (pairs, for Fastp) — and run both processes simultaneously. 

The **pipe operator** `|` feeds a channel into a process: `fastqc_ch | FastQC` takes the items flowing through `fastqc_ch` and uses them as the input to `FastQC`. `fastqc_ch | FastQC` syntax is an alternative to `FastQC(fastqc_ch)`; because it reads left-to-right, as *data → process → next process*, you might find it more intuitive to write and read (you'll see it chained in the full pipeline later).


#### Execution
  * **Create a file:**

    ```bash
    touch pipelines/08_implementation_fastqc_fastp.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `08_implementation_fastqc_fastp.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_qc = '02_illuminaQC'
    params.output_trim = '03_trimmed'

    process FastQC {
        tag "${sample_id}"

        publishDir params.output_qc, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html"
        path "*.zip"

        script:
        """
        module load fastqc
        fastqc -t 2 ${sample_id}
        """
    }

    process Fastp {
    tag "${sample_id}"

    publishDir params.output_trim, mode: 'copy'

    input:
    tuple val(sample_id), path(read1), path(read2)

    output:
    tuple val(sample_id), 
        path("${sample_id}_1.trimmed.fastq.gz"),
        path("${sample_id}_2.trimmed.fastq.gz")

    script:
    """
    module load miniconda
    source activate /90daydata/scinet_workshop2/nextflow_env

    fastp \
        -i ${read1} \
        -I ${read2} \
        -o ${sample_id}_1.trimmed.fastq.gz \
        -O ${sample_id}_2.trimmed.fastq.gz
    """
    }

    workflow {
        fastqc_ch = Channel.fromPath(params.reads)
        // fastqc_ch.view()
        trim_ch = Channel.fromFilePairs(params.reads, flat:true)
        // trim_ch.view()

        fastqc_ch | FastQC
        trim_ch | Fastp 
    }
    ```
    {:.copy-code}

  * **Run the script**

    ```bash
    nextflow run pipelines/08_implementation_fastqc_fastp.nf
    ```
    {:.copy-code}


#### What to expect
FastQC and Fastp run at the same time; outputs land in `02_illuminaQC/` and `03_trimmed/`.


#### Your turn
Uncomment the `fastqc_ch.view()` and `trim_ch.view()` lines and re-run. Compare the two channel shapes side by side — this is the single most useful debugging habit in Nextflow.

---
</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Collecting files with `.collect()`

**Concept:**   
Some tools need **all** files at once (a combined report). `.collect()` gathers every channel item into a single list, so the process runs **once** instead of per file. The custom script `pipelines/bin/read_length_dist.py` is auto-added to the task's `PATH` because it lives in `bin/`.


#### Execution
  * **Create the helper script:** 

    ```bash
    mkdir -p pipelines/bin
    touch pipelines/bin/read_length_dist.py  
    ```
    {:.copy-code}

    Open `read_length_dist.py` in the VS Code editor and copy and paste the script below:

    ```python
    #!/usr/bin/env python3
    """
    read_length_dist.py
    Usage: read_length_dist.py output.tsv input1.fastq.gz [input2.fastq.gz ...]

    Counts the number of reads of each length in one or more FASTQ files.
    Outputs: TSV with columns  length  count  file
    """

    import sys, gzip
    from collections import Counter

    def count_lengths(fname):    
        counts = Counter()
        with gzip.open(fname, 'rt') as f:
            for i, line in enumerate(f):
                if i % 4 == 1:  # sequence line
                    counts[len(line.strip())] += 1
        return counts

    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit()

    out_tsv = sys.argv[1]
    infiles = sys.argv[2:]

    with open(out_tsv, 'w') as out:
        out.write("length\tcount\tfile\n")
        for f in infiles:
            counts = count_lengths(f)
            for length, count in sorted(counts.items()):
                out.write(f"{length}\t{count}\t{f}\n")
    ```
    {:.copy-code}

  * **Make the helper script executable:** Nextflow only adds a script in `bin/` to the task `PATH` if it is executable — without this step the process fails with "permission denied".

    ```bash
    chmod +x pipelines/bin/read_length_dist.py
    ```
    {:.copy-code}

  * **Create the nextflow script:**

    ```bash
    touch pipelines/09_implementation_readLenDist.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `09_implementation_readLenDist.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    params.reads = "03_trimmed/*fastq.gz"
    params.output_rld = "04_read_len_dist"

    process ReadLenDist {
        publishDir params.output_rld, mode: 'copy'

        input:
        path reads

        output:
        path "*.tsv"

        script:
        """
        read_length_dist.py samples_read_len_dist.tsv $reads
        """
    }

    workflow {
        Channel
            .fromPath(params.reads)
            .collect()
            .set { illumina_reads_ch }

        ReadLenDist(illumina_reads_ch)
    }
    ```
    {:.copy-code}

  * **Run the script:**

    ```bash
    nextflow run pipelines/09_implementation_readLenDist.nf
    column -t 04_read_len_dist/samples_read_len_dist.tsv | head
    ```
    {:.copy-code}


#### What to expect
A single `samples_read_len_dist.tsv` with `length  count  file` columns across all trimmed files.


#### Reading the output
Each row is a read length and how many reads had it, per file — the distribution of read lengths after trimming.


#### Your turn
Remove `.collect()` and re-run. How many times does `ReadLenDist` run now, and what happens to the single output filename? (This is exactly the pitfall to watch for in your own pipelines.)

---
</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### The full pipeline & channel transformation

**Concept:**   
Chain everything. Fastp's output tuple `(sample_id, R1, R2)` is reshaped with `.map { sample_id, r1, r2 -> [r1, r2] }`, then `.collect()`ed and fed to `ReadLenDist`. Reshaping a channel so it matches what the next process expects is a move you'll reach for again and again in your own pipelines: **transform a channel's shape to fit the next process.**


#### Execution
  * **Create the file:** 

    ```bash
    touch pipelines/10_implementation_full.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `10_implementation_full.nf` in the VS Code editor and copy and paste the script below:

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_qc = '02_illuminaQC'
    params.output_trim = '03_trimmed'
    params.trimmed_reads = '03_trimmed/*fastq.gz'
    params.output_rld = '04_read_len_dist'

    process FastQC {
        tag "${sample_id}"

        publishDir params.output_qc, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html"
        path "*.zip"

        script:
        """
        module load fastqc
        fastqc -t 2 ${sample_id}
        """
    }

    process Fastp {
    tag "${sample_id}"

    publishDir params.output_trim, mode: 'copy'

    input:
    tuple val(sample_id), path(read1), path(read2)

    output:
    tuple val(sample_id), 
        path("${sample_id}_R1.trimmed.fastq.gz"),
        path("${sample_id}_R2.trimmed.fastq.gz")

    script:
    """
    module load miniconda
    source activate /90daydata/scinet_workshop2/nextflow_env

    fastp -i ${read1} \
            -I ${read2} \
            -o ${sample_id}_R1.trimmed.fastq.gz \
            -O ${sample_id}_R2.trimmed.fastq.gz
    """
    }

    process ReadLenDist {
        publishDir params.output_rld, mode: 'copy'

        input:
        path reads

        output:
        path '*.tsv'

        script:
        """
        read_length_dist.py samples_read_len_dist.tsv $reads
        """
    }

    workflow {
        fastqc_ch = Channel.fromPath(params.reads)
        // fastqc_ch.view()
        trim_ch = Channel.fromFilePairs(params.reads, flat:true)
        // trim_ch.view()

        fastqc_ch | FastQC
        trimmed_output_ch = trim_ch | Fastp 

        trimmed_output_ch
            .map { sample_id, r1, r2 -> [r1, r2] }
            // .flatten()
            .collect()
            // .view()
            | ReadLenDist
    }
    ```
    {:.copy-code}

  * **Run the script:**

    ```bash
    nextflow run pipelines/10_implementation_full.nf
    ls 02_illuminaQC/ 03_trimmed/ 04_read_len_dist/
    ```
    {:.copy-code}


#### What to expect
QC reports, trimmed reads, and one combined `samples_read_len_dist.tsv` — the whole workflow in one run.


#### Your turn
Add `.view()` after `.map{…}` and again after `.collect()`. Predict each output *before* running, then check yourself.

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Add FastQC on the trimmed reads

**Concept:**   
You've run FastQC on the *raw* reads and trimmed them with Fastp. A natural next step is to run FastQC again on the *trimmed* reads, so you can compare quality before and after trimming. Before we show you how, try adding this additional step to the workflow and see what happens!

#### Your turn (try this first!)
Starting from `10_implementation_full.nf`, try to also run `FastQC` on Fastp's trimmed output — add a line in the workflow that sends the trimmed reads into `FastQC`, and run it. **We recommend you give this a try before reading on. 🙂**

#### What happens
Nextflow stops with an error like:

```
Process `FastQC` has been already used -- If you need to reuse the same process,
include it with a different name, or include it in a different workflow context
```

This is a key rule: **within a workflow, each process can be invoked only once.** `FastQC` is already used on the raw reads, so Nextflow won't let you call it again on the trimmed reads. A simple solution, for now, is to create a second process that is a duplicate of the first but with a different name.

#### Execution
  * **Create the file:**

    ```bash
    touch pipelines/11_add_fastqc.nf
    ```
    {:.copy-code}

  * **Script contents:**  
    Open `11_add_fastqc.nf` and copy and paste the script below. It is `10_implementation_full.nf` plus a second process, `FastQC_Trimmed`, that publishes to a new directory and runs on the trimmed reads:

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_qc = '02_illuminaQC'
    params.output_trim = '03_trimmed'
    params.output_rld = '04_read_len_dist'
    params.output_qc_trimmed = '05_illuminaQC_trimmed'

    process FastQC {
        tag "${sample_id}"
        publishDir params.output_qc, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html"
        path "*.zip"

        script:
        """
        module load fastqc
        fastqc -t 2 ${sample_id}
        """
    }

    process Fastp {
        tag "${sample_id}"
        publishDir params.output_trim, mode: 'copy'

        input:
        tuple val(sample_id), path(read1), path(read2)

        output:
        tuple val(sample_id),
            path("${sample_id}_R1.trimmed.fastq.gz"),
            path("${sample_id}_R2.trimmed.fastq.gz")

        script:
        """
        module load miniconda
        source activate /90daydata/scinet_workshop2/nextflow_env

        fastp -i ${read1} \
              -I ${read2} \
              -o ${sample_id}_R1.trimmed.fastq.gz \
              -O ${sample_id}_R2.trimmed.fastq.gz
        """
    }

    process ReadLenDist {
        publishDir params.output_rld, mode: 'copy'

        input:
        path reads

        output:
        path '*.tsv'

        script:
        """
        read_length_dist.py samples_read_len_dist.tsv $reads
        """
    }

    process FastQC_Trimmed {
        tag "${sample_id}"
        publishDir params.output_qc_trimmed, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html"
        path "*.zip"

        script:
        """
        module load fastqc
        fastqc -t 2 ${sample_id}
        """
    }

    workflow {
        fastqc_ch = Channel.fromPath(params.reads)
        trim_ch   = Channel.fromFilePairs(params.reads, flat:true)

        // FastQC on the raw reads
        fastqc_ch | FastQC

        // Trim with Fastp
        trimmed_output_ch = trim_ch | Fastp

        // A channel of the individual trimmed read files
        trimmed_reads_ch = trimmed_output_ch
            .map { sample_id, r1, r2 -> [r1, r2] }
            .flatten()

        // Read-length distribution over all trimmed reads
        trimmed_reads_ch.collect() | ReadLenDist

        // FastQC on the trimmed reads
        trimmed_reads_ch | FastQC_Trimmed
    }
    ```
    {:.copy-code}

  * **Run the script:**

    ```bash
    nextflow run pipelines/11_add_fastqc.nf
    ls 05_illuminaQC_trimmed/
    ```
    {:.copy-code}


#### What to expect
A new `05_illuminaQC_trimmed/` directory with FastQC reports for the trimmed reads, alongside the raw-read reports in `02_illuminaQC/`.

#### Reading the output
Compare a raw report in `02_illuminaQC/` with its trimmed counterpart in `05_illuminaQC_trimmed/` — adapter content and low-quality tails should be reduced after trimming.

> 💡 Copying an entire process just to give it a different name feels wasteful — and it is. Hold that thought: in the next section you'll meet **modules**, and then a one-line trick that removes the duplication entirely.

---

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Using modules with `include`

**Concept:**   
As pipelines grow, keeping all of your processes in one file becomes hard to maintain. Nextflow lets you move processes into separate **module** files and bring them into the main workflow with the `include` statement. The workflow script then focuses on *how processes connect*, while each module file defines *what a single process does*. This makes code reusable, easier to read, and easier to test.

#### Execution
  * **Create the module directory and files:**

    ```bash
    mkdir -p pipelines/modules
    touch pipelines/modules/fastqc.nf
    touch pipelines/modules/fastp.nf
    touch pipelines/modules/readLenDist.nf
    touch pipelines/12_implementation_include.nf
    ```
    {:.copy-code}

  * **Module:** `pipelines/modules/fastqc.nf`

    ```nextflow
    process FastQC {
        tag "${sample_id}"

        publishDir params.output_qc, mode: 'copy'

        input:
        path sample_id

        output:
        path "*.html", emit: html
        path "*.zip",  emit: zip

        script:
        """
        module load fastqc
        fastqc -t 2 ${sample_id}
        """
    }
    ```
    {:.copy-code}

    Naming the outputs with `emit:` lets a later step easily refer to a specific output, using the following pattern: `[PROCESS_NAME].out.[EMIT_NAME]`. So, for the module above, we can use `FastQC.out.zip` to reference the `.zip` reports generated by the `FastQC` process. We'll use that later when we add MultiQC.

  * **Module:** `pipelines/modules/fastp.nf`

    ```nextflow
    process Fastp {
        tag "${sample_id}"

        publishDir params.output_trim, mode: 'copy'

        input:
        tuple val(sample_id), path(read1), path(read2)

        output:
        tuple val(sample_id), 
            path("${sample_id}_R1.trimmed.fastq.gz"),
            path("${sample_id}_R2.trimmed.fastq.gz")

        script:
        """
        module load miniconda
        source activate /90daydata/scinet_workshop2/nextflow_env

        fastp -i ${read1} \
              -I ${read2} \
              -o ${sample_id}_R1.trimmed.fastq.gz \
              -O ${sample_id}_R2.trimmed.fastq.gz
        """
    }
    ```
    {:.copy-code}

  * **Module:** `pipelines/modules/readLenDist.nf`

    ```nextflow
    process ReadLenDist {
        publishDir params.output_rld, mode: 'copy'

        input:
        path reads

        output:
        path '*.tsv'

        script:
        """
        read_length_dist.py samples_read_len_dist.tsv $reads
        """
    }
    ```
    {:.copy-code}

  * **Main script:** `pipelines/12_implementation_include.nf`

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_qc = '02_illuminaQC'
    params.output_trim = '03_trimmed'
    params.trimmed_reads = '03_trimmed/*fastq.gz'
    params.output_rld = '04_read_len_dist'

    include { FastQC } from './modules/fastqc.nf'
    include { Fastp } from './modules/fastp.nf'
    include { ReadLenDist } from './modules/readLenDist.nf'

    workflow {
        fastqc_ch = Channel.fromPath(params.reads)
        // fastqc_ch.view()
        trim_ch = Channel.fromFilePairs(params.reads, flat:true)
        // trim_ch.view()

        fastqc_ch | FastQC
        trimmed_output_ch = trim_ch | Fastp 

        trimmed_output_ch
            .map { sample_id, r1, r2 -> [r1, r2] }
            // .flatten()
            .collect()
            // .view()
            | ReadLenDist
    }
    ```
    {:.copy-code}

  * **Run the script:**

    ```bash
    nextflow run pipelines/12_implementation_include.nf
    ls 02_illuminaQC/ 03_trimmed/ 04_read_len_dist/
    ```
    {:.copy-code}


#### What to expect
Our new script will generate the same outputs as our previous full pipeline (QC reports, trimmed reads, and one combined `samples_read_len_dist.tsv`), but the main script is much shorter and each process lives in its own reusable module file.

#### Your turn
You don't always need a whole new file to reuse a process. Import the same module under a second name with an **alias**:

```nextflow
include { FastQC as FastQC_Trimmed } from './modules/fastqc.nf'
```

Remember writing `FastQC_Trimmed` by hand a section ago? Now, as an alternative, you can add the line above to `12_implementation_include.nf` and call `FastQC_Trimmed` on the trimmed reads — no new process, no copying and pasting. Notice *where* its reports get published, since the module hard-codes `publishDir params.output_qc` — we'll come back to that with MultiQC.

---
</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Aggregating reports with MultiQC

**Concept:**   
Remember writing a whole second process, `FastQC_Trimmed`, just to QC the trimmed reads? Now that our processes live in modules, we can reuse `FastQC` under a new name with an **alias** — no duplicate process needed. We then feed every FastQC `.zip` report into `MultiQC`, which merges them into a single interactive HTML summary of raw *and* trimmed quality.

#### Execution
  * **Create the new module and main script:**

    ```bash
    touch pipelines/modules/multiqc.nf
    touch pipelines/13_implementation_multiqc.nf
    ```
    {:.copy-code}

  * **Module:** `pipelines/modules/multiqc.nf`

    ```nextflow
    process MultiQC {
        publishDir params.output_multiqc, mode: 'copy'

        input:
        path '*'

        output:
        path '*multiqc_report.html'
        path '*multiqc_data'

        script:
        """
        module load multiqc

        multiqc .
        """
    }
    ```
    {:.copy-code}

  * **Main script:** `pipelines/13_implementation_multiqc.nf`

    ```nextflow
    #!/usr/bin/env nextflow

    //-- Configurable params
    params.reads = '01_data/*_{R1,R2}.fastq.gz'
    params.output_qc = '02_illuminaQC'
    params.output_trim = '03_trimmed'
    params.output_rld = '04_read_len_dist'
    params.output_multiqc = '06_multiqc'

    include { FastQC } from './modules/fastqc.nf'
    include { FastQC as FastQC_Trimmed } from './modules/fastqc.nf'
    include { Fastp } from './modules/fastp.nf'
    include { ReadLenDist } from './modules/readLenDist.nf'
    include { MultiQC } from './modules/multiqc.nf'

    workflow {
        fastqc_ch = Channel.fromPath(params.reads)
        // fastqc_ch.view()
        trim_ch = Channel.fromFilePairs(params.reads, flat:true)
        // trim_ch.view()

        // Run FastQC on raw reads
        fastqc_ch | FastQC
        
        // Trim reads with Fastp
        trimmed_output_ch = trim_ch | Fastp 

        // Run ReadLenDist on trimmed reads
        trimmed_output_ch
            .map { sample_id, r1, r2 -> [r1, r2] }
            // .flatten()
            .collect()
            // .view()
            | ReadLenDist

        // Run FastQC on trimmed reads
        trimmed_output_ch
            .map { sample_id, r1, r2 -> [r1, r2] }
            .flatten()
            | FastQC_Trimmed

        // Aggregate all FastQC .zip reports with MultiQC
        FastQC.out.zip
            .mix(FastQC_Trimmed.out.zip)
            .collect()
            | MultiQC
    }
    ```
    {:.copy-code}

  * **Run the script:**

    ```bash
    nextflow run pipelines/13_implementation_multiqc.nf
    ls 06_multiqc/
    ```
    {:.copy-code}


#### What to expect
A `06_multiqc/` directory containing `multiqc_report.html`, which combines the raw and trimmed FastQC results in one report. Because `FastQC_Trimmed` is the *same* module as `FastQC`, both sets of reports are published to `params.output_qc` (`02_illuminaQC/`); their filenames differ (`..._fastqc` vs `...trimmed_fastqc`), so nothing is overwritten.

#### Reading the output
Open `06_multiqc/multiqc_report.html`. Each sample appears twice — once for its raw reads and once for its trimmed reads — so you can watch adapter content and quality tails improve side by side.

#### Your turn
The aliased `FastQC_Trimmed` publishes into `02_illuminaQC/` next to the raw reports. Parameterize the `FastQC` module so the alias can send trimmed reports to their own directory (e.g. `05_illuminaQC_trimmed/`) — hint: give the module a `val outdir` input and use it in `publishDir`.

---
</li>
</ol>

### Where to go next?

- Explore community pipelines at [nf-core](https://nf-co.re/) before writing your own from scratch.
- Work through the official [Nextflow Training](https://training.nextflow.io/).

---

