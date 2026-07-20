---
title: Automating Bioinformatics Pipelines with Snakemake
type: workshop
display: basic
provider: [ISU, SCINet Office]
hideprovider: true
description: This hands-on workshop introduces Snakemake, a workflow management system that brings the readability of Python to scalable, reproducible computational pipelines. 
categories: [Bioinfo Foundations]
layout: event
parent: 
  title: Bioinformatics Foundations
  url: /events/bioinfo-foundations/


layout_type: workshop
sessions:
  - session:
    time: 1 – 5 PM ET
    date: 2026-07-21
    end_date: 2026-07-23
    multiday: Jul 21 & 23
    registration:
      url: https://forms.office.com/g/xU75HyHQKi

tags: bioinformatics python


---

This hands-on workshop introduces Snakemake, a workflow management system that brings the readability of Python to scalable, reproducible computational pipelines. 
We will start with simple examples and build to a real-world bioinformatics pipeline — learning how Snakemake's rule-based, 
file-driven approach automatically determines job dependencies, handles parallel execution, 
and integrates seamlessly with Python scripts and virtual environments to produce publication-ready outputs.<!--excerpt-->

**No prior experience with Snakemake or any other workflow manager is required.** We assume basic
command-line familiarity: navigating directories, running a program, and editing a file.

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

* Create your workshop working directory and copy the tutorial materials into it. You do not have to edit these commands with your username — it is filled in by the `$USER` variable.

  ```bash
  mkdir -p /90daydata/shared/$USER/snakemake
  cd /90daydata/shared/$USER/snakemake
  cp -a /project/scinet_workshop2/foundations_bioinf_2026/snakemake_data/snakemake_material.tar.gz .
  tar -xf snakemake_material.tar.gz
  ls
  ```
  {:.copy-code}

  This one archive contains everything you need: the read data (`01_data/`), the reference genome
  (`test_genome/`), the pipeline scripts (`pipelines/`), helper script (`scripts/`), and the config files. You should see:

  ```
  01_data  test_genome  config.yaml  hello_config.yaml  pipelines  scripts
  ```

  Inside `01_data/` are five paired-end samples (`bio_sample_01`–`bio_sample_05`, each with an
  `_R1`/`_R2` FASTQ file).

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
  * Working Directory: `/90daydata/shared/$USER/snakemake`
* Click Launch. When your VS Code session is ready, the top card updates from *Queued* to *Running* and a *Connect to VS Code* button appears. Click *Connect to VS Code.*

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Activate Snakemake

Activate the ready-made conda environment for the workshop. Do this once in each new shell, including
the terminal inside VS Code:

```bash
source activate /project/scinet_workshop2/foundations_bioinf_2026/snakemake_data/envs/snakemake
snakemake --version
```
{:.copy-code}

`snakemake --version` should print a version number (`9.23.1`). This environment
provides Snakemake, Python, and Fastp, so the pipeline can call them directly. FastQC is loaded
inside its rule with `module load fastqc`, as you will see below. You are ready to go.

</li>
</ol>

---

## An Introduction to Snakemake

*Instructors: Viswanathan Satheesh, Rick Masonbrink, Siva Chudalayandi*

### Learning objectives

By the end of this workshop, you will be able to:

1. **Write Snakemake rules** — defining a rule's inputs, outputs, and shell command, and letting
   Snakemake work out how the rules connect.
2. **Process many samples at once** — using wildcards and `expand()` so a single rule applies to any
   number of samples, without writing loops.
3. **Make a pipeline configurable and reproducible** — using a config file for paths and settings,
   and running tools from a conda environment.

### How Snakemake works

A Snakemake workflow is a set of **rules**. Each rule describes one step of an analysis by declaring:

- its **output** — the file(s) the rule produces,
- its **input** — the file(s) that must already exist for the rule to run, and
- the **shell command** (or script) that turns the inputs into the outputs.

You do not tell Snakemake the order to run things. Instead, Snakemake looks at the output you ask
for, finds the rule that produces it, then finds the rules that produce *that* rule's inputs, and so
on, until it reaches files that already exist on disk. The result is a **directed acyclic graph
(DAG)** of jobs:

- **graph** — jobs connected by their input/output dependencies;
- **directed** — each edge points from a file to the job that consumes it;
- **acyclic** — no cycles: a file cannot, directly or indirectly, depend on itself.

Snakemake runs the jobs in an order consistent with that graph and runs independent jobs in parallel
when it can. If an output already exists and is newer than its inputs, Snakemake skips it — so
re-running a pipeline only redoes the work that is actually out of date.

### What you'll build

We build the workflow in two parts. First, a read quality-control pipeline: run FastQC on the raw
reads, trim them with Fastp, summarize the read lengths, and run FastQC again on the trimmed reads.
Then a variant-calling pipeline: align the trimmed reads to a reference genome and call variants.

```
Quality control
  Raw reads ──► FastQC (raw reads)
            └─► Fastp (trimming) ─┬─► FastQC (trimmed reads)
                                  └─► ReadLenDist (read-length table)

Variant calling
  Reference ─────┐
                 ├─► bwa-mem2 mem | samtools sort ──► samtools index ──► bcftools call ──► VCF
  Trimmed reads ─┘
```

---

**Naming conventions**

Snakemake follows a few simple naming conventions. The table below summarizes the conventions used throughout this workshop.

{% include table caption="Naming conventions" content="| Thing                      | Convention                                        | Examples (used in this workshop)                                   |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| **Rule names**             | `snake_case`, named after *what they do*          | `fastqc`, `fastp`, `read_len_dist`                                 |
| **Wildcards**              | `snake_case` inside `{ }`                         | `{sample}`, `{mate}`                                               |
| **Config keys**            | `snake_case`, accessed via `config[...]`          | `config['reads_dir']`, `config['output_qc']`                       |
| **Script / config files**  | `.smk` for pipelines, `config.yaml` for config    | `10_implementation_full.smk`, `config.yaml`                        |
| **Output directories**     | numbered prefix so results sort in pipeline order | `01_data/`, `02_illuminaQC/`, `03_trimmed/`, `04_read_len_dist/`   |
| **Paired-end read files**  | shared sample name + `_R1`/`_R2` token            | `bio_sample_01_R1.fastq.gz`, `bio_sample_01_R2.fastq.gz`           |" %}

> 💡 The numbered output directories (`01_…`, `02_…`) are a workshop convention, not a Snakemake
> feature — they keep results sorted in pipeline order. Rule and wildcard casing, however, are
> conventions worth following.

**One important detail:** Inside a rule's `shell:` block, expressions such as `{input}`,
`{output}`, `{params}`, and `{wildcards.sample}` are Snakemake placeholders. Snakemake replaces 
them with their values before executing the shell command. If you need literal braces for the shell
(for example, in an `awk` program or a Bash parameter expansion), double them (`{% raw %}{{...}}{% endraw %}`). Snakemake 
converts `{% raw %}{{{% endraw %}` and `{% raw %}}}{% endraw %}` back to `{` and `}` before running the command.

```python
shell:
    """{% raw %}
    awk '{{print $1}}' {input} > {output}
    echo "running on ${{HOSTNAME}}"
    """{% endraw %}
```
{:.copy-code}

* {% raw %}{{print $1}}{% endraw %} becomes {print $1} for awk.
* {% raw %}${{HOSTNAME}}{% endraw %} becomes ${HOSTNAME} for Bash.

Forgetting to double the braces is a common mistake: Snakemake will try to interpret the text inside `{...}` as one of its own placeholders, resulting in an error.

---

## Building the quality-control pipeline

We build the pipeline in stages. First, five short examples introduce the syntax of a rule; then we
apply rules to the real data with wildcards, add each tool, and finish with the complete pipeline.

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### The shape of a rule

**You do not have to write these files.** Every script in this workshop is already in the `pipelines/`
directory you extracted during setup, numbered in the order we work through them. For each
one, you follow the same three steps: **open it, read it, run it**, then look at what changed on disk.

Every rule answers the same two questions: *what file do I make, and what do I need to make it?*

#### 1 — A rule that runs a command  (`01_hello_screen.smk`)

**What you do:**

1. **Open the script.** In the VS Code file browser on the left, expand `pipelines/` and click
   `01_hello_screen.smk`. (Or, from the terminal, `cat pipelines/01_hello_screen.smk` shows the same
   thing.)
2. **Read it.** This rule just prints to the screen. It has no `output:`, so it makes no file.

```python
# Script 01: Hello World — your first Snakemake rule
rule hello:
    shell:
        """
        echo "Welcome to the world of Snakemake!"
        """
```
{:.copy-code}

**Run it.**

```bash
snakemake -c1 --snakefile pipelines/01_hello_screen.smk
```
{:.copy-code}

The first rule in a file is the **default target**, so `hello` runs: you will see the message print,
and no file appears.

#### 2 — Track an output file  (`02_hello_redirect.smk`)

**What you do:**

Open `pipelines/02_hello_redirect.smk`. Add an `output:` and Snakemake starts tracking a file. Add a `rule all` that asks for that file, and
it becomes the **target** Snakemake tries to produce.

```python
# Script 02: Writing to files
rule hello:
    output:
        "result.txt"
    shell:
        """
        echo "Welcome to the world of Snakemake!" > {output}
        """

rule all:
    input:
        "result.txt"
```
{:.copy-code}

```bash
snakemake -c1 --snakefile pipelines/02_hello_redirect.smk
cat result.txt
snakemake -c1 --snakefile pipelines/02_hello_redirect.smk   # run again → "Nothing to be done"
```
{:.copy-code}

The second run does nothing because `result.txt` already exists and is up to date. This incremental
behavior is something we rely on throughout the workshop.

#### 3 — Organize outputs into a directory  (`03_hello_outputdir.smk`)

Open `pipelines/03_hello_outputdir.smk`. Putting a directory in the `output:` path is all it takes to
organize results; the `mkdir -p` in the shell command makes sure the directory exists first.

```python
# Script 03: Publishing to a directory
rule hello:
    output:
        "output/result.txt"
    shell:
        """
        mkdir -p output
        echo "Hello Snakemake World!" > {output}
        """

rule all:
    input:
        "output/result.txt"
```
{:.copy-code}

```bash
rm output/result.txt
snakemake -c1 --snakefile pipelines/03_hello_outputdir.smk 
cat output/result.text
```
{:.copy-code}

The `result.txt` file or the `output` directory has to be deleted for the rule to run.

#### 4 — Take an input  (`04_hello_input.smk`)

Open `pipelines/04_hello_input.smk`. An `input:` block makes a rule depend on a file. Named inputs are referenced as `{input.name}`.

```python
# Script 04: Rule inputs
rule hello:
    input:
        welcome = "welcome.txt"
    output:
        "output/result.txt"
    shell:
        """
        mkdir -p output
        cat {input.welcome} > {output}
        """

rule all:
    input:
        "output/result.txt"
```
{:.copy-code}

```bash
echo "Hello, welcome to the world of Snakemake!" > welcome.txt
snakemake -c1 --snakefile pipelines/04_hello_input.smk
cat output/result.txt
```
{:.copy-code}

#### 5 — Make it configurable  (`05_hello_default.smk` + `hello_config.yaml`)

Open `pipelines/05_hello_default.smk`. `configfile:` loads a YAML file into a `config` dictionary. `config.get("key", default)` reads a
value with a fallback, and `--config key=value` overrides it on the command line.

```python
# Script 05: Config parameters
configfile: "hello_config.yaml"

rule hello:
    output:
        "output/result.txt"
    params:
        welcome = config.get("welcome", "Hello, welcome to the world of Snakemake!")
    shell:
        """
        mkdir -p output
        echo "{params.welcome}" > {output}
        """

rule all:
    input:
        "output/result.txt"
```
{:.copy-code}

`hello_config.yaml` is found in your working directory (not in `pipelines/`) and holds the key the pipeline reads:

```yaml
welcome: "Hello, welcome to the world of Snakemake!"
```
{:.copy-code}

```bash
snakemake -c1 --snakefile pipelines/05_hello_default.smk
snakemake -c1 --snakefile pipelines/05_hello_default.smk --config welcome="Greetings from the command line!"
cat output/result.txt
```
{:.copy-code}

The precedence is: command line > config file > in-script default.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### How Snakemake decides what to rerun

Snakemake reruns a rule when its output is **missing**, or when an **input is newer** than the
output. Script 04 depends on `welcome.txt`; use a **dry run** (`-n`, which reports what Snakemake
*would* do without running anything) to watch the decision.

Delete the output and dry-run:

```bash
snakemake -c1 -s pipelines/04_hello_input.smk    # up to date — nothing to do
rm output/result.txt                             # remove the output Snakemake made
snakemake -n -s pipelines/04_hello_input.smk     # dry run
```
{:.copy-code}

The `reason:` line reports that the output is missing, so Snakemake schedules the rule to rebuild it.

Now recreate the file with `touch` and dry-run again:

```bash
touch output/result.txt
snakemake -n -s pipelines/04_hello_input.smk
```
{:.copy-code}

This time Snakemake reports *"Nothing to be done."* `touch` created an (empty) `output/result.txt`,
so the file exists and is newer than `welcome.txt`. Snakemake decides from file existence and
modification time, not file **contents** — so it trusts the empty file. If you ever need to force a
rebuild anyway (for example, an output was corrupted), use `--forcerun`:

```bash
snakemake -n -s pipelines/04_hello_input.smk --forcerun hello
```
{:.copy-code}

`--forcerun hello` schedules the rule regardless of filesystem state, and the `reason:` becomes
*"Forced execution."*

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### One rule, many samples: wildcards and `expand()`

The examples above each made a single file. Real data comes in many files, and we do not want to
write a rule per sample. Two Snakemake tools handle this:

- **`glob_wildcards(pattern)`** looks at the files already on disk and extracts the varying part of
  each filename into a list. It runs once, before any job.
- **`expand(pattern, name=LIST)`** does the reverse: it fills a list back into a set of concrete file
  paths — the targets you want built.

First, see what `glob_wildcards` finds. Open `pipelines/06_implementation_fastqc.smk` and add a
`print` line directly below the existing `glob_wildcards` call near the top:

```python
SAMPLES, = glob_wildcards("01_data/{sample}.fastq.gz")
print(SAMPLES) # <- add this line
```
{:.copy-code}

Save the file, then dry-run it. Snakemake executes the top-level Python in a `.smk` file while
parsing it, so the `print` runs even though `-n` stops any job from executing:

```bash
snakemake -n -s pipelines/06_implementation_fastqc.smk
```
{:.copy-code}

You will see the list of names pulled from the filenames — one entry per file, with `{sample}`
standing in for whatever the `*` would have matched:

```
['bio_sample_01_R1', 'bio_sample_01_R2', 'bio_sample_02_R1', 'bio_sample_02_R2', ...]
```

> 💡 The comma in `SAMPLES, =` is required. `glob_wildcards` returns a tuple of wildcard lists (one
> per `{ }` in the pattern); the trailing comma unpacks the single list. With two wildcards you would
> write `SAMPLES, MATES = glob_wildcards("01_data/{sample}_{mate}.fastq.gz")`.

Remove the `print` line again before moving on. It is only there to make the list visible.

`expand()` turns a list into concrete paths — the targets a `rule all` asks for:

```python
expand("02_illuminaQC/{sample}_fastqc.html", sample=SAMPLES)
# ->  ['02_illuminaQC/bio_sample_01_R1_fastqc.html',
#      '02_illuminaQC/bio_sample_01_R2_fastqc.html', ...]
```

Given two lists, `expand()` produces every combination — every `sample` paired with every `mate` —
which is how the later scripts request both reads of every pair:

```python
expand("02_illuminaQC/{sample}_{mate}_fastqc.html", sample=SAMPLES, mate=["R1", "R2"])
```

A wildcard in a rule's `output:` is what lets one rule apply to many files: Snakemake matches the
rule once for each requested target, substituting the wildcard each time.

> **Two glob patterns, two meanings.** `glob_wildcards("01_data/{sample}.fastq.gz")` treats each
> *file* separately, so `{sample}` includes the `_R1`/`_R2` token (`bio_sample_01_R1`).
> `glob_wildcards("01_data/{sample}_R1.fastq.gz")` matches only R1 files, so `{sample}` is the *pair*
> name (`bio_sample_01`). The first is used for per-file FastQC; the second for per-pair trimming.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### FastQC — your first real rule

FastQC produces a quality report for one sequencing file. The target for one file is:

```
02_illuminaQC/bio_sample_01_R1_fastqc.html
02_illuminaQC/bio_sample_01_R1_fastqc.zip
```

It needs one input — the raw read file `01_data/bio_sample_01_R1.fastq.gz` — and the `fastqc` tool.
Script `06_implementation_fastqc.smk` writes this as a rule with a `{sample}` wildcard,
so it applies to every file. Read the script and dry-run it first to see how many jobs Snakemake plans:

```bash
snakemake -n -s pipelines/06_implementation_fastqc.smk
```
{:.copy-code}

With five paired-end samples there are ten files, so ten `fastqc` jobs, plus the `all` target:

```
Job stats:
job       count
-------   -----
all           1
fastqc       10
total        11
```

The rule itself. FastQC is loaded with `module load fastqc`; the `{sample}` wildcard is what makes
one rule cover every file:

```python
rule fastqc:
    input:
        "01_data/{sample}.fastq.gz"
    output:
        html = config.get("output_qc", "02_illuminaQC") + "/{sample}_fastqc.html",
        zip  = config.get("output_qc", "02_illuminaQC") + "/{sample}_fastqc.zip"
    params:
        outdir = config.get("output_qc", "02_illuminaQC")
    shell:
        """
        module load fastqc
        mkdir -p {params.outdir}
        fastqc -o {params.outdir} -t 2 {input}
        """
```

Run it, giving Snakemake several cores so independent jobs run at the same time:

```bash
snakemake -c4 -s pipelines/06_implementation_fastqc.smk
```
{:.copy-code}

You will see Snakemake count down the steps, interleaved with FastQC's progress lines, ending with:

```
...
Started analysis of bio_sample_01_R1.fastq.gz
Analysis complete for bio_sample_01_R1.fastq.gz
...
11 of 11 steps (100%) done
```

Check the reports with `ls 02_illuminaQC/`; each file should have a matching `.html`/`.zip` pair.
A few things to watch for:

To see the incremental engine at work, delete one report and dry-run:

```bash
rm 02_illuminaQC/bio_sample_01_R1_fastqc.html
snakemake -n -s pipelines/06_implementation_fastqc.smk
```
{:.copy-code}

Snakemake schedules exactly one `fastqc` job — the one whose output you removed — and reports the
rest as up to date. You can also ask for a single file by name, and Snakemake builds only what that
file needs:

```bash
snakemake -c1 -s pipelines/06_implementation_fastqc.smk 02_illuminaQC/bio_sample_01_R1_fastqc.html
```
{:.copy-code}

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Fastp — a rule with paired inputs and outputs

Trimming works on a *pair* of reads at once, so this rule has two inputs and two outputs, each given
a name. The target for one sample:

```
03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
03_trimmed/bio_sample_01_R2.trimmed.fastq.gz
```

Script `07_implementation_fastp.smk` globs on the R1 pattern, so `{sample}` is the
*pair* name (`bio_sample_01`). Fastp comes from the active conda environment, so the rule calls it
directly — no `module load`:

```python
SAMPLES, = glob_wildcards(config.get("reads", "01_data/{sample}_R1.fastq.gz"))

rule fastp:
    input:
        r1 = "01_data/{sample}_R1.fastq.gz",
        r2 = "01_data/{sample}_R2.fastq.gz"
    output:
        r1 = config.get("output_trim", "03_trimmed") + "/{sample}_R1.trimmed.fastq.gz",
        r2 = config.get("output_trim", "03_trimmed") + "/{sample}_R2.trimmed.fastq.gz"
    params:
        outdir = config.get("output_trim", "03_trimmed")
    shell:
        """
        mkdir -p {params.outdir}
        fastp -i {input.r1} -I {input.r2} -o {output.r1} -O {output.r2}
        """
```

Because the glob matches pairs, there are five `fastp` jobs, not ten:

```bash
snakemake -c4 -s pipelines/07_implementation_fastp.smk
```
{:.copy-code}

```
job      count
------   -----
all          1
fastp        5
total        6
```

The single `{sample}` wildcard ties all four paths together: whatever matches in the output must
match in both inputs, which is what keeps a pair of reads together. Fastp also writes before/after
statistics to its log.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Combining rules in one pipeline

Put FastQC and Fastp in the same file Script `08_implementation_fastqc_fastp.smk` and
ask for both sets of outputs in one `rule all`. Neither rule uses the other's output; both read the
raw reads. Dry-run it:

```bash
snakemake -n -s pipelines/08_implementation_fastqc_fastp.smk
```
{:.copy-code}

```
job      count
------   -----
all          1
fastqc      10
fastp        5
total       16
```

In this combined file, FastQC uses the `{sample}_{mate}` pattern so it again matches every individual
read (10 jobs), while Fastp stays per-pair (5). Run it with more cores and the FastQC and Fastp jobs
run at the same time, because nothing in the DAG forces an order between them:

```bash
snakemake -c16 -s pipelines/08_implementation_fastqc_fastp.smk
```
{:.copy-code}

You never explicitly request parallel execution. Snakemake determines the execution order from the dependency 
graph. Whenever two jobs are independent, when neither depends on the output of the other, Snakemake 
can run them concurrently, subject to the available resources.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### ReadLenDist — combining many files into one

The read-length table summarizes *all* the trimmed reads in a single file. Unlike the earlier rules,
this one takes many inputs and produces one output — so there is no wildcard on the output, and
`expand()` gathers every trimmed file as input
(Script `09_implementation_read_len_dist.smk`):

```python
# Script 09: Read-length distribution
configfile: "config.yaml"

SAMPLES, = glob_wildcards(config["output_trim"] + "/{sample}_R1.trimmed.fastq.gz")

rule all:
    input:
        config["output_rld"] + "/samples_read_len_dist.tsv"

rule read_len_dist:
    input:
        reads = expand(config["output_trim"] + "/{sample}_{mate}.trimmed.fastq.gz",
                       sample=SAMPLES, mate=["R1", "R2"])
    output:
        config["output_rld"] + "/samples_read_len_dist.tsv"
    threads: 1
    resources:
        mem_mb = 2000,
        runtime = 30
    log:
        "logs/read_len_dist/read_len_dist.log"
    shell:
        "python scripts/read_length_dist.py {output} {input.reads}"
```

The `expand()` in `input:` lists all ten trimmed files as dependencies, so this rule will not run
until every trimmed read exists. `{input.reads}` then expands to all ten paths on the command line,
which the helper script `scripts/read_length_dist.py` reads in one pass. This rule calls `python`
directly from the active conda environment.

```bash
snakemake -c4 -s pipelines/09_implementation_read_len_dist.smk
head -n 4 04_read_len_dist/samples_read_len_dist.tsv
```
{:.copy-code}

```
job             count
-------------   -----
all                 1
read_len_dist       1
total               2
```
```
length  count   file
20      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
26      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
30      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
```

There is a single `read_len_dist` job regardless of how many samples there are.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### The complete pipeline

Script `10_implementation_full.smk` combines the three rules, `fastqc`, `fastp`, and
`read_len_dist`, with a `rule all` that asks for every final output. It reads paths and settings
from `config.yaml` (`reads_dir`, `output_qc`, `output_trim`, `output_rld`, `threads`) and gives each
rule `resources:` and a `log:`:

```python
# Script 10: The complete pipeline
configfile: "config.yaml"

SAMPLES, = glob_wildcards(config["reads_dir"] + "/{sample}_R1.fastq.gz")

rule all:
    input:
        fastqc = expand(config["output_qc"] + "/{sample}_{mate}_fastqc.html",
                        sample=SAMPLES, mate=["R1", "R2"]),
        trimmed = expand(config["output_trim"] + "/{sample}_{mate}.trimmed.fastq.gz",
                         sample=SAMPLES, mate=["R1", "R2"]),
        rld = config["output_rld"] + "/samples_read_len_dist.tsv"

rule fastqc:
    input:
        config["reads_dir"] + "/{sample}_{mate}.fastq.gz"
    output:
        html = config["output_qc"] + "/{sample}_{mate}_fastqc.html",
        zip  = config["output_qc"] + "/{sample}_{mate}_fastqc.zip"
    params:
        outdir = config["output_qc"]
    threads: config["threads"]
    resources:
        mem_mb = 2000,
        runtime = 30
    log:
        "logs/fastqc/{sample}_{mate}.log"
    shell:
        """
        module load fastqc
        fastqc -o {params.outdir} -t {threads} {input} &> {log}
        """

rule fastp:
    input:
        r1 = config["reads_dir"] + "/{sample}_R1.fastq.gz",
        r2 = config["reads_dir"] + "/{sample}_R2.fastq.gz"
    output:
        r1 = config["output_trim"] + "/{sample}_R1.trimmed.fastq.gz",
        r2 = config["output_trim"] + "/{sample}_R2.trimmed.fastq.gz"
    threads: config["threads"]
    resources:
        mem_mb = 4000,
        runtime = 30
    log:
        "logs/fastp/{sample}.log"
    shell:
        """
        fastp -i {input.r1} -I {input.r2} -o {output.r1} -O {output.r2} --thread {threads} &> {log}
        """

rule read_len_dist:
    input:
        reads = expand(config["output_trim"] + "/{sample}_{mate}.trimmed.fastq.gz",
                       sample=SAMPLES, mate=["R1", "R2"])
    output:
        config["output_rld"] + "/samples_read_len_dist.tsv"
    threads: 1
    resources:
        mem_mb = 2000,
        runtime = 30
    log:
        "logs/read_len_dist/read_len_dist.log"
    shell:
        "python scripts/read_length_dist.py {output} {input.reads}"
```

Render the DAG and dry-run it:

```bash
snakemake --dag -s pipelines/10_implementation_full.smk | dot -Tsvg > dag.svg
# open dag.svg in the VS Code file browser (dot comes from graphviz)
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

```
job             count
-------------   -----
all                 1
fastqc             10
fastp               5
read_len_dist       1
total              17
```

In the graph, `fastp` feeds `read_len_dist` (trimmed reads → table), while `fastqc` reads the raw
reads on its own branch. Build the whole pipeline from the raw reads:

```bash
snakemake -c8 -s pipelines/10_implementation_full.smk
```
{:.copy-code}

Snakemake runs the steps in dependency order. FastQC and Fastp first, then `read_len_dist` once the
trimmed reads exist.

To see the incremental engine handle a change mid-pipeline, update one trimmed file's timestamp and
dry-run:

```bash
touch 03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

`read_len_dist` is scheduled to rerun because it consumes that file, while `fastqc` and `fastp` are
not, because nothing they depend on changed. One changed/deleted file, one downstream rebuild, everything
else left as it is.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### FastQC on the trimmed reads

To confirm that trimming did its job, run FastQC again. This time on the trimmed reads. It is the
same tool with different inputs and outputs, so we add a second rule, `fastqc_trimmed`
(Script `11_add_fastqc.smk`):

```python
rule fastqc_trimmed:
    input:
        config["output_trim"] + "/{sample}_{mate}.trimmed.fastq.gz"
    output:
        html = config["output_qc_trimmed"] + "/{sample}_{mate}.trimmed_fastqc.html",
        zip  = config["output_qc_trimmed"] + "/{sample}_{mate}.trimmed_fastqc.zip"
    params:
        outdir = config["output_qc_trimmed"]
    threads: config["threads"]
    resources:
        mem_mb = 2000,
        runtime = 30
    log:
        "logs/fastqc_trimmed/{sample}_{mate}.log"
    shell:
        """
        module load fastqc
        fastqc -o {params.outdir} -t {threads} {input} &> {log}
        """
```

Its input is the trimmed reads produced by Fastp, so Snakemake automatically runs it after trimming.
Script 11 is the complete pipeline from before plus this rule.

</li>
</ol>

---

## Building the variant-calling pipeline

Now we take the trimmed reads and find where each sample differs from a reference genome. The tools
are `bwa-mem2` (alignment), `samtools` (sorting and indexing), and `bcftools` (variant calling), each
loaded with `module load`. The end result is a VCF file for each sample.

These rules read three settings from `config.yaml`; add them if they are not already present:

```yaml
genome: "test_genome/b73_chr1_150000001-151000000.fasta"
output_aligned: "07_aligned"
output_variants: "08_variants"
```
{:.copy-code}

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Indexing the reference

Before it can be aligned or called against, the reference must be indexed; once by `bwa-mem2` for
alignment and once by `samtools` for calling. Script `12_reference_index.smk` makes
both. The new function is `multiext`, which names one prefix with several suffixes, because `bwa-mem2`
writes five index files at once:

```python
configfile: "config.yaml"

GENOME = config["genome"]

rule bwa_index:
    input:
        GENOME
    output:
        multiext(GENOME, ".0123", ".amb", ".ann", ".bwt.2bit.64", ".pac")
    shell:
        """
        module load bwa_mem2
        bwa-mem2 index {input}
        """

rule faidx:
    input:
        GENOME
    output:
        GENOME + ".fai"
    shell:
        """
        module load samtools
        samtools faidx {input}
        """
```

```bash
snakemake -c2 -s pipelines/12_reference_index.smk
```
{:.copy-code}

```
job          count
----------   -----
all              1
bwa_index        1
faidx            1
total            3
```

The index is built once, not per sample, because it depends only on the genome. An index file is
just another output that a later rule will require.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Alignment

The alignment target is a sorted BAM for each sample, e.g. `07_aligned/bio_sample_01.sorted.bam`. It
needs the two trimmed reads, the reference, and the reference's bwa-mem2 index. The shell pipes the
aligner straight into `samtools sort`, so the output is coordinate-sorted
(Script `13_align.smk`):

```python
rule bwa_map:
    input:
        r1 = config["output_trim"] + "/{sample}_R1.trimmed.fastq.gz",
        r2 = config["output_trim"] + "/{sample}_R2.trimmed.fastq.gz",
        genome = GENOME,
        idx = multiext(GENOME, ".0123", ".amb", ".ann", ".bwt.2bit.64", ".pac")
    output:
        config["output_aligned"] + "/{sample}.sorted.bam"
    threads: 4
    resources:
        mem_mb = 8000,
        runtime = 60
    log:
        "logs/bwa_map/{sample}.log"
    shell:
        """
        module load bwa_mem2
        module load samtools
        bwa-mem2 mem -t {threads} {input.genome} {input.r1} {input.r2} 2> {log} | samtools sort -@ {threads} -o {output}
        """

rule bam_index:
    input:
        config["output_aligned"] + "/{sample}.sorted.bam"
    output:
        config["output_aligned"] + "/{sample}.sorted.bam.bai"
    shell:
        """
        module load samtools
        samtools index {input}
        """
```

Listing `idx` as an input forces the index to be built before any alignment runs. A companion
`bam_index` rule produces the `.bai`. Build the sorted, indexed BAMs:

```bash
snakemake -c8 -s pipelines/13_align.smk
```
{:.copy-code}

```
job          count
----------   -----
all              1
bwa_index        1
bwa_map          5
bam_index        5
total           12
```

`bwa_index` runs once; `bwa_map` and `bam_index` run five times each. (`faidx` does not run here — no
target needs the `.fai` yet.)

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Variant calling

The caller compares each sorted BAM against the reference, so it needs both, plus their indexes. The
output is a per-sample VCF listing the positions where that sample differs from the reference
(Script `14_call.smk`):

```python
rule call:
    input:
        bam = config["output_aligned"] + "/{sample}.sorted.bam",
        bai = config["output_aligned"] + "/{sample}.sorted.bam.bai",
        genome = GENOME,
        fai = GENOME + ".fai"
    output:
        config["output_variants"] + "/{sample}.vcf"
    log:
        "logs/call/{sample}.log"
    shell:
        """
        module load bcftools
        bcftools mpileup -f {input.genome} {input.bam} 2> {log} | bcftools call -mv -Ov -o {output}
        """
```

Listing `fai` as an input is why `faidx`, idle during alignment, now runs: Snakemake builds only
what a requested target needs. Build every VCF from the trimmed reads with one command:

```bash
snakemake -c8 -s pipelines/14_call.smk
head 08_variants/bio_sample_01.vcf
```
{:.copy-code}

```
job          count
----------   -----
all              1
bwa_index        1
faidx            1
bwa_map          5
bam_index        5
call             5
total           18
```

Snakemake indexed the reference, aligned and sorted five samples, indexed the BAMs, and called
variants — all in dependency order, with no ordering statements from you. Each
`08_variants/{sample}.vcf` is the list of positions where that sample differs from the reference.

</li>
</ol>

## Wrap-up

You built two working pipelines: a read quality-control pipeline (FastQC → Fastp → read-length
summary → FastQC on the trimmed reads) and a variant-calling pipeline (index → align → call). Along
the way you used the parts of Snakemake that cover most day-to-day work:

- **Rules** — each step declares the `output:` it produces, the `input:` it needs, and the command
  that connects them. You never write the run order.
- **The DAG** — Snakemake links rules by matching one rule's output to another's input, then runs
  jobs in dependency order, and in parallel wherever nothing forces a sequence.
- **Wildcards and `expand()`** — one rule applies to every sample, and `expand()` names the targets
  to build. No loops.
- **Incremental rebuilds** — a job reruns only when its output is missing or older than its inputs,
  so repeating a completed workflow takes less time than running the entire workflow again.
- **Config files** — paths, directories, and thread counts live in `config.yaml` instead of being
  hard-coded into the rules.
- **`threads:`, `resources:`, and `log:`** — each rule states what it needs and where its messages go.

The habit worth keeping is a small one: describe what each output requires, then ask Snakemake for
the result you want.

### Adapting these pipelines to your own data

Most of the time you only need to edit `config.yaml`:

- Point `reads_dir` at your own FASTQ directory and `genome` at your own reference.
- Check that your filenames match the glob pattern. These pipelines expect
  `{sample}_R1.fastq.gz` / `{sample}_R2.fastq.gz`; if yours use `_1`/`_2` or end in `.fq.gz`, update
  the pattern in `glob_wildcards()` and the matching rule inputs.
- Raise `threads` and each rule's `resources:` to suit your data — the reference and read files used
  here are deliberately small.

Run `snakemake -n` first. A dry run catches most path and pattern mistakes before anything executes.

### What we did not cover

Three things worth reading about:

- **Running on a cluster** — Snakemake's SLURM executor plugin, together with `--profile`, submits
  each job to the scheduler without changing a single rule.
- **Portable software** — the `conda:` and `container:` directives let a workflow fetch or build its
  own tools instead of relying on `module load`.
- **Organizing large workflows** — `include:` splits rules across files, and `use rule ... as ...`
  reuses an existing rule with different inputs and outputs.

### Where to go next

- [Snakemake documentation](https://snakemake.readthedocs.io/en/stable/) — the full reference.
- [Official Snakemake tutorial](https://snakemake.readthedocs.io/en/stable/tutorial/tutorial.html) — a longer, self-paced walkthrough.
- [Snakemake Wrappers](https://snakemake-wrappers.readthedocs.io/) — ready-made rules for common bioinformatics tools.
- [Snakemake Workflow Catalog](https://snakemake.github.io/snakemake-workflow-catalog/) — published, reusable workflows.
- [Snakemake Plugin Catalog](https://snakemake.github.io/snakemake-plugin-catalog/) — executor plugins, including SLURM.

