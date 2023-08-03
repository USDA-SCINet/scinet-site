---
title: Jupyter Server
description: Using Jupyter

categories: [Analysis]

subnav:
  - title: SCINet Options for Jupyter
    url: '#scinet-options-for-jupyter'
  - title: Jupyter Server in Open OnDemand
    url: '#jupyter-server-in-open-ondemand'
  - title: Interface of JupyterLab vs Jupyter Notebook
    url: '#interface-of-jupyterlab-vs-jupyter-notebook'
    subnav:
      - title: Jupyter Notebook
        url: '#jupyter-notebook'
      - title: Jupyter Lab
        url: '#jupyter-lab'
  - title: Overview of the JupyterLab applications
    url: '#overview-of-the-jupyterlab-applications'
    subnav:
      - title: Console
        url: '#console'
      - title: Notebook
        url: '#notebook'
      - title: Files and Scripts
        url: '#files-and-scripts'
      - title: Terminal
        url: '#terminal'
  - title: A few Ceres-specific notes
    url: '#a-few-ceres-specific-notes'
    subnav:
      - title: Default working directory
        url: '#default-working-directory'
      - title: Data access
        url: '#data-access'
      - title: Python Package installation
        url: '#python-package-installation'
      - title: Conda package and environment manager
        url: '#conda-package-and-environment-manager'
      - title: Stopping Jupyter Server
        url: '#stopping-jupyter-server'

---


[Jupyter](https://jupyter.org/) is an Integrated Development Environment (IDE) that provides an interactive and collaborative environment for scientific computing. This **interactive coding environment** allows for immediate execution and visualization of code, facilitating on-the-fly data analysis and visualization. It supports over 40 programming languages (including ***Python***, *R*, *Julia*, *Java*, and *Scala*) and seamlessly integrates with popular data science libraries. Its **collaborative work environment** simplifies sharing of results and workflows, and integrates well with version control systems like Git. With its extensibility and modularity, users can customize their workspace to fit specific needs. Finally, it offers rich text and Markdown support (for user-friendly project description and code documentation) and provides a suite of integrated tools (e.g., file browser or debugger), making it an **all-in-one platform for data science projects**.

The [Jupyter Project](https://jupyter.org) offers a suite of open-source software tools, including:
* [Jupyter Notebook](https://jupyter.org) for creating and sharing documents that contain live code, equations, and visualizations,
* [JupyterHub](https://jupyter.org/hub) for providing multi-user access to notebooks, and
* [JupyterLab](https://jupyter.org), a highly flexible and interactive web-based interface, which integrates notebooks, text editors, terminals, and custom components in a single unified environment.

Both **JupyterLab** and **JupyterNotebook** tools are currently in active use on SCINet infrastructure, including Ceres and Atlas clusters.

## SCINet Options for Jupyter

Jupyter operates as a client/server application. When you run Jupyter, the application starts a server that serves the Jupyter application to your web browser.
- The `server` part of the application runs your Python (or other language) code, manages your notebooks (files), and serves the Jupyter application to your browser. You can launch the Jupyter server on a high-performance computing cluster (Ceres or Atlas) via Open OnDemand service (online, no-installation) or on your own computing machine as a local (offline, requires Jupyter installation) server.
- The `client` part of the application *(regardless of how it was started)* runs in web browser on your local machine and handles the interactive user interface (GUI) of Jupyter. This is where you will perform all your tasks.

**SCINet users can use Jupyter in one of the following ways:**

1. To run JupyterLab and access data on your local workstation, [install the open source JupyterLab tool](https://jupyter.org/install).
  * Once installed, open the Terminal or Command Prompt window on your local workstation and execute the command:
  ```
  jupyter lab
  ```
  <i>This will automatically open JupyterLab interface in your default web browser.</i> <br> Manually you can also open it using the URL address: `http://localhost:8888/lab`


2. To run JupyterLab on and access data in Amazon Web Services, contact the SCINet VRSC.

3. **NEW**: Jupyter Server on Ceres in Open OnDemand *(online, no-installation)*.

**NOTE:** *Jupyter on Ceres through SCINet VPN or via ssh-tunnel is not possible, because Jupyter's interface is designed to work in a web browser.*


## Jupyter Server in Open OnDemand

In your browser go to [https://ceres-ood.scinet.usda.gov/](https://ceres-ood.scinet.usda.gov/), enter your SCINet credentials: `Username` and SCINet `Password`, followed by preferred multi-factor authentication ([MFA Guide]({{ site.baseurl }}/guides/access/mfa/)).

![screenshot of signing into Ceres OOD in a web browser]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/loginOOD.png)

After logging into Open OnDemand, click on **"Interactive Apps"** in the menu on the top and select **"Jupyter"** from the dropdown.

![screenshot of OOD interface with interactive apps]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/interactive_apps.png)

This will redirect you automatically to the Jupyter Session setup page.

![screenshot of setting up Jupyter session]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/setup_Jupyter.png)

Modify default values if needed. Specifically, make sure:
* that your selected `Account` is correct
* to adjust time needed (`Number of hours`) for your work in Jupyter interface
* to choose the right tool for your task (typically `Lab` is preferred over `Notebook` as it provides built-in file browser)
* to specify the `Working Directory` path, which is your $HOME by default, but you may want to work in the `/project/<your-group>` space instead.

![screenshot of setting up working directory]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/setup_workdir.png)

Once you are done with the settings, click on the blue **"Launch"** button at the bottom of the page. *It may take up to several minutes for the new session to start.*

<i>Note that once you click on the <b>"Launch"</b> button and a new session starts, requested resources will be allocated to your job and won't be available to other users even if you don't run anything in the Jupyter. Please be considerate, request only resources that you need for your tasks and remember to delete the session when done.</i>

Once it starts a new button **"Connect to Jupyter"** will appear. Clicking on the button will open Jupyter IDE in a new browser tab, with the `Python Console` opened by default.

![screenshot of launching the Jupyter interface]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/launchJupyter.png)

When done using Jupyter, return to the previous tab to stop the Jupyter session by clicking on the red **"Delete"** button.

![screenshot of deleting session]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/delete_session.png)

*Note that while the Jupyter session is running you can connect and disconnect to/from the Jupyter Server multiple times. Every click on the **"Connect to Jupyter"** button will open a new browser tab.*


For tips and tricks refer to the [following section](#jupyter-lab-interface) and to the Jupyter Tutorials in the [DataScience Workbook](https://datascience.101workbook.org):
* [Jupyter: Interactive Web-Based Multi-Kernel DE](https://datascience.101workbook.org/04-DevelopmentEnvironment/01B-jupyter-basics)
* [Getting Started with JupyterLab on a local machine](https://datascience.101workbook.org/04-DevelopmentEnvironment/01B-tutorial-jupyter-lab)
* [Getting Started with Jupyter Notebook on HPC systems](https://datascience.101workbook.org/04-DevelopmentEnvironment/01B-tutorial-jupyter-notebook)
* [Jupyter Lab: create an interactive Python notebook](https://datascience.101workbook.org/04-DevelopmentEnvironment/02D-python-jupyter-notebook)


## Interface of JupyterLab vs Jupyter Notebook

Jupyter offers two user interface options for creating and managing documents `Jupyter Notebook` and `JupyterLab`. Within the Open OnDemand (OOD) interface, under the Interactive Apps section, you have the option to set up a Jupyter session with the choice of either Jupyter Notebook or JupyterLab. *You have separate Server options for them on Atlas, and on Ceres, you select one when setting up the Session parameters.*

### Jupyter Notebook

**Jupyter Notebook** is the original interface which provides an environment for interactive computing. You can create and share documents that contain live code, equations, visualizations, and narrative text. It is **best used for simple tasks and for learning** purposes as its interface is less complex and easier to understand.

![screenshot of Jupyter Notebook interface]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/Jupyter_notebook.png)

Jupyter Notebook initiates with a File Browser view, allowing you to navigate directories, and create or upload folders, text files, and Python or R notebook documents. Additionally, it provides the Terminal app for direct command line access to the file system, all within the Jupyter interface and accessible through separate browser tabs.

![screenshot of Terminal app in Jupyter Notebook]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/terminal_app.png)

<i>In the Jupyter Notebook interface, in the</i> `Files` <i>tab (top-left corner), click</i> `New` <i>button (top-right corner) and select the type of the app to be launched in a separate tab in your web browser (e.g., Python or R notebook, text file or Terminal).</i>

### Jupyter Lab

**JupyterLab** is the next-generation user interface for Project Jupyter. It offers all the familiar building blocks of the classic Jupyter Notebook (notebook, terminal, text editor, Python console, file browser, rich outputs, etc.) in a flexible and powerful user interface. A graphical File Manager (foldable, on the left) allows file upload/download from Ceres via web browser.

![screenshot of Jupyter Lab interface]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/lab_launcher.png)

In JupyterLab, if the **Launcher** tab is not currently visible, you can easily open a new one by navigating to the **"File"** menu at the top of the JupyterLab interface, then selecting **"New Launcher"**. This will open a new Launcher tab where you can start different types of sessions like notebooks, consoles, terminals, or other applications by clicking on them. Each application opens in a new tab within the JupyterLab working panel, adjacent to the foldable File Browser, providing a multi-tasking environment all within a single browser tab *(e.g., Python notebook app)*.

![screenshot of Jupyter Lab interface]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/lab_notebook.png)

JupyterLab also provides additional features not found in Jupyter Notebook, such as:
* Drag-and-drop cells within and between notebooks
* Enhanced file management (browse directories, open multiple files, etc.)
* A more modern and polished user interface
* Integrated markdown rendering
* Multiple views of a single document
* Ability to arrange multiple notebooks, text files, terminals, output areas, all in separate panels of a single layout (in the same window)

This makes JupyterLab better suited for more complex tasks, larger projects, or when you want to work with several notebooks and documents at the same time.


## Overview of the JupyterLab applications

Each application in JupyterLab has its own use case, and they can all be used in combination to provide a comprehensive environment for Python programming, data analysis, and scientific computing.  JupyterLab offers `Console`, `Notebook`, and `Script File` applications for both Python and R, two of the most widely used programming languages, providing a versatile environment for data analysis and research.

Python and R applications in JupyterLab are essentially the same in terms of their user interface and functionality, but they are designed to work with different programming languages, Python and R respectively. The differences arise from the capabilities and features of the two languages themselves.

| SIMILARITIES | DIFFERENCES |
|--------------|-------------|
|**Interface & Usage** <br> Both Python and R versions of the Console, Notebook, and Script File in JupyterLab offer similar functionalities and user interface. They are both designed to create and run code, inspect variables, and visualize data.|**Scope of applications** <br> Python has a broader user base in software development, machine learning, efficient computing and visualization, while R is more common in academic and research settings, especially in fields like statistics and data analysis.|
|**Interactivity** <br> Both Python and R Consoles allow executing commands interactively and provide immediate feedback, making them great for testing and debugging. |**Packages and Libraries** <br> Python has strong libraries for machine learning and general-purpose programming (like TensorFlow, PyTorch, NumPy, and Pandas), while R is favored for statistical analysis with a wealth of packages such as ggplot2, dplyr, shiny, and more.|
|**Notebooks** <br> Both Python and R Notebooks combine executable code blocks with markdown commentary, making them ideal for data exploration, analysis, and visualization, as well as for creating shareable reports. |**Data Analysis** <br> While both languages are robust for data analysis, R was designed with statisticians in mind and has many built-in functions for data analysis. Python is also a powerful tool for data analysis with the help of libraries like Pandas and NumPy.|
|**Script Files** <br> Both Python and R Script files are used for creating and saving scripts that can be executed in the terminal, console, or through a scheduler for batch jobs. |**Language Syntax & Structure** <br> Python syntax prioritizes simplicity and readability, while R syntax is varied and flexible, especially for statistical functions.|

Note: If you want to deepen your knowledge of Python programming or coding in R, be sure to visit the [DataScience Workbook](https://datascience.101workbook.org/sitemap.html). There you'll find numerous practical tutorials with examples and tips specifically tailored for SCINet Users, offering a valuable resource to enhance your coding skills.

### Console

The Console in JupyterLab is an interactive environment where you can input and execute individual lines of code, ideal for quick testing, debugging, and exploratory work. The primary differences between Python Console and R Console arise from the inherent characteristics and capabilities of the two languages.

![screenshot of Jupyter console apps]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/jupyter_console_apps.png)

#### *Python Console*

Python Console provides an interactive shell where you can execute Python commands one by one and see the output immediately. It's great for quick experimentation and testing of Python code snippets.

![screenshot of Jupyter Python console]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/python_console.png)

The Python Console in JupyterLab consists of an input field for typing Python commands (`command prompt`), and an `output area` that displays the results, providing an interactive environment for executing and testing Python code line-by-line. In the Python console of JupyterLab, you execute commands by pressing `Shift + Enter` on your keyboard.

*For example, to check the Python version in use, execute the command:*
```
import sys
print(sys.version)
```

#### *R Console*

R Console is an interactive shell where you can execute R commands one by one and see the output immediately. It's ideal for quickly testing R code snippets, data exploration, and running statistical analyses.

The R Console in JupyterLab consists of an input field for typing R commands (`command prompt`), and an `output area` that displays the results, providing an interactive environment for executing and testing R code. In the R console of JupyterLab, you execute commands by pressing `Shift + Enter` on your keyboard.

![screenshot of Jupyter R console]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/r_console.png)

*For example, to check the version of R in an R console, you can use the following command:*
```
version
```
*When you execute this command, it will print out information about the version of R that you are currently using, along with other details like the system it's built for and the date of the build.*

### Notebook

The Notebook in JupyterLab is a versatile tool that combines live code, equations, visualizations, and narrative text, facilitating iterative and exploratory data analysis, modeling, and the creation of reproducible reports.

![screenshot of Jupyter notebook apps]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/jupyter_notebook_apps.png)


![screenshot of renaming notebook opts]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/rename_notebook.png)

#### *Python Notebook*

Python Notebook is an interactive document that combines live Python code, equations, visualizations, and text rendered in Markdown. Notebooks are perfect for data analysis, statistical modeling, machine learning, and creating a shareable document of your work.

Here's a simple step-by-step example of using a Python Notebook in JupyterLab:

**1. Markdown Cell Rendering**

* Create a new cell and change its type to `Markdown` using the dropdown menu at the top of the notebook.
* Type some text in markdown format: *e.g.*, `# This is an example Python Notebook`
* Press `Shift + Enter` to render the markdown text into a formatted view.

![screenshot of rendering markdown cell]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/markdown_cell.png)

**2. Python Code**

* Create another new cell, ensuring it's set to `Code` in the dropdown menu.
* Type in some Python code: *e.g.*,
```
# create a list of numbers
numbers = [1, 2, 3, 4, 5]
# calculate the square of each number and print it
for number in numbers:
    print(f'The square of {number} is {number ** 2}.')
```
* Press `Shift + Enter` to execute the code. *Note that lines marked with # are comments in Python, and are not executed.*

![screenshot of executing code cell]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/code_cell.png)

**3. Visual Output**

In a Python notebook, you can readily display visual outputs, including image previews and generated graphs, all within the same environment. This ability to interleave code with its outputs, including visuals, facilitates a more intuitive and interactive approach to data analysis.

**Image Preview** <br>
For image previews, Python notebook can handle it directly with modules included in the standard library. You can use the `IPython.display.Image` module to display images right away in your notebook.
* For example, use the following code snippet to read an image file from your file system on Ceres and display it in the Jupyter notebook:
```
from IPython.display import Image
# Let's display an image
Image(filename="path_to/your_image_file.jpg")
```
![screenshot of image preview in Python notebook]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/image_preview.png)

**Finding the correct path of an image or any other file is crucial when you're working with file operations in a programming environment.** *To find the correct path of an image or any file in JupyterLab, you can either right-click on the file in the File Browser and select 'Copy Path', or use the Terminal app to navigate to the file and copy its full path from the command line.*

**Generate Graphs and Plots** <br>
To generate graphs, charts, or any other complex visualizations from your data in Python Notebook, you'll need to use external Python libraries like `matplotlib`, `seaborn`, or `plotly`. These libraries are not part of the Python standard library, so you'll need to install them before you can use them in your notebook. Before installing these libraries, it's a good practice to **set up a virtual environment using a tool like Conda**.
* Navigate to section [Conda package and environment manager](#conda-package-and-environment-manager) to learn how to create the Conda environment and install the Python graphing libraries.
* Once you completed the steps required for setting up a new Conda environment:
  * **Select the new kernel in your Python notebook:** *Open or create a new notebook, click on the `Kernel` menu, then `Change kernel`, and finally select your new environment from the list.*

* Use the following Python code snippet to create a simple graph using `matplotlib` library:
```
import matplotlib.pyplot as plt
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]
plt.plot(x, y)
```

![screenshot of example Python graphing]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/python_graphing.png)


#### *R Notebook*

An R Notebook is an interactive document that combines live R code with narrative text, images, and visualizations. This is especially useful for data analysis, statistical modeling, creating reproducible research documents, and sharing your work.


### Files and scripts

JupyterLab supports different types of files: `Script Files` are text files for writing executable scripts, `Markdown Files` allow for creating text documents with simple formatting syntax, and `Raw Text Files` are plain text files used for writing notes or storing text-like data.

![screenshot of Jupyter other apps]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/jupyter_other_apps.png)


#### *Python Script File*

Python Script File is a text file where you can write a Python script and save it with a `.py` extension. You can run this script in a Python console or terminal. This is useful for more extensive coding projects that go beyond the exploratory phase.

Here's a simple Python script that demonstrates Python's syntax, data structures, and standard library functions like `sum`, `min`, and `max`. The script defines a function that takes a list of integers and returns a dictionary containing the sum, average, minimum, and maximum of the numbers.

`python_script.py` :
```
def summarize_numbers(numbers):
    if not numbers:                     # Check if the input is not empty
        return "Input list is empty."

    total = sum(numbers)                # Calculate the sum of the numbers
    average = total / len(numbers)      # Calculate the average of the numbers
    minimum = min(numbers)              # Find the minimum numbers
    maximum = max(numbers)              # Find the maximum numbers

    # Return a dictionary with the results
    return {
        'total': total,
        'average': average,
        'minimum': minimum,
        'maximum': maximum
    }

# Example usage
numbers = [10, 20, 30, 40, 50]
summary = summarize_numbers(numbers)

# Print the summary
for key, value in summary.items():
    print(f"{key}: {value}")
```

and execute the Python script in the terminal window:
```
python python_script.py
```

![screenshot of executing Python script]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/python_script.png)

#### *R Script File*

R Script File is a text file in which you can write an R script and save it with a `.R` extension. You can run this script in an R console or terminal. This is typically used for larger coding projects or when you need to run a sequence of R commands repeatedly.

Here's a simple R script that demonstrates R's syntax, data structures (like vectors and lists), and and base functions. This script defines a function that takes a vector of numbers and returns a list containing the sum, average, minimum, and maximum of the numbers.

`R_script.r`
```
summarize_numbers <- function(numbers) {
# Check if the input is not empty
    if(length(numbers) == 0) {
        return("Input vector is empty.")
    }
# Calculate the sum of the numbers
    total <- sum(numbers)
# Calculate the average of the numbers
    average <- mean(numbers)
# Find the minimum and maximum numbers
    minimum <- min(numbers)
    maximum <- max(numbers)
# Return a list with the results
    return(list(
        total = total,
        average = average,
        minimum = minimum,
        maximum = maximum
    ))
}

# Example usage
numbers <- c(10, 20, 30, 40, 50)
summary <- summarize_numbers(numbers)

# Print the summary
for(key in names(summary)) {
    print(paste(key, ": ", summary[[key]]))
}
```

![screenshot of executing R script]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/r_script.png)

The script can be run directly in the R console or in the Terminal with the Rscript command.
* In the R console:
```
source("R_script.r")
```
* In the Terminal with Rscript:
```
Rscript R_script.r
```

#### *Markdown File*

Markdown File is a text file where you can write content using Markdown, a lightweight markup language that you can use to format and render your text in a human-friendly way. This is useful for writing notes, describing project pipeline, creating documentation for your code.

Markdown in Jupyter notebooks lets you create rich text with different styles, lists, links, images, and even HTML elements. Here's an example illustrating some of these components.

```
# Jupyter Notebook Markdown Example

This is an **example** of using *markdown* in Jupyter notebooks.

## Text styles

- **Bold text** is created using double asterisks: `**Bold text**`
- *Italic text* is created using single asterisks or underscores: `*Italic text*` or `_Italic text_`
- ~~Strikethrough text~~ is created using double tildes: `~~Strikethrough text~~`

## Lists

You can create bulleted lists:

- Item 1
- Item 2
- Item 3

Or numbered lists:

1. First item
2. Second item
3. Third item

## Links and Images

You can create links: [SCINet](https://scinet.usda.gov)

And display images: ![SCINet logo](https://scinet.usda.gov/assets/img/site/usda-logo-color.svg)

## HTML

You can use HTML for more complex formatting. For example, to color text and backgrounds:

<p style="color:red;">This is a text in red.</p>
<p style="background-color:lightblue;">This is a text with a light blue background.</p>
```

The provided Markdown example can be utilized in two ways within JupyterLab:

* **Markdown cell in a notebook** <br>
If you're working within a Jupyter notebook (a `.ipynb` file), you can paste this example directly into a cell that is set to **Markdown mode**. You can change a cell's mode in the toolbar at the top of the notebook. After pasting the example, hit `Alt + Enter` or use the `Run` button to render the Markdown syntax into formatted text.


* **Markdown file** <br>
If you're working with a separate `.md` (Markdown) file in JupyterLab, you can paste this example directly into the file.
  * To see how your Markdown renders, you can `right-click` in the text editor and select **"Show Markdown Preview"**.
  * This will open a new tab where you can see your rendered Markdown that updates in real-time as you make changes to your `.md` file.

![screenshot of rendering Markdown file]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/markdown_file.png)


#### *Text File*

Text File is a standard, plain/raw text file where you can write and edit text. This is useful for writing notes or any other kind of text content, as well as storing text-like or numerical data.

For example, you can create a simple comma-separated values (CSV) text file, which can be viewed and edited as a Text File in JupyterLab. It could look something like this:
```
name,age,city
John Doe,35,New York
Jane Doe,32,Los Angeles
Jim Smith,28,Chicago
Jill Smith,30,Boston
```
*This simple text data file represents a table with three columns (name, age, city) and four rows of data. In JupyterLab, you can create such a file using the Text File app in the JupyterLab Launcher. Next time, you can open this file by navigating to its location in the file browser and clicking on it. The file will open in a new tab where you can view and edit the text.*

![screenshot of creating text data file]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/text_file.png)

**NOTE:** Please note that while you can view and edit this file as a **Text File** in JupyterLab, if you want to perform data analysis tasks on this data, you'd likely want to open this CSV file in a Jupyter **Notebook app** using a data manipulation library like `pandas` in Python or `read.csv` in R.


### Terminal

Terminal provides command-line access to your system, similar to the terminal application on your computer. This is useful for running system commands, installing packages, managing files, and running scripts. When working in the Terminal in Jupyter on Ceres via Open OnDemand you have immediate access to your locations in a cluster file system (the same as when logged in via SSH protocol).

#### Executing Bash commands and Python/R scripts

With the Terminal in JupyterLab, you have the ability to immediately execute and test Python and R script files you are actively creating, providing a seamless, integrated environment for coding and testing.

![screenshot of working in a terminal]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/terminal.png)

**Use a Terminal in Jupyter like when you log in via SSH:**
* execute Bash commands:
```
pwd
ls
```
* execute Python scripts:
```
python python_script.py
```
* execute R scripts:
```
Rscript R_script.r
```
* load modules and run software, for example use the preinstalled `qiime2` tool

  > Samtools is a suite of utilities for interacting with and post-processing short DNA sequence read alignments in the SAM, BAM and CRAM formats, including indexing, format conversion and basic statistics.

  * Find a preinstalled software on a list of modules:
```
module avail samtools
```
  * Load a selected module:
```
module load samtools/1.9
```
  * Next, you would run your **Samtools command**. For example, to get basic statistics about alignments in a BAM file, you can use the `samtools flagstat` command:
```
samtools flagstat example.bam
```
<i>Replace example.bam with the path to your own BAM file.</i><br>
This will print to the terminal a summary of the read alignments in the BAM file, such as the total number of reads, the number of mapped reads, the number of paired-end reads, and so on.

**NOTE:** For computationally intensive tasks, it is advisable to enclose your commands within a SLURM script and submit it to the queue in the *(also from Jupyter's Terminal app)*, as your JupyterLab session *(and Terminal app within it)* may not have sufficient resources.


#### Conda package and environment manager

[Conda](https://conda.io/) is a package and environment manager that makes it easy to install and manage software packages and their dependencies. Using Conda, you can create a virtual environment, a self-contained workspace with its own installed packages, that won't interfere with your system or other projects. This is particularly helpful when different projects require different versions of the same package.

**On Ceres, Conda is preinstalled and available as a module.**
* To activate Conda manager open Terminal app in JupyterLab interface.
* Use the following command to display available Conda modules:
```
module avail conda
```

![screenshot of conda modules in Terminal on Ceres]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/conda_modules.png)

* Select the Conda module, for example `miniconda/4.12.0`, and load it with a command:
```
module load miniconda/4.12.0
```
<i>From now on, you can use `conda` commands to create and manage Python environments and install required dependencies.</i>

* Create new Conda environment for Python-based interactive graphing:
```
conda create -n graphing Python=3.9 matplotlib seaborn plotly
```
<i>This command will create a new virtual environment called 'graphing' in your user space on Ceres, so it will be accessible only by you. It will initialize the coding environment with Python in version 3.9 and install the specified libraries: matplotlib, seaborn, and plotly along with their dependencies. The process will take some time and you will be prompted with <b>"Proceed ([y]/n)?"</b> where you should type <b>"y"</b> and approve with enter to proceed with the installation.</i>

The installation process will end with the printed message:
```
# To activate this environment, use
#
#     $ conda activate graphing
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```
**NOTE:** On Ceres, while using `miniconda` you should activate the environment using `source` command instead of `conda`.

* Once the installation is finished, you can activate your new environment with a command:
```
source activate graphing
```
* To be able to import these libraries in a Jupyter notebook you need also to install `ipykernel` module. This will make your Conda environment available as a Jupyter kernel. While in your Conda environment, you can install `ipykernel` using:
```
conda install ipykernel
```
  * You also need to **create a new kernel for your environment**. Still within your environment, run the following command:
  ```
  python -m ipykernel install --user --name=graphing
  ```
  <i>If successful, you should get a message in your terminal: "Installed kernelspec graphing in /home/{user}/.local/share/jupyter/kernels/graphing"</i>

* Now, you can return to JupyterLab.
  * In the Python Notebook app, click on the **"Kernel"** menu, then **"Change kernel"**, and finally select your new environment from the list. <br>
  <b>NOTE:</b> <i>If a newly added kernel is not visible on the list, you may need to restart your JupyterLab server. Then, open new or existing Python Notebook to repeat the procedure of selecting the kernel.</i>

![screenshot of changing Kernel in Python Notebook]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/change_kernel.png)

Now, your Jupyter notebook is linked to your Conda environment, and you can import any libraries you installed in this environment. Let's create some charts using graphical libraries *(available in your new Python environment)*.


## A few Ceres-specific notes:

### Default working directory

In JupyterLab, the working directory is set during the setup of the Jupyter Session, before clicking the blue "Connect to Jupyter" button. You can create and save new files and notebooks in this directory and its subdirectories, but you cannot save above it in the file tree. By default, your Home directory is set as the working directory, but you can choose a different location during the setup of your Jupyter session. For more details, please refer to section [Jupyter Server in Open OnDemand](#jupyter-server-in-open-ondemand). You have the ability to access and load files from any location on the cluster in your notebooks, and you can freely navigate the file system in the Terminal app built into Jupyter. However, the built-in graphical file browser in Jupyter Lab restricts navigation outside your chosen working directory.

![screenshot of Home Storage Quotas]({{ site.baseurl }}/assets/img/guides/analysis/jupyter/storage_quota.png)


### Data access
Running Jupyter Server on Ceres allows SCINet users to access any data on Ceres that they can access from the command line (SSH), including `home` location and your `/project` space. Within the JupyterLab interface, your newly created files and notebooks can only be saved in the selected working directory, however, you can utilize the built-in Terminal app to easily move them to any location on the cluster, allowing you a versatile file management capability.


### Python Package installation

When you're running JupyterLab on a cluster via the Open OnDemand service, you're generally operating within a specific environment set up by administrators. Installing new libraries directly might not be allowed, or could conflict with existing software versions.

The best practice recommended is to create a personal Python virtual environment where you can install and manage your own Python packages. This can be done with `conda` package and environment manager. Once you've created and activated your environment, you can install new packages there without affecting the wider system. For details, please follow the guide provided in section [Conda package and environment manager](#conda-package-and-environment-manager).

**Before you start using Conda:**

**Note:** Before starting to use Conda, it's advisable to change the default location (your home directory) where Conda will install your customized libraries. Installing a lot of Python libraries may contribute to the default 5G soft limit quota on your home directory being surpassed. To overcome this issue you can move `.conda` directory from your home directory to your project directory and create a symbolic link to the new location. In JupyterLab open the **"Terminal"** app and enter the following commands substituting your values:

```
cd ~
mkdir /project/<your_project_dir>/<account_name>
mv .conda /project/<your_project_dir>/<account_name>/
chgrp -R proj-<your_project_dir> /project/<your_project_dir>/<account_name>/.conda
chmod -R g+s /project/<your_project_dir>/<account_name>/.conda
ln -s /project/<your_project_dir>/<account_name>/.conda .conda
```

The `mv` and `chgrp` commands may take longer time depending on how much data you have in the **.conda** directory. You will need to restart Jupyter for this new location to take effect.


### Stopping Jupyter Server

When you are finished working in the Jupyter interface, ensure you have saved all changes in your open files, then you can simply close the browser tab. However, if you still have the Ceres Open OnDemand interface open (in a separate tab in a browser), remember to delete the Jupyter session that's no longer in use. This action will free up resources for other users, promoting efficient use of the shared computing environment.
