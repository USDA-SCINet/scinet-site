---
title: Logging in to SCINet
description: How to access SCINet
order_number: 5

categories: [Access]

subnav:
  - title: Step-Based Access Via SSH
    url: '#step-based-access-via-ssh'
    subnav:
      - title: Installation Instructions
        url: '#installation-instructions'
      - title: After Step Installation  
        url: '#after-step-installation' 
      - title: Usage Instructions
        url: '#usage-instructions'
  - title:  Accessing GUI Based Services
    url: '#accessing-gui-based-services'
    subnav:
      - title: Access Using LincPass  
        url: '#accessing-using-lincpass' 
      - title: Access Using YubiKey
        url: '#accessing-using-yubikey'


---

[No account? Signup here.]({{ site.baseurl }}/about/signup){: .usa-button .usa-button-big }

All users should have received their login credentials in an email.  If you have not, please email the Virtual Research Support Core at [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=account%20access).

**If you have not recieved a LincPass or YubiKey, please see the [Deprecated Login Procedures](/guides/access/legacy-login) page for instructions to access the HPC.**
<!--excerpt--> 

Before accessing various SCINet resources, new users need to ssh either to Ceres or Atlas cluster and change the temporary password. Note that home directories on Atlas are not created right away, so it is recommended to wait a day after receiving email with the credentials before logging to Atlas cluster.   

A video demonstration for changing your password can be found [here](https://www.youtube.com/watch?v=Amhw2k5mftI). Please keep in mind that due to the recent password requirement change, the video is out of date. It will list more password requirements than necessary.  The current requirements are found below:
1. AT LEAST 14 characters long
2. Your last 24 passwords cannot be reused.



## Step-Based Access Via SSH

**Please Note:** 
If you previously manually created a ssh host key, you may need to delete it as the hosts will now have a new signed key.
Delete your .ssh/known_hosts file OR run:
`ssh-keygen -R ceres.scinet.usda.gov 
`This process will remain the same for all GUI services.
 
### Installation Instructions:

- OpenSSH needs to be installed.  This is standard on recent Windows 10 and 11 installs. However your local adminmay have removed or restricted access to it.  Check by running "ssh" in a PS window.  You should get Usage instrctions.
- ssh-agent needs to to running as a system service. This has to be done as an administator:

```
# By default the ssh-agent service is disabled. Configure it to start automatically.
# Make sure you're running as an Administrator.
Get-Service ssh-agent | Set-Service -StartupType Automatic

# Start the service
Start-Service ssh-agent

# This should return a status of Running
Get-Service ssh-agent
```

- Step needs to be installed on your machine.
- If you are on an ARS controlled laptop or workstation, again this will need to be performed by CEC. They should be aware of the process. 
- If you do need to perform the installation yourself, see: [https://smallstep.com/docs/step-cli/installation/](https://smallstep.com/docs/step-cli/installation/). We recommend the winget installer, we've had the best lusk with that. Again, please be aware that you will only be able to complete the installation yourself if you have admin rights (i.e. you will have admin rights on your home machine rather than an ARS controlled machine). 

### After Step Installation:
- Open a Terminal, CMD shell, or PowerShell window and run the following:
- `step ca bootstrap --ca-url https://step-ca.scinet.usda.gov --fingerprint adb703fd18f176937743b20228d52af7a705d63a0471cd67428660be5fd006bf `
- `step ssh config --set Provisioner=keycloak --set User=scinetuser.name`
  - If the step config command fails ssh-agent probably isnt running.  See instructions above. 

#### These commands will do the following:
- Gets the initial cert from the certificate authority. 
- Sets up your ssh profile to simplify future logins

These commands only need to be done once. 
The second command updates your .ssh/config file. If you already have a complicated structure in there you may wish to review it. The changes are fine for most, but particularly if you already have ceres entries in yours there could be conflicts. 
 
### Usage Instructions:
- Please note, if you are using a YubiKey, please see the [Yubikey login instructions](#accessing-using-yubikey) 
- Each morning on your first attempt to ssh to Ceres with ```ssh ceres.scinet.usda.gov```, you will see something like this: 

	- Your default web browser should open automatically to the SCINet authentication page.  Choose USDA LincPass as your sign-in option. 
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/lincpass.png)

- You will then go through a typical eAuth based login. Select login with PIV/CAC and enter your pin, see the image below for example.
  
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/eAuth.png)

- Now go through your usual eAuth based login. 
	- Please Note: There could be complications here if its your first time using eAuth.

- Go back to your shell and you should see something like "CA: https://step-ca.scinet.usda.gov" followed by your regular login.
  
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/login-success.png)

After these steps, command line ssh works normally. The only different is that it will not prompt you for a password for the day (16 hours). 
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

## Accessing GUI Based Services

This process will be the same for all GUI based SCINet Services. Please follow the instructions below.  If you have further questions or issues, please email [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
 
### Accessing Using LincPass

If you are a LincPass holder, you will only select the option of "USDA LincPass" when logging into GUI services such as Open OnDemand, Galaxy, and the SCINet Forum. 

After selcting this, you will be automatically directed to login using your usual eAuth based login.

![]({{ site.baseurl }}/assets/img/guides/access/sign-on.png)
![]({{ site.baseurl }}/assets/img/guides/access/eAuth.png)
 
### Accessing Using YubiKey

- When logging in, you will enter your SCINet credentials (username and password) and click “Sign In”.
![]({{ site.baseurl }}/assets/img/guides/access/yubikey-login/login1.png)

- You will be directed to a new screen showing your available security keys. You will select "Sign in with Security Key".
![]({{ site.baseurl }}/assets/img/guides/access/yubikey-login/login2.png)

- A pop up will appear asking you if you would like to use your passkey. You will select "Use a different device" in the bottom left corner. 
![]({{ site.baseurl }}/assets/img/guides/access/yubikey-login/login3.png)

- The next pop-up will have three options. You will select "USB security key".
![]({{ site.baseurl }}/assets/img/guides/access/yubikey-login/login4.png)

- The final pop up will instruct you to insert your security key and touch it.  You will now insert your USB YubiKey (if you haven't already) and then touch it. This will then automatically log you into the service you were attempting to access. 
![]({{ site.baseurl }}/assets/img/guides/access/yubikey-login/login5.png)

- This step will remain the same for all GUI-based services such as Ceres OpenOnDemand, Galaxy, the SCINet Forum, and others. 

If you need assistance with this login process, please email your questions to scinet_vrsc@usda.gov.

