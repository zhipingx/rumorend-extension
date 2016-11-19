var twitterURLPrefix = 'https://twitter.com'

chrome.storage.local.get({'shieldsUp': true}, function(items) {
  if(items.shieldsUp) {
    setUpShield();
  }
});

function setUpShield() {
  // console.log('Nahg!!!')
  // document.addEventListener('DOMNodeInserted', function(event) {
  document.addEventListener('animationstart', function(event){
    if (event.animationName == 'nodeInserted') {
      // Do something when a new li is loaded to twitter page
      // element.firstChild
      tweetDiv = event.target
      // https://twitter.com/TwitterU/status/786583557158293504
      tweetDivId = tweetDiv.getAttribute('data-permalink-path');
      twittURL = twitterURLPrefix + tweetDivId
      console.log(twittURL);
      var json_query = {"url": twittURL};

      http_request.onreadystatechange = function() {
         if (http_request.readyState == 4) {
            // Javascript function JSON.parse to parse JSON data
            var jsonObj = JSON.parse(http_request.responseText);
            confidence = jsonObj.confidence;

            tweetDiv.
            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
            // document.getElementById(tweetDivId).innerHTML = jsonObj.name;
         }
      }

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "/json-handler");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
        // console.log(json_query);

      // console.log(event.target.getAttribute('data-item-id'));
    }
  }, false);
}
