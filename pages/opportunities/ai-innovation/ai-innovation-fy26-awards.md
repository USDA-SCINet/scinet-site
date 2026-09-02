---
title: ARS AI Innovation Fund - FY2026 Awards
description: Abstracts of AI Innovation Fund proposals funded in FY2026.
permalink: /opportunities/ai-innovation/fy26-awards 
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
  - title: ARS AI Innovation Fund - FY2026 Awards
    url: /opportunities/ai-innovation/fy26-awards

subnav:
  - title: Funded proposals
    url: '#funded-proposals'
---

The ARS AI Center of Excellence (AI-COE) funded five AI Innovation Fund proposals in FY2026.  The program was again very competitive, with many more proposals submitted than we could support.  Information about the funded projects is provided below.

## Funded proposals

### Rapid Assessment of Root Rot Severity Using Multimodal Imaging and Deep Learning

* **PI and Co-PIs:** Xianran Li, Qi Mu (University of Delaware), Alyssa Betts (University of Delaware), and Yin Bao (University of Delaware)
* **Amount of award:** $100,000
* **Abstract:** Maize production faces significant losses from seedling root rots (such as those caused by *Pythium* spp.), yet breeding for resistance is bottlenecked by the subjectivity and labor constraints of manual phenotyping. Current AI approaches often fail to improve accuracy because they are trained to mimic subjective human ratings. This project proposes a robust, objective phenotyping framework leveraging Vision Foundation Models (VFMs) and multimodal imaging. The team will utilize the DINOv3 VFM to extract severity indices from standard RGB images. Crucially, this model is calibrated against biological ground truth, pathogen DNA quantity measured via qPCR, rather than visual scores, ensuring the detection of actual infection load. The optimized pipeline will be deployed via a smartphone app for accessible, rapid assessment. Furthermore, the team will target pre-visual symptoms and subtle color variations due to root rot using Hyperspectral Imaging (HSI). We will adapt DINOv3 to analyze root spectral reflectance data, creating an unsupervised “Latent Root Health Index” that detects stress as a statistical deviation from healthy baselines, identifying “micro-necrotic” changes invisible to the naked eye. Leveraging USDA SCINet resources, this project will deliver a high-throughput phenotyping tool, open datasets, and explainable AI models, resolving a critical breeding bottleneck to protect crop yields.
  

### Accelerating Common Bean Seed Yield and Quality Assessment Using an AI-Enabled Edge Vision System with Descriptive Machine Reasoning 

* **PI and Co-PIs:** Timothy Porch and Prabha Sundaravadivel (University of Texas - Tyler)
* **Amount of award:** $98,360
* **Abstract:** Common bean is the most important pulse crop globally yet breeding and seed evaluation pipelines remain constrained by slow, labor-intensive, and subjective post-harvest measurements. Manual seed counting and evaluation limits throughput and delay selection decisions, particularly when evaluating seed number, size, mass, color, and seed damage traits. This project proposes the development of an AI-enabled, stand-alone edge vision system augmented with a language-model–based descriptive reasoning pipeline for real-time seed yield and quality assessment. Deep learning–based computer vision models will autonomously quantify seed number and extract size, shape, color, and damage-related features. Initial hyperspectral imaging will be used to identify informative spectral bands associated with seed quality and robustness to environmental variability, enabling the design of a cost-effective smart camera system. To enhance usability and scientific interpretation, extracted quantitative features will be passed to a lightweight large language model (LLM)–based reasoning module that generates standardized, human-readable descriptions of seed, e.g., “uniform, market-acceptable seeds with minimal discoloration”. Model training and validation will leverage SCINet high-performance computing resources. The final deliverable will be a minimum viable product (MVP): a plug-and-play digital prototype integrating sensing, computation, descriptive reporting, and touchscreen visualization. 
  

### Advancing a Scalable, AI-Based Automated Surveillance of Stored Product Insect Pests in Food Facilities

* **PI and Co-PIs:** Lester Pordesimo, Ronnie Serfa Juan, and Alison Gerken
* **Amount of award:** $99,600
* **Abstract:** Development of a device that can automatically detect insect activity and identify the species could provide real time information on pest activity and facilitate quicker integrated pest management IPM responses. Some automated devices are available commercially or are in development but have relied on human based identification or are designed to monitor in-bulk stored grain only. An automated monitoring device could be implemented as a traditional stationary monitoring station, but the greatest potential would be a mobile monitoring instrument that could move through a food facility. To this end, a scalable, AI-powered solution for post-harvest surveillance, offering strong potential for real-time monitoring through IoT-enabled (Internet of Things) trap systems and automated inspection stations developed at the USDA-ARS Stored Product Insect and Engineering Research Unit in Manhattan Kansas is to be developed into a prototype automated device for real time stored product insect pest surveillance in food facilities. This prototype hardware consists of integrating the ViT-AI (Vision Transformer-Artificial Intelligence) classification model into high performance yet cost effective edge-computing platforms such as Raspberry Pi and NVIDIA Jetson Nano, followed by incorporation into a stationary or mobile platform incorporating optical sensing in the period of execution of this work with later expansion to multimodal sensors in future work.
  

### Scalable Deep Learning for Cotton Bloom Mapping and Yield Analysis Using UAV Imagery

* **PI and Co-PIs:** Jixiang Wu, Yanbo Huang, Haibo Yao, and Zhou Zhang (University of Wisconsin - Madison)
* **Amount of award:** $99,971
* **Abstract:** Cotton plant blooming is a critical developmental stage when flowers have the highest potential to develop into harvestable bolls. However, manual field-based bloom counting is labor-intensive, time-consuming, and impractical for large-scale monitoring. Unmanned aerial vehicle (UAV) imagery provides a promising solution for automated, high-throughput bloom assessment, yet accurate detection remains challenging due to the small size and sparse distribution of cotton flowers, extreme class imbalance, and complex field conditions. The primary objective of this project is to develop a computationally efficient, anchor-free deep learning framework for accurate cotton bloom detection and counting from high-resolution UAV imagery. Using high-resolution RGB images collected during the previous and coming growing seasons and intensive ground-truth bloom counts from experimental plots, we will train and validate a novel vision transformer–based model redesigned for small-object localization. The model will integrate efficient attention mechanisms and nonlinear modeling modules to improve detection robustness across varying canopy structures, illumination conditions, and growth stages. Once validated, the model will generate high-resolution bloom density maps to characterize spatial and temporal flowering dynamics. These flowering metrics will be integrated with end-of-season yield data to evaluate relationships between bloom patterns and yield formation. 


### Development of an Automated Continuous Machine Learning System for Precision Plant Disease Detection in Controlled Environment Agriculture 

* **PI and Co-PIs:** Heping Zhu, Peter Ling (Ohio State University), Anna Testen, and Hongyoung Jeon
* **Amount of award:** $99,900
* **Abstract:** Early disease detection is essential to assure high quality and yields of crops produced in greenhouse. Automated, target-oriented approaches are needed in precision disease management where infected plants can be pinpointed and treated early to reduce pesticide applications and minimize risks to worker safety. Our team developed a machine learning (ML) model for tomato bacterial spot detection with a specially designed remote hyperspectral system in a growth chamber environment. Its performance, however, was limited by available training data of high specificity for different environments. The objective of this research is to develop a non-contact disease detection system with spectral data collection and continuous machine learning (CML) model for greenhouses where growing environment and cultural practice vary among growers. The CML model will use input features of hyperspectral reflectance associated with plant physiological processes. Our previous ML model will be modified to become the CML model using performance feedback from new data collected from infected tomato plants in greenhouses. An automated spectral data collection system will be established on a watering boom and its accuracy will be verified in greenhouses. Successful completion of the project will enable the CML model to be adopted on intelligent spray systems for early disease detection to improve pest management programs, and the CML model can be potentially used for detecting other plant diseases.
  
