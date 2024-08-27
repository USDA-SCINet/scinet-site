---
title: Visual Studio Code
description: Using VS Code with SCINet

published: false ## remove when ready to go live

categories: [IDE]

subnav:
  - title: SCINet Options for VS Code
    url: '#scinet-options-for-vs-code'
  - title: VS Code Server in Open OnDemand
    url: '#vs-code-server-in-open-ondemand'
  - title: Registered Tunnel for VS Code
    url: '#registered-tunnel-for-vs-code'
    subnav:
      - title: Opening a Registered Tunnel
        url: '#opening-a-registered-tunnel'
      - title: Closing a Registered Tunnel
        url: '#closing-a-registered-tunnel'

---

Visual Studio Code (VS Code) is a source-code editor. <!--excerpt-->

## SCINet Options for VS Code

## VS Code Server in Open OnDemand

## Registered Tunnel for VS Code

Visual Studio Code has a registered tunnel extension that allows users to securely work on projects hosted on remote machines without SSH. The tunnel extension creates a secure and encrypted connection between your local machine and a remote machine.  

**Why use a registered tunnel for VS Code?**

*  **Easy access:** There is no need for SSH keys or network configuration to connect to development environments remotely.  
*  **Secure:** This extension protects your code/projects by using an encrypted connection and prohibits unauthorized access. 
*  **Offers flexibility:** Users can securely access their projects and work from anywhere. 

This guide will show you how to set up a registered tunnel for VSCode.  

### Opening a Registered Tunnel

1. Open your local copy of VS Code. 
2. Install the "Remote – Tunnels" extension from Microsoft using the Extensions sidebar on the left-hand side. 
3. On the left-hand side, open the "Remote Explorer" sidebar and click the arrow next to "Sign in to tunnels registered with Microsoft". 
  * To use registered tunnels, you must have either a Microsoft or Github account. Most users will want to use a Microsoft account, as their USDA Office 365 email is a Microsoft account that may be used. These instructions assume you are using your USDA email, but using a Github account will be very similar. 
  * If you are already signed into your account in VS Code, this option will not appear and you may skip this step. 
  * If you receive a prompt that "The extension 'Remote – Tunnels' wants to sign in using Microsoft" click "Allow". 
4. A webpage should open to sign into Microsoft. You can use your USDA account to sign in. 
  * When using your USDA account to sign in, you should be redirected to the USDA sign-on page to log in, if you are not already signed into your USDA account. 
5. You should receive a page telling you that you are signed in and can close your web browser. 
  * By default, VS Code will remember your sign-in information so you should only have to do the sign-in steps the first time you use remote tunnels in VS Code. 
6. Open a terminal on the ceres head node either via Ceres OnDemand or by using SSH to connect to ceres.scinet.usda.gov. 
7. At the terminal, run the following command: launch-vscode-tunnel.sh 
  * By default, this script will request two CPU cores, on the "short" partition of the cluster, for four hours. You will have 8 GB of RAM available. These settings should be sufficient for debugging and testing purposes. If you need more resources, you can request them by passing sbatch arguments to the script. However, be aware that the more resources you request, the longer it will take for the cluster to be able to allocate them for you. 
8. You should see a message to open a web browser and go to https://microsoft.com/devicelogin and enter a code. Do as instructed. 
9. After entering the code, you will be asked to either log in or select an account to register the tunnel with. Register it to your USDA account, unless you used a different account in step 4. 
10. Once it is registered, return to your local VS Code instance. 
11. Registered tunnels will show up in the Remote Explorer. It should say something similar to "ceres20-compute-55 running". 
  * If your tunnel doesn’t appear immediately, press the refresh button next to "Remotes (Tunnels/SSH)" 
12. When you hover over the tunnel, an arrow button will appear. Click this button to connect to the tunnel. 
13. You should now be running on one of the Ceres compute nodes. To confirm open a terminal from the menu Terminal->New Terminal. In the terminal, run the command: hostname 
  * The command should respond with something similar to "ceres20-compute-55". 
  * If the command returns with "ceres.scinet.usda.gov" you have connected to the wrong server and you will need to edit your settings to correct this. 
 
### Closing a Registered Tunnel  

When you are done using a tunnel, it is important to close it to free up those resources for other users to use. To do this: 
1. Open a terminal on the ceres head node either via Ceres OnDemand or by using SSH to connect to ceres.scinet.usda.gov 
2. Run the following command, where <JobID> is the slurm job number that was displayed when you launched the tunnel: scancel <JobID> 
  * If you have forgotten the slurm job number, you can find it by running the following command. Look for a job named "vscode-tunnel". 