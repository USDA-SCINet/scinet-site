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

* Login to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). For more information on login procedures for web-based SCINet access, see the [SCINet access user guide]({{site.baseurl}}/guides/access/web-based-login).
 
* Launch VS Code:
  * Under the Interactive Apps menu, select VS Code
  * Specify the following input values on the page:
    * Account: scinet_workshop2
    * Queue: ceres
    * QoS: 400thread
    * Number of cores: 16
    * Memory required: 50G
    * Number of hours: 6
    * Optional Slurm Parameters: `--reservation=foundations_workshop`
    * Working Directory:  `/90daydata/shared/$USER/`
  * Click Launch. The screen will update to the *Interactive Sessions* page. When your VS Code session is ready, the top card will update from *Queued* to *Running* and a *Connect to VS Code* button will appear. Click *Connect to VS Code.*

**Create a workshop working directory by running the following commands.**  
Note: you do not have to edit the commands with your username as it will be determined by the $USER variable.  

  {:.copy-code}

  ```bash
  mkdir -p /90daydata/shared/$USER/nextflow 
  cd /90daydata/shared/$USER/nextflow
  ```

**Soft link the tutorial data**

{:.copy-code}

```bash
ln -s  /project/scinet_workshop2/foundations_bioinf_2026/nextflow_data/* .
ls 
```
You should see a small set of paired-end FASTQ files (`*_R1.fastq.gz` / `*_R2.fastq.gz`).

-----
## An Introduction to Nextflow

*Instructors: Viswanathan Satheesh · Siva Chudalayandi*

### Learning Objectives

By the end of this workshop, you will be able to:

1. **Write Nextflow pipelines from scratch** — defining processes, channels, and workflows, and wiring command-line tools together.
2. **Process many files in parallel automatically** — letting Nextflow handle scheduling, isolation, and failure recovery instead of hand-written loops.
3. **Make pipelines configurable, portable, and reproducible** — using parameters, configuration files, profiles, and software environments (modules/containers) so the same pipeline runs on a laptop, an HPC cluster, or the cloud.

### What You'll Build

Across the two days you progress from a one-line "hello world" process to a complete genomics pipeline:

```
Raw reads ──► FastQC (quality control)
          └─► Fastp (adapter trimming) ──► ReadLenDist (read-length analysis)
                                       └─► FastQC on trimmed reads
```

<ol class="usa-process-list">
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}

### Load Nextflow

```bash
module load nextflow/25.04.6
nextflow -version
```

You're ready to go.

---

**Naming Conventions — Read This First**

Nextflow code mixes several naming styles on purpose: the style of a name tells you *what kind of thing* it is. Knowing the conventions before you start makes every script on this page easier to read. You'll see all of these today.

| Thing                          | Convention                                                        | Examples (used in this workshop)                                   |
|--------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------|
| **Process names**              | `PascalCase` (capitalized words, no spaces)                       | `FastQC`, `Fastp`, `ReadLenDist`, `FastQC_Trimmed`                |
| **Parameters**                 | `snake_case`, lowercase with underscores, always via `params.`    | `params.reads`, `params.output_qc`, `params.output_trim`          |
| **Channels & variables**       | `snake_case`, often with a `_ch` suffix                           | `fastqc_ch`, `read_pairs`, `trimmed_output_ch`                    |
| **Script / config files**      | `.nf` for pipelines, `nextflow.config` for config                 | `10_implementation_full.nf`, `nextflow.config`                    |
| **Output / publish directories** | numbered prefix so results sort in pipeline order               | `01_data/`, `02_illuminaQC/`, `03_trimmed/`, `04_read_len_dist/`  |
| **Paired-end read files**      | shared sample name + `_{R1,R2}` token                             | `bio_sample_01_R1.fastq.gz`, `bio_sample_01_R2.fastq.gz`          |

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

Forgetting the backslash is the single most common beginner error — Nextflow will try (and fail) to resolve a shell variable as one of its own.

> 💡 **Naming tip for your own pipelines:** name a process after *what it does* (`AlignReads`, not `Step3`), and name a channel after *what it carries* (`aligned_bams_ch`, not `out2`). Future-you will thank you.

---


**Goal for today:** understand the building blocks — processes, the work directory, publishing outputs, inputs, and parameters — by writing five small pipelines. Every concept is introduced one at a time, building on the previous script.

> All scripts referenced below live in `pipelines/`. The full annotated walkthrough for Day 1 is in [hello_part1.md](hello_part1.md) and [hello_part2.md](hello_part2.md).

**Why Nextflow?**

A typical analysis run by hand means bash scripts with nested loops, manual file tracking, custom parallelization, and results that are hard to reproduce. Nextflow takes over task parallelization, data-flow management, failure recovery and checkpointing, and tool integration — so your code stays clear and your results stay reproducible. The key idea: **Nextflow doesn't care what your tools do; it manages how data flows between them.**

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Hello World: your first process

**Create a file:** 

```bash
touch pipelines/01_hello_screen.nf
```

**Concept:** A Nextflow script has two parts — a **process** (what to do) and a **workflow** (when to do it). A process captures its output into a **channel**; the `.view()` operator prints a channel's contents.

**Script contents:**

{:.copy-code}

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

**Run the script:**

```bash
nextflow run pipelines/01_hello_screen.nf
```

**What to expect:**

```
executor >  local (1)
[9c/4c931d] process > hello [100%] 1 of 1 ✔
Welcome to the world of Nextflow!
```

**Reading the output:**
- `[9c/4c931d]` is the task hash → the work subdirectory `work/9c/4c931d…/`.
- `1 of 1 ✔` means one task ran and succeeded.
- The last line is the process's stdout, shown because of `.view()`.

> ✏️ **Your turn:** Change the message in the `script:` block and re-run. Where does the new text appear?

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Writing to files & the work directory

**Create a file:** 

```bash
touch pipelines/02_hello_redirect.nf
```

**Concept:** Real pipelines save results to files. Switch `output: stdout` to `output: path 'result.txt'` and redirect inside the script. Every task runs in its own isolated **work directory**.

**Script contents:**

{:.copy-code}

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

```bash
nextflow run pipelines/02_hello_redirect.nf
tree -a work        # or: find work -type f
```

**What to expect:** no text is printed (the result is now a file). Inside `work/xx/xxxx…/` you'll find `result.txt` alongside Nextflow's bookkeeping files.

**Reading the output — the `.command.*` files:**
- `.command.sh` — the exact script Nextflow ran (great for debugging).
- `.command.out` / `.command.err` — stdout / stderr.
- `.exitcode` — `0` means success.

> ✏️ **Your turn:** Open `.command.sh` for this task. How does it differ from what you wrote in the `script:` block?

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Publishing outputs

**Create a file:** 

```bash
touch pipelines/03_hello_publishdir.nf
```

**Concept:** Work-directory hashes are great for Nextflow, terrible for humans. `publishDir` copies (or links) outputs to a friendly location.

**Script contents:**

{:.copy-code}

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

**Run the script:**

```bash
nextflow run pipelines/03_hello_publishdir.nf
cat output/result.txt
```

**What to expect:** the result now appears in `output/result.txt` *and* still exists in the work directory (needed for `-resume`).

**Modes worth knowing:** `copy` (safe, default choice), `symlink` (saves space, breaks if you clean `work/`), `move` (saves space, blocks resume).

> ✏️ **Your turn:** Change `mode: 'copy'` to `mode: 'symlink'` and inspect `output/` with `ls -l`. What's different?

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Process inputs

**Create a file:** 

```bash 
touch pipelines/04_hello_input.nf 
```

**Concept:** Hardcoded scripts aren't reusable. An `input:` block lets a process accept data. `val` passes a simple value (string/number); the script uses it as `$variable`.

**Script contents:**

{:.copy-code}

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

**Run the script**

```bash
nextflow run pipelines/04_hello_input.nf
cat output/result.txt
```

**What to expect:** the message now comes from the workflow call `hello("…")`, not from inside the process.

> ✏️ **Your turn:** Call `hello()` twice in the workflow with two different strings. How many tasks run, and what happens to `output/result.txt`? (This previews why naming outputs uniquely matters.)

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Parameters

**Create a file:** 

```bash
touch pipelines/05_hello_default.nf
```

**Concept:** `params` make a pipeline configurable *without editing code*. Set a default in the script, override it on the command line.

**Script contents:**

{:.copy-code}

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

**Run the script**

```bash
nextflow run pipelines/05_hello_default.nf
nextflow run pipelines/05_hello_default.nf --welcome "Greetings from the command line!"
cat output/result.txt
```

**What to expect:** the second run overrides the default. **Priority:** command line > config file > script default.

> ✏️ **Your turn:** Add a second parameter `params.output_name` and use it to name the output file. Override both from the command line.

---

</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Checkpoint and the `-resume` feature

You now understand processes, the work directory, publishing, inputs, and parameters. Before the break, try Nextflow's caching:

```bash
nextflow run pipelines/05_hello_default.nf
nextflow run pipelines/05_hello_default.nf -resume    # note the "cached" tasks
```

**Reading the output:** with `-resume`, unchanged tasks show as `cached` and are skipped. Nextflow decides this from a hash of the script, inputs, and parameters — change any one and the task re-runs.

> 💬 **Discussion:** Why is this so valuable when a pipeline fails on sample 95 of 100?

---

### FastQC: your first real process

**Create the file:** 

```bash
touch pipelines/06_implementation_fastqc.nf
```

**Concept:** `Channel.fromPath(params.reads)` emits one item per matching file; the process runs once per item, **in parallel**. The `tag` directive labels each task in the log.

**Script contents:**

{:.copy-code}

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
    .set { illumina_reads }

    FastQC(illumina_reads)
}
```

**Run the script**

```bash
nextflow run pipelines/06_implementation_fastqc.nf
ls 02_illuminaQC/
```

**What to expect:** an `.html` and `.zip` report per input FASTQ in `02_illuminaQC/`. In the log you'll see one `FastQC` task per file, each tagged with its filename.

**Reading the output:** open one `_fastqc.html` in the VS Code file browser — FastQC's per-base quality and adapter-content plots tell you whether trimming is needed.

> ✏️ **Your turn:** Override the input glob to QC only the R1 files: `--reads "01_data/*_R1.fastq.gz"`. How many tasks run now?

---
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Paired-end reads with Fastp

**Create the file:** `pipelines/07_implementation_fastp.nf`

**Concept:** Paired-end data comes as R1/R2 pairs that must travel together. `Channel.fromFilePairs(params.reads, flat: true)` groups them and emits a **tuple** `(sample_id, R1, R2)`, unpacked in the process with `tuple val(sample_id), path(read1), path(read2)`.

**Script contents:**

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
    .set { read_pairs }

  Fastp(read_pairs)
}
```

**Run the script**

```bash
nextflow run pipelines/07_implementation_fastp.nf
ls 03_trimmed/
```

**What to expect:** trimmed pairs in `03_trimmed/`, e.g. `bio_sample_01_1.trimmed.fastq.gz` and `..._2.trimmed.fastq.gz`, one pair per sample.

**Reading the output:** Fastp prints a JSON/HTML summary (reads before/after, % passing filter) — a quick sanity check that trimming did something reasonable.

> ✏️ **Your turn:** Temporarily uncomment a `read_pairs.view()` line in the workflow to see the tuple structure before it reaches the process. What does `flat: true` change?

---
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Two processes in parallel

**Create the file:**

```bash
touch pipelines/08_implementation_fastqc_fastp.nf
```

**Concept:** From the **same** input you can build **two differently shaped channels** — `fromPath` (individual files, for FastQC) and `fromFilePairs` (pairs, for Fastp) — and run both processes simultaneously. The pipe operator (`ch | Process`) reads cleanly.

**Script contents:**

{:.copy-code}

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

**Run the script**

```bash
nextflow run pipelines/08_implementation_fastqc_fastp.nf
```

**What to expect:** FastQC and Fastp run at the same time; outputs land in `02_illuminaQC/` and `03_trimmed/`.

> ✏️ **Your turn:** Uncomment the `fastqc_ch.view()` and `trim_ch.view()` lines and re-run. Compare the two channel shapes side by side — this is the single most useful debugging habit in Nextflow.

---
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### Collecting files with `.collect()`

**Create the helper script:** 

```bash
touch pipelines/bin/read_length_dist.py  
```

Copy the script below into `pipelines/bin/read_length_dist.py`

{:.copy-code}
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

**Create the nextflow script:**

```bash
touch pipelines/09_implementation_readLenDist.nf
```

**Concept:** Some tools need **all** files at once (a combined report). `.collect()` gathers every channel item into a single list, so the process runs **once** instead of per file. The custom script `pipelines/bin/read_length_dist.py` is auto-added to the task's `PATH` because it lives in `bin/`.

**Script contents:**

{:.copy-code}

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
    read_length_dist.py sample_read_len_dist.tsv $reads
    """
}

workflow {
    Channel
        .fromPath(params.reads)
        .collect()
        .set { illumina_reads }
        // .flatMap { it }
        // .view()

    ReadLenDist(illumina_reads)
}
```

**Run the script:**

```bash
nextflow run pipelines/09_implementation_readLenDist.nf
column -t 04_read_len_dist/sample_read_len_dist.tsv | head
```

**What to expect:** a single `sample_read_len_dist.tsv` with `length  count  file` columns across all trimmed files.

**Reading the output:** each row is a read length and how many reads had it, per file — the distribution of read lengths after trimming.

> ✏️ **Your turn:** Remove `.collect()` and re-run. How many times does `ReadLenDist` run now, and what happens to the single output filename? (This is exactly the pitfall to watch for in your own pipelines.)

---
</li>
<li class="usa-process-list__item" markdown="1">

{:.usa-process-list__heading}
### The full pipeline & channel transformation

**Create the file:** 

```bash
touch pipelines/10_implementation_full.nf
```

**Concept:** Chain everything. Fastp's output tuple `(sample_id, R1, R2)` is reshaped with `.map { sample_id, r1, r2 -> [r1, r2] }`, then `.collect()`ed and fed to `ReadLenDist`. This is the core pattern of real pipelines: **transform a channel's shape to fit the next process.**

**Script contents:**

{:.copy-code}

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

**Run the script:**

```bash
nextflow run pipelines/10_implementation_full.nf
ls 02_illuminaQC/ 03_trimmed/ 04_read_len_dist/
```

**What to expect:** QC reports, trimmed reads, and one combined `samples_read_len_dist.tsv` — the whole workflow in one run.

> ✏️ **Your turn:** Add `.view()` after `.map{…}` and again after `.collect()`. Predict each output *before* running, then check yourself.

---
</li>
</ol>

### Where to go next?

- Split processes into reusable **modules** (`include { FastQC } from './modules/fastqc.nf'`).
- Adopt the **`tuple val(meta), path(reads)`** metadata-map convention used by [nf-core](https://nf-co.re/).
- Explore community pipelines at [nf-core](https://nf-co.re/) before writing your own from scratch.
- Work through the official [Nextflow Training](https://training.nextflow.io/).

---

