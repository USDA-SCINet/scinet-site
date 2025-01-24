---
title: "Accessing SCINet without a LincPass"
description: Steps for accessing SCINet resources using Login.gov
excerpt: In situations where SCINet users do not have a LincPass, they may use Windows Hellow for Business (WHfB), obtain a PIV Exemption, or use Login.gov.
parents:
  - title: Access
    url: /guides/access
    class: "guide-nav"
  - title: Login Assistance
    url: /guides/access/login
    class: "emph-nav"

# alerts:
#   - alert:
#     type: warning
#     text: "Please note: The infomation on this page does not apply to sponsored, non-USDA SCINet users who use Login.gov to access SCINet.  Those users should see our <a href='/guides/access/login/logingov'>guide to logging in with Login.gov</a>."  

subnav:
  - title: Non-USDA users - Login.gov
    url: "#non-usda-users---logingov"
  - title: USDA users without a LincPass
    url: "#usda-users-without-a-lincpass"

fetched: "login-help"
order_number: 20
---

{% include images_path %}

In situations where SCINet users do not have a LincPass, they may use an alternative authentication option for accessing SCINet.

## Non-USDA users - Login.gov

Sponsored, non-USDA SCINet users will use Login.gov to log on to SCINet systems.

- When logging in to SCINet systems, you will be presented with the SCINet login page
- If prompted, select “Customer”  
  ![]({{ images_path }}/login.gov screenshots/selecting-customer.png)

- Select “Login.gov”
  ![]({{ images_path }}/login.gov screenshots/login.gov-landing.png)

- This will redirect you to Login.gov for you to sign in. If you already have an existing Login.gov account, there is no need for you to create a new one. You can simply sign in with your existing Login.gov account, though ensure that the same email address used for your SCINet account is included in the Login.gov account.
  ![]({{ images_path }}/login.gov screenshots/signin-existing-account.png)

- If you need to create an account, toggle from “Sign In” to “Create an account”:
  ![]({{ images_path }}/login.gov screenshots/signin-create-account.png)

  - Once you fill out the required information, you will be sent an email to confirm your account.  Confirming your email will redirect you back to Login.gov for you to set up a password and second authentication method. 
  - More information on account set up can be found [here](https://www.login.gov/help/get-started/create-your-account/).
  - Once you have completed the account setup, you will need to select “Continue without linking to an existing eAuth account” to move forward.  
    ![]({{ images_path }}/login.gov screenshots/link-login.gov.png)

- Once you have successfully authenticated with Login.gov, you should be redirected to the web-based interface you are attempting to accesss (e.g., Open OnDemand) or, if you are authenticating via SSH, you should see a similar image to the successful logins for LincPass: 
  ![]({{ images_path }}/login.gov screenshots/login-success.png)

If you need assistance with this login process, please email your questions to [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 



## USDA users without a LincPass

In situations where SCINet users do not have a LincPass, they may use Windows Hello for Business (WHfB) as an alternative to LincPass when accessing SCINet, or they may obtain a PIV Exemption.

- **Windows Hello for Business** - SCINet users who have already enrolled in WHfB may select the eAuth "USDA Work Account" option to login to SCINet.
- **24 Hour LincPass Expemption** - SCINet users who do not have a LincPass and cannot use WHfB may [submit a LincPass Exemption Request](https://apps.gov.powerapps.us/play/e/default-ed5b36e7-01ee-4ebc-867e-e03cfa0d4697/a/6d0116a5-68ab-4c9f-a0ad-ab9717e33fb3?tenantId=ed5b36e7-01ee-4ebc-867e-e03cfa0d4697&hint=b883037a-e068-41e9-92c8-0f6b39f79ecc&sourcetime=1721411867694#).  Once the LincPass Exemption Request has been processed, they may login to SCINet by selecting the eAuth PIV Exemption option.

**For more information, see:**
* [New Personal Identity Verification (PIV) Exemption Process](https://usdagcc.sharepoint.com/sites/ICAM/SitePages/New-Personal-Identity-Verification-(PIV)-Exemption-Process.aspx?csf=1&web=1&e=pOXGxG&clickparams=eyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTgxMjkuMjAyMDAiLCAiT1MiIDogIldpbmRvd3MiIH0%3d&CID=5ec37aa1-7029-7000-cc8c-657eaf09d218&cidOR=SPO)
* [Rollout of Windows Hello for Buisness Login Option](https://usdagcc.sharepoint.com/sites/ARS-AFM/AFMCommunications_2024/Forms/AllItems.aspx?id=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024%2F2024%2D04%2D25%20ITSD%20Bluey%20Communication%5F%20%20Rollout%20of%20Windows%20Hello%20for%20Business%20Login%20Option%2Epdf&parent=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024)
* [Setup Windows Hello PIN](https://usdagcc.sharepoint.com/sites/ARS-AFM/AFMCommunications_2024/Forms/AllItems.aspx?id=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024%2FSetup%5FWindows%5FHello%5FPIN%5F508%2Epdf&parent=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024)
* [WHfB PIN creation without PIV (ARS Field)](https://usdagcc.sharepoint.com/sites/ARS-AFM/AFMCommunications_2024/Forms/AllItems.aspx?id=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024%2FSetup%5FWindows%5FHello%5FPIN%5F508%2Epdf&parent=%2Fsites%2FARS%2DAFM%2FAFMCommunications%5F2024)
  * These instructions requre the assistance of Location IT Support

![]({{ images_path }}/eAuth_login.PNG)

If you need assistance with this login process, please email your questions to [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). 
