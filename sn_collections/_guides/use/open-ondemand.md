---
title: Open OnDemand Interface
description: Using Open OnDemand on the HPC
# author: VRSC
categories: [Use]
order_number: 25
redirect_from: 
  - /guides/access/open-ondemand
  - /guides/software/open-ondemand

layout: guides

guidegroup:
    section: apps

subnav:
  - title: Accessing OOD
    url: '#access'
  - title: Using OOD
    url: '#using-ood'
    subnav:
      - title: Using Clipboard to Copy/Paste Data
        url: '#using-clipboard-copypaste'
  - title: Interactive Applications
    url: '#interactive-applications'

apps:
  - title: Jupyter
    url: /guides/ide/jupyter
    internal: true
  - title: RStudio Server
    url: /guides/ide/r-studio
    internal: true
  - title: Geneious
    url: /guides/application/geneious
    internal: true
  - title: CLC Genomics Workbench
    url: /guides/application/clc-workbench
    internal: true

---

{% include images_path %}




Open OnDemand is an intuitive, innovative, and interactive interface to remote computing resources. The key benefit for SCINet users is that they can use any web browser, including browsers on a mobile phone, to access Ceres. 

There are several interactive apps that can be run in Open OnDemand including [Jupyter](/guides/ide/jupyter), [RStudio Server](/guides/ide/r-studio), [Geneious](/guides/application/geneious), [CLC Genomics Workbench](/guides/application/clc-workbench), and more. The desktop app allows a user to run any GUI software.

If you are using [Atlas Open OnDemand](https://atlas-ood.hpc.msstate.edu/), visit the [Atlas Open OnDemand Guide](https://www.hpc.msstate.edu/computing/atlas/ood.php) for more information. 

To access Open OnDemand on the Ceres cluster, go to [Ceres OpenOndemand](http://ceres-ood.scinet.usda.gov/)<!--excerpt-->

---
## Access
Follow [the GUI login instructions](/guides/access/web-based-login#accessing-web-based-interfaces) to access.

---

## Using OOD
![screenshot of Open OnDemand Ceres Dropdowns Banner]({{ images_path }}/ood/ceres-banner.png)
### Shell Access
To open a shell, select the **Clusters** dropdown menu and choose `>_Ceres Shell Access`. This will open a new tab with an interactive console session on the login node.

### Files
Open OnDemand includes a file manager. To open it, select the **Files** dropdown menu and choose the desired directory. Files can be uploaded, downloaded, viewed, and edited all from the web browser.

### Launching Interactive Apps
Several interactive apps are available on Open Ondemand, and more can be added later. 

To launch an interactive app, select the **Interactive Apps** dropdown menu and choose the desired app. It will open the *My Interactive Sessions* page where settings for app can be selected such as the partition or app version to run. 
![screenshot of Open OnDemand Ceres interactive apps configuration page]({{ images_path }}/ood/ceres-interactive-setup.png)
After selections have been made, pressing **Launch** will submit an interactive job. This job will be displayed as the topmost entry in the *My Interactive Sessions* page. The bottom of the intaractive app's job information card will display text saying the job is starting or, if it has already started, "Connect to `Interactive App Name`." Press the **Connect** button to launch the app in a new tab. 
![screenshot of Open OnDemand Ceres interactive apps job card with connect to button highlighted]({{ images_path }}/ood/ceres-interactive-card.png)

### Logging Out
To log out of Ceres Open OnDemand, click the **Log Out** button. 

### Using Clipboard to Copy/Paste Data

While Open OnDemand(OOD) v 3.0.x does do copy/paste with chrome browser, there is no official support for it. There is a very high likelihood that this “feature” will break due to it being unsupported on noVNC. 

The only supported way to copy/paste on noVNC is via the clipboard feature. This will work regardless of the browser you are using. 

**Remote -> Local**

- From a Desktop/CLC session, copy the contents you need 

- In this example, I am copying the contents from a Desktop OOD session to a text editor on my local machine 

- Select the text you need and right-click to Copy (as seen in image below)

![screenshot of first step to copy/paste]({{ images_path }}/ood/terminal-copypaste1.png)

- To sanitize the text prior to copying, you can use Mousepad text editor(Application -> Accessories -> Mousepad)

![screenshot of selecting mousepad application]({{ images_path }}/ood/mousepad-selection.png)

- Use Mousepad to copy all the text you need, this way you can copy the text in one step. 

- From Mousepad, select the text, right-click and copy.  

- noVNC has a control bar that includes a clipboard, to access it, click on the tab at the center on the left of the window. 

![screenshot of selecting novnc control bar]({{ images_path }}/ood/novnc-control-bar.png)

- Click to tab to show and then select the clipboard icon.

![screenshot of selecting clipboard icon]({{ images_path }}/ood/clipboard-icon.png)

- The clipboard will have the text in your buffer.

![screenshot of buffer]({{ images_path }}/ood/clipboard-buffer.png)

- The text from the noVNC clipboard is like any text in your browser, you can copy the text from here and then paste it in your local machine. 

![screenshot of copying buffer]({{ images_path }}/ood/copy-buffer.png)

![screenshot of pasting buffer]({{ images_path }}/ood/paste-buffer.png)

- For quick copy/paste you can have the clipboard open and then select the text you need and it will be instantly displayed in the clipboard buffer

**Local Machine -> Remote**

- Copy the text you need from your local machine and then paste into the noVNC clipboard

- Once in the clipboard buffer, it can be pasted into the text editor/application on the remote session. 

![screenshot of pasting buffer]({{ images_path }}/ood/remote-copy.png)


---

## Interactive Applications

These are some of the applications that are available on Open OnDemand:
