---
title: ARS Employees - Logging in to SCINet
description: How to access SCINet for ARS employees
order_number: 5

categories: [Access]

excerpt: ARS employee instructions for accessing SCINet

subnav:
  - title: Creating a Config File
    url: '#creating-a-config-file'
  - title: Small Step Installation
    url: '#small-step-installation-instructions'
    subnav:
      - title: Windows Instructions
        url: '#windows-instructions'
      - title: Mac Instructions
        url: '#mac-instructions' 
      - title: Linux Instructions
        url: '#linux-instructions'
  - title: After Step Installation
    url: '#after-step-installation'
  - title:  SSH Access
    url: '#ssh-access-after-step-installation'
  - title: Notes and Limitations
    url: '#notes-and-limitations'

---

All users should have received their login credentials in an email.  If you have not, please email the Virtual Research Support Core at [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=account%20access).

**If do not have a LincPass/AltLinc/PIV Exemption, please see the [Non-ARS Login Page](/guides/access/login/non-ars-employee-login)**

Please contact your IT Specialist if you need help with installing Step on your USDA controlled machine. 

**If you are encountering errors after completing the below steps, see [SmallStepCLI Install Troubleshooting for LincPass Users](/guides/access/login/smallstepscli)**

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

## Small Step Installation Instructions

**Please Note:** 
If you previously manually created a ssh host key, you may need to delete it as the hosts will now have a new signed key.
Delete your .ssh/known_hosts file OR run:
`ssh-keygen -R ceres.scinet.usda.gov 
`This process will remain the same for all GUI services.

### Windows Instructions

- OpenSSH needs to be installed.  This is standard on recent Windows 10 and 11, MacOS, and Linux installs. However your local admin may have removed it or restricted access to it.  Check by running "ssh" in a PowerShell or terminal window.  You should get Usage instrctions.
- ssh-agent needs to to running as a system service. **If it is not running SmallStep will NOT work. You must assure it is running before proceeding**
  - For Windows this has to be enabled by an administator, it is not on by default even if openssh is installed.  To enable it an administor must:
    - Open a PowerShell Window as an administrator (right click on the program and select "Run as Administrator").

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
- If you are on a USDA controlled Windows laptop or workstation, you can [install **SmallStepsCLI** directly from the Software Center]({{ site.baseurl}}/guides/access/login/smallstepscli-download).
  - If Software Center fails to install SmallStepCLI, please contact your IT Specialist prior to continuing.
  - **If you are encountering errors after completing the install, see [SmallStepCLI Install Troubleshooting for LincPass Users](/guides/access/login/smallstepscli)**
  - After installing, you may need to restart your terminal for step to be in your path.

- If you do need to perform the installation yourself, see: [SmallStep Windows Instructions](https://smallstep.com/docs/step-cli/installation/#windows).
  - For windows we recommend the winget installer, we've had the best lusk with that. Again, please be aware that you will only be able to complete the installation yourself if you have admin rights (i.e. you will have admin rights on your home machine rather than an USDA controlled machine.)

Once your Step installation is complete, see [After Step Installation](#after-step-installation)

### Mac Instructions

- For MacOS the instrcutions are more straightforward and can be done by the user without admin access. To do so, see: [SmallStep Mac Instructions](https://smallstep.com/docs/step-cli/installation/#macos).
- **Please Note** Homebrew will need to be installed first. There is a link to install it at the link above. It is the first step before installing Step. 

Once your Step installation is complete, see [After Step Installation](#after-step-installation)

### Linux Instructions
 - Linux will require root/sudo if you want to use the system packager rpm,deb,pacman. But can be done in userspace it you just download the binary directly.
 - To install SmallStep, see the [Linux Instructions](https://smallstep.com/docs/step-cli/installation/#linux-packages-amd64)

Once your Step installation is complete, see [After Step Installation](#after-step-installation)

## After Step Installation:
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
  - **Windows Users Only** If the step config command fails, ssh-agent probably isnt running.  See instructions above.


#### These commands will do the following:
- Gets the initial cert from the certificate authority. 
- Sets up your ssh profile to simplify future logins

These commands only need to be done once. 
The second command updates your .ssh/config file. If you already have a complicated structure in there you may wish to review it. The changes are fine for most, but particularly if you already have ceres entries in yours there could be conflicts. 
 

## SSH Access After Step Installtion:
- Each morning on your first attempt to ssh to Ceres with ```ssh user.name@ceres.scinet.usda.gov``` or Atlas with ```ssh user.name@atlas-login.hpc.msstate.edu```, (changing user.name to your own SCINet username), you will see the following screen:

![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/linpassorlogingov.png)

- Your default web browser should open automatically to the SCINet authentication page.  Choose "Login.gov or USDA LincPass" as your sign-in option.
- From there, if you have a LincPass/AltLinc,PIV Exemption, you will authenticate as usual with eAuth.

- Go back to your shell and you should see "CA: https://step-ca.scinet.usda.gov" followed by your regular login.
  
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/login-success.png)

After these steps, command line ssh works normally. You will only need to authenticate once for the day (or every 16 hours). 

## Notes and Limitations

- If you use multiple profiles in Chrome, step will open a new window in whichever profile was used last.   If you end up in the wrong one just close it, do something in your work profile and rerun the ssh login command.  
- Windows users will find most tools other than the built-in windows ssh command line tools no longer work. 
- Mac and Linux users may have a bit more luck, but anything beyond command line tools probably won’t work anymore. 
- For graphical file transfers globus is still the preferred method and will continue to work. 
- After logging in via OIDC you will not have any automatic Kerberos tickets.  You will need to kinit if you need them. 

If you have any questions or issues, please contact the VRSC at scinet_vrsc@usda.gov.
