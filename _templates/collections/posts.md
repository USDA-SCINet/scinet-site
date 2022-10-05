---

title: "Guidemaker: software for CRISPR based gene function discovery" # title
categories: [Stories] # category - currently just Stories
excerpt: "CRISPR-Cas is a powerful tool for gene editing. CRISPR can also be used to discover gene function by disrupting every gene in the genome and screening millions of cells in parallel." # story excerpt

# if this is to be featured on the home page
feature-img-src: /assets/img/posts/guidemaker-form.png # source of featured image
feature-img-alt: "Images of the GuideMaker User Interface and results display" # alt text for image
featured: home # location to be featured
---
### By:  Adam R. Rivers  |  3/31/2022
### USDA-ARS Genomics and Bioinformatics Research Unit - Gainesville

CRISPR-Cas is a powerful tool for gene editing. CRISPR can also be used to discover gene function by disrupting every gene in the genome and screening millions of cells in parallel. This "CRISPR screen" or "CRISPR pool" technique knocks out (disrupts) the function of thousands of genes in a large pool of cells. Each cell has only a single gene knockout, but the cells collectively have nearly every gene in their genome disrupted. This can be done in any bacterial culture or eukaryotic cell line where a vector can be introduced and cells can be grown in culture. The population of mutated cells is then grown in the presence of a compound like a toxin, drug, or metabolite. After growth, we extract DNA from control and treatment cell populations at the beginning and end of the experiment. The Cas cut sites are amplified and sequenced. These data are used to create a tally of the mutations in the control and treatment populations. Mutations that improve fitness in the presence of the compound are enriched and can be identified statistically. At the end of an experiment, we have a small list of genes that are likely involved in responding to the compound. These genes can be investigated in more detail to work out the exact mechanisms of their effect.