---
title: CLC Server
description: Using CLC Server
## author: VRSC

categories: [Analysis]

subnav:
  - title: Before You Begin
    url: '#before-you-begin'
  - title: CLC Server Login
    url: '#clc-server-login'
  - title: CLC Server vs GRID
    url: '#clc-server-vs-grid'
---


**This document assumes that a licensed copy of CLC Genomics WorkBench 22 is installed locally and available to the user.**
<!--excerpt-->
## Before You Begin

Email [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=CLC%20setup) so that the admins can setup the import/export directories and permissions for access.

We need the following information:
1.	Path to your project directory.
2.	Do you need access to the mem nodes for your CLC workflow?

## CLC Server Login

1.	File -> Connections -> CLC Server Connection
2.	Server Name and Port
	
  * **If connecting via VPN/OCVPN**
```
Server name: 10.1.5.210
Server port: 7777
```
  *	**If connecting via ARS Network**
```
Server host: 205.237.112.197
Server port: 7777
```
3.	Username and Password(GA code not required) 

4.	Log in.

![screenshot of CLC Genomics Workbench 22.0.2 software homescreen]({{ site.baseurl }}/assets/img/guides/analysis/clc/CLC2.png)

After successful login, you should see a directory CLC-\<your project> in the top left window.

## CLC Server vs GRID

![screenshot of CLC Genomics Workbench 22.0.2 Server Options](/assets/img/guides/analysis/clc/CLC3.png)

CLC provides two ways to offload jobs - CLC Server and GRID. Both serve different purposes. 

**CLC Server** can only be used to perform Standard Import and Export. These tasks are performed on Ceres DTN node for faster transfer rate.

Note that if users select "CLC Server" for any tasks other than those mentioned below, those tasks will not execute and will remain paused. 

**GRID** can be used to run compute tasks on Ceres nodes.

The table below lists the tasks and option to use

| Category | Utilities | Option  |
|---|---|---|
| Export |   | CLC Server |
| Import |   | CLC Server |
| Search for Reads in SRA |   | GRID |
| Classical Sequence Analysis | | |
|  | Create Alignment  | GRID |
|  | K-mer Based Tree Construction | GRID |
|  | Create Tree | GRID |
|  | Model Testing  | GRID |
|  | Maximum Likelihood Phylogeny  | GRID |
|  | Extract Sequences | GRID |
|  | Motif Search  | GRID |
|  | Translate to Protein  | GRID |
|  | Convert DNA to RNA  | GRID |
|  | Convert RNA to DNA  | GRID |
|  | Reverse Complement Sequence  | GRID |
|  | Find Open Reading Frames  | GRID |
|  | Download Pfam Database  | GRID |
|  | Pfam Domain Search  | GRID |
|  | Find and Model Structure  | GRID |
| Molecular Biology Tools  |   | |
|  | Trim Sequences  | GRID |
|  | Assemble Sequences  | GRID |
|  | Assemble Sequences to Reference | GRID |
|  | Secondary Peak Calling  | GRID |
|  | Find Binding Sites and Create Fragments  | GRID |
|  | Add attB Sites  | GRID |
|  | Create Entry clone (BP)  | GRID |
|  | Create Expression clone (LR)  | GRID |
| BLAST |   | |
|  | BLAST | GRID |
|  | BLAST at NCBI  | GRID |
|  | Download BLAST Databases  | GRID |
|  | Create BLAST Database  | GRID |
| Prepare Sequencing Data  |   |  |
|  | QC for Sequencing Reads  | GRID |
|  | Trim Reads  | GRID |
|  | Demultiplex Reads  | GRID |
| Quality Control  |   | |
|  | QC for Targeted Sequencing  | GRID |
|  | QC for Read Mapping  | GRID |
|  | Whole Genome Coverage Analysis | GRID |
|  | Combine Reports  | GRID |
|  | Create Sample Report  | GRID |
|  Resequencing Analysis |   |  |
|  | Map Reads to Reference | GRID |
|  | Local Realignment  | GRID |
|  | Merge Read Mappings  | GRID |
|  | Remove Duplicate Mapped Reads  | GRID |
|  | Extract Consensus Sequence  | GRID |
|  | Basic Variant Detection  | GRID |
|  | Fixed Ploidy Variant Detection  | GRID |
|  | InDels and Structural Variants  | GRID |
|  | Identify Known Mutations from Mappings  | GRID |
|  | Copy Number Variant Detection (CNVs)   | GRID |
|  | Filter against Known Variants   | GRID |
|  | Remove Marginal Variants  | GRID |
|  | Remove Homozygous Reference Variants   | GRID |
|  | Remove Variants Present in Control Reads  | GRID |
|  | Annotate from Known Variants  | GRID |
|  | Remove Information from Variants  | GRID |
|  | Annotate with Conservation Scores   | GRID |
|  | Annotate with Exon Numbers  | GRID |
|  | Annotate with Flanking Sequences  | GRID |
|  | Annotate with Repeat and Homopolymer Information  | GRID |
|  | Identify Enriched Variants in Case vs Control Samples   | GRID |
|  | Identify Shared Variants  | GRID |
|  | Trio Analysis | GRID |
|  | Create Variant Track Statistics Report  | GRID |
|  | Amino Acid Changes  | GRID |
|  | Predict Splice Site Effect  | GRID |
|  | GO Enrichment Analysis  | GRID |
|  | Download 3D Protein Structure Database  | GRID |
|  | Link Variants to 3D Protein Structure  | GRID |
| RNA-Seq and Small RNA Analysis  |   | |
|  | RNA-Seq Analysis  | GRID |
|  | PCA for RNA-Seq  | GRID |
|  | Differential Expression in Two Groups  | GRID |
|  | Differential Expression for RNA-Seq  | GRID |
|  | Create Heat Map for RNA-Seq  | GRID |
|  | Create Expression Browser  | GRID |
|  | Create Venn Diagram for RNA-Seq  | GRID |
|  | Gene Set Test  | GRID |
|  | Quantify miRNA  | GRID |
|  | Annotate with RNAcentral Accession Numbers  | GRID |
|  | Create Combined miRNA Report   | GRID |
|  | Extract IsomiR Counts  | GRID |
| Microarray Analysis  |   | |
|  | Create Box Plot  | GRID |
|  | Principal Component Analysis  | GRID |
|  | Proportion-based Statistical Analysis  | GRID |
|  | Gaussian Statistical Analysis  | GRID |
|  | Create MA Plot  | GRID |
|  | Create Scatter Plot   | GRID |
|  | Create Histogram  | GRID |
| Epigenomics Analysis |   | |
|  | Histone ChiP-Seq   | GRID |
|  | Transcription Factor ChIP-Seq  | GRID |
|  | Annotate with Nearby Gene Information  | GRID |
|  | Map Bisulfite Reads to Reference  | GRID |
|  | Call Methylation Levels  | GRID |
|  | Create RRBS-fragment Track  | GRID |
|  | Learn Peak Shape Filter  | GRID |
|  | Apply Peak Shape Filter  | GRID |
|  | Score Regions  | GRID |
| De Novo Sequencing  |   | |
|  | De Novo Assembly  | GRID |
|  | Map Reads to Contigs  | GRID |
| Utility Tools  |   | |
|  | Extract Annotated Regions  | GRID |
|  | Merge Overlapping Pairs | GRID |
|  | Extract Reads | GRID |
|  | Merge Annotation Tracks | GRID |
|  | Merge Variant Tracks  | GRID |
|  | Convert to Tracks | GRID |
|  | Convert from Tracks | GRID |
|  | Filter on Custom Criteria | GRID |
|  | Annotate with Overlap Information | GRID |
|  | Filter Annotations on Name | GRID |
|  | Filter Based on Overlap | GRID |
|  | Create GC Content Graph | GRID |
|  | Create Mapping Graph | GRID |
|  | Identify Graph Threshold Areas | GRID |
|  | Update Sequence Attributes in Lists | GRID |
|  | Split Sequence List | GRID |
|  | Subsample Sequence List | GRID |
|  | Rename Elements | GRID |
|  | Rename Sequences in Lists | GRID |
| Legacy Tools | | |
|  | Compare Sample Variant Tracks (legacy) | GRID |
|  | Empirical Analysis of DGE (legacy) | GRID |
   
