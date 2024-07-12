---
title: Logging in to SCINet
description: How to access SCINet
order_number: 5

categories: [Access]

subnav:
  - title: Creating a Config File
    url: '#creating-a-config-file'
  - title: Step-Based Access Via SSH
    url: '#step-based-access-via-ssh---small-step-installation-instructions'
    subnav:
      - title: Installation Instructions
        url: '#installation-instructions'
      - title: After Step Installation  
        url: '#ssh-access-after-step-installtion' 
      - title: SSH Access
        url: '#usage-instructions'
      - title: Access Using Linux and LincPass
        url: '#access-using-linux-and-lincpass'
  - title:  Accessing SCINet
    url: '#accessing-scinet-after-step-is-installed'
    subnav:
      - title: Access Using LincPass  
        url: '#accessing-using-lincpass'
      - title: Accessing Using login.gov  
        url: '#accessing-using-logingov' 


---

[No account? Signup here.]({{ site.baseurl }}/about/signup){: .usa-button .usa-button-big }

All users should have received their login credentials in an email.  If you have not, please email the Virtual Research Support Core at [scinet_vrsc@USDA.GOV](mailto:scinet_vrsc@USDA.GOV?subject=account%20access).

Note that home directories on Atlas are not created right away, so it is recommended to wait a day after receiving email with the credentials before logging to Atlas cluster. 

**LincPass Users** Please contact your IT Specialist if you need help with installing Step on your USDA controlled machine. 

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

## Step-Based Access Via SSH - Small Step Installation Instructions

**Please Note:** 
If you previously manually created a ssh host key, you may need to delete it as the hosts will now have a new signed key.
Delete your .ssh/known_hosts file OR run:
`ssh-keygen -R ceres.scinet.usda.gov 
`This process will remain the same for all GUI services.
 
### Installation Instructions:

- OpenSSH needs to be installed.  This is standard on recent Windows 10 and 11, MacOS, and Linux installs. However your local admin may have removed it or restricted access to it.  Check by running "ssh" in a PowerShell or terminal window.  You should get Usage instrctions.
- ssh-agent needs to to running as a system service. **If it is not running SmallStep will NOT work. You must assure it is running before proceeding**
  - For Linux and MacOS this is probably already running so this step can be skipped.
  - For Windows this has to be enabled by an administator, it is not on by default even if openssh is installed.  To enable it an administor must:
    - Make sure you're running as an Administrator.

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

#### Step needs to be installed on your machine.
- If you are on a USDA controlled Windows laptop or workstation, you can [install **SmallStepsCLI** directly from the Software Center]({{ site.baseurl}}/guides/access/login/smallstepscli-download).
  - If Software Center fails to install SmallStepCLI, please contact your IT Specialist prior to continuing.
  - **If you are encountering errors after completing the install, see [SmallStepCLI Install Troubleshooting for LincPass Users](/guides/access/login/smallstepscli)**
 
- After installing, you may need to restart your terminal for step to be in your path.
- If you do need to perform the installation yourself, see: [https://smallstep.com/docs/step-cli/installation/](https://smallstep.com/docs/step-cli/installation/).
  - For windows we recommend the winget installer, we've had the best lusk with that. Again, please be aware that you will only be able to complete the installation yourself if you have admin rights (i.e. you will have admin rights on your home machine rather than an USDA controlled machine.)
  - For MacOS the instrcutions are more straightforward and can be done by the user without admin access. Please be aware that Homebrew will need to be installed first. There is a link to install this at the link above.
  - Linux will require root/sudo if you want to use the system packager rpm,deb,pacman. But can be done in userspace it you just download the binary directly.

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
  - If the step config command fails, ssh-agent probably isnt running.  See instructions above.


#### These commands will do the following:
- Gets the initial cert from the certificate authority. 
- Sets up your ssh profile to simplify future logins

These commands only need to be done once. 
The second command updates your .ssh/config file. If you already have a complicated structure in there you may wish to review it. The changes are fine for most, but particularly if you already have ceres entries in yours there could be conflicts. 
 
### SSH Access After Step Installtion:
- Each morning on your first attempt to ssh to Ceres with ```ssh user.name@ceres.scinet.usda.gov``` or Atlas with ```ssh user.name@atlas-login.hpc.msstate.edu```, (changing user.name to your own SCINet username), you will see the following screen:

![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/lincpassorlogingov.png)

- Your default web browser should open automatically to the SCINet authentication page.  Choose "Login.gov or USDA LincPass" as your sign-in option.
- From there, if you havea LincPass, you will authenticate as usual with eAuth. If you are using Login.gov, please follow the steps outlined [below](#accessing-using-logingov)

- Go back to your shell and you should see "CA: https://step-ca.scinet.usda.gov" followed by your regular login.
  
![screenshot of Login Screen with Legacy Selection]({{ site.baseurl }}/assets/img/guides/access/step-ssh/login-success.png)

After these steps, command line ssh works normally. The only different is that it will not prompt you for a password for the day (16 hours). 
	Note: With the below examples, you will swap user.name for your own SCINet username.

{:.copy-code}
```
ssh user.name@ceres.scinet.usda.gov 
scp file1 file2 user.name@ceres.scinet.usda.gov:~ 
```

### Access Using Linux and LincPass

Ensure that you have the following prior to continuing:
- Your card reader must work with your distro
- Your Lincpass must be detected by your distro
- The root certs installed properly for your distro which can be found [here](https://www.idmanagement.gov/implement/trust-fcpca/#step-1---obtain-and-verify-the-fcpca-root-certificate)
- The Intermediates as well can be found [here](https://www.idmanagement.gov/implement/trust-fcpca/#certificates-issued-by-the-federal-common-policy-ca)

To test that everything is functioning properly, you must log into something that requires eAuth, such as your USDA Office 365 account.

Once you have successfully authenticated using eAuth, you will need to install Step following the instructions [here](https://smallstep.com/docs/step-cli/installation/#linux-packages-amd64) 
- A current version can be found [here](https://github.com/smallstep/cli/releases/)

You will then configure Step according to our instructions above.  

Finally, you will test eAuth access to SCINet using ssh user.name@ceres.scinet.usda.gov, making sure to change “user.name” to your own SCINet username.

### Notes and Limitations

- If you use multiple profiles in Chrome, step will open a new window in whichever profile was used last.   If you end up in the wrong one just close it, do something in your work profile and rerun the ssh login command.  
- Windows users will find most tools other than the built-in windows ssh command line tools no longer work. 
- Mac and Linux users may have a bit more luck, but anything beyond command line tools probably won’t work anymore. 
- For graphical file transfers globus is still the preferred method and will continue to work. 
- After logging in via OIDC you will not have any automatic Kerberos tickets.  You will need to kinit if you need them. 

If you have any questions or issues, please contact the VRSC at scinet_vrsc@usda.gov.

## Accessing SCINet after Step is Installed

This process will be the same for all GUI based SCINet Services. Please follow the instructions below.  If you have further questions or issues, please email [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
 
### Accessing Using LincPass

If you are a LincPass holder, you will only select the option of "USDA LincPass" when logging into GUI services such as Open OnDemand, Galaxy, and the SCINet Forum. 

After selcting this, you will be automatically directed to login using your usual eAuth based login.

![]({{ site.baseurl }}/assets/img/guides/access/sign-on.png)
![]({{ site.baseurl }}/assets/img/guides/access/eAuth.png)

### Accessing Using login.gov

- When logging into a GUI based system, you will be presented with the following image 
	- You will select “Login.gov or USDA LincPass”

![]({{ site.baseurl }}/assets/img/guides/access/login.gov screenshots/login-landing.png)

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

If you need assistance with this login process, please email your questions to [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
