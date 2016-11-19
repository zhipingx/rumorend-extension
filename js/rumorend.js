var twitterURLPrefix = 'https://twitter.com'
var rumorendServerURL = 'https://ec2-54-147-50-239.compute-1.amazonaws.com:5000/rumor_detect_fake'



chrome.storage.local.get({'shieldsUp': true}, function(items) {
  if(items.shieldsUp) {
    setUpShield();
  }
});

function setUpShield() {
  document.addEventListener('animationstart', function(event){
    if (event.animationName == 'nodeInserted') {
      tweetDiv = event.target;
      insertFactCheckIcon(tweetDiv);

      tweetId = tweetDiv.getAttribute('data-item-id');
      tweetLiId = 'stream-item-tweet-' + tweetId;
      tweetLi = document.getElementById(tweetLiId);

      // ("div").find("[data-item-id='" + tweetId + "']")

      // $(tweetDiv).addClass('scanning');

      // setTimeout(function () {
      //   $(arguments[0]).removeClass('scanning');
      //   console.log(arguments[1] + 'removed')
      // }, 5 * 1000, tweetDiv, tweetId);

      // tweetDiv.
      // tweetDiv.className += " scanning";

      tweetDivId = tweetDiv.getAttribute('data-permalink-path');
      tweetURL = twitterURLPrefix + tweetDivId;
      // console.log(tweetURL);
      postAJAX(tweetURL, tweetDiv);

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

function postAJAX(tweetURL, tweetDiv) {
  var json_query = { 'url': tweetURL };
  // var xmldoc = httpRequest.responseXML;
  httpRequest = new XMLHttpRequest()

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        // var response = JSON.parse(httpRequest.responseText);
        console.log(httpRequest.responseText)
        // alert(response.computedString);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('POST', rumorendServerURL);
  httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  httpRequest.send(JSON.stringify(json_query));


  // $.ajax({
  //   type: "POST",
  //   url: rumorendServerURL,
  //   data: JSON.stringify(json_query),
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "text",
  //   success: function(response_data) { console.log(tweetURL + " " + response_data); },
  //   failure: function(errMsg) { console.log(tweetURL + " " + errMsg); }
  // });
}
