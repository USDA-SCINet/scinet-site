---
title: "Distinguishing a <em>Salmonella</em> vaccine strain from native <em>Salmonella</em> Typhimurium strains using MALDI-TOF mass spectrometry "

description: "ARS researchers used MALDI-TOF mass spectrometry to accurately differentiate the Megan Vac 1 vaccine strain from native Salmonella Typhimurium strains."
categories: [Stories]

excerpt: "Nontyphoidal <em>Salmonella</em> causes approximately 1.3 million infections annually in the United States, costing an estimated $17.1 billion. We hypothesized that an alternative technology, matrix-assisted laser desorption/ionization time-of-flight (MALDI-TOF) mass spectrometry, which generates a protein “fingerprint” from a bacterial colony within minutes, could identify <em>Salmonella</em> vaccine strains accurately and quickly."



author: "Christopher L. Anderson and Joel J. Maki" 
affiliation: "Food Safety and Enteric Pathogens Research Unit, National Animal Disease Center, Agricultural Research Service, United States Department of Agriculture, Ames, Iowa, USA"


feature-img-src: /assets/img/posts/2026-10-am.jpg
feature-img-alt: "Graphical presentation of spatial data included in IrrMap, the first large-scale dataset to aid in the development of irrigation classifiers."
featured: home
---

Nontyphoidal *Salmonella* causes approximately 1.3 million infections annually in the United States, costing an estimated $17.1 billion. Live-attenuated *Salmonella* vaccines effectively reduce *Salmonella* in poultry flocks, but these vaccine strains can persist in birds through production and be detected on food products. The USDA Food Safety and Inspection Service (FSIS) categorizes establishments based on how often *Salmonella* is found in their products, and it excludes vaccine strains from those counts. FSIS currently uses whole genome sequencing to distinguish vaccine strains from native *Salmonella* strains, but sequencing and analysis take time, delaying reporting and corrective actions. We hypothesized that an alternative technology, matrix-assisted laser desorption/ionization time-of-flight (MALDI-TOF) mass spectrometry, which generates a protein “fingerprint” from a bacterial colony within minutes, could identify *Salmonella* vaccine strains accurately and quickly. 

In this proof-of-concept project, we collected MALDI-TOF spectra from isolates of Megan Vac 1, a live-attenuated *Salmonella* Typhimurium vaccine strain widely used in poultry production, and from native strains of *Salmonella* Typhimurium. Using SCINet infrastructure, we established a reproducible computational environment where we could collaborate on the analysis. We ran a pipeline to clean and transform 446 spectra in parallel before employing statistical analyses and machine learning using RStudio Server on the Ceres supercomputer. Multivariate analyses of spectral peak intensities showed that vaccine strains could be distinguished from native strains, but also that MALDI-TOF spectra exhibited strong temporal drift that we had to account for. To test performance under realistic conditions, we trained random forest models on spectra collected at earlier time points and evaluated them on later collected spectra. Models built from a subset of temporally stable peaks achieved a maximum balance accuracy of 97.4% on spectra collected at later time points. A model trained on the intensity of a single protein peak at 6046 mass-to-charge ratio (m/z) performed nearly as well (Figure 1; 97.0% balanced accuracy, 97.8% sensitivity, and 96.2% specificity). We then used SCINet resources to identify proteins that could produce the peak at 6046 m/z. Three proteins encoded by Megan Vac 1 matched the predicted mass, including one associated with a prophage. Megan Vac 1 has disruptions to genes that regulate metabolism, and disruptions like these often induce expression of prophage genes, which may explain why this peak is more intense in Megan Vac 1 strains. 

Our findings demonstrate that MALDI-TOF mass spectrometry can accurately differentiate the Megan Vac 1 vaccine strain from native *Salmonella* Typhimurium strains. Using MALDI-TOF mass spectrometry to identify vaccine strains requires no additional sample preparation or equipment, as FSIS and other regulatory laboratories already use MALDI-TOF mass spectrometry for bacterial identification. Beyond cost savings, this approach enables faster reporting of *Salmonella* performance categorization. It also supports fair performance categorization by continuing to exclude live-attenuated vaccine strains, which in turn improves food safety and public health. 


![Figure 1](/assets/img/posts/2026-10-am.jpg)
***Figure 1. Classification of Megan Vac 1 and native*** **Salmonella** ***Typhimurium strains based on the 6046 m/z peak.*** *(A) Confusion matrix for a decision tree classifier trained using the peak at 6046 m/z and evaluated on the temporally separated test set. (B) Intensity distributions of the 6046 m/z peak in native* Salmonella *Typhimurium and Megan Vac 1 spectra from the training and test sets. The dashed line indicates the classification threshold established by the decision tree model. Anderson et al., 2026, in review.* 