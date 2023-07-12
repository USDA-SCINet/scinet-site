---
title: Step Based Access Via SSH 
description: A guide to installing and running step on SSH 
order_number: 7
excerpt: "<p>Instructions for Step Based SSH</p>"

categories: [Access]

subnav:
  - title: Installation Instructions
    url: '#installation-instructions'
  - title: After Step Installation  
    url: '#after-step-installation' 
  - title: Usage Instructions
    url: '#usage-instructions'
---

### Please Note: 
You may need to delete the old ssh host key as the hosts will now have a new signed key.
Delete your .ssh/known_hosts file OR run:
`ssh-keygen -R ceres.scinet.usda.gov 
`This process will remain the same for all GUI services.
 
### Installation Instructions:
 
- If you are on an ARS controlled laptop or workstation, this will need to be performed by CEC. They should be aware of the process. It may be in your software catalog. 
- If you do need to perform the installation yourself, see: [https://smallstep.com/docs/step-cli/installation/](https://smallstep.com/docs/step-cli/installation/)

### After Step Installation:
- Open a Terminal, CMD shell, or PowerShell window and run the following:
- `step ca bootstrap --ca-url https://step-ca.scinet.usda.gov --fingerprint adb703fd18f176937743b20228d52af7a705d63a0471cd67428660be5fd006bf `
- `step ssh login –provisioner=keycloak` 
- `step ssh config --set Provisioner=keycloak`

#### These commands will do the following:
- Gets the initial cert from the certificate authority. 
- Does an initial login to verify your credentials 
- Sets up your ssh profile to simplify future logins 
- This only needs to be done once. 
- The second command updates your .ssh/config file. If you already have a complicated structure in there you may wish to review it. The changes are fine for most, but particularly if you already have ceres entries in yours there could be conflicts. 
 
### Usage Instructions:
- Each morning on your first attempt to ssh to Ceres, you will see something like this: 

	- Your default web browser should open automatically to the SCINet authentication page.  Choose USDA LincPass as your sign-in option. 
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/LincPass.png)

- You will then go through a typical eAuth based login. Select login with PIV/CAC and enter your pin, see the images below for example.
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/eAuth.png)

- Now go through your usual eAuth based login. 
	- Please Note: There could be complications here if its your first time.  If you need to link accounts, please see the instructions [here](https://scinet.usda.gov/guides/access/gui-systems)

- Go back to your shell and you should see something like "CA: https://step-ca.scinet.usda.gov" followed by your regular login.
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/login-success.png)

After these steps, command line ssh works normally. The only different is that it will not prompt you for a password for the day (18 hours). 
	Note: With the below examples, you will swap user.name for your own SCINet username.
```
ssh user.name@ceres.scinet.usda.gov 
scp file1 file2 user.name@ceres.scinet.usda.gov:~ 
```

### Notes and Limitations

- If you use multiple profiles in Chrome, step will open a new window in whichever profile was used last.   If you end up in the wrong one just close it, do something in your work profile and rerun the ssh login command.  
- Windows users will find most tools other than the built-in windows ssh command line tools no longer work. 
- Mac and Linux users may have a bit more luck, but anything beyond command line tools probably won’t work anymore. 
- For graphical file transfers globus is still the preferred method and will continue to work. 
- After logging in via OIDC you will not have any automatic Kerberos tickets.  You will need to kinit if you need them. 

If you have any questions or issues, please contact the VRSC at scinet_vrsc@usda.gov.
