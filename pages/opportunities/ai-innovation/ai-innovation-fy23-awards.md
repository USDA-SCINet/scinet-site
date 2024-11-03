---
title: ARS AI Innovation Fund - FY2023 Awards
description: Abstracts of AI Innovation Fund proposals funded in FY2023.
permalink: /opportunities/ai-innovation/fy23-awards
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

The ARS AI Center of Excellence (AI-COE) funded five AI Innovation Fund proposals in FY2023.  The program was again very competitive, with many more proposals submitted than we could support.  Information about the funded projects is provided below.

## Funded proposals

### Development of predictive models and a digital interface to manage mycotoxin outbreaks in the USA

* **PI and Co-PIs:** Lina Castano-Duque
* **Amount of award:** $100,000
* **Abstract:** Mycotoxin contamination of corn remains a persistent problem resulting in serious agroeconomic losses worldwide. In the United States (USA) there is currently no commercially available forecasting system to alert corn growers of the risk of mycotoxin contamination and when to best employ mitigation strategies to minimize mycotoxin-related losses. The goal of this proposal is to use machine learning and artificial intelligence predictive algorithms to forecast mycotoxin contamination of corn in USA and create a prototype of a digital product (app/website) that can be used by stakeholders to make timely risk-based decisions regarding the implementation of strategies to mitigate mycotoxin contamination of grain. This goal will be achieved through two objectives during the one-year timeline of the AI Innovation Fund: Objective 1: Retrain our recently developed Illinois mycotoxin-predictive models with mycotoxin data from Texas to develop state-specific models. Objective 2: Use the state-specific predictive models to develop a prototype of a user-friendly digital product such as web-based alert application system for use by stakeholders. A predictive system that forecasts mycotoxin contamination can aid stakeholders by saving time and money to employ mitigation strategies to minimize mycotoxin-related losses when needed. The final goal will be to develop a digital interface (Website/App) available to stakeholders in the USA.

### CoffeeMD: Development of machine learning to rapidly identify damage from coffee pests, diseases, and nutrient deficiencies

* **PI and Co-PIs:** Melissa Johnson
* **Amount of award:** $100,000
* **Abstract:** Coffee is one of Hawaii's most valuable agricultural commodities, with an estimated value of $113 million for green coffee and $161 million for roasted coffee in 2022. Resources are needed to aid coffee growers in identifying pest, disease and nutrient issues in their fields: Today a single extension agent is responsible for outreach and education on more than 1500 coffee farms across the state. Information on coffee pests, diseases and nutrient deficiencies/toxicities exists online in lengthy documents which can be difficult for growers to access and understand. We propose to develop a system using machine learning and computer vision plus additional data to identify damage caused by coffee pests and diseases, as well as nutrient deficiencies and toxicities, and provide decision support to growers. The project will involve the collaboration of researchers, coffee growers, consultants, and app developers. We will curate an extensive digital image library focusing on pest, disease and nutrient issues that are visible in coffee plant leaves, and use SCINet resources to train a neural network. A subset of images will be used to validate the approach and check the accuracy of identifications. We envision beginning with a supervised classifier based on a support vector machine or similar statistical learning approach and testing the viability of an unsupervised system. This research will allow coffee growers to identify issues rapidly and accurately so they can be corrected with minimal impacts on yield and quality. Images will be archived and integrated as a feature in the BestBeans mobile app, (USDA-ARS Hilo + SmartYields CRADA) which is currently in use in Hawaii and should aid with grower uptake.

### Automated, image-based monitoring of spotted-wing drosophila using deep learning

* **PI and Co-PIs:** Jana Lee, Tim Warren
* **Amount of award:** $95,760
* **Abstract:** Automated methods provide high temporal resolution - informing when in the day and season pests are active. By setting traps in a spatial grid, we can get high-resolution patterns of movement and sync with environmental data. The invasive spotted-wing drosophila (SWD) is a serious pest of cherries and berries where growers would benefit using real-time data. While males can be detected with current automated methods due their obvious wing spot, female SWD cannot yet be distinguished from other fly species. Monitoring female SWD is advantageous to track early season populations when males are scarce or unresponsive, and responses to pesticides of the more resilient sex. We propose developing an automated trap to detect female SWD by adjusting the optics in a recently developed Raspberry Pi camera pointed at a baited funnel trap. This trap positions flies from dorsal view allowing detection of a pointed posterior compared to other Drosophila species; this is discernible to the trained human eye without magnification. Our first aim is to perform automated segmentation of raw images into relevant anatomy (head, eyes, pronounced ovipositor) using deep learning. We will collect training images by releasing SWD and the co-occurring Drosophila melanogaster in a wind tunnel, and train the pose estimator on a subset of frames using ARS HPC, and evaluate true positives, false positive and false negative rates. Our second aim is to automatically identify male and female SWD from image data using deep learning. A neural network classifier will perform automated identification. Once we have classifier data, we will validate automated traps in the open field. Automated monitoring of female SWD enables growers to target management when and where exposure is greatest, and check resulting efficacy. 

### A Deep Learning model for irrigation methods mapping

* **PI and Co-PIs:** Kossi Nouwakpo
* **Amount of award:** $99,809
* **Abstract:** Nearly half of freshwater withdrawals in the United States are used for irrigation. Significant volumes of water withdrawn for irrigation are however not used for plant growth due to inefficient irrigation practices. The types of irrigation systems used on farms have profound influence on irrigation water efficiency and water quality. Surface irrigation methods are generally less efficient than sprinkler systems due to significant water loss to runoff. Maps of irrigation methods used across the agricultural landscape provide valuable information to water management agencies for planning and reporting purposes. Such maps are currently not readily available in most states and no tool exists to create these maps. Advances in Machine Learning and Computer Vision combined with the availability of satellite data provide unique opportunities to develop tools that simultaneously detect and classify the different irrigation methods used across the landscape. In preliminary results obtained for the state of Utah we successfully predicted irrigation methods using a U-Net model, a type of deep learning architecture based on convolutional neural networks. The model took as input images constructed from Landsat satellite products and achieved both overall accuracy and precision of 77%. The aim of this proposal is to build on these early results to develop a deep learning model to map irrigation methods by generalizing and evaluating prediction capabilities across state boundaries in the northwestern U.S. This project will produce (1) maps of irrigation methods in major agricultural areas of the northwestern U.S. for past and recent years when input images can be computed (e.g., 2003-2021) and (2) trained generalized deep learning models to predict irrigation methods in future years.

### Using museum collections to develop a machine learning application to stop biological invasions

* **PI and Co-PIs:** Christopher L. Owen, Alex Konstantinov
* **Amount of award:** $99,800
* **Abstract:** New biological invasions threaten U.S. agriculture every day and they historically total billions in damage and management costs. North America alone is projected to spend $11 billion annually on the damage and control costs of biological invasions. The threat from biological invasions continues to increase due to the expansion of the global trade network. Currently, the USDA works daily with other federal, state, and local officials to monitor U.S. agricultural resources, ports-of-entry, and borders for non-native species. This process relies on using museum collections to morphologically identify biological specimens that enter our borders to determine if they are non-native. This process can take days due to specimen preparation requirements. In an effort better protect our borders from biological invasions, we propose to build a convolutional neural network (CNN) application using museum habitus images to identify non-native species. Recent studies have shown CNN applications to outperform professional taxonomists by an accuracy rate of up to 20%. We will use the beetle genus Epitrix as our exemplar group. Species in Epitrix are major pests of Solanaceae worldwide and most non-native species are on the U.S. quarantine list. Ultimately, we hope to demonstrate the CNN accuracy and begin applying this application to other agriculturally important organisms to prevent the next biological invasion.

