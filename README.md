# Site Contributions

These are the instructions for how to contribute to the SCINet USDA webpage if you have been contacted to contribute.

There are a few ways to do this.

1. Using Github pull requests (preferred).
2. Edit online in github.
3. Send your markdown file to [Moe Richert](mailto:moe.richert@usda.gov)

If you are unsure where the information you are trying to edit is located, navigate to the page on the [SCINet website](https://scinet.usda.gov) and scroll to the bottom of the page.  There is an "Edit this page" link in the footer that will take you to the corresponding file in the github repository.  If you are still unable to find the information you are trying to update, check _data/tables or email [Moe Richert](mailto:moe.richert@usda.gov).

## The github command line

1. Get a GitHub account if you don't have one
2. Clone the repository to your computer
3. Create a new branch for your work
4. Edit your assigned page, photos go in `/assets/img/` in their respective subfolder, and docs go in the location you were assigned
5. When you are done commit your changes:

  ```
  git add .
  git commit -m "here is a description of what I did what I did"
  git push
  ```

6. Then go the main scinet repository and create a pull request

## Edit online in Github
1. Get a GitHub account if you don't have one
2. Go to the [SCINet repository](https://github.com/USDA-SCINet/scinet-site), navigate to your file, and click the pencil. This will fork the archive for you.
3. Edit the file, say what you did in the comment box, and click "Propose changes" or "Create a new branch for this commit and start a pull request."


# Using this repository locally

## To get started

This site uses Jekyll - a ruby gem.  You will need Node.js and Ruby to use this repository locally.
If you do not already have Ruby installed, you can use the Jekyll guide to get set up: https://jekyllrb.com/docs/

Clone the repository, then run 'bundle install' and 'npm install' to get dependencies.

To run the app, you can run either 'npm run start', or 'bundle exec jekyll serve'

If you want to edit the sass in the _USWDS folder and have it update live, use 'npm run watch-start'

## USWDS setup

Sass based on the USWDS system sound be added to the _uswds/sass/custom/ file and the file name added to the compile.scss entry point.

All other sass can be added into the jekyll _sass file, and the file name added to the entry point in assets/css/style.scss

**Edits made to _sass/styles.css will not be retained when the site is built.**  It is overwritten when the USWDS scss is compiled.

USWDS location settings are in gulpfile.js

# Where to find files

If you are unsure where the information you are trying to edit is located, navigate to the page on the [SCINet website](https://scinet.usda.gov) and scroll to the bottom of the page.  There is an "Edit this page" link in the footer that will take you to the corresponding file in the github repository.

## Collections

Collections are now stored in sn_collections and sorted by type.

If an additional category is needed, a new folder should be made and its information should be added to the _config.yml under 'collections'

Other information (downtime, fellowships, etc) can be updated from the _data/tables files.  Ensure you maintain the file formatting when you add to these files.

Templates for new pages are in _templates.
Please contact [Moe Richert](mailto:moe.richert@usda.gov) with any questions or development needs.
