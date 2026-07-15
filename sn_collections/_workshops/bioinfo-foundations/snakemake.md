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

**No prior Snakemake experience is required.** Basic command-line familiarity (navigating
directories, running a program, editing a file) is assumed. If you attended the **Nextflow**
workshop in this series, you'll recognize the tools and the data — this workshop deliberately
mirrors it, so you can feel exactly how the two engines differ. Where it helps, we call out the
Nextflow equivalent in a **↔ Nextflow mirror** note.

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

* Create your workshop working directory. You do not have to edit these commands with your username — it is filled in by the `$USER` variable.

  ```bash
  mkdir -p /90daydata/shared/$USER/snakemake
  cd /90daydata/shared/$USER/snakemake
  ```
  {:.copy-code}

* Unpack the workshop materials into your working directory. This one archive contains everything you need: the read data (`01_data/`), the pipeline scripts (`pipelines/`), the config files, and a ready-to-use Snakemake environment (`snakemake1_env/`).

  ```bash
  cp -a /project/scinet_workshop2/foundations_bioinf_2026/snakemake_data/snakemake_material.tar.gz .
  tar -xzf snakemake_material.tar.gz
  ls
  ```
  {:.copy-code}

  You should see the extracted contents — something like:

  ```
  01_data  test_genome  config.yaml  hello_config.yaml  pipelines  snakemake1_env
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
source snakemake1_env/bin/activate
snakemake --version
```
{:.copy-code}

`snakemake --version` should print a version number (e.g. `8.18.2`). You're ready to go.

</li>
</ol>

---

## An Introduction to Snakemake

*Instructors: Viswanathan Satheesh . Rick Masonbrink*

### Learning Objectives

By the end of this workshop, you will be able to:

1. **Write Snakemake pipelines from scratch** — defining rules with inputs, outputs, and shell commands, and letting Snakemake infer how they connect.
2. **Process many files in parallel automatically** — using wildcards and `expand()` so one rule scales to any number of samples, with no hand-written loops.
3. **Make pipelines configurable, portable, and reproducible** — using config files, profiles, resources, and software environments (modules/conda) so a pipeline runs anywhere.

And, threaded through all of it, one meta-skill:

4. **Reason backward from a target.** Given a result you want, work out the chain of files it depends on — which is exactly how Snakemake builds and runs a pipeline.

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

### How this workshop works: the Target-First Lab

Picture this: You have a folder of results - a few tables, VCF files, etc. - with **no pipeline and no notes**. To reproduce or extend the work, you have to reason
from each result *backward* to the steps that produced it: *what had to exist for this file to
exist?* That's not just a recovery skill — it is exactly how Snakemake thinks, and it's how we'll
work. We call it the **Target-First Lab**.

Most tutorials build **forward**: write step one, then step two,
wiring outputs into inputs until a result appears at the end. Snakemake runs the other way. You
name the **target** — the file you want — and the engine reasons **backward** to everything it
depends on, stopping when it reaches files already on disk. That dependency chain, walked in
reverse, *is* the pipeline. You never specify the run order; the order is a *consequence* of which
file needs which.

So every section today follows the same seven-beat rhythm:

```
The Target-First Lab — every section, same seven beats

  ① TARGET         the output file 
  ② INTERROGATE    "what does this need?" 
  ③ REVEAL         snakemake -n |grep "reason:" 
  ④ PREDICT        commit out loud: how many jobs? which first? what runs in parallel?
  ⑤ IMPLEMENT      each process becomes one rule (its output + its inputs)
  ⑥ RUN & VERIFY   run it — did your prediction hold?
  ⑦ BREAK THE DAG    delete / touch / rename one file, dry-run, read the diagnosis
```

Two things about that rhythm:

- **It fades on purpose.** The first target of the day we walk every beat together at the
  whiteboard. By mid-morning you're interrogating in pairs in under a minute; by Day 2 it's a
  reflex. The scaffolding disappears as your reasoning speeds up — so don't expect every section
  below to spell out all seven beats. Early ones do; later ones assume you've got it.
- **🔨 Break the DAG is where it gets real.** Once you can draw a DAG, the way you truly *understand*
  it is by breaking it — delete an input, touch a file, rename an output, then dry-run and read what
  Snakemake says it can (and can't) still make. Reading Snakemake's dependency logic out loud is the
  single most useful thing you'll take back to your own work.

> ↔ **Nextflow mirror.** In Nextflow you *pushed* data forward through channels and thought about
> the final process last. In Snakemake you name the final file first and let the engine *pull* the
> pipeline into existence behind it. Same DAG — opposite direction of travel.

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

> 💡 The numbered output directories (`01_…`, `02_…`) are *our* workshop convention, not a Snakemake
> rule — they keep results in pipeline order. Rule and wildcard casing, however, are conventions
> worth following.

**The one gotcha: `{ }` is Snakemake, `{{ }}` is a literal brace for bash.**

Inside a rule's `shell:` block, `{input}`, `{output}`, `{params}`, and `{wildcards.x}` are
**Snakemake** placeholders — substituted *before* the command runs. If you need a **literal** brace
for the shell (bash `${VAR}` expansion, an `awk '{print}'` body, etc.), you must **double** it as
`{{ }}`:

```python
shell:
    """
    awk '{{print $1}}' {input} > {output}   # {{ }} → literal braces for awk
    echo "running on ${{HOSTNAME}}"          # {{ }} → literal ${ } for bash
    """
```

Forgetting to double the braces is one of the most common Snakemake errors — Snakemake will try
(and fail) to resolve your bash expression as one of its own placeholders. *(This is the exact
mirror of Nextflow's `$var` vs `\$var` gotcha.)*

> 💡 **Naming tip for your own pipelines:** name a rule after *what it does* (`align_reads`, not
> `step3`). 

---

# The pull model, on familiar ground

**Goal:** learn the Snakemake building blocks — rules, outputs, inputs, config, wildcards,
and the DAG. Since we are implementing a known pipeline, FastQC -> Fastp -> ReadLenDist, initially, we can spend our attention on *how Snakemake thinks*.

<ol class="usa-process-list">
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### The first case: start at the answer

**① Target.** Here is the one file the QC pipeline exists to produce. 

```
04_read_len_dist/samples_read_len_dist.tsv

length   count    file
148      10234    bio_sample_01_R1.trimmed.fastq.gz
149      9871     bio_sample_01_R1.trimmed.fastq.gz
150      500122   bio_sample_01_R1.trimmed.fastq.gz
...
```

**② Interrogate.** Don't think about tools yet. 


> **"What has to already exist for this to exist?"**

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

**③ Reveal — the machine asks your questions.** You drew that from a target and a single question.
Now watch Snakemake do the identical thing. A finished version of this pipeline already ships in
`pipelines/10_implementation_full.smk` — we'll build our own from scratch over the day, but for now
just let Snakemake *reason* about it, running nothing:

```bash
snakemake -n -s pipelines/10_implementation_full.smk
```
{:.copy-code}

For every job it lists, Snakemake prints a `reason:` — *"Missing output files…"*, *"Input files
updated…"*. That list **is** your interrogation, run by a machine. *(Recent Snakemake prints the
reason by default in a dry run; `--reason` guaranteed it in previous versions.)* Now have it draw the graph:

```bash
snakemake --dag -s pipelines/10_implementation_full.smk | dot -Tsvg > dag.svg
# open dag.svg in the VS Code file browser
```
{:.copy-code}

**④ Predict.** Before we build anything, count the raw reads and commit to numbers:

```bash
ls 01_data/*.fastq.gz | wc -l
```
{:.copy-code}

How many **FastQC** jobs will run (one per file)? How many **Fastp** jobs (one per
*pair*)? Which rule starts first, and what runs at the same time? Hold that guess — we'll check it
against real runs as we fill in the boxes.

**⑤–⑦ come next.** For the rest of Day 1 we *build* this pipeline ourselves. Each box on the board
becomes one **rule** (⑤); we run and check our predictions (⑥); and we deliberately break it to
watch the dependency logic bite (⑦).

> ↔ **Nextflow mirror.** Same DAG you'd have built with channels — but there you *wired* it forward
> and got parallelism by splitting a channel. Here you just noticed two things need the same input.
> You didn't explicitly code the parallelism; Snakemake discovered it automatically from the shared dependencies you declared.

</li>
<li class="usa-process-list__item usa-prose" markdown="1">

{:.usa-process-list__heading}
### Syntax unlocks: the shape of a rule

The Target-First rhythm needs one thing before we can play it on real data: the syntax of a rule.
These five 60-second **unlocks** give you exactly that — they are not the story, they're the
vocabulary. If you did the Nextflow hello-world series, this is the same five ideas in Snakemake's
spelling. Create each file, run it, watch what changes, move on.

The shape never varies:

> **A rule says: here is the file I make, and here are the files I need.**

#### 1 — A rule that runs a command  (`01_hello_screen.smk`)

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

#### 2 — Track an output file  (`02_hello_redirect.smk`)

Add an `output:` and Snakemake starts *tracking a file*; add a `rule all` that asks for it — that's
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

> ↔ **Nextflow mirror.** `rule all` plays the role of the final consumer of a channel; the declared
> output path *is* the `path` output — but there's no `publishDir`, because a Snakemake output simply
> **is** the path you name.

#### 3 — Organize outputs into a directory  (`03_hello_outputdir.smk`)

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

#### 4 — Take an input  (`04_hello_input.smk`)

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

#### 5 — Make it configurable  (`05_hello_default.smk` + `hello_config.yaml`)

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

> ↔ **Nextflow mirror.** `hello_config.yaml` + `config[...]` is Snakemake's `params` + `nextflow.config`;
> the override precedence is the same idea you saw with `--welcome` on the Nextflow command line.
