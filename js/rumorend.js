var twitterURLPrefix = 'https://twitter.com'

chrome.storage.local.get({'shieldsUp': true}, function(items) {
  if(items.shieldsUp) {
    setUpShield();
  }
});

function setUpShield() {
  document.addEventListener('animationstart', function(event){
    if (event.animationName == 'nodeInserted') {
      tweetDiv = event.target;
      console.log(tweetDiv);
      insertFactCheckIcon(tweetDiv);

      tweetId = tweetDiv.getAttribute('data-item-id');
      tweetLiId = 'stream-item-tweet-' + tweetId;
      tweetLi = document.getElementById(tweetLiId);
      tweetDivId = tweetDiv.getAttribute('data-permalink-path');
      twittURL = twitterURLPrefix + tweetDivId;
    }
  }, false);
}

function insertFactCheckIcon(tweetDiv) {
  if ($(tweetDiv).find('.stream-item-header div:last-child').hasClass('fact-check')) return;
  $(tweetDiv).find('.stream-item-header').append('<div class="fact-check twitter-bird"></div>');
  imgSrc = chrome.runtime.getURL('images/tw-small.png');
  $(".fact-check").css('background-image', 'url(' + imgSrc + ')')
}

function updateFactCheckIcon(tweetDiv) {
  if ($(tweetDiv).find('.stream-item-header div:last-child').hasClass('fact-check')) {
    $(tweetDiv).find('.twitter-bird').remove();
    $(tweetDiv).find('.stream-item-header').append('<div class="fact-check"></div>');
    imgSrc = chrome.runtime.getURL('images/fact-check.png');
    $(".fact-check").css('background-image', 'url(' + imgSrc + ')')
  }
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
