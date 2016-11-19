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
      console.log(event.target.getAttribute('data-item-id'))

    }
  }, false);
}
