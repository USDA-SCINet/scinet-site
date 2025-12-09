---
title: "Humanely deterring birds around aquaculture and development of AI-driven, non-lethal deterrence tactics"
description: "ARS researchers are using AI computer vision methods to protecting aquaculture from predatory birds without harming wildlife."
categories: [Stories]

excerpt: "Predatory birds such as Great Blue Herons, Canada Geese, and Egrets can cause significant losses at fish ponds. Traditional deterrents like netting and noise cannons are often intrusive or ineffective over time. The project leverages SCINet's high-performance computing resources to train and optimize YOLO-based deep-learning models on large, annotated bird datasets. SCINet's computational capacity enabled hyperparameter tuning and rapid testing of multiple architectures, making it possible to deploy edge-ready detection models on embedded hardware for real-time operation."

feature-img-src: /assets/img/posts/2025-juan-gerken.png
feature-img-alt: "Block diagram of the AI-driven bird deterrence system integrating SCINet HPC resources for YOLO-based model training, edge deployment on embedded hardware, and non-lethal water misting to protect aquaculture ponds."
featured: home

author: "Ronnie O. Serfa Juan<sup>1</sup>, Alison R. Gerken<sup>1</sup>, and Joseph E. Gerken<sup>2</sup>" 
affiliation: "<sup>1</sup>USDA-ARS Stored Product Insect and Engineering Research, Manhattan, Kansas  <br><sup>2</sup>Department of Horticulture and Natural Resources, Kansas State University, Manhattan, Kansas"

---

Ronnie O. Serfa Juan, a SCINet/AI-COE Fellow with the USDA Agricultural Research Service (ARS), works under the mentorship of Dr. Alison R. Gerken at ARS’s Center for Grain and Animal Health Research in Manhattan, KS. Initially, Dr. Serfa Juan’s SCINet-supported research focused on AI-powered insect infestation detection for stored grain products using computer vision and embedded electronics to improve post-harvest monitoring. Building on that expertise—and following a key suggestion from Dr. Joseph Gerken at Kansas State University—the team realized that similar AI computer vision methods could address a different challenge: protecting aquaculture from predatory birds without harming wildlife.

Predatory birds such as Great Blue Herons, Canada Geese, and Egrets can cause significant losses at fish ponds. Traditional deterrents like netting and noise cannons are often intrusive or ineffective over time. The project leverages SCINet’s high-performance computing (HPC) resources to train and optimize YOLO-based deep-learning models on large, annotated bird datasets. (“YOLO”, which stands for “you only look once”, is a family of deep learning computer vision models.) SCINet’s computational capacity enabled hyperparameter tuning and rapid testing of multiple architectures, making it possible to deploy edge-ready detection models on embedded hardware for real-time operation.

The system integrates a rotating motion detection sensor for rapid movement recognition with an AI-enabled camera system for species identification. Once a bird is detected, a controller activates a relay-driven water misting actuator to safely deter the bird without harm (Figure 1). The SCINet infrastructure-trained models—optimized for fast image processing—enable reliable performance even in remote ponds with limited connectivity. This pipeline ensures a sustainable, non-lethal deterrent that protects fish stocks while preserving biodiversity.

Ronnie works closely with Dr. Alison R. Gerken (USDA-ARS), whose mentorship and behavioral ecology expertise shaped species-specific detection zones, misting duration, and deployment strategies to align the technology with natural bird responses. Dr. Joseph Gerken and his team (Kansas State University) contributed field expertise on aquatic ecosystems and environmental data analysis, ensuring ecological sensitivity and real-world feasibility. Their interdisciplinary synergy across AI, behavioral biology, and aquaculture ensures that the project’s design is both technically rigorous and environmentally ethical.

Dr. Serfa Juan has been awarded the **2025 Christine Stevens Wildlife Award** from the Animal Welfare Institute (AWI) for this research project.  The prestigious award—listed among AWI’s [Christine Stevens Wildlife Award winners](https://awionline.org/content/christine-stevens-wildlife-awards), —recognizes research that promotes humane, non-invasive solutions to wildlife conflicts. The project was selected for its creative and ethical approach to balancing animal welfare and aquaculture protection.

The team plans expanded field trials and refinements to improve detection performance under diverse environmental conditions, while engaging stakeholders in agriculture, and wildlife conservation. By combining SCINet HPC resources, AI computer vision technology, and embedded electronics, this project represents how USDA researchers are advancing adaptive, humane solutions for wildlife conflicts in agriculture.

![Figure 1](/assets/img/posts/2025-juan-gerken.png)
*Figure 1. Block diagram of the AI-driven bird deterrence system integrating SCINet HPC resources for YOLO-based model training, edge deployment on embedded hardware, and non-lethal water misting to protect aquaculture ponds.*