---
title: Geneious
description: Geneious Software Use Guide
excerpt: Geneious Software Use Guide
## author: VRSC

categories: [Application]

redirect_from: 
  - /guides/application/geneious
---

{% include images_path %}


subnav:
  - title: Activating
    url: '#activating'
  - title: Moving to a new Device
    url: '#newdevice'
  - title: Using Geneious on the Ceres Cluster
    url: '#geneiousceres'


## Activating

SCINet manages licenses for [Geneious Prime](https://www.geneious.com/features/prime).  The licenses are paid for using individual unit funds and are purchased on an annual basis. Buying as a group provides better pricing for all.  For information on purchasing a license please contact XXXXXX.

Note these licenses need to be activated with eAuth and Geneious Prime version 2026.1.1 or later is required to work with your LincPass.

After you  purchase a license you should receive an email from the VRSC with instructions on getting started.

After either downloading [Geneious Prime](https://www.geneious.com/updates) or installing it from Software Center as needed, go ahead and start it up.  Geneious will start with a box asking for a license activation as seen here:

 ![Geneious no license screen]({{ images_path }}/geneious/nolicense.png)

Click "Activate a License" and you will get the following screen

 ![Activation Screen]({{ images_path }}/geneious/activation-picker.png)

You must pick "Continue in Your Browser" at the bottom.

 ![Choose External Browser]({{ images_path }}/geneious/email-signin-page.png)

Click on "Email Sign In" in the browser page that comes up.

enter your scinet email address.  (usually something like first.last@usda.gov) and click continue.

 ![Enter your email address]({{ images_path }}/geneious/sso-selector.png)

Click "Log In with SSO"

Proceed with your usual eAuth login.

After Authentication is complete you should be able to use Geneious Prime on your device.

 ![Success]({{ images_path }}/geneious/sso-success.png)

## Moving to a new Device

Your license allows for 2 devices to be activated at the same time.  If you need to move a license to a different device  can move your license to a new device twice every 30 days.

If you still have access to Geneious on the old device start Geneious and select "Help" then "Release License" from the menu.

 ![Help Menu]({{ images_path }}/geneious/helpmenu.png)

You will get a confirmation dialog similar to this.

![Geneious release confirmation]({{ images_path }}/geneious/releaseconfirmation.png)


If you no longer have access to the old device you can still deactivate the license on the [geneious website](https://www.geneious.com/)

First sign in on their homepage using the "Geneious Prime My Account" option

 ![Geneious login screen]({{ images_path }}/geneious/login.png)

Then click "deactivate" on the device you wish to remove.

![Geneious deactivate buttons]({{ images_path }}/geneious/beforedeactivate.png)

confirm your action 

 ![Geneious Deactivate Confirmation]({{ images_path }}/geneious/confirmdeactivate.png)

and you're done!

 ![Deactivated successfully]({{ images_path }}/geneious/afterdeactivate.png)



After releasing the license go through the activation steps above to reactivate on your new device.


## Using Geneious on the Ceres Cluster

Geneious Prime can also be accessed via [OpenOnDemand](https://scinet.usda.gov/guides/use/open-ondemand) which will allow you to run Geneious Prime directly on a cluster node.

Note that each node on the cluster would count as a separate activation of your license and you can only release and move to a new device twice in 30 days.  To avoid this always request a specific node when using Geneious on the cluster with the "-w nodename" option.  Where "nodename" is the specific node you would like to use.  "-w ceres20-compute-5" as an example.

First login to OpenOnDemand (OOD) as usual, then select "Geneious: Ceres" from the interactve apps menu.

  ![Picking Geneious in OOD menus]({{ images_path }}/geneious/menu.png)

Next choose your version and options.

  ![Choosing options for geneious run in OOD]({{ images_path }}/geneious/options.png)

Finally click "Launch Geneious: Ceres".

  ![Launching Geneious session in OOD]({{ images_path }}/geneious/launch.png)