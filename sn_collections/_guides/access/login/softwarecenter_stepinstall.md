---
title: Downloading SmallStepCLI from Software Center (USDA Managed Machines Only)
description: How to download SmallStepCLI from the Software Center
parent:
  title: Login
  url: /guides/access
  class: "guide-nav"

subnav:
  - title: SmallStepCLI Download
    url: '#smallstepcli-download'
---

{% include images_path %}




**LincPass Users** Please contact your IT Specialist if you need help with installing Step on your USDA controlled machine. 

**If you are encountering errors after completing the below steps, see [SmallStepCLI Install Troubleshooting for LincPass Users](/guides/access/login/smallstepscli)**

The below instructions are a step-by-step guide to download SmallStepCLI from Software Center. If you are not on a USDA controlled machine, you can [install SmallStep yourself using the instructions found here]({{ site.baseurl}}/guides/access/ssh-login#small-step-installation-instructions).

* First, please open Software Center. Then you will search for SmallStepCLI.  
  Select the application that appears.  
  ![Screenshot of Software Center with SmallStep search results showing]({{ images_path }}/softwarecenterstep/search_smallstep.png)

* Next, you select the install option and follow any prompts to complete the install.  
  ![Screenshot of Software Center install button]({{ images_path }}/softwarecenterstep/install_smallstep.png)

* Once the installation is complete, you will see that you are prompted to select "Restart".  
  **This is mandatory before attempting to use SmallStep for ssh logins.**  
  ![Screenshot of Software Center restart button]({{ images_path }}/softwarecenterstep/restart_message.png)

* Once you have restarted, you can then open your ssh client (Windows PowerShell preferred). You can verify that your ssh-agent is automatically running by issuing the following command:

  {:.copy-code}
  ```
  Get-Service ssh-agent
  ```

  It will return a status of "Running". If it does not, please contact your IT Specialist. 

Now that you have confirmed your ssh-agent is running and Step is properly installed, you can continue with the configuration of Step. These instructions are [here](/guides/access/ssh-login#ssh-access-after-small-step-installtion). 
