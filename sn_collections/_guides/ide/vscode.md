---
title: Visual Studio Code
description: Using VS Code with SCINet

#published: false ## remove when ready to go live

categories: [IDE]

subnav:
  - title: SCINet Options for VS Code
    url: '#scinet-options-for-vs-code'
  - title: VS Code Server in Open OnDemand
    url: '#vs-code-server-in-open-ondemand'
    subnav:
      - title: Moving Files to and from the Local Machine
        url: '#moving-files-to-and-from-the-local-machine'
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



Visual Studio Code (VS Code) is a source-code editor. <!--excerpt-->

## SCINet Options for VS Code

Microsoft's Visual Studio Code (aka VS Code) is a popular source code editor and development environment with support for many different programming languages.  VS Code software includes a tool called VS Code Server that acts as a gateway from the VS Code session on your computer to the cluster so you execute your code on the cluster from within your VS Code session.

## VS Code Server in Open OnDemand

1. Go to [Ceres OpenOndemand](http://ceres-ood.scinet.usda.gov/) and login. 

2. From the Interactive Apps menu at the top select "VS Code Server"
  ![ood vscode interactiv app]({{ images_path }}/vscode/ood_vscode.png)

3. Select the interactive partition, as well as any other desired options (the defaults are usually sufficient, but if you want to run from a project rather than your home directory, be sure to update your path) and click "Launch"
  ![selecting options and path]({{ images_path }}/vscode/choose_path.png)

4. A new VS Code session will automatically be created on one of the Nova compute nodes. This may take a few minutes depending on cluster demand. Once the session has been created, click "Connect to VS Code".
  ![launching vs code]({{ images_path }}/vscode/connect.png)

5. Create a symbolic link to store extensions. This only needs to be done the first time you run VS Code OnDemand. 
  * Open the terminal window by going to File->View->Terminal
	
  * In the terminal type the following commands, replacing <GroupName> with your group name and <UserName> with your user name.

  * Create a folder in work for the VSCode extensions:
    
      ```
mkdir -p /project/projectname/username/.local/share/code-server
      ```
  
  * Move any existing extension files to the new directory:

      ```
mv ~/.local/share/code-server/ /project/projectname/username/.local/share/code-server

      ```
  
  * Create a symbolic link between the old extensions directory and the new one:
    
      ```
ln -s /project/projectname/username/.local/share/code-server  ~/.local/share/code-server
      ```
6. Install any desired extensions from the Extensions sidebar on the left-hand side. This only needs to be done the first time you run VS Code OnDemand, or whenever you need new extensions.
  ![installing exentions button]({{ images_path }}/vscode/extensions.png)



### Moving Files to and from the Local Machine

1. Open the File Explorer sidebar on the left-hand side of VS Code.
2. To Download Files:
  * Right-click on the file you would like to download from VS Code OnDemand to your local computer and select "Download…" from the menu. The file download will automatically start.
3. To Upload Files:
  * Right-click on the folder where you would like to upload the file to and select "Upload…" from the menu.
  * Select the file on your local computer in the File Upload dialog that appears and then click "Open"

![file explorer button]({{ images_path }}/vscode/file explorer.png)





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

## Troubleshooting

**The VS Code OnDemand Window Stopped Responding.**
  * Most likely your OnDemand session timed out. Return to the Ceres OnDemand webpage and request a new session.
  * If your session hasn’t timed out, the server may be time slicing (i.e. pausing your session to let other small jobs through). To prevent this, make sure you request the interactive partition when creating your OnDemand session.
