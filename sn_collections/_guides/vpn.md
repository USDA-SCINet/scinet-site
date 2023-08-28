---
title: SCINet VPN
description: Guide to the SCINet VPN
order_number: 20
categories: [Access]
# author: David Orman

subnav:
  - title: AnyConnect VPN
    url: '#anyconnect-vpn'
  - title: OpenConnect VPN
    url: '#openconnect-vpn'

summarybox:
  header: Guide to the SCINet VPN
  text: 'SCINet provides a VPN to access resouces that require a direct connection or a graphical interface and cannot be made public. <br>  Software is usually required to access the VPN.  We recommend Cisco AnyConnect if that is availbible, and OpenConnect if it is not.'
  list:
    - point: You need to setup two factor authentication before using SCINet VPN. <a href="legacy-login#multifactor-authentication">Follow the instructions here.</a>
    - point: The address for SCINet VPN is now <b>ocvpn.scinet.usda.gov</b>

---

**The SCINet VPN will no longer be offered as a service.**  
If you have been using the SCINet VPN, please explore OOD for your use cases.  [Open OnDemand](/guides/software/open-ondemand) allows for full access to a Linux desktop, all SCINet apps, and cluster controls. 

If you do believe the SCINet VPN is essential to your work, please contact [scinet_vrsc@usda.gov](mailto:scinet_vrsc@usda.gov) ASAP so we can help find a solution for you and your critical work isn’t delayed.
 
Note this is not about the USDA/ARS VPN, just that the SCINet VPN is being shut down.
<!--excerpt-->



## AnyConnect VPN

The SCINet OpenConnect VPN server is compatible with the Cisco Anyconnect client if you already have that installed. We have tested this with OSX, Windows, Linux, and Android. Use of the SCINet VPN does require 2 factor authentication. If you have not set that up yet please read [these instructions]({{ base.url }}/guides/access/legacy-login#multifactor-authentication) and do so before continuing.

First open AnyConnect and enter **ocvpn.scinet.usda.gov** in the box and click \[Connect\]

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn1.png)

Enter your SCINet Username.

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn2.png)

Enter your password with your GA 6-digit code appended to the end. For example if your password is "qwerty" and your GA app is showing "456321" you would enter:

```
qwerty456321
```

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn3.png)

You should now get the welcome banner. This may change over time from what is shown here. 
Click \[Accept\]

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn4.png)

You are now connected to the SCINet VPN.

On OSX this shows up on the status bar (typically at the top of your screen) like this:

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn5.png)

In Windows the notifications will appear in the tray (typically at the bottom of your screen) and looks like this:

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn6.png)

In linux there is no notification icon but you should see this window.

![]({{ site.baseurl }}/assets/img/guides/access/vpn/anyconnectvpn7.png)


---
## OpenConnect VPN

These instructions are for the open source OpenConnect clients from: [http://www.infradead.org/openconnect/](http://www.infradead.org/openconnect/)

These instructions are for the GUI versions of the installers. There are command line versions available as well, but those are not covered here.

### Installation for Windows

Download the OpenConnect Windows Client from here:
[https://github.com/openconnect/openconnect-gui/releases](https://github.com/openconnect/openconnect-gui/releases)

### Installation for Unix
Download and installation instructions for assorted UNIX variants are here:
[http://www.infradead.org/openconnect/packages.html](http://www.infradead.org/openconnect/packages.html)

### Installation for OSX

The OpenConnect GUI client for OSX is available via [MacPorts](https://www.macports.org/). Please follow the links on that site to install MacPorts (This involves installing and configuring Xcode for command line support from the apps store as well) . After you have MacPorts working on your system you need to run:

```
sudo port install openconnect-gui
```

This will take a few minutes.

### Configuring and running on Windows

Open the client and click the "Edit connection details" button as shown below.

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn1.png)

for Gateway enter:


```https://ocvpn.scinet.usda.gov
```

and click [Save & Connect]

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn2.png)

Enter your SCINet Username

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn3.png)

Enter your password with your GA 6-digit code appended to the end. For example if your password is "qwerty" and your GA app is showing "456321" you would enter:

```
qwerty456321
```

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn4.png)

The "Green Lock" indicates that you should now be connected.

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn5.png)

You can also see the connection status in the system tray 

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn6.png)

### Configuring and running on OSX

After installation openconnect-gui will appear on your Applications menu under "MacPorts". 

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn7.png)

However ***this will not work*** as the the VPN need to run with elevated privileges.

To run open a terminal and use:

```
sudo /Applications/MacPorts/openconnect-gui.app/Contents/MacOS/openconnect-gui
```

After opening the client enter **ocvpn.scinet.science** and click \[Connect\]

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn8.png)

Enter your SCINet username.

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn9.png)

Enter your password with your GA 6-digit code appended to the end. For example if your password is "qwerty" and your GA app is showing "456321" you would enter:

```
qwerty456321
```

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn10.png)

If you have a "Green Light" You should now be connected.  

![]({{ site.baseurl }}/assets/img/guides/access/vpn/openconnectvpn11.png)



