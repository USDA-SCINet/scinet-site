---
title: SmallStepsCLI Logon Troubleshooting
description: Troubleshooting steps for SSH logon to SCINet
parent:
  title: Login
  url: /guides/access
  class: "guide-nav"

subnav: 
  - title: Bad owner or permissions error
    url: '#bad-owner-or-permissions-error'
---

{% include images_path %}




The resolutions on this page assume you have already completed the [Small Step for SSH setup instructions](/guides/access/ssh-login).

## Bad owner or permissions
If you are getting a “Bad owner or permissions” error (double \\ in path), the permissions on the .ssh/ and .step directories are too permissive and allowing Full Access to SYSTEM, Administrators, and others. This is not a problem on an account that has never used ssh on the affected computer.
!['Screenshot of "Bad owner or permissions on C:\\Users\\First.Last/.ssh/config"']({{ images_path }}/step-ssh/bad-owner-permissions-error.png)

### Resolution 

**Change permissions on the .ssh and .step folders in the user profile:**  
“C:\Users\first.last\.ssh” and “C:\Users\first.last\.step”.  
On each folder disable inheritance, remove any additional users, and restrict access to just the owner. Each folder needs to be set for READ+WRITE permissions for only the owner.

{:.font-mono-3xs}
This website provided the following steps: [https://windowsreport.com/bad-owner-or-permissions-on-ssh-config/](https://windowsreport.com/bad-owner-or-permissions-on-ssh-config/)

1.	Right-click the **.ssh** folder and click **Properties** *(repeat 1-12 for .step)*.
1.	Find and click the **Security** tab and then click **Advanced**. 
1.	Click **Disable Inheritance** in the Advanced Security Settings window. 
1.	A warning popup will appear. Click **Remove all inherited permissions from this object**.
1.	Back in the Advanced window, note that all users have been removed. 
1.	Click the **Add** button.
1.	Next, click **Select a principal** to bring up the "Select Users or Groups" window. 

1.	Type first.last and click **Check Names** to verify.
 
1.	Click **OK** to Add user’s name.  
1.	In the Permission Entry window, make sure these Basic Permissions are checked:   Read & Execute, List folder contents, Read, Write.
1.	 Click **OK** to close Permission Entry window.
1.	 Click **OK** to close the Advanced Security Settings for .ssh window.
1.	If you have not restarted the device since installing SmallStepCLI, do it now. Otherwise, Windows will not recognize the step program as “safe” in the path environment (path is added during SmallStepCLI install).
1.	In PowerShell, run:
```
step ca bootstrap --ca-url https://step-ca.scinet.usda.gov --fingerprint adb703fd18f176937743b20228d52af7a705d63a0471cd67428660be5fd006bf
```
  * NOTE: This command creates the .step folder – if you are just now running it, repeat steps 1-12 to correct the permissions on the new .step folder and all its subdirectories and files.
1.	In PowerShell, run 
```
step ssh config --set Provisioner=keycloak --set User=first.last
```
1.	In powershell, ssh to Ceres or Atlas to verify problem is corrected.
```
ssh first.last@ceres.scinet.usda.gov    or     ssh first.last@atlas-login.hpc.msstate.edu
```
  * Expected behavior:
  This will open browser for the eAuth logon procedure (like AgLearn, WebTA, etc)


