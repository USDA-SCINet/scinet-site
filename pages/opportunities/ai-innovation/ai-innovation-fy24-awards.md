---
title: ARS AI Innovation Fund - FY2024 Awards
description: Abstracts of AI Innovation Fund proposals funded in FY2024.
permalink: /opportunities/ai-innovation/fy24-awards
author: Brian Stucky 
layout: page

sidenav_link: /opportunities/ai-innovation/
sidenav_append: 
  - title: ARS AI Innovation Fund - FY2021 Awards
    url: /opportunities/ai-innovation/fy21-awards
  - title: ARS AI Innovation Fund - FY2022 Awards
    url: /opportunities/ai-innovation/fy22-awards
  - title: ARS AI Innovation Fund - FY2023 Awards
    url: /opportunities/ai-innovation/fy23-awards
  - title: ARS AI Innovation Fund - FY2024 Awards
    url: /opportunities/ai-innovation/fy24-awards

subnav:
  - title: Funded proposals
    url: '#funded-proposals'
---

The ARS AI Center of Excellence (AI-COE) funded four AI Innovation Fund proposals in FY2024.  The program was again very competitive, with many more proposals submitted than we could support.  Information about the funded projects is provided below.

## Funded proposals

### Deep learning based high-resolution field level soil moisture mapper from UAVs

* **PI and Co-PIs:** Ardeshir Adeli and Yanbo Huang
* **Amount of award:** $99,978
* **Abstract:** A deep learning (DL) based high-resolution, and field-level soil moisture (SM) mapping system will be developed by utilizing UAV-based global navigation satellite system reflectometry (GNSS-R) observation signals together with multispectral camera images, LIDAR point clouds, and other sensory data. This system will be a digital product prototyped to provide more useful information to enhance SM research and used as a decision support tool for producers for better crop management. Our proposed system fundamentally uses the existing radio frequency (RF) signals transmitted by satellites opportunistically to measure SM by leveraging penetration capabilities of RF signals into the vegetation and soil. GNSS transmissions are in L-band RF frequencies are highly sensitive to changes in SM content, particularly over the top 5 cm portion of the soil.

  A comprehensive dataset has been collected for the last four years utilizing multiple UAV flight campaigns with visual, multispectral, hyperspectral, LIDAR, and microwave sensors over the cotton and corn plots under different management practices from the RR Foil Plant Science Research Center at Mississippi State University along with ground-based SM observations. Observed UAV-based sensory data is dependent not only on the SM but also on the vegetation, surface roughness, topography, soil texture, GNSS satellites' positions, transmitter characteristics, receiver orientation, and flight parameters through a combination of linear and nonlinear relations. We propose to leverage the SCINet high-performance computing infrastructure to aid in the development of a machine learning architecture to learn this complex and nonlinear relationship. As the UAV scans the field, the developed DL model will produce the SM map of the area at 5-10 cm resolution levels. The created map will be visualized for the final users, such as producers or agricultural researchers, along with the proposed system to not only help manage irrigation, improve yields and product quality, but also protect the environment.


### Rapid prediction of _Salmonella enterica_ virulence from MALDI-TOF mass spectra using machine learning

* **PI and Co-PIs:** Christopher Anderson, Shawn Bearson, and Paul Villanueva
* **Amount of award:** $100,000
* **Abstract:** _Salmonella_ causes ~1.35 million infections yearly in the United States. Despite mitigation efforts that have reduced contamination of some food sources, salmonella-related illnesses have not readily decreased. Interventions have typically focused on serovar-level control of _Salmonella_. Still, a more proactive approach would focus on the early detection of strains with high virulence in humans. However, assays to assess virulence are expensive and time intensive, and whole genome sequencing alone cannot predict _Salmonella_ pathogenicity. Matrix-assisted laser desorption ionization-time-of-flight mass spectrometry (MALDI-TOF MS) can characterize the protein composition of bacterial cells in only a few minutes and allow for the characterization of strains beyond gene composition. Recent work demonstrates the potential of MALDI-TOF MS beyond bacterial identification by pairing MALDI-TOF spectra with machine learning to predict bacterial phenotypes of interest, such as antimicrobial resistance. Training machine learning models from MALDI-TOF spectra requires sophisticated data preprocessing and a database of isolates with associated phenotypes. To address the need for more timely monitoring strategies to accurately identify _Salmonella_ strains with high potential for human health risk, we propose developing a machine learning model that predicts _Salmonella_ virulence directly from MALDI-TOF spectra. We will use the invasion of a human cell line to measure virulence for a collection of ~1,000 _Salmonella enterica_ isolates to train the model. The deliverables of this project include a Python package with the preprocessing and prediction workflow as well as a web-based interface for users to submit MALDI-TOF spectra for virulence prediction. The outcomes of this proposal should accelerate the utility of MALDI-TOF MS for rapid and accurate phenotypic predictions and fill the technical gap of a lack of tools for ARS and other agricultural researchers to identify _Salmonella_ isolates of public health concern.


### The _Fusarium_-Host Interactome Discovery App

* **PI and Co-PIs:** Carson Andorf, Hye-Seon Kim, and Taner Sen
* **Amount of award:** $100,000
* **Abstract:** _Fusarium_ is a pervasive fungal pathogen that poses significant threats to global food security and causes billions of dollars in economic loss annually. Climate change is predicted to enhance susceptibility to crop pathogens, demanding new resources to empower researchers and breeders to develop resilient strategies against _Fusarium_. Here we propose to develop the _Fusarium_-Host Interactome Discovery App, a digital application to identify genetic and proteomic interactions between _Fusarium_ and its cereal crop hosts: wheat, maize, barley, oat, and rye. The project will create an innovative artificial intelligence (AI) workflow that will predict host-pathogen protein-protein interactions, identify the functional consequences of missense mutations across all the species, provide protein functional and structural annotations, and create a web-based application. This application will utilize advanced protein language and protein diffusion models to elucidate the interactions of _Fusarium_ and cereal proteins that result in susceptibility or resistance. Visualization tools will enable users to explore how genetic mutations across 22 _Fusarium_ genomes and 135 cereal genomes impact protein interactions and identify potential targets for developing disease-resistant varieties. This collaborative project combines the expertise from multiple USDA-ARS Area locations, fostering synergy among maize, small grains, and _Fusarium_ research communities. The collective effort aims to aid researchers, breeders, and farmers in safeguarding cereal crop health against biotic threats by providing valuable foresight into the potential risks of emerging pathogens, their virulence levels, and the extent of variation in resistant germplasm. The application and datasets will be easily accessible through the GrainGenes and MaizeGDB databases.


### Bad apples? Next generation postharvest risk assessment tools

* **PI and Co-PIs:** Loren Honaas, Stephen Ficklin (Washington State University), and Meg Staton (University of Tennessee Knoxville)
* **Amount of award:** $98,936
* **Abstract:** Three billion pounds (~30%) of fresh pome fruit is diverted to the processing supply chain in large part because fruit lose quality during storage and the supply chain. The current risk assessment tools in use by the industry are inadequate to reliably estimate risk for such losses in fruit quality.  Hence the prioritization by stakeholders, including the WA Tree Fruit Research Commission (WTFRC), of research projects that develop new and better tools to estimate risk for postharvest fruit quality losses. We have been funded by the WTFRC (>$1M) to develop such technology; our projects include development of transcriptome-based biosignature AI models (Next Generation Maturity Indices - NGMIs) that predict optimum harvest dates and AI/computer vision software (Granny) that improves the granularity and accuracy for the scoring of traits that are currently rated/scored by hand. As these projects mature, we aim to integrate them for enhanced risk assessment, and also to begin building a user-interface to promote adoption by producers - these are the aims of our proposal.
We have amassed 5+ years of data on many cultivars of apple that includes upwards of 1,000 transcriptomes, rich fruit physiological data, and postharvest storage trial outcomes from collectively >30,000 individual apples. Our NGMIs can accurately predict harvest dates. Granny outputs are fine-grained, highly-accurate, and concordant with ratings of fruit made by experts. Collaborators, industry partners, and growers are all in place to take the next steps towards next generation risk assessment tools for postharvest pome fruit quality.  Specifically, we propose to integrate NGMIs and Granny to improve harvest date predictions (with regard to retaining fruit quality during storage) and to build a software user interface for these tools that growers can use (and test) in the near term.

