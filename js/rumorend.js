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
      tweetDiv = event.target;
      tweetId = tweetDiv.getAttribute('data-item-id');

      tweetLiId = 'stream-item-tweet-' + tweetId;
      tweetLi = document.getElementById(tweetLiId);

      // ("div").find("[data-item-id='" + tweetId + "']")
      $(tweetDiv).addClass('scanning');

      // setTimeout(function () {
      //   $(arguments[0]).removeClass('scanning');
      //   console.log(arguments[1] + 'removed')
      // }, 5 * 1000, tweetDiv, tweetId);
      
      // tweetDiv.
      // tweetDiv.className += " scanning";

      tweetDivId = tweetDiv.getAttribute('data-permalink-path');
      twittURL = twitterURLPrefix + tweetDivId;

      // console.log(twittURL);
    }
  }, false);
}

function postAJAX(twittURL, tweetDiv) {
  var json_query = {"url": twittURL};
  http_request.onreadystatechange = function() {
    if (http_request.readyState == 4) {
      // Javascript function JSON.parse to parse JSON data
      var jsonObj = JSON.parse(http_request.responseText);
      confidence = jsonObj.confidence;

      // tweetDiv.
      // jsonObj variable now contains the data structure and can
      // be accessed as jsonObj.name and jsonObj.country.
      // document.getElementById(tweetDivId).innerHTML = jsonObj.name;
    }
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://ec2-54-147-50-239.compute-1.amazonaws.com:5000/rumor_detect_fake");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(json_query));
}
