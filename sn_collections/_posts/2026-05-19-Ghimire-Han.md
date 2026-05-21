---
title: "Machine learning-based prediction of cereal rye cover crop biomass across diverse agroecosystems"

description: "ARS researchers are developing computer models to predict cereal rye biomass and plant quality, including the nitrogen:carbon ratio that influences nitrogen release to subsequent crops."
categories: [Stories]

excerpt: "Cereal rye is a widely used cover crop because it reduces soil erosion, scavenges excess nutrients, and suppresses weeds, all of which support soil health and regenerative agriculture. These benefits depend on the crop’s ability to produce substantial biomass. Accurately predicting rye biomass before termination can help growers plan fertilizer and herbicide applications and make informed decisions about planting the next cash crop. Researchers at the USDA-ARS Adaptive Cropping Systems Laboratory are developing computer models to predict cereal rye biomass and plant quality, including the nitrogen:carbon ratio that influences nitrogen release to subsequent crops"



author: "Utsab Ghimire<sup>1</sup> and Eunjin Han<sup>2</sup>" 
affiliation: "<sup>1</sup>Horticultural Sciences Department, University of Florida, Gainesville, Florida, USA  <br><sup>2</sup>Adaptive Cropping Systems Laboratory, U.S. Department of Agriculture - ARS, Beltsville, MD, USA"

---

Cereal rye is a widely used cover crop because it reduces soil erosion, scavenges excess nutrients, and suppresses weeds, all of which support soil health and regenerative agriculture. These benefits depend on the crop’s ability to produce substantial biomass. Accurately predicting rye biomass before termination can help growers plan fertilizer and herbicide applications and make informed decisions about planting the next cash crop.

Researchers at the USDA-ARS Adaptive Cropping Systems Laboratory are developing computer models to predict cereal rye biomass and plant quality, including the nitrogen:carbon ratio that influences nitrogen release to subsequent crops. A process-based model developed by Wang et al. (2021) simulates rye growth on an hourly basis, including phenology, photosynthesis, and soil water and nutrient uptake. While this model provides detailed insight into crop responses to environmental conditions, its computational requirements limit operational use for real-time decision making.

To complement this approach, the team is now creating more computationally efficient, data-driven machine learning (ML) models for practical use. Utsab Ghimire, a 2025 ARS AI-COE/SCINet graduate student intern from the University of Florida, made substantial contributions to accelerating development of these ML-based biomass prediction models. One key challenge was the limited field biomass data available for training, since biomass is typically measured only once or twice per season. However, a new dataset published by Huddell et al. in 2024 greatly improved this situation by providing 5,695 biomass measurements across 208 site-years (2001–2022) from the eastern U.S. After quality control, aggregation of field replicates, and removal of anomalies, 645 observations were available for modeling.

To capture the main drivers of rye biomass, the team evaluated climate variables, soil properties, initial soil fertility, and multiple global satellite-based datasets. These included gross primary production estimated from solar-induced chlorophyll fluorescence (NASA OCO2), leaf area index from NASA MODIS, and rootzone soil moisture from the Global Land Evaporation Amsterdam Model. Correlation analysis was used to select the most informative features and avoid multicollinearity. SCINet’s Ceres supercomputer was used to process the global dataset.

Using these inputs, the research team developed ML biomass prediction models with CatBoost and XGBoost, two advanced gradient-boosted tree algorithms. These models predicted early-season biomass (from tillering to booting) with moderate accuracy. Later-season predictions were less accurate due to fewer observations and greater variability in spring biomass, as cover crops receive less controlled management than cash crops. To better represent uncertainty, the CatBoost model was expanded with quantile regression, allowing predictions to be expressed as intervals (10–90%) rather than single values. For example: instead of reporting “biomass is 4,000 kg ha⁻¹,” model results can be reported as “the median is 4,000, with most outcomes between 3,200 and 4,800 kg ha⁻¹.” This provides growers with more informative, decision-relevant guidance.

Overall, the study shows that publicly available soil, weather, and satellite datasets—combined with limited management information—can support interpretable, uncertainty-aware predictions suitable for improving cereal rye cover crop management. For more information, see our open‑access article in Agricultural and Environmental Letters: https://doi.org/10.1002/ael2.70055.
