---
title: Updating Your SCINet Password
description: Steps for updating your SCINet password
parent:
  title: Login
  url: /guides/access
  class: "guide-nav"
---

{% include images_path %}




[A video demonstration for changing your password can be found here.](https://www.youtube.com/watch?v=Amhw2k5mftI)  Please keep in mind that due to the recent password requirement change, the video is out of date. It will list more password requirements than necessary.  The current requirements are found below:
* AT LEAST 14 characters long
* Your last 24 passwords cannot be reused.


## The following is the simplest method to update your SCINet password IF you have a LincPass:
[Watch a video demonstration of channging your password using LincPass and OOD here](https://youtu.be/tx3sQX7rl70)

1.	Go to [https://ceres-ood.scinet.usda.gov](https://ceres-ood.scinet.usda.gov) 
1.	Select “USDA LincPass” button on the authentication screen. Use no other option. 
1.	Authenticate via eAuth 
    1. Select "USDA Employee/Contractor", if prompted 
    1. Select "PIV/CAC" 
    1. If prompted via a popup window, select your certificate and click OK 
    1. Enter your PIN, if prompted 
1.	At the top of the page, select "Clusters”->“Ceres Shell Access” to open a terminal window. 
1.	If prompted to provide "Password:", enter the temporary password from the "Welcome to SCINet" email. We recommend using copy-paste. Please follow these suggestions: 
    1. Copy the password from your "Welcome to SCINet" email to a Notepad document. 
    1. Now copy the password FROM the Notepad document. Many Microsoft applications automatically add a space when you copy, which is a problem for passwords. 
    1. You should be able to use Ctrl-V to paste but note no characters will appear. Press enter to commit the password. 
1.	If entered correctly, you should receive notice "Password expired. Change your password now" and you are prompted to provide "Current Password"m, which is the temporary password from the "Welcome to SCINet" email. You should be able to use Ctrl-V to paste. Again, no characters will appear. Press enter to commit the password. 
1.	If entered properly, you will then be prompted to provide a "New Password" which needs to have 14+ characters. After a successful password change, there may be additional messages and finally a system prompt. This changes your SCINet password to all SCINet resources, but it may take a little time to synchronize.  

**NOTE:** If the password update process does not start automatically, start it manually by typing "passwd" and follow above instructions as appropriate. 
