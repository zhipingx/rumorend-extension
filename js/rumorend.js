var TwitterURLPrefix = 'https://twitter.com'
var RumorendServerURL = 'https://ec2-54-147-50-239.compute-1.amazonaws.com:5000/rumor_detect_fake'
var ConfidenceResultsList = [chrome.runtime.getURL('images/16_verypoor.png'),
                        chrome.runtime.getURL('images/16_poor.png'),
                        chrome.runtime.getURL('images/16_unsatisfactory.png'),
                        chrome.runtime.getURL('images/16_good.png'),
                        chrome.runtime.getURL('images/16_excellent.png')];

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
      tweetURL = TwitterURLPrefix + tweetDivId;
      // console.log(tweetURL);
      postAJAX(tweetURL, tweetDiv);

    }
  }, false);
}

function insertFactCheckIcon(tweetDiv) {
  if ($(tweetDiv).find('.stream-item-header div:last-child').hasClass('fact-check')) return;
  $(tweetDiv).find('.stream-item-header').append('<div class="fact-check twitter-bird"></div>');
  imgSrc = chrome.runtime.getURL('images/tw-small.png');
  $(tweetDiv).find(".fact-check").css('background-image', 'url(' + imgSrc + ')')
}

function updateFactCheckIcon(tweetDiv, confidence) {
  if ($(tweetDiv).find('.stream-item-header div:last-child').hasClass('fact-check')) {
    $(tweetDiv).find('.twitter-bird').remove();
    $(tweetDiv).find('.stream-item-header').append('<div class="fact-check"></div>');
    $(tweetDiv).find(".fact-check").css('background-image', 'url(' + ConfidenceResultsList[(confidence / 20) | 0] + ')');
    $(tweetDiv).find(".fact-check").hover(
      function() {
        insertFactCheckDetails(tweetDiv, 85);
      }, function() {
        $(tweetDiv).find(".fact-check-detail").hide('normal');
        $(tweetDiv).find(".fact-check-detail").remove();
    });
  }
}

function insertFactCheckDetails(tweetDiv, score) {
  $('<div class="fact-check-detail">Score: ' + score + '</div>').hide().appendTo($(tweetDiv).find(".fact-check")).show();
}

function postAJAX(tweetURL, tweetDiv) {
  var json_query = { 'url': tweetURL };
  // var xmldoc = httpRequest.responseXML;
  httpRequest = new XMLHttpRequest()
  httpRequest.tweetDiv = tweetDiv

  function alertContents() {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        // var response = JSON.parse(this.responseText);
        // console.log(tweetURL + ' ' + this.responseText);
        updateFactCheckIcon(this.tweetDiv, this.responseText);
        // alert(response.computedString);
      } else {
        console.log(this.responseText);
        // alert('There was a problem with the request.');
      }
    }
  }

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('POST', RumorendServerURL);
  httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  httpRequest.send(JSON.stringify(json_query));


  // $.ajax({
  //   type: "POST",
  //   url: RumorendServerURL,
  //   data: JSON.stringify(json_query),
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "text",
  //   success: function(response_data) { console.log(tweetURL + " " + response_data); },
  //   failure: function(errMsg) { console.log(tweetURL + " " + errMsg); }
  // });
}
