---
title: Accessing GUI Based Services
description: A guide to accessing services using LincPass and YubiKey
order_number: 35 

categories: [Access]

subnav:
  - title: Access Using LincPass  
    url: '#accessing-using-lincpass' 
  - title: Access Using YubiKey
    url: '#accessing-using-yubikey'
---

This process will be the same for all GUI based SCINet Services. Please follow the instructions below.  If you have further questions or issues, please email [scinet_vrsc@usda.gov](scinet_vrsc@usda.gov). <!--excerpt-->
 
## Accessing Using LincPass

If you are a LincPass holder, you will only select the option of "USDA LincPass" when logging into GUI services such as Open OnDemand, Galaxy, and the SCINet Forum. 

After selcting this, you will be automatically directed to login using your usual eAuth based login, i.e. your username and password WITHOUT using Google Authenticator. 

![]({{ site.baseurl }}/assets/img/guides/access/sign-on.png)
![]({{ site.baseurl }}/assets/img/guides/access/eAuth.png)
 
## Accessing Using YubiKey

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
