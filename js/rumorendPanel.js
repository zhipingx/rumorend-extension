var c = chrome || browser;
var regex = /https:\/\/twitter\.com\/(.*)/;

chrome.storage.local.get({'shieldsUp': true}, function(items) {
  // alert(items.shieldsUp)
  if(items.shieldsUp) {
    // $('#remorendSwitch').prop( "checked", true );
  } else {
    $('#remorendSwitch').removeAttr("checked");
  }
});

$(function() {

  $('#remorendSwitch').change(function() {
    // alert($(this).prop('checked'))
    if ($(this).prop('checked') == false) {
      rumorendShieldsDown();
      c.tabs.reload();
    } else {
      rumorendShieldsUp();
    }
  })
})

function rumorendShieldsDown() {
  c.storage.local.set({'shieldsUp': false}, function() {
    console.log('shieldsDown');
    c.pageAction.setIcon({path: 'images/icon32.png'});
    // c.pageAction.setTitle({tabId: tab.id, title: 'rumorend disabled. Click to enable.'});
  });
}

function rumorendShieldsUp() {
  c.storage.local.set({'shieldsUp': true}, function() {
    console.log('shieldsUp');
    c.pageAction.setIcon({path: 'images/icon32-blue.png'});
    // c.pageAction.setTitle({tabId: tab.id, title: 'rumorend enabled. Click to disable.'});
    // updateTwitt();
  });
}
