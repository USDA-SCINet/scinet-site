function fetchResults(value) {
    if (value.length > 1) {
        value = value.toLowerCase()

        fetch("/my_search.json")
            .then(res => res.json())
            .then(out => setList(out.filter(page => { return ((new RegExp(value, 'i').test(page.content)) || (new RegExp(value, 'i').test(page.title))) }), value))
            .catch(err => error_print(err));

    } else {
        error_print("Type what you are looking for into the search bar, then hit enter.")
    }

}

function error_print(error) {
    var resultsWrapperHtml = '<div class="shadow-2 usa-alert usa-alert--error usa-alert--slim usa-alert--no-icon">' +
        '<div class="usa-alert__body">' +
        '<p class="usa-alert__text">' + error + '</p>' +
        '</div></div>';

    // insert the result html into the page
    document.getElementById("search_results").innerHTML += resultsWrapperHtml;

}

window.onload = function () {
    var queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        myquery = urlParams.get('query');
    fetchResults(myquery);
    //posts = sessionStorage.getItem("scinet_site_posts");
    //filterList(myquery);
}

//////////////


// creating and declaring a function called "setList"
// setList takes in a param of "results"
function setList(results, value) {
    var resultsHtml = '',
        resultsObj = [];

    var resultsnum = results.length,
        srchval = '.{0,50}' + value + '.{0,50}';
    if (resultsnum > 0 ){
    results.forEach(function (res) {
        var matchy = res.content.match( new RegExp(srchval, "gi")) || [];
        var count = matchy.length;
        var matchtxt = "";
        if (count > 0) {
            var itnum = Math.min(count, 2);
            for (var i = 0; i < itnum; i++) {
                matchtxt += '<li class="usa-collection__meta-item"> ...' + boldmatch(matchy[i], value) + '...</li>';
            }
        }

        let resultsHtml1 = '<li class="usa-collection__item width-full margin-x-auto search-result" type="'+res.category+'! '+res.subcategory+'!" count="'+count+'">' +
            '<div class="usa-collection__body">' +
            '<h3 class="usa-collection__heading">' +
            '<a class="usa-link"' +
            'href="' + res.url + '">' +
            boldmatch(res.title, value) +
            '</a>' +
            '</h3>' +
            '<span class="text-accent-warm-darker font-sans-3xs">' +
            'https://scinet.usda.gov' + res.url + 
            '</span>' +
            '<p class="usa-collection__description">' +
            res.description +
            '</p>' +
            '<ul class="usa-collection__meta" aria-label="More information">' +
            matchtxt +
            '<ul class="usa-collection__meta" aria-label="Topics">' +
            set_tags(res.category) +
            set_tags(res.subcategory) +
            set_tags(res.set) +
            //set_tags(res.date) +
            '</ul>' +
            '</ul>' +
            '</div>' +
            '</li>';

        //resultsHtml += resultsHtml1;
        
        let resArr = {'count' : count, 'set' : res.category, 'html' : resultsHtml1 };
        resultsObj.push(resArr);

    });

    resultsObj.sort(function(a, b) { 
        return b.count - a.count;
    }).forEach(function (res) {
        resultsHtml += res.html;
    })

    var resultsWrapperHtml = '<ul class="usa-collection" id="search_list">' + resultsHtml + '</ul>';

    // insert the result html into the page
    document.getElementById("search_results").innerHTML += resultsWrapperHtml;
} else {
    error_print("No results found - please try again.")
}

    document.getElementById("res_num").innerHTML += resultsnum + ' RESULTS';

}

function boldmatch(txt, value){
    var regEx = new RegExp(value, 'gi');
    return txt.replace(regEx, '<b>$&</b>')
}

function set_tags(tag) {
    if (tag) {
        return '<li class="usa-collection__meta-item usa-tag">' + tag + '</li>';
    } else {
        return "";
    }
}

function filterDropdowns(value) {
    if(value){
    var myitem = value.replace(/[^\w]/g, '') + 'filter';
    $('.subfilter').addClass("no-display");
    $('.subcat').val("");
    $('#'+myitem).removeClass("no-display");
}
}

function filterList(value) {
    /*var form = $("#filterform :input:visible").each(function(){
        console.log(this);
      });*/
      var spacer = " ";
      var test = "";
      var check = $(value).serializeArray();
      for (let value of Object.values(check)) {
        test += value['value'] + spacer;
        spacer = "";
      }
    var mylist = document.getElementsByClassName("search-result");
    console.log(test);
    //console.log(formdata.get("category"));
    //var res = formdata.get("category") + " " + formdata.get("research-sub"_

    
    for (var i = 0; i < mylist.length; i++) {
        mylist[i].classList.add("no-display");

        let thistype = mylist[i].getAttribute('type');

        if (thistype.toLowerCase().includes(test.toLowerCase())) {
            mylist[i].classList.remove("no-display")
        }
    }
};