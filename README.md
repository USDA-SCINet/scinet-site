## Site Contributions

These are the instructions for how to contribute to the SCINet USDA webpage if you have been contacted to contribute.

There are two ways to do this.

1. Using Github pull requests (preferred)
2. edit online in github
2. Send your markdown file to Moe Richert

## The github command line

1. get a GitHub account if you don't have one
2. clone the repository to your computer
3. create a new brach for your work
4. Edit your assigned page, photos go in `/assets/img/` in their respective subfolder, and docs go in the location you were assigned
5. When you are done commit your changes:

  ```
  git add .
  git commit -m "here is a description of what I did what I did"
  git push
  ```

6. Then go the main scinet repository and create a pull request

## Edit online in Github
1. get a GitHub account if you don't have one
2. go to the scinet repository: https://github.com/USDA-SCINet/scinet-site and navigate to your file and click the pencil. this will "fork the archive for you".
3 edit it and say what you did in the comment box and click "propose file change"


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

Edits made to _sass/styles.css will not be retained when the site is built.  It is overwritten when the USWDS scss is compiled.

USWDS location settings are in gulpfile.js

## Collections

Collections are now stored in sn_collections and sorted by type

If an additional category is needed, a new folder should be made and its information should be added to the _config.yml under 'collections'
