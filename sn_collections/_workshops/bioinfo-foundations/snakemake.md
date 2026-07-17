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
We will start with minimal examples and build to a real-world bioinformatics pipeline — learning how Snakemake's rule-based, 
file-driven approach automatically determines job dependencies, handles parallel execution, 
and integrates seamlessly with Python scripts and virtual environments to produce publication-ready outputs.<!--excerpt-->

**No prior Snakemake experience is required.** Basic command-line familiarity (navigating
directories, running a program, editing a file) is assumed. If you attended the Nextflow
workshop in this series, you'll recognize the tools and the data — this workshop deliberately
mirrors it, so you can more easily compare these two workflow management systems. Where appropriate, we point out
equivalent Nextflow commands in a "Nextflow mirror" note.

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

* Create your workshop working directory and copy the tutorial materials into it by running the following commands. Note: you do not have to edit the commands with your username as it will be determined by the `$USER` variable.

  ```bash
  mkdir -p /90daydata/shared/$USER/snakemake
  cd /90daydata/shared/$USER/snakemake
  cp -a /project/scinet_workshop2/foundations_bioinf_2026/snakemake_data/snakemake_material.tar.gz .
  tar -xf snakemake_material.tar.gz
  ls
  ```
  {:.copy-code}

  This one archive contains everything you need: the read data (`01_data/`), the pipeline scripts (`pipelines/`), and the config files.

  You should see the extracted contents — something like:

  ```
  01_data  test_genome  config.yaml  hello_config.yaml  pipelines
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

The materials you just unpacked include a ready-to-use Python environment with Snakemake already
installed. Activate it — you'll do this once in each new shell (including the terminal inside VS Code):

```bash
module load miniconda
mamba activate /project/scinet_workshop2/foundations_bioinf_2026/snakemake_data/envs/snakemake
snakemake --version
```
{:.copy-code}

`snakemake --version` should print a version number (e.g. `9.23.1`). You're ready to go.

</li>
</ol>

---

## An Introduction to Snakemake

*Instructors: Viswanathan Satheesh, Rick Masonbrink*

### Learning Objectives

By the end of this workshop, you will be able to:

1. **Write Snakemake pipelines from scratch** — define rules with inputs, outputs, and shell commands, and letting Snakemake infer how they connect.
2. **Process many files in parallel automatically** — use wildcards and `expand()` so one rule scales to any number of samples, with no hand-written loops.
3. **Make pipelines configurable, portable, and reproducible** — use config files, profiles, resources, and software environments (modules/conda) so a pipeline runs anywhere.
4. And, threaded through all of it, one meta-skill: 
   **Reason backward from a target.** Given a result you want, work out the chain of files and operations it depends on — which is exactly how Snakemake builds and runs a pipeline.

### What You'll Build

Across two half-days you'll build two pipelines. We start with a read-QC pipeline (the same tools
you used in the Nextflow workshop, so we move fast and focus on *how Snakemake thinks*) and then picks up where Nextflow's alignment left off and turns aligned reads into called variants.

```
Quality control
  Raw reads ──► FastQC (quality control)
            └─► Fastp (trimming) ──► ReadLenDist (read-length table)
                                 └─► FastQC on trimmed reads ──► MultiQC

Variant calling  (picks up from trimmed reads, going past where Nextflow stopped)
  Reference ─────┐
                 ├─► bwa mem | samtools sort ──► samtools index ──► bcftools call ──► VCF
  Trimmed reads ─┘                          └─► samtools flagstat / bcftools stats ──► MultiQC
```

---

### How this workshop works: the target-first lab

Picture this: You have a folder of results - a few tables, VCF files, etc. - with no pipeline and no notes. To reproduce or extend the work, you have to reason
from each result *backward* to the steps that produced it: *what had to exist for this file to exist?* 
That's not just a recovery skill — it is exactly how Snakemake thinks, and it's how we'll
work. We call it the **target-first lab**.

Most tutorials build forward: write step one, then step two,
wiring outputs into inputs until a result appears at the end. Snakemake runs the other way. You
name the target — the file you want — and the engine reasons *backward* to everything it
depends on, stopping when it reaches files already on disk. That dependency chain, walked in
reverse, *is* the pipeline. You never specify the run order; the order is a consequence of which
file needs which.

So every section today follows the same seven-beat rhythm:

The target-first lab — every section, same seven beats

1. **Target**  
   The output file 
1. **Interrogate**  
   "What does this need?" 
1. **Reveal**  
   `snakemake -n |grep "reason:"` 
1. **Predict**  
   Commit out loud: how many jobs? which first? what runs in parallel?
1. **Implement**  
    Each process becomes one rule (its output + its inputs)
1. **Run & verify**  
    Run it — did your prediction hold?
1. **Break the DAG**  
    Delete / touch / rename one file, dry-run, read the diagnosis


Two things about that rhythm:

- **It fades on purpose.** The first target of the day we walk every beat together at the
  whiteboard. By mid-morning you're interrogating in pairs in under a minute; by Day 2 it's a
  reflex. The scaffolding disappears as your reasoning speeds up — so don't expect every section
  below to spell out all seven beats. Early ones do; later ones assume you've got it.
- **Break the DAG is where it gets real.** Once you can draw a DAG, the way you truly *understand*
  it is by breaking it — delete an input, touch a file, rename an output, then dry-run and read what
  Snakemake says it can (and can't) still make. Reading Snakemake's dependency logic out loud is the
  single most useful thing you'll take back to your own work.

> **Nextflow mirror.** In Nextflow you *pushed* data forward through channels and thought about the final process last. In Snakemake you name the final file first and let the engine *pull* the pipeline into existence behind it. Same DAG — opposite direction of travel.

---

**Naming conventions (read this first!)**

Like Nextflow, Snakemake mixes naming styles on purpose — the style of a name tells you what kind
of thing it is.

{% include table caption="Naming conventions" content="| Thing                      | Convention                                        | Examples (used in this workshop)                                   |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| **Rule names**             | `snake_case`, named after *what they do*          | `fastqc`, `fastp`, `read_len_dist`, `bwa_map`, `call`              |
| **Wildcards**              | `snake_case` inside `{ }`                         | `{sample}`, `{mate}`                                               |
| **Config keys**            | `snake_case`, accessed via `config[...]`          | `config['reads']`, `config['output_qc']`                           |
| **Script / config files**  | `.smk` for pipelines, `config.yaml` for config    | `10_implementation_full.smk`, `config.yaml`                        |
| **Output directories**     | numbered prefix so results sort in pipeline order | `01_data/`, `02_illuminaQC/`, `03_trimmed/`, `04_read_len_dist/`   |
| **Paired-end read files**  | shared sample name + `_R1`/`_R2` token            | `bio_sample_01_R1.fastq.gz`, `bio_sample_01_R2.fastq.gz`           |" %}

> The numbered output directories (`01_…`, `02_…`) are *our* workshop convention, not a Snakemake rule — they keep results in pipeline order. Rule and wildcard casing, however, are conventions worth following.

**The one gotcha: `{ }` is Snakemake, `{% raw %}{{ }}{% endraw %}` is a literal brace for bash.**

Inside a rule's `shell:` block, `{input}`, `{output}`, `{params}`, and `{wildcards.x}` are
**Snakemake** placeholders — substituted *before* the command runs. If you need a literal brace
for the shell (bash `${VAR}` expansion, an `awk '{print}'` body, etc.), you must double it as
`{% raw %}{{ }}{% endraw %}`:

```python
shell:
    """
    awk '{% raw %}{{print $1}}{% endraw %}' {input} > {output}   # {% raw %}{{ }}{% endraw %} → literal braces for awk
    echo "running on ${% raw %}{{HOSTNAME}}{% endraw %}"          # {% raw %}{{ }}{% endraw %} → literal ${ } for bash
    """
```

Forgetting to double the braces is one of the most common Snakemake errors — Snakemake will try
(and fail) to resolve your bash expression as one of its own placeholders. *(This is the exact
mirror of Nextflow's `$var` vs `\$var` gotcha.)*

> 💡 **Naming tip for your own pipelines:** name a rule after *what it does* (`align_reads`, not
> `step3`). 

---

## The pull model, on familiar ground

**Goal:** learn the Snakemake building blocks — rules, outputs, inputs, config, wildcards,
and the DAG. Since we are implementing a known pipeline, FastQC -> Fastp -> ReadLenDist, initially, we can spend our attention on *how Snakemake thinks*.

### The first case: start at the answer

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Target

Here is the one file the QC pipeline exists to produce. 

```
04_read_len_dist/samples_read_len_dist.tsv

length   count    file
20      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
26      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
30      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
...
```

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Interrogate

Don't think about tools yet. 

**"What has to already exist for this to exist?"**

- The table needs… the **trimmed reads** (and a step that counts lengths).
- The trimmed reads need… the **raw reads** (and a step that trims — that's Fastp).
- The raw reads need… **nothing** — they're already on disk, off the sequencer.

You just hit bedrock. Walk that chain in reverse and you've drawn the pipeline:

```
 [ raw reads ] ──► [ trimmed reads ] ──► [ read-length table ]
   01_data/          03_trimmed/           04_read_len_dist/
 (found, not made)                          ← what we want
```

One more box: **FastQC** produces a quality report. Where does it fit? It needs the **raw reads**
too — so it branches off the same starting point, independent of trimming:

```
                      ┌──► [ FastQC report ]        02_illuminaQC/
 [ raw reads ] ───────┤
   01_data/           └──► [ trimmed reads ] ──► [ read-length table ]
 (found)                     03_trimmed/           04_read_len_dist/
```

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Reveal — the machine asks your questions

You drew that from a target and a single question.

Now watch Snakemake do the identical thing. A finished version of this pipeline already ships in
`pipelines/10_implementation_full.smk` — we'll build our own from scratch over the day, but for now
just let Snakemake *reason* about it, running nothing:

```bash
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

For every job it lists, Snakemake prints a `reason:` — *"Missing output files…"*, *"Input files
updated…"*. That list **is** your interrogation, run by a machine. *(Recent Snakemake prints the
reason by default in a dry run; `--reason` guaranteed it in previous versions.)* 

Now have it draw the graph:

```bash
snakemake --dag -s pipelines/10_implementation_full.smk | dot -Tsvg > dag.svg
# open dag.svg in the VS Code file browser
```
{:.copy-code}

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Predict  

Before we build anything, count the raw reads and commit to numbers:

```bash
ls 01_data/*.fastq.gz | wc -l
```
{:.copy-code}

How many **FastQC** jobs will run (one per file)? How many **Fastp** jobs (one per
*pair*)? Which rule starts first, and what runs at the same time? Hold that guess — we'll check it
against real runs as we fill in the boxes.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Build the pipeline

For the rest of Day 1 we *build* this pipeline ourselves:  
1. Each box on the board becomes one **rule**.  
1. We run and check our predictions.  
1. We deliberately break it to watch the dependency logic bite.

> **Nextflow mirror.** Same DAG you'd have built with channels — but there you *wired* it forward
> and got parallelism by splitting a channel. Here you just noticed two things need the same input.
> You didn't explicitly code the parallelism; Snakemake discovered it automatically from the shared dependencies you declared.

</li>
</ol>

### Syntax unlocks: the shape of a rule

The Target-First rhythm needs one thing before we can play it on real data: the syntax of a rule.
These five 60-second unlocks give you exactly that — they are not the story, they're the
vocabulary. If you did the Nextflow hello-world series, this is the same five ideas in Snakemake's
spelling. Create each file, run it, watch what changes, move on.

The shape never varies:

**A rule says: here is the file I make, and here are the files I need.**

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### A rule that runs a command  
(`01_hello_screen.smk`)
{:.subheader}

This rule just prints to the screen; it has no `output:`, so it makes no file.

```python
# Script 01: Hello World — your first Snakemake rule
rule hello:
    shell:
        """
        echo "Welcome to the world of Snakemake!"
        """
```
{:.copy-code}

```bash
snakemake -c1 --snakefile pipelines/01_hello_screen.smk
```
{:.copy-code}

The first rule in a file is the **default target**, so `hello` runs — you'll see the greeting print
and no file appear.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Track an output file  
(`02_hello_redirect.smk`)
{:.subheader}

Add an `output:` and Snakemake starts tracking a file; add a `rule all` that asks for it — that's
the **target**.

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

The second run does nothing because `result.txt` already exists and is up to date — the incremental
engine we'll use all day.

> **Nextflow mirror.** `rule all` plays the role of the final consumer of a channel; the declared
> output path *is* the `path` output — but there's no `publishDir`, because a Snakemake output simply
> **is** the path you name.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Organize outputs into a directory  
(`03_hello_outputdir.smk`)
{:.subheader}

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

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Take an input  
(`04_hello_input.smk`)
{:.subheader}

An `input:` block makes a rule depend on a file; named inputs are reached as `{input.name}`.

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

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
#### Make it configurable   
(`05_hello_default.smk` + `hello_config.yaml`)
{:.subheader}

`configfile:` loads a YAML file into a `config` dictionary; `config.get("key", default)` reads a
value with a fallback. Override any key with `--config key=value`.

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

`hello_config.yaml` contains the key the pipeline reads:

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

**Priority:** command line > config file > in-script default.

> **Nextflow mirror.** `hello_config.yaml` + `config[...]` is Snakemake's `params` + `nextflow.config`;
> the override precedence is the same idea you saw with `--welcome` on the Nextflow command line.

</li></ol>

### Break the DAG (your first one)

The unlocks are done — now use one to see the incremental engine's logic in the open. Run script `04_hello_input.smk` again, 
delete the output file, and re-run the script:

```bash
snakemake -c1 -s pipelines/04_hello_input.smk    # up to date — nothing to do
rm output/result.txt                             # delete the output Snakemake made
snakemake -n -s pipelines/04_hello_input.smk     # dry run: what does Snakemake now want to redo?
```
{:.copy-code}

Read the `reason:` — the output file is missing, so Snakemake schedules the `hello` rule to
rebuild it. You just watched a **missing file** drive the whole decision; that's the incremental
engine in one move. *(This is Snakemake's answer to Nextflow's `-resume` — file existence here,
content hashes there.)*

💡 **What if you `touch` the output back into existence?**

```bash
rm output/result.txt
touch output/result.txt
snakemake -n -s pipelines/04_hello_input.smk
```
{:.copy-code}

The dry run reports *"Nothing to be done (all requested files are present and up to date)"*.
`touch` creates an empty `output/result.txt`, so the file **exists** and is
**newer than `welcome.txt`**. Snakemake's decision is based on metadata — existence –
not on the *contents* of the file. Even though `output/result.txt` is now empty,
Snakemake trusts that it is up to date. If you ever need to override that trust (for example, an
output file was corrupted or truncated), use `--forcerun`:

```bash
snakemake -n -s pipelines/04_hello_input.smk --forcerun hello
```
{:.copy-code}

`--forcerun hello` schedules the rule regardless of filesystem state and prints
`reason: Forced execution`.

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### One rule, every sample: wildcards and `expand()`

Everything so far made **one** file. Real data comes in dozens. In Nextflow you'd drop the files
into a **channel** and let processes fan out over it. Snakemake has no channel; instead it uses two
tools that are pure pattern-matching:

- **`glob_wildcards(pattern)`** looks at the files *on disk* and pulls the varying part out into a
  list. It runs once, at parse time, before any job.
- **`expand(pattern, name=LIST)`** does the reverse: it stamps that list back into a set of concrete
  paths — the targets you want built.

Point `glob_wildcards` at the raw reads and print what it found:

```python
# put this at the top of a scratch file, or paste into the snakefile you're building
SAMPLES, = glob_wildcards("01_data/{sample}.fastq.gz")
print(SAMPLES)
```

```bash
snakemake -n -s pipelines/06_implementation_fastqc.smk   # the print fires at parse time
```
{:.copy-code}

You should see the list of sample names it lifted out of the filenames — one entry per file,
`{sample}` standing in for everything the `*` would have matched:

```
['bio_sample_01_R1', 'bio_sample_01_R2', 'bio_sample_02_R1', 'bio_sample_02_R2', ...]
Building DAG of jobs...
Nothing to be done (all requested files are present and up to date).
```

> 💡 The comma in `SAMPLES, =` is not a typo. `glob_wildcards` returns a tuple *of* wildcard lists
> (one per `{ }` in the pattern); the trailing comma unpacks the single one. Two wildcards →
> `SAMPLES, MATES = glob_wildcards("01_data/{sample}_{mate}.fastq.gz")`.

Now the other direction — `expand()` turns that list into the concrete targets a `rule all` asks
for:

```python
print(expand("02_illuminaQC/{sample}_fastqc.html", sample=SAMPLES))
# ->  ['02_illuminaQC/bio_sample_01_R1_fastqc.html',
#      '02_illuminaQC/bio_sample_01_R2_fastqc.html', ...]
```

Give it two lists and it takes the **cross product** — every `sample` paired with every `mate` —
which is exactly how the later scripts ask for both reads of every pair:

```python
print(expand("02_illuminaQC/{sample}_{mate}_fastqc.html", sample=SAMPLES, mate=["R1", "R2"]))
```

> **Nextflow mirror.** `glob_wildcards` is `Channel.fromPath` / `fromFilePairs` — the "read the
> files that exist" step. But then it splits: Nextflow *pushes* each item through processes, while
> Snakemake holds `SAMPLES` as a plain list and uses `expand()` to name the **targets** it should
> pull. Discovery looks the same; direction of travel is opposite. A wildcard in a rule's
> `output:` is the fan-out — one rule, matched once per sample, no loop written by you.

**Exercise** What does `glob_wildcards("01_data/{sample}_R1.fastq.gz")` put in `SAMPLES` — and why
is that list *half* the length of the one above? (Answer: it only matches R1 files, so `{sample}`
is the pair name with no mate token — `bio_sample_01`, not `bio_sample_01_R1`. That's the switch 
from *"every file"* to *"every pair,"* and it's exactly the difference between Script 06 and 
Script 07.)

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### FastQC — your first real rule (cash in your Predict)

1.  **Target.**
    One FastQC run for one raw-read file produces two files: the human-readable report and the data package that downstream tools parse:

    ```
    02_illuminaQC/bio_sample_01_R1_fastqc.html
    02_illuminaQC/bio_sample_01_R1_fastqc.zip
    ```

2.  **Interrogate.**  
    What does it need? -> the raw read file  
    `01_data/bio_sample_01_R1.fastq.gz`, and the tool `fastqc`. The read is already on disk — bedrock.
    One box, one arrow. Now scale it: we want that report for **every** file, which is the wildcards
    move you just learned.

3.  **Reveal**
4.  **Predict**
    Before running, look at script `06_implementation_fastqc.smk`
    and dry-run it. This is the moment to cash the guess you made at the cold open (`ls 01_data/*.fastq.gz | wc -l`):

    ```bash
    snakemake -n -s pipelines/06_implementation_fastqc.smk
    ```
    {:.copy-code}

    Snakemake prints a job table — read the `count` column and check it against your Predict:

    ```
    Job stats:
    job       count
    -------   -----
    all           1
    fastqc       10
    total        11
    ```

5.  **Implement.**
    The rule is the box, verbatim — an output with a `{sample}` wildcard, the matching
    input, and the shell recipe:

    ```python
    rule all:
        input:
            expand(config.get("output_qc", "02_illuminaQC") + "/{sample}_fastqc.html", sample=SAMPLES),
            expand(config.get("output_qc", "02_illuminaQC") + "/{sample}_fastqc.zip", sample=SAMPLES)
    
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
    
    The wildcard `{sample}` in `output:` is what makes this *one* rule cover *every* file: Snakemake
    matches the rule once per target `expand()` asked for, substituting `{sample}` each time. You wrote
    no loop.

6.  **Run & verify.**
    Give it more than one core so the independent jobs actually run at once:

    ```bash
    snakemake -c4 -s pipelines/06_implementation_fastqc.smk
    ```
    {:.copy-code}
    
    You should see Snakemake count down the steps, interleaved with FastQC's own progress lines:
    
    ```
    Building DAG of jobs...
    Using shell: /usr/bin/bash
    Provided cores: 4
    Job stats:
    job       count
    -------   -----
    all           1
    fastqc       10
    total        11
    
    [Mon Jul 20 13:05:11 2026]
    rule fastqc:
        input: 01_data/bio_sample_01_R1.fastq.gz
        output: 02_illuminaQC/bio_sample_01_R1_fastqc.html, ...
    ...
    application/gzip
    Started analysis of bio_sample_01_R1.fastq.gz
    Approx 45% complete for bio_sample_01_R1.fastq.gz
    Analysis complete for bio_sample_01_R1.fastq.gz
    ...
    10 of 11 steps (91%) done
    Finished job 0.
    11 of 11 steps (100%) done
    Complete log: .snakemake/log/2026-07-16T153718.280260.snakemake.log
    ```
    
    Confirm the reports landed: `ls 02_illuminaQC/`. **Success looks like** a matched `.html`/`.zip`
    pair per file. **A stuck-looking pause** at "Started analysis…" is normal — FastQC is working, not
    hung. **`fastqc: command not found`** means the `module load fastqc` line didn't take — check the
    module name on Ceres. **`MissingInputException`** means a filename doesn't match the glob pattern —
    your target and your files disagree.

7.  **Break the DAG.**
    Delete one report and ask Snakemake what it now intends to do:

    ```bash
    rm 02_illuminaQC/bio_sample_01_R1_fastqc.html
    snakemake -n -s pipelines/06_implementation_fastqc.smk    # dry run
    ```
    {:.copy-code}
    
    Read the output: **exactly one** `fastqc` job is scheduled — the one whose output you removed —
    and everything else reports up to date. That's the incremental engine reasoning per-file, not
    per-run. Ask for a single report directly and watch Snakemake rebuild only that path:
    
    ```bash
    snakemake -c1 -s pipelines/06_implementation_fastqc.smk 02_illuminaQC/bio_sample_01_R1_fastqc.html
    ```
    {:.copy-code}

> **Nextflow mirror.** You just asked for *one file by name* and got only the work behind it.
> Nextflow reruns the whole workflow and leans on `-resume` (content hashes) to skip finished
> work; Snakemake lets you name any target file and pulls only its subtree, decided by timestamps.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Fastp — a rule with paired inputs and outputs

1.  **Target.**
    We want the trimmed reads for one sample:

    ```
    03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
    03_trimmed/bio_sample_01_R2.trimmed.fastq.gz
    ```
    
3.  **Interrogate.**  
    *What do they need?* Both raw mates — `_R1` **and** `_R2` — go into `fastp` together, because
    trimming a pair keeps the two files in sync. So this rule has **two inputs and two outputs**, and we
    give them names to keep them straight.

4.  **Predict.**
    The glob changes meaning here. script `07_implementation_fastp.smk`
    globs on the R1 pattern, so `{sample}` is the *pair* name:

    ```python
    SAMPLES, = glob_wildcards(config.get("reads", "01_data/{sample}_R1.fastq.gz"))
    ```
    
    That's the pair-vs-file switch from the wildcards exercise. **Predict:** with 5 pairs you get **5**
    `fastp` jobs (one per pair), not 10. Dry-run to check:
    
    ```bash
    snakemake -n -s pipelines/07_implementation_fastp.smk
    ```
    {:.copy-code}
    
    ```
    job      count
    ------   -----
    all          1
    fastp        5
    total        6
    ```

5.  **Implement.**
    Named inputs/outputs are reached as `{input.r1}`, `{output.r2}`, and so on:

    ```python
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
            module load miniconda
            source activate /90daydata/scinet_workshop2/nextflow_env
            mkdir -p {params.outdir}
            fastp -i {input.r1} -I {input.r2} -o {output.r1} -O {output.r2}
            """
    ```
    
    The single `{sample}` wildcard ties all four paths together: whatever `bio_sample_01` matches in the
    output is forced to match in both inputs. That shared wildcard is what makes a pair a *pair*.

6.  **Run & verify.**

    ```bash
    snakemake -c4 -s pipelines/07_implementation_fastp.smk
    ```
    {:.copy-code}
    
    ```
    [Mon Jul 20 13:20:04 2026]
    rule fastp:
        input: 01_data/bio_sample_01_R1.fastq.gz, 01_data/bio_sample_01_R2.fastq.gz
        output: 03_trimmed/bio_sample_01_R1.trimmed.fastq.gz, 03_trimmed/bio_sample_01_R2.trimmed.fastq.gz
    ...
    Read1 before filtering: ... Read2 before filtering: ...
    6 of 7 steps (86%) done
    7 of 7 steps (100%) done
    ```
    
    **Success looks like** two `.trimmed.fastq.gz` files per pair in `03_trimmed/`. Fastp also prints
    before/after filtering stats to the log — that summary is what MultiQC will collect at the end.

> **Nextflow mirror.** This is `fromFilePairs` territory — the tuple `(sample, [R1, R2])`. Named
> inputs `r1`/`r2` play the role of the destructured pair inside a process; the shared `{sample}`
> wildcard is the tuple key that keeps the two mates married.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Two rules, one DAG — parallelism you didn't write

Put FastQC and Fastp in the **same** file (script 08_implementation_fastqc_fastp.smk)
and ask for both sets of outputs in one `rule all`. Neither rule mentions the other. Both read the
raw reads; neither reads the other's output.

**Predict, then reveal:** One input, two independent branches — let Snakemake draw it:

```python
configfile: "config.yaml"

SAMPLES, = glob_wildcards(config.get("reads", "01_data/{sample}_R1.fastq.gz"))

rule all:
    input:
        expand(config.get("output_qc", "02_illuminaQC") + "/{sample}_{mate}_fastqc.html", sample=SAMPLES, mate=["R1", "R2"]),
        expand(config.get("output_qc", "02_illuminaQC") + "/{sample}_{mate}_fastqc.zip", sample=SAMPLES, mate=["R1", "R2"]),
        expand("03_trimmed/{sample}_R1.trimmed.fastq.gz", sample=SAMPLES),
        expand("03_trimmed/{sample}_R2.trimmed.fastq.gz", sample=SAMPLES)

rule fastqc:
    input:
        "01_data/{sample}_{mate}.fastq.gz"
    output:
        html = config.get("output_qc", "02_illuminaQC") + "/{sample}_{mate}_fastqc.html",
        zip  = config.get("output_qc", "02_illuminaQC") + "/{sample}_{mate}_fastqc.zip"
    params:
        outdir = config.get("output_qc", "02_illuminaQC")
    shell:
        """
        module load fastqc
        mkdir -p {params.outdir}
        fastqc -o {params.outdir} -t 2 {input}
        """

rule fastp:
    input:
        r1 = "01_data/{sample}_R1.fastq.gz",
        r2 = "01_data/{sample}_R2.fastq.gz"
    output:
        r1 = "03_trimmed/{sample}_R1.trimmed.fastq.gz",
        r2 = "03_trimmed/{sample}_R2.trimmed.fastq.gz",
        html = "03_trimmed/{sample}_fastp.html",
        json = "03_trimmed/{sample}_fastp.json"
    shell:
        """
        module load miniconda
        source activate /90daydata/scinet_workshop2/nextflow_env
        mkdir -p 03_trimmed
        fastp -i {input.r1} -I {input.r2} \
              -o {output.r1} -O {output.r2} \
              -h {output.html} -j {output.json}
        """
```
{:.copy-code}

*Dry run*  

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

*DAG* 

```
snakemake --rulegraph -s pipelines/08_implementation_fastqc_fastp.smk | dot -Tsvg > rules.svg
```
{:.copy-code}

Note that in this combined file, **FastQC's glob changed** to `{sample}_{mate}` so it matches every
individual read again (10 jobs), while Fastp stays per-pair (5). Run it and watch the two rules
interleave freely:

```bash
snakemake -c16 -s pipelines/08_implementation_fastqc_fastp.smk
```
{:.copy-code}

With 16 cores available, FastQC and Fastp jobs run **at the same time** — because nothing in the DAG says they
can't. You never wrote "run these in parallel." You wrote two rules that happen to need the same
input, and parallelism fell out.

> **Nextflow mirror.** Two processes subscribing to the same channel gives you this in Nextflow.
> Here the *same* concurrency comes from two rules confessing a shared input — no channel, no `.into`,
> no wiring. This is the single clearest place the two engines meet at the same DAG from opposite
> directions.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### ReadLenDist — many files into one (`expand()` in `input:`)

**Target:** the single table from the cold open — `04_read_len_dist/samples_read_len_dist.tsv`.
Every earlier rule was one-in → one-out (per wildcard). This one is **many-in → one-out**: one table
summarizing *all* the trimmed reads. That means no wildcard on the output — and `expand()` on the
input to gather everything script `09_implementation_read_len_dist.smk`:

```python
# Script 09: Collecting Multiple Files - Read-Length Distribution (refactored)

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
{:.copy-code}

The `expand()` in `input:` is the aggregator: it lists all 10 trimmed files as dependencies, so
Snakemake won't run this rule until *every* trimmed read exists. `{input.reads}` then expands to all
10 paths on the command line, which the helper script `read_length_dist.py` leads in
one pass. This script can be found in `scripts/read_length_dist.py`.

```bash
snakemake -c4 -s pipelines/09_implementation_readLenDist.smk
head -n 3 04_read_len_dist/samples_read_len_dist.tsv
```
{:.copy-code}

```
job           count
-----------   -----
all               1
readLenDist       1
total             2
```
```
length  count   file
20      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
26      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
30      1       03_trimmed/bio_sample_01_R1.trimmed.fastq.gz
```

**One** `readLenDist` job, no matter how many samples — the fan-*in* mirror of FastQC's fan-out.

> **Nextflow mirror.** This is `.collect()` — gather every item into a single emission before the
> process fires. In Snakemake you don't stage a collect operator; you just write `expand()` in the
> input list, and the one-job-waits-for-all-inputs behavior is automatic.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### The complete QC pipeline — rebuild the cold-open DAG for real

Script `10_implementation_full.smk` is all three rules — `fastqc`, `fastp`, and `readLenDist` — in one file, 
with a `rule all` that asks for every final output. 

```python 
# Script 10: The Complete Pipeline (refactored)

configfile: "config.yaml"

SAMPLES, = glob_wildcards(config["reads_dir"] + "/{sample}_R1.fastq.gz")

rule all:
    input:
        # FastQC outputs for all raw reads
        fastqc = expand(config["output_qc"] + "/{sample}_{mate}_fastqc.html",
                        sample=SAMPLES, mate=["R1", "R2"]),
        # Trimmed reads
        trimmed = expand(config["output_trim"] + "/{sample}_{mate}.trimmed.fastq.gz",
                         sample=SAMPLES, mate=["R1", "R2"]),
        # Read length distribution
        rld = config["output_rld"] + "/samples_read_len_dist.tsv"

rule fastqc:
    input:
        config["reads_dir"] + "/{sample}_{mate}.fastq.gz"
    output:
        html = config["output_qc"] + "/{sample}_{mate}_fastqc.html",
        zip = config["output_qc"] + "/{sample}_{mate}_fastqc.zip"
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
        module load miniconda
        source activate /90daydata/scinet_workshop2/nextflow_env
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
{:.copy-code}

**Render it and compare:**

```bash
snakemake --dag -s pipelines/10_implementation_full.smk | dot -Tsvg > dag_full.svg
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

```
job           count
-----------   -----
all               1
fastqc           10
fastp             5
readLenDist       1
total            17
```

Trace the arrows: `fastp` feeds `readLenDist` (trimmed reads → table), while `fastqc` hangs off the
raw reads on its own branch. That's the fork you drew. Build the whole thing from raw reads:

```bash
snakemake -c8 -s pipelines/10_implementation_full.smk
```
{:.copy-code}

Snakemake schedules in dependency order automatically — FastQC and Fastp first (in parallel), then
ReadLenDist once all trimmed reads exist. You wrote **zero** ordering statements.

**Bonus — FastQC on trimmed reads.** [Script 11](pipelines/11_add_fastqc.smk) adds a
`fastqc_trimmed` rule so you can QC before *and* after trimming. Notice it's a near-copy of `fastqc`
with different paths — which is exactly the duplication the next section removes.

**Break the DAG (the real one).** Now that the whole chain exists, break a link in the *middle*
and watch the blast radius:

```bash
touch 03_trimmed/bio_sample_01_R1.trimmed.fastq.gz   # a trimmed file is now "newer"
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

Read the `reason:` lines. `readLenDist` is scheduled to rerun — it consumes that trimmed file — but
`fastqc` and `fastp` are **not**, because nothing they depend on changed. One timestamp, one
downstream rebuild, everything else untouched. That surgical precision is the whole point of the
pull model.

</li>
</ol>
