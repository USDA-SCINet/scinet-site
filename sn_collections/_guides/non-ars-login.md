---
title: Non-ARS Employees - Logging in to SCINet
description: How to access SCINet for Non-ARS employees
order_number: 7

categories: [Access]

excerpt: Non-ARS employee instructions for accessing SCINet

subnav:
  - title: Creating a Config File
    url: '#config-file-non-ars'
  - title: Installing SmallStep Via SSH
    url: '#installing-smallstep-non-ars'
    subnav:
      - title: Windows Instructions
        url: '#windows-instructions-non-ars'
      - title: Mac Instructions
        url: '#mac-instructions-non-ars' 
      - title: Linux Instructions
        url: '#linux-instructions-non-ars''
      - title: After Step Installation
        url: '#after-step-installation-non-ars''
      - title: SSH Access
        url: '#usage-instructions-non-ars''

---

[No account? Signup here.]({{ site.baseurl }}/about/signup){: .usa-button .usa-button-big }

Note that home directories on Atlas are not created right away, so it is recommended to wait a day after receiving email with the credentials before logging to Atlas cluster. 

**If you are logging in using LincPass/AltLinc/PIV Exemption, please see the [ARS Login Page](/guides/access/login/ars-employee-login)**

## Creating a Config File

It is recommended to create a config file on your computer. You may do so using Notepad.  The file you create must be titled “config” with no extension for this method to work properly (i.e. “config” not “config.txt”). This will send a “keepalive” signal every 20 seconds and keep retrying for up to 30 failures. 
	Note: Do not copy the code into the terminal itself, it must be in a separate file. 

Create a ~/.ssh/config file replacing USER.NAME with your actual username, all in lowercase. The path to the .ssh file is as follows: C>Users>(Your Account)>.ssh

Note: If you are using a Mac, the .ssh file may be hidden to you. To reveal the hidden files, you will press and hold CMD+SHIFT+. (Period Key) when choosing a location to save your file. The .ssh file will now be visible for you to save the config file.

{:.copy-code}
```bash
Host ceres-login
HostName ceres.scinet.usda.gov
User USER.NAME
TCPKeepAlive yes
ServerAliveInterval 20
ServerAliveCountMax 30

Host atlas-login
HostName atlas-login.hpc.msstate.edu
User USER.NAME
TCPKeepAlive yes
ServerAliveInterval 20
ServerAliveCountMax 30

ForwardAgent yes
```
If you don’t want to use the config file method above, add the following title to the ssh command replacing USER.NAME with your actual username, all in lowercase.

{:.copy-code}
```bash
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=20 -o ServerAliveCountMax=30 USER.NAME@ceres.scinet.usda.gov
```
and

{:.copy-code}
```bash
ssh -o TCPKeepAlive=yes -o ServerAliveInterval=20 -o ServerAliveCountMax=30 USER.NAME@atlas-login.hpc.msstate.edu
```

## Installing SmallStep Via SSH

**Please Note:** 
If you previously manually created a ssh host key, you may need to delete it as the hosts will now have a new signed key.
Delete your .ssh/known_hosts file OR run:
`ssh-keygen -R ceres.scinet.usda.gov 
`This process will remain the same for all GUI services.

### Windows Instructions

- OpenSSH needs to be installed.  This is standard on recent Windows 10 and 11, MacOS, and Linux installs. However your local admin may have removed it or restricted access to it.  Check by running "ssh" in a PowerShell or terminal window.  You should get Usage instrctions.
- ssh-agent needs to to running as a system service. **If it is not running SmallStep will NOT work. You must assure it is running before proceeding**
  - For Windows this has to be enabled by an administator, it is not on by default even if openssh is installed.
  - To enable it an administor must:
    - Open a PowerShell Window as an administrator (right click on the program and select "Run as Administrator") and enter the following commands:

      {:.copy-code}
      ```
      Get-Service ssh-agent | Set-Service -StartupType Automatic
      ```
    - Start the service

      {:.copy-code}
      ```
      Start-Service ssh-agent
      ```
    - This should return a status of Running
    
      {:.copy-code}
      ```
      Get-Service ssh-agent
      ```
- To installation yourself, see: [SmallStep Windows Instructions](https://smallstep.com/docs/step-cli/installation/#windows).
  - For windows we recommend the winget installer, we've had the best lusk with that. Again, please be aware that you will only be able to complete the installation yourself if you have admin rights (i.e. you will have admin rights on your home machine rather than an USDA controlled machine.)
- After installing, you may need to restart your terminal for step to be in your path.

Once your Step installation is complete, see [After Step Installation](#after-step-installation-non-ars)

### Mac Instructions

- For MacOS the instrcutions are more straightforward and can be done by the user without admin access. To do so, see: [SmallStep Mac Instructions](https://smallstep.com/docs/step-cli/installation/#macos).
- **Please Note** Homebrew will need to be installed first. There is a link to install it at the link above. It is the first step before installing Step.
- After installing, you may need to restart your terminal for step to be in your path.
 
Once your Step installation is complete, see [After Step Installation](#after-step-installation-non-ars)

### Linux Instructions
 - Linux will require root/sudo if you want to use the system packager rpm,deb,pacman. But can be done in userspace it you just download the binary directly.
 - To install SmallStep, see the [Linux Instructions](https://smallstep.com/docs/step-cli/installation/#linux-packages-amd64)
- After installing, you may need to restart your terminal for step to be in your path.

Once your Step installation is complete, see [After Step Installation](#after-step-installation-non-ars)

### After Step Installation:
- Open a Terminal, CMD shell, or PowerShell window and run the following:

  {:.copy-code}
  ```
  step ca bootstrap --ca-url https://step-ca.scinet.usda.gov --fingerprint adb703fd18f176937743b20228d52af7a705d63a0471cd67428660be5fd006bf 
  ```
  
    {:.copy-code}
  ```
  step ssh config --set Provisioner=keycloak --set User=user.name
  ```

  - Be sure to change "user.name" to your own SCINet username 
  - **Windows Users Only** If the step config command fails, ssh-agent probably isnt running.  See instructions [above](windows-instructions-non-ars).


#### These commands will do the following:
- Gets the initial cert from the certificate authority. 
- Sets up your ssh profile to simplify future logins

These commands only need to be done once. 
The second command updates your .ssh/config file. If you already have a complicated structure in there you may wish to review it. The changes are fine for most, but particularly if you already have ceres entries in yours there could be conflicts. 
 

### SSH Access After Step Installtion:
- Each morning on your first attempt to ssh to Ceres with ```ssh user.name@ceres.scinet.usda.gov``` or Atlas with ```ssh user.name@atlas-login.hpc.msstate.edu```, (changing user.name to your own SCINet username), your default web browser should open automatically to the SCINet authentication page, and you will see the following screen:

![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/linpassorlogingov.png)

- Choose "Login.gov or USDA LincPass" as your sign-in option.
- If prompted, you will then select “Customer”

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/selecting-customer.png)

- Then, you will select “Login.gov”

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/login.gov-landing.png)

- This will redirect you to login.gov for you to sign in. If you already have an existing login.gov account, there is no need for you to create a new one. You can simply sign in with your existing information. 
	- However, if you need to create an account, you will toggle from “Sign In” to “Create an account.”

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/signin-create-account.png)
![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/signin-existing-account.png)

- Once you fill out the required information, you will be sent an email to confirm your account.  Confirming your email will redirect you back to login.gov for you to set up a password and second authentication method. 
- More information on account set up can be found [here](https://www.login.gov/help/get-started/create-your-account/)
- Once you have completed the account setup, you will need to select “Continue without linking to an existing eAuth account” to move forward.  

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/link-login.gov.png)

- Once you have successfully authenticated with login.gov, you should see a similar image to the successful logins for LincPass/Yubikey: 

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/login-success.png)

After these steps, command line ssh works normally. You will only need to authenticate once for the day (or every 16 hours). 

#### Notes and Limitations

- If you use multiple profiles in Chrome, step will open a new window in whichever profile was used last.   If you end up in the wrong one just close it, do something in your work profile and rerun the ssh login command.  
- Windows users will find most tools other than the built-in windows ssh command line tools no longer work. 
- Mac and Linux users may have a bit more luck, but anything beyond command line tools probably won’t work anymore. 
- For graphical file transfers globus is still the preferred method and will continue to work. 
- After logging in via OIDC you will not have any automatic Kerberos tickets.  You will need to kinit if you need them. 

If you have any questions or issues, please contact the VRSC at [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=account%20access).
