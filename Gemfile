source "https://rubygems.org"
gem "jekyll", "~> 4.2.2"
gem "minima", "~> 2.5"
gem "json"
gem "hash-joiner"
gem 'html-proofer'
gem 'jekyll-sitemap'
gem 'jekyll-redirect-from'
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# plugins
group :jekyll_plugins do
  gem 'jekyll-last-modified-at'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data
# gem and associated library.
# The platform-specific lines below fail to install tzinfo on Windows because
# the current platform there, "x64-mingw-ucrt", is not recognized. The "fix" is
# to simply add tzinfo as a required gem.
#platforms :mingw, :x64_mingw, :mswin, :jruby do
#  gem "tzinfo", "~> 1.2"
#  gem "tzinfo-data"
#end
gem "tzinfo", "~> 1.2"
gem "tzinfo-data"

gem "webrick"

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
