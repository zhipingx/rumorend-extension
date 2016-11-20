var c = chrome || browser;
var regex = /https:\/\/twitter\.com\/(.*)/;
// alert($(this).val());
// alert('aa');
window.onload = function() {

  $('#remorendSwitch').change(function() {

    c.storage.local.get({'shieldsUp': true}, function(items) {
      if (items.shieldsUp) {

        c.storage.local.set({'shieldsUp': false}, function() {});
        c.tabs.reload();
      } else {
        c.storage.local.set({'shieldsUp': true}, function() {});
        c.tabs.reload();
      // c.tabs.reload();
      }
    });
  });


  chrome.storage.local.get('shieldsUp', function(items) {

    // alert(items.shieldsUp)
    if(items.shieldsUp) {
      $('#toggle-demo').bootstrapToggle('on')
      // $('#remorendSwitch').attr("checked", true);
      // $('#remorendSwitch').prop( "checked", true );
    } else {
      $('#toggle-demo').bootstrapToggle('off')
      // $('#remorendSwitch').attr("checked", false);
    }
  });
  // console.log("onload" + Date())
}
