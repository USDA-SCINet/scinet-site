---
title: Geneious
description: Geneious Software Use Guide
## author: VRSC

categories: [Application]

redirect_from: 
  - /guides/application/geneious

subnav:
  - title: Activating
    url: '#activating'
  - title: Moving to a new Device
    url: '#moving-to-a-new-device'
  - title: Using Geneious on Ceres
    url: '#using-geneious-on-the-ceres-cluster'
---

SCINet manages licenses for [Geneious Prime](https://www.geneious.com/features/prime).  The licenses are paid for using individual unit funds and are purchased on an annual basis. <!--excerpt-->  Buying as a group provides better pricing for all.  For information on purchasing a license please [contact the VRSC]({{ site.baseurl }}/about/contact).

Note these licenses need to be activated with eAuth and Geneious Prime version 2026.1.1 or later is required to work with your LincPass.

{% include images_path %}


## Activating

After you  purchase a license you should receive an email from the VRSC with instructions on getting started.

1. After either downloading [Geneious Prime](https://www.geneious.com/updates) or installing it from Software Center as needed, go ahead and start it up.  Geneious will start with a box asking for a license activation as seen here:

   ![Geneious no license screen]({{ images_path }}/geneious/no-license.png)

2. Click "Activate a License" and you will get the following screen

   ![Activation Screen]({{ images_path }}/geneious/activation-picker.png)  
   You must pick "Continue in Your Browser" at the bottom.

3. Click on "Email Sign In" in the browser page that comes up.  
   ![Choose External Browser]({{ images_path }}/geneious/email-signin-page.png)

4. Enter your scinet email address.  (usually something like first.last@usda.gov) and click continue.  

5. Click "Log In with SSO" and proceed with your usual eAuth login.

After Authentication is complete you should be able to use Geneious Prime on your device.

 ![Success]({{ images_path }}/geneious/sso-success.png)

## Moving to a new Device

Your license allows for 2 devices to be activated at the same time.  If you need to move a license to a different device you can move a license twice every 30 days.

### If you still have access to Geneious on the old device

1. Start Geneious
2. Select "Help" then "Release License(s)" from the menu.  
   ![Help Menu]({{ images_path }}/geneious/helpmenu.png)
3. You will get a confirmation dialogue. Select "Release License"  
   ![Geneious release confirmation]({{ images_path }}/geneious/releaseconfirmation.png)


### If you no longer have access to the old device

You can still deactivate the license on the [geneious website](https://www.geneious.com/)

1. First sign in on their homepage using the "Geneious Prime My Account" option  
   ![Geneious login screen]({{ images_path }}/geneious/login.png)
2. Click "deactivate" on the device you wish to remove.  
   ![Geneious deactivate buttons]({{ images_path }}/geneious/beforedeactivate.png)
3. Confirm your action.  
   ![Geneious Deactivate Confirmation]({{ images_path }}/geneious/confirmdeactivate.png)
4. You will recieve a successful deactivation message.
   ![Deactivated successfully]({{ images_path }}/geneious/afterdeactivate.png)


After releasing the license go through the [activation steps](#activating) above to reactivate on your new device.


## Using Geneious on the Ceres Cluster

Geneious Prime can also be accessed via [OpenOnDemand](https://scinet.usda.gov/guides/use/open-ondemand) which will allow you to run Geneious Prime directly on a cluster node.

<div class="shadow-2 usa-alert usa-alert--warning">
<div class="usa-alert__body">
<h4 class="usa-alert__heading">Each node counts as a separate activation of your license</h4>
<div class="usa-alert__text" markdown=1>

Each node on the cluster you use with Geneious would count as a separate activation of your license and you can only release and move to a new device twice in 30 days.  

To avoid this, always request a specific node when using Geneious on the cluster with the "-w nodename" option, where "nodename" is the specific node you would like to use.  

For example:  
```
-w ceres20-compute-5
```

</div>
</div>
</div>

1. Login to OpenOnDemand (OOD) as usual, then select "Geneious: Ceres" from the interactve apps menu.  
   ![Picking Geneious in OOD menus]({{ images_path }}/geneious/menu.png)
2. Choose your version and options.  
   ![Choosing options for geneious run in OOD]({{ images_path }}/geneious/options.png)
3. Finally click "Launch Geneious: Ceres".  
   ![Launching Geneious session in OOD]({{ images_path }}/geneious/launch.png)
  
