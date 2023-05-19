// any link that is not part of the current domain is modified and marked as external

(function() {
    var links = document.links;
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
        links[i].className += ' usa-link--external';
      }
    }
  })();