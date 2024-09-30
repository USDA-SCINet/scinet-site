---
title: SCINet Computing Resources
description: Guide to SCINet HPC
order_number: 20
sorting: index
layout: "guides"
class: "guide-nav"

short_title: Computing Resources

categories: [Resources]

show_full: true

sidenav_append:
  - title: Atlas HPC User Guide
    url: https://www.hpc.msstate.edu/computing/atlas
    external: true
    class: bg-accent-warm-lighter border-y-1px border-accent-warm
  - title: SEARCH
    url: /search
    class: "sidenav-search"

cluster-table:
  title: HPC Clusters on SCINet
  flex: true
  data:
    - Cluster Name: Ceres
      Location: Ames, IA
      Login Nodes: ceres.scinet.usda.gov
      Transfer Nodes: ceres-dtn.scinet.usda.gov
    - Cluster Name: Atlas
      Location: Starkville, MS
      Login Nodes: atlas-login.hpc.msstate.edu
      Transfer Nodes: atlas-dtn.hpc.msstate.edu

---

{% include table.html local='cluster-table' %}

<!--excerpt-->
