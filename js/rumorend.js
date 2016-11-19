var c = chrome || browser;
var regex = /https:\/\/twitter\.com\/(.*)/;

c.pageAction.onClicked.addListener(function(tab) {
  c.storage.local.get({'shieldsUp': true}, function(items) {
    if (items.shieldsUp) {
      rumorendShieldsDown(tab);
      c.tabs.reload(tab.id);
    }
    else {
      rumorendShieldsUp(tab);
    }
  });
});

function rumorendShieldsDown(tab) {
  c.storage.local.set({'shieldsUp': false}, function() {
    console.log('shieldsDown ' + tab.url);
    c.pageAction.setIcon({tabId: tab.id, path: 'images/icon32.png'});
    c.pageAction.setTitle({tabId: tab.id, title: 'rumorend disabled. Click to enable.'});
  });
}

function rumorendShieldsUp(tab) {
  c.storage.local.set({'shieldsUp': true}, function() {
    console.log('shieldsUp ' + tab.url);
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
    c.pageAction.setIcon({tabId: tab.id, path: 'images/icon32-blue.png'});
    c.pageAction.setTitle({tabId: tab.id, title: 'rumorend enabled. Click to disable.'});
  });
}



c.runtime.onInstalled.addListener(function() {
  c.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // console.log('Go to sleep now ' + tab.url + ' AAAA');
  	if (tab.url && regex.test(tab.url)) {
      c.pageAction.show(tab.id);
      c.storage.local.get({'shieldsUp': true}, function(items) {
        if (items.shieldsUp) {
          rumorendShieldsUp(tab);
        } else {
          rumorendShieldsDown(tab);
        }
      });
  	} else {
      c.pageAction.setTitle({tabId: tab.id, title: 'Extension will be enabled when you open twitter.com'});
    }
  });
  // Replace all rules ...
  // c.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   // With a new rule ...
  //   c.declarativeContent.onPageChanged.addRules([
  //     {
  //       // That fires when a page's URL contains a 'g' ...
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { urlContains: 't' },
  //         })
  //       ],
  //       // And shows the extension's page action.
  //       actions: [ new chrome.declarativeContent.ShowPageAction() ]
  //     }
  //   ]);
  // });
});
