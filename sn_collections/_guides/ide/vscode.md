---
title: Visual Studio Code
description: Using VS Code with SCINet

#published: false ## remove when ready to go live

categories: [IDE]

subnav:
  - title: SCINet Options for VS Code
    url: '#scinet-options-for-vs-code'
  - title: VS Code in Open OnDemand
    url: '#vs-code-in-open-ondemand'
    subnav:
      - title: Managing extensions
        url: '#managing-extensions'
      - title: Moving files to and from the local computer
        url: '#moving-files-to-and-from-the-local-computer'
  - title: Registered Tunnel for VS Code
    url: '#registered-tunnel-for-vs-code'
    subnav:
      - title: Opening a Registered Tunnel
        url: '#opening-a-registered-tunnel'
      - title: Closing a Registered Tunnel
        url: '#closing-a-registered-tunnel'
  - title: Troubleshooting
    url: '#troubleshooting'
---

{% include images_path %}

Microsoft's Visual Studio Code (VS Code) is a popular source-code editor and development environment with support for many different programming languages. 

There are two main ways to use VS Code on SCINet clusters. One is to use the VS Code interactive application in Open OnDemand (OOD VS Code).  The second is to use the Microsoft "Remote – Tunnels” extension that connects to the cluster from your local VS Code session via a secure tunnel, allowing you to execute your code on the cluster from within your local VS Code session (local VS Code). <!--excerpt--> 

## VS Code in Open OnDemand
(OOD VS Code)
{:.subheader}

1. Go to [Ceres Open Ondemand](http://ceres-ood.scinet.usda.gov/) and login. 
1. From the Interactive Apps menu at the top, select "VS Code Server"
   ![ood vscode interactiv app]({{ images_path }}/vscode/ood_vscode.png)
1. Select the account you would like to use to run this job, as well as any other desired options. The defaults are usually sufficient, but if you want to run from a project rather than your home directory, be sure to update your working directory path.
   Click "Launch"
   ![selecting options and path]({{ images_path }}/vscode/choose_path.png)
1. A new VS Code session will automatically be created on one of Ceres' compute nodes. This may take a few minutes depending on cluster demand. Once the session has been created, click "Connect to VS Code".
   ![launching vs code]({{ images_path }}/vscode/connect.png)

### Managing extensions

OOD VS Code stores your extensions in your home directory by default, which can cause you to exceed your storage quota.  To overcome this issue, you can move your extension directory from your home directory to a project directory and create a symbolic link to the new location.

1. Create a symbolic link to store extensions. This only needs to be done the first time you run OOD VS Code. 
   *  Open the terminal window by going to:  
      "File" -> "View" -> "Terminal"
   *  In the terminal type the following commands, replacing `<project_name>` with your project name and `<scinet_username>` with your username.
      *  Create a folder in your project directory for the VSCode extensions:    
          ```
          mkdir -p /project/<project_name>/<scinet_username>/.local/share/code-server
          ```
      *  Move any existing extension files to the new directory:
          ```
          mv ~/.local/share/code-server/ /project/<project_name>/<scinet_username>/.local/share/code-server
          ```
      *  Create a symbolic link between the old extension directory and the new one:
          ```
          ln -s /project/<project_name>/<scinet_username>/.local/share/code-server  ~/.local/share/code-server
          ```  
1. Install any desired extensions from the Extensions sidebar on the left-hand side. Once an extension is installed, it will automatically be available for future OOD VS Code sessions.
   ![installing exentions button]({{ images_path }}/vscode/extensions.png)



### Moving files to and from the local computer

1. Open the File Explorer sidebar on the left-hand side of OOD VS Code.
   ![file explorer button]({{ images_path }}/vscode/file explorer.png)
2. To download files:
   * Right-click on the file you would like to download from the cluster to your local computer and select "Download…" from the menu. The file download will automatically start.
3. To upload files:
   * Right-click on the folder where you would like to upload the file to and select "Upload…" from the menu.
   * Select the file on your local computer in the File Upload dialog that appears and then click "Open"



## Registered Tunnel for VS Code
(local VS Code)
{:subheader}

VS Code has a registered tunnel extension that allows users to securely work on projects hosted on remote machines without SSH. The tunnel extension creates a secure and encrypted connection between your local computer and a remote machine.  

**Why use a registered tunnel for VS Code?**

*  **Easy access:** There is no need for SSH keys or network configuration to connect to development environments remotely.  
*  **Secure:** This extension protects your code/projects by using an encrypted connection and prohibits unauthorized access. 
*  **Offers flexibility:** Users can securely access their projects and work from anywhere. 

This guide will show you how to set up a registered tunnel for VS Code.  

### Opening a Registered Tunnel

To use registered tunnels, you must have either a Microsoft or GitHub account. USDA employees should use a Microsoft account, as their USDA Office 365 email is a Microsoft account that may be used. 

These instructions assume you are using your USDA email, but using a GitHub account will be very similar.

#### Set up local VS Code
**(Only needed the first time)**
{:.subheader}

1. Open your local copy of VS Code. 
1. Install the "Remote – Tunnels" extension from Microsoft using the Extensions sidebar on the left-hand side. 
1. If you don’t see the Welcome Screen, open it.  
   “Help” -> “Welcome”
1. Open a tunnel:  
   “Connect to…” -> “Connect to Tunnel” -> “Microsoft Account”
1. If you receive a prompt that "The extension 'Remote – Tunnels' wants to sign in using Microsoft," click "Allow".
1. You should be prompted to log in.
   * If you are already signed into your account in VS Code, this option will not appear and you may skip this step. 
1. You should receive a page telling you that you are signed in and can close your web browser. 

#### Start a tunnel on Ceres

1. Open a terminal on the Ceres login node either via Ceres OnDemand or by using SSH to connect to ceres.scinet.usda.gov. 
1. At the terminal, run the following command, replacing `<account_name>` with the account you are using to run this job: 
   ```
   launch-vscode-tunnel.sh -A <account_name> -t 04:00:00
   ```  
   By default, this script will request two CPU cores, on the "ceres" partition of the cluster, for four hours. You will have 8 GB of RAM available. These settings should be sufficient for debugging and testing purposes. If you need more resources, you can request them by passing sbatch arguments to the script. However, be aware that the more resources you request, the longer it will take for the cluster to be able to allocate them for you. 
1. You should see a message to open a web browser and go to https://microsoft.com/devicelogin and enter a code. Do as instructed. 
1. After entering the code, you will be asked to either log in or select an account to register the tunnel with. Register it to your USDA account, unless you used a different account when setting up your local VS Code.

#### Connect to the tunnel on Ceres

1. Return to your local VS Code instance. 
1. Registered tunnels will show up in the Remote Explorer sidebar. It should say something similar to "ceres20-compute-55 running".  
   If you do not see your tunnel:
   *  You can refresh the list by pressing the refresh button next to “Remotes (Tunnels/SSH)”.
   *  If you still do not see it, open the Welcome screen and connect to the tunnel from there:  
      “Connect to…” -> “Connect to Tunnel” -> “Microsoft Account” -> “`<tunnel>` running”
1. Select your tunnel. 
1. You should now be running on one of the Ceres compute nodes. 
   *  To confirm:  
      * Open a terminal from the menu:  
        “Terminal” -> “New Terminal”
      * In the terminal, run the command: `hostname` 
      * The command should respond with something similar to "ceres20-compute-55". 
 
### Closing a Registered Tunnel  

When you are done using a tunnel, it is important to close it to free up those resources for other users to use. To do this: 
1. Open a terminal on the Ceres login node either via Ceres OnDemand or by using SSH to connect to ceres.scinet.usda.gov 
2. Run the following command, where <job_id> is the slurm job number that was displayed when you launched the tunnel: `scancel <job_id> `
   * If you have forgotten the slurm job number, you can find it by running the following command:
     ```
     squeue -u <scinet_username>
     ```
     Look for a job named "vscode-tunnel".

## Troubleshooting

**The VS Code OnDemand window stopped responding.**
  * Most likely your Open OnDemand session timed out. Return to the Ceres Open OnDemand webpage and request a new session.